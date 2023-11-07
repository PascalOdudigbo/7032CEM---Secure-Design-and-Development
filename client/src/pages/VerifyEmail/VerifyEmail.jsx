import React from 'react';
import { Navbar } from "../../components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function VerifyEmail({ hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, setPatientData }) {
    const navigate = useNavigate()

    function handleVerifyEmail(e) {
        e.preventDefault()
        const currentLink = window.location.href;
        currentLink.split("/");

        const patientData = {
            verification_status: true
        }
        
        axios.patch(`/patients/${currentLink[currentLink.length - 1]}`, patientData)
            .then(res => {
                setRequestStatus(true);
                setAlertDisplay("block");
                setPatientData(res.data)
                setAlertMessage("Confirmation sucessful!");
                hideAlert();
                setTimeout(() => navigate("/patient-sign-in"), 2000);

            })
            .catch(error => {
                if (error.response) {
                    setRequestStatus(false);
                    setAlertDisplay("block");
                    setAlertMessage(`Something went wrong!`);
                    hideAlert();
                }
            })

    }

    return (
        <div className='app__verify_email-wrapper'>

            <Navbar />


            <div className='app_verify_email_register_form_and_space-wrapper'>
                <div className='app_verify_email_register_form-wrapper'>
                    <form className='app__verify_email-form' onSubmit={(e) => { handleVerifyEmail(e) }}>
                        <h3 className='headtext__cormorant app__verify_email_form-headtext'>Verify Email</h3>

                        <p className='p__opensans app__verify_email_form-verify_email-info-text'>Click on the button below to verify your email.</p>

                        <button className='custom__button app__verify_email_form-button'>Confirm</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default VerifyEmail
