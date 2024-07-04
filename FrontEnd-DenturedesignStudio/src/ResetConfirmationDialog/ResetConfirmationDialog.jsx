import React from 'react';
import './ResetConfirmationDialog.css';

const ResetConfirmationDialog = ({ username, onReset, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to reset the password of user: {username}?</p>
      <div className="confirmation-buttons">
        <button onClick={onReset} className="reset-password-button">Reset Password and send email</button>
        <button onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default ResetConfirmationDialog;

