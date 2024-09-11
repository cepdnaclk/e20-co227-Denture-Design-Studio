import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createPatientCase2.css";
import Home from "../homebutton/home";
import CreateUploadButton from "../CreateUploadButton/CreateUploadButton";
import Teeth from "../TeethComp/Teeth";

function CreatePatientStep2() {
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }
  const location = useLocation();
  const typeselect = location.state?.typeselect;
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

  return (
    <div className="CreatePatientCase2">
      <Home onClick={() => handleClick("/studenthome")} />
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
        />
        <div className="teethBackground">
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
        <CreateUploadButton Name="Create" Pagetogo="/addSaddles" />
      </div>
    </div>
  );
}

export default CreatePatientStep2;
