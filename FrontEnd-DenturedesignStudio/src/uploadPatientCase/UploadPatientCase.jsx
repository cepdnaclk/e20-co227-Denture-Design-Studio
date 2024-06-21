import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPatientCase.css';
import Home from '../homebutton/home';
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";

function UploadPatientCase() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <div className="UploadPatientCase1">
        <Home onClick={() => handleClick("/Assessorhome")}></Home>
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className='teethBackground'></div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
          <h2 className='uploadAPatientCase'>Create and Upload a Patient Case</h2>
          <h1 className='steps1'>
            step 1 : Select missing teeth<br />
            step 2 : Click Add Undercuts
          </h1>
        </div>
        <div id="addUndercuts2">
          <CreateUploadButton
            Name={"Add Undercuts"}
            Pagetogo={() => navigate("/uploadpatient2")}
          />
        </div>
      </div>
    </>
  );
}

export default UploadPatientCase;
