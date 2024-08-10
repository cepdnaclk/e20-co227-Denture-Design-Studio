import Home from "../homebutton/home";
import { useLocation, useNavigate } from "react-router-dom";
import usericon from "../Myaccountview/usericon.png";
import edit from "./edit.png";
import "./Myaccountview.css";
import Editdetails from "./editdetails/Editdetails";
import { useState } from "react";

function Myaccountview() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [userdata, setUserdata] = useState(location.state?.userdata);
  const [editdetails, seteditdetails] = useState(false);

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
  const handleSave = (updatedData) => {
    setUserdata((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
    seteditdetails(false);
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
        <button
          onClick={() => {
            seteditdetails(true);
          }}
        >
          <img src={edit} alt="edit" />
        </button>

        <h2>User details</h2>
        <h3 id="name-show">Name :</h3>
        <h4 id="user-name">
          {userdata.first_name} {userdata.last_name}
        </h4>
        <h3 id="email-show">Email address:</h3>
        <h4 id="email">{userdata.email}</h4>
      </div>
      {editdetails && (
        <Editdetails
          user={user}
          userdata={userdata}
          cancel={() => seteditdetails(false)}
          save={handleSave}
        />
      )}
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
