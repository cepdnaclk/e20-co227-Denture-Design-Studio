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

  useEffect(() => {
    startTimeRef.current = Date.now();
    if (role === "/studenthome") {
      axios
        .post("http://localhost:5000/progress/get", { user_name })
        .then((response) => {
          const currentViewTime = response.data.progress.lectureTime;
          setCurrentViewTime(currentViewTime);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    return () => {
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTimeRef.current) / 1000);
      const newLectureTime = timeSpent + currentviewtime;

      axios
        .put("http://localhost:5000/progress/edit", {
          user_name,
          lectureTime: newLectureTime,
        })
        .then((response) => {
          console.log("Lecture time updated:", response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  }, [role, user_name, setWatchVideoTime, currentviewtime]);

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
