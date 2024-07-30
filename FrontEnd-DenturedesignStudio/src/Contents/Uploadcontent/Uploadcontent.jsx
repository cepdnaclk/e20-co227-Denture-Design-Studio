import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.config";
import "./Uploadcontent.css";
import back from "./back.png";
import axios from "axios";
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
    if (!file) return;

    const currentDate = new Date().toISOString().split("T")[0];

    const originalFileName = file.name;
    const newFileName = `${currentDate}_${originalFileName}`;

    const folder = file.type.startsWith("video") ? "videos" : "pdfs";
    const storageRef = ref(storage, `lectures/${folder}/${newFileName}`);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed", error);
        },
        async () => {
          const videoUrl = await getDownloadURL(uploadTask.snapshot.ref);

          onUpload({ title, file: videoUrl, description });
          try {
            axios.post("http://localhost:5000/lecture/add", {
              title,
              videoUrl,
              description,
            });
          } catch (err) {
            console.log(err.message);
          }
          setTitle("");
          setFile(null);
          setDescription("");
          setUploadProgress(0);
          setErrorMessage("");
        }
      );
    } catch (error) {
      console.error("Upload failed", error);
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
          required
          placeholder={errorMessage ? errorMessage : ""}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />
        <h2 className="add-video">Add video/pdf</h2>
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div className="upload-progress">
            <p>Uploading: {uploadProgress.toFixed(2)}%</p>
            <progress value={uploadProgress} max="100" />
          </div>
        ) : (
          <div
            className="content-video"
            onClick={() =>
              document.querySelector(".content-video-file").click()
            }
          >
            <input
              type="file"
              className="content-video-file"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
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
