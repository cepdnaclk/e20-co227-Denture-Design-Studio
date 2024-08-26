import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSaddles.css";
import Home from "../homebutton/home";
import Teeth from "../TeethComp/Teeth";

function AddSaddles() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const [visibleundercut, setVisibleundercut] = useState(false);
  const [missingtooth, setMissingtooth] = useState(false);
  const handleClick = (path) => {
    navigate(path, { state: { userdata } });
  };
  const handleundercutVisibility = (visibleundercut) => {
    setVisibleundercut(!visibleundercut);
  };
  const handleMissingTeeth = (missingtooth) => {
    setMissingtooth(!missingtooth);
  };

  return (
    <div className="designPage">
      <Home
        onClick={() => navigate("/studenthome", { state: { userdata } })}
      ></Home>

      <div className="AddSaddles">
        <div>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
          />
          <div className="Questionbox">
            <button
              className="skipButton"
              onClick={() => handleClick("/addSaddles")}
            >
              <div className="skipButtonText">
                <span className="skipButtonText">Skip</span>
              </div>
            </button>
            <button
              className="addRests"
              onClick={() => handleClick("/addRests")}
            >
              <div className="addRestsText">
                <span className="addRestText">Add Rests</span>
              </div>
            </button>
            <button
              className="selectMissingTeeth"
              onClick={() => {
                handleMissingTeeth(missingtooth);
                console.log("Missing Teeth state updated:", missingtooth);
              }}
            >
              <div className="selectMissingTeethtext">
                <span className="selectMissingTeethtext">
                  Set Missing Teeth
                </span>
              </div>
            </button>
            <button
              className="selectUnderCut"
              onClick={() => handleundercutVisibility(visibleundercut)}
            >
              <div className="selectUnderCuttext">
                <span className="selectUnderCutText">Select Undercuts</span>
              </div>
            </button>
          </div>

          <div className="teethBackground1">
            <div className="retention-teeth">
              {/* Teeth component with interaction enabled */}
              <Teeth click={(index) => console.log(`Clicked tooth ${index}`)} />
            </div>
          </div>

          <h2 className="AddSaddles">Add Saddles</h2>
          <h2 className="yourQuestion">Your Question</h2>
          <h1 className="yourCase">Your Case :</h1>
        </div>
      </div>
    </div>
  );
}

export default AddSaddles;
