const router = require("express").Router();
const Assessor = require("../model/Assessor");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

async function sendResetEmail(email, userId, token, username) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ravindulakshan.rl2002@gmail.com",
      pass: "rzna ccxy ykzb qjsf",
    },
  });

  const mailOptions = {
    from: "ravindulakshan.rl2002@gmail.com",
    to: email,
    subject: "Password Reset on denture design studio",
    html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="padding:16px 24px 16px 24px;text-align:center">
                <img
                  alt="Sample product"
                  src="https://firebasestorage.googleapis.com/v0/b/denture-design.appspot.com/o/email_asserts%2Flogo.png?alt=media&amp;token=73d3c0de-6fef-4c04-80cb-0a40d6a3710d"
                  width="200"
                  style="width:200px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                />
              </div>
              <div
                style="font-size:14px;font-weight:bold;padding:0px 24px 16px 24px"
              >
                Hi ${username} 👋,
              </div>
              <div
                style="font-size:16px;font-weight:normal;text-align:left;padding:0px 24px 24px 24px"
              >
                We received a request to reset your password for your Denture
                Design Studio account. If you made this request, click the
                button below to reset your password:
              </div>
              <div style="text-align:center;padding:16px 24px 24px 24px">
                <a
                  href="http://localhost:5173/reset-password/assessor?token=${token}&id=${userId}&uname=${username}"
                  style="color:#FFFFFF;font-size:14px;font-weight:bold;background-color:#0079cc;display:inline-block;padding:12px 20px;text-decoration:none"
                  target="_blank"
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%;mso-text-raise:30"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span>Rest your password</span
                  ><span
                    ><!--[if mso
                      ]><i
                        style="letter-spacing: 20px;mso-font-width:-100%"
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <div
                style="color:#ff0000;font-weight:bold;padding:16px 24px 16px 24px"
              >
                If you didn&#x27;t request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </div>
              <div
                style="font-size:13px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px"
              >
                © ${new Date().getFullYear()} Denture Design Studio. All rights reserved.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
  };

  await transporter.sendMail(mailOptions);
}

router.route("/add").post(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    user_name,
    password,
    createdAt,
    lastAccessed,
    isVerified,
  } = req.body;
  const existassessor = await Assessor.findOne({ user_name });
  if (existassessor) {
    return res.status(400).send("username already exist use another one");
  }
  const newAssessor = new Assessor({
    first_name,
    last_name,
    email,
    user_name,
    password,
    createdAt,
    lastAccessed,
    isVerified,
  });

  await newAssessor
    .save()
    .then(() => {
      res.status(200).send({ status: "assessor added", newAssessor });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding assessor", error: err.message });
    });
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
    const resetTokenExpire = Date.now() + 3600000;

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

router.post("/accepted-assessor", async (req, res) => {
  const { user_name } = req.body;
  try {
    const assessor = await Assessor.findOne({ user_name });
    if (!assessor) {
      return res.status(404).send("Student with this email does not exist.");
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "ravindulakshan.rl2002@gmail.com",
        pass: "rzna ccxy ykzb qjsf",
      },
    });
    const mailOptions = {
      from: "ravindulakshan.rl2002@gmail.com",
      to: assessor.email,
      subject: "Your request for assessor access is accepted",
      html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="padding:16px 24px 16px 24px;text-align:center;border-radius:20px">
                <img
                  alt="Sample product"
                  src="https://firebasestorage.googleapis.com/v0/b/denture-design.appspot.com/o/email_asserts%2Flogo.png?alt=media&amp;token=73d3c0de-6fef-4c04-80cb-0a40d6a3710d"
                  width="200"
                  style="width:200px;outline:none;border:none;text-decoration:none;vertical-align:middle;display:inline-block;max-width:100%"
                />
              </div>
              <div
                style="font-size:14px;font-weight:bold;padding:0px 24px 16px 24px"
              >
                Hi ${user_name} 👋,
              </div>
              <div
                style="color:#046e2b;font-weight:bold;text-align:center;padding:36px 24px 52px 24px"
              >
                <p>
                  Your account has been upgraded to an assessor account! Log in
                  to access the new features.
                </p>
              </div>
              <div
                style="font-size:13px;font-weight:normal;text-align:center;padding:16px 24px 16px 24px"
              >
                © ${new Date().getFullYear()} Denture Design Studio. All rights reserved.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).send({ status: "assessor accepted" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error sending reset email", error: err.message });
  }
});

module.exports = router;
