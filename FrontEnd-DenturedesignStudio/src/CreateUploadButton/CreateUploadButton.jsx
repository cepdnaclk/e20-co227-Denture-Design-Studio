import { useNavigate } from "react-router-dom";
import "./CreateUploadButton.css";

function CreateUploadButton({ Name, Pagetogo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(Pagetogo);
  };

  return (
    <div>
      <button className="Create" onClick={handleClick}>
        {Name}
      </button>
    </div>
  );
}

export default CreateUploadButton;
