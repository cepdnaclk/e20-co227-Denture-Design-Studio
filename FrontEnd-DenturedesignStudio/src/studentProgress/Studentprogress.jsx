import "./Studentprogress.css";
import Home from "../homebutton/home";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Studentprogress() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const user_name = userdata?.user_name;
  const first_name = userdata?.first_name;
  const [lecture_time, setLectime] = useState(0);
  const [create_time, setCreatetime] = useState(0);
  const [solveTime, setSolveTime] = useState(0);
  const [createCases, setCreateCases] = useState(0);
  const [solveCases, setSolveCases] = useState(0);
  const [lecturecomplete, setLeccomplete] = useState(0);
  const totalLecture = 100;
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/progress/get",
          {
            user_name,
          }
        );

        const progress = response.data.progress;
        setSolveTime(progress.solveTime);
        setCreateCases(progress.createCase);
        setSolveCases(progress.solveCase);
        setLectime(progress.lectureTime);
        setCreatetime(progress.createTime);
        setLeccomplete(progress.completedLecture);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProgress();
  }, [user_name]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const percentage = (lecturecomplete / totalLecture) * 100;
  const time = lecture_time + create_time + solveTime;
  const lectureProgress = (lecture_time / time) * 100;
  const creatingProgress = (create_time / time) * 100;
  const solvingProgress = (solveTime / time) * 100;

  return (
    <div className="studentprogress">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h2 className="progressed-user">Hi {first_name}</h2>
      <Home onClick={() => navigate("/studenthome", { state: { userdata } })} />
      <div className="your-create-patient">
        <h1>{createCases}</h1>
        <h4>You created patient cases</h4>
      </div>
      <div className="your-solved-patient">
        <h1>{solveCases}</h1>
        <h4>You solved patient cases</h4>
      </div>
      <div className="completed-lecture-content">
        <h2>Completed lecture content</h2>
        <div className="circle-background">
          <div
            className="circle-progress"
            style={{
              background: `conic-gradient(#59EECA ${
                percentage * 3.6
              }deg, transparent 0deg)`,
            }}
          />
          <div className="inner-circle">
            <h1 className="percentage">{percentage}%</h1>
          </div>
        </div>
      </div>
      <div className="times-breaker">
        <div className="time-spent">
          <h1>You have spent</h1>
          <h2>{formatTime(time)}</h2>
        </div>
        <div className="progress-bars">
          <div className="progress-bar">
            <label>Lecture material : {lectureProgress}%</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${lectureProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-bar">
            <label>Creating patient cases : {creatingProgress}%</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${creatingProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-bar">
            <label>Solving patient cases : {solvingProgress}%</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${solvingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Studentprogress;
