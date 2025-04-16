import React, { useState } from "react";
import "./Logingpage.css";
import Back from "../backbutton/Back";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import bcrypt from "bcryptjs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import Forgotpassword from "./forgotpasword/Forgotpassword";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin,useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Loginpage() {
  const navigate = useNavigate();

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usererror, setuserError] = useState(false);
  const [forgotpassword, setforgotpassword] = useState(false);

  const matchPassword = async (enteredPassword, storedHashedPassword) => {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
  };

  const fetchUserByRole = async (endpoint, identifier, isGoogle = false) => {
    try {
      const payload = isGoogle ? { email: identifier } : { user_name: identifier };
      const res = await Axios.post(endpoint, payload);
      return res.data;
    } catch {
      return null;
    }
  };

  const handleLogin = async ({ user_name, password, isGoogle = false, email }) => {
    const roles = ["student", "assessor", "admin"];
    const endpoints = {
      student: "https://e20-co227-denture-design-studio.onrender.com/student/get",
      assessor: "https://e20-co227-denture-design-studio.onrender.com/assessor/get",
      admin: "https://e20-co227-denture-design-studio.onrender.com/admin/get",
    };
    const googleEndpoints = {
      student: "https://e20-co227-denture-design-studio.onrender.com/student/getByEmail",
      // Add similar email-based endpoints for other roles if available
    };

    for (let role of roles) {
      const data = await fetchUserByRole(
        isGoogle ? googleEndpoints[role] : endpoints[role],
        isGoogle ? email : user_name,
        isGoogle
      );
      const userdata = data?.[role];
      if (!userdata) continue;

      const passwordMatch = isGoogle || (await matchPassword(password, userdata.password));
      if (!passwordMatch) continue;

      if (!userdata.isVerified) {
        Swal.fire({
          title: "Email not verified",
          text: "You must verify your account first.",
          icon: "error",
          background: "#2f5770",
          color: "white",
        });
        return;
      }

      toast.success(`Logged in as ${role}`);
      navigate(`/${role}home`, { state: { userdata } });
      return;
    }

    throw new Error("User not found or credentials invalid");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setuserError(false);
    const toastId = toast.loading("Logging in...");
    try {
      await handleLogin({ user_name, password });
      toast.dismiss(toastId);
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      setuserError(true);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await Axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
  
        const email = res.data.email;
        console.log("Google login successful", res.data);
  
        await handleLogin({
          isGoogle: true,
          email: email,
        });
      } catch (err) {
        console.error("Failed to fetch user info", err);
        toast.error("Google login failed: " + err.message);
      }
    },
    onError: () => toast.error("Google login failed"),
  });
  
  return (
    <div className="">
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
            <div onClick={() => setShowPassword(!showPassword)} className="eyeicon1">
              {showPassword ? (
                <AiFillEyeInvisible size={"1.4vw"} />
              ) : (
                <AiFillEye size={"1.4vw"} />
              )}
            </div>
            <p id="forget">
              <a onClick={() => setforgotpassword(true)}>Forgot Password?</a>
            </p>
          </div>

          <button type="submit" className="login2">Login</button>

          

<button className="custom-google-btn" onClick={() => login()}>
      <img
        src="https://img.icons8.com/?size=100&id=DJgXlKerU6K0&format=png&color=000000"
        alt="Google logo"
        className="google-icon"
      />
      Continue with Google
    </button>
        </div>
      </form>

      {forgotpassword && (
        <Forgotpassword
          cancel={() => setforgotpassword(false)}
          sentemail={() => {
            setforgotpassword(false);
            Swal.fire({
              title: "Email sent",
              text: "Password reset email has been sent to your email",
              icon: "success",
              background: "#2f5770",
              color: "white",
            });
          }}
        />
      )}
    </div>
  );
}

export default Loginpage;
