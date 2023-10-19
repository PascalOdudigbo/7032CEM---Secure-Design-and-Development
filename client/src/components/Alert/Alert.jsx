import React from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';


function Alert({requestStatus, alertMessage, display="block"}){
    return(
        <div className="app__alert-wrapper" style={{backgroundColor: requestStatus ? "#058789" : "#B71C1C", display: display}}>
            <div className="app__alert-icon-and-message-wrapper">
                {requestStatus ? <div className="app__alert-icon"><BsFillCheckCircleFill/></div> : <div className="alertIcon"><MdError/></div>}
                <p className="p__opensans app__alert-message">{alertMessage}</p>
            </div>
        </div>
    );
}
export default Alert;