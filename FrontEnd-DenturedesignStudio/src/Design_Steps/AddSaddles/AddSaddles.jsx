import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddSaddles.css";
import Home from "../../homebutton/home";
import Demo from "../../demobutton/demo";
import Teeth from "../../TeethComp/Teeth";
import { useTime } from "../../Timecontext";
import axios from "axios";
import SaddleDemo from "../../DemoVideos/SaddleDemo.mp4";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSaddles() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const isAssessor = userdata?.assessor;
  const [imgData, setimgData] = useState(location.state?.imgData);
  const [problemDescription, setproblemDescription] = useState(
    location.state?.problemDescription
  );
  const [supportMaterial, setsupportMaterial] = useState(
    location.state?.supportMaterial
  );
  const [answerImage, setanswerImage] = useState(location.state?.answerImage);
  const isActualCase = location.state?.isActualCase;
  const isAutoCase = location.state?.isAutoCase;
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
  const [ImgselectedData, setImgSelectedData] = useState({
    restdata: null,
    missingteeth: null,
    undercuts: null,
    plates: null,
    clasps: null,
    retentiondata: null,
    gingivally: null,
  });
  const Imgmissingteeth = useState(Array(32).fill(false));
  const [genated, setgenarated] = useState(true);
  const autoRef = useRef(null);
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

  const handleAutoSkipbutton = () => {
    setgenarated(true);
    const numberofteeth = Math.floor(Math.random() * 11 + 3);
    const missingteeths = new Set();
    for (let index = 0; index < numberofteeth; index++) {
      missingteeths.add(Math.floor(Math.random() * 16) + 1);
      missingteeths.add(Math.floor(Math.random() * 16) + 17);
    }
    const missingteetharray = Array.from(missingteeths);
    missingteetharray.forEach((element) => {
      Imgmissingteeth[element - 1] = true;
    });
    setImgSelectedData({
      restdata: null,
      missingteeth: Imgmissingteeth,
      undercuts: null,
      plates: null,
      clasps: null,
      retentiondata: null,
      gingivally: null,
    });

    setTimeout(() => {
      const toastId = toast.loading("Skipping Case...");
      html2canvas(autoRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          setimgData(imgData);
        })
        .then(() => {
          toast.update(toastId, {
            render: "Case Skipped",
            type: "success",
            isLoading: false,
            autoClose: 300,
          });
        });
    }, 5);
  };
  useEffect(() => {
    setgenarated(false);
  }, [imgData]);

  const handleActualskipbutton = () => {
    const toastId = toast.loading("Skipping Case...");

    axios
      .get(
        "https://e20-co225-denture-design-studio.onrender.com/actualcase/random"
      )
      .then((response) => {
        const data = response.data;
        const imgData = data.ProblemUrl;
        const problemDescription = data.description;
        const supportMaterial = data.supportMaterialUrl;
        const answerImage = data.answerImageUrl;

        // Update the state with the new data
        setimgData(imgData);
        setproblemDescription(problemDescription);
        setsupportMaterial(supportMaterial);
        setanswerImage(answerImage);

        // Show success notification after updating data
        toast.update(toastId, {
          render: "Case Skipped Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.update(toastId, {
          render: `Error: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="designPage">
      <Home
        onClick={() =>
          navigate(isAssessor ? "/assessorhome" : "/studenthome", {
            state: { userdata },
          })
        }
      ></Home>

      <Demo videoSrc={SaddleDemo} />

      <div className="AddSaddles">
        <ToastContainer />
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
            {supportMaterial && (
              <a
                style={{
                  fontSize: "0.9vw",
                  padding: "0",
                  margin: 0,
                  position: "relative",
                  top: "-1vh",
                }}
                href={supportMaterial}
                target="_blank"
                rel="noopener noreferrer"
              >
                click here to view support material
              </a>
            )}

            {isActualCase && (
              <button className="skipButton" onClick={handleActualskipbutton}>
                <div className="skipButtonText">
                  <span className="skipButtonText">Skip</span>
                </div>
              </button>
            )}
            {isAutoCase && (
              <button className="skipButton" onClick={handleAutoSkipbutton}>
                <div className="skipButtonText">
                  <span className="skipButtonText">Skip</span>
                </div>
              </button>
            )}

            <button
              className="addRests"
              onClick={() =>
                navigate("/addRests", {
                  state: {
                    selectedData,
                    userdata,
                    imgData,
                    answerImage,
                    problemDescription,
                  },
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
          {
            <div
              className="TeethBackground-auto"
              ref={autoRef}
              style={{ borderRadius: "1vw", top: "-200vh" }}
            >
              {genated && (
                <Teeth
                  selectRest={{ selectrest: true }}
                  DentureData={ImgselectedData}
                  setData={() => {}}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ view: true }}
                  selectRetention={{ selectretention: true }}
                  selectClasp={{ view: true }}
                />
              )}
            </div>
          }
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
