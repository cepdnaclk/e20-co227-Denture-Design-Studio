import "./Viewcontent.css";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../backbutton/Back";

function Viewcontent() {
  const location = useLocation();
  const navigate = useNavigate();
  const material = location.state?.material;
  const roles = location.state?.roles;
  const role = location.state?.role;
  const video = material.videoUrl;
  console.log(material);
  return (
    <div className="viewcontent">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Salsa&display=swap"
      />

      <div>
        <h1 className="lecture-title">{material.title}</h1>
        <Back onclick={() => navigate(roles, { state: { role } })} />
        <video className="lecture-video" src={video} controls></video>
        <div className="lecture-note-container">
          <p className="lecture-note">{material.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Viewcontent;
