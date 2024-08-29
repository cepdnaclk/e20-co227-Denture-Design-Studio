import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSaddles.css";
import Home from "../homebutton/home";
import Teeth from "../TeethComp/Teeth";

function AddSaddles() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const [visibleundercut, setVisibleundercut] = useState({
    canEdit: false,
    visible: false,
  });
  const [missingtooth, setMissingtooth] = useState(false);
  const [selectedData, setSelectedData] = useState({
    restdata: null,
    missingteeth: null,
    undercuts: null,
    plates: null,
  });

  const handleClick = (path) => {
    navigate(path, { state: { userdata } });
  };
  const handleundercutVisibility = (visibleundercut) => {
    setVisibleundercut({
      canEdit: !visibleundercut.canEdit,
      visible: !visibleundercut.visible,
    });
  };
  const handleMissingTeeth = (missingtooth) => {
    setMissingtooth(!missingtooth);
  };

  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
    });
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
              onClick={() =>
                navigate("/addRests", {
                  state: { selectedData },
                })
              }
            >
              <div className="addRestsText">
                <span className="addRestText">Add Rests</span>
              </div>
            </button>
            <h1
              className="selectMissingTeeth"
              onClick={() => {
                handleMissingTeeth(missingtooth);
                console.log("Missing Teeth state updated:", missingtooth);
              }}
              style={{ color: missingtooth ? "#d3ecff" : "rgb(102, 216, 216" }}
            >
              Set Missing Teeth
            </h1>
            <h1
              className="selectUnderCut"
              onClick={() => handleundercutVisibility(visibleundercut)}
              style={{
                color: visibleundercut.canEdit
                  ? "#d3ecff"
                  : "rgb(102, 216, 216",
              }}
            >
              Select Undercuts
            </h1>
          </div>

          <div className="teethBackground1">
            <div className="retention-teeth">
              {/* Teeth component with interaction enabled */}
              <Teeth
                setMissingtooth={missingtooth}
                value={visibleundercut}
                selectRest={true}
                setData={setData}
                DentureData={selectedData}
                selectPlate={{ view: false }}
              />
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
