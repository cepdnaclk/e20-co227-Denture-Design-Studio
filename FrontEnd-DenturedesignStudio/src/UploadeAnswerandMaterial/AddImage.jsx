import React, { useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddImage = ({ handleClose, setIsImageUpload, answerImage }) => {
  const [img, setImg] = useState(null);

  const handleClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setIsImageUpload(true);
    }
  };

  const uploadImg = async () => {
    if (!img) {
      toast.error("No image selected for upload!");
      return;
    }

    console.log("Image to upload:", img);
    

    try {

      answerImage(img);
      handleClose();
      toast.update(toastId, {
        render: "Image uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.update(toast, {
        render: "Error uploading image!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="AIoverly">
      <div className="AIcontent">
        <button className="AIclose-button" onClick={handleClose}>
          X
        </button>
        <h2 className="AIheader">Upload Image</h2>
        <p className="AIformat">Supported formats: .png, .jpg, .jpeg</p>
        <div
          className="AImageUpload"
          onClick={() => document.querySelector(".inputimage").click()}
        >
          <input
            className="inputimage"
            type="file"
            onChange={handleClick}
            hidden
          />
          {img ? (
            <h4>{img.name}</h4>
          ) : (
            <WiCloudUp size={"4vw"} color="black" opacity={0.55} />
          )}
        </div>
        <button className="AIUpload" onClick={uploadImg}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default AddImage;
