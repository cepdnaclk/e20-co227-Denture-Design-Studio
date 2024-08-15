const router = require("express").Router();
const lecturecontent = require("../model/Lecturecontent");

router.post("/add", async (req, res) => {
  const { title, videoUrl, description } = req.body;
  const existlecture = await lecturecontent.findOne({ title });
  if (existlecture) {
    return res.status(400).send("title already exists, use another title");
  }
  const newlecture = new lecturecontent({ title, videoUrl, description });

  await newlecture
    .save()
    .then(() => {
      res.json("lecture added");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error adding lecture", error: err.message });
    });
});

router.get("/", async (req, res) => {
  await lecturecontent
    .find()
    .then((lectures) => {
      res.json(lectures);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error fetching lecture", error: err.message });
    });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await lecturecontent.findById(id);

    if (lecture) {
      await lecturecontent.findOneAndDelete(id);
      return res.status(200).send({ status: "lecture delete", lecture });
    } else {
      res.status(404).send({ status: "lecture not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error delete user", error: err.message });
  }
});

router.put("/edit", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
