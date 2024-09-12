import BackComp from "../backComp/backComp";
import "./ReviewAnswer.css";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import Gotobutton from "../Goto/Goto";
import Teeth from "../TeethComp/Teeth";
import ReviewCanvas from "./ReviewCanvas";
import { useRef, useState, useEffect } from "react";
import { useTime } from "../Timecontext";
import axios from "axios";
function Reviewanswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedData = location.state?.selectedData;
  const userdata = location.state?.userdata;
  const curves = location.state?.curves;
  const user_name = userdata?.user_name;
  const { setWatchVideoTime } = useTime();
  const startTimeRef = useRef(null);
  const [currentsolvetime, setCurrentSolveTime] = useState(0);
  const [isActive, setIsActive] = useState(true); // Track if user is active
  const inactivityTimeoutRef = useRef(null);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now()); // Track the last time user was active
  let currentSolvedCases;
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

  const FinishSolvecase = () => {
    axios
      .post("http://localhost:5000/progress/get", { user_name })
      .then((response) => {
        currentSolvedCases = response.data.progress.solveCase;

        const newSolvedCases = currentSolvedCases + 1;
        axios
          .put("http://localhost:5000/progress/edit", {
            user_name,
            solveCase: newSolvedCases,
          })
          .then((response) => {
            console.log("Lecture time updated:", response.data);
            navigate("/modelanswer", {
              state: { curves, selectedData, userdata, currentSolvedCases },
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="designPage">
      <Home onClick={() => navigate("/studenthome", { state: { userdata } })} />
      <BackComp
        onClick={() =>
          navigate("/AddConnectors", {
            state: { curves, selectedData, userdata },
          })
        }
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="HeaderRA">Add/Remove Components</h1>
      <p className="YouranswerRA">Your Answer :</p>
      <div className="TeethboxRA">
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
        <ReviewCanvas drewcurves={curves} />
      </div>
      <div className="ButtonboxRA">
        <div id="Addrests">
          <Gotobutton
            Name={"Add Rests"}
            Pagetogo={() =>
              navigate("/addRests", {
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addretention">
          <Gotobutton
            Name={"Add Retentions"}
            Pagetogo={() =>
              navigate("/addRetentions", {
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addreciprocation">
          <Gotobutton
            Name={"Add Reciprocation"}
            Pagetogo={() =>
              navigate("/addReciprocations", {
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addconnectors">
          <Gotobutton
            Name={"Add Connectors"}
            Pagetogo={() =>
              navigate("/addConnectors", {
                state: { curves, selectedData, fromReview: true, userdata },
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
