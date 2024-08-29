import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddRests.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddRests() {
  let navigate = useNavigate();
  const [restType, setResttype] = useState();
  const location = useLocation();
  const typeselect = location.state?.typeselect;
  const [selectedData, setSelectedData] = useState(
    location.state?.selectedData
      ? {
          restdata: null,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
        }
      : { restdata: null, missingteeth: null, undercuts: null }
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
    });
  };

  console.log(selectedData);
  return (
    <>
      <div className="designPage">
        <Home onClick={() => handleClick("/studenthome")}></Home>
        <BackComp onClick={() => navigate("/AddSaddles")}></BackComp>
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
                  selectRest={
                    restType
                      ? { restType: restType, selectrest: true }
                      : typeselect
                      ? { selectrest: typeselect }
                      : { selectrest: false }
                  }
                  click={(index) => console.log(`Clicked tooth ${index}`)}
                  setData={setData}
                  DentureData={selectedData}
                  value={{ canEdit: false, visible: true }}
                />
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
            </div>
            <h2 className="AddRests">Add Rests</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>
          <button
            className="addRetentions"
            onClick={() =>
              navigate("/addRetentions", {
                state: { selectedData, typeselect: true },
              })
            }
          >
            <div className="addRetenText">
              <span className="addRetenText">Add Retentions</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddRests;