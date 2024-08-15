import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TimeProvider } from "./Timecontext";
import Homepage from "./first-page/Homepage";
import Loginpage from "./logingpage/Logingpage";
import Signup from "./Signinpage/signup";
import Studenthome from "./Homepages/StudentHome/Studenthome";
import CreatePatientStep1 from "./createPatientCase/createPatientCase";
import CreatePatientStep2 from "./createPatientCase2/createPatientCase2";
import UploadPatientCase from "./uploadPatientCase/UploadPatientCase";
import AddSaddles from "./AddSaddles/AddSaddles";
import AddRests from "./AddRests/AddRests";
import AddRetentions from "./AddRetentions/AddRetentions";
import AddReciprocations from "./AddReciprocations/AddReciprocations";
import AddIndirectRetentions from "./AddIndirectRetentions/AddIndirectRetentions";
import AddConnectors from "./AddConnectors/AddConnectors";
import Assessorhome from "./Homepages/AssessorHome/Assessorhome";
import Adminhome from "./Homepages/AdminHome/Adminhome";
import ModelAnswer from "./ModelAnswer/ModelAnswer";
import Reviewanswer from "./ReviewAnswer/ReviewAnswer";
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
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/studenthome" element={<Studenthome />} />
          <Route exact path="/assessorhome" element={<Assessorhome />} />
          <Route exact path="/adminhome" element={<Adminhome />} />
          <Route exact path="/uploadpatient" element={<UploadPatientCase />} />
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
          <Route exact path="/teeth" element={<Teeth />} />
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
      </Router>
    </TimeProvider>
  );
}

export default App;
