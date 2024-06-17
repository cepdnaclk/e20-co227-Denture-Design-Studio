import exit from '../Exitbutton/Exitbutton.png'
import './Exitbutton.css'
import {  useNavigate } from 'react-router-dom';
function Exitbutton(params) {
     let navigate= useNavigate();

    return(
<div>
    <button className='exitbutton' onClick={()=>navigate('/')}><img src={exit} alt="" /></button>
</div>

    );
}
export default Exitbutton