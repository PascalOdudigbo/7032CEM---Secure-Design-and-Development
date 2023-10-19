import React, { useState } from 'react'
import { Navbar, FormInput } from "../../components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import emailjs from "@emailjs/browser";


function Register({userData, menuDisplay, setMenuDisplay, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, patientData, setPatientData }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const navigate = useNavigate("")

    //emailJs variables
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID_1;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    //deployed URL, local for now
    const deployedURL = "http://localhost:4000"

    //creating a function to send verification email
    function sendEmail(emailValues, alertMessage) {

        emailjs.send(serviceID, templateID, emailValues, publicKey).then(
            () => {
                console.log("got here")
                console.log(emailValues)
                setRequestStatus(true);
                setAlertMessage(alertMessage);
                setAlertDisplay("block");
                hideAlert();
                setTimeout(() => navigate("/patient-sign-in"), 4000);
            },
            (err) => {
                setRequestStatus(false);
                console.log("failed")
                console.log(err)
                setAlertMessage(JSON.stringify(err));
                setAlertDisplay("block");
                hideAlert();
            }
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        window.scrollTo(0, 0);

        if (password !== passwordConfirmation) {
            setAlertDisplay("block");
            setRequestStatus(false);
            setAlertMessage("Password and Confirm Password don't match !");
            hideAlert();

        } else {

            const postData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                verification_status: false,
            };

            axios
                .post(`/patients`, postData)
                .then((res) => {
                    setRequestStatus(true);
                    setPatientData(res.data);
                    setAlertMessage("Signup successful!");
                    setAlertDisplay("block");
                    hideAlert();

                    const emailValues = {
                        email_title: "HAB Verify Email",
                        image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
                        user_name: `${firstName} ${lastName}`,
                        email_body: `Welcom to HAB medics, we're glad to have you onboard. Please verify your email address by clicking on the link below`,
                        button_text: "Verify Email",
                        button_color: "#E03F3E",
                        email_to: email,
                        button_link: `${deployedURL}/confirm-email/${res.data.id}`,
                    };

                    sendEmail(emailValues, "Email verification link sent!");

                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error)
                        setRequestStatus(false);
                        error.response.data.error
                            ? setAlertMessage(error.response.data.error)
                            : setAlertMessage("SignUp unsuccessful, please try again !");
                        setAlertDisplay("block");
                        hideAlert();
                    }
                });
        }
    }

    return (
        <div className='app__signup-wrapper'>
            <Navbar
                userData={userData}
                menuDisplay={menuDisplay}
                setMenuDusplay={setMenuDisplay}
            />


            <div className='app_signup_register_form_and_space-wrapper'>
                <div className='app_signup_register_space'>
                    ...
                </div>
                <div className='app_signup_register_form-wrapper'>
                    <form className='app__signup-form' onSubmit={(e) => handleSubmit(e)}>
                        <h3 className='headtext__cormorant app__signup_form-headtext'>Register</h3>

                        <FormInput
                            inputLabel={"First name"}
                            type={"text"}
                            value={firstName}
                            placeholder={"John"}
                            required={true}
                            onChangeFunction={(e) => { setFirstName(e.target.value) }}
                        />

                        <FormInput
                            inputLabel={"Last name"}
                            type={"text"}
                            value={lastName}
                            placeholder={"Doe"}
                            required={true}
                            onChangeFunction={(e) => { setLastName(e.target.value) }}
                        />

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

                        <FormInput
                            inputLabel={"Password confirmation"}
                            type={"password"}
                            value={passwordConfirmation}
                            placeholder={"********"}
                            required={true}
                            onChangeFunction={(e) => { setPasswordConfirmation(e.target.value) }}
                        />

                        <p className='p__opensans app__signup_form-signIn-text-link' onClick={() => navigate("/patient-sign-in")}>Already have an account?</p>

                        <button className='custom__button app__signup_form-button'>Submit</button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
