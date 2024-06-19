import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSaddles.css';
import Home from '../homebutton/home';


function AddSaddles() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className='designPage'>
    <Home onClick={() => handleClick("/studenthome")}></Home>

      <div className="AddSaddles">        
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        <button className='skipButton' onClick={() => handleClick('/addSaddles')}>
          <div className="skipButtonText">
            <span className="skipButtonText">Skip</span>
          </div>
        </button>
        </div>
        <div className="teethBackground1">
        <button className='addRests' onClick={() => handleClick('/addRests')}>
          <div className="addRestsText">
            <span className="addRestText">Add Rests</span>
          </div>
        </button>
        </div>
          <h2 className='AddSaddles'>Add Saddles</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
      </div>
      
    </div>
  );
}

export default AddSaddles;
