import React, { useEffect, useState } from 'react';
import { Navbar, FormInput } from "../../components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UserAuth({menuDisplay, setMenuDisplay, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, patientData, setPatientData, doctorData, setDoctorData, encryptedCode, setEncryptedCode, getData, isAuthenticated, setIsAuthenticated, sendEmail}) {
    const [authCode, setAuthCode] = useState("")
    const navigate = useNavigate()

    //encryption key
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

    //importing cryptoJs to encrypy multi-auth random key
    const CryptoJS = require("crypto-js");

    // creating a function to generate random 4 digit numbers
    function getRandomPin(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //creating boolean variables to confirm if a doctor or a patient are trying to login
    const isPatient = window.location.href.includes("patient")
    const isDoctor = window.location.href.includes("doctor")

    isPatient ? patientData?.verification_status && isAuthenticated?.authenticated && setTimeout(() => navigate("/patient-portal"), 100) :
    isDoctor ? doctorData?.id && isAuthenticated?.authenticated && setTimeout(() => navigate("/doctor-portal"), 100) : console.log("");



    useEffect(() => {
        isPatient ? getData("/patient-loggedin", setPatientData) : getData("/doctor-loggedin", setDoctorData)
        isPatient? getData("/patient-multi-authed", setIsAuthenticated) : getData("/doctor-multi-authed", setIsAuthenticated)
    }, [getData, isPatient, setDoctorData, setIsAuthenticated, setPatientData])

    function handleVerifyCode(e) {
        e.preventDefault()

        if (CryptoJS.AES.decrypt(encryptedCode, encryptionKey).toString(CryptoJS.enc.Utf8) === authCode.toString()) {
            axios.patch(isPatient ? "/change-patient-multi-auth" : "/change-doctor-multi-auth", { auth_status: true })
                .then(response => {
                    setRequestStatus(true);
                    setAlertMessage("Authentication Successful!");
                    setAlertDisplay("block");
                    setIsAuthenticated(response.data)
                    isPatient ? setTimeout(() => navigate("/patient-portal"), 4000) : setTimeout(() => navigate("/doctor-portal"), 4000)
                    hideAlert();

                })
                .catch(error => {
                    //if authentication failed
                    console.log(error)
                    if (error.response) {
                        setAlertMessage(error.response.data.error);
                        setRequestStatus(false);
                        setAlertDisplay("block");
                        hideAlert();
                    }
                })
        }
        else {
            setAlertMessage("False input, access denied!");
            setRequestStatus(false);
            setAlertDisplay("block");
            hideAlert();
        }

    }

    function handleSendCodeAgain() {
        const authCode = getRandomPin(1000, 9999);
        setEncryptedCode(CryptoJS.AES.encrypt(authCode.toString(), encryptionKey))

        const emailValues = {
            email_title: "HAB Multifactor Authentication",
            image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
            user_name: isPatient ? `${patientData?.first_name} ${patientData?.last_name}` : `${doctorData?.first_name} ${doctorData?.last_name}`,
            email_body: `Your multifactor authentication code: ${authCode}`,
            email_to: isPatient ? patientData?.email : doctorData?.email,
        };

        sendEmail(emailValues, "Multifactor authentication code Sent!", ()=>{});
    }

    return (
        <div className='app__user_auth-wrapper'>

            <Navbar
                userData={patientData?.verification_status ? patientData : doctorData}
                menuDisplay={menuDisplay}
                setMenuDusplay={setMenuDisplay}
            />


            <div className='app_user_auth_register_form_and_space-wrapper'>
                <div className='app_user_auth_register_form-wrapper'>
                    <form className='app__user_auth-form' onSubmit={(e) => {handleVerifyCode(e) }}>
                        <h3 className='headtext__cormorant app__user_auth_form-headtext'>Authenticate</h3>
                        <p className='p__opensans app__user_auth_form-user_auth-info-text'>Do not refresh page, if refreshed send code again!</p>

                        <FormInput
                            inputLabel={"Authentication code"}
                            type={"text"}
                            value={authCode}
                            placeholder={"0000"}
                            required={true}
                            onChangeFunction={(e) => { setAuthCode(e.target.value) }}
                        />

                        <p className='p__opensans app__user_auth_form-user_auth-text-link' onClick={() => handleSendCodeAgain()}>send code again?</p>

                        <button className='custom__button app__user_auth_form-button'>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default UserAuth
