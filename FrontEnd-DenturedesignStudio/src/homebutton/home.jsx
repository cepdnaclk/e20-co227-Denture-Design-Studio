import home from "./home.png"
import "./home.css"
function Home({onClick}){
    return(
        <button className="homebutton" onClick={onClick}>
            <img src={home} alt="Home" />
        </button>
    )
}
export default Home
