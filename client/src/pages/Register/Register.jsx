import React, { useState } from 'react'
import { Navbar, FormInput } from "../../components";


function Register({ userData, menuDisplay, setMenuDisplay }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

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
                    <form className='app__signup-form'>
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

                        <button className='custom__button app__signup_form-button'>Submit</button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
