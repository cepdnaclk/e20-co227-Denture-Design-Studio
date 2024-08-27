import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddReciprocations.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddReciprocations() {
  let navigate = useNavigate();
  const location = useLocation();

  const selectedRests = location.state?.selectedRests;
  const typeselect = location.state?.typeselect;
  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <div className="designPage">
        <Home onClick={() => handleClick("/studenthome")}></Home>
        <BackComp
          onClick={() =>
            navigate("/AddRetentions", {
              state: { selectedRests, typeselect: true },
            })
          }
        ></BackComp>
        <div className="AddRests">
          <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
            />
            <div className="Questionbox"></div>
            <div className="teethBackground1">
              <button
                className="addIndirectRetentions"
                onClick={() =>
                  navigate("/addIndirectRetentions", {
                    state: { selectedRests, typeselect: true },
                  })
                }
              >
                <div className="addIndiRetenText">
                  <span className="addIndiRetenText">
                    Add Indirect Retentions
                  </span>
                </div>
              </button>

              <ul className="reciprocations-list">
                <li id="clasp" onClick={() => handleClick()}>
                  Clasp :
                </li>
                <li id="plate" onClick={() => handleClick()}>
                  Plate :
                </li>
              </ul>
              <div className="reciprocation-teeth">
                <Teeth
                  selectRest={{ selectrest: typeselect }}
                  selectedrests={selectedRests}
                  restData={() => {}}
                />
              </div>
            </div>
            <h2 className="AddReciprocations">Add Reciprocations</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddReciprocations;
