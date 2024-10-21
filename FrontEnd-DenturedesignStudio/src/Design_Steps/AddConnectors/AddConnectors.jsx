import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddConnectors.css";
import Home from "../../homebutton/home";
import Demo from "../../demobutton/demo";
import BackComp from "../../backComp/backComp";
import Teeth from "../../TeethComp/Teeth";
import DrawingCanvas from "./canvas/Canvas";
import { useTime } from "../../Timecontext";
import axios from "axios";
import ConnectorDemo from "../../DemoVideos/ConnectorDemo.mp4";

function AddConnectors() {
  let navigate = useNavigate();
  const location = useLocation();
  const drewcurves = location.state?.curves;
  const selectedData = location.state?.selectedData;
  const userdata = location.state?.userdata;
  const isAssessor = userdata?.assessor;
  const imgData = location.state?.imgData;
  const answerImage = location.state?.answerImage;
  const problemDescription = location.state?.problemDescription;
  const fromReview = location.state?.fromReview;
  const [connectortype, setconnectortype] = useState();
  const [selectedtype, setSelectedtype] = useState();
  const [curves, setcurves] = useState();
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
  function curvesData(uppercurve, lowercurve, lowerminorcurve) {
    setcurves({ uppercurve, lowercurve, lowerminorcurve });
  }

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

        <Demo videoSrc={ConnectorDemo} />

        {!fromReview ? (
          <BackComp
            onClick={() =>
              navigate("/AddIndirectRetentions", {
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
        <div className="AddConnectors">
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
                className="Done"
                onClick={() =>
                  navigate("/reviewAnswer", {
                    state: {
                      curves,
                      selectedData,
                      userdata,
                      imgData,
                      problemDescription,
                      answerImage,
                    },
                  })
                }
              >
                <div className="DoneText">
                  <span className="DoneText">Done</span>
                </div>
              </button>

              <ul className="connectors-list">
                <li
                  id="upper"
                  onClick={() => {
                    setSelectedtype("upper");
                    setconnectortype(null);
                  }}
                  style={
                    selectedtype === "upper"
                      ? { color: "white" }
                      : { color: "#92dada" }
                  }
                >
                  Upper
                </li>
                <ul
                  className="upper-connector"
                  style={{
                    display: selectedtype === "upper" ? "block" : "none",
                  }}
                >
                  <li
                    id="upper-major"
                    onClick={() => {
                      selectedtype === "upper"
                        ? setconnectortype("upper")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "upper"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Major Connector
                  </li>
                  <li
                    id="upper-minor"
                    onClick={() => {
                      selectedtype === "upper"
                        ? setconnectortype("lower_minor")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower_minor"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Minor Connector
                  </li>
                </ul>
                <li
                  id="lower"
                  onClick={() => {
                    setSelectedtype("lower");
                    setconnectortype(null);
                  }}
                  style={{
                    color: selectedtype === "lower" ? "white" : "#92dada",
                    top: selectedtype === "upper" ? "12vh" : "6vh",
                  }}
                >
                  Lower
                </li>
                <ul
                  className="lower-connector"
                  style={{
                    display: selectedtype === "lower" ? "block" : "none",
                  }}
                >
                  <li
                    id="major"
                    onClick={() => {
                      selectedtype === "lower"
                        ? setconnectortype("lower")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Major Connector
                  </li>
                  <li
                    id="minor"
                    onClick={() => {
                      selectedtype === "lower"
                        ? setconnectortype("lower_minor")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower_minor"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Minor Connector
                  </li>
                </ul>
              </ul>
              <div className="retention-teeth">
                <Teeth
                  selectRest={{ selectrest: true }}
                  DentureData={selectedData}
                  setData={() => {}}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ view: true }}
                  selectClasp={{ view: true }}
                  selectRetention={{ selectretention: true }}
                />
              </div>
            </div>
            <h2 className="AddConnectors">Add Connectors</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>

          <DrawingCanvas
            connectortype={connectortype}
            curvesData={curvesData}
            drewcurves={drewcurves}
          />
        </div>
      </div>
    </>
  );
}

export default AddConnectors;
