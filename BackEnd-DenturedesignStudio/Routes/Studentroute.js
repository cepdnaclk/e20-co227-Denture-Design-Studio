const router = require("express").Router();
const Student = require("../model/Student");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
// Function to send verification email
async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "gfba lodx ekzw mspq",
    },
  });

  const verificationLink = `http://localhost:5173/verify/${token}`;
  console.log("verificationLink");
  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Click this link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

// Register new student and send verification email
router.post("/add", async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
  const existstudent = await Student.findOne({ user_name });
  if (existstudent) {
    return res.status(400).send("Username already exists, use another one");
  }
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newStudent = new Student({
    first_name,
    last_name,
    email,
    user_name,
    password,
    verificationToken,
  });

  await newStudent
    .save()
    .then(() => {
      sendVerificationEmail(newStudent.email, verificationToken);
      res.json("Student added, please verify your email.");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding student", error: err.message });
    });
});

// Verify email using token
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const student = await Student.findOne({ verificationToken: token });

    if (!student) {
      return res.status(400).send("Invalid or expired token");
    }

    student.isVerified = true;

    await student.save();

    res.send("Email verified successfully");
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error verifying email", error: err.message });
  }
});

// Fetch all students
router.get("/", async (req, res) => {
  await Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error fetching students", error: err.message });
    });
});

// Get student by username
router.post("/get", async (req, res) => {
  const { user_name } = req.body;
  try {
    const student = await Student.findOne({ user_name });
    student.lastAccessed = new Date();
    await student.save();
    if (student) {
      res.status(200).send({ status: "User fetched", student });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});

// Delete student by username
router.delete("/delete", async (req, res) => {
  try {
    const { user_name } = req.body;
    const student = await Student.findOne({ user_name });

    if (student) {
      await student.deleteOne();
      return res.status(200).send({ status: "User deleted", student });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error deleting user", error: err.message });
  }
});

// Edit student details
router.put("/edit", async (req, res) => {
  const { first_name, last_name, user_name, newuser_name } = req.body;

  try {
    const student = await Student.findOne({ user_name });
    const existstudent = await Student.findOne({ user_name: newuser_name });
    if (existstudent) {
      return res.status(409).send({ status: "user name is already taken" });
    }

    if (!student) {
      return res.status(404).send({ status: "User not found" });
    }
    if (first_name !== undefined) {
      student.first_name = first_name;
    }
    if (last_name !== undefined) {
      student.last_name = last_name;
    }
    if (newuser_name !== undefined) {
      student.user_name = newuser_name;
    }
    await student.save();
    res.status(200).send({ status: "student updated", student });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating student", error: err.message });
  }
});
//edit password
router.put("/edit/password", async (req, res) => {
  const { password, user_name } = req.body;

  try {
    const student = await Student.findOne({ user_name });
    if (!student) {
      return res.status(404).send({ status: "User not found" });
    }
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
    }

    await student.save();
    res.status(200).send({ status: "student updated", student });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating student", error: err.message });
  }
});

module.exports = router;
