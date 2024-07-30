import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Contents.css";
import Home from "../homebutton/home";
import materialIcon from "./materialIcon.png";
import Uploadcontent from "./Uploadcontent/Uploadcontent";
import Removecontent from "./Removecontent/Removecontent";
import axios from "axios";

const Contents = () => {
  const [materials, setMaterials] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const role = location.state?.role;
  const [addcontent, setAddcontent] = useState(false);
  const [removecontent, setremovecontent] = useState(false);
  const [materialToRemove, setMaterialToRemove] = useState(null);

  const addMaterial = (content) => {
    setAddcontent(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/lecture")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lectures!", error);
      });
  }, [addMaterial]);

  const handleOpen = (material) => {
    const roles = "/assessorcontent";
    navigate("/viewcontent", { state: { material, role, roles } });
  };

  const handleDownload = (material) => {
    alert(`Downloading ${material}`);
  };

  const handleRemove = (material) => {
    console.log("Deleting lecture with ID:", material._id);
    setMaterials(materials.filter((m) => m !== material));
    setremovecontent(false);
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
                <button
                  onClick={() => {
                    setremovecontent(true);
                    setMaterialToRemove(material);
                  }}
                >
                  Remove
                </button>
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
        {removecontent && materialToRemove && (
          <Removecontent
            material={materialToRemove}
            remove={handleRemove}
            back={() => setremovecontent(false)}
          />
        )}
      </div>
    </>
  );
};

export default Contents;
