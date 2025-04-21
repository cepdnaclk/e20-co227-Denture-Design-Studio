import "./Removecontent.css";
import axios from "axios";
import icon from "./materialIcon.png";

function Removecontent({ back, remove, material }) {
  const removehandle = async () => {
    try {
      // Send delete request to your backend
      const res = await axios.delete(
        `https://e20-co227-denture-design-studio.onrender.com/lecture/delete/${material._id}`,
        {
          data: { publicUrl: material.videoUrl },
        }
      );
      console.log("Deleted:", res.data);

      // Inform parent component
      remove(material);
    } catch (error) {
      console.error("Failed to delete lecture:", error);
      alert("Failed to delete lecture");
    }
  };

  return (
    <div>
      <div className="remove-content-overlay"></div>
      <div className="remove-content">
        <h1>Do you want to remove this content?</h1>
        <h2>
          <img src={icon} alt="icon" />
          {material.title}
        </h2>
        <button className="remove-btn" onClick={removehandle}>
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
