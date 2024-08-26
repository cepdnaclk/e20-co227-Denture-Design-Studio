import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddConnectors.css";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth";
import DrawingCanvas from "./canvas/Canvas";

function AddConnectors() {
  let navigate = useNavigate();
  const location = useLocation();
  const drewcurves = location.state?.curves;
  const [connectortype, setconnectortype] = useState();
  const [upperSelect, setUpperselect] = useState(false);
  const [lowerSelect, setLowerselect] = useState(false);
  const [curves, setcurves] = useState();

  const [major, setMajor] = useState(false);
  const [minor, setMinor] = useState(false);

  function curvesData(uppercurve, lowercurve, lowerminorcurve) {
    setcurves({ uppercurve, lowercurve, lowerminorcurve });
  }
  console.log(drewcurves, curves);
  return (
    <>
      <div className="designPage">
        <Home onClick={() => navigate("/studenthome")}></Home>
        <BackComp onClick={() => navigate("/AddIndirectRetentions")}></BackComp>
        <div className="AddConnectors">
          <div>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
            />
            <div className="Questionbox"></div>
            <div className="teethBackground1">
              <button
                className="Done"
                onClick={() => navigate("/reviewAnswer", { state: { curves } })}
              >
                <div className="DoneText">
                  <span className="DoneText">Done</span>
                </div>
              </button>

              <ul className="connectors-list">
                <li
                  id="upper"
                  onClick={() => {
                    !upperSelect && !lowerSelect
                      ? setconnectortype("upper")
                      : lowerSelect
                      ? setconnectortype(connectortype)
                      : setconnectortype(null),
                      !lowerSelect
                        ? setUpperselect(!upperSelect)
                        : setUpperselect(upperSelect);
                  }}
                  style={
                    upperSelect ? { color: "white" } : { color: "#92dada" }
                  }
                >
                  Upper
                </li>
                <li
                  id="lower"
                  onClick={() => {
                    !upperSelect && !major && !minor
                      ? setLowerselect(!lowerSelect)
                      : setLowerselect(lowerSelect);
                  }}
                  style={
                    lowerSelect || minor || major
                      ? { color: "white" }
                      : { color: "#92dada" }
                  }
                >
                  Lower
                </li>
                <ul
                  className="lower-connector"
                  style={{
                    display: lowerSelect || major || minor ? "block" : "none",
                  }}
                >
                  <li
                    id="major"
                    onClick={() => {
                      !major && !upperSelect && !minor
                        ? setconnectortype("lower")
                        : minor
                        ? setconnectortype(connectortype)
                        : setconnectortype(null),
                        !minor ? setMajor(!major) : setMajor(major);
                    }}
                    style={
                      major && !minor
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Major Connector
                  </li>
                  <li
                    id="minor"
                    onClick={() => {
                      !minor && !upperSelect && !major
                        ? setconnectortype("lower_minor")
                        : major
                        ? setconnectortype(connectortype)
                        : setconnectortype(null),
                        !major ? setMinor(!minor) : setMinor(minor);
                    }}
                    style={
                      minor && !major
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Minor Connector
                  </li>
                </ul>
              </ul>
              <div className="retention-teeth">
                <Teeth />
              </div>
            </div>
            <h2 className="AddConnectors">Add Connectors</h2>
            <h2 className="yourQuestion">Your Question</h2>
            <h1 className="yourCase">Your Case :</h1>
          </div>

          <DrawingCanvas
            connectortype={connectortype}
            curvesData={curvesData}
            drewcurves={drewcurves}
          />
        </div>
      </div>
    </>
  );
}

export default AddConnectors;
