const router = require("express").Router();
const Student = require("../model/Student");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// Function to send verification email
async function sendVerificationEmail(email, token, userId, user_name) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "rzna ccxy ykzb qjsf",
    },
  });

  const verificationLink = `http://localhost:5173/verify/${token}?id=${userId}&uname=${user_name}`;
  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Click this link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

// Function to send reset email
async function sendResetEmail(email, userId, token, username) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "rzna ccxy ykzb qjsf",
    },
  });

  const resetLink = `http://localhost:5173/reset-password/student?token=${token}&id=${userId}&uname=${username}`;
  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click this link to reset your password: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
}

// Register new student and send verification email
router.post("/add", async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
  try {
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

    await newStudent.save();
    await sendVerificationEmail(
      newStudent.email,
      verificationToken,
      newStudent._id,
      newStudent.user_name
    );
    res.json("Student added, please verify your email.");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error adding student", error: err.message });
  }
});

// Verify email using token
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { id } = req.query;
    const student = await Student.findOne({
      verificationToken: token,
      _id: id,
    });

    if (!student) {
      return res.status(400).send("Invalid or expired token");
    }
    if (student.isVerified) {
      return res
        .status(200)
        .send({ status: "Email already verified", student });
    }
    student.isVerified = true;
    student.verificationToken = undefined;
    await student.save();

    res.send({ status: "Email verified successfully", student });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error verifying email", error: err.message });
  }
});

// Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error fetching students", error: err.message });
  }
});

// Get student by username
router.post("/get", async (req, res) => {
  const { user_name } = req.body;
  try {
    const student = await Student.findOne({ user_name });
    if (student) {
      student.lastAccessed = new Date();
      await student.save();
      res.status(200).send({ status: "User fetched", student });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error fetching student", error: err.message });
  }
});

// Delete student by username
router.delete("/delete", async (req, res) => {
  try {
    const { user_name } = req.body;
    const student = await Student.findOne({ user_name });

    if (student) {
      await student.deleteOne();
      res.status(200).send({ status: "User deleted", student });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error deleting student", error: err.message });
  }
});

// Edit student details
router.put("/edit", async (req, res) => {
  const { first_name, last_name, user_name, newuser_name } = req.body;

  try {
    const student = await Student.findOne({ user_name });
    const existstudent = await Student.findOne({ user_name: newuser_name });

    if (existstudent && existstudent.email !== student.email) {
      return res.status(409).send({ status: "Student name is already taken" });
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
    res.status(200).send({ status: "Student updated", student });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error updating student", error: err.message });
  }
});

// Edit password with token
router.put("/edit/password/:token", async (req, res) => {
  const { password, userId } = req.body;
  const { token } = req.params;

  try {
    const student = await Student.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(404).send({ status: "Invalid or expired token" });
    }

    if (password) {
      student.password = password;
    }

    student.resetPasswordExpire = undefined;
    student.resetPasswordToken = undefined;

    await student.save();
    res.status(200).send({ status: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error updating password", error: err.message });
  }
});

// Request password reset email
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).send("Student with this email does not exist.");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // Token valid for 1 hour

    student.resetPasswordToken = resetToken;
    student.resetPasswordExpire = resetTokenExpire;
    await student.save();

    await sendResetEmail(email, student._id, resetToken, student.user_name);
    res.status(200).send("Reset email sent.");
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error sending reset email", error: err.message });
  }
});

module.exports = router;
