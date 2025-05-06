import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TimeProvider } from "./Timecontext";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import Homepage from "./first-page/Homepage";
import Loginpage from "./logingpage/Logingpage";
import Signup from "./Signinpage/signup";
import Studenthome from "./Homepages/StudentHome/Studenthome";
import CreatePatientStep1 from "./createPatientCase/createPatientCase";
import CreatePatientStep2 from "./createPatientCase2/createPatientCase2";
import AssessorCreatePatientStep2 from "./AssessorsCreatePatientCase2/AssessorsCreatePatientCase2";
import UploadPatientCase from "./uploadPatientCase/UploadPatientCase";
import AddSaddles from "./Design_Steps/AddSaddles/AddSaddles";
import AddRests from "./Design_Steps/AddRests/AddRests";
import AddRetentions from "./Design_Steps/AddRetentions/AddRetentions";
import AddReciprocations from "./Design_Steps/AddReciprocations/AddReciprocations";
import AddIndirectRetentions from "./Design_Steps/AddIndirectRetentions/AddIndirectRetentions";
import AddConnectors from "./Design_Steps/AddConnectors/AddConnectors";
import Assessorhome from "./Homepages/AssessorHome/Assessorhome";
import Adminhome from "./Homepages/AdminHome/Adminhome";
import ModelAnswer from "./Design_Steps/ModelAnswer/ModelAnswer";
import Reviewanswer from "./Design_Steps/ReviewAnswer/ReviewAnswer";
import UserAccount from "./UserAccount/UserAccount";
import UserEngagement from "./UserEngagement/UserEngagement";
import Contents from "./Contents/Contents";
import StudentsContents from "./StudentsContents/StudentsContents";
import UserEngage from "./userengage/Usserengage";
import Studentprogress from "./studentProgress/Studentprogress";
import Myaccountview from "./Myaccountview/Myaccountview";
import Teeth from "./TeethComp/Teeth";
import Rests from "./TeethComp/Teeth";
import Viewcontent from "./viewContent/Viewcontent";
import UploadeAnswerandMaterial from "./UploadeAnswerandMaterial/UploadeAnswerandMaterial";
import VerifyEmail from "./Signinpage/verify/Verify";
import Studentpwreset from "./logingpage/passwordreset/studentpwreset";
import Assessorpwreset from "./logingpage/passwordreset/assesssorpwrest";
import "./App.css";

function App() {
  return (
    <TimeProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          {/* <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/signup" element={<Signup />} /> */}
          <Route exact path="/studenthome" element={<Studenthome />} />
          <Route exact path="/assessorhome" element={<Assessorhome />} />
          <Route exact path="/adminhome" element={<Adminhome />} />
          <Route exact path="/uploadpatient" element={<UploadPatientCase />} />
          <Route
            exact
            path="/asessorcreatepatientcase"
            element={<AssessorCreatePatientStep2 />}
          />
          <Route exact path="/addSaddles" element={<AddSaddles />} />
          <Route exact path="/addRests" element={<AddRests />} />
          <Route exact path="/addRetentions" element={<AddRetentions />} />
          <Route
            exact
            path="/addReciprocations"
            element={<AddReciprocations />}
          />
          <Route
            exact
            path="/addIndirectRetentions"
            element={<AddIndirectRetentions />}
          />
          <Route exact path="/addConnectors" element={<AddConnectors />} />
          <Route exact path="/modelanswer" element={<ModelAnswer />} />
          <Route exact path="/reviewanswer" element={<Reviewanswer />} />
          <Route exact path="/createpatient" element={<CreatePatientStep1 />} />
          <Route
            exact
            path="/createpatient2"
            element={<CreatePatientStep2 />}
          />
          <Route exact path="/useraccount" element={<UserAccount />} />
          <Route exact path="/usersengagement" element={<UserEngagement />} />
          <Route exact path="/assessorcontent" element={<Contents />} />
          <Route
            exact
            path="/studentscontents"
            element={<StudentsContents />}
          />
          <Route exact path="/userengagement" element={<UserEngage />} />
          <Route exact path="/Viewprogress" element={<Studentprogress />} />
          <Route exact path="/myaccount" element={<Myaccountview />} />
          <Route
            exact
            path="/teeth"
            element={
              <Teeth
                DentureData={true}
                selectRest={true}
                value={true}
                setData={() => {}}
              />
            }
          />
          <Route exact path="/rests" element={<Rests />} />
          <Route exact path="/viewcontent" element={<Viewcontent />} />
          <Route
            exact
            path="/uploadanswerandmaterial"
            element={<UploadeAnswerandMaterial />}
          />

          <Route exact path="/verify/:token" element={<VerifyEmail />} />
          <Route
            exact
            path="/reset-password/student"
            element={<Studentpwreset />}
          />
          <Route
            exact
            path="/reset-password/assessor"
            element={<Assessorpwreset />}
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
        <Toaster position="top-center " toastOptions={{style:{color:"black"}}}/>
      </Router>
    </TimeProvider>
  );
}

export default App;
