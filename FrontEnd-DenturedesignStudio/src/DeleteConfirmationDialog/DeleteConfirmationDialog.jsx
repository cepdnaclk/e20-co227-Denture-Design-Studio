import React from "react";
import "./DeleteConfirmationDialog.css"; // Import the CSS file for styling
import usericon from "./usericon.png";

const DeleteConfirmationDialog = ({ user, onDelete, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete this user? </p>
      <img src={usericon} alt="" />
      <h6>{user.user_name}</h6>
      <div>
        <button onClick={() => onDelete(user._id)}>Delete Account</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
