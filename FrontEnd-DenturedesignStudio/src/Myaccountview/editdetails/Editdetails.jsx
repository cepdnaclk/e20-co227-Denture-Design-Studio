import { useState, useEffect } from "react";
import "./Editdetails.css";
import axios from "axios";
function Editdetails({ userdata, cancel, save, user }) {
  const [user_name, setusername] = useState(userdata.user_name);
  const [first_name, setfirstname] = useState(userdata.first_name);
  const [last_name, setlastname] = useState(userdata.last_name);
  const [firstnamechange, setfirstnamechange] = useState(false);
  const [lastnamechange, setlastnamechange] = useState(false);
  const [usernamechange, setusernamechange] = useState(false);
  const [existuser, setexistuser] = useState(false);

  const role =
    user === "/studenthome"
      ? "/student"
      : user === "/assessorhome"
      ? "/assessor"
      : "/admin";
  const handleFirstnameChange = (e) => {
    const trimmedValue = e.target.value.trim();
    setfirstname(trimmedValue);
    setfirstnamechange(true);
  };

  const handleLastnameChange = (e) => {
    const trimmedValue = e.target.value.trim();
    setlastname(trimmedValue);
    setlastnamechange(true);
  };

  const handleUsernameChange = (e) => {
    const trimmedValue = e.target.value.trim();
    setusername(trimmedValue);
    setusernamechange(true);
  };

  const handledetailsEdit = () => {
    try {
      if (!firstnamechange) {
        setfirstname(userdata.first_name);
      }
      if (!lastnamechange) {
        setlastname(userdata.last_name);
      }
      if (!usernamechange) {
        setusername(userdata.user_name);
      }
      console.log("State updated:", { first_name, last_name, user_name });
      if (first_name && last_name && user_name) {
        try {
          axios
            .put(`https://denture-design-studio.onrender.com${role}/edit`, {
              first_name: first_name,
              last_name: last_name,
              user_name: userdata.user_name,
              newuser_name: user_name,
            })
            .then((response) => {
              console.log(response.status);
              if (response.status === 200) {
                save({ first_name, last_name, user_name });
              }
            })
            .catch((err) => {
              console.log(err.response.status);
              if (err.response.status === 409) {
                setexistuser(true);
              }
            });
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div>
      <div className="edit-details-cover"></div>
      <div className="edit-details">
        <h1>Edit your Details here!</h1>

        <h2 className="edit-header1">Edit your First name:</h2>
        <div className="error-message" id="message1">
          {firstnamechange && !first_name ? "First name can't be empty" : " "}
        </div>
        <input
          className="edit-input1"
          type="text"
          value={first_name}
          onChange={handleFirstnameChange}
        />

        <h2 className="edit-header2">Edit your Last name:</h2>
        <div className="error-message" id="message2">
          {lastnamechange && !last_name ? "Last name can't be empty" : " "}
        </div>
        <input
          className="edit-input2"
          type="text"
          value={last_name}
          onChange={handleLastnameChange}
        />

        <h2 className="edit-header3">Edit your User name:</h2>
        <div className="error-message" id="message3">
          {usernamechange && !user_name
            ? "User name can't be empty"
            : existuser
            ? "the user name is already taken"
            : ""}
        </div>
        <input
          className="edit-input3"
          type="text"
          value={user_name}
          onChange={handleUsernameChange}
        />

        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
        <button className="save-btn" onClick={handledetailsEdit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Editdetails;
