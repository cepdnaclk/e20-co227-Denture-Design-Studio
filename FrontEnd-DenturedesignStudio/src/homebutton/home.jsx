import home from "E:/e20-co225-Denture-Design-Studio/FrontEnd-DenturedesignStudio/src/homebutton/home.png"
import "./home.css"
function Home({onClick}){
    return(
        <button className="homebutton" onClick={onClick}>
            <img src={home} alt="Home" />
        </button>
    )
}
export default Home
