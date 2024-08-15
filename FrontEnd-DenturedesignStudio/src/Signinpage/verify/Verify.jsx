import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

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
    return <h1>verifying......</h1>;
  }
  return (
    <div>
      <h1>
        {userverify || userdata?.isVerified
          ? "verification is success"
          : "error in verifications"}
      </h1>
    </div>
  );
};

export default VerifyEmail;
