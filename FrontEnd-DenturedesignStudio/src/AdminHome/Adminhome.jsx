import React from 'react';
import Myaccount from '../myaccount/Myaccount';
import Homecomp from '../homecomp/Homecomp';
import Exitbutton from '../Exitbutton/Exitbutton'
import './Adminhome.css';
import { useNavigate } from 'react-router-dom';


function Adminhome() {
    let username='ravindu';
    let navigate = useNavigate();
    return (
        <div className='homepages'>
        <div className="adminhome">
            <Exitbutton/>
            <Myaccount />
            <div className='adminhomecontent'>
                <h1>Welcome {username}</h1>
                <div id='adminh1'>
                <Homecomp name={'User Account'} click ={()=>navigate('/useraccount')}/>
                </div>
                <div id='adminh2'>
                <Homecomp name={'Content'} click ={()=>navigate('/assessorcontent')} imge={true}/>
                    
                </div>
                <div id='adminh3'>
                <Homecomp name={'Engagement Metrics'} click ={()=>navigate('/engagementmetrix')} imge={false}/>
                </div>
               

                    
                
            </div>
        </div>
        </div>
    );
}

export default Adminhome;