const router = require("express").Router();
const Assessor = require("../model/Assessor");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

async function sendVerificationEmail(email, token, userid, username) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "rzna ccxy ykzb qjsf",
    },
  });
  //pw reset function

  const verificationLink = `http://localhost:5173/verify/${token}?id=${userid}&uname=${username}`;
  console.log("verificationLink");
  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Click this link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}
async function sendResetEmail(email, userId, token, username) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "rzna ccxy ykzb qjsf",
    },
  });

  const resetLink = `http://localhost:5173/reset-password/assessor?token=${token}&id=${userId}&uname=${username}`;
  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click this link to reset your password: ${resetLink}`,
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
      sendVerificationEmail(
        newAssessor.email,
        verificationToken,
        newAssessor._id,
        newAssessor.user_name
      );
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
    const { id } = req.query;
    const assessor = await Assessor.findOne({
      verificationToken: token,
      _id: id,
    });

    if (!assessor) {
      return res.status(400).send("Invalid or expired token");
    }
    if (assessor.isVerified) {
      return res
        .status(200)
        .send({ status: "Email already verified", assessor });
    }
    assessor.isVerified = true;
    assessor.verificationToken = undefined;
    await assessor.save();

    res.send({ status: "Email verified successfully", assessor });
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
router.put("/edit/password/:token", async (req, res) => {
  const { password, userId } = req.body;
  const { token } = req.params;

  try {
    const assessor = await Assessor.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!assessor) {
      return res.status(404).send({ status: "Invalid or expired token" });
    }
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      assessor.password = await bcrypt.hash(password, salt);
    }
    assessor.resetPasswordExpire = undefined;
    assessor.resetPasswordToken = undefined;
    await assessor.save();
    res.status(200).send({ status: "assessor updated", assessor });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating assessor", error: err.message });
  }
});
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    const assessor = await Assessor.findOne({ email });
    if (!assessor) {
      return res.status(404).send("Student with this email does not exist.");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 3600000; // Token valid for 1 hour

    assessor.resetPasswordToken = resetToken;
    assessor.resetPasswordExpire = resetTokenExpire;
    await assessor.save();

    await sendResetEmail(
      assessor.email,
      assessor._id,
      resetToken,
      assessor.user_name
    );
    res.send("Reset email sent to assessor");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error sending reset email");
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
