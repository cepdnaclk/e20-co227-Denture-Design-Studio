import React from 'react';
import Myaccount from '../myaccount/Myaccount';
import Homecomp from '../homecomp/Homecomp';
import Exitbutton from '../Exitbutton/Exitbutton'
import './Studenthome.css';
import { useNavigate } from 'react-router-dom';


function Studenthome() {
    let username='ravindu';
    let navigate = useNavigate();
    return (
        <div className="studenthome">
            <Exitbutton/>
            <Myaccount />
            <div className='stdhomecontent'>
                <h1>Welcome {username}</h1>
                <div id='studenth1'>
                <Homecomp name={'Create a Patient Case'} click ={()=>navigate('/createuploadpatient')}/>
                </div>
                <div id='studenth2'>
                <Homecomp name={'Solve a Patient Case'} click ={()=>navigate('/addSaddles')}/>
                </div>
                <div id='studenth3'>
                <Homecomp name={'Content'} click ={()=>navigate('/content')}/>
                </div>
                <div id='studenth4'>
                <Homecomp name={'View Your Progress'} click ={()=>navigate('/Viewprogress')}/>
                </div>

                    
                
            </div>
        </div>
    );
}

export default Studenthome;
