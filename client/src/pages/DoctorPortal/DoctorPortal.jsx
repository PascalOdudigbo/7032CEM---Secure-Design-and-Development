import React, { useCallback, useEffect, useState } from 'react'
import { Navbar } from '../../components';
import { Route, Routes } from 'react-router-dom'
import axios from "axios";
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import DoctorManageAvailabilities from '../DoctorManageAvailabilities/DoctorManageAvailabilities';
import DoctorManageAppointments from '../DoctorManageAppointments/DoctorManageAppointments';
import DoctorPatients from '../DoctorPatients/DoctorPatients';
import { DoctorViewPatientRecords } from '..';

function DoctorPortal({ menuDisplay, setMenuDisplay, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, isAuthenticated, doctorData, getData, handleLogout, setDoctorData, setIsAuthenticated, sendEmail }) {
  // creating data manaement state variables 
  const [availabilities, setAvailabilities] = useState([])
  const [appointments, setAppointments] = useState([])
  const [targetAppointment, setTargetAppointment] = useState({})
  const [patients, setPatients] = useState([])
  const [targetPatient, setTargetPatient] = useState({})
  const [targetHealthRecord, setTargetHealthRecord] = useState({})

  useEffect(() => {
    //confirming doctor is logged in and multi-authed on every refresh
    doctorData?.id === undefined && getData("/doctor-loggedin", setDoctorData)
    isAuthenticated?.authenticated === undefined && getData("/doctor-multi-authed", setIsAuthenticated)
    availabilities.length === 0 && getData(`/doctor-availabilities/${doctorData?.id}`, setAvailabilities)
    appointments.length === 0 && getData(`/doctor-appointments/${doctorData?.id}`, setAppointments)
    patients.length === 0 && getData(`/doctor-patients/${doctorData?.id}`, setPatients)

  }, [doctorData])

  //creating the customer dashboard sub component
  function Dashboard() {
    return (
      <div className='app__doctor_portal_dashboard-wrapper'>
        <div className='app__doctor_portal_dashboard-title-wrapper'>
          <h1 className='headtext__cormorant app__doctor_portal_dashboard-title'>DASHBOARD</h1>
        </div>

        <div className=' app__doctor_portal_dashboard-statistic-wrapper'>
          <div className="app__doctor_portal_dashboard-statistic">
            <h3 className="p__opensans app__doctor_portal_dashboard-statistic-title">MY APPOINTMENTS</h3>
            <p className="app__doctor_portal_dashboard-statistic-value">{appointments?.length}</p>
          </div>

          <div className="app__doctor_portal_dashboard-statistic">
            <h3 className="p__opensans app__doctor_portal_dashboard-statistic-title">MY PATIENTS</h3>
            <p className="app__doctor_portal_dashboard-statistic-value">{patients?.length}</p>
          </div>

        </div>

      </div>
    )
  }

  return (
    //restricting access to portal if not logged in
    doctorData?.id && isAuthenticated?.authenticated ?
      <div className='app__doctor_portal'>

        <Navbar
          userData={doctorData?.id && doctorData}
          menuDisplay={menuDisplay}
          setMenuDusplay={setMenuDisplay}
          isAuthenticated={isAuthenticated}
        />

        <div className='app_portal_menu_and_view-wrapper'>
          <div className='app_portal_menu-wrapper' style={{ display: menuDisplay ? "block" : "none" }}>
            <div className="app__portal_user_icon_and_name-wrapper">
              <button className="app__portal_user_icon-btn">{
                <IconContext.Provider value={{ size: '30px', className: "app__portal-user-icon" }}>
                  <FaUserCircle />
                </IconContext.Provider>
              }</button>

              <p className="p__opensans app__portal-user-name">{doctorData?.id && `${doctorData?.first_name.toUpperCase()} ${doctorData?.last_name.toUpperCase()}`}</p>
            </div>

            <div className='app_portal_menu_items-wrapper'>
              <div className='app__navbar-smallscreen_links'>
                <p className='p__opensans'><a href='/'>Home</a></p>
                <p className='p__opensans'><a href='/doctor-portal'>Dashboard</a></p>
                <p className='p__opensans'><a href='/doctor-portal/manage-availabilities'>Manage Availabilities</a></p>
                <p className='p__opensans'><a href='/doctor-portal/manage-appointments'>Manage Appointments</a></p>
                <p className='p__opensans'><a href='/doctor-portal/patients'>Patients</a></p>
                <p className='p__opensans' onClick={() => { handleLogout() }}>Logout</p>
              </div>

            </div>


          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/manage-availabilities" element={
              <DoctorManageAvailabilities
                doctorData={doctorData}
                hideAlert={hideAlert}
                setAlertDisplay={setAlertDisplay}
                setRequestStatus={setRequestStatus}
                setAlertMessage={setAlertMessage}
                getData={getData}
                availabilities={availabilities}
                setAvailabilities={setAvailabilities}
              />
            } />

            <Route path="/manage-appointments/*" element={
              <DoctorManageAppointments
                appointments={appointments}
                setAppointments={setAppointments}
                getData={getData}
                doctorData={doctorData}
                sendEmail={sendEmail}
                hideAlert={hideAlert}
                setAlertDisplay={setAlertDisplay}
                setRequestStatus={setRequestStatus}
                setAlertMessage={setAlertMessage}
                targetAppointment={targetAppointment}
                setTargetAppointment={setTargetAppointment}
              />

            } />


            <Route path="/patients/" element={
              <DoctorPatients
                patients={patients}
                setPatients={setPatients}
                doctorData={doctorData}
                hideAlert={hideAlert}
                setAlertDisplay={setAlertDisplay}
                setRequestStatus={setRequestStatus}
                setAlertMessage={setAlertMessage}
                getData={getData}
                sendEmail={sendEmail}
                setTargetPatient={setTargetPatient}
              />

            } />

            <Route path="/patients/view-health-records/*" element={
              <DoctorViewPatientRecords
                doctorData={doctorData}
                targetPatient={targetPatient}
                setTargetPatient={setTargetPatient}
                targetHealthRecord={targetHealthRecord}
                setTargetHealthRecord={setTargetHealthRecord}
                hideAlert={hideAlert}
                setAlertDisplay={setAlertDisplay}
                setRequestStatus={setRequestStatus}
                setAlertMessage={setAlertMessage}
                getData={getData}
                sendEmail={sendEmail}
                setPatients={setPatients}
              />

            } />
          </Routes>

        </div>




      </div> : <h1 className='flex__column_center '> </h1>
  )
}

export default DoctorPortal
