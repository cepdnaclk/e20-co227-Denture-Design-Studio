import { useState } from "react";
import "./forgotpassword.css";
import axios from "axios";
import Swal from "sweetalert2";

function Forgotpassword({ cancel, sentemail }) {
  const [enteredemail, setenteredemail] = useState();
  console.log(enteredemail);

  const handlesentreset = () => {
    axios
      .post(
        "https://e20-co227-denture-design-studio.onrender.com/student/reset-password",
        {
          email: enteredemail,
        }
      )
      .then((res) => {
        sentemail();
        console.log(res);
      })
      .catch((err) => {
        axios
          .post(
            "https://e20-co227-denture-design-studio.onrender.com/assessor/reset-password",
            {
              email: enteredemail,
            }
          )
          .then((res) => {
            sentemail();
            console.log(res);
          })
          .catch(() => {
            console.log(err);
          });
      });
  };

  return (
    <div>
      <div className="forgot-password-overlay"></div>
      <div className="forgot-password">
        <h1>Reset Password</h1>
        <h3>Enter the email:</h3>
        <input type="email" onChange={(e) => setenteredemail(e.target.value)} />
        <button className="send-link" onClick={handlesentreset}>
          Send Reset Link
        </button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
export default Forgotpassword;
