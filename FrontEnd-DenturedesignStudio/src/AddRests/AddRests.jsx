import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddRests.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";

function AddRests() {
  let navigate = useNavigate();

  const [restType, setResttype] = useState();
  const location = useLocation();
  const curves = location.state?.curves;
  const fromReview = location.state?.fromReview;
  const userdata = location.state?.userdata;
  const [selectedData, setSelectedData] = useState(
    fromReview
      ? location.state?.selectedData
      : location.state?.selectedData
      ? {
          restdata: null,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
          plates: location.state?.selectedData.plates,
          clasps: location.state?.selectedData.clasps,
          retentiondata: location.state?.selectedData.retentiondata,
          gingivally: location.state?.selectedData.gingivally,
        }
      : {
          restdata: null,
          missingteeth: null,
          undercuts: null,
          plates: null,
          claspdata: null,
          retentiondata: null,
          gingivally: null,
        }
  );
  function handleClick(path) {
    navigate(path);
  }
  console.log(location.state?.selectedData);
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

  return (
    <>
      <div className="designPage">
        <Home
          onClick={() => navigate("/studenthome", { state: { userdata } })}
        ></Home>
        {!fromReview ? (
          <BackComp
            onClick={() => navigate("/AddSaddles", { state: { userdata } })}
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
              <div className="retention-teeth">
                {/* Teeth component with interaction enabled */}
                <Teeth
                  selectRest={{
                    restType: restType ? restType : null,
                    selectrest: true,
                  }}
                  click={(index) => console.log(`Clicked tooth ${index}`)}
                  setData={setData}
                  DentureData={selectedData}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={fromReview ? { view: true } : { view: false }}
                  selectClasp={fromReview ? { view: true } : { view: false }}
                  selectRetention={
                    fromReview
                      ? { selectretention: true }
                      : { selectretention: false }
                  }
                />
                <ReviewCanvas drewcurves={curves} />
              </div>
              <ul className="rests-list">
                <li
                  id="occlusalRestsI"
                  onClick={() => setResttype("occlusal")}
                  style={{
                    color: restType === "occlusal" ? "#ffffff" : "#66d8d8",
                  }}
                >
                  Occlusal Rests :
                </li>
                <li
                  id="cingulumRestsI"
                  onClick={() => setResttype("cingulam")}
                  style={{
                    color: restType === "cingulam" ? "#ffffff" : "#66d8d8",
                  }}
                >
                  Cingulum Rests :
                </li>
                <li
                  id="incisalRestsI"
                  onClick={() => setResttype("incisal")}
                  style={{
                    color: restType === "incisal" ? "#ffffff" : "#66d8d8",
                  }}
                >
                  Incisal Rests :
                </li>
              </ul>
              <button
                className="addRetentions"
                onClick={() =>
                  fromReview
                    ? navigate("/reviewAnswer", {
                        state: { selectedData, curves, userdata },
                      })
                    : navigate("/addRetentions", {
                        state: { selectedData, userdata },
                      })
                }
              >
                <div className="addRetenText">
                  <span className="addRetenText">
                    {fromReview ? "Review Answer" : "Add Retentions"}
                  </span>
                </div>
              </button>
            </div>
            <h2 className="AddRests">Add Rests</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRests;
