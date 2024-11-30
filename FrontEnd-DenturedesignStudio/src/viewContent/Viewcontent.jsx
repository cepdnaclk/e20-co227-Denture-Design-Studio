import "./Viewcontent.css";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../backbutton/Back";
import { useEffect, useRef, useState } from "react";
import { useTime } from "../Timecontext";
import axios from "axios";

function Viewcontent() {
  const location = useLocation();
  const navigate = useNavigate();
  const material = location.state?.material;
  const roles = location.state?.roles;
  const role = location.state?.role;
  const userdata = location.state?.userdata;
  const user_name = userdata?.user_name;
  const video = material.videoUrl;
  const { setWatchVideoTime } = useTime();
  const startTimeRef = useRef(null);
  const [currentviewtime, setCurrentViewTime] = useState(0);
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

    if (role === "/studenthome") {
      axios
        .post("https://denture-design-studio.onrender.com/progress/get", {
          user_name,
        })
        .then((response) => {
          const currentViewTime = response.data.progress.lectureTime;
          setCurrentViewTime(currentViewTime);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    console.log("Current view time:", currentviewtime);

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    return () => {
      const endTime = Date.now();
      let timeSpent = Math.floor((endTime - startTimeRef.current) / 1000);
      if (isActive) {
        console.log("Time spent in session:", timeSpent);

        if (timeSpent > 0) {
          const newLectureTime = timeSpent + currentviewtime;
          console.log("Updating lecture time:", newLectureTime);

          // Save the updated lecture time in the backend
          axios
            .put("https://denture-design-studio.onrender.com/progress/edit", {
              user_name,
              lectureTime: newLectureTime,
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
  }, [role, user_name, setWatchVideoTime, currentviewtime, isActive]);

  return (
    <div className="viewcontent">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />

      <div>
        <h1 className="lecture-title">{material.title}</h1>
        <Back onclick={() => navigate(roles, { state: { role, userdata } })} />
        <video className="lecture-video" src={video} controls></video>
        <div className="lecture-note-container">
          <p className="lecture-note">{material.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Viewcontent;
