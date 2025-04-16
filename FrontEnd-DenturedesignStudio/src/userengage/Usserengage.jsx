import { useLocation, useNavigate } from "react-router-dom";
import usericon from "./usericon.png";
import Myaccount from "../myaccount/Myaccount";
import Back from "../backbutton/Back";
import "./Userengage.css";
import { useEffect, useState } from "react";
import axios from "axios";

function UserEngage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const userdata = location.state?.userdata;
  const role = location.state?.role;
  const user_name = user.user_name;
  const [solvedpatientcase, setSolveCases] = useState();
  const [createdpatient, setCreateCases] = useState();
  const [lectime, setLectime] = useState();
  const [solvetime, setSolveTime] = useState();

  console.log(user);

  const formatdate = (datestring) => {
    const date = new Date(datestring);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.post(
          "https://e20-co227-denture-design-studio.onrender.com/progress/get",
          {
            user_name,
          }
        );

        const progress = response.data.progress;

        setSolveTime(progress.solveTime);
        setCreateCases(progress.createCase);
        setSolveCases(progress.solveCase);
        setLectime(progress.lectureTime);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProgress();
  }, [user_name]);
  console.log(solvetime + lectime, solvedpatientcase, createdpatient);
  const formatTime = (time) => {
    console.log(time);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="userdetail-engage">
      <Back
        onclick={() => {
          navigate("/usersengagement", { state: { userdata, role } });
        }}
      />
      <Myaccount user={role} userdata={userdata} />
      <div className="username-engage">
        <img src={usericon} alt="" />
        <h2>{user?.user_name}</h2>
        <h4>{user?.email}</h4>
      </div>
      <div className="userdetail">
        <h2 className="header" id="user-detail1">
          {" "}
          User Detail
        </h2>
        <h2 className="user-name" id="user-detail2">
          Name :
        </h2>
        <h3 className="user-name-value" id="user-detail3">
          {user.first_name} {user.last_name}
        </h3>
        <h2 className="header" id="user-detail4">
          {" "}
          Login Activities
        </h2>
        <h2 className="access-date" id="user-detail5">
          First access to the site:
        </h2>
        <h3 className="dates-value" id="user-detail6">
          {formatdate(user.createdAt)}
        </h3>
        <h2 className="access-date" id="user-detail7">
          Last access to the site:
        </h2>
        <h3 className="dates-value" id="user-detail8">
          {formatdate(user.lastAccessed)}
        </h3>
      </div>
      <div className="engagementactivity">
        <h2 className="engagement-head">Engagement in Activity</h2>
        <h3 className="solved-patient">
          Solved Patient Case: {solvedpatientcase}
        </h3>
        <h3 className="timespent">
          Time spent : {formatTime(solvetime + lectime)}
        </h3>
        <h3 className="createdpatient">
          Created patient case : {createdpatient}
        </h3>
      </div>
    </div>
  );
}
export default UserEngage;
