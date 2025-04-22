import { useNavigate } from "react-router-dom";
import AddImage from "./AddImage";
import React, { useState, useEffect } from "react";

const AddAnswer = ({
  handleClose,
  openAddImage,
  isAddImageOpen,
  closeAddImage,
  setisImageUpload,
  answerImage,
  imgData,
  userdata,
  selectedData,
}) => {
  let navigate = useNavigate();
  const [isImageUpload, setIsImageUpload] = useState(false);
  
  // Use useEffect to update parent component state when local state changes
  useEffect(() => {
    setisImageUpload(isImageUpload);
  }, [isImageUpload, setisImageUpload]);

  // Function to handle image upload from AddImage component
  const handleImageUpload = (img) => {
    // Call the parent's answerImage function with the image
    answerImage(img);
    // Update local state
    setIsImageUpload(true);
  };

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
        {isAddImageOpen && (
          <AddImage
            handleClose={closeAddImage}
            setIsImageUpload={setIsImageUpload}
            answerImage={handleImageUpload}
          />
        )}
        <button
          className="AADesign"
          onClick={() => {
            const updateduserdata = {
              ...userdata,
              assessor: true,
              teethdata: selectedData,
            };
            setIsImageUpload(true);
            navigate("/addSaddles", {
              state: { userdata: updateduserdata, imgData },
            });
          }}
        >
          Design & Upload
        </button>
      </div>
    </div>
  );
};

export default AddAnswer;