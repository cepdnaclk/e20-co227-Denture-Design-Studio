const router = require("express").Router();
const Assessor = require("../model/Assessor");

router.route("/add").post(async (req, res) => {
  const { first_name, last_name, email, user_name, password } = req.body;
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
  });

  await newAssessor
    .save()
    .then(() => {
      res.json("assessor added");
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
