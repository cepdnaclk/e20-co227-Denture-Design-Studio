import React from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPatientCase.css";
import Home from "../homebutton/home";
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";
import BackComp from "../backComp/backComp";
function AssessorCreatePatientStep2() {
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="CreatePatientCase2">
      <Home onClick={() => handleClick("/assessorhome")} />
      <BackComp onClick={() => handleClick("/assessorhome")} />
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
        />
        <div className="teethBackground"></div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="text">
          <h2 id="createAPatientCase2">Create a Patient Case</h2>
          <h1 id="steps2">
            step 1 : Select missing teeth
            <br />
            step 2 : Click Add undercuts
          </h1>
        </div>
      </div>
      <div id="create1">
        <CreateUploadButton
          Name="Add Undercuts"
          Pagetogo="/assessorcreatepatientcase"
        />
      </div>
    </div>
  );
}

export default AssessorCreatePatientStep2;
