import React, { useEffect, useState } from "react";

import "./Teeth.css";
import "./Plate.css";
import "./Undercut.css";
import "./Rest.css";
import "./Retention.css";

import TeethImages from "./Teethimages";
import { RestImages, occlusal, cingulam, incisal } from "./Restimages";
import ClaspImages from "./Claspsimages";
import PlateImages from "./PlatesImages";
import UndercutsImages from "./Undercutimages";
import RetentionImages from "./RetentionImages";

const Teeth = ({
  disableSelection,
  value,
  setMissingtooth,
  selectRest,
  addIndirectretention,
  selectedrests,
  restData,
}) => {
  const [selectedTeeth, setSelectedTeeth] = useState(Array(32).fill(false));
  const [selectedRests, setSelectedRests] = useState(selectedrests ? selectedrests : Array(56).fill(false));
  const [selectedPlate, setSelectedPlate] = useState(Array(20).fill(false));
  const [selectedUnderCut, setSelectedUndercut] = useState(Array(20).fill(false));
  const [selectedRetention, setSelectedRetention] = useState(Array(20).fill(false));

  console.log(selectedrests);
  const handleToothClick = (index) => {
    if (setMissingtooth) {
      setSelectedTeeth((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];

        console.log(`Updated selectedTeeth array:`, newState); // This logs the entire array

        if (setMissingtooth) {
          console.log(`Missing Teeth, selected Tooth ${index + 1}`);
        } else {
          console.log(`Selected Tooth ${index + 1}`);
        }

        // Log each tooth's state

        return newState;
      });
    }
  };

  const handleRestClick = (index) => {
    if (!disableSelection) {
      setSelectedRests((prevState) => {
        const newState = [...prevState];

        const restImage = RestImages[index];

        const restTypeMatches =
          (selectRest.restType === occlusal.type &&
            occlusal.array.includes(restImage)) ||
          (selectRest.restType === incisal.type &&
            incisal.array.includes(restImage)) ||
          (selectRest.restType === cingulam.type &&
            cingulam.array.includes(restImage));

        if (restTypeMatches) {
          // Toggle selection if the rest type matches
          newState[index] = !newState[index];
        } else {
          // Show error if the rest type doesn't match
          if (selectRest.restType) {
            alert(`Error: You can only select ${selectRest.restType} rests.`);
          }
        }

        return newState;
      });
    }
  };

  useEffect(() => {
    restData(selectedRests);
  }, [selectedRests]);


  const handleUndercutClick = (index) => {
    if (!disableSelection) {
      setSelectedUndercut((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handlePlateClick = (index) => {
    if (!disableSelection) {
      setSelectedPlate((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleRetentionClick = (index) => {
    if (!disableSelection) {
      setSelectedRetention((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };


  const indexExchangeforUndercut = (index) => {
    if (index > 4 && index < 10) {
      index = index + 6;
    }
    return index;
  };

  return (
    <div className="teethBackground2">
      {Array.from({ length: 32 }, (_, index) => (
        <button
          key={index}
          className={`teeth-btn 
            ${selectedTeeth[index] && setMissingtooth ? "missing" : ""} 
            ${selectedTeeth[index] && !setMissingtooth ? "selected" : ""}`}
          onClick={() => handleToothClick(index)}
        >
          <img src={TeethImages[index]} alt={`Tooth ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 88 }, (_, index) => (
        <button
          key={index}
          className={`retention-btn ${selectedRetention[index] ? "selected" : ""}`}
          id={`retention-btn-${index + 1}`}
          onClick={() => handleRetentionClick(index)}
          
        >
          <img src={RetentionImages[index]} alt={`Retention ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 56 }, (_, index) => (
        <button
          key={index}
          className={`rest-btn ${selectedRests[index] ? "selected" : ""}`}
          id={`rest-btn-${index + 1}`}
          onClick={() => handleRestClick(index)}
          style={{
            display:
              selectRest.selectrest || addIndirectretention ? "block" : "none",
            opacity: selectedRests[index] ? "1" : "0",
          }}
        >
          <img src={RestImages[index]} alt={`Rest ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 40 }, (_, index) => (
        <button
          key={index}
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


      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="undercut-container">
          <button
            className={`undercut-btn`}
            id={`undercut-btn-${index + 1}`}
            onClick={() => handleUndercutClick(index)}
            style={{
              display: selectedUnderCut[index] && value ? "block" : "none",
            }}
          >
            <img
              src={UndercutsImages[index]}
              alt={`Undercut ${index + 1}`}
              style={{
                display: selectedTeeth[indexExchangeforUndercut(index, "in")]
                  ? "none"
                  : "block",
              }}
            />
          </button>
          <button
            className={`undercut-btn ${
              !selectedUnderCut[index] ? "selected" : ""
            }`}
            id={`undercut-btn-${index + 21}`}
            onClick={() => handleUndercutClick(index)}
            style={{
              display: !selectedUnderCut[index] & value ? "block" : "none",
            }}
          >
            <img
              src={UndercutsImages[index + 20]}
              alt={`Undercut ${index + 20}`}
              style={{
                display: selectedTeeth[
                  indexExchangeforUndercut(index + 20, "out")
                ]
                  ? "none"
                  : "block",
              }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Teeth;
