import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UploadPatientCase.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";

function UploadPatientCase() {
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = location.state?.userdata;
  const [missingtooth, setMissingtooth] = useState(true);
  const [selectedData, setSelectedData] = useState({
    restdata: null,
    missingteeth: null,
    undercuts: null,
    plates: null,
  });

  const handleClick = (path) => {
    navigate(path, { state: { userdata } });
  };

  const setData = (data) => {
    setSelectedData({
      restdata: data.rests ? data.rests : null,
      missingteeth: data.teeths ? data.teeths : null,
      undercuts: data.undercuts ? data.undercuts : null,
      plates: data.plates ? data.plates : null,
    });
  };
  console.log({ missingtooth });
  console.log("Selected data before navigating:", selectedData);

  return (
    <div className="CreatePatientCase2">
      <Home onClick={() => handleClick("/assessorhome")} />
      <BackComp onClick={() => handleClick("/assessorhome")} />
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
        />
        <div className="teethBackground">
          <Teeth
            setMissingtooth={true}
            value={{ canEdit: false, visible: false }}
            selectRest={false}
            setData={setData}
            DentureData={selectedData}
            selectPlate={{ view: false }}
            selectRetention={{ selectRetention: false }}
            selectClasp={{ edit: false }}
          />
        </div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="text">
          <h2 id="createAPatientCase2">Create a Patient Case</h2>
          <h1 id="steps2">
            step 1 : Select missing teeth
            <br />
            step 2 : Click Add undercuts
          </h1>
        </div>
      </div>
      <button
        className="Create"
        onClick={() =>
          navigate("/asessorcreatepatientcase", {
            state: { selectedData, userdata },
          })
        }
      >
        Add Undercut
      </button>
    </div>
  );
}

export default UploadPatientCase;
