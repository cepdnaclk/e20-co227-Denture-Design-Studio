import { useNavigate } from "react-router-dom";
import AddImage from "./AddImage";
import React, { useState } from "react";

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
  setisImageUpload(isImageUpload);
  console.log(isImageUpload);

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
            setIsImageUpload={(state) => setIsImageUpload(state)}
            answerImage={(url) => answerImage(url)}
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
            setisImageUpload(true);
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
