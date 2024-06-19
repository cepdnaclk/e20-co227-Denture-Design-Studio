import backComp from "./backComp.png"
import "./backComp.css"
function BackComp({onClick}){
    return(
        <button  className="backComp" onClick={onClick}>
            <img src={backComp} alt="back" />
        </button>
        
    )
}
export default BackComp