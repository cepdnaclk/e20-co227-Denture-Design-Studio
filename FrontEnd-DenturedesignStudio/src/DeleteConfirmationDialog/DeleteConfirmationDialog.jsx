import React from 'react';
import './DeleteConfirmationDialog.css'; // Import the CSS file for styling

const DeleteConfirmationDialog = ({ user, onDelete, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete user {user.username}?</p>
      <div>
        <button onClick={() => onDelete(user.id)}>Delete Account</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
