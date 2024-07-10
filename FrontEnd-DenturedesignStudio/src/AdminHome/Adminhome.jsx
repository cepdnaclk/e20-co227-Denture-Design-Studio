import React from "react";
import Myaccount from "../myaccount/Myaccount";
import Homecomp from "../homecomp/Homecomp";
import Exitbutton from "../Exitbutton/Exitbutton";
import "./Adminhome.css";
import { useNavigate, useLocation } from "react-router-dom";

function Adminhome() {
  const location = useLocation();
  const userdata = location.state?.userdata;
  const username = userdata?.first_name;
  const role = "/adminhome";

  console.log(username);

  let navigate = useNavigate();
  return (
    <div className="homepages">
      <div className="adminhome">
        <Exitbutton />
        <Myaccount user={role} userdata={userdata} />
        <div className="adminhomecontent">
          <h1>Welcome {username}</h1>
          <div id="adminh1">
            <Homecomp
              name={"User Account"}
              click={() => navigate("/useraccount", { state: { userdata } })}
            />
          </div>
          <div id="adminh2">
            <Homecomp
              name={"Content"}
              click={() =>
                navigate("/assessorcontent", { state: { userdata } })
              }
              imge={true}
            />
          </div>
          <div id="adminh3">
            <Homecomp
              name={"Engagement Metrics"}
              click={() =>
                navigate("/usersengagement", { state: { userdata, role } })
              }
              imge={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminhome;
