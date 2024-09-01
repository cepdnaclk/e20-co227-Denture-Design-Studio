import React, { useEffect, useState } from "react";

import "./Teeth.css";
import "./Plate.css";
import "./Undercut.css";
import "./Rest.css";
import "./RetentionUp.css";
import "./RetentionDown.css";
import "./Retentionring.css";
import "./claspUp.css";
import "./claspDown.css";
import "./Gingivally.css";

import "./MissingTeeth.css";

import TeethImages from "./Teethimages";
import { RestImages, occlusal, cingulam, incisal } from "./Restimages";
import PlateImages from "./PlatesImages";
import UndercutsImages from "./Undercutimages";
import gingivally from "./gingivallyImages";

import {
  RetentionUpImages,
  Ring,
  Circumferential,
  Gingivally,
  RetentionDownImages,
  RetentionRingImages,

  RetentionDownImages

} from "./RetentionImages";

import {
  ClaspUpImages,
  ClaspDownImages,
} from "./Claspsimages";

import MissingTeethImages from "./MissingTeethImages";

const Teeth = ({
  disableSelection,
  value,
  setMissingtooth,
  selectRest,
  selectRetention,
  addIndirectretention,
  DentureData,
  setData,
  selectPlate,
  selectClasp,
}) => {
  const [selectedRetention, setSelectedRetention] = useState(
    DentureData.retentiondata
      ? DentureData.retentiondata
      : {
          upClasp: Array(36).fill(false),
          downClasp: Array(36).fill(false),
          ringClasp: Array(16).fill(false),
        }
  );

  const[selectedClasps, setSelectedClasp] = useState(
    DentureData.clasps
      ? DentureData.clasps
      : { upClasp1: Array(36).fill(false), downClasp1: Array(36).fill(false) }
  );

  const [selectedTeeth, setSelectedTeeth] = useState(
    DentureData.missingteeth ? DentureData.missingteeth : Array(32).fill(false)
  );

  const [selectedGingivally, setSelectedGingivally] = useState( Array(36).fill(false)
  );

  const [selectedRests, setSelectedRests] = useState(
    DentureData.restdata ? DentureData.restdata : Array(62).fill(false)
  );
  const [selectedPlates, setSelectedPlates] = useState(
    DentureData.plates ? DentureData.plates : Array(40).fill(false)
  );
  const [selectedUnderCut, setSelectedUndercut] = useState(
    DentureData.undercuts ? DentureData.undercuts : Array(20).fill(false)
  );
  const [isRestselect, setRestselect] = useState(false);
  const [zindex, setZindex] = useState({ up: 4, down: 4, ring: 4 });
  const [selectedTeethbyRest, setselectedTeethbyRest] = useState(null);
  const RestIndex = {
    1: [null, 1],
    2: [2, 3],
    3: [4, 5],
    4: [6, 7],
    5: [8, 9],
    12: [10, 11],
    13: [12, 13],
    14: [14, 15],
    15: [16, 17],
    16: [null, 18],
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
      retentions: selectedRetention,
      teeths: selectedTeeth,
      undercuts: selectedUnderCut,
      plates: selectedPlates,
      clasps: selectedClasps,
    });

  }, [
    selectedRests,
    selectedTeeth,
    selectedUnderCut,
    selectedRetention,
    selectedPlates,
    selectedClasps,
  ]);


  const handleUndercutClick = (index) => {
    if (!disableSelection) {
      setSelectedUndercut((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleGingivallyClick = (index) => {
    if (!disableSelection) {
      setSelectedGingivally((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  }


 
  const handlePlateClick = (index) => {
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
        setSelectedPlates((prevState) => {
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

  const findIndexInArray = (Index) => {
    for (const [key, array] of Object.entries(RestIndex)) {
      const index = array.indexOf(Index + 1);

      if (
        (key > 0 && key < 6) ||
        (key > 11 && key < 22) ||
        (key > 27 && key < 33)
      ) {
        if (index !== -1) {
          if (
            index === 0 &&
            key < 17 &&
            selectRetention.occlusallyType === "ring"
          ) {
            alert("you cant add ring clasp for this teeth");
            break;
          } else if (
            index === 1 &&
            key > 16 &&
            selectRetention.occlusallyType === "ring"
          ) {
            alert("you cant add ring clasp for this rest");
            break;
          }
          index === 0
            ? setZindex({
                up: 8,
                down:
                  selectRetention.occlusallyType === "circumferential" ? 10 : 9,
                ring: selectRetention.occlusallyType === "ring" ? 10 : 9,
              })
            : setZindex({
                up:
                  selectRetention.occlusallyType === "circumferential" ? 10 : 9,
                ring: selectRetention.occlusallyType === "ring" ? 10 : 9,
                down: 8,
              });
          setselectedTeethbyRest(key - 1);
        }
      }
    }

    // Return -1 if the value is not found
  };

  const handleRetentionClick = (index, UporDown) => {
    setSelectedRetention((prevState) => {
      const newState = { ...prevState };
      const retentionImage =
        UporDown === "up"
          ? RetentionUpImages[index]
          : UporDown === "down"
          ? RetentionDownImages[index]
          : RetentionRingImages[index];

      const retentionArray =
        UporDown === "up"
          ? newState.upClasp
          : UporDown === "down"
          ? newState.downClasp
          : newState.ringClasp;
      // Check if the tooth is not missing
      const adjustIndex = (() => {
        if (UporDown === "up") {
          if (index < 20) {
            return index % 2 === 0 ? index / 2 : (index - 1) / 2;
          } else {
            return index % 2 === 0 ? (index + 2) / 2 : (index + 1) / 2;
          }
        } else if (UporDown === "down") {
          if (index < 16) {
            return index % 2 === 0 ? (index + 2) / 2 : (index + 1) / 2;
          } else {
            return index % 2 === 0 ? (index + 4) / 2 : (index + 3) / 2;
          }
        } else if (UporDown === "ring") {
          if (index < 4) {
            return index % 2 === 0 ? index / 2 : (index - 1) / 2;
          } else if (index > 3 && index < 12) {
            return index % 2 === 0 ? (index + 12) / 2 : (index + 11) / 2;
          } else {
            return index % 2 === 0 ? (index + 24) / 2 : (index + 23) / 2;
          }
        }
      })();

      // Check if the retention is being added to the correct side of the undercut
      const isCorrectSide =
        (selectedUnderCut[adjustIndex] && index % 2 === 0) ||
        (!selectedUnderCut[adjustIndex] && index % 2 === 1);
      const correctTeeth = (() => {
        if (selectedTeethbyRest < 5) {
          return selectedTeethbyRest === adjustIndex;
        } else if (selectedTeethbyRest > 10 && selectedTeethbyRest < 21) {
          return selectedTeethbyRest - 6 === adjustIndex;
        } else if (selectedTeethbyRest > 26 && selectedTeethbyRest < 32) {
          return selectedTeethbyRest - 12 === adjustIndex;
        }
      })();
      console.log("correct :", adjustIndex);

      const ringteethmissing =
        (((selectedTeethbyRest === 1 || selectedTeethbyRest === 17) &&
          !selectedTeeth[selectedTeethbyRest - 1]) ||
          ((selectedTeethbyRest === 14 || selectedTeethbyRest === 30) &&
            !selectedTeeth[selectedTeethbyRest + 1])) &&
        selectRetention.occlusallyType === "ring";

      if (isCorrectSide && isRestselect && correctTeeth && !ringteethmissing) {
        const retentionTypeMatches =
          (selectRetention.retentionType === "occlusally" &&
            selectRetention.occlusallyType === "ring" &&
            Ring.array.includes(retentionImage)) ||
          (selectRetention.retentionType === "occlusally" &&
            selectRetention.occlusallyType === "circumferential" &&
            Circumferential.array.includes(retentionImage)) ||
          (selectRetention.retentionType === gingivally.type &&
            gingivally.array.includes(retentionImage));

        if (retentionTypeMatches) {
          retentionArray[index] = !retentionArray[index];
        } else {
          alert(
            `Error: You can only select ${selectRetention.retentionType} retentions.`
          );
        }
      } else {
        if (!isCorrectSide) {
          alert(
            "Error: Retention must be added to the correct side of the undercut."
          );
        } else if (!isRestselect) {
          alert("Error: You mus select start point.");
        } else if (!correctTeeth) {

          alert("Error: Add retention to the correct teeth.");
        } else if (ringteethmissing) {
          alert("Error: you cant add ring clasp for this teeth");
        }
      }

      return newState;
    });
  };

  useEffect(() => {
    setRestselect(false);
    setselectedTeethbyRest(null);
  }, [selectedRetention]);

  console.log("selected :", selectRetention.selectretention);

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

    
  useEffect(() => {
    setRestselect(false);
    setselectedTeethbyRest(null);
  }, [selectedClasps]);
  
  console.log("selected clasp :", selectedClasps);


  const handleClaspClick = (index, UporDown) => {
    setSelectedClasp((prevState) => {
      const newState = { ...prevState };
      const claspImage =
        UporDown === "up"
          ? ClaspUpImages[index]
          : ClaspDownImages[index];
  
      const claspArray =
        UporDown === "up" ? newState.upClasp1 : newState.downClasp1;
  
      // Calculate the adjustIndex based on the tooth position
      const adjustIndex = (() => {
        if (UporDown === "up") {
          if (index < 20) {
            return index % 2 === 0 ? index / 2 : (index - 1) / 2;
          } else {
            return index % 2 === 0 ? (index + 2) / 2 : (index + 1) / 2;
          }
        } else if (UporDown === "down") {
          if (index < 16) {
            return index % 2 === 0 ? (index + 2) / 2 : (index + 1) / 2;
          } else {
            return index % 2 === 0 ? (index + 4) / 2 : (index + 3) / 2;
          }
        }
      })();
  
      // Check if there's already a retention on the opposite side

      const oppositeSideIndex = index % 2 === 0 ? index + 1 : index - 1;
      const oppositeSideRetention =
        UporDown === "up"
          ? prevState.upClasp1[oppositeSideIndex]
          : prevState.downClasp1[oppositeSideIndex];
  
      const isOppositeSideRetentionPresent = oppositeSideRetention === true;
  
      const correctTeeth = (() => {
        if (selectedTeethbyRest < 5) {
          return selectedTeethbyRest === adjustIndex;
        } else if (selectedTeethbyRest > 10 && selectedTeethbyRest < 21) {
          return selectedTeethbyRest - 6 === adjustIndex;
        } else if (selectedTeethbyRest > 26 && selectedTeethbyRest < 32) {
          return selectedTeethbyRest - 12 === adjustIndex;
        }
      })();
  
      console.log("correct teeth:", correctTeeth);
  
      if (isOppositeSideRetentionPresent && isRestselect && correctTeeth) {
        if (!claspArray[oppositeSideIndex] &&  ClaspUpImages.includes(claspImage)
        ||!claspArray[oppositeSideIndex] &&  ClaspDownImages.includes(claspImage)) {
            claspArray[index] = !claspArray[index];
        } else {
          alert("Error: Clasp cannot be added to the same side as an existing retention.");
        }
      } else {
        if (!isOppositeSideRetentionPresent) {
          alert("Error: You must add the retention to the opposite side first.");
        } else if (!isRestselect) {
          alert("Error: You must select a start point.");
        } else {
          alert("Error: Add clasp to the correct teeth.");
        }
      }
  
      return newState;
    });
  };

  
  


  return (
    <div className="teethBackground2">
      {Array.from({ length: 32 }, (_, index) => (
        <button
          key={index}
          className={`teeth-btn 
            ${
              selectedTeeth[index] &&
              !setMissingtooth &&
              !DentureData.missingteeth
                ? "selected"
                : ""
            }`}
          onClick={() => handleToothClick(index)}
        >
          <img
            src={TeethImages[index]}
            alt={`Tooth ${index + 1}`}
            style={{
              visibility:
                (selectedTeeth[index] && setMissingtooth) ||
                (DentureData.missingteeth && selectedTeeth[index])
                  ? "hidden"
                  : "visible",
            }}
          />
        </button>
      ))}

      {Array.from({ length: 32 }, (_, index) => (
        <button
          key={index}
          className="missingteeth-btn"
          id={`missingteeth-btn-${index + 1}`}
        >
          <img
            src={MissingTeethImages[index]}
            alt={`MissingTeeth ${index + 1}`}
          />
        </button>
      ))}


      {Array.from({ length: 36 }, (_, index) => (
         <button
         key={index}
         className={`gingivally-btn ${selectedGingivally[index] ? "selected" : ""}`}
         id={`gingivally-btn-${index + 1}`}
         onClick={() => handleGingivallyClick(index)}
         style={{
           opacity: selectedGingivally[index] ? "0" : "1",
         }}
       >
         <img src={gingivally[index]} alt={`Gingivally ${index + 1}`} />
       </button>
      ))}  

      {Array.from({ length: 36 }, (_, index) => (
        <button
          key={index}
          className={`retention-upbtn ${
            selectedRetention.upClasp[index] ? "selected" : ""
          }`}
          id={`retention-upbtn-${index + 1}`}
          onClick={() =>
            selectRetention.retentionType
              ? handleRetentionClick(index, "up")
              : ""
          }
          style={{
            zIndex: zindex.up,
            opacity: selectedRetention.upClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",
          }}
          disabled={zindex.up === 8}
        >
          <img src={RetentionUpImages[index]} alt={`Retention ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 36 }, (_, index) => (
        <button
          key={index}
          className={`retention-downbtn ${
            selectedRetention[index] ? "selected" : ""
          }`}
          id={`retention-downbtn-${index + 1}`}
          onClick={() =>
            selectRetention.retentionType
              ? handleRetentionClick(index, "down")
              : ""
          }
          style={{
            zIndex: zindex.down,

            opacity: selectedRetention.downClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",
          }}
          disabled={zindex.down === 8}
        >
          <img
            src={RetentionDownImages[index]}
            alt={`Retention ${index + 1}`}
          />
        </button>
      ))}

      {Array.from({ length: 16 }, (_, index) => (
        <button
          key={index}
          className={`retention-ringbtn ${
            selectedRetention[index] ? "selected" : ""
          }`}
          id={`retention-ringbtn-${index + 1}`}
          onClick={() =>
            selectRetention.retentionType
              ? handleRetentionClick(index, "ring")
              : ""
          }
          style={{
            zIndex: zindex.ring,

            opacity: selectedRetention.ringClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",
          }}
          disabled={zindex.ring === 9}
        >
          <img
            src={RetentionRingImages[index]}
            alt={`Retention ${index + 1}`}
          />
        </button>
      ))}

      {Array.from({ length: 56 }, (_, index) => (
        <button
          key={index}
          className={`rest-btn ${selectedRests[index] ? "selected" : ""}`}
          id={`rest-btn-${index + 1}`}
          onClick={() => {
            handleRestClick(index);
            selectedRests[index] ? findIndexInArray(index) : "";
            selectedRests[index] ? setRestselect(true) : setRestselect(false);
          }}
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
          className={`plate-btn ${selectedPlates[index] ? "selected" : ""}`}
          id={`plate-btn-${index + 1}`}
          onClick={() => (selectPlate.edit ? handlePlateClick(index) : "")}
          
          style={{
            display: selectPlate.view ? "block" : "none",
            opacity: selectedPlates[index] ? "1" : "0",
          }}
        >
          <img src={PlateImages[index]} alt={`Plate ${index + 1}`} />
        </button>
      ))}

      
{Array.from({ length: 36 }, (_, index) => (
  <button
    key={index}
    className={`clasp-upbtn ${
      selectedClasps.upClasp1[index] ? "selected" : ""
    }`}
    id={`clasp-upbtn-${index + 1}`}
    onClick={() =>
      selectClasp.claspType ? handleClaspClick(index, "up") : ""
    }
    style={{
      zIndex: zindex.up,
      opacity: selectedClasps.upClasp1[index] ? "1" : "0",
      display: selectClasp.selectClasp ? "block" : "none",
    }}
    disabled={zindex.up === 8}
  >
    <img src={ClaspUpImages[index]} alt={`Clasp ${index + 1}`} />
  </button>
))}

{Array.from({ length: 36 }, (_, index) => (
  <button
    key={index}
    className={`clasp-downbtn ${
      selectedClasps.downClasp1[index] ? "selected" : ""
    }`}
    id={`clasp-downbtn-${index + 1}`}
    onClick={() =>
      selectClasp.claspType ? handleClaspClick(index, "down") : ""
    }
    style={{
      zIndex: zindex.down,
      opacity: selectedClasps.downClasp1[index] ? "1" : "0",
      display: selectClasp.selectClasp ? "block" : "none",
    }}
    disabled={zindex.down === 8}
  >
    <img src={ClaspDownImages[index]} alt={`Clasp ${index + 1}`} />
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
