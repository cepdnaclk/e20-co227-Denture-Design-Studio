import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserEngagement.css';
import Home from "../homebutton/home";
import userIcon from "../UserAccount/usericon.png";

const UserEngagement = () => {
    const navigate = useNavigate();

    // Initial dummy user data
    const initialUsers = [
        { id: 1, username: 'Username_1' },
        { id: 2, username: 'Username_2' },
        { id: 3, username: 'Username_3' },
        { id: 4, username: 'Username_4' },
        { id: 5, username: 'Username_5' },
        { id: 6, username: 'Username_6' },
        { id: 7, username: 'Username_7' },
        { id: 8, username: 'Username_8' },
        { id: 9, username: 'Username_9' },
        { id: 10, username: 'Username_10' },
        { id: 11, username: 'Username_11' },
        { id: 12, username: 'Username_12' },
        { id: 13, username: 'Username_13' },
        { id: 14, username: 'Username_14' },
        { id: 15, username: 'Username_15' },
        { id: 16, username: 'Username_16' },
        { id: 17, username: 'Username_17' },
    ];

    const [users] = useState(initialUsers);

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
           <div className="userengagementpage">
                <header>              
                    <div className="home-icon">
                    <Home onClick={() => navigate('/assessorhome')} />
                </div>
                    <h1>User Engagement</h1>
                </header>
                <div className="engagement-list">
                    {users.map(user => (
                        <div key={user.id} className="engagement-item">
                            <div className="username">
                                <img src={userIcon} alt="User Icon" className="user-icon" />
                                {user.username}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>             
    );
};

export default UserEngagement;
