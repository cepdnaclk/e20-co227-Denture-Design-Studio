import React, { useState } from "react";
import "./Teeth.css";

// Import all the images
import t0 from "./TeethImg/t0.gif";
import t1 from "./TeethImg/t1.gif";
import t2 from "./TeethImg/t2.gif";
import t3 from "./TeethImg/t3.gif";
import t4 from "./TeethImg/t4.gif";
import t5 from "./TeethImg/t5.gif";
import t6 from "./TeethImg/t6.gif";
import t7 from "./TeethImg/t7.gif";
import t8 from "./TeethImg/t8.gif";
import t9 from "./TeethImg/t9.gif";
import t10 from "./TeethImg/t10.gif";
import t11 from "./TeethImg/t11.gif";
import t12 from "./TeethImg/t12.gif";
import t13 from "./TeethImg/t13.gif";
import t14 from "./TeethImg/t14.gif";
import t15 from "./TeethImg/t15.gif";
import t16 from "./TeethImg/t16.gif";
import t17 from "./TeethImg/t17.gif";
import t18 from "./TeethImg/t18.gif";
import t19 from "./TeethImg/t19.gif";
import t20 from "./TeethImg/t20.gif";
import t21 from "./TeethImg/t21.gif";
import t22 from "./TeethImg/t22.gif";
import t23 from "./TeethImg/t23.gif";
import t24 from "./TeethImg/t24.gif";
import t25 from "./TeethImg/t25.gif";
import t26 from "./TeethImg/t26.gif";
import t27 from "./TeethImg/t27.gif";
import t28 from "./TeethImg/t28.gif";
import t29 from "./TeethImg/t29.gif";
import t30 from "./TeethImg/t30.gif";
import t31 from "./TeethImg/t31.gif";

import m0mrest from "./rests/m0mrest.gif";
import m1mrest from "./rests/m1mrest.gif";
import m2mrest from "./rests/m2mrest.gif";
import m3mrest from "./rests/m3mrest.gif";
import m4mrest from "./rests/m4mrest.gif";
import m5mrest from "./rests/m5mrest.gif";
import m6mrest from "./rests/m6mrest.gif";
import m7mrest from "./rests/m7mrest.gif";
import m8mrest from "./rests/m8mrest.gif";
import m9mrest from "./rests/m9mrest.gif";
import m10mrest from "./rests/m10mrest.gif";
import m11mrest from "./rests/m11mrest.gif";
import m12mrest from "./rests/m12mrest.gif";
import m13mrest from "./rests/m13mrest.gif";
import m14mrest from "./rests/m14mrest.gif";
import m15mrest from "./rests/m15mrest.gif";
import m16mrest from "./rests/m16mrest.gif";
import m17mrest from "./rests/m17mrest.gif";
import m18mrest from "./rests/m18mrest.gif";
import m19mrest from "./rests/m19mrest.gif";
import m20mrest from "./rests/m20mrest.gif";
import m21mrest from "./rests/m21mrest.gif";
import m22mrest from "./rests/m22mrest.gif";
import m23mrest from "./rests/m23mrest.gif";
import m24mrest from "./rests/m24mrest.gif";
import m25mrest from "./rests/m25mrest.gif";
import m26mrest from "./rests/m26mrest.gif";
import m27mrest from "./rests/m27mrest.gif";
import m28mrest from "./rests/m28mrest.gif";
import m29mrest from "./rests/m29mrest.gif";
import m30mrest from "./rests/m30mrest.gif";
import m31mrest from "./rests/m31mrest.gif";

import m4drest from "./rests/m4drest.gif";
import m5drest from "./rests/m5drest.gif";
import m6drest from "./rests/m6drest.gif";
import m7drest from "./rests/m7drest.gif";
import m8drest from "./rests/m8drest.gif";
import m9drest from "./rests/m9drest.gif";
import m10drest from "./rests/m10drest.gif";
import m11drest from "./rests/m11drest.gif";
import m20drest from "./rests/m20drest.gif";
import m21drest from "./rests/m21drest.gif";
import m22drest from "./rests/m22drest.gif";
import m23drest from "./rests/m23drest.gif";
import m24drest from "./rests/m24drest.gif";
import m25drest from "./rests/m25drest.gif";
import m26drest from "./rests/m26drest.gif";
import m27drest from "./rests/m27drest.gif";

import m5crest from "./rests/m5crest.gif";
import m6crest from "./rests/m6crest.gif";
import m7crest from "./rests/m7crest.gif";
import m8crest from "./rests/m8crest.gif";
import m9crest from "./rests/m9crest.gif";
import m10crest from "./rests/m10crest.gif";
import m21crest from "./rests/m21crest.gif";
import m22crest from "./rests/m22crest.gif";
import m23crest from "./rests/m23crest.gif";
import m24crest from "./rests/m24crest.gif";
import m25crest from "./rests/m25crest.gif";
import m26crest from "./rests/m26crest.gif";


const TeethImages = [
  t0,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
  t10,
  t11,
  t12,
  t13,
  t14,
  t15,
  t16,
  t17,
  t18,
  t19,
  t20,
  t21,
  t22,
  t23,
  t24,
  t25,
  t26,
  t27,
  t28,
  t29,
  t30,
  t31,
];

const RestImages = [
  m0mrest,
  m1mrest,
  m2mrest,
  m3mrest,
  m4mrest,
  m5mrest,
  m6mrest,
  m7mrest,
  m8mrest,
  m9mrest,
  m10mrest,
  m11mrest,
  m12mrest,
  m13mrest,
  m14mrest,
  m15mrest,
  m16mrest,
  m17mrest,
  m18mrest,
  m19mrest,
  m20mrest,
  m21mrest,
  m22mrest,
  m23mrest,
  m24mrest,
  m25mrest,
  m26mrest,
  m27mrest,
  m28mrest,
  m29mrest,
  m30mrest,
  m31mrest,

  m4drest,
  m5drest,
  m6drest,
  m7drest,
  m8drest,
  m9drest,
  m10drest,
  m11drest,
  m20drest,
  m21drest,
  m22drest,
  m23drest,
  m24drest,
  m25drest,
  m26drest,
  m27drest,

  m5crest,
  m6crest,
  m7crest,
  m8crest,
  m9crest,
  m10crest,
  m21crest,
  m22crest,
  m23crest,
  m24crest,
  m25crest,
  m26crest,

];




const Teeth = ({ disableSelection }) => {
  // State to track which buttons are selected
  const [selectedTeeth, setSelectedTeeth] = useState(Array(32).fill(false));

  const [selectedRests, setSelectedRests] = useState(Array(60).fill(false));


  const handleToothClick = (index) => {
    // Only allow interaction if selection is not disabled
    
    if (!disableSelection) {
      // Toggle the selected state for the clicked tooth
      
      setSelectedTeeth(prevState => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleRestClick = (index) => {
    if (!disableSelection) {
      setSelectedRests(prevState => {

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
          className={`teeth-btn ${selectedTeeth[index] ? 'selected' : ''}`}
          onClick={() => handleClick(index)}
        >
          <img src={TeethImages[index]} alt={`Tooth ${index + 1}`} />
        </button>
      ))}

      {Array.from({ length: 60 }, (_, index) => (
        <button
          key={index}
          className={`rest-btn ${selectedRests[index] ? 'selected' : ''}`}
          onClick={() => handleRestClick(index)}
        >
          <img src={RestImages[index]} alt={`Rest ${index + 1}`} />
        </button>
      ))}
    </div>
  );
};


export default Teeth;
