import "./Removecontent.css";
import axios from "axios";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../firebase.config";
import icon from "./materialIcon.png";
function Removecontent({ back, remove, material }) {
  const removehandle = async (material) => {
    try {
      const fileRef = ref(storage, material.videoUrl);
      await deleteObject(fileRef);
      axios
        .delete(
          `https://e20-co225-denture-design-studio.onrender.com/lecture/delete/${material._id}`
        )
        .then((response) => {
          console.log("Response:", response.data);
          remove(material);
        })
        .catch((error) => {
          console.error("There was an error deleting the lecture!", error);
          alert("Failed to delete lecture1");
        });
    } catch (error) {
      console.error("There was an error deleting the lecture!", error);
      alert("Failed to delete lecture");
    }
  };

  return (
    <div>
      <div className="remove-content-overlay"></div>
      <div className="remove-content">
        <h1>Do you want to remove this content?</h1>
        <h2>
          <img src={icon} alt="" />
          {material.title}
        </h2>
        <button className="remove-btn" onClick={() => removehandle(material)}>
          Remove
        </button>
        <button className="back-btn" onClick={back}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Removecontent;
