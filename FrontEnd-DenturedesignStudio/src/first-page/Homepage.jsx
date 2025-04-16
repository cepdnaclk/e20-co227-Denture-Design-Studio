import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Homepage.css';
import Login from '../logingpage/Logingpage';
import Signup from '../Signinpage/signup';

function Homepage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true); // true = show login, false = show signup

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
      <div className="Homepage">
        <div className="logo">
          <img src={logo} className='logo' alt="logo" />
        </div>

        {/* Toggle between Login and Signup */}
        {showLogin ? <Login /> : <Signup />}

        {/* Static heading */}
        <div>
          <h2 className='welcome'>Welcome To ,</h2>
          <h1 className='appname'>Denture Design Studio</h1>
        </div>

        {/* Buttons to switch views */}
        <div>
          <button
            className='login'
            onClick={() => setShowLogin(true)}
            style={showLogin ? { backgroundColor: '#224259' } : {}}
          >
            Login
          </button>
          <button
            className='signup'
            onClick={() => setShowLogin(false)}
            style={!showLogin ? { backgroundColor: '#224259' } : {}}
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
