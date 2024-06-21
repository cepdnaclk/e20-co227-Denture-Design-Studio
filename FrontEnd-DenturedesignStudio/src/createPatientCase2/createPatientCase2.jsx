import React from 'react';
import { useNavigate } from 'react-router-dom';
import './createPatientCase2.css';
import Home from '../homebutton/home';
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";

function CreatePatientStep2() {
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="CreatePatientCase2">
      <Home onClick={() => handleClick("/studenthome")} />
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className='teethBackground'></div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <h2 className='createAPatientCase2'>Create a Patient Case</h2>
        <h1 className='steps2'>
          step 3 : Select undercuts<br />
          step 4 : Click Create
        </h1>
      </div>
      <div id="#create1">
        <CreateUploadButton
          Name="Create"
          Pagetogo="/addSaddles"
        />
      </div>
    </div>
  );
}

export default CreatePatientStep2;
