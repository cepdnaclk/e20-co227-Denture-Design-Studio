import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Contents.css";
import Home from "../homebutton/home";
import materialIcon from "./materialIcon.png";
import Uploadcontent from "../Uploadcontent/Uploadcontent";

const Contents = () => {
  const [materials, setMaterials] = useState(["content title 1"]);

  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const role = location.state?.role;
  const [addcontent, setAddcontent] = useState(false);

  const addMaterial = (content) => {
    const newMaterial = content;
    setMaterials([...materials, newMaterial]);
    setAddcontent(false);
    console.log(content);
  };

  const handleOpen = (material) => {
    const roles = "/assessorcontent";
    navigate("/viewcontent", { state: { material, role, roles } });
  };

  const handleDownload = (material) => {
    alert(`Downloading ${material}`);
  };

  const handleRemove = (material) => {
    setMaterials(materials.filter((m) => m !== material));
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <div className="contents-page">
        <header>
          <div className="home-icon">
            <Home onClick={() => navigate(role)} />
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
                  {material.title}
                </span>
              </div>
              <div className="actions">
                <button onClick={() => handleOpen(material)}>Open</button>
                <button onClick={() => handleDownload(material)}>
                  Download
                </button>
                <button onClick={() => handleRemove(material)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button className="upload-button" onClick={() => setAddcontent(true)}>
          Upload Material
        </button>
        {addcontent && (
          <Uploadcontent
            onUpload={addMaterial}
            onback={() => setAddcontent(false)}
          />
        )}
      </div>
    </>
  );
};

export default Contents;
