import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./first-page/Homepage";
import Loginpage from "./logingpage/Logingpage";
import Signup from "./Signinpage/signup";
import Studenthome from "./StudentHome/Studenthome";
import UploadPatientCase from "./uploadPatientCase/UploadPatientCase";
import AddSaddles from "./AddSaddles/AddSaddles";
import AddRests from "./AddRests/AddRests";
import AddRetentions from "./AddRetentions/AddRetentions";
import AddReciprocations from "./AddReciprocations/AddReciprocations";
import Assessorhome from "./AssessorHome/Assessorhome";
import Adminhome from "./AdminHome/Adminhome";
import ModelAnswer from "./ModelAnswer/ModelAnswer";
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
        <Route exact path="/createuploadpatient" element={<UploadPatientCase />}/>
        <Route exact path="/addSaddles" element={<AddSaddles />} />
        <Route exact path="/addRests" element={<AddRests />} />
        <Route exact path="/addRetentions" element={<AddRetentions />} />
        <Route exact path="/addReciprocations" element={<AddReciprocations />} />
        <Route exact path="/modelanswer" element={<ModelAnswer />} />
      </Routes>
    </Router>
  );
}

export default App;
