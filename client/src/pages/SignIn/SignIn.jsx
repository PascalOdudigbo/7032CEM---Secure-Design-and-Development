import React, { useState } from 'react';
import { Navbar, FormInput } from "../../components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function SignIn({ menuDisplay, setMenuDisplay, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, patientData, setPatientData, doctorData, setDoctorData, setEncryptedCode, sendEmail, isAuthenticated }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //creating boolean variables to confirm if a doctor or a patient are trying to login
    const isPatient = window.location.href.includes("patient")
    const isDoctor = window.location.href.includes("doctor")

    isPatient ? patientData?.verification_status && isAuthenticated?.authenticated && setTimeout(() => navigate("/patient-portal"), 100) :
        isDoctor ? doctorData?.id && isAuthenticated?.authenticated && setTimeout(() => navigate("/doctor-portal"), 100) : console.log("");


    //encryption key
    const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

    //importing cryptoJs to encrypy multi-auth random key
    const CryptoJS = require("crypto-js");

    // creating a function to generate random 4 digit numbers
    function getRandomPin(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function handleLogin(e) {
        e.preventDefault();
        axios.post(isPatient ? "/patient-login" : "/doctor-login", {
            email: email,
            password: password
        })
            .then(response => {
                //if login successful
                isPatient ? setPatientData(response.data) : setDoctorData(response.data);
                setRequestStatus(true);
                setAlertMessage("Login Successful!");
                setAlertDisplay("block");
                hideAlert();
                //if user is a patient
                if (isPatient) {
                    //if user email hasn't been verified
                    if (response.data.verification_status === false) {
                        setRequestStatus(false);
                        setAlertMessage("Please verify your email address!");
                        setAlertDisplay("block");
                        hideAlert();
                    }
                    else {
                        //if user email has been verified send email
                        const authCode = getRandomPin(1000, 9999);
                        setEncryptedCode(CryptoJS.AES.encrypt(authCode.toString(), encryptionKey))

                        const emailValues = {
                            email_title: "HAB Multifactor Authentication",
                            image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
                            user_name: `${response?.data?.first_name} ${response?.data?.last_name}`,
                            email_body: `Your multifactor authentication code: ${authCode}`,
                            email_to: response?.data?.email,
                        };

                        sendEmail(emailValues, "Multifactor authentication code Sent!", () => { setTimeout(() => navigate("/patient-multi-auth"), 1500) });
                    }
                }
                else {
                    const authCode = getRandomPin(1000, 9999);
                    setEncryptedCode(CryptoJS.AES.encrypt(authCode.toString(), encryptionKey))

                    const emailValues = {
                        email_title: "HAB Multifactor Authentication",
                        image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
                        user_name: `${response?.data?.first_name} ${response?.data?.last_name}`,
                        email_body: `Your multifactor authentication code: ${authCode}`,
                        email_to: response?.data?.email,
                    };

                    sendEmail(emailValues, "Multifactor authentication code Sent!", () => { setTimeout(() => navigate("/doctor-multi-auth"), 1500) });

                }
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

    return (
        <div className='app__signin-wrapper'>

            <Navbar
                userData={patientData?.verification_status ? patientData : doctorData}
                menuDisplay={menuDisplay}
                setMenuDusplay={setMenuDisplay}
                isAuthenticated={isAuthenticated}
            />


            <div className='app_signin_register_form_and_space-wrapper'>
                <div className='app_signin_register_space'>

                </div>
                <div className='app_signin_register_form-wrapper'>
                    <form className='app__signin-form' onSubmit={(e) => { handleLogin(e) }}>
                        <h3 className='headtext__cormorant app__signin_form-headtext'>Sign In</h3>

                        <FormInput
                            inputLabel={"Email"}
                            type={"email"}
                            value={email}
                            placeholder={"johndoe@gmail.com"}
                            required={true}
                            onChangeFunction={(e) => { setEmail(e.target.value) }}
                        />

                        <FormInput
                            inputLabel={"Password"}
                            type={"password"}
                            value={password}
                            placeholder={"********"}
                            required={true}
                            onChangeFunction={(e) => { setPassword(e.target.value) }}
                        />


                        <p className='p__opensans app__signin_form-signIn-text-link' onClick={() => navigate("/forgot-password")}>forgot password?</p>

                        <button className='custom__button app__signin_form-button'>Submit</button>
                        {
                            isPatient && <p className='p__opensans app__signin_form-signIn-text-link' onClick={() => navigate("/register")}>Don't have an account?</p>
                        }
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignIn
