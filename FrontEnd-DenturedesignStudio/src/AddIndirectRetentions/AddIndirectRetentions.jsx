import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddIndirectRetentions.css';
import Home from '../homebutton/home';
import BackComp from '../backComp/backComp';


function AddIndirectRetentions() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
    <div className='designPage'>
    <Home onClick={() => handleClick("/studenthome")}></Home>
    <BackComp onClick={() => handleClick("/AddReciprocations")}></BackComp>
      <div className="AddIndirectRetentions">
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        </div>
        <div className="teethBackground1">
        <button className='addConnectors' onClick={() => handleClick('/AddConnectors')}>
          <div className="addConnectText">
            <span className="addConnectText">Add Connectors</span>
          </div>
        </button>
        
        <ul className="rests-list">
                <li id="occlusalRestsI" onClick={() => handleClick()}>Occlusal Rests :</li>
                <li id="cingulumRestsI" onClick={() => handleClick()}>Cingulum Rests :</li>
                <li id="incisalRestsI" onClick={() => handleClick()}>Incisal Rests :</li>
              </ul>
  
        </div>
          <h2 className='AddIndirectRetentions'>Add Indirect Retentions</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
        </div>
      </div>    
    </>
  );
}

export default AddIndirectRetentions;
