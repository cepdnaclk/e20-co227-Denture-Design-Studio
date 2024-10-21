import { useState } from "react";

const AddDescription = ({ handleClose, answerDescription }) => {
  const [Description, setAnswerDescription] = useState("");
  const handleUploaddescription = () => {
    answerDescription(Description);
    handleClose();
  };
  return (
    <div className="ADoverly">
      <div className="ADcontent">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <h2 className="ADheader">Add Description</h2>
        <textarea
          className="descriptionTextarea"
          placeholder="Enter your description here..."
          value={Description}
          onChange={(e) => setAnswerDescription(e.target.value)}
        ></textarea>
        <button className="ADUpload" onClick={handleUploaddescription}>
          Upload Description
        </button>
      </div>
    </div>
  );
};

export default AddDescription;
