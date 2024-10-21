import "./ModelAnswer.css";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../../homebutton/home";
import BackComp from "../../backComp/backComp";
import Teeth from "../../TeethComp/Teeth";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import answer from "./answer.png";
import html2canvas from "html2canvas";
import ReviewCanvas from "../ReviewAnswer/ReviewCanvas";
import { saveAs } from "file-saver";
function ModelAnswer() {
  let navigate = useNavigate();
  const captureRef = useRef(null);
  const location = useLocation();
  const selectedData = location.state?.selectedData || {};
  const currentSolvedCases = location.state?.currentSolvedCases;
  const userdata = location.state?.userdata;
  const imgData = location.state?.imgData;
  const answerImage = location.state?.answerImage;
  const problemDescription = location.state?.problemDescription;

  const curves = location.state?.curves;
  console.log(answerImage);

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
          link.download = `answer ${currentSolvedCases + 1}.png`;
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
  const handleDownload = () => {
    const imageUrl = answerImage;

    saveAs(imageUrl, "ModelAnswer.png"); // Use file-saver to download
  };
  return (
    <div className="designPage">
      <Home
        onClick={() => navigate("/studenthome", { state: { userdata } })}
      ></Home>
      <BackComp
        onClick={() =>
          navigate("/reviewAnswer", {
            state: {
              curves,
              selectedData,
              typeselect: true,
              userdata,
              imgData,
              problemDescription,
              answerImage,
            },
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
          y: isYourAnswerMoved ? -140 : 0,
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
          src={answerImage}
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
        <div ref={captureRef} style={{ width: "100%", maxWidth: "200vw" }}>
          <Teeth
            selectRest={{ selectrest: true }}
            DentureData={selectedData}
            setData={() => {}}
            click={(index) => console.log(`Clicked tooth ${index}`)}
            value={{ canEdit: false, visible: false }}
            selectPlate={{ view: true }}
            selectRetention={{ selectretention: true }}
            selectClasp={{ view: true }}
          />

          <ReviewCanvas drewcurves={curves} inReview={true} />
        </div>
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
          onClick={() => navigate("/studenthome", { state: { userdata } })}
        >
          Finish
        </button>
        <div>
          {isDownloadModelAnswerVisible && (
            <button
              className="ModelAnswerButton"
              id="DownloadModelAnswer"
              onClick={handleDownload}
            >
              Download Model Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ModelAnswer;
