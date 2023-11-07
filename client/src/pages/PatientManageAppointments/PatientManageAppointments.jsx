import React, { useEffect, useState } from 'react'
import { Availability, Dropdown, PatientAppointment } from '../../components'
import axios from 'axios';

function PatientManageAppointments({ patientData, availabilities, setAvailabilities, getData, appointments, setAppointments, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, specializations, sendEmail}) {
    const [specialization, setSpecialization] = useState("Select Specialization");
    console.log(appointments)

    //a function to check if patient already has an apointment on that day
    function hasAlreadyBooked(availability){

    }
    
    // creating a function to handle booking appointments
    function handleBookAppointment(availability) {
        const appointmentData = {
            patient_id: patientData?.id,
            availability_id: availability?.id,
            status: `Pending` 
        }

        axios.post("/appointments", appointmentData)
            .then(res => {
                setRequestStatus(true);
                setAlertMessage("Appointment request placed successfully!");
                setAlertDisplay("block");
                hideAlert();
                setAppointments([...appointments, res.data])
                handleUpdateAvailabilityStatus(availability, "Pending")

            })
            .catch(error => {
                if (error.response) {
                    setRequestStatus(false);
                    setAlertMessage("Appointment request couldn't be placed!");
                    setAlertDisplay("block");
                    hideAlert();

                }
            })
    }

    //a function to help update the status of the booked availability
    function handleUpdateAvailabilityStatus(availability, status){
        axios.patch(`/availabilities/${availability?.id}`, {status: status})
        .then(res => {
            setRequestStatus(true);
                setAlertMessage("Availability status updated successfully!");
                setAlertDisplay("block");
                hideAlert();
                getData("/availabilities", setAvailabilities);
        })
        .catch(error => {
            if (error.response) {
                setRequestStatus(false);
                setAlertMessage("Availability status not updated!");
                setAlertDisplay("block");
                hideAlert();

            }
        })
    }

    // a function to cancel an appointment
    function handleCancelAppointment(appointment){
        axios.delete(`/appointments/${appointment?.id}`)
        .then(() => {
          setRequestStatus(true);
          setAlertMessage("Appointment cancelled successfully!");
          setAlertDisplay("block");
          hideAlert();

          getData(`/patient-appointments/${patientData?.id}`, setAppointments)
          handleUpdateAvailabilityStatus(appointment?.availability, null)

        })
        .catch(error=>{
          if(error.response){
            setRequestStatus(false);
            setAlertMessage("Something went wrong, please try again!");
            setAlertDisplay("block");
            hideAlert();
          }
        })
    }

    //a function to check if availability date hasn't passed
    function isAvailabilityValid(availability){
        //getting the current date
        const currentDate = new Date();
        const availabilityDate = new Date(availability?.date);
        // checking if currentDate is less than or equal to availabilityDate (Valid)
        const isDateValid = currentDate <= availabilityDate
        // returning the validity status
        return isDateValid

    }


    useEffect(() => {
        //confirming doctor is logged in and multi-authed on every refresh
        appointments.length === 0 && getData(`/patient-appointments/${patientData?.id}`, setAppointments)
    }, [])

    return (
        <div className='app__patient_manage_appointments-wrapper'>
            <h1 className='headtext__cormorant app__patient_manage_appointments_title'>MANAGE APPOINTMENTS</h1>



            <div className='flex__row_center_space app__patient_manage_appointments_viewAvailabilities_and_appointment-wrapper'>

                <div className='app__patient_manage_appointments_view_availabilities-wrapper'>
                    <h1 className='headtext__cormorant app__patient_manage_appointments_availabilities_title'>DOCTOR AVAILABILITIES</h1>


                    <div className='app__patient_manage_appointments_label_and_dropdown-wrapper'>
                        <p className='p__opensans app__patient_manage_appointments_label'>Doctor Specializations</p>
                        <Dropdown
                            items={["Select Specialization", "All Specializations", ...specializations]}
                            buttonText={specialization}
                            clickFunction={(data) => {
                                setSpecialization(data)
                                if (data === "All Specializations" || availabilities.length === 0) {
                                    getData("/availabilities", setAvailabilities)
                                }
                                else {

                                    let filteredData = availabilities?.filter(availability => availability?.doctor?.specialty === data)
                                    setAvailabilities(filteredData)
                                }

                            }}
                        />
                    </div>

                    <table className="app__patient_manage_appointments_table">
                        <thead>
                            <tr className="app__patient_manage_appointments_table_headers-wrapper">
                                <th className="p__opensans app__patient_manage_appointments_table_header">DATE</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">STARTING FROM</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">ENDING AT </th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {availabilities?.map((availability) => (
                                // only display availabilities that don't have bookings and have valid dates
                                availability?.status === null && isAvailabilityValid(availability) &&
                                <Availability
                                    key={availability?.id}
                                    availability={availability}
                                    handleBookAppointment={handleBookAppointment}
                                />
                            ))}
                        </tbody>

                    </table>

                    {availabilities?.length === 0 && <h3 className="p__opensans app__patient_manage_appointments_table_body_no_submissions">No availabilities</h3>}

                </div>



                <div className='app__patient_manage_appointments_view_appointments-wrapper'>
                    <h1 className='headtext__cormorant app__patient_manage_appointments_appointments_title'>MY APPOINTMENTS</h1>

                    <table className="app__patient_manage_appointments_table">
                        <thead>
                            <tr className="app__patient_manage_appointments_table_headers-wrapper">
                                <th className="p__opensans app__patient_manage_appointments_table_header">DATE</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">STARTING</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">ENDING</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">SPECIALIZATION</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">STATUS</th>
                                <th className="p__opensans app__patient_manage_appointments_table_header">ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments?.map((appointment) => (
                                
                                <PatientAppointment
                                    key={appointment?.id}
                                    appointment={appointment}
                                    handleCancelAppointment={handleCancelAppointment}
                                />
                            ))}
                        </tbody>

                    </table>

                    {appointments?.length === 0 && <h3 className="p__opensans app__patient_manage_appointments_table_body_no_submissions">No appointments</h3>}

                </div>

            </div>


        </div>
    )
}

export default PatientManageAppointments
