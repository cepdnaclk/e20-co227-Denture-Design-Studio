import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddReciprocations.css';
import Home from '../homebutton/home';
import BackComp from '../backComp/backComp';


function AddReciprocations() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
    <div className='designPage'>
    <Home onClick={() => handleClick("/studenthome")}></Home>
    <BackComp onClick={() => handleClick("/AddRetentions")}></BackComp>
      <div className="AddRests">
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        </div>
        <div className="teethBackground1">
        <button className='addIndirectRetentions' onClick={() => handleClick('/addIndirectRetentions')}>
          <div className="addIndiRetenText">
            <span className="addIndiRetenText">Add Indirect Retentions</span>
          </div>
        </button>
        
        <ul className="reciprocations-list">
            <li id="clasp" onClick={() => handleClick()}>Clasp :</li>
            <li id="plate" onClick={() => handleClick()}>Plate :</li>
        </ul>
  
        </div>
          <h2 className='AddReciprocations'>Add Reciprocations</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
        </div>
      </div>    
    </>
  );
}

export default AddReciprocations;
