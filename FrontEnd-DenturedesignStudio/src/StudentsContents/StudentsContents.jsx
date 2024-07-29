import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StudentsContents.css";
import Home from "../homebutton/home";
import materialIcon from "../Contents/materialIcon.png";

const StudentsContents = () => {
  const [materials, setMaterials] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;

  const handleOpen = (material) => {
    const roles = "/studentscontents";
    navigate("/viewcontent", { state: { material, roles } });
    // Implement logic to open the material
  };

  const handleDownload = (material) => {
    alert(`Downloading ${material}`);
    // Implement logic to download the material
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
            <Home
              onClick={() => navigate("/studenthome", { state: { userdata } })}
            />
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
                <span className="material-title" title={material}>
                  {material}
                </span>
              </div>

              <div className="actions2">
                <button onClick={() => handleOpen(material)}>Open</button>
                <button onClick={() => handleDownload(material)}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentsContents;
