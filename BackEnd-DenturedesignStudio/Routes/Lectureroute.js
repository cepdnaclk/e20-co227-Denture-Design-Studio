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

    // ✅ Extract the correct public_id for Cloudinary
    const url = new URL(videoUrl);
    const path = url.pathname; // e.g. /video/upload/v1234567890/folder/file.mp4

    // Remove version number and file extension
    const publicIdWithVersion = path.split("/upload/")[1]; // get everything after /upload/
    const publicIdParts = publicIdWithVersion.split("/");
    const version = publicIdParts[0]; // v1234567890 (ignore)
    const fileParts = publicIdParts.slice(1); // folder/.../filename.ext

    const fileNameWithExt = fileParts.pop(); // e.g., kk_2025-04-22.mp4
    const fileName = fileNameWithExt.replace(/\.[^/.]+$/, ""); // remove extension

    const folderPath = fileParts.join("/");
    const publicId = folderPath ? `${folderPath}/${fileName}` : fileName;

    // Detect resource type
    let resource_type = "image";
    if (videoUrl.includes("/video/")) resource_type = "video";
    else if (videoUrl.endsWith(".pdf")) resource_type = "raw";

    // Debug log
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
