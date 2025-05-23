import React, { useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { toast } from "react-toastify"; // Changed from react-hot-toast
import axios from "axios";
// Removed incorrect react-toastify.css import, assuming global CSS for react-toastify

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

    try {
      answerMaterial(img); // Pass URL to parent
      handleClose(); 
      toast.success("Material selected!");

    } catch (error) {
      console.error("Upload error:", error);
      // toast.update was used with toastId, which is not defined here.
      // Assuming a simple error toast is sufficient as toastId was from react-hot-toast context.
      toast.error("Error uploading material!");
    }
    // toast.dismiss was used with toastId, which is not defined here.
    // react-toastify auto-dismisses by default or can be configured in ToastContainer.
  };

  return (
    <div className="AMoverly">
      <div className="AMcontent">
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
