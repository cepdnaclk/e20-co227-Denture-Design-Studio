import "./ActualorAssessor.css";
import { HiOutlineX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Teeth from "../../TeethComp/Teeth";
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css";

function ActualorAssessor({ cancel, solve, userdata }) {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState({
    restdata: null,
    missingteeth: null,
    undercuts: null,
    plates: null,
    clasps: null,
    retentiondata: null,
    gingivally: null,
  });
  const [missingteeth, setMissingteeth] = useState(Array(32).fill(false));
  const [genated, setgenarated] = useState(false);
  const autoRef = useRef(null);
  const handleActualcase = () => {
    const toastId = toast.loading("Finding actual Case...");
    axios
      .get("https://e20-co227-denture-design-studio.onrender.com/actualcase/random")
      .then((response) => {
        const data = response.data;
        const imgData = data.ProblemUrl;
        const problemDescription = data.description;
        const supportMaterial = data.supportMaterialUrl;
        const answerImage = data.AnswerUrl;
        console.log(answerImage);
        navigate("/addSaddles", {
          state: {
            userdata,
            imgData,
            isActualCase: true,
            problemDescription,
            supportMaterial,
            answerImage,
          },
        });
      });

    //navigate("/addSaddles", { state: { userdata } });
    solve();
  };

  const handleAutocase = () => {
    setgenarated(true);
    const numberofteeth = Math.floor(Math.random() * 11 + 3);
    const missingteeths = new Set();

    for (let index = 0; index < numberofteeth; index++) {
      missingteeths.add(Math.floor(Math.random() * 16) + 1);
      missingteeths.add(Math.floor(Math.random() * 16) + 17);
    }

    const missingteetharray = Array.from(missingteeths);
    missingteetharray.forEach((element) => {
      missingteeth[element - 1] = true;
    });

    setSelectedData({
      restdata: null,
      missingteeth: missingteeth,
      undercuts: null,
      plates: null,
      clasps: null,
      retentiondata: null,
      gingivally: null,
    });

    console.log(missingteeth);
    setTimeout(() => {
      html2canvas(autoRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          toast.success("Case Generated Successfully!"); // Simplified toast

          navigate("/addSaddles", {
            state: { userdata, imgData, isAutoCase: true },
          });
        })
        .catch((error) => {
          console.error("Canvas error:", error);
          toast.error("Failed to generate case");
        });
    }, 5);
  };

  return (
    <div>
      <div className="ActualorAssessor-overlay"></div>
      <ToastContainer />
      <div className="ActualorAssessor">
        <button className="genarate-btn" onClick={handleAutocase}>
          Genarate a Case
        </button>
        <button className="actual-btn" onClick={handleActualcase}>
          Actual Case
        </button>
        <button className="cancel-btn" onClick={cancel}>
          <HiOutlineX size={"3vw"} color="black" />
        </button>
        <div
          className="TeethBackground-auto"
          ref={autoRef}
          style={{ borderRadius: "1vw", top: "-200vh" }}
        >
          {genated && (
            <Teeth
              selectRest={{ selectrest: true }}
              DentureData={selectedData}
              setData={() => {}}
              value={{ canEdit: false, visible: true }}
              selectPlate={{ view: true }}
              selectRetention={{ selectretention: true }}
              selectClasp={{ view: true }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default ActualorAssessor;
