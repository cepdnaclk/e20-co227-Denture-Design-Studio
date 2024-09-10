import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";

const AddImage = ({ handleClose, setIsImageUpload }) => {
  const [img, setImg] = useState(null);
  const handleClick = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImg(file);
      setIsImageUpload(true);
    }
  };
  const uploadImg = () => {
    if (!img) {
      console.error("No image selected for upload");
      return;
    }
    const fileName = img.name;
    const imgRef = ref(storage, `Answer/${fileName}`);
    const uploadTask = uploadBytesResumable(imgRef, img);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading image: ", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", setIsImageUpload);
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Your answer image has been uploaded successfully",
          background: "#30505b",
          color: "#d3ecff",
          confirmButtonColor: "#66d8d8",
        }).then(() => {
          setIsImageUpload(true);
          handleClose();
        });
      }
    );
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
