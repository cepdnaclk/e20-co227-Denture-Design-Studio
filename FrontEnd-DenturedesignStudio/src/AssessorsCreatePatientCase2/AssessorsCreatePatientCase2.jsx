import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AssessorsCreatePatientCase2.css";
import Home from "../homebutton/home";
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import html2canvas from "html2canvas";

function AssessorCreatePatientStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const typeselect = location.state?.typeselect;
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

  return (
    <div className="CreatePatientCase2">
      <Home
        onClick={() => navigate("/assessorhome", { state: { userdata } })}
      />
      <BackComp
        onClick={() =>
          navigate("/uploadpatient", { state: { userdata, selectedData } })
        }
      />
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
        />
        <div className="teethBackground" ref={CreateRef}>
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
        <div className="text">
          <h2 id="createAPatientCase2">Create a Patient Case</h2>
          <h1 id="steps2">
            step 3 : Select undercuts
            <br />
            step 4 : Click Create & Upload
          </h1>
        </div>
      </div>
      <button
        className="Create"
        onClick={() => {
          navigate("/uploadanswerandmaterial", {
            state: { selectedData, userdata },
          });
        }}
      >
        Create & Upload
      </button>
    </div>
  );
}

export default AssessorCreatePatientStep2;
