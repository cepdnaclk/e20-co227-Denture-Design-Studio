import "./ModelAnswer.css";
import { useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Popup from "reactjs-popup";

function ModelAnswer() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="designPage">
      <Home onClick={() => handleClick("/studenthome")}></Home>
      <BackComp onClick={() => handleClick("/back")}></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />

      <h1 className="ModelAnswerHeader">
        You Have successfully solved the case!
      </h1>
      <h4 className="YourAnswer">Your Answer:</h4>
      <div className="TeethBackground"></div>
      <div className="ModelAnswerbuttons">
        <Popup
          trigger={
            <button className="ModelAnswerButton" id="ViewAnswer">
              View Model Answer
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="ModelAnswer">
              <div className="HeaderMA">Model Answer</div>
              <div className="TeethMA"></div>
              <button className="downloadAnswerMA">
                Download Model Answer
              </button>
            </div>
          )}
        </Popup>
        <button
          className="ModelAnswerButton"
          id="DownloadAnswer"
          onClick={() => handleClick("/dowmload")}
        >
          Download Your Answer
        </button>
        <button
          className="ModelAnswerButton"
          id="Finish"
          onClick={() => handleClick("/finish")}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
export default ModelAnswer;
