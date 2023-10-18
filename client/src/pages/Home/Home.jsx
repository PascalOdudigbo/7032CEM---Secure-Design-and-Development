import React, { useState } from 'react'
import { Navbar, FormInput } from "../../components";


function Home({ userData, menuDisplay, setMenuDisplay }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  return (
    <div className='app__home-wrapper'>
      <Navbar
        userData={userData}
        menuDisplay={menuDisplay}
        setMenuDusplay={setMenuDisplay}
      />

      <div className='app__home-image-and-text-wrapper'>
        <div className='app__home-flexible-spacing'>
        </div>

        <div className='app__home-image-text-and-btn-wrapper'>
          <h3 className='p__cormorant app__home-image-text-title'>The Most Valuable Thing is Your Health</h3>
          <p className='p__opensans app__home-image-text-body'>Here at HAB, we specialize in providing online healthcare appointment booking servces to patients in need. </p>
          <button className='custom__button'>Book Appointment</button>
        </div>
      </div>

      {/* <div className='app_home_register_form-wrapper'>
        <form className='app__home-form'>
          <h3 className='headtext__cormorant app__home_form-headtext'>Register</h3>

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

          <button className='custom__button app__home_form-button'>Submit</button>

        </form>
      </div> */}

    </div>
  )
}

export default Home
