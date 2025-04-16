import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./passwordrest.css";
import axios from "axios";
import Swal from "sweetalert2";

function Studentpwreset() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const userName = searchParams.get("uname");
  console.log(token, userId, userName);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const pwMatched = newPassword === confirmPassword;

  const handleSave = () => {
    if (pwMatched) {
      axios
        .put(
          `https://e20-co227-denture-design-studio.onrender.com/student/edit/password/${token}`,
          {
            password: newPassword,
            userId: userId,
          }
        )
        .then((response) => {
          console.log("success");
          setPasswordChanged(true);
          Swal.fire({
            title: "Password changed successfully",
            text: "correct",
            icon: "success",
            background: "#2f5770",
            color: "white",
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Error changing password",
              text: "Invalid or expired token!",
              icon: "error",
              background: "#2f5770",
              color: "white",
            });
          }
        });
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="password-reset-overlay"></div>
      <div className="password-reset">
        {!passwordChanged ? (
          <>
            <h1>
              Your username:{" "}
              <span className="highlight-username">{userName}</span>
            </h1>
            <h2 className="enter-new-password">Enter new password:</h2>
            <input
              className="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <h4>{pwMatched ? <br /> : "Passwords do not match"}</h4>
            <h2 className="com-password">Confirm password:</h2>
            <input
              className="com-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h1 className="success-msg">Password Changed Successfully!</h1>
            <h1 className="success">
              {" "}
              Your username:{" "}
              <span className="highlight-username">{userName}</span>
            </h1>
            <h2>You can now log in with your new password</h2>
            <a href="/login">Go to Login</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Studentpwreset;
