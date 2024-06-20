import Goto from "./goto.png";
import { useNavigate } from "react-router-dom";
import "./Goto.css";
function Gotobutton({ Name, Pagetogo }) {
  const navigate = useNavigate();

  return (
    <div>
      <button className="Goto" onClick={Pagetogo}>
        {Name}
        <img src={Goto} alt="" />
      </button>
    </div>
  );
}

export default Gotobutton;
