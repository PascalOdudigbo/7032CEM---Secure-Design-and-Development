import React, { useState } from 'react'
import { Navbar} from "../../components";
import { useNavigate } from 'react-router-dom';


function Home({ userData, menuDisplay, setMenuDisplay, isAuthenticated}) {
  const navigate = useNavigate();
  return (
    <div className='app__home-wrapper'>
      <Navbar
        userData={userData}
        menuDisplay={menuDisplay}
        setMenuDusplay={setMenuDisplay}
        isAuthenticated={isAuthenticated}
      />

      <div className='app__home-image-and-text-wrapper'>
        <div className='app__home-flexible-spacing'>
        </div>

        <div className='app__home-image-text-and-btn-wrapper'>
          <h3 className='p__cormorant app__home-image-text-title'>The Most Valuable Thing is Your Health</h3>
          <p className='p__opensans app__home-image-text-body'>Here at HAB, we specialize in providing online healthcare appointment booking servces to patients in need. </p>
          <button className='custom__button' onClick={() => navigate("/register")}>Book Appointment</button>
        </div>
      </div>

    </div>
  )
}

export default Home
