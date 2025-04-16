import "./signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

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
  const student = "student", assessor = "assessor";

  const handleSubmit = async (e, isGoogleLogin = false) => {
    e.preventDefault();
    if (!isGoogleLogin) {
      if (password.length < 4) return toast.error("Error: Password should be at least 4 characters long");
      if (password !== compassword) return toast.error("Error: Passwords are not matched");
    }
    try {
      toast.dismiss();
      const toastId = toast.loading("Creating account...");
      const baseURL = "https://e20-co227-denture-design-studio.onrender.com";
      await axios.post(`${baseURL}/progress/add`, { user_name });
      await axios.post(`${baseURL}/student/add`, {
        first_name,
        last_name,
        email,
        user_name,
        password,
        isAssessorRequested: role === assessor ? true : undefined,
      });
      if (role === assessor) {
        await axios.post(`${baseURL}/admin/send-email`, { user_name });
      }
      toast.update(toastId, {
        render: "Create account successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      await Swal.fire({
        title: "Thank you for registering.",
        text: `A verification email has been sent to your email.${
          role === assessor ? "\nAdmin will review your request." : ""
        }`,
        icon: "success",
        background: "#2f5770",
        color: "white",
      });
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire({
          html: '<span class="swt-text">User already exists!</span>',
          confirmButtonColor: "#3085d6",
          background: "#2f5770",
          color: "white",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const { email, given_name, family_name } = res.data;
  
        if (!role) return toast.error("Please select a role before continuing with Google login.");
  
        // Check if user already exists
        const baseURL = "https://e20-co227-denture-design-studio.onrender.com";
        const checkRes = await axios.post(`${baseURL}/student/getByEmail`, { params: { email } });
        
        if (checkRes.data.exists) {
          toast.info("User already exists. Please login instead.");
          navigate("/login");
          return;
        }
  
        // Create new user with Google info
        const user_name = email.split("@")[0]; // Example username
        await axios.post(`${baseURL}/progress/add`, { user_name });
        await axios.post(`${baseURL}/student/add`, {
          first_name: given_name,
          last_name: family_name,
          email,
          user_name,
          password: "", // Optional, or generate random
          isAssessorRequested: role === assessor ? true : undefined,
          verified: true,
          isGoogle: true
        });
  
        if (role === assessor) {
          await axios.post(`${baseURL}/admin/send-email`, { user_name });
        }
  
        toast.success("Google account registered successfully!");
  
        await Swal.fire({
          title: "Registered via Google!",
          text: role === assessor
            ? "Admin will review your assessor request."
            : "You can now login with Google.",
          icon: "success",
          background: "#2f5770",
          color: "white",
        });
  
        navigate("/login");
      } catch (err) {
        console.error("Google login error:", err);
        toast.error("Google login failed. Try again later.");
      }
    },
    onError: () => toast.error("Google login failed"),
  });
  

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
      <form className="contentbox2" onSubmit={(e) => handleSubmit(e, false)}>
        <h1 className="header2">Create a new account</h1>
        <div className="role">
          <h3>Role:</h3>
          <input type="radio" name="role" value={student} id="Student1" onChange={(e) => setRole(e.target.value)} />
          <p id="Student2">Student</p>
          <input type="radio" name="role" value={assessor} id="Assessor1" onChange={(e) => setRole(e.target.value)} />
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
            placeholder="password must be at least 4 characters long"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword(!showPassword)} className="eyeicon">
            {showPassword ? <AiFillEyeInvisible size={"1.2vw"} /> : <AiFillEye size={"1.2vw"} />}
          </div>
        </div>
        <div className="signinput" id="signinput6">
          <h3 className="signhead">Confirm Password:</h3>
          <input
            type={showComPassword ? "text" : "password"}
            onChange={(e) => setCompassword(e.target.value)}
          />
          <div onClick={() => setShowComPassword(!showComPassword)} className="eyeicon">
            {showComPassword ? <AiFillEyeInvisible size={"1.2vw"} /> : <AiFillEye size={"1.2vw"} />}
          </div>
        </div>
        <button className="sign2" type="submit">Signup</button>
        <button
          type="button"
          className="custom-google-btn2"
          onClick={() => (role === "" ? toast.error("Please select a role") : login())}
        >
          <img
            src="https://img.icons8.com/?size=100&id=DJgXlKerU6K0&format=png&color=000000"
            alt="Google logo"
            className="google-icon"
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;
