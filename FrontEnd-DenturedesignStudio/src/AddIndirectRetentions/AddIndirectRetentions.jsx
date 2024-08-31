import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddIndirectRetentions.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import { useState } from "react";

function AddIndirectRetentions() {
  let navigate = useNavigate();
  const location = useLocation();
  const [restType, setResttype] = useState();
  const [selectedData, setSelectedData] = useState(
    location.state?.selectedData
      ? location.state?.selectedData
      : {
          restdata: null,
          missingteeth: null,
          undercuts: null,
          plates: null,
          retentiondata: null,
        }
  );
  function handleClick(path) {
    navigate(path);
  }
  console.log(selectedData);
  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
      retentiondata: data.retentions ? data.retentions : null,
    });
  };
  return (
    <>
      <div className="designPage">
        <Home onClick={() => handleClick("/studenthome")}></Home>
        <BackComp
          onClick={() =>
            navigate("/AddReciprocations", {
              state: { selectedData },
            })
          }
        ></BackComp>
        <div className="AddIndirectRetentions">
          <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
            />
            <div className="Questionbox"></div>
            <div className="teethBackground1">
              <button
                className="addConnectors"
                onClick={() =>
                  navigate("/AddConnectors", {
                    state: { selectedData },
                  })
                }
              >
                <div className="addConnectText">
                  <span className="addConnectText">Add Connectors</span>
                </div>
              </button>

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
              <div className="retention-teeth">
                <Teeth
                  addIndirectretention={true}
                  selectRest={{
                    restType: restType ? restType : null,
                    selectrest: true,
                  }}
                  click={(index) => console.log(`Clicked tooth ${index}`)}
                  setData={setData}
                  DentureData={selectedData}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ view: true }}
                  selectRetention={{ selectretention: true }}
                />
              </div>
            </div>
            <h2 className="AddIndirectRetentions">Add Indirect Retentions</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddIndirectRetentions;
