import React, { useState } from "react";
import "./Uploadcontent.css";
import back from "./back.png";

function Uploadcontent({ onUpload, onback }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleUpload = () => {
    onUpload({ title, file, description });
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="add-video">Add video/pdf</h2>
        <input
          type="file"
          className="content-video"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <h2 className="add-description">Add description</h2>
        <textarea
          name=""
          className="content-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="upload-btn" onClick={handleUpload}>
          Upload Content
        </button>
        <button className="back-btn" onClick={onback}>
          <img src={back} alt="" />
        </button>
      </div>
    </div>
  );
}
export default Uploadcontent;
