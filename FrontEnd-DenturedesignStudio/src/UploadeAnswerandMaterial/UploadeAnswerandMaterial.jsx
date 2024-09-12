import "./UploadeAnswerandMaterial.css";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import React, { useRef, useState } from "react";
import AddDescription from "./AddDescription.jsx";
import AddMaterial from "./AddMaterials.jsx";
import AddAnswer from "./AddAnswer.jsx";
import Teeth from "../TeethComp/Teeth.jsx";
import Swal from "sweetalert2";
import { storage } from "../../firebase.config.js";
import { ref, uploadString } from "firebase/storage";
import html2canvas from "html2canvas";

function UploadeAnswerandMaterial() {
  let navigate = useNavigate();
  const location = useLocation();
  const typeselect = location.state?.typeselect;
  const captureRef = useRef(null);

  const [isImageUpload, setisImageUpload] = useState(false);
  const [isAddDescriptionOpen, setIsAddDescriptionOpen] = useState(false);
  const [isAddAnswerOpen, setIsAddAnswerOpen] = useState(false);
  const [isAddMaterialsOpen, setIsAddMaterialsOpen] = useState(false);
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(
    location.state?.selectedData
      ? {
          retentiondata: null,
          missingteeth: location.state?.selectedData.missingteeth,
          undercuts: location.state?.selectedData.undercuts,
          restdata: location.state?.selectedData.restdata,
        }
      : {
          retentiondata: null,
          restdata: null,
          missingteeth: null,
          undercuts: null,
        }
  );
  console.log(selectedData);
  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
      retentiondata: data.retentions ? data.retentions : null,
    });
  };
  function handleClick(path) {
    if (path == "/assessorhome" && isImageUpload) {
      Swal.fire({
        icon: "error",
        title: "Upload Required",
        text: "Please upload an answer before finishing!",
        background: "#30505b",
        color: "#d3ecff",
        confirmButtonColor: "#66d8d8",
      });
      return;
    }
    navigate(path);
  }
  const openAddDescription = () => {
    setIsAddDescriptionOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddDescription = () => {
    setIsAddDescriptionOpen(false);
    document.body.classList.remove("active-popup");
  };
  const openAddAnswer = () => {
    setIsAddAnswerOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddAnswer = () => {
    setIsAddAnswerOpen(false);
    setIsAddImageOpen(false);
    document.body.classList.remove("active-popup");
  };
  const openAddMaterials = () => {
    setIsAddMaterialsOpen(true);
    document.body.classList.add("active-popup");
  };
  const closeAddMaterials = () => {
    setIsAddMaterialsOpen(false);
    document.body.classList.remove("active-popup");
  };
  const openAddImage = () => {
    setIsAddImageOpen(true);
    document.body.classList.remove("active-popup");
  };
  console.log(isImageUpload);
  const storeImage = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        willReadFrequently: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const storageRef = ref(storage, `images/teeth_${Date.now()}.png`);
        uploadString(storageRef, imgData, "data_url")
          .then((snapshot) => {
            console.log("Uploaded to Firebase successfully!");
          })
          .catch((error) => {
            console.error("Error uploading to Firebase:", error);
          });
      });
    } else {
      console.error("Capture element not found");
    }
  };
  return (
    <div className="designPage">
      <Home onClick={() => handleClick("/assessorhome")}></Home>
      <BackComp
        onClick={() => handleClick("/asessorcreatepatientcase")}
      ></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="UAMHeader">Upload Answer/ Material/ Description</h1>
      <div className="teethBackground">
        <div ref={captureRef} style={{ width: "100%", maxWidth: "200vw" }}>
          <Teeth
            setMissingtooth={false}
            selectRest={{ selectrest: false }}
            DentureData={selectedData}
            setData={setData}
            click={(index) => console.log(`Clicked tooth ${index}`)}
            value={{ canEdit: false, visible: true }}
            selectPlate={{ view: false }}
            selectRetention={{ selectretention: false }}
            selectClasp={{ edit: false }}
          />
        </div>
      </div>

      <div className="UAMButtonsbox">
        <button className="UAMButtons" id="Addanswer" onClick={openAddAnswer}>
          Add Answer
        </button>
        {isAddAnswerOpen && (
          <AddAnswer
            handleClose={closeAddAnswer}
            openAddImage={openAddImage}
            isAddImageOpen={isAddImageOpen}
            closeAddImage={closeAddAnswer}
            setisImageUpload={(state) => setisImageUpload(state)}
          />
        )}

        <button
          className="UAMButtons"
          id="Adddescription"
          onClick={openAddDescription}
        >
          Add Description
        </button>
        {isAddDescriptionOpen && (
          <AddDescription handleClose={closeAddDescription} />
        )}

        <button
          className="UAMButtons"
          id="Uploadmaterial"
          onClick={openAddMaterials}
        >
          Upload Materials
        </button>
        {isAddMaterialsOpen && <AddMaterial handleClose={closeAddMaterials} />}
        <button
          className="UAMButtons"
          id="Finish"
          onClick={() => {
            handleClick("/assessorhome");
            storeImage();
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
export default UploadeAnswerandMaterial;
