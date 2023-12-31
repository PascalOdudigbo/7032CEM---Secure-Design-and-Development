import React, {useEffect, useState } from 'react'
import { Navbar } from '../../components';
import { Route, Routes, useNavigate } from 'react-router-dom'
// import axios from "axios";
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import PatientManageAppointments from '../PatientManageAppointments/PatientManageAppointments';
import PatientConsentRequests from '../PatientConsentRequests/PatientConsentRequests';
import PatientViewHealthRecords from '../PatientViewHealthRecords/PatientViewHealthRecords';

function PatientPortal({ menuDisplay, setMenuDisplay, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, isAuthenticated, setIsAuthenticated, patientData, setPatientData, getData, sendEmail, handleLogout }) {
    const [specializations, setSpecializations] = useState([])
    const [availabilities, setAvailabilities] = useState([])
    const [appointments, setAppointments] = useState([])
    const [consentRequests, setConsentRequests] = useState([])

    // creating a navigation variable function
    const navigate = useNavigate();

    useEffect(() => {
        //confirming doctor is logged in and multi-authed on every refresh
        patientData?.id === undefined && getData("/patient-loggedin", setPatientData)
        isAuthenticated?.authenticated === undefined && getData("/patient-multi-authed", setIsAuthenticated)
        specializations.length === 0 && getData("/doctors-specialties", setSpecializations);
        availabilities.length === 0 && getData("/availabilities", setAvailabilities);
        appointments.length === 0 && getData(`/patient-appointments/${patientData?.id}`, setAppointments)
        consentRequests.length === 0 && getData(`/a_patient_consents/${patientData?.id}`, setConsentRequests)
    }, [patientData])

    //creating the customer dashboard sub component
    function Dashboard() {
        return (
            <div className='app__patient_portal_dashboard-wrapper'>
                <div className='app__patient_portal_dashboard-title-wrapper'>
                    <h1 className='headtext__cormorant app__patient_portal_dashboard-title'>DASHBOARD</h1>

                </div>

                <div className=' app__patient_portal_dashboard-statistic-wrapper'>
                    <div className="app__patient_portal_dashboard-statistic">
                        <h3 className="p__opensans app__patient_portal_dashboard-statistic-title">MY APPOINTMENTS</h3>
                        <p className="app__patient_portal_dashboard-statistic-value">{appointments?.length}</p>
                    </div>

                    <div className="app__patient_portal_dashboard-statistic">
                        <h3 className="p__opensans app__patient_portal_dashboard-statistic-title">MEDICAL RECORDS</h3>
                        <p className="app__patient_portal_dashboard-statistic-value">{patientData?.health_records?.length}</p>
                    </div>

                    <div className="app__patient_portal_dashboard-statistic">
                        <h3 className="p__opensans app__patient_portal_dashboard-statistic-title">MODIFICATION REQUESTS</h3>
                        <p className="app__patient_portal_dashboard-statistic-value">{consentRequests?.length}</p>
                    </div>

                    <div className="app__patient_portal_dashboard-statistic">
                        <h3 className="p__opensans app__patient_portal_dashboard-statistic-title">MY DOCTORS</h3>
                        <p className="app__patient_portal_dashboard-statistic-value">{patientData?.doctors?.length}</p>
                    </div>

                </div>



            </div>
        )
    }

    return (
        //restricting access to portal if not logged in
        patientData?.verification_status && isAuthenticated?.authenticated ?
            <div className='app__patient_portal'>

                <Navbar
                    userData={patientData?.verification_status && patientData}
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

                            <p className="p__opensans app__portal-user-name">{patientData?.id && `${patientData?.first_name.toUpperCase()} ${patientData?.last_name.toUpperCase()}`}</p>
                        </div>

                        <div className='app_portal_menu_items-wrapper'>
                            <div className='app__navbar-smallscreen_links'>
                                <p className='p__opensans'><p onClick={() => navigate("/")}>Home</p></p>
                                <p className='p__opensans'><p  onClick={() => navigate("/patient-portal")}>Dashboard</p></p>
                                <p className='p__opensans'><p  onClick={() => navigate("/patient-portal/appointments")}>Appointments</p></p>
                                <p className='p__opensans'><p  onClick={() => navigate("/patient-portal/health-records")}>Health Records</p></p>
                                <p className='p__opensans'><p  onClick={() => navigate("/patient-portal/consent-requests")}>Records Access Requests</p></p>
                                <p className='p__opensans' onClick={() => { handleLogout() }}>Logout</p>
                            </div>

                        </div>


                    </div>

                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        
                        <Route path="/appointments" element={
                            <PatientManageAppointments
                                patientData={patientData}
                                availabilities={availabilities}
                                setAvailabilities={setAvailabilities}
                                getData={getData}
                                hideAlert={hideAlert}
                                setAlertDisplay={setAlertDisplay}
                                setRequestStatus={setRequestStatus}
                                setAlertMessage={setAlertMessage}
                                appointments={appointments}
                                setAppointments={setAppointments}
                                specializations={specializations}
                                sendEmail={sendEmail}
                            />
                        } />

                        <Route path="/consent-requests" element={
                            <PatientConsentRequests
                                consentRequests={consentRequests}
                                setConsentRequests={setConsentRequests}
                                getData={getData}
                                patientData={patientData}
                                sendEmail={sendEmail}
                                hideAlert={hideAlert}
                                setAlertDisplay={setAlertDisplay}
                                setRequestStatus={setRequestStatus}
                                setAlertMessage={setAlertMessage}
                            />
                        } />

                        <Route path="/health-records" element={
                            <PatientViewHealthRecords
                                patientData={patientData}
                            />
                        } />
                    </Routes>
                </div>

            </div> : <h1 className='flex__column_center '> </h1>
    )
}

export default PatientPortal
