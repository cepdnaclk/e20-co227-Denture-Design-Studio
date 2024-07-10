import React, { useState } from "react";
import "./Logingpage.css";
import Back from "../backbutton/Back";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import bcrypt from "bcryptjs";

function Loginpage() {
  let navigate = useNavigate();

  function clickhandle(path, userdata) {
    navigate(path, { state: { userdata } });
  }

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usererror, setuserError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      let role = "student";
      let userdata;

      try {
        response = await Axios.post("http://localhost:5000/student/get", {
          user_name,
        });
        userdata = response.data.student;
        if (!userdata || !(await matchPassword(password, userdata.password))) {
          throw new Error("Student not found or invalid password");
        }
      } catch (studentError) {
        try {
          response = await Axios.post("http://localhost:5000/assessor/get", {
            user_name,
          });
          role = "assessor";
          userdata = response.data.assessor;
          if (
            !userdata ||
            !(await matchPassword(password, userdata.password))
          ) {
            throw new Error("Assessor not found or invalid password");
          }
        } catch (assessorError) {
          try {
            response = await Axios.post("http://localhost:5000/admin/get", {
              user_name,
            });
            role = "admin";
            userdata = response.data.admin;
            if (
              !userdata ||
              !(await matchPassword(password, userdata.password))
            ) {
              throw new Error("admin not found or invalid password");
            }
          } catch (error) {
            setuserError(true);
          }
        }
      }

      if (role === "student") {
        clickhandle("/studenthome", userdata);
      } else if (role === "assessor") {
        clickhandle("/assessorhome", userdata);
      } else if (role === "admin") {
        clickhandle("/adminhome", userdata);
      }
    } catch (error) {
      alert("An error occurred during login");
    }
  };

  const matchPassword = async (enteredPassword, storedHashedPassword) => {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
  };

  return (
    <div className="logingpage">
      <div className="back">
        <Back onclick={() => clickhandle("/")} />
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <form onSubmit={handleSubmit}>
        <div className="contentbox">
          <h2 className="header">Log in to your account</h2>
          <div className="userinput" id="input1">
            <h3 className="inputs">Username:</h3>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="userinput" id="input2">
            <h3 className="inputs">Password:</h3>
            <h6>{usererror ? "Invalid username or password" : ""}</h6>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="eyeicon1"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
            <p id="forget">
              <a href="/">Forgot Password?</a>
            </p>
          </div>
          <div>
            <button type="submit" className="login2">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
