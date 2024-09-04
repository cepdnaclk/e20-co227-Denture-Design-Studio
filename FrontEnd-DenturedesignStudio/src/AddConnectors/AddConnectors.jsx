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
  const selectedData = location.state?.selectedData;
  const [connectortype, setconnectortype] = useState();
  const [selectedtype, setSelectedtype] = useState();
  const [curves, setcurves] = useState();

  const [major, setMajor] = useState(false);
  const [minor, setMinor] = useState(false);

  function curvesData(uppercurve, lowercurve, lowerminorcurve) {
    setcurves({ uppercurve, lowercurve, lowerminorcurve });
  }
  console.log(drewcurves, curves);
  console.log(selectedtype);

  return (
    <>
      <div className="designPage">
        <Home onClick={() => navigate("/studenthome")}></Home>
        <BackComp
          onClick={() =>
            navigate("/AddIndirectRetentions", {
              state: { selectedData, typeselect: true },
            })
          }
        ></BackComp>
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
                onClick={() =>
                  navigate("/reviewAnswer", {
                    state: { curves, selectedData },
                  })
                }
              >
                <div className="DoneText">
                  <span className="DoneText">Done</span>
                </div>
              </button>

              <ul className="connectors-list">
                <li
                  id="upper"
                  onClick={() => {
                    setSelectedtype("upper");
                    setconnectortype(null);
                  }}
                  style={
                    selectedtype === "upper"
                      ? { color: "white" }
                      : { color: "#92dada" }
                  }
                >
                  Upper
                </li>
                <ul
                  className="upper-connector"
                  style={{
                    display: selectedtype === "upper" ? "block" : "none",
                  }}
                >
                  <li
                    id="upper-major"
                    onClick={() => {
                      selectedtype === "upper"
                        ? setconnectortype("upper")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "upper"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Major Connector
                  </li>
                  <li
                    id="upper-minor"
                    onClick={() => {
                      selectedtype === "upper"
                        ? setconnectortype("lower_minor")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower_minor"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Minor Connector
                  </li>
                </ul>
                <li
                  id="lower"
                  onClick={() => {
                    setSelectedtype("lower");
                    setconnectortype(null);
                  }}
                  style={{
                    color: selectedtype === "lower" ? "white" : "#92dada",
                    top: selectedtype === "upper" ? "12vh" : "6vh",
                  }}
                >
                  Lower
                </li>
                <ul
                  className="lower-connector"
                  style={{
                    display: selectedtype === "lower" ? "block" : "none",
                  }}
                >
                  <li
                    id="major"
                    onClick={() => {
                      selectedtype === "lower"
                        ? setconnectortype("lower")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Major Connector
                  </li>
                  <li
                    id="minor"
                    onClick={() => {
                      selectedtype === "lower"
                        ? setconnectortype("lower_minor")
                        : setconnectortype(null);
                    }}
                    style={
                      connectortype === "lower_minor"
                        ? { color: "white" }
                        : { color: "#92dada" }
                    }
                  >
                    Minor Connector
                  </li>
                </ul>
              </ul>
              <div className="retention-teeth">
                <Teeth
                  selectRest={{ selectrest: true }}
                  DentureData={selectedData}
                  setData={() => {}}
                  value={{ canEdit: false, visible: true }}
                  selectPlate={{ view: true }}
                  selectClasp={{ view: true }}
                  selectRetention={{ selectretention: true }}
                />
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
