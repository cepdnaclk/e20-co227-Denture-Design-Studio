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
      <div className="UploadPatientCases">
        <div>
          <h2 className='CreateAPatientCase'>Create and Upload a Patient Case</h2>
          <h1 className='steps'>
            step 1 : Select missing teeth<br />
            step 2 : Click Create & Upload!
          </h1>
        </div>
        <div>
          <button className='button' onClick={() => handleClick('/CreateAndUpload')}>Create & Upload</button>
        </div>
      </div>
    </>
  );
}

export default UploadPatientCases;
