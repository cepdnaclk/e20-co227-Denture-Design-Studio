import React, { useState } from "react";
import axios from "axios";
import "./Uploadcontent.css";
import back from "./back.png";
import { WiCloudUp } from "react-icons/wi";

function Uploadcontent({ onUpload, onback }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    if (!title) {
      setErrorMessage("Title is required!");
      return;
    }
    if (!file) {
      setErrorMessage("Please select a file!");
      return;
    }
  
    const currentDate = new Date().toISOString().split("T")[0];
    const isVideo = file.type.startsWith("video");
    const isPdf = file.type === "application/pdf";
    const folderName = isVideo
      ? "lectures/videos"
      : isPdf
      ? "lectures/pdfs"
      : "lectures/images";
  
    const resourceType = isVideo ? "video" : isPdf ? "raw" : "image";
    const publicId = `${folderName}/${title}_${currentDate}`;
  
    try {
      // 🔐 Get signature from your backend
      const sigRes = await axios.post("https://e20-co227-denture-design-studio.onrender.com/api/cloudinary-signature", {
        public_id: publicId,
        folder: folderName,
      });
  
      const { signature, timestamp, apiKey, cloudName } = sigRes.data;
  
      // 🔼 Upload to Cloudinary with signed data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("public_id", publicId);
      formData.append("folder", folderName);
  
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        }
      );
  
      const uploadedUrl = uploadRes.data.secure_url;
  
      // 🔔 Notify parent
      onUpload({ title, file: uploadedUrl, description });
  
      // 🧾 Store lecture metadata
      await axios.post("https://e20-co227-denture-design-studio.onrender.com/lecture/add", {
        title,
        videoUrl: uploadedUrl,
        description,
      });
  
      // 🔁 Reset form
      setTitle("");
      setFile(null);
      setDescription("");
      setUploadProgress(0);
      setErrorMessage("");
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Upload failed. Please try again.");
    }
  };
  

  return (
    <div>
      <div className="upload-content-overlay"></div>
      <div className="upload-content">
        <h1>Upload Content</h1>

        <h2 className="add-title">Add title :</h2>
        <input
          type="text"
          className="title"
          value={title}
          placeholder={errorMessage ? errorMessage : ""}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
        />

        <h2 className="add-video">Add video/pdf/image</h2>
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div className="upload-progress">
            <p>Uploading: {uploadProgress.toFixed(2)}%</p>
            <progress value={uploadProgress} max="100" />
          </div>
        ) : (
          <div
            className="content-video"
            onClick={() => document.querySelector(".content-video-file").click()}
          >
            <input
              type="file"
              className="content-video-file"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              accept="video/*,application/pdf,image/*"
            />
            {file ? (
              <h4>{file.name}</h4>
            ) : (
              <WiCloudUp size={"4vw"} color="black" opacity={0.55} />
            )}
          </div>
        )}

        <h2 className="add-description">Add description</h2>
        <textarea
          className="content-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="upload-btn" onClick={handleUpload}>
          Upload Content
        </button>
        <button className="back-btn" onClick={onback}>
          <img src={back} alt="back" />
        </button>
      </div>
    </div>
  );
}

export default Uploadcontent;
