import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";

const AddImage = ({ handleClose }) => {
  const [img, setImg] = useState(null);

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
        console.log("File available at", downloadURL);
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Your answer image has been uploaded successfully",
          background: "#30505b",
          color: "#d3ecff",
          confirmButtonColor: "#66d8d8",
        }).then(() => {
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
            onChange={(e) => setImg(e.target.files[0])}
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
