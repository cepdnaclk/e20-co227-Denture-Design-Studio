import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserEngagement.css";
import Home from "../homebutton/home";
import userIcon from "../UserAccount/usericon.png";
import axios from "axios";

const UserEngagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="userengagementpage">
        <header className="engagementheader">
          <div className="home-icon">
            <Home onClick={() => navigate("/assessorhome")} />
          </div>
          <h1>User Engagement</h1>
        </header>
        <div className="engagement-list">
          {users.map((user) => (
            <div key={user.id} className="engagement-item">
              <button
                className="username"
                onClick={() => navigate("/userengagement", { state: { user } })}
              >
                <img src={userIcon} alt="User Icon" className="user-icon" />
                {user.user_name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserEngagement;
