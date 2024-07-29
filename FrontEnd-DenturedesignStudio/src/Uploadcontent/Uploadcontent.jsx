import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import "./Uploadcontent.css";
import back from "./back.png";

const firebaseConfig = {
  apiKey: "AIzaSyD-3rkJLYHfuHJaT1ED3d7xjaBnm509KTU",
  authDomain: "denture-design.firebaseapp.com",
  projectId: "denture-design",
  storageBucket: "denture-design.appspot.com",
  messagingSenderId: "1017446132796",
  appId: "1:1017446132796:web:2310bde5d03176e7b86739",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function Uploadcontent({ onUpload, onback }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return;

    const currentDate = new Date().toISOString().split("T")[0];

    const originalFileName = file.name;
    const newFileName = `${currentDate}_${originalFileName}`;

    const folder = file.type.startsWith("video") ? "videos" : "pdfs";
    const storageRef = ref(storage, `${folder}/${newFileName}`);

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
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          onUpload({ title, file: downloadURL, description });

          setTitle("");
          setFile(null);
          setDescription("");
          setUploadProgress(0);
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="add-video">Add video/pdf</h2>
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <div className="upload-progress">
            <p>Uploading: {uploadProgress.toFixed(2)}%</p>
            <progress value={uploadProgress} max="100" />
          </div>
        ) : (
          <input
            type="file"
            className="content-video"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
