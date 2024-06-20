import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddConnectors.css';
import Home from '../homebutton/home';
import BackComp from '../backComp/backComp';


function AddConnectors() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
    <div className='designPage'>
    <Home onClick={() => handleClick("/studenthome")}></Home>
    <BackComp onClick={() => handleClick("/AddIndirectRetentions")}></BackComp>
      <div className="AddConnectors">
        <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
        <div className="Questionbox">
        </div>
        <div className="teethBackground1">
        <button className='Done' onClick={() => handleClick('/reviewAnswer')}>
          <div className="DoneText">
            <span className="DoneText">Done</span>
          </div>
        </button>
        
        <ul className="connectors-list">
            <li className="connectors" onClick={() => handleClick()}>Upper</li>
            <li className="connectors" onClick={() => handleClick()}>Lower</li>
        </ul>
  
        </div>
          <h2 className='AddConnectors'>Add Connectors</h2>
          <h2 className='yourQuestion'>Your Question</h2>
          <h1 className='yourCase'>Your Case :</h1>
        </div>
        
        </div>
      </div>    
    </>
  );
}

export default AddConnectors;
