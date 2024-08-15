import { useNavigate } from "react-router-dom";
import AddImage from "./AddImage";
import React, { useState } from "react";

const AddAnswer = ({
  handleClose,
  openAddImage,
  isAddImageOpen,
  closeAddImage,
}) => {
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
        <button className="AAUploadImage" onClick={openAddImage}>
          Upload Image
        </button>
        {isAddImageOpen && <AddImage handleClose={closeAddImage} />}
        <button className="AADesign" onClick={() => navigate("/addSaddles")}>
          Design & Upload
        </button>
      </div>
    </div>
  );
};

export default AddAnswer;
