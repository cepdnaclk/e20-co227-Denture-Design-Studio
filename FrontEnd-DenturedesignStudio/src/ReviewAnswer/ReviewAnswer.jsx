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
  const userdata = location.state?.userdata;
  const curves = location.state?.curves;
  console.log(curves?.uppercurve);

  return (
    <div className="designPage">
      <Home onClick={() => navigate("/studenthome", { state: { userdata } })} />
      <BackComp
        onClick={() =>
          navigate("/AddConnectors", {
            state: { curves, selectedData, userdata },
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
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addretention">
          <Gotobutton
            Name={"Add Retentions"}
            Pagetogo={() =>
              navigate("/addRetentions", {
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addreciprocation">
          <Gotobutton
            Name={"Add Reciprocation"}
            Pagetogo={() =>
              navigate("/addReciprocations", {
                state: { selectedData, curves, fromReview: true, userdata },
              })
            }
          />
        </div>
        <div id="Addconnectors">
          <Gotobutton
            Name={"Add Connectors"}
            Pagetogo={() =>
              navigate("/addConnectors", {
                state: { curves, selectedData, fromReview: true, userdata },
              })
            }
          />
        </div>
      </div>
      <button
        className="FinishDesigning"
        onClick={() =>
          navigate("/modelanswer", {
            state: { curves, selectedData, userdata },
          })
        }
      >
        Finish Designing
      </button>
    </div>
  );
}

export default Reviewanswer;
