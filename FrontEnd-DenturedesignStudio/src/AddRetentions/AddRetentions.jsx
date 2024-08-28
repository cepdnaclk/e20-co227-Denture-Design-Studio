import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddRetentions.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function AddRetentions() {
  let navigate = useNavigate();
  const location = useLocation();
  const typeselect2 = location.state?.typeselect2;
  const selectedRetentions = location.state?.selectedRetentions;

  const [retentionType, setRetentionType] = useState(null);
  const [occlusallyType, setOcclusallyType] = useState(null);

  function handleClick(path) {
    navigate(path);
  }

  console.log(typeselect2);

  return (
    <>
      <div className="designPage">
        <div className="AddRetentions">
          <Home onClick={() => handleClick("/studenthome")} />
          <BackComp onClick={() => navigate("/addRests")} />

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
                    state: { selectedRetentions, typeselect2: true },
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

              <div className="retention-teeth">

                <Teeth
                  selectRetention={
                    retentionType
                      ? {
                          retentionType: retentionType,
                          selectretention: typeselect2,
                          occlusallyType: occlusallyType,
                        }
                      : typeselect2
                      ? {
                          selectretention: typeselect2,
                          occlusallyType: occlusallyType,
                        }
                      : {
                          selectretention: false,
                          occlusallyType: occlusallyType,
                        }
                  }
                  selectedRetentions={selectedRetentions}
                  retentionData={(data) => console.log(data)} // Handle retention data
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
