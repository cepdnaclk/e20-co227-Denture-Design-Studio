import { useState } from "react";
import "./Editdetails.css";

function Editdetails({ userdata }) {
  console.log("hi");
  const [user_name, setusername] = useState(null);
  const [first_name, setfirstname] = useState(null);
  const [last_name, setlastname] = useState(null);
  const [firstnamechange, setfirstnamechange] = useState(false);
  const [lastnamechange, setlastnamechange] = useState(false);
  const [usernamechange, setusernamechange] = useState(false);
  console.log(user_name, first_name, last_name);
  return (
    <div>
      <div className="edit-details">
        <h1>Edit your Details here !</h1>
        <h2>Edit your First name:</h2>
        <input
          type="text"
          value={
            first_name
              ? first_name
              : firstnamechange
              ? first_name
              : userdata.first_name
          }
          onChange={(e) => {
            setfirstname(e.target.value);
            setfirstnamechange(true);
          }}
        />
        <h2>Edit your Last name:</h2>
        <input
          type="text"
          value={
            last_name
              ? last_name
              : lastnamechange
              ? last_name
              : userdata.last_name
          }
          onChange={(e) => {
            setlastname(e.target.value);
            setlastnamechange(true);
          }}
        />
        <h2>Edit your User name:</h2>
        <input
          type="text"
          value={
            user_name
              ? user_name
              : usernamechange
              ? user_name
              : userdata.user_name
          }
          onChange={(e) => {
            setusername(e.target.value);
            setusernamechange(true);
          }}
        />
        <button>cancel</button>
        <button>save</button>
      </div>
    </div>
  );
}
export default Editdetails;
