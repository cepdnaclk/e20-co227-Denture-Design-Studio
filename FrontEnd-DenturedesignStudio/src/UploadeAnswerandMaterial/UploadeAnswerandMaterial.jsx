import "./UploadeAnswerandMaterial.css";
import { useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import React, { useState } from "react";
import AddDescription from "./AddDescription.jsx";
import AddMaterial from "./AddMaterials.jsx";
import AddAnswer from "./AddAnswer.jsx";

function UploadeAnswerandMaterial() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  const [isAddDescriptionOpen, setIsAddDescriptionOpen] = useState(false);
  const [isAddAnswerOpen, setIsAddAnswerOpen] = useState(false);
  const [isAddMaterialsOpen, setIsAddMaterialsOpen] = useState(false);

  const openAddDescription = () => {
    setIsAddDescriptionOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddDescription = () => {
    setIsAddDescriptionOpen(false);
    document.body.classList.remove("active-popup");
  };
  const openAddAnswer = () => {
    setIsAddAnswerOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddAnswer = () => {
    setIsAddAnswerOpen(false);
    document.body.classList.remove("active-popup");
  };
  const openAddMaterials = () => {
    setIsAddMaterialsOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddMaterials = () => {
    setIsAddMaterialsOpen(false);
    document.body.classList.remove("active-popup");
  };

  return (
    <div className="designPage">
      <Home onClick={() => handleClick("/assessorhome")}></Home>
      <BackComp
        onClick={() => handleClick("/assessorcreatepatientcase")}
      ></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />

      <h1 className="UAMHeader">Upload Answer/ Material/ Description</h1>

      <div className="UAMTeethBackground"></div>
      <div className="UAMButtonsbox">
        <button className="UAMButtons" id="Addanswer" onClick={openAddAnswer}>
          Add Answer
        </button>
        {isAddAnswerOpen && <AddAnswer handleClose={closeAddAnswer} />}

        <button
          className="UAMButtons"
          id="Adddescription"
          onClick={openAddDescription}
        >
          Add Description
        </button>
        {isAddDescriptionOpen && (
          <AddDescription handleClose={closeAddDescription} />
        )}

        <button
          className="UAMButtons"
          id="Uploadmaterial"
          onClick={openAddMaterials}
        >
          Upload Materials
        </button>
        {isAddMaterialsOpen && <AddMaterial handleClose={closeAddMaterials} />}
      </div>
    </div>
  );
}
export default UploadeAnswerandMaterial;
