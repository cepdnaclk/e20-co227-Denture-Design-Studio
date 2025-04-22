import React, { useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dktoulisw/image/upload";
const UPLOAD_PRESET = "bkkv4t3d";

const AddImage = ({ handleClose, setIsImageUpload, answerImageurl }) => {
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
      console.error("No image selected for upload");
      toast.error("No image selected for upload!");
      return;
    }

    const toastId = toast.loading("Uploading image...");

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", `ActualQuestions/${new Date().toDateString()}`);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setIsImageUpload(true);

        toast.update(toastId, {
          render: "Image uploaded successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Your answer image has been uploaded successfully",
          background: "#30505b",
          color: "#d3ecff",
          confirmButtonColor: "#66d8d8",
        }).then(() => {
          answerImageurl(data.secure_url); // Send Cloudinary URL to parent
          handleClose();
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.update(toastId, {
        render: "Error uploading image!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="AIoverly">
      <ToastContainer />
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
