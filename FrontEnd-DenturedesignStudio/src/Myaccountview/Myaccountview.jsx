import Home from "../homebutton/home";
import { useLocation, useNavigate } from "react-router-dom";

function Myaccountview() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const userdata = location.state?.userdata;

  return (
    <div className="my-account-view">
      <Home onClick={() => navigate(`/${user}`, { state: { userdata } })} />
      <div>{userdata.user_name}</div>
    </div>
  );
}

export default Myaccountview;
