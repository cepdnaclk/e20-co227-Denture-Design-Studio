import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createPatientCase2.css";
import Home from "../homebutton/home";
import Teeth from "../TeethComp/Teeth";
import html2canvas from "html2canvas";
import BackComp from "../backComp/backComp";
import axios from "axios";
function CreatePatientStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const user_name = userdata?.user_name;
  const CreateRef = useRef(null);
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

  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
      retentiondata: data.retentions ? data.retentions : null,
    });
  };
  const handleCreateButton = () => {
    axios
      .post(
        "https://e20-co225-denture-design-studio.onrender.com/progress/get",
        { user_name }
      )
      .then((response) => {
        const currentCreatedCases = response.data.progress.createCase;
        const newCreatedCases = currentCreatedCases + 1;
        axios
          .put(
            "https://e20-co225-denture-design-studio.onrender.com/progress/edit",
            {
              user_name,
              createCase: newCreatedCases,
            }
          )
          .then((response) => {
            console.log("Lecture time updated:", response.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });

    setTimeout(() => {
      html2canvas(CreateRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        navigate("/addSaddles", { state: { userdata, imgData } });
      });
    }, 5);
  };

  return (
    <div className="CreatePatientCase2">
      <Home onClick={() => navigate("/studenthome", { state: { userdata } })} />
      <BackComp
        onClick={() => navigate("/createpatient", { state: { userdata } })}
      />
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
        />
        <div className="student-teethBackground" ref={CreateRef}>
          <Teeth
            setMissingtooth={false}
            selectRest={{ selectrest: false }}
            DentureData={selectedData}
            setData={setData}
            click={(index) => console.log(`Clicked tooth ${index}`)}
            value={{ canEdit: true, visible: true }}
            selectPlate={{ view: false }}
            selectRetention={{ selectretention: false }}
            selectClasp={{ edit: false }}
          />
        </div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <h2 className="createAPatientCase2">Create a Patient Case</h2>
        <h1 className="steps2">
          step 3 : Select undercuts
          <br />
          step 4 : Click Create
        </h1>
      </div>
      <div id="#create1">
        <button className="Create" onClick={handleCreateButton}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreatePatientStep2;
