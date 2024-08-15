import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSaddles.css";
import Home from "../homebutton/home";
import Teeth from "../TeethComp/Teeth";

function AddSaddles() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;

  const handleClick = (path) => {
    navigate(path, { state: { userdata } });
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
          </div>
          <div >
          <Teeth click={(index) => console.log(`Clicked tooth ${index}`)} />
  
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