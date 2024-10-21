import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddRetentions.css";
import Home from "../../homebutton/home";
import Demo from "../../demobutton/demo";
import BackComp from "../../backComp/backComp";
import Teeth from "../../TeethComp/Teeth";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";
import { useTime } from "../../Timecontext";
import axios from "axios";
import RetentionDemo from "../../DemoVideos/RetentionDemo.mp4";

function AddRetentions() {
  const location = useLocation();
  const navigate = useNavigate();
  const curves = location.state?.curves;
  const userdata = location.state?.userdata;
  const isAssessor = userdata?.assessor;
  const imgData = location.state?.imgData;
  const answerImage = location.state?.answerImage;
  const problemDescription = location.state?.problemDescription;
  const [retentionType, setRetentionType] = useState();
  const [occlusallyType, setOcclusallyType] = useState();
  const fromReview = location.state?.fromReview;
  const [selectedData, setSelectedData] = useState(
    fromReview
      ? location.state?.selectedData
      : location.state?.selectedData
      ? {
          retentiondata: null,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
          restdata: location.state?.selectedData.restdata,
          clasp: location.state?.selectedData.claspdata,
          plates: location.state?.selectedData.plates,
          gingivally: null,
        }
      : {
          retentiondata: null,
          restdata: null,
          missingteeth: null,
          undercuts: null,
          clasp: null,
          plates: null,
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
      .post("http://localhost:5000/progress/get", { user_name })
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
            .put("http://localhost:5000/progress/edit", {
              user_name,
              solveTime: newSolveTimem,
            })
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
    <div className="designPage">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="AddRetentions">
        <Home
          onClick={() =>
            navigate(isAssessor ? "/assessorhome" : "/studenthome", {
              state: { userdata },
            })
          }
        />
        <Demo videoSrc={RetentionDemo} />

        {!fromReview ? (
          <BackComp
            onClick={() =>
              navigate("/addRests", {
                state: {
                  selectedData,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
              })
            }
          />
        ) : null}
        <div>
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
            <div className="retention-teeth">
              <Teeth
                selectRetention={
                  retentionType
                    ? {
                        retentionType: retentionType,
                        selectretention: true,
                        occlusallyType:
                          retentionType === "occlusally"
                            ? occlusallyType
                            : null,
                      }
                    : {
                        selectretention: fromReview ? true : false,
                        occlusallyType: null,
                      }
                }
                click={(index) => console.log(`Clicked tooth ${index}`)}
                selectRest={{ selectrest: true }}
                DentureData={selectedData}
                setData={setData}
                value={{ canEdit: false, visible: true }}
                selectPlate={fromReview ? { view: true } : { view: false }}
                selectClasp={fromReview ? { view: true } : { view: false }}
                isReview={fromReview}
              />
              <ReviewCanvas drewcurves={curves} />
            </div>
            <button
              className="addReciprocations"
              onClick={() =>
                fromReview
                  ? navigate("/reviewanswer", {
                      state: {
                        selectedData,
                        curves,
                        userdata,
                        imgData,
                        problemDescription,
                        answerImage,
                      },
                    })
                  : navigate("/addReciprocations", {
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
              <div className="addRecipText">
                <span className="addRecipText">
                  {fromReview ? "Review Answer" : "Add Reciprocations"}
                </span>
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
