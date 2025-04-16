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
      user: "denturedesignstudio1@gmail.com",
      pass: "yahy cihs gajv pdnb",
    },
  });

  const mailOptions = {
    from: "denturedesignstudio1@gmail.com",
    to: email,
    subject: "Verify your Account on denture design studio",
    html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff;border-radius:20px"
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
                Hi ${user_name} 👋,
              </div>
              <div
                style="font-size:18px;font-weight:bold;text-align:center;padding:0px 24px 24px 24px"
              >
                Welcome to Denture design Studio!
              </div>
              <div
                style="font-weight:normal;text-align:left;padding:16px 24px 16px 24px"
              >
                We&#x27;re thrilled to have you on board. To get started, please
                verify your Account address by clicking the button below.
              </div>
              <div style="text-align:center;padding:16px 24px 24px 24px">
                <a
                  href="https://denture-design-studio-front.vercel.app/verify/${token}?id=${userId}&amp;uname=${user_name}"
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
                  ><span>Verify your account</span
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

// Function to send reset email
async function sendResetEmail(email, userId, token, username) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "denturedesignstudio1@gmail.com",
      pass: "yahy cihs gajv pdnb",
    },
  });

  const mailOptions = {
    from: "denturedesignstudio1@gmail.com",
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
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff;border-radius:20px"
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
                  href="https://denture-design-studio-front.vercel.app/reset-password/student?token=${token}&amp;id=${userId}&amp;uname=${username}"
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

// Register new student and send verification email
router.post("/add", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    user_name,
    password,
    isAssessorRequested,
  } = req.body;
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
      isAssessorRequested,
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

// get By Email
app.post("/getByEmail", async (req, res) => {
  const { email } = req.body;
  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(200).json({ student: null }); // Don't send 404
  }

  res.json({ student });
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
  const {
    first_name,
    last_name,
    user_name,
    newuser_name,
    isAssessorRequested,
  } = req.body;

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
    if (isAssessorRequested === false) {
      student.isAssessorRequested = undefined;
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

router.post("/user-notverified", async (req, res) => {
  const { user_name } = req.body;
  try {
    const student = await Student.findOne({ user_name });
    if (!student) {
      return res.status(404).send("Student with this email does not exist.");
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "denturedesignstudio1@gmail.com",
        pass: "yahy cihs gajv pdnb",
      },
    });
    const mailOptions = {
      from: "denturedesignstudio1@gmail.com",
      to: student.email,
      subject: "Account Not Verified to Access Assessor",
      html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff;border-radius:20px"
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
                Hi ${user_name} 👋,
              </div>
              <div
                style="color:#ff0000;font-size:19px;font-weight:bold;text-align:center;padding:36px 24px 80px 28px"
              >
                Your account is not verify yet to accept the assessor account
                request.to accepet your request verify you account first.
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
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error sending reset email", error: err.message });
  }
});

router.post("/not-accepted-assessor", async (req, res) => {
  const { user_name } = req.body;
  try {
    const student = await Student.findOne({ user_name });
    if (!student) {
      return res.status(404).send("Student with this email does not exist.");
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "denturedesignstudio1@gmail.com",
        pass: "yahy cihs gajv pdnb",
      },
    });
    const mailOptions = {
      from: "denturedesignstudio1@gmail.com",
      to: student.email,
      subject: "Can't Accept Assessor Request",
      html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border:1px solid #ffffff;border-radius:20px"
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
                Hi ${user_name} 👋,
              </div>
              <div
                style="color:#f80a0a;font-weight:bold;text-align:center;padding:36px 24px 52px 24px"
              >
                Your request to upgrade the user account has been rejected by
                the admin. Log in to continue using your student account.
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
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error sending reset email", error: err.message });
  }
});

module.exports = router;
