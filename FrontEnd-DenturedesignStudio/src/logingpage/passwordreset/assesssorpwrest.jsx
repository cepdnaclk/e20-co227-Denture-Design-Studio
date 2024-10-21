import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./passwordrest.css";
import axios from "axios";
import Swal from "sweetalert2";

function Assessorpwreset() {
  const [serchparms] = useSearchParams();
  const token = serchparms.get("token");
  const userId = serchparms.get("id");
  const user_name = serchparms.get("uname");
  console.log(token, userId, user_name);
  const [newpassword, setnewpassword] = useState();
  const [compassword, setcompassword] = useState();
  const pwmatched = newpassword === compassword ? true : false;
  const [passwordchanged, setpasswordchanged] = useState(false);

  const handlesave = () => {
    if (pwmatched) {
      axios
        .put(
          `https://e20-co225-denture-design-studio.onrender.com/assessor/edit/password/${token}`,
          {
            password: newpassword,
            userId: userId,
          }
        )
        .then((response) => {
          console.log("success");
          setpasswordchanged(true);
          Swal.fire({
            title: "password changed successfully",
            text: "correct",
            icon: "success",
            background: "#2f5770",
            color: "white",
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Error password changing",
              text: "Invalid or expired token!",
              icon: "error",
              background: "#2f5770",
              color: "white",
            });
          }
        });
    } else {
      console.log("pw not matched");
    }
  };
  console.log(passwordchanged);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="password-reset-overlay"></div>
      <div className="password-reset">
        {!passwordchanged ? (
          <>
            <h1>
              your user name: <h2 className="your-user-name">{user_name}</h2>
            </h1>
            <h2 className="enter-new-password">Enter new password :</h2>
            <input
              className="new-password"
              type="password"
              onChange={(e) => {
                setnewpassword(e.target.value);
              }}
            />
            <h4>{pwmatched ? "" : "password not matched"}</h4>
            <h2 className="com-password">confirm password :</h2>
            <input
              className="com-password-input"
              type="password"
              onChange={(e) => {
                setcompassword(e.target.value);
              }}
            />
            <button onClick={handlesave}>Save</button>
          </>
        ) : (
          <>
            <h1>Password Changed Successfully!</h1>
            <h1>
              {" "}
              your user name: <h2 className="your-user-name">{user_name}</h2>
            </h1>
            <h2>You can now log in with your new password</h2>
            <a href="/login">Go to Login</a>
          </>
        )}
      </div>
    </div>
  );
}
export default Assessorpwreset;
