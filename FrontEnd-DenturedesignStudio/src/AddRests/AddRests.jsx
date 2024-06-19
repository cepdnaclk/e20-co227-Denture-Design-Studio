import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRests.css';
import Home from 'E:/e20-co225-Denture-Design-Studio/FrontEnd-DenturedesignStudio/src/homebutton/home.jsx';
import BackComp from '../backComp/backComp';


function AddRests() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <div className="AddRests">
      <Home onClick={() => handleClick("/studenthome")}></Home>
      <BackComp onClick={() => handleClick("/AddSaddles")}></BackComp>
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        </div>
        <div className="teethBackground1">
        <button className='addRetentions' onClick={() => handleClick('/addRetentions')}>
          <div className="addRetenText">
            <span className="addRetenText">Add Retentions</span>
          </div>
        </button>
        
        <ul className="rests-list">
            <li className="rests" onClick={() => handleClick()}>Occlusal Rests :</li>
            <li className="rests" onClick={() => handleClick()}>Cingulum Rests :</li>
            <li className="rests" onClick={() => handleClick()}>Incisal Rests :</li>
        </ul>
  
        </div>
          <h2 className='AddRests'>Add Rests</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
      </div>
        
    </>
  );
}

export default AddRests;
