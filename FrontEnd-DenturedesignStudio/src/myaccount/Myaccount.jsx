import account from "../myaccount/account.png";
import "./Myaccount.css";
import { useNavigate } from "react-router-dom";

function Myaccount({ user, userdata }) {
  let navigate = useNavigate();
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <button
        className="myaccount"
        onClick={() => navigate("/myaccount", { state: { user, userdata } })}
      >
        <img src={account} alt="" /> <br />
        My account
      </button>
    </div>
  );
}
export default Myaccount;
