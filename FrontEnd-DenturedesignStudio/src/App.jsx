import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./first-page/Homepage";
import Loginpage from "./logingpage/Logingpage";
import Signup from "./Signinpage/signup";
import Studenthome from "./StudentHome/Studenthome";
import CreatePatientCase from "./createPatientCase/createPatientCase";
import CreatePatientStep2 from "./createPatientCase2/createPatientCase2";
import UploadPatientCase from "./uploadPatientCase/UploadPatientCase";
import AddSaddles from "./AddSaddles/AddSaddles";
import AddRests from "./AddRests/AddRests";
import AddRetentions from "./AddRetentions/AddRetentions";
import AddReciprocations from "./AddReciprocations/AddReciprocations";
import AddIndirectRetentions from "./AddIndirectRetentions/AddIndirectRetentions";
import AddConnectors from "./AddConnectors/AddConnectors";
import Assessorhome from "./AssessorHome/Assessorhome";
import Adminhome from "./AdminHome/Adminhome";
import ModelAnswer from "./ModelAnswer/ModelAnswer";
import Reviewanswer from "./ReviewAnswer/ReviewAnswer";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Loginpage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/studenthome" element={<Studenthome />} />
        <Route exact path="/assessorhome" element={<Assessorhome />} />
        <Route exact path="/adminhome" element={<Adminhome />} />
        <Route exact path="/uploadpatient" element={<UploadPatientCase />}/>
        <Route exact path="/addSaddles" element={<AddSaddles />} />
        <Route exact path="/addRests" element={<AddRests />} />
        <Route exact path="/addRetentions" element={<AddRetentions />} />
        <Route exact path="/addReciprocations" element={<AddReciprocations />} />
        <Route exact path="/addIndirectRetentions" element={<AddIndirectRetentions />} />
        <Route exact path="/addConnectors" element={<AddConnectors />} />
        <Route exact path="/modelanswer" element={<ModelAnswer />} />
        <Route exact path="/reviewanswer" element={<Reviewanswer />} />
        <Route exact path="/createpatient" element={<CreatePatientCase />}/>
        <Route exact path="/createpatient2" element={<CreatePatientStep2 />}/>


      </Routes>
    </Router>
  );
}

export default App;
