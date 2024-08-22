import React, { useState } from "react";
import "./Teeth.css";
import "./Plate.css";
import TeethImages from "./Teethimages";
import RestImages from "./Restimages";
import ClaspImages from "./Claspsimages";

import UndercutsImages from "./Undercutimages";
// Import all the images

import PlateImages from "./PlatesImages";


const Teeth = ({ disableSelection }) => {
  const [selectedTeeth, setSelectedTeeth] = useState(Array(32).fill(false));
  const [selectedRests, setSelectedRests] = useState(Array(56).fill(false));
  const [selectedPlate, setSelectedPlate] = useState(Array(40).fill(false));

  const [selectedUnderCut, setSelectedUndercut] = useState(
    Array(40).fill(false)
  );

  const handleToothClick = (index) => {
    if (!disableSelection) {
      setSelectedTeeth((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleRestClick = (index) => {
    if (!disableSelection) {
      setSelectedRests((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };


  const handleUndercutClick = (index) => {
    if (!disableSelection) {
      setSelectedUndercut((prevState) => {

  const handlePlateClick = (index) => {
    if (!disableSelection) {
      setSelectedPlate((prevState) => {

        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  return (
    <div className="teethBackground2">
      {Array.from({ length: 32 }, (_, index) => (
        <button
          key={index}
          className={`teeth-btn ${selectedTeeth[index] ? "selected" : ""}`}
          onClick={() => handleToothClick(index)}
        >
          <img src={TeethImages[index]} alt={`Tooth ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 56 }, (_, index) => (
        <button
          key={index}
          className={`rest-btn ${selectedRests[index] ? "selected" : ""}`}
          id={`rest-btn-${index + 1}`}
          onClick={() => handleRestClick(index)}
        >
          <img src={RestImages[index]} alt={`Rest ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 40 }, (_, index) => (
        <button
          key={index}

          className={`undercut-btn ${
            selectedUnderCut[index] ? "selected" : ""
          }`}
          id={`undercut-btn-${index + 1}`}
          onClick={() => handleUndercutClick(index)}
        >
          <img src={UndercutsImages[index]} alt={`Undercut ${index + 1}`} />

          className={`plate-btn ${selectedPlate[index] ? "selected" : ""}`}
          id={`plate-btn-${index + 1}`}
          onClick={() => handlePlateClick(index)}
          style={{
            opacity: selectedPlate[index] ? "1" : "0",
          }}
        >
          <img src={PlateImages[index]} alt={`Plate ${index + 1}`} />

        </button>
      ))}
    </div>
  );
};

export default Teeth;
