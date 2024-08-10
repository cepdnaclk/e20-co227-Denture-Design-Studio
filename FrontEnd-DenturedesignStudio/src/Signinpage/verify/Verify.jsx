// VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  console.log(token);
  useEffect(() => {
    // Call the backend to verify the token
    axios
      .get(`http://localhost:5000/student/verify/${token}`)
      .then((response) => {
        setStatus("Email verified successfully!");
        console.log(response);
      })
      .catch((error) => {
        axios
          .get(`http://localhost:5000/assessor/verify/${token}`)
          .then((response) => {
            setStatus("Email verified successfully!");
            console.log(response);
          })
          .catch((err) => {
            setStatus("Verification failed. Invalid or expired token.");
          });
      });
  }, [token]);

  return (
    <div>
      <h1>{status}</h1>
    </div>
  );
};

export default VerifyEmail;
