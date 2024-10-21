import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";

const AddMaterial = ({ handleClose, answerMaterialUrl }) => {
  const [img, setImg] = useState(null);

  const uploadImg = () => {
    if (!img) {
      console.error("No image selected for upload");
      return;
    }
    const fileName = `${new Date().toTimeString()} ${img.name}`;
    const imgRef = ref(
      storage,
      `ActualQuestions/${new Date().toDateString()}/materials_${fileName}`
    );
    const uploadTask = uploadBytesResumable(imgRef, img);
    const toastId = toast.loading("Uploading image...");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading image: ", error);
        toast.update(toastId, {
          render: "Error uploading support material!",
          type: "error",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        toast.update(toastId, {
          render: "support material uploaded successfully!",
          position: "top-center",
          type: "success",
          isLoading: false,
          autoClose: 2000, // Close after 2 seconds
        });
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Your answer image has been uploaded successfully",
          background: "#30505b",
          color: "#d3ecff",
          confirmButtonColor: "#66d8d8",
        }).then(() => {
          answerMaterialUrl(downloadURL);
          handleClose();
        });
      }
    );
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
            onChange={(e) => setImg(e.target.files[0])}
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
