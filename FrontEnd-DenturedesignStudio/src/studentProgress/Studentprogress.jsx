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
  const [solveTime, setSolveTime] = useState(0);
  const [createCases, setCreateCases] = useState(0);
  const [solveCases, setSolveCases] = useState(0);
  const [lecturecomplete, setLeccomplete] = useState(0);
  const [totalLecture, setTotalLecture] = useState(0);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await axios.post(
          "https://denture-design-studio.onrender.com/progress/get",
          { user_name }
        );

        const { solveTime, createCase, solveCase, lectureTime, watchedVideos } =
          data.progress;

        setSolveTime(solveTime);
        setCreateCases(createCase);
        setSolveCases(solveCase);
        setLectime(lectureTime);
        setLeccomplete(watchedVideos.length);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProgress();
    const getTotallecture = async () => {
      setTotalLecture(
        (
          await axios.get(
            "https://denture-design-studio.onrender.com/lecture/count"
          )
        ).data.count
      );
    };
    getTotallecture();
  }, [user_name]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const percentage = ((lecturecomplete / totalLecture) * 100).toFixed(2);
  const time = lecture_time + solveTime;

  const lectureProgress = (lecture_time / (time === 0 ? 1 : time)) * 100;
  const solvingProgress = (solveTime / (time === 0 ? 1 : time)) * 100;
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
            <label>Lecture material : {lectureProgress.toFixed(2)}%</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${lectureProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-bar">
            <label>Solving patient cases : {solvingProgress.toFixed(2)}%</label>
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
