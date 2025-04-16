import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserAccount.css";
import Home from "../homebutton/home";
import usericon from "./usericon.png";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import AccountDetails from "./AccountDetails/AccountDetails";
import axios from "axios";
import ChangeRole from "./changeRole/ChangeRole";

const UserAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setviewUser] = useState(null);
  const [changeroleuser, setchangerole] = useState({
    id: null,
    isAssessorRequested: null,
  });
  const [fetchData, setFetchData] = useState(false); // State to trigger fetch

  useEffect(() => {
    // Fetch users when the component mounts or when fetchData changes
    const fetchUsers = async () => {
      try {
        const fetchAssessors = axios.get(
          "https://e20-co227-denture-design-studio.onrender.com/assessor"
        );
        const fetchStudents = axios.get(
          "https://e20-co227-denture-design-studio.onrender.com/student"
        );
        const fetchAdmin = axios.get(
          "https://e20-co227-denture-design-studio.onrender.com/admin"
        );

        const [assessorRes, studentRes, adminRes] = await Promise.all([
          fetchAssessors,
          fetchStudents,
          fetchAdmin,
        ]);

        const assessorsWithRole = assessorRes.data.map((user) => ({
          ...user,
          role: "assessor",
        }));
        const studentsWithRole = studentRes.data.map((user) => ({
          ...user,
          role: "student",
        }));
        const adminsWithRole = adminRes.data.map((user) => ({
          ...user,
          role: "admin",
        }));
        setUsers([
          ...assessorsWithRole,
          ...studentsWithRole,
          ...adminsWithRole,
        ]);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUsers();
  }, [fetchData]); // Fetch data when fetchData changes

  const handleDelete = (id) => {
    setSelectedUser(id);
  };
  const userDetailview = (id) => {
    setviewUser(id);
  };
  const cancelDetailview = () => {
    setviewUser(null);
    setchangerole({ id: null, isAssessorRequested: null });
    setFetchData((prev) => !prev); // Trigger fetch data
  };

  const confirmDelete = async (_id) => {
    console.log(_id);
    const user = users.find((user) => user._id === _id);
    try {
      if (!user) {
        return; // Exit if user is not found
      }
      await axios.delete(
        "https://e20-co227-denture-design-studio.onrender.com/student/delete",
        {
          data: { user_name: user.user_name },
        }
      );
      await axios.delete(
        "https://e20-co227-denture-design-studio.onrender.com/progress/delete",
        {
          data: { user_name: user.user_name },
        }
      );
    } catch (studenterror) {
      try {
        await axios.delete(
          "https://e20-co227-denture-design-studio.onrender.com/assessor/delete",
          {
            data: { user_name: user.user_name },
          }
        );
      } catch (assessorerror) {
        try {
          await axios.delete(
            "https://e20-co227-denture-design-studio.onrender.com/admin/delete",
            {
              data: { user_name: user.user_name },
            }
          );
        } catch (adminerr) {
          console.error("Error deleting user:", adminerr.message);
        }
      }
    }
    const updatedUsers = users.filter((user) => user._id !== _id);
    setUsers(updatedUsers);
    setSelectedUser(null);
    setFetchData((prev) => !prev); // Trigger fetch data again
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
            <Home
              onClick={() => navigate("/adminhome", { state: { userdata } })}
            />
          </div>
          <h1>User Accounts</h1>
        </header>
        <div className="account-list">
          {users.map((user) => (
            <div key={user._id} className="account-item">
              <div
                className="useraccountname"
                onClick={() => userDetailview(user._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={usericon}
                  alt="User Icon"
                  className="user-icon-account"
                />
                {user.user_name}
              </div>
              <div
                className="user-role"
                style={{
                  backgroundColor: user.isAssessorRequested
                    ? "orange"
                    : user.role === "admin"
                    ? "red"
                    : user.role === "student"
                    ? "green"
                    : "blue",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setchangerole({
                    id: user._id,
                    isAssessorRequested: user.isAssessorRequested,
                  })
                }
              >
                <p>
                  {user.isAssessorRequested ? "Assessor Requested" : user.role}
                </p>
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
        {viewUser && (
          <AccountDetails
            userdata={users.find((user) => user._id === viewUser)}
            cancel={cancelDetailview}
          />
        )}
        {changeroleuser.id && changeroleuser.isAssessorRequested && (
          <ChangeRole
            userData={users.find((user) => user._id === changeroleuser.id)}
            cancel={cancelDetailview}
          />
        )}
      </div>
    </>
  );
};

export default UserAccount;
