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
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";

function UploadeAnswerandMaterial() {
  let navigate = useNavigate();
  const location = useLocation();
  const captureRef = useRef(null);
  const userdata = location.state?.userdata;
  const [isImageUpload, setisImageUpload] = useState(
    false || location.state?.isImageUpload
  );
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
  const [answerImageUrl, setanswerImageUrl] = useState(
    location.state?.answerImageUrl
  );
  console.log(answerImageUrl);
  const [answerDescription, setAnswerDescription] = useState("");
  const [answerMaterialUrl, setanswerMaterialUrl] = useState("");
  const [ProblemImageUrl, setProblemImageUrl] = useState("");
  const [imgData, setImgForSolved] = useState("");
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
    console.log(isImageUpload);
    if (path === "/assessorhome" && !isImageUpload) {
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
    storeImage();
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
    html2canvas(captureRef.current, {
      scale: window.devicePixelRatio,
      useCORS: true,
      willReadFrequently: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setImgForSolved(imgData);
    });
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
  console.log(answerImageUrl);
  console.log(ProblemImageUrl);
  console.log(answerMaterialUrl);
  console.log(answerDescription);
  const storeImage = () => {
    if (captureRef.current) {
      const toastId = toast.loading("Uploading patient case..."); // Show loading notification

      html2canvas(captureRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        willReadFrequently: true,
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          const storageRef = ref(
            storage,
            `ActualQuestions/${new Date().toDateString()}/problem_${new Date().toTimeString()}.png`
          );
          uploadString(storageRef, imgData, "data_url")
            .then(async (snapshot) => {
              const downloadURL = await getDownloadURL(storageRef);
              setProblemImageUrl(downloadURL);
              return downloadURL;
            })
            .then((downloadURL) => {
              axios
                .post(
                  "https://e20-co225-denture-design-studio.onrender.com/actualcase/add",
                  {
                    AnswerUrl: answerImageUrl,
                    ProblemUrl: downloadURL,
                    description: answerDescription,
                    supportMaterialUrl: answerMaterialUrl,
                  }
                )
                .then((response) => {
                  toast.update(toastId, {
                    render: "create Patient case successful!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000, // Close after 2 seconds
                  });
                  console.log(response);

                  setTimeout(() => {
                    navigate("/assessorhome", { state: { userdata } });
                  }, 2000); // Navigate after the success notification
                })
                .catch((error) => {
                  toast.update(toastId, {
                    render: "Error uploading data to server!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                  });
                  console.error("Error with axios post:", error);
                });
            })
            .catch((error) => {
              toast.update(toastId, {
                render: "Error uploading to Firebase!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
              });
              console.error("Error uploading to Firebase:", error);
            });
        })
        .catch((error) => {
          toast.update(toastId, {
            render: "Error capturing image!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          console.error("Error capturing image:", error);
        });
    } else {
      toast.error("Capture element not found!");
      console.error("Capture element not found");
    }
  };
  return (
    <div className="designPage">
      <Home
        onClick={() => navigate("/assessorhome", { state: { userdata } })}
      ></Home>
      <BackComp
        onClick={() =>
          navigate("/asessorcreatepatientcase", {
            state: { userdata, selectedData },
          })
        }
      ></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="UAMHeader">Upload Answer/ Material/ Description</h1>
      <div className="assessor-case-teeth" ref={captureRef}>
        <ToastContainer style={{ zIndex: 999 }} />
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
            answerImageUrl={(url) => setanswerImageUrl(url)}
            imgData={imgData}
            userdata={userdata}
            selectedData={selectedData}
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
          <AddDescription
            handleClose={closeAddDescription}
            answerDescription={(description) =>
              setAnswerDescription(description)
            }
          />
        )}

        <button
          className="UAMButtons"
          id="Uploadmaterial"
          onClick={openAddMaterials}
        >
          Upload Materials
        </button>
        {isAddMaterialsOpen && (
          <AddMaterial
            handleClose={closeAddMaterials}
            answerMaterialUrl={(url) => setanswerMaterialUrl(url)}
          />
        )}
        {
          <button
            className="UAMButtons"
            id="Finish"
            onClick={() => {
              handleClick("/assessorhome");
            }}
          >
            Finish
          </button>
        }
      </div>
    </div>
  );
}
export default UploadeAnswerandMaterial;
