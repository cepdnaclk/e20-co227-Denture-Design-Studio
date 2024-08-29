import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddRetentions.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddRetentions() {
  let navigate = useNavigate();
  const location = useLocation();
  const typeselect = location.state?.typeselect;
  const selectedData = location.state?.selectedData;
  function handleClick(path) {
    navigate(path);
  }
  console.log(selectedData);
  return (
    <>
      <div className="designPage">
        <div className="AddRetentions">
          <Home onClick={() => handleClick("/studenthome")}></Home>
          <BackComp
            onClick={() =>
              navigate("/addRests", {
                state: { selectedData, typeselect: true },
              })
            }
          ></BackComp>
          <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
            />
            <div className="Questionbox"></div>
            <div className="teethBackground1">
              <button
                className="addReciprocations"
                onClick={() =>
                  navigate("/addReciprocations", {
                    state: { selectedData, typeselect: true },
                  })
                }
              >
                <div className="addRecipText">
                  <span className="addRecipText">Add Reciprocations</span>
                </div>
              </button>

              <ul className="retentions-list">
                <li id="occlusally" onClick={() => handleClick()}>
                  Occlusally Approaching :
                </li>
                <li id="gingivilly" onClick={() => handleClick()}>
                  Gingivilly Approaching :
                </li>
              </ul>
              <div className="retention-teeth">
                <Teeth
                  selectRest={{ selectrest: typeselect }}
                  DentureData={selectedData}
                  setData={() => {}}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ view: false }}
                />
              </div>
            </div>
            <h2 className="AddSaddles">Add Retentions</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRetentions;
