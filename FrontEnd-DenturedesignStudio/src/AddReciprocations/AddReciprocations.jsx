import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddReciprocations.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";

function AddReciprocations() {
  let navigate = useNavigate();
  const location = useLocation();
  const curves = location.state?.curves;
  const userdata = location.state?.userdata;
  const [selectPlate, setselectPlate] = useState(false);
  const [selectClasp, setselectClasp] = useState(false);
  const fromReview = location.state?.fromReview;
  const [selectedData, setSelectedData] = useState(
    fromReview
      ? location.state?.selectedData
      : location.state?.selectedData
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
  console.log(selectPlate, selectClasp);
  return (
    <>
      <div className="designPage">
        <Home
          onClick={() => navigate("/studenthome", { state: { userdata } })}
        ></Home>
        {!fromReview ? (
          <BackComp
            onClick={() =>
              navigate("/AddRetentions", {
                state: { selectedData, userdata },
              })
            }
          ></BackComp>
        ) : null}
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
                  fromReview
                    ? navigate("/ReviewAnswer", {
                        state: { selectedData, curves, userdata },
                      })
                    : navigate("/addIndirectRetentions", {
                        state: { selectedData, userdata },
                      })
                }
              >
                <div className="addIndiRetenText">
                  <span className="addIndiRetenText">
                    {fromReview ? "Review Answer" : "Add Indirect Retentions"}
                  </span>
                </div>
              </button>

              <ul className="reciprocations-list">
                <li
                  id="clasp"
                  onClick={() => {
                    !selectPlate
                      ? setselectClasp(!selectClasp)
                      : setselectClasp(selectClasp);
                  }}
                  style={{ color: selectClasp ? " #ffffff" : "" }}
                >
                  Clasp :
                </li>

                <li
                  id="plate"
                  onClick={() => {
                    !selectClasp
                      ? setselectPlate(!selectPlate)
                      : setselectPlate(selectPlate);
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
                <ReviewCanvas drewcurves={curves} />
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
