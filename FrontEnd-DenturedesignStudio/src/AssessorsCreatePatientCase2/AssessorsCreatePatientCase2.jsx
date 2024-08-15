import React from "react";
import { useNavigate } from "react-router-dom";
import "./AssessorsCreatePatientCase2.css";
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
      <BackComp onClick={() => handleClick("/uploadpatient")} />
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
            step 3 : Select undercuts
            <br />
            step 4 : Click Create & Upload
          </h1>
        </div>
      </div>
      <div id="create1">
        {" "}
        {/* Fixed the id to be without the # symbol */}
        <CreateUploadButton
          Name="Create & Upload"
          Pagetogo="/uploadanswerandmaterial"
        />
      </div>
    </div>
  );
}

export default AssessorCreatePatientStep2;
