import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddReciprocations.css";
import Home from "../../homebutton/home";
import Demo from "../../demobutton/demo";
import BackComp from "../../backComp/backComp";
import Teeth from "../../TeethComp/Teeth";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";
import { useTime } from "../../Timecontext";
import axios from "axios";
import ReciprocationDemo from "../../DemoVideos/ReciprocationDemo.mp4";

function AddReciprocations() {
  let navigate = useNavigate();
  const location = useLocation();
  const curves = location.state?.curves;
  const userdata = location.state?.userdata;
  const isAssessor = userdata?.assessor;
  const imgData = location.state?.imgData;
  const answerImage = location.state?.answerImage;
  const problemDescription = location.state?.problemDescription;
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
  const user_name = userdata?.user_name;
  const { setWatchVideoTime } = useTime();
  const startTimeRef = useRef(null);
  const [currentsolvetime, setCurrentSolveTime] = useState(0);
  const [isActive, setIsActive] = useState(true); // Track if user is active
  const inactivityTimeoutRef = useRef(null);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now()); // Track the last time user was active

  // Handle user activity (mouse movement)
  const handleUserActivity = () => {
    if (!isActive) {
      startTimeRef.current += Date.now() - lastActiveTime;
    }

    setIsActive(true);
    setLastActiveTime(Date.now());

    clearTimeout(inactivityTimeoutRef.current);
    inactivityTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
      setLastActiveTime(Date.now());
    }, 30 * 1000);
  };

  useEffect(() => {
    startTimeRef.current = Date.now();

    axios
      .post(
        "https://e20-co225-denture-design-studio.onrender.com/progress/get",
        { user_name }
      )
      .then((response) => {
        const currentSolveTime = response.data.progress.solveTime;
        setCurrentSolveTime(currentSolveTime);
      })
      .catch((err) => {
        console.log(err.message);
      });

    console.log("Current view time:", currentsolvetime);

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    return () => {
      const endTime = Date.now();
      let timeSpent = Math.floor((endTime - startTimeRef.current) / 1000);
      if (isActive) {
        console.log("Time spent in session:", timeSpent);

        if (timeSpent > 0) {
          const newSolveTimem = timeSpent + currentsolvetime;
          console.log("Updating lecture time:", newSolveTimem);

          // Save the updated lecture time in the backend
          axios
            .put(
              "https://e20-co225-denture-design-studio.onrender.com/progress/edit",
              {
                user_name,
                solveTime: newSolveTimem,
              }
            )
            .then((response) => {
              console.log("Lecture time updated:", response.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      }
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [user_name, setWatchVideoTime, currentsolvetime, isActive]);
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

  return (
    <>
      <div className="designPage">
        <Home
          onClick={() =>
            navigate(isAssessor ? "/assessorhome" : "/studenthome", {
              state: { userdata },
            })
          }
        ></Home>

        <Demo videoSrc={ReciprocationDemo} />

        {!fromReview ? (
          <BackComp
            onClick={() =>
              navigate("/AddRetentions", {
                state: {
                  selectedData,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
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
            <div className="Questionbox">
              <img
                src={imgData}
                alt="problem-img"
                style={{
                  width: problemDescription ? "12vw" : "17vw",
                  position: "relative",
                  top: "3vh",
                }}
              />
              {problemDescription && (
                <div className="problem-description-container">
                  <p className="problem-Description">{problemDescription}</p>
                </div>
              )}
            </div>
            <div className="teethBackground1">
              <button
                className="addIndirectRetentions"
                onClick={() =>
                  fromReview
                    ? navigate("/ReviewAnswer", {
                        state: {
                          selectedData,
                          curves,
                          userdata,
                          imgData,
                          problemDescription,
                          answerImage,
                        },
                      })
                    : navigate("/addIndirectRetentions", {
                        state: {
                          selectedData,
                          userdata,
                          imgData,
                          problemDescription,
                          answerImage,
                        },
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
