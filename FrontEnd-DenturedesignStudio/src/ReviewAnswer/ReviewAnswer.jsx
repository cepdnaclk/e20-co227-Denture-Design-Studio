import BackComp from "../backComp/backComp";
import "./ReviewAnswer.css";
import { useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import Gotobutton from "../Goto/Goto";
import Teeth from "../TeethComp/Teeth";

function Reviewanswer() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="designPage">
      <Home onClick={() => handleClick("/studenthome")} />
      <BackComp onClick={() => handleClick("/AddConnectors")} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="HeaderRA">Add/Remove Components</h1>
      <p className="YouranswerRA">Your Answer :</p>
      <div className="TeethboxRA">
        <Teeth click={(index) => console.log(`Clicked tooth ${index}`)} />
      </div>
      <div className="ButtonboxRA">
        <div id="Addrests">
          <Gotobutton
            Name={"Add Rests"}
            Pagetogo={() => navigate("/addRests")}
          />
        </div>
        <div id="Addretention">
          <Gotobutton
            Name={"Add Retentions"}
            Pagetogo={() => navigate("/addRetentions")}
          />
        </div>
        <div id="Addreciprocation">
          <Gotobutton
            Name={"Add Reciprocation"}
            Pagetogo={() => navigate("/addReciprocations")}
          />
        </div>
        <div id="Addconnectors">
          <Gotobutton
            Name={"Add Connectors"}
            Pagetogo={() => navigate("/addConnectors")}
          />
        </div>
      </div>
      <button
        className="FinishDesigning"
        onClick={() => navigate("/modelanswer")}
      >
        Finish Designing
      </button>
    </div>
  );
}

export default Reviewanswer;
