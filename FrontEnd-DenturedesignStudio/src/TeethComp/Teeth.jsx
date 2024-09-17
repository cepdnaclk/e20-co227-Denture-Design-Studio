/**
 * @section Teeth
 * 
 * @description This component renders a visual representation of teeth and allows users to interact with it
 * to select missing teeth, add rests, retentions, clasps, plates, undercuts, and gingival components
 * for a dental prosthesis design.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.setMissingtooth - Function to handle the selection of missing teeth.
 * @param {function} props.selectRest - Function to handle the selection of rests.
 * @param {function} props.selectRetention - Function to handle the selection of retentions.
 * @param {function} props.addIndirectretention - Function to handle adding indirect retentions.
 * @param {function} props.selectPlate - Function to handle the selection of plates.
 * @param {function} props.selectClasp - Function to handle the selection of clasps.
 * @param {Object} props.DentureData - Contains the denture design data including missing teeth, retention, rests, clasps, plates, and more.
 * @param {function} props.setData - Function to update the denture design data.
 */

import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import gingivallyImages from "./gingivallyImages";

import {
  RetentionUpImages,
  Ring,
  Circumferential,
  RetentionDownImages,
  RetentionRingImages,
} from "./RetentionImages";

import { ClaspUpImages, ClaspDownImages } from "./Claspsimages";

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
   // Tracks the selected retention state, including up, down, and ring clasps
  const [selectedRetention, setSelectedRetention] = useState(
    DentureData.retentiondata
      ? DentureData.retentiondata
      : {
          upClasp: Array(36).fill(false),
          downClasp: Array(36).fill(false),
          ringClasp: Array(16).fill(false),
        }
  );

   // Tracks the selected clasps of Reciprocations (up and down)
  const [selectedClasps, setSelectedClasp] = useState(
    DentureData.clasps
      ? DentureData.clasps
      : { upClasp1: Array(36).fill(false), downClasp1: Array(36).fill(false) }
  );

  // Tracks the selected missing teeth
  const [selectedTeeth, setSelectedTeeth] = useState(
    DentureData.missingteeth ? DentureData.missingteeth : Array(32).fill(false)
  );

  // Tracks the selection of gingivally element of the retentions
  const [selectedGingivally, setSelectedGingivally] = useState(
    DentureData.gingivally ? DentureData.gingivally : Array(36).fill(false)
  );

  // Tracks which buttons were clicked first
  const [firstbuttoncliked, setfirstbuttoncliked] = useState(
    Array(32).fill(false)
  );

   // Tracks the selected rests for each tooth
  const [selectedRests, setSelectedRests] = useState(
    DentureData.restdata ? DentureData.restdata : Array(62).fill(false)
  );

   // Tracks the selected plates in the design
  const [selectedPlates, setSelectedPlates] = useState(
    DentureData.plates ? DentureData.plates : Array(40).fill(false)
  );

  // Tracks the selected undercuts for the design
  const [selectedUnderCut, setSelectedUndercut] = useState(
    DentureData.undercuts ? DentureData.undercuts : Array(20).fill(false)
  );

  // Tracks whether a rest is currently being selected
  const [isRestselect, setRestselect] = useState(false);

  // Controls the z-index for rendering components
  const [zindex, setZindex] = useState({ up: 4, down: 4, ring: 4 });

  // Tracks the selected teeth by rest type
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

  /**
 * @subsection Handles clicking on a tooth to toggle its selection as missing.
 * Updates the state to reflect which teeth are selected as missing.
 * 
 * @param {number} index - The index of the tooth being clicked.
 */
  
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

  
  /**
  * @subsection 
  * 
  * Handles clicking on a rest to toggle its selection.
  * Ensures that the rest matches the selected rest type (occlusal, incisal, or cingulam) and
  * prevents adding rests to missing teeth.
  * 
  * @param {number} index - The index of the rest being clicked.
  */

    const handleRestClick = (index) => {
    if (!disableSelection) {
      setSelectedRests((prevState) => {
        const newState = [...prevState];


        // Get the rest image based on the index
        const restImage = RestImages[index];

        // Check if the selected rest type matches the rest image
        const restTypeMatches =
          (selectRest.restType === occlusal.type &&
            occlusal.array.includes(restImage)) ||
          (selectRest.restType === incisal.type &&
            incisal.array.includes(restImage)) ||
          (selectRest.restType === cingulam.type &&
            cingulam.array.includes(restImage));

        // Check if the rest is being added to a missing tooth
        const isOnMissingTeeth = selectedTeethIndices.some((teethIndex) =>
          RestIndex[teethIndex + 1]?.includes(index + 1)
        );

        // Toggle selection if the rest type matches and the tooth is not missing
        if (restTypeMatches && !isOnMissingTeeth) {
          
          // Toggle selection if the rest type matches
          newState[index] = !newState[index];
        } else {

          // Show error if the rest type doesn't match
          if (selectRest.restType && !isOnMissingTeeth) {
            toast.error(
              "Error: You can only select " + selectRest.restType + " rests."
            );
          }
          if (isOnMissingTeeth && selectRest.restType) {
            toast.error("Error: You cannot select a rest on a missing tooth.");
          }
        }

        return newState;
      });
    }
  };

  /**
  * useEffect Hook to update DentureData state when selections change.
  * 
  * This effect runs every time one of the following states is updated:
  * - `selectedRests`: Stores the selected rest data for teeth.
  * - `selectedRetention`: Stores the selected retention data for teeth.
  * - `selectedTeeth`: Tracks which teeth are selected or marked as missing.
  * - `selectedUnderCut`: Stores the selected undercut data for teeth.
  * - `selectedPlates`: Tracks the selected plates for the denture.
  * - `selectedClasps`: Tracks the selected clasps for the teeth.
  * - `selectedGingivally`: Stores the gingivally selected components.
  *
  * The purpose of this `useEffect` is to gather all these selected states 
  * and update the `DentureData` object with the current state of all selections.
  * It allows the component to pass the updated denture design data to other components
  * or logic that rely on this consolidated state.
  *
  * Dependencies: 
  * This effect depends on the changes in `selectedRests`, `selectedRetention`, `selectedTeeth`, 
  * `selectedUnderCut`, `selectedPlates`, `selectedClasps`, and `selectedGingivally`.
  * When any of these states change, `setData` is triggered to update the main data object.
  */

  useEffect(() => {
    setData({
      rests: selectedRests,
      retentions: selectedRetention,
      teeths: selectedTeeth,
      undercuts: selectedUnderCut,
      plates: selectedPlates,
      clasps: selectedClasps,
      gingivally: selectedGingivally,
    });
  }, [
    selectedRests,
    selectedTeeth,
    selectedUnderCut,
    selectedRetention,
    selectedPlates,
    selectedClasps,
    selectedGingivally,
  ]);


  /**
  * Handles the click event for selecting or deselecting an undercut for a given tooth.
  * 
  * @param {number} index - The index of the undercut being clicked.
  * 
  * The function toggles the selected state of the undercut at the given index.
  * If `disableSelection` is false, it updates the state to either select or deselect
  * the undercut for the specified tooth.
  */

  const handleUndercutClick = (index) => {
    if (!disableSelection) {
      setSelectedUndercut((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };



  /**
  * Handles the click event for selecting or deselecting gingivally retention on a tooth.
  * 
  * @param {number} index - The index of the gingival retention being clicked.
  * 
  * This function toggles the gingivally selection for the given tooth, but only if:
  * - The tooth is not missing.
  * - There is no undercut on the opposite side of the tooth.
  * 
  * It performs different checks based on the tooth index to determine which side
  * the retention is being added and ensures that the undercut is present on the correct side.
  * 
  * If any condition fails, it displays an error using the `toast` library.
  */

  const handleGingivallyClick = (index) => {
    setSelectedGingivally((prevState) => {
      const newState = [...prevState];
      console.log("gingival index", index);
      if (index < 8 || (index > 15 && 24)) {
        const undercutpresent = (index) =>
          selectedUnderCut[index + (index < 5 ? 1 : index < 21 ? 5 : 11)] !==
          true;

        if (!selectedTeeth[index + 1] && undercutpresent(index)) {
          newState[index] = !newState[index];
        } else {
          toast.error(
            selectedTeeth[index + 1]
              ? "Error: You cannot add a gingivally retention to missing teeth."
              : "Error: You cannot add a gingivally retention to this teeth. Undercut is not in this side"
          );
        }
      } else {
        const undercutpresent = (index) =>
          selectedUnderCut[index - (index < 5 ? 1 : index < 21 ? 7 : 13)] !==
          true;

        if (!selectedTeeth[index - 1] && undercutpresent(index)) {
          newState[index] = !newState[index];
        } else {
          toast.error(
            selectedTeeth[index - 1]
              ? "Error: You cannot add a gingivally retention to missing teeth."
              : "Error: You cannot add a gingivally retention to this teeth. Undercut is not in this side"
          );
        }
      }

      return newState;
    });
  };


  /**
  * Handles the click event for the first button to add gingivally retention.
  * 
  * @param {number} index - The index of the tooth being selected.
  * 
  * This function checks whether the tooth is missing before allowing the addition 
  * of gingivally retention only if the tooth is not missing. 
  * Otherwise it displays an error message.
  */

  const handlefirstButton = (index) => {
    setfirstbuttoncliked((prevState) => {
      const newState = [...prevState];
      if (selectedTeeth[index]) {
        newState[index] = !newState[index];
      } else {
        toast.error(
          "Error: You cannot add a gingivally retention to this teeth."
        );
      }

      return newState;
    });
  };


  /**
  * Handles the click event for selecting or deselecting a plate on a given tooth.
  * 
  * @param {number} index - The index of the plate being clicked.
  * 
  * The function first adjusts the `index` to match the plate layout (based on upper or lower arch).
  * To add a plate
  *   - tooth should not be missing
  *   - undercut should be on the opposite side of the plate
  * If the conditions are not met, it displays relevant error messages.
  */

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
            toast.error(
              isUpperPlate
                ? "Error: you cannot add plate this side"
                : "Error: this side is under cut"
            );
          }

          return newState;
        });
      } else {
        toast.error("Error:can not add plates to a missing teeth");
      }
    }
  };

  /**
  * Finds the index of the selected rest and applies necessary conditions for occlusallyType retentions.
  * 
  * @param {number} Index - The index of the tooth being processed.
  * 
  * The function iterates over the `RestIndex` object to check if the given `Index + 1` exists in any of its arrays.
  * 
  * - If the rest is found in the array (its index is not -1), it checks if the rest is on a valid tooth for a ring clasp.
  * - If the selected occlusallyType is "ring" and the rest is on an invalid tooth, it shows an error message.
  * - It updates the z-index depending on the type of retention (ringType or circumferential) and the position of the rest (up or down).
  * - In addition if the user is editing either the clasp or the plate, it updates the z-index accordingly.
  * 
  * If none of the conditions are satisfied, the function breaks out of the loop.
  */
  
  const findIndexInArray = (Index) => {
    for (const [key, array] of Object.entries(RestIndex)) {
      const index = array.indexOf(Index + 1);

      // Teeth positions where a ring clasp is valid
      const ringteeth = [1, 2, 15, 16, 17, 18, 31, 32];

      // Check if the key is in the valid range of teeth
      if (
        (key > 0 && key < 6) || // upper left molars + pre molars
        (key > 11 && key < 22) || // upper right and lower right molars + pre molars
        (key > 27 && key < 33) // lower left molars + pre molars
      ) {
        if (index !== -1) {
          // Check if the key is in ringteeth
          const isKeyInRingteeth = ringteeth.includes(Number(key));

          // Condition for showing the error
          if (
            (index === 0 &&
              !isKeyInRingteeth &&
              selectRetention.occlusallyType === "ring") ||
            (index === 1 &&
              !isKeyInRingteeth &&
              selectRetention.occlusallyType === "ring")
          ) {
            toast.error("Error: you can't add ring clasp for this rest");
            break;
          }
           // Handle z-index based on retentionType
          if (selectRetention.retentionType) {
            index === 0
              ? setZindex({
                  up: 7,
                  down:
                    selectRetention.occlusallyType === "circumferential"
                      ? 9
                      : 8,
                  ring: selectRetention.occlusallyType === "ring" ? 9 : 8,
                })
              : setZindex({
                  up:
                    selectRetention.occlusallyType === "circumferential"
                      ? 9
                      : 8,
                  ring: selectRetention.occlusallyType === "ring" ? 9 : 8,
                  down: 7,
                });
          }

          // Handle z-index when editing a clasp or plate
          if (selectClasp.edit || selectPlate.edit) {
            console.log("clicked");
            index === 0
              ? setZindex({ up: 7, down: 9 })
              : setZindex({ up: 9, down: 7 });
          }
          setselectedTeethbyRest(key - 1);
        }
      }
    }

    // Return -1 if the value is not found (implicit return if the function doesn't find the rest)
  };


 /**
 * Handles the logic for selecting a retention (up, down, or ring) for a specific tooth.
 * Ensures that the retention is added to the correct side, on the correct tooth, and under the right conditions.
 * 
 * @param {number} index - The index of the tooth being processed.
 * @param {string} UporDown - A string indicating if the retention is added "up", "down", or "ring".
 * 
 * The function performs the following checks:
 * - Determines the correct retention image based on the direction (up, down, or ring).
 * - Validates the correct side of the undercut for the retention.
 * - Ensures the retention is added to a valid tooth position.
 * - Prevents ring clasp addition to teeth where it is not allowed.
 * - Toggles the retention visibility if all conditions are met, or provides error messages if not.
 */
const handleRetentionClick = (index, UporDown) => {
  setSelectedRetention((prevState) => {
    const newState = { ...prevState };

    // Select the appropriate image based on the direction (up, down, ring)
    const retentionImage =
      UporDown === "up"
        ? RetentionUpImages[index]
        : UporDown === "down"
        ? RetentionDownImages[index]
        : RetentionRingImages[index];

    // Select the appropriate retention array (upClasp, downClasp, ringClasp)
    const retentionArray =
      UporDown === "up"
        ? newState.upClasp
        : UporDown === "down"
        ? newState.downClasp
        : newState.ringClasp;

    // Calculate adjusted index based on the retention direction
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

    // Validate if the retention is being added to the correct tooth based on its position
    const correctTeeth = (() => {
      if (selectedTeethbyRest < 5) {
        return selectedTeethbyRest === adjustIndex; // Upper left molars + premolars
      } else if (selectedTeethbyRest > 10 && selectedTeethbyRest < 22) { // Upper right and lower right molars + premolars
        return selectedTeethbyRest - 6 === adjustIndex;
      } else if (selectedTeethbyRest > 26 && selectedTeethbyRest < 32) { // Lower left molars + premolars
        return selectedTeethbyRest - 12 === adjustIndex; 
      }
    })();

    // Condition to prevent ring clasp addition on specific teeth
    const ringteethmissing =
      (((selectedTeethbyRest === 1 || selectedTeethbyRest === 17) &&
        !selectedTeeth[selectedTeethbyRest - 1]) ||
        ((selectedTeethbyRest === 14 || selectedTeethbyRest === 30) &&
          !selectedTeeth[selectedTeethbyRest + 1])) &&
      selectRetention.occlusallyType === "ring";

    // If all conditions are met, toggle the retention for the selected tooth
    if (isCorrectSide && isRestselect && correctTeeth && !ringteethmissing) {
      
      // Check if the retention type matches with the selected retention type
      const retentionTypeMatches =
        (selectRetention.retentionType === "occlusally" &&
          selectRetention.occlusallyType === "ring" &&
          Ring.array.includes(retentionImage)) ||
        (selectRetention.retentionType === "occlusally" &&
          selectRetention.occlusallyType === "circumferential" &&
          Circumferential.array.includes(retentionImage)) ||
        (selectRetention.retentionType === gingivally.type &&
          gingivally.array.includes(retentionImage));
          
      // Toggle the visibility of retention if the type matches
      if (retentionTypeMatches) {
        retentionArray[index] = !retentionArray[index];
      } else {
        // Error handling for adding a different kind of retention after choosing one type
        toast.error(
          "Error: You can only select " +
            selectRetention.retentionType +
            " retentions."
        );
      }
    } else {
      // Error handling for invalid conditions
      if (!isCorrectSide) {
        toast.error(
          "Error: Retention must be added to the correct side of the undercut."
        );
      } else if (!isRestselect) {
        toast.error("Error: You must select a start point.");
      } else if (!correctTeeth) {
        toast.error("Error: Add retention to the correct tooth.");
      } else if (ringteethmissing) {
        toast.error("Error: You can't add a ring clasp to this tooth.");
      }
    }

    return newState;
  });
};

/**
 * Resets the selection state when selected retention changes.
 */
useEffect(() => {
  setRestselect(false);
  setselectedTeethbyRest(null);
}, [selectedRetention]);

/**
 * Updates the z-index of retention types when the selected retention type changes.
 */
useEffect(() => {
  setZindex({ up: 4, down: 4, ring: 4 });
}, [selectRetention.retentionType]);

/**
 * Adjusts the index based on the direction (in or out) for undercut processing.
 * 
 * @param {number} index - The current index.
 * @param {string} label - Direction label ("in" or "out").
 * @returns {number} - The adjusted index.
 */
const indexExchangeforUndercut = (index, label) => {
  if (label === "in") {
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
    setfirstbuttoncliked(Array(32).fill(false));
  }, [selectedClasps, selectedGingivally]);

  /**
  * Function to handle when a clasp is clicked.
  *
  * This function updates the state of selected clasps based on the index of the clicked tooth,
  * ensuring the clasp is properly added to either the upper or lower array, depending on the provided "UporDown" argument.
  * It also checks the tooth position (adjustIndex), verifies if there's already retention on the opposite side,
  * and ensures the clasp can only be added to the correct teeth based on the selected tooth and rest points.
  *
  * @param {number} index - The index of the clicked tooth, which determines where to add the clasp in the clasp array.
  * @param {string} UporDown - Specifies whether the clasp should be added to the upper ("up") or lower ("down") side of teeth.
  *
  * The function does the following:
  * 
  * 1. Clones the current state of selected clasps.
  * 2. Retrieves the correct clasp image from either the upper or lower set of clasp images based on the "UporDown" argument.
  * 3. Adjusts the index (adjustIndex) to correspond to the real tooth position.
  *    - For upper teeth: handles teeth positions below index 20.
  *    - For lower teeth: handles teeth positions below index 16.
  * 4. Checks if there's already a retention clasp on the opposite side of the selected tooth.
  * 5. Determines whether the clasp is being added to the correct teeth by comparing with `selectedTeethbyRest`.
  * 6. If all conditions are met (correct teeth, no clasp on the opposite side, rest selected, etc.):
  *    - Toggles the clasp state on the corresponding index.
  * 7. If any of the conditions are violated (e.g., retention on the same side, no opposite side retention, incorrect teeth, etc.):
  *    - Displays an appropriate error message using `toast.error()`.
  *
  * Error cases:
  * - If a retention already exists on the same side as the clasp being added, display an error.
  * - If retention hasn't been added to the opposite side yet, display an error.
  * - If the rest point has not been selected, display an error.
  * - If the clasp is being added to an incorrect tooth, display an error.
  *
  * @returns {object} newState - The updated state of clasps (upper or lower) with the new clasp added or errors handled.
  */
const handleClaspClick = (index, UporDown) => {
  setSelectedClasp((prevState) => {
      const newState = { ...prevState };
      const claspImage =
          UporDown === "up" ? ClaspUpImages[index] : ClaspDownImages[index];

      const claspArray =
          UporDown === "up" ? newState.upClasp1 : newState.downClasp1;

      // Calculate the adjusted index based on the tooth position
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

      // Check if there's already a retention clasp on the opposite side of the selected tooth
      const oppositeSideIndex = index % 2 === 0 ? index + 1 : index - 1;
      console.log(
          "adjusted :",
          adjustIndex,
          "index :",
          index,
          "oppositeSideIndex :",
          oppositeSideIndex
      );
      const oppositeSideRetention =
          UporDown === "up"
              ? selectedRetention.upClasp[oppositeSideIndex]
              : selectedRetention.downClasp[oppositeSideIndex];
      console.log(
          "adjusted :",
          adjustIndex,
          "index :",
          index,
          "oppositeSideIndex :",
          oppositeSideIndex,
          "oppositeSideRetention :",
          oppositeSideRetention
      );
      const isOppositeSideRetentionPresent = oppositeSideRetention === true;

      // Check if the clasp is being added to the correct teeth based on the rest point
      const correctTeeth = (() => {
          if (selectedTeethbyRest < 5) {
              return selectedTeethbyRest === adjustIndex;
          } else if (selectedTeethbyRest > 10 && selectedTeethbyRest < 21) {
              return selectedTeethbyRest - 6 === adjustIndex;
          } else if (selectedTeethbyRest > 26 && selectedTeethbyRest < 32) {
              return selectedTeethbyRest - 12 === adjustIndex;
          }
      })();

      // Handle clasp selection and potential errors
      if (isOppositeSideRetentionPresent && isRestselect && correctTeeth) {
          if (
              (!claspArray[oppositeSideIndex] &&
                  ClaspUpImages.includes(claspImage)) ||
              (!claspArray[oppositeSideIndex] &&
                  ClaspDownImages.includes(claspImage))
          ) {
              claspArray[index] = !claspArray[index];
          }
      } else {
          if (
              UporDown === "up"
                  ? selectedRetention.upClasp[index]
                  : selectedRetention.downClasp[index]
          ) {
              toast.error(
                  "Error: Clasp cannot be added to the same side as an existing retention."
              );
          } else if (!isOppositeSideRetentionPresent) {
              toast.error(
                  "Error: You must add the retention to the opposite side first."
              );
          } else if (!isRestselect) {
              toast.error("Error: You must select a start point.");
          } else {
              toast.error("Error: Add clasp to the correct teeth.");
          }
      }

      return newState;
  });
};

  /**
  * `Teeth` Component
  * 
  * This component renders a dental grid interface with interactive buttons for teeth, missing teeth, gingivally, retention types, rests, plates, clasps, and undercuts. 
  * It allows users to interact with various elements of the dental model and manage their selection states.
  * 
  * The component includes:
  * - Buttons for each tooth that toggle selection state
  * - Buttons for missing teeth
  * - Buttons for gingivally-related actions
  * - Buttons for retention types (up, down, ring)
  * - Buttons for rests, plates, and clasps
  * - Buttons for undercuts
  * 
  * The visibility, opacity, and zIndex of each button are controlled based on the current state and the type of retention or selection.
  * 
  * The component also includes `useEffect` hooks to manage side effects related to state changes, such as resetting selections or adjusting zIndex.
  * 
  * @returns {JSX.Element} The rendered `Teeth` component.
  */

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
        <div
          className="gingivally-btn-container"
          style={{ width: "0", height: "0" }}
          id={`gingivally-btn-container-${index + 1}`}
        >
          <button
            className="gingivally-btn2"
            id={`gingivally-btn2-${index + 1}`}
            onClick={() => handlefirstButton(index)}
            style={{
              zIndex:
                selectRetention.retentionType === "gingivally" ? "12" : "4",
              display:
                selectRetention.retentionType === "gingivally"
                  ? "block"
                  : "none",
            }}
          ></button>
          <button
            key={index}
            className={`gingivally-btn ${
              selectedGingivally[index] ? "selected" : ""
            }`}
            id={`gingivally-btn-${index + 1}`}
            onClick={() => {
              firstbuttoncliked[index] ? handleGingivallyClick(index) : "";
            }}
            style={{
              opacity: selectedGingivally[index] ? "1" : "0",
              zIndex:
                selectRetention.retentionType === "gingivally" ? "11" : "3",
              cursor:
                selectRetention.retentionType === "gingivally"
                  ? "pointer"
                  : "default",
            }}
            disabled={selectRetention.retentionType !== "gingivally"}
          >
            <img
              src={gingivallyImages[index]}
              alt={`Gingivally ${index + 1}`}
            />
          </button>
        </div>
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
            zIndex: selectRetention.retentionType ? zindex.up : "4",
            opacity: selectedRetention.upClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",

            cursor: zindex.up === 9 ? "pointer" : "default",
          }}
          disabled={zindex.up === 7}
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
            zIndex: selectRetention.retentionType ? zindex.down : "4",

            opacity: selectedRetention.downClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",
            cursor: zindex.down === 9 ? "pointer" : "default",
          }}
          disabled={zindex.down === 7}
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
            zIndex: selectRetention.retentionType ? zindex.ring : "4",

            opacity: selectedRetention.ringClasp[index] ? "1" : "0",
            display: selectRetention.selectretention ? "block" : "none",
          }}
          disabled={zindex.ring === 8}
        >
          <img
            src={RetentionRingImages[index]}
            alt={`Retention ${index + 1}`}
          />
        </button>
      ))}

      {Array.from({ length: 62 }, (_, index) => (
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
            zIndex: selectPlate.edit ? "9" : "4",
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
            selectClasp.edit ? handleClaspClick(index, "up") : ""
          }
          style={{
            zIndex: selectClasp.edit ? zindex.up : "4",
            opacity: selectedClasps.upClasp1[index] ? "1" : "0",
            display: selectClasp.view ? "block" : "none",
          }}
          disabled={zindex.up === 7}
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
            selectClasp.edit ? handleClaspClick(index, "down") : ""
          }
          style={{
            zIndex: selectClasp.edit ? zindex.down : "4",
            opacity: selectedClasps.downClasp1[index] ? "1" : "0",
            display: selectClasp.view ? "block" : "none",
          }}
          disabled={zindex.down === 7}
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Teeth;
