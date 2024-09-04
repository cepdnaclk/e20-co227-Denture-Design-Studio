import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddReciprocations.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddReciprocations() {
  let navigate = useNavigate();
  const location = useLocation();
  const [selectPlate, setselectPlate] = useState(false);
  const [selectClasp, setselectClasp] = useState(false);
  const [selectedData, setSelectedData] = useState(
    location.state?.selectedData
      ? {
          restdata: location.state?.selectedData.restdata,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
          plates: null,
          clasps: null,
          retentiondata: location.state?.selectedData.retentiondata,
          gingivally: location.state?.selectedData.gingivally,
        }
      : {
          restdata: null,
          missingteeth: null,
          undercuts: null,
          plates: null,
          clasps: null,
          retentiondata: null,
          gingivally: null,
        }
  );
  function handleClick(path) {
    navigate(path);
  }
  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
      clasps: data.clasps ? data.clasps : null,
      retentiondata: data.retentions ? data.retentions : null,
      gingivally: data.gingivally ? data.gingivally : null,
    });
  };
  console.log(selectedData);
  return (
    <>
      <div className="designPage">
        <Home onClick={() => handleClick("/studenthome")}></Home>
        <BackComp
          onClick={() =>
            navigate("/AddRetentions", {
              state: { selectedData },
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
                    state: { selectedData },
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
                <li
                  id="clasp"
                  onClick={() => {
                    setselectClasp(!selectClasp);
                  }}
                  style={{ color: selectClasp ? " #ffffff" : "" }}
                >
                  Clasp :
                </li>

                <li
                  id="plate"
                  onClick={() => {
                    setselectPlate(!selectPlate);
                  }}
                  style={{ color: selectPlate ? " #ffffff" : "" }}
                >
                  Plate :
                </li>
              </ul>
              <div className="reciprocation-teeth">
                <Teeth
                  selectRest={{ selectrest: true }}
                  setData={setData}
                  DentureData={selectedData}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ edit: selectPlate, view: true }}
                  selectClasp={{ edit: selectClasp, view: true }}
                  selectRetention={{ selectretention: true }}
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
