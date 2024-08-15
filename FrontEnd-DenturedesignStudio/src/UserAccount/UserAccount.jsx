import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAccount.css";
import Home from "../homebutton/home";
import usericon from "./usericon.png";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

import axios from "axios";
const UserAccount = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAssessors = axios.get("http://localhost:5000/assessor");
    const fetchStudents = axios.get("http://localhost:5000/student");
    const fetchAdmin = axios.get("http://localhost:5000/admin");

    Promise.all([fetchAssessors, fetchStudents, fetchAdmin])
      .then(([assessorRes, studentRes, adminres]) => {
        setUsers([...assessorRes.data, ...studentRes.data, ...adminres.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedUser(id);
  };

  const confirmDelete = async (_id) => {
    console.log(_id);
    const user = users.find((user) => user._id === _id);
    try {
      if (!user) {
      }
      await axios.delete("http://localhost:5000/student/delete", {
        data: { user_name: user.user_name },
      });
    } catch (studenterror) {
      try {
        await axios.delete("http://localhost:5000/assessor/delete", {
          data: { user_name: user.user_name },
        });
      } catch (assessorerror) {
        try {
          await axios.delete("http://localhost:5000/admin/delete", {
            data: { user_name: user.user_name },
          });
        } catch (adminerr) {
          console.error("Error deleting user:", error.message);
        }
      }
    }
    const updatedUsers = users.filter((user) => user._id !== _id);

    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const cancelDelete = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="useraccountpage">
        <header className="userheader">
          <div className="home-icon">
            <Home onClick={() => navigate("/adminhome")} />
          </div>
          <h1>User Accounts</h1>
        </header>
        <div className="account-list">
          {users.map((user) => (
            <div key={user._id} className="account-item">
              <div className="useraccountname">
                <img
                  src={usericon}
                  alt="User Icon"
                  className="user-icon-account"
                />
                {user.user_name}
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className="delete-button"
              >
                Delete Account
              </button>
            </div>
          ))}
        </div>
        {selectedUser && (
          <DeleteConfirmationDialog
            user={users.find((user) => user._id === selectedUser)}
            onDelete={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </>
  );
};

export default UserAccount;
