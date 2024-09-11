import { useState } from "react";
import Myaccount from "../../myaccount/Myaccount";
import Homecomp from "../../homecomp/Homecomp";
import Exitbutton from "../../Exitbutton/Exitbutton";
import "./Studenthome.css";
import { useNavigate, useLocation } from "react-router-dom";
import ActualorAssessor from "./ActualorAssessor";
function Studenthome() {
  const location = useLocation();
  const userdata = location.state?.userdata;
  const username = userdata?.first_name;
  const role = "/studenthome";
  console.log(userdata);
  const navigate = useNavigate();
  const [solvecase, setsolvecase] = useState(false);

  return (
    <div className="studenthome">
      <Exitbutton />
      <Myaccount user={"/studenthome"} userdata={userdata} />
      <div className="stdhomecontent">
        <h1>Welcome {username}</h1>
        <div id="studenth1">
          <Homecomp
            name={"Create a Patient Case"}
            click={() => navigate("/createpatient", { state: { userdata } })}
          />
        </div>
        <div id="studenth2">
          <Homecomp
            name={"Solve a Patient Case"}
            click={() => setsolvecase(true)}
          />
        </div>
        <div id="studenth3">
          <Homecomp
            name={"Content"}
            click={() =>
              navigate("/studentscontents", { state: { userdata, role } })
            }
          />
        </div>
        <div id="studenth4">
          <Homecomp
            name={"View Your Progress"}
            click={() => navigate("/Viewprogress", { state: { userdata } })}
          />
        </div>
        {solvecase && (
          <ActualorAssessor
            cancel={() => setsolvecase(false)}
            solve={() => setsolvecase(false)}
            userdata={userdata}
          />
        )}
      </div>
    </div>
  );
}

export default Studenthome;
