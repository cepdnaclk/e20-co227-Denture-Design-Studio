import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPatientCases.css';

function UploadPatientCases() {
  let navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Salsa&display=swap" />
      <div className="UploadPatientCases">
        <div>
          <h2 className='text1'>Create and Upload a Patient Case</h2>
          <h1 className='text2'>step 1 : Select missing teeth
            step 2 : Click Create & Upload!</h1>
        </div>
        <div>
          <button className='CreateAndUpload' onClick={()=>handleClick('/CreateAndUpload')}>Create & Upload</button>
        </div>
      </div>
    </>
  );
}

export default UploadPatientCases;