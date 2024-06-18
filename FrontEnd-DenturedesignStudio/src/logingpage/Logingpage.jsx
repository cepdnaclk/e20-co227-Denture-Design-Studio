import React, { useState } from 'react';
import "./Logingpage.css";
import Back from '../backbutton/Back';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Loginpage() {
  let navigate = useNavigate();

  function clickhandle(path) {
    navigate(path);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] =useState("false");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    clickhandle("/");
  };

  return (
    <div className="logingpage">
      <div className="back">
        <Back onclick={() => clickhandle("/")}></Back>
      </div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
      <form onSubmit={handleSubmit}>
        <div className='contentbox'>
          <h2 className='header'>Log in to your account</h2>
          <div className="userinput" id='input1'>
            <h3 className='inputs'>Username:</h3>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="userinput" id='input2'>
            <h3 className='inputs'>Password:</h3>
            <input type={showPassword?"text":"password"} onChange={(e) => setPassword(e.target.value)} />
            <div onClick={() => setShowPassword(!showPassword)} className="eyeicon1">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </div>
            <p id='forget'><link rel="#" href="" onc />Forgot Password?</p>
          </div>
          <div>
            <button type='submit' className="login2">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Loginpage;
