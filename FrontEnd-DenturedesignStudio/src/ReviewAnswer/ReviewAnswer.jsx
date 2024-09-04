import BackComp from "../backComp/backComp";
import "./ReviewAnswer.css";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import Gotobutton from "../Goto/Goto";
import Teeth from "../TeethComp/Teeth";
import ReviewCanvas from "./ReviewCanvas";

function Reviewanswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedData = location.state?.selectedData;
  const curves = location.state?.curves;
  console.log(curves?.uppercurve);

  return (
    <div className="designPage">
      <Home onClick={() => navigate("/studenthome")} />
      <BackComp
        onClick={() =>
          navigate("/AddConnectors", {
            state: { curves, selectedData },
          })
        }
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="HeaderRA">Add/Remove Components</h1>
      <p className="YouranswerRA">Your Answer :</p>
      <div className="TeethboxRA">
        <Teeth
          click={(index) => console.log(`Clicked tooth ${index}`)}
          selectRest={{ selectrest: true }}
          DentureData={selectedData}
          setData={() => {}}
          value={{ canEdit: false, visible: true }}
          selectPlate={{ view: true }}
          selectRetention={{ selectretention: true }}
          selectClasp={{ view: true }}
        />
        <ReviewCanvas drewcurves={curves} />
      </div>
      <div className="ButtonboxRA">
        <div id="Addrests">
          <Gotobutton
            Name={"Add Rests"}
            Pagetogo={() =>
              navigate("/addRests", {
                state: { selectedData },
              })
            }
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
            Pagetogo={() =>
              navigate("/addConnectors", { state: { curves, selectedData } })
            }
          />
        </div>
      </div>
      <button
        className="FinishDesigning"
        onClick={() =>
          navigate("/modelanswer", {
            state: { curves, selectedData },
          })
        }
      >
        Finish Designing
      </button>
    </div>
  );
}

export default Reviewanswer;
