import './Homecomp.css'
import edit from './edit.png'
function Homecomp({name,click,imge}) {
    return (
        <div>
            <button className="homecompbtn" onClick={click}>{name}{imge?<><img src={edit} alt="" /></>:''}</button>
        </div>
    );
}
export default Homecomp