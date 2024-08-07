import "./signup.css";
import React, { useState } from "react";
import Back from "../backbutton/Back";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [compassword, setCompassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setShowComPassword] = useState(false);
  const navigate = useNavigate();
  const student = "student";
  const assessor = "assessor";

  function clickhandle(path) {
    navigate(path);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== compassword) {
      Swal.fire({
        html: '<span class="swt-text1">The password does not match, please recheck!</span>',
        confirmButtonColor: "#3085d6",
        showConfirmButton: true,
        color: "white",
        background: "#2f5770",
        customClass: {
          popup: "swt-popup",
        },
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      let url = "";
      if (role === student) {
        url = "http://localhost:5000/student/add";
        await axios.post("http://localhost:5000/progress/add", { user_name });
      } else if (role === assessor) {
        url = "http://localhost:5000/assessor/add";
      }

      await axios.post(url, {
        first_name,
        last_name,
        email,
        user_name,
        password,
      });

      await Swal.fire({
        title: "Thank you for registering.  ",
        text: "A verification email has been sent to your provided email address. Please check your inbox ",
        icon: "success",
        background: "#2f5770",
        color: "white",
      });

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Swal.fire({
          html: '<span class="swt-text">User already exists!</span>',
          confirmButtonColor: "#3085d6",
          showConfirmButton: true,
          color: "white",
          background: "#2f5770",
          customClass: {
            popup: "swt-popup",
          },
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="signuppage">
      <div className="back">
        <Back onclick={() => clickhandle("/")} />
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <form className="contentbox2" onSubmit={handleSubmit}>
        <div>
          <h1 className="header2">Create a new account</h1>
        </div>
        <div className="role">
          <h3>Role:</h3>
          <input
            type="radio"
            name="role"
            value={student}
            id="Student1"
            onChange={(e) => setRole(e.target.value)}
          />
          <p id="Student2">Student</p>
          <input
            type="radio"
            name="role"
            value={assessor}
            id="Assessor1"
            onChange={(e) => setRole(e.target.value)}
          />
          <p id="Assessor2">Assessor</p>
        </div>
        <div className="signinput" id="signinput1">
          <h3 className="signhead">First name:</h3>
          <input type="text" onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div className="signinput" id="signinput2">
          <h3 className="signhead">Last name:</h3>
          <input type="text" onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className="signinput" id="signinput3">
          <h3 className="signhead">Email:</h3>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="signinput" id="signinput4">
          <h3 className="signhead">Username:</h3>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="signinput" id="signinput5">
          <h3 className="signhead">Password:</h3>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="eyeicon"
          >
            {showPassword ? (
              <AiFillEyeInvisible size={"1.4vw"} />
            ) : (
              <AiFillEye size={"1.4vw"} />
            )}
          </div>
        </div>
        <div className="signinput" id="signinput6">
          <h3 className="signhead">Confirm Password:</h3>
          <input
            type={showComPassword ? "text" : "password"}
            onChange={(e) => setCompassword(e.target.value)}
          />

          <div
            onClick={() => setShowComPassword(!showComPassword)}
            className="eyeicon"
          >
            {showComPassword ? (
              <AiFillEyeInvisible size={"1.4vw"} />
            ) : (
              <AiFillEye size={"1.4vw"} />
            )}
          </div>
        </div>
        <div>
          <button className="sign2" type="submit">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
