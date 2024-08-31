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
  const [userverify, setuserverify] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [stillverify, setstillverify] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      await axios
        .get(`http://localhost:5000/student/verify/${token}?id=${userid}`)
        .then((studentResponse) => {
          setuserverify(true);
        })
        .catch(async (studentError) => {
          await axios
            .get(`http://localhost:5000/assessor/verify/${token}?id=${userid}`)
            .then((assessorResponse) => {
              setuserverify(true);
            })
            .catch((assessorError) => {
              setstillverify(false);
            });
        });
      axios
        .post("http://localhost:5000/student/get", { user_name })
        .then((response) => {
          console.log(response.data);
          setuserdata(response.data.student);
        })
        .catch((studenterr) => {
          axios
            .post("http://localhost:5000/assessor/get", { user_name })
            .then((response) => {
              console.log(response.data);
              setuserdata(response.data.assessor);
            })
            .catch((assessorError) => {
              console.log("fail");
              setstillverify(false);
            });
        });
    };

    verifyEmail();
  }, [token, userid, user_name]);
  console.log(userdata, userverify, token, userid, user_name, stillverify);
  if (stillverify) {
    return (
      <div className="designPage">
        <div className="messagebox">
          <div className="webAppLogo">
            <img src={webApplogo} className="WebAppLogo" alt={"WebApp Logo"} />
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
          <img src={webApplogo} className="WebAppLogo" alt={"WebApp Logo"} />
        </div>
        <img
          src={userverify || userdata?.isVerified ? Successlogo : Errorlogo}
          className="verificationimg"
          alt={"verification Logo"}
        />
        <div
          className={`message ${
            userverify || userdata?.isVerified ? "sucess" : "error"
          }`}
        >
          <h1 className="verification">
            {userverify || userdata?.isVerified
              ? "Verification is successed"
              : "Error"}
          </h1>
        </div>
        <p className="verifymessage">
          {userverify || userdata?.isVerified
            ? "Your email has been verified. You can now sign in with your new account"
            : "Your email address could not be verified!."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
