const router = require("express").Router();
const lecturecontent = require("../model/Lecturecontent");
const cloudinary = require("../cloudinary");

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

    if (!lecture) {
      return res.status(404).send({ status: "Lecture not found" });
    }

    const urlParts = lecture.videoUrl.split("/");
    const fileName = urlParts[urlParts.length - 1].split(".")[0]; 
    const publicId = `lectures/${fileName}`;

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video", 
    });

    // Delete from MongoDB
    await lecturecontent.findByIdAndDelete(id);

    return res.status(200).send({ status: "Lecture deleted successfully" });
  } catch (err) {
    console.error("Deletion error:", err);
    return res.status(500).send({ status: "Error deleting lecture", error: err.message });
  }
});


router.put("/edit", async (req, res) => {
  try {
  } catch (error) {}
});
router.get("/count", async (req, res) => {
  try {
    const count = await lecturecontent.countDocuments();
    res.status(200).send({ count });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send({ status: "Error getting document count", error: err.message });
  }
});
module.exports = router;
