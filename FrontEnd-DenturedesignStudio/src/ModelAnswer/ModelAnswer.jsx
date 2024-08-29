import "./ModelAnswer.css";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import answer from "./answer.png";
import html2canvas from "html2canvas";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";

function ModelAnswer() {
  let navigate = useNavigate();
  const captureRef = useRef(null);
  const location = useLocation();
  const selectedData = location.state?.selectedData;
  const typeselect = location.state?.typeselect;
  const curves = location.state?.curves;
  console.log(curves);
  function handleClick(path) {
    navigate(path);
  }

  const [isYourAnswerMoved, setIsYourAnswerMoved] = useState(false);
  const [isTeethMoved, setIsTeethMoved] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [ismodelAnswerHeaderVisible, setIsmodelAnswerHeader] = useState(false);
  const [isDownloadModelAnswerVisible, setIsDownloadModelAnswer] =
    useState(false);
  const togelModelAnswerView = () => {
    setIsYourAnswerMoved(!isYourAnswerMoved);
    setIsTeethMoved(!isTeethMoved);
    setIsAnswerVisible(!isAnswerVisible);
    setIsmodelAnswerHeader(!ismodelAnswerHeaderVisible);
    setIsDownloadModelAnswer(!isDownloadModelAnswerVisible);
    document.body.classList.add("active-popup");
  };

  const downloadTeethAsImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        willReadFrequently: true,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "Download.png";
          document.body.appendChild(link); // Append link to body to make it available
          link.click();
          document.body.removeChild(link); // Clean up link element
        })
        .catch((error) => {
          console.error("Error capturing image:", error);
        });
    } else {
      console.error("Capture element not found");
    }
  };

  return (
    <div className="designPage">
      <Home onClick={() => handleClick("/studenthome")}></Home>
      <BackComp
        onClick={() =>
          navigate("/reviewAnswer", {
            state: { curves, selectedData, typeselect: true },
          })
        }
      ></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />

      <h1 className="ModelAnswerHeader">
        You Have successfully solved the case!
      </h1>
      <motion.h4
        className="YourAnswer"
        animate={{
          y: isYourAnswerMoved ? -120 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        Your Answer:
      </motion.h4>
      {ismodelAnswerHeaderVisible && (
        <motion.h4 className="modelAnswerHeader">Model Answer:</motion.h4>
      )}
      {isAnswerVisible && (
        <motion.img
          src={answer}
          alt="Model Answer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="ModelAnswerPhoto"
        />
      )}

      <motion.div
        className="TeethBackgroundMA"
        animate={{
          x: isTeethMoved ? -280 : 0,
          y: isTeethMoved ? 20 : 0,
        }}
        transition={{ duration: 0.5 }}
      >

        <Teeth
          selectRest={{ selectrest: typeselect }}
          DentureData={selectedData}
          setData={() => {}}
          click={(index) => console.log(`Clicked tooth ${index}`)}
          value={{ canEdit: false, visible: true }}
          selectPlate={{ view: true }}
        />
        <ReviewCanvas drewcurves={curves} />
      </motion.div>
      <div className="ModelAnswerbuttons">
        <button
          className="ModelAnswerButton"
          id="ViewAnswer"
          onClick={togelModelAnswerView}
        >
          {isTeethMoved ? "Hide Model Answer" : "View Model Answer"}
        </button>

        <button
          className="ModelAnswerButton"
          id="DownloadAnswer"
          onClick={downloadTeethAsImage}
        >
          Download Your Answer
        </button>
        <button
          className="ModelAnswerButton"
          id="finish"
          onClick={() => handleClick("/studenthome")}
        >
          Finish
        </button>
        <a href={answer} download="ModelAnswer.png">
          {isDownloadModelAnswerVisible && (
            <button className="ModelAnswerButton" id="DownloadModelAnswer">
              Download Model Answer
            </button>
          )}
        </a>
      </div>
    </div>
  );
}
export default ModelAnswer;
