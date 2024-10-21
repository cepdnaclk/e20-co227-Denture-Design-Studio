import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";
import { WiCloudUp } from "react-icons/wi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";

const AddImage = ({ handleClose, setIsImageUpload, answerImageurl }) => {
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
      toast.error("No image selected for upload!"); // Show error toast
      return;
    }

    const fileName = `Answer ${img.name} -${new Date().toTimeString()}.png`;
    const imgRef = ref(
      storage,
      `ActualQuestions/${new Date().toDateString()}/${fileName}`
    );

    const uploadTask = uploadBytesResumable(imgRef, img);

    const toastId = toast.loading("Uploading image..."); // Show loading notification

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading image: ", error);
        toast.update(toastId, {
          render: "Error uploading image!",
          type: "error",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          setIsImageUpload(true);

          toast.update(toastId, {
            render: "Image uploaded successfully!",
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
            answerImageurl(downloadURL); // Store the image URL
            handleClose(); // Close the modal or whatever function is intended
          });
        } catch (error) {
          console.error("Error getting download URL: ", error);
          toast.update(toastId, {
            render: "Error getting download URL!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    );
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
