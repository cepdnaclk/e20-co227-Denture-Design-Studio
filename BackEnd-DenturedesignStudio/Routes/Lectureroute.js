const router = require("express").Router();
const lecturecontent = require("../model/Lecturecontent");
const cloudinary = require("../cloudinary");

router.post("/add", async (req, res) => {
  const { title, videoUrl, description } = req.body;
  const existlecture = await lecturecontent.findOne({ title });
  if (existlecture) {
    return res.status(400).send("Title already exists, use another title");
  }

  const newlecture = new lecturecontent({ title, videoUrl, description });

  await newlecture
    .save()
    .then(() => res.json("Lecture added"))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: "Error adding lecture", error: err.message });
    });
});

router.get("/", async (req, res) => {
  await lecturecontent
    .find()
    .then((lectures) => res.json(lectures))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: "Error fetching lectures", error: err.message });
    });
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await lecturecontent.findById(id);

    if (!lecture) {
      return res.status(404).send({ status: "Lecture not found" });
    }

    const videoUrl = lecture.videoUrl;

    // Extract public_id
    const url = new URL(videoUrl);
    const pathParts = url.pathname.split("/");

    // Remove filename and version
    const fileNameWithExt = pathParts.pop(); // e.g., kk_2025-04-22.mp4
    const version = pathParts.pop(); // e.g., v1745310443 (skip)

    const fileName = fileNameWithExt.split(".")[0]; // kk_2025-04-22
    const folderPath = pathParts.slice(pathParts.indexOf("upload") + 1).join("/");

    const publicId = `${folderPath}/${fileName}`;

    // Detect resource type
    let resource_type = "image";
    if (videoUrl.includes("/video/")) resource_type = "video";
    else if (videoUrl.endsWith(".pdf")) resource_type = "raw";

    // DEBUG LOG (optional)
    console.log("Attempting to delete from Cloudinary:", {
      publicId,
      resource_type,
    });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type,
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
    // You can implement this as needed
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).send({ status: "Error editing lecture", error: error.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await lecturecontent.countDocuments();
    res.status(200).send({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error getting document count", error: err.message });
  }
});

module.exports = router;
