import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StudentsContents.css";
import Home from "../homebutton/home"; // Ensure the correct path
import materialIcon from "../Contents/materialIcon.png";
import axios from "axios";

const StudentsContents = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  const userdata = location.state?.userdata;

  useEffect(() => {
    axios
      .get("https://denture-design-studio.onrender.com/lecture")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lectures!", error);
      });
  }, []);

  const handleOpen = (material) => {
    const videoId = material._id;
    const user_name = userdata.user_name;
    console.log("Material ID:", videoId);

    axios
      .put("https://denture-design-studio.onrender.com/progress/edit", {
        user_name,
        videoId,
      })
      .then((response) => {
        console.log(response.data);
        const roles = "/studentscontents";
        navigate("/viewcontent", {
          state: { material, role, roles, userdata },
        });
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="studentscontentspage">
        <header className="contentheader">
          <div className="home-icon">
            <Home onClick={() => navigate(role, { state: { userdata } })} />
          </div>
          <h1>Contents</h1>
        </header>
        <div className="content">
          {materials.map((material, index) => (
            <div className="material" key={index}>
              <div className="material-detail">
                <img
                  src={materialIcon}
                  alt="Material Icon"
                  className="material-icon"
                />
                <span className="material-title" title={material.title}>
                  {material.title}
                </span>
              </div>
              <div className="actions2">
                <button onClick={() => handleOpen(material)}>Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentsContents;
