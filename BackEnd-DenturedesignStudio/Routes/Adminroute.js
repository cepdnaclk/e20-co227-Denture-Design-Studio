const router = require("express").Router();
const Admin = require("../model/Admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "denturedesignstudio1@gmail.com",
    pass: "yahy cihs gajv pdnb",
  },
});

router.route("/add").post(async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
  const existadmin = await Admin.findOne({ user_name });
  if (existadmin) {
    return res.status(400).send("username already exist use another one");
  }
  const newAdmin = new Admin({
    first_name,
    last_name,
    email,
    user_name,
    password,
  });

  await newAdmin
    .save()
    .then(() => {
      res.json("admin added");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding admin", error: err.message });
    });
});

router.route("/").get(async (req, res) => {
  await Admin.find()
    .then((admin) => {
      res.json(admin);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error fetching adminss", error: err.message });
    });
});

router.post("/get", async (req, res) => {
  const { user_name } = req.body;
  try {
    const admin = await Admin.findOne({ user_name });
    admin.lastAccessed = new Date();
    await admin.save();
    if (admin) {
      res.status(200).send({ status: "User fetched", admin });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(501).send({ status: "Error fetching user", error: err.message });
  }
});
router.post("/getByEmail", async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(200).json({ admin: null }); // Don't send 404
  }

  res.json({ admin });
});


router.post("/send-email", async (req, res) => {
  try {
    const admins = await Admin.find();
    const requesterName = req.body.user_name;
    if (admins.length === 0) {
      return res.status(404).send({ status: "No admins found" });
    }

    // Create an array of promises for sending emails
    const emailPromises = admins.map((admin) => {
      const mailOptions = {
        from: "denturedesignstudio1@gmail.com",
        to: admin.email,
        subject: "Assessor Account Request",

        html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#F2F5F7;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#aaffe4;border-radius:20px;border:1px solid #ffffff"
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
                Hello Admin ${admin.user_name} 👋,
              </div>
              <div
                style="color:#000000;font-weight:bold;text-align:center;padding:36px 24px 8px 24px"
              >
                <p>
                  The user ${requesterName}has requested an assessor account on the
                  Denture Design Studio platform.
                </p>
              </div>
              <div
                style="font-weight:bold;text-align:center;padding:16px 24px 40px 24px"
              >
                Please review their request and take the necessary actions to
                approve or reject the account upgrade.
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
</html>
        `,
      };
      return transporter.sendMail(mailOptions);
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.status(200).send("Emails sent successfully to all admins");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error sending emails", error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { user_name } = req.body;
    const admin = await Admin.findOne({ user_name });

    if (admin) {
      await admin.deleteOne({ user_name });
      return res.status(200).send({ status: "user delete", admin });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error delete user", error: err.message });
  }
});
module.exports = router;
