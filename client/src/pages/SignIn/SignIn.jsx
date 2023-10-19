import React, { useState } from 'react'
import { Navbar, FormInput } from "../../components";
import { useNavigate } from 'react-router-dom';

function SignIn({ userData, menuDisplay, setMenuDisplay }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        <div className='app__signin-wrapper'>

            <Navbar
                userData={userData}
                menuDisplay={menuDisplay}
                setMenuDusplay={setMenuDisplay}
            />


            <div className='app_signin_register_form_and_space-wrapper'>
                <div className='app_signin_register_space'>
                    ...
                </div>
                <div className='app_signin_register_form-wrapper'>
                    <form className='app__signin-form'>
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
                        <p className='p__opensans app__signin_form-signIn-text-link' onClick={() => navigate("/register")}>Don't have an account?</p>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignIn
