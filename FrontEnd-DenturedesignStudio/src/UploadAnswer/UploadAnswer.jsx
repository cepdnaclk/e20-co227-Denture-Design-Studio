import { useNavigate } from "react-router-dom";
import Home from "../homebutton/home";
import BackComp from "../backComp/backComp";
import Teeth from "../TeethComp/Teeth.jsx";
import "./UploadAnswer.css";
import Swal from "sweetalert2";

function UploadAnswer() {
  let navigate = useNavigate();
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "Done",
      text: "Your answer image has been uploaded successfully",
      background: "#30505b",
      color: "#d3ecff",
      timer: 1800,
      showConfirmButton: false,
    }).then(() => {
      navigate("/uploadanswerandmaterial"); // Replace '/nextpage' with your target route
    });
  };
  return (
    <div className="designPage">
      <Home onClick={() => navigate("/assessorhome")}></Home>
      <BackComp onClick={() => navigate("/addConnectors")}></BackComp>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />
      <h1 className="UploadAnswerHeader">Model Answer</h1>
      <div className="UploadAnswerTeethBackground">
        <Teeth click={(index) => console.log(`Clicked tooth ${index}`)} />
      </div>
      <button className="UploadAnswerButton" onClick={handleClick}>
        Upload Answer
      </button>
    </div>
  );
}
export default UploadAnswer;
