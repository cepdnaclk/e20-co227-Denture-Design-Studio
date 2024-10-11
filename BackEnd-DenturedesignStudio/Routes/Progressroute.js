const router = require("express").Router();
const Progress = require("../model/userProgress");

router.post("/add", async (req, res) => {
  const {
    user_name,
    createCase,
    solveCase,
    completedLecture,
    solveTime,
    lectureTime,
  } = req.body;
  const existstudent = await Progress.findOne({ user_name });
  if (existstudent) {
    return res.status(400).send("Username already exists,cant create progress");
  }
  const userProgress = new Progress({
    user_name,
    createCase,
    solveCase,
    completedLecture,
    solveTime,
    lectureTime,
  });

  await userProgress
    .save()
    .then(() => {
      res.json("progress added");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding student", error: err.message });
    });
});

router.post("/get", async (req, res) => {
  const { user_name } = req.body;

  try {
    const progress = await Progress.findOne({ user_name });
    if (progress) {
      res.status(200).send({ status: "User fetched", progress });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error fetching user", error: err.message });
  }
});

router.put("/edit", async (req, res) => {
  const {
    user_name,
    createCase,
    solveCase,
    completedLecture,
    solveTime,
    lectureTime,
    videoId,
  } = req.body;
  try {
    const progress = await Progress.findOne({ user_name });
    if (!progress) {
      return res.status(404).send({ status: "User not found" });
    }
    if (createCase !== undefined) {
      progress.createCase = createCase;
    }
    if (solveCase !== undefined) {
      progress.solveCase = solveCase;
    }

    if (solveTime !== undefined) {
      progress.solveTime = solveTime;
    }
    if (lectureTime !== undefined) {
      progress.lectureTime = lectureTime;
    }
    if (!progress.watchedVideos.includes(videoId) && videoId !== undefined) {
      progress.watchedVideos.push(videoId);
    }
    await progress.save();
    res.status(200).send({ status: "Progress updated", progress });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error updating progress", error: err.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Progress.countDocuments();
    res.status(200).send({ count });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error getting document count", error: err.message });
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const { user_name } = req.body;
    const progress = await Progress.findOne({ user_name });

    if (progress) {
      await progress.deleteOne();
      res.status(200).send({ status: "progress deleted", progress });
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

module.exports = router;
