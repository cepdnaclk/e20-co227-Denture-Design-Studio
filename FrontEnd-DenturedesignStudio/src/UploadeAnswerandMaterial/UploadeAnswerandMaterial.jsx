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
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
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
  const [answerImage, setanswerImage] = useState(
    location.state?.answerImage
  );
  console.log(answerImage);
  const [answerDescription, setAnswerDescription] = useState("");
  const [answerMaterial, setanswerMaterial] = useState("");
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
  const storeImage = async () => {
    if (!captureRef.current) {
      toast.error("Capture element not found!");
      return;
    }

    const toastId = toast.loading("Uploading patient case...");
    const now = new Date();

    // Round down to the nearest 5 minutes
    const minutes = now.getMinutes();
    const roundedMinutes = Math.floor(minutes / 5) * 5;

    now.setMinutes(roundedMinutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // Format the date and time as a folder name: "YYYY-MM-DD_HH-mm"
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');

    const currentDate = `${year}-${month}-${day}_${hours}-${mins}`;
    console.log(currentDate); 
    const folderName = `Denture-Design-Studio/actual_questions/${currentDate}`;


    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: window.devicePixelRatio,
        useCORS: true,
        willReadFrequently: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const images = [
        { file: answerImage, name: "answer" },
        { file: answerMaterial, name: "material" },
        { file: imgData, name: "problem" },
      ];
      
      const uploadedUrls = [];
      
      for (const { file, name } of images) {
        if (file) {
          const publicId = `${folderName}/${name}_Image_${new Date().getTime()}`;      
          const sigRes = await axios.post(
            "https://e20-co227-denture-design-studio.onrender.com/api/cloudinary-signature",
            {
              public_id: publicId,
              folder: folderName,
            }
          );
      
          const { signature, timestamp, apiKey, cloudName } = sigRes.data;
      
          const formData = new FormData();
          formData.append("file", file);
          formData.append("api_key", apiKey);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp);
          formData.append("public_id", publicId);
          formData.append("folder", folderName);
      
          const cloudinaryRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );
      
          const downloadURL = cloudinaryRes.data.secure_url;
          uploadedUrls.push({ type: name, url: downloadURL }); // Save with label

      }
      console.log("Uploaded URLs:", uploadedUrls);

  }
      await axios.post(
        "https://e20-co227-denture-design-studio.onrender.com/actualcase/add",
        {
          AnswerUrl: uploadedUrls.find((img) => img.type === "answer")?.url,
          ProblemUrl: uploadedUrls.find((img) => img.type === "problem")?.url,
          description: answerDescription,
          supportMaterialUrl: uploadedUrls.find((img) => img.type === "material")?.url,
        }
      );

      toast.update(toastId, {
        render: "Patient case created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/assessorhome", { state: { userdata } });
      }, 2000);
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to upload image or save data!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err);
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
            answerImage={(img) => setanswerImage(img)}
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
            answerMaterial={(url) => setanswerMaterial(url)}
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
