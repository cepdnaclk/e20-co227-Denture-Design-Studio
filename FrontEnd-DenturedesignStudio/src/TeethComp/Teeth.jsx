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
  DentureData,
  setData,
  selectPlate,
}) => {
  const [selectedRetention, setSelectedRetention] = useState(
    Array(20).fill(false)
  );

  const [selectedTeeth, setSelectedTeeth] = useState(
    DentureData.missingteeth ? DentureData.missingteeth : Array(32).fill(false)
  );
  const [selectedRests, setSelectedRests] = useState(
    DentureData.restdata ? DentureData.restdata : Array(62).fill(false)
  );
  const [selectedPlate, setSelectedPlate] = useState(Array(20).fill(false));
  const [selectedUnderCut, setSelectedUndercut] = useState(
    DentureData.undercuts ? DentureData.undercuts : Array(20).fill(false)
  );
  const RestIndex = {
    1: [1],
    2: [2, 3],
    3: [4, 5],
    4: [6, 7],
    5: [8, 9],
    12: [10, 11],
    13: [12, 13],
    14: [14, 15],
    15: [16, 17],
    16: [18],
    17: [19],
    18: [20, 21],
    19: [22, 23],
    20: [24, 25],
    21: [26, 27],
    28: [28, 29],
    29: [30, 31],
    30: [32, 33],
    31: [34, 35],
    32: [36],
    6: [37, 38, 39],
    11: [40, 41, 42],
    22: [43, 44, 45],
    27: [46, 47, 48],
    7: [49],
    8: [50, 57, 58, 59],
    9: [51, 60, 61, 62],
    10: [52],
    23: [53],
    24: [54],
    25: [55],
    26: [56],
  };

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
  const selectedTeethIndices = selectedTeeth
    .map((isSelected, index) => (isSelected ? index : null))
    .filter((index) => index !== null);

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

        const isOnMissingTeeth = selectedTeethIndices.some((teethIndex) =>
          RestIndex[teethIndex + 1]?.includes(index + 1)
        );

        console.log("Is rest on missing teeth:", isOnMissingTeeth);

        if (restTypeMatches && !isOnMissingTeeth) {
          // Toggle selection if the rest type matches
          newState[index] = !newState[index];
        } else {
          // Show error if the rest type doesn't match
          if (selectRest.restType && !isOnMissingTeeth) {
            alert(`Error: You can only select ${selectRest.restType} rests.`);
          }
          if (isOnMissingTeeth && selectRest.restType) {
            alert(`Error: You cannot select a rest on a missing tooth.`);
          }
        }

        return newState;
      });
    }
  };

  useEffect(() => {
    setData({
      rests: selectedRests,
      teeths: selectedTeeth,
      undercuts: selectedUnderCut,
    });
  }, [selectedRests, selectedTeeth, selectedUnderCut]);
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
    console.log(index);

    const adjustedIndex = (() => {
      if (index < 5 || (index > 19 && index < 25))
        return index < 5 ? index : index - 20;
      if ((index < 10 && index > 4) || (index > 24 && index < 30))
        return index < 10 ? index + 6 : index - 14;
      if ((index < 15 && index > 9) || (index > 29 && index < 35))
        return index < 15 ? index + 6 : index - 14;
      if ((index < 20 && index > 14) || (index > 34 && index < 40))
        return index < 20 ? index + 12 : index - 8;
      return null;
    })();

    if (adjustedIndex !== null) {
      if (!selectedTeeth[adjustedIndex]) {
        setSelectedPlate((prevState) => {
          const newState = [...prevState];
          const isUpperPlate = index < 20;
          const underCutIndex = isUpperPlate ? index : index - 20;
          const isUnderCut = selectedUnderCut[underCutIndex];

          if ((isUpperPlate && !isUnderCut) || (!isUpperPlate && isUnderCut)) {
            newState[index] = !newState[index];
          } else {
            alert(isUpperPlate ? "wrong plate side" : "this side is under cut");
          }

          return newState;
        });
      } else {
        alert("can not add plates to a missing teeth");
      }
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

  const indexExchangeforUndercut = (index, label) => {
    if (label == "in") {
      if (index >= 0 && index < 5) {
        index = index;
      } else if (4 < index && index < 15) {
        index = index + 6;
      } else {
        index = index + 12;
      }
    } else {
      if (index > 19 && index < 25) {
        index = index - 20;
      } else if (24 < index && index < 35) {
        index = index - 14;
      } else {
        index = index - 8;
      }
    }
    return index;
  };

  return (
    <div className="teethBackground2">
      {Array.from({ length: 32 }, (_, index) => (
        <button
          key={index}
          className={`teeth-btn 
            ${
              (selectedTeeth[index] && setMissingtooth) ||
              (DentureData.missingteeth && selectedTeeth[index])
                ? "missing"
                : ""
            } 
            ${
              selectedTeeth[index] &&
              !setMissingtooth &&
              !DentureData.missingteeth
                ? "selected"
                : ""
            }`}
          onClick={() => handleToothClick(index)}
        >
          <img src={TeethImages[index]} alt={`Tooth ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 88 }, (_, index) => (
        <button
          key={index}
          className={`retention-btn ${
            selectedRetention[index] ? "selected" : ""
          }`}
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
            display: selectPlate ? "block" : "none",
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
            onClick={() => (value.canEdit ? handleUndercutClick(index) : "")}
            style={{
              display:
                selectedUnderCut[index] && value.visible ? "block" : "none",
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
            onClick={() => (value.canEdit ? handleUndercutClick(index) : "")}
            style={{
              display:
                !selectedUnderCut[index] && value.visible ? "block" : "none",
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
