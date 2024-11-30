import BackComp from "../../backComp/backComp";
import "./ReviewAnswer.css";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../../homebutton/home";
import Gotobutton from "../../Goto/Goto";
import Teeth from "../../TeethComp/Teeth";
import ReviewCanvas from "./ReviewCanvas";
import { useRef, useState, useEffect } from "react";
import { useTime } from "../../Timecontext";
import axios from "axios";
import html2canvas from "html2canvas";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.config.js";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";
function Reviewanswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedData = location.state?.selectedData;
  const userdata = location.state?.userdata;
  const isAssessor = userdata?.assessor;
  const imgData = location.state?.imgData;
  const answerImage = location.state?.answerImage;
  const problemDescription = location.state?.problemDescription;
  const curves = location.state?.curves;
  const user_name = userdata?.user_name;
  const { setWatchVideoTime } = useTime();
  const startTimeRef = useRef(null);
  const [currentsolvetime, setCurrentSolveTime] = useState(0);
  const [isActive, setIsActive] = useState(true); // Track if user is active
  const inactivityTimeoutRef = useRef(null);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now()); // Track the last time user was active
  let currentSolvedCases;
  const captureRef = useRef(null);
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
      .post("https://denture-design-studio.onrender.com/progress/get", {
        user_name,
      })
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
            .put("https://denture-design-studio.onrender.com/progress/edit", {
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

  const FinishSolvecase = () => {
    axios
      .post("https://denture-design-studio.onrender.com/progress/get", {
        user_name,
      })
      .then((response) => {
        currentSolvedCases = response.data.progress.solveCase;

        const newSolvedCases = currentSolvedCases + 1;
        axios
          .put("https://denture-design-studio.onrender.com/progress/edit", {
            user_name,
            solveCase: newSolvedCases,
          })
          .then((response) => {
            console.log("Lecture time updated:", response.data);
            navigate("/modelanswer", {
              state: {
                curves,
                selectedData,
                userdata,
                currentSolvedCases,
                imgData,
                problemDescription,
                answerImage,
              },
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (userdata.assessor) {
      if (captureRef.current) {
        const toastId = toast.loading("Uploading patient case answer...");
        html2canvas(captureRef.current, {
          scale: window.devicePixelRatio,
          useCORS: true,
          willReadFrequently: true,
        })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const storageRef = ref(
              storage,
              `ActualQuestions/${new Date().toDateString()}/answer_${new Date().toTimeString()}.png`
            );
            uploadString(storageRef, imgData, "data_url")
              .then(async (snapshot) => {
                console.log("Uploaded to Firebase successfully!");
                toast.update(toastId, {
                  render: "create Patient case successful!",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000, // Close after 2 seconds
                });
                const downloadURL = await getDownloadURL(storageRef);
                setTimeout(() => {
                  navigate("/uploadanswerandmaterial", {
                    state: {
                      userdata,
                      answerImageUrl: downloadURL,
                      selectedData: userdata.teethdata,
                      isImageUpload: true,
                    },
                  });
                }, 2000);
              })
              .catch((error) => {
                toast.update(toastId, {
                  render: "Error uploading to Firebase!",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000,
                });
                console.error("Error uploading to Firebase:", error);
              });
          })
          .catch((error) => {
            console.error("Error capturing image:", error);
          });
      } else {
        console.error("Capture element not found");
      }
    }
  };

  return (
    <div className="designPage">
      <Home
        onClick={() =>
          navigate(isAssessor ? "/assessorhome" : "/studenthome", {
            state: { userdata },
          })
        }
      />
      <BackComp
        onClick={() =>
          navigate("/AddConnectors", {
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
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="HeaderRA">Add/Remove Components</h1>
      <p className="YouranswerRA">Your Answer :</p>
      <div className="TeethboxRA" ref={captureRef}>
        <Teeth
          click={(index) => console.log(`Clicked tooth ${index}`)}
          selectRest={{ selectrest: true }}
          DentureData={selectedData}
          setData={() => {}}
          value={{ canEdit: false, visible: true }}
          selectPlate={{ view: true }}
          selectRetention={{ selectretention: true }}
          selectClasp={{ view: true }}
        />
        <ReviewCanvas drewcurves={curves} inReview={true} />
      </div>
      <div className="ButtonboxRA">
        <div id="Addrests">
          <Gotobutton
            Name={"Add Rests"}
            Pagetogo={() =>
              navigate("/addRests", {
                state: {
                  selectedData,
                  curves,
                  fromReview: true,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
              })
            }
          />
        </div>
        <div id="Addretention">
          <Gotobutton
            Name={"Add Retentions"}
            Pagetogo={() =>
              navigate("/addRetentions", {
                state: {
                  selectedData,
                  curves,
                  fromReview: true,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
              })
            }
          />
        </div>
        <div id="Addreciprocation">
          <Gotobutton
            Name={"Add Reciprocation"}
            Pagetogo={() =>
              navigate("/addReciprocations", {
                state: {
                  selectedData,
                  curves,
                  fromReview: true,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
              })
            }
          />
        </div>
        <div id="Addconnectors">
          <Gotobutton
            Name={"Add Connectors"}
            Pagetogo={() =>
              navigate("/addConnectors", {
                state: {
                  curves,
                  selectedData,
                  fromReview: true,
                  userdata,
                  imgData,
                  problemDescription,
                  answerImage,
                },
              })
            }
          />
        </div>
      </div>
      <button className="FinishDesigning" onClick={FinishSolvecase}>
        Finish Designing
      </button>
    </div>
  );
}

export default Reviewanswer;
