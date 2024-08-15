const router = require("express").Router();
const Assessor = require("../model/Assessor");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

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

router.route("/add").post(async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
  const existassessor = await Assessor.findOne({ user_name });
  if (existassessor) {
    return res.status(400).send("username already exist use another one");
  }
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newAssessor = new Assessor({
    first_name,
    last_name,
    email,
    user_name,
    password,
    verificationToken,
  });

  await newAssessor
    .save()
    .then(() => {
      sendVerificationEmail(newAssessor.email, verificationToken);
      res.json("assessor added,please verify your email");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding assessor", error: err.message });
    });
});

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const assessor = await Assessor.findOne({ verificationToken: token });

    if (!assessor) {
      return res.status(400).send("Invalid or expired token");
    }

    assessor.isVerified = true;

    await assessor.save();

    res.send("Email verified successfully");
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error verifying email", error: err.message });
  }
});

router.route("/").get(async (req, res) => {
  await Assessor.find()
    .then((assessor) => {
      res.json(assessor);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error fetching assessors", error: err.message });
    });
});

router.post("/get", async (req, res) => {
  const { user_name } = req.body;
  try {
    const assessor = await Assessor.findOne({ user_name });
    assessor.lastAccessed = new Date();
    await assessor.save();
    if (assessor) {
      res.status(200).send({ status: "User fetched", assessor });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});

router.put("/edit", async (req, res) => {
  const { first_name, last_name, user_name, newuser_name } = req.body;

  try {
    const assessor = await Assessor.findOne({ user_name });
    const existAssessor = await Assessor.findOne({ user_name: newuser_name });
    if (existAssessor && existAssessor.email !== assessor.email) {
      return res.status(409).send({ status: "user name is already taken" });
    }

    if (!assessor) {
      return res.status(404).send({ status: "User not found" });
    }
    if (first_name !== undefined) {
      assessor.first_name = first_name;
    }
    if (last_name !== undefined) {
      assessor.last_name = last_name;
    }
    if (newuser_name !== undefined) {
      assessor.user_name = newuser_name;
    }
    await assessor.save();
    res.status(200).send({ status: "assessor updated", assessor });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating assessor", error: err.message });
  }
});
router.put("/edit/password", async (req, res) => {
  const { password, user_name } = req.body;

  try {
    const assessor = await Assessor.findOne({ user_name });
    if (!assessor) {
      return res.status(404).send({ status: "User not found" });
    }
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      assessor.password = await bcrypt.hash(password, salt);
    }

    await assessor.save();
    res.status(200).send({ status: "assessor updated", assessor });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating assessor", error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { user_name } = req.body;
    const assessor = await Assessor.findOne({ user_name });

    if (assessor) {
      await assessor.deleteOne({ user_name });
      return res.status(200).send({ status: "user delete", assessor });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error delete user", error: err.message });
  }
});

module.exports = router;
