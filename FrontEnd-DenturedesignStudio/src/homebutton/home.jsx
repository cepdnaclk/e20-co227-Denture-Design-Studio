import home from "E:/e20-co225-Denture-Design-Studio/FrontEnd-DenturedesignStudio/src/homebutton/home.png";
import "./home.css";

function Home({ onclick }) {
    return (
        <div>
            <button className="homebutton" onClick={onclick}>
                <img src={home} alt="Home button" />
            </button>
        </div>
    );
}

export default Home;