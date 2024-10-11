import "./AccountDetails.css";
import { HiX } from "react-icons/hi";

function AccountDetails({ userdata, cancel }) {
  return (
    <>
      <div className="detail-overlay"></div>
      <div className="detail-container">
        <h2>User's Details</h2>
        <HiX onClick={() => cancel()} className="close-btn" size={"3vw"} />
        <div className="user-details">
          <h3>
            <span className="label">User Name: </span>
            <span className="value">{userdata.user_name}</span>
          </h3>
          <h3>
            <span className="label">First Name: </span>
            <span className="value">{userdata.first_name}</span>
          </h3>
          <h3>
            <span className="label">Last Name: </span>
            <span className="value">{userdata.last_name}</span>
          </h3>
          <h3>
            <span className="label">Email: </span>
            <span className="value">{userdata.email}</span>
          </h3>
          <h3>
            <span className="label">role: </span>
            <span className="value">{userdata.role}</span>
          </h3>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
