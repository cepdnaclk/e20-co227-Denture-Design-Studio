import back from "../backbutton/back.png"
import "./Back.css"
function Back({onclick}){
    return(
        <div>
        <button  className="backbutton" onClick={onclick}><img src={back} alt="my img" /></button>
        
        </div>
    )
}
export default Back