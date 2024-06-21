import React from 'react';
import { useNavigate } from 'react-router-dom';
import './createPatientCase.css';
import Home from '../homebutton/home';
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";

function CreatePatientStep1() {
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="CreatePatientCase1">
      <Home onClick={() => handleClick("/studenthome")} />
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className='teethBackground'></div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <h2 className='createAPatientCase1'>Create a Patient Case</h2>
        <h1 className='steps1'>
          step 1 : Select missing teeth<br />
          step 2 : Click add undercuts
        </h1>
      </div>
      <div id="addUndercuts1">
        <CreateUploadButton
          Name="Add Undercuts"
          Pagetogo="/createpatient2"
        />
      </div>
    </div>
  );
}

export default CreatePatientStep1;
