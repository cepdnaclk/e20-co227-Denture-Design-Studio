import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import webApplogo from "./logo.png";
import "./Verify.css";
import Successlogo from "./sucess_logo.png";
import Errorlogo from "./error_logo.png";

const VerifyEmail = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("id");
  const user_name = searchParams.get("uname");

  const [loading, setLoading] = useState(true); // Tracks whether verification is in progress
  const [isVerified, setIsVerified] = useState(false); // Tracks final verification status
  const [error, setError] = useState(false); // Tracks if any error occurs

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Try to verify as a student
        await axios.get(
          `https://denture-design-studio.onrender.com/student/verify/${token}?id=${userid}`
        );
        setIsVerified(true);
      } catch {
        // If student verification fails, try as an assessor
        try {
          await axios.get(
            `https://denture-design-studio.onrender.com/assessor/verify/${token}?id=${userid}`
          );
          setIsVerified(true);
        } catch {
          setError(true); // Verification failed for both
        }
      }

      try {
        // Fetch user data
        const response = await axios.post(
          `https://denture-design-studio.onrender.com/student/get`,
          { user_name }
        );
        if (response.data?.student?.isVerified) {
          setIsVerified(true);
        }
      } catch {
        try {
          const response = await axios.post(
            `https://denture-design-studio.onrender.com/assessor/get`,
            { user_name }
          );
          if (response.data?.assessor?.isVerified) {
            setIsVerified(true);
          }
        } catch {
          setError(true); // Data fetch failed for both
        }
      }

      setLoading(false); // Done loading
    };

    verifyEmail();
  }, [token, userid, user_name]);

  if (loading) {
    return (
      <div className="designPage">
        <div className="messagebox">
          <div className="webAppLogo">
            <img src={webApplogo} className="WebAppLogo" alt="WebApp Logo" />
          </div>
          <h1 className="verifiying">Verifying......</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="designPage">
      <div className="messagebox">
        <div className="webAppLogo">
          <img src={webApplogo} className="WebAppLogo" alt="WebApp Logo" />
        </div>
        <img
          src={isVerified ? Successlogo : Errorlogo}
          className="verificationimg"
          alt="Verification Logo"
        />
        <div className={`message ${isVerified ? "success" : "error"}`}>
          <h1 className="verification">
            {isVerified ? "Verification is successful" : "Error"}
          </h1>
        </div>
        <p className="verifymessage">
          {isVerified
            ? "Your email has been verified. You can now sign in with your new account"
            : "Your email address could not be verified!."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
