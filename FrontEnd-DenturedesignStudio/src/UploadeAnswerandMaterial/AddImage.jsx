import React, { useState } from "react";
import { WiCloudUp } from "react-icons/wi";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const AddImage = ({ handleClose, setIsImageUpload, answerImage }) => {
  const [img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);

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

    try {
      setUploading(true);
      await answerImage(img); // Your backend logic
      setImg(null);
      setIsImageUpload(false);
      handleClose();
      toast.success("Image selected!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="AIoverly">
      <div className="AIcontent">
        <button className="AIclose-button" onClick={handleClose}>X</button>
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
          {img ? <h4>{img.name}</h4> : <WiCloudUp size={"4vw"} color="black" opacity={0.55} />}
        </div>
        <button className="AIUpload" onClick={uploadImg} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default AddImage;
