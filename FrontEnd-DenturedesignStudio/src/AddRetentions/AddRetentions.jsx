import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddRetentions.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddRetentions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [retentionType, setRetentionType] = useState();
  const [occlusallyType, setOcclusallyType] = useState();

  const [selectedData, setSelectedData] = useState(
    location.state?.selectedData
      ? {
          retentiondata: null,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
          restdata: location.state?.selectedData.restdata,
        }
      : {
          retentiondata: null,
          restdata: null,
          missingteeth: null,
          undercuts: null,
        }
  );
  console.log(selectedData);
  function handleClick(path) {
    navigate(path);
  }

  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      retentiondata: data.retentions ? data.undercuts : null,
    });
  };

  return (
    <div className="designPage">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="AddRetentions">
        <Home onClick={() => handleClick("/studenthome")} />
        <BackComp
          onClick={() =>
            navigate("/addRests", {
              state: { selectedData },
            })
          }
        />
        <div>
          <div className="Questionbox"></div>
          <div className="teethBackground1">
            <div className="retention-teeth">
              <Teeth
                selectRetention={
                  retentionType
                    ? {
                        retentionType: typeselect2,
                        selectretention: true,
                        occlusallyType:
                          retentionType === "occlusally"
                            ? occlusallyType
                            : null,
                      }
                    : {
                        selectretention: false,
                        occlusallyType: null,
                      }
                }
                selectRest={{ selectrest: true }}
                DentureData={selectedData}
                setData={setData}
                value={{ canEdit: false, visible: true }}
                selectPlate={{ view: false }}
              />
            </div>
            <button
              className="addReciprocations"
              onClick={() =>
                navigate("/addReciprocations", {
                  state: { selectedData },
                })
              }
            >
              <div className="addRecipText">
                <span className="addRecipText">Add Reciprocations</span>
              </div>
            </button>

            <ul className="retentions-list">
              <li
                id="occlusally"
                onClick={() => setRetentionType("occlusally")}
                style={{
                  color: retentionType === "occlusally" ? "#ffffff" : "#66d8d8",
                }}
              >
                Occlusally Approaching
              </li>
              {retentionType === "occlusally" && (
                <ul className="occlusally-subtypes">
                  <li
                    id="ringType"
                    onClick={() => setOcclusallyType("ring")}
                    style={{
                      color: occlusallyType === "ring" ? "#ffffff" : "#66d8d8",
                    }}
                  >
                    Ring Type
                  </li>
                  <li
                    id="circumferentialType"
                    onClick={() => setOcclusallyType("circumferential")}
                    style={{
                      color:
                        occlusallyType === "circumferential"
                          ? "#ffffff"
                          : "#66d8d8",
                    }}
                  >
                    Circumferential
                  </li>
                </ul>
              )}
              <li
                id="gingivally"
                onClick={() => setRetentionType("gingivally")}
                style={{
                  color: retentionType === "gingivally" ? "#ffffff" : "#66d8d8",
                }}
              >
                Gingivally Approaching
              </li>
            </ul>
          </div>
          <h2 className="AddSaddles">Add Retentions</h2>
          <h2 className="yourQuestion">Your Question</h2>
          <h1 className="yourCase">Your Case :</h1>
        </div>
      </div>
    </div>
  );
}

export default AddRetentions;
