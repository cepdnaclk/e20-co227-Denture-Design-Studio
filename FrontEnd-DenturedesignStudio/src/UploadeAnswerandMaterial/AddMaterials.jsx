import React, { useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddMaterial = ({ handleClose, answerMaterial }) => {
  const [img, setImg] = useState(null);

  const handleClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const uploadImg = async () => {
    if (!img) {
      toast.error("No file selected for upload!");
      return;
    }

    const toastId = toast.loading("Uploading material...");
    try {
      answerMaterial(img); // Pass URL to parent
      handleClose(); 
    } catch (error) {
      console.error("Upload error:", error);
      toast.update(toastId, {
        render: "Error uploading material!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="AMoverly">
      <div className="AMcontent">
        <ToastContainer />
        <button className="AMclose-button" onClick={handleClose}>
          X
        </button>
        <h2 className="AMheader">Upload Material</h2>
        <p className="AMformat">Supported formats: .png, .jpg, .jpeg</p>
        <div
          className="AMimageUpload"
          onClick={() => document.querySelector(".inputimage").click()}
        >
          <input
            className="inputimage"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleClick}
            hidden
          />
          {img ? (
            <h4>{img.name}</h4>
          ) : (
            <WiCloudUp size={"4vw"} color="black" opacity={0.55} />
          )}
        </div>
        <button className="AMUpload" onClick={uploadImg}>
          Upload Material
        </button>
      </div>
    </div>
  );
};

export default AddMaterial;
