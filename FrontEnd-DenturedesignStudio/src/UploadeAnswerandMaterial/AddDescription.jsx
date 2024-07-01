const AddDescription = ({ handleClose }) => {
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
        ></textarea>
        <button className="ADUpload">Upload Description</button>
      </div>
    </div>
  );
};

export default AddDescription;
