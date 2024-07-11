import Home from "../homebutton/home";
import { useLocation, useNavigate } from "react-router-dom";
import usericon from "../Myaccountview/usericon.png";
import "./Myaccountview.css";

function Myaccountview() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const userdata = location.state?.userdata;

  const formatdate = (datestring) => {
    const date = new Date(datestring);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="my-account-view">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <Home onClick={() => navigate(user, { state: { userdata } })} />
      <div className="user-name-email">
        <img src={usericon} alt="" />
        <h1>{userdata.user_name}</h1>
      </div>
      <div className="user-detail-container">
        <h2>User details</h2>
        <h3 id="name-show">Name :</h3>
        <h4 id="user-name">
          {userdata.first_name} {userdata.last_name}
        </h4>
        <h3 id="email-show">Email address:</h3>
        <h4 id="email">{userdata.email}</h4>
      </div>
      <div className="loging-activity-container">
        <h2>Login activity</h2>
        <h3 className="first-access">First access to the site :</h3>
        <h4 className="first-access-date">{formatdate(userdata.createdAt)}</h4>
        <h3 className="last-access">Last access to the site :</h3>
        <h4 className="last-access-date">
          {formatdate(userdata.lastAccessed)}
        </h4>
      </div>
    </div>
  );
}

export default Myaccountview;
