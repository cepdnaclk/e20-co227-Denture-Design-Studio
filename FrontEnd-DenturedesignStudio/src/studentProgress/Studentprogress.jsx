import "./Studentprogress.css";
import Home from "../homebutton/home";
import { useNavigate } from "react-router-dom";
function Studentprogress() {
  const navigate = useNavigate();
  const createCases = 3;
  const solveCases = 23;
  const percentage = 78;
  const user_name = "ravindu";
  const lecture_time = 54;
  const create_time = 55;
  const solve_time = 500;

  const time = lecture_time + create_time + solve_time;
  const lectureProgress = (lecture_time / time) * 100;
  const creatingProgress = (create_time / time) * 100;
  const solvingProgress = (solve_time / time) * 100;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="studentprogress">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h2 className="progressed-user">hi {user_name}</h2>
      <Home onClick={() => navigate("/studenthome")} />
      <div className="your-create-patient">
        <h1>{createCases}</h1>
        <h4>You create parient cases</h4>
      </div>
      <div className="your-solved-patient">
        <h1>{solveCases}</h1>
        <h4>You solved parient cases</h4>
      </div>
      <div className="completed-lecture-content">
        <h2>Completed lecture content </h2>
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
            <label>Lecture material</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${lectureProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-bar">
            <label>Creating patient cases</label>
            <div className="progress">
              <div
                className="progress-inner"
                style={{ width: `${creatingProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-bar">
            <label>Solving patient cases</label>
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
