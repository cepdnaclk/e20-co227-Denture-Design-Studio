// StudentsContents.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentsContents.css'; // Corrected import for CSS file
import Home from '../homebutton/home'; // Assuming Home component import
import materialIcon from '../Contents/materialIcon.png'; // Assuming materialIcon import

const StudentsContents = () => {
  const [materials, setMaterials] = useState([
    'Material_1',
    'Material_2',
    'Material_3',
    'Material_4',
  ]);

  const navigate = useNavigate();

  const addMaterial = () => {
    const newMaterial = `Material_${materials.length + 1}`;
    setMaterials([...materials, newMaterial]);
  };

  const handleOpen = (material) => {
    alert(`Opening ${material}`);
    // Implement logic to open the material
  };

  const handleDownload = (material) => {
    alert(`Downloading ${material}`);
    // Implement logic to download the material
  };

  const handleRemove = (material) => {
    setMaterials(materials.filter((m) => m !== material));
  };

  return (
    <div className="contents-page">
      <header>
        <div className="home-icon">
          <Home onClick={() => navigate('/adminhome')} /> {/* Assuming Home component usage */}
        </div>
        <h1>Content</h1>
      </header>
      <div className="content">
        {materials.map((material, index) => (
          <div className="material" key={index}>
            <img src={materialIcon} alt="Material Icon" className="material-icon" />
            <span>{material}</span>
            <div className="actions">
              <button onClick={() => handleOpen(material)}>Open</button>
              <button onClick={() => handleDownload(material)}>Download</button>
            </div>
          </div>
        ))}
      </div>
      <button className="upload-button" onClick={addMaterial}>Upload Material</button>
    </div>
  );
};

export default StudentsContents;

