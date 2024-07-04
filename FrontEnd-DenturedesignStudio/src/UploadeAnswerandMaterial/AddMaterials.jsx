const AddMaterial = ({ handleClose }) => {
  return (
    <div className="AMoverly">
      <div className="AMcontent">
        <button className="AMclose-button" onClick={handleClose}>
          X
        </button>
        <h2 className="AMheader">Upload Material</h2>
        <p className="AMformat">Supported formats: .png, .jpg, .jpeg</p>
        <textarea
          className="AMdescriptionTextarea"
          placeholder="Drag and Drop here!  "
        ></textarea>
        <button className="AMUpload">Upload Material</button>
      </div>
    </div>
  );
};

export default AddMaterial;
