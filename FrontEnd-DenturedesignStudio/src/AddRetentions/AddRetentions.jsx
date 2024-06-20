import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRetentions.css';
import Home from '../homebutton/home';
import BackComp from '../backComp/backComp';


function AddRetentions() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
    <div className='designPage'>
      <div className="AddRetentions">
      <Home onClick={() => handleClick("/studenthome")}></Home>
      <BackComp onClick={() => handleClick("/addRests")}></BackComp>
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        </div>
        <div className="teethBackground1">
        <button className='addReciprocations' onClick={() => handleClick('/addReciprocations')}>
          <div className="addRecipText">
            <span className="addRecipText">Add Reciprocations</span>
          </div>
        </button>
        
        <ul className="retensions-list">
            <li className="retensions" onClick={() => handleClick()}>Occlusally Approaching :</li>
            <li className="retensions" onClick={() => handleClick()}>Gingivilly Approaching :</li>
        </ul>
  
        </div>
          <h2 className='AddSaddles'>Add Retentions</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
      </div>
      </div>    
    </>
  );
}

export default AddRetentions;
