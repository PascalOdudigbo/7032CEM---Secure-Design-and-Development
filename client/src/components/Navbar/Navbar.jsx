import React from 'react'
import logo from '../../assets/HAB_logo.png';
import logoText from '../../assets/HAB.png';
import { IconContext } from "react-icons";
import { AiFillLock } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaWindowClose } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';


function Navbar({ userData, menuDisplay, setMenuDusplay, isAuthenticated}) {
    const navigate = useNavigate();

    return (
        <div className='app__navbar'>
            <div className='app__navbar_logo-and-details-wrapper'>
                <div className='app__navbar-logo' onClick={() => { navigate("/") }}>
                    <img className='app__navbar-logo-img' src={logo} alt='HAB logo' />
                    <img className='app__navbar-logo-txt' src={logoText} alt='HAB text img' />
                </div>

                <div className='app_navbar_contact_wrapper'>
                    <IconContext.Provider value={{ size: "20px", className: "app_navbar_contact-icon" }}>
                        <MdEmail />
                        <p className='p__opensans app_navbar_contact_text'  >habofficial@medics.co.uk</p>
                    </IconContext.Provider>
                </div>

                <div className='app_navbar_contact_wrapper'>
                    <IconContext.Provider value={{ size: "20px", className: "app_navbar_contact-icon" }}>
                        <MdLocationOn />
                        <p className='p__opensans app_navbar_contact_text'>CV4 5XL, Old Rothman Road, Coventry, United Kingdom</p>
                    </IconContext.Provider>
                </div>

                <div className='app_navbar_contact_wrapper'>
                    <IconContext.Provider value={{ size: "20px", className: "app_navbar_contact-icon" }}>
                        <MdPhone />
                        <p className='p__opensans app_navbar_contact_text'>+44793870248</p>
                    </IconContext.Provider>
                </div>
            </div>

            <div className='app__navbar_links-wrapper'>
                {
                    window.location.href.includes("portal") ? null :
                        <ul className='app__navbar-links'>
                            <li className='p__opensans'><a href='/'>Home</a></li>
                            <li className='p__opensans'><a href='#aboutUs'>About us</a></li>
                        </ul>
                }

                {
                    userData?.id && isAuthenticated?.authenticated && window.location.href.includes("portal") ?
                        <div className='flex__row_center app__navbar-menu' onClick={() => { setMenuDusplay(prevMenuDisplay => !prevMenuDisplay) }}>
                            <IconContext.Provider value={{ size: "30px", className: "app__navbar-menu-icon" }}>
                                {menuDisplay ? <FaWindowClose /> : <GiHamburgerMenu />}
                            </IconContext.Provider>

                        </div>
                        :
                        userData?.id && isAuthenticated?.authenticated ? 
                            <div className='flex__row_center app__navbar-login'>
                                <IconContext.Provider value={{ size: "30px", className: "app__navbar-login-icon" }}>
                                    <BiSolidDashboard />
                                </IconContext.Provider>
                                <a href={userData?.verification_status ? '/patient-portal' : '/doctor-portal'} className='p__opensans'>Dashboard</a>
                            </div>
                            :
                        window.location.href.includes("sign-in") === false &&
                            <div className='flex__row_center app__navbar-login'>
                                <IconContext.Provider value={{ size: "20px", className: "app__navbar-login-icon" }}>
                                    <AiFillLock />
                                </IconContext.Provider>
                                <a href='/patient-sign-in' className='p__opensans'>Sign In</a>
                            </div>
                }
            </div>


        </div>
    )
}

export default Navbar
