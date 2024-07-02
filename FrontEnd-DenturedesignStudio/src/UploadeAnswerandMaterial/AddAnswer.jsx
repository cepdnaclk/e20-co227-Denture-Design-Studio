import { useNavigate } from "react-router-dom";

const AddAnswer = ({ handleClose }) => {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="AAoverly">
      <div className="AAcontent">
        <button className="AAclose-button" onClick={handleClose}>
          X
        </button>
        <h1 className="AAheader">Add Answer</h1>
        <button className="AAUploadImage">Upload Image</button>
        <button className="AADesign" onClick={() => navigate("/addSaddles")}>
          Design & Upload
        </button>
      </div>
    </div>
  );
};

export default AddAnswer;
