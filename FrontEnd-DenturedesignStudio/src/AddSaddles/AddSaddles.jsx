import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSaddles.css";
import Home from "../homebutton/home";
import Teeth from "../TeethComp/Teeth";
import { useTime } from "../Timecontext";
import axios from "axios";
function AddSaddles() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const imgData = location.state?.imgData;
  const [visibleundercut, setVisibleundercut] = useState({
    canEdit: false,
    visible: false,
  });
  const [missingtooth, setMissingtooth] = useState(false);
  const [selectedData, setSelectedData] = useState({
    restdata: null,
    missingteeth: null,
    undercuts: null,
    plates: null,
    clasps: null,
    gingivally: null,
  });
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
  const handleundercutVisibility = (visibleundercut) => {
    setVisibleundercut({
      canEdit: !visibleundercut.canEdit,
      visible: !visibleundercut.visible,
    });
  };
  const handleMissingTeeth = (missingtooth) => {
    setMissingtooth(!missingtooth);
  };

  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
      clasps: data.clasps ? data.clasps : null,
      gingivally: data.gingivally ? data.gingivally : null,
    });
  };

  return (
    <div className="designPage">
      <Home
        onClick={() => navigate("/studenthome", { state: { userdata } })}
      ></Home>

      <div className="AddSaddles">
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
                width: "15vw",
                top: "8vh",
                position: "absolute",
                left: "4.7vw",
              }}
            />
            <button
              className="skipButton"
              onClick={() => navigate("/addSaddles", { state: { userdata } })}
            >
              <div className="skipButtonText">
                <span className="skipButtonText">Skip</span>
              </div>
            </button>
            <button
              className="addRests"
              onClick={() =>
                navigate("/addRests", {
                  state: { selectedData, userdata },
                })
              }
            >
              <div className="addRestsText">
                <span className="addRestText">Add Rests</span>
              </div>
            </button>
            <h1
              className="selectMissingTeeth"
              onClick={() => {
                handleMissingTeeth(missingtooth);
                console.log("Missing Teeth state updated:", missingtooth);
              }}
              style={{ color: missingtooth ? "#d3ecff" : "rgb(102, 216, 216" }}
            >
              Set Missing Teeth
            </h1>
            <h1
              className="selectUnderCut"
              onClick={() => handleundercutVisibility(visibleundercut)}
              style={{
                color: visibleundercut.canEdit
                  ? "#d3ecff"
                  : "rgb(102, 216, 216",
              }}
            >
              Select Undercuts
            </h1>
          </div>

          <div className="teethBackground1">
            <div className="retention-teeth">
              {/* Teeth component with interaction enabled */}
              <Teeth
                setMissingtooth={missingtooth}
                value={visibleundercut}
                selectRest={true}
                setData={setData}
                DentureData={selectedData}
                selectPlate={{ view: false }}
                selectClasp={{ view: false }}
                selectRetention={{ selectRetention: false }}
              />
            </div>
          </div>

          <h2 className="AddSaddles">Add Saddles</h2>
          <h2 className="yourQuestion">Your Question</h2>
          <h1 className="yourCase">Your Case :</h1>
        </div>
      </div>
    </div>
  );
}

export default AddSaddles;
