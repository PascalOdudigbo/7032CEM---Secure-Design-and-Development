import React, { useEffect } from "react";
import { DoctorAppointment } from "../../components";
import axios from "axios";


function DoctorManageAppointments({
    appointments,
    setAppointments,
    getData,
    doctorData,
    sendEmail, setRequestStatus, setAlertMessage, setAlertDisplay, hideAlert,
}) {
    console.log(appointments)

    //a function to help update the status of the booked availability
    function handleUpdateAppointmentStatus(appointment, status) {
        axios.patch(`/appointments/${appointment?.id}`, { status: status })
            .then(res => {
                setRequestStatus(true);
                setAlertMessage(`Appointment ${status} successfully!`);
                setAlertDisplay("block");
                hideAlert();
                getData(`/doctor-appointments/${doctorData?.id}`, setAppointments)

                const emailValues = {
                    email_title: "HAB Appointment Request Information",
                    image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
                    user_name: `${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`,
                    email_body: `Your appointment rewuest for (${appointment?.availability?.date}) from ${appointment?.availability?.start_time} to ${appointment?.availability?.end_time} has been ${status} by the ${appointment?.doctor?.specialty}.`,
                    email_to: appointment?.patient?.email
                };

                sendEmail(emailValues, "Patient has been notified of decision!", () => { });
            })
            .catch(error => {
                if (error.response) {
                    setRequestStatus(false);
                    setAlertMessage("Appointment status update failed!");
                    setAlertDisplay("block");
                    hideAlert();

                }
            })
    }

    useEffect(() => {
        appointments.length === 0 && getData(`/doctor-appointments/${doctorData?.id}`, setAppointments)
    }, [appointments, getData, setAppointments, doctorData])


    return (
        <div className="app__doctor_manage_appointments-wrapper">
            <div className="app__doctor_manage_appointments_title_and_add_button-wrapper">
                <h1 className="headtext__cormorant app__doctor_manage_appointments_page_title">APPOINTMENTS</h1>
            </div>

            <table className="app__doctor_manage_appointments_table">
                <thead>
                    <tr className="app__doctor_manage_appointments_table_headers-wrapper">
                        <th className="p__opensans app__doctor_manage_appointments_table_header">PATIENT</th>
                        <th className="p__opensans app__doctor_manage_appointments_table_header">DATE</th>
                        <th className="p__opensans app__doctor_manage_appointments_table_header">STARTING</th>
                        <th className="p__opensans app__doctor_manage_appointments_table_header">ENDING</th>
                        <th className="p__opensans app__doctor_manage_appointments_table_header">STATUS</th>
                        <th className="p__opensans app__doctor_manage_appointments_table_header">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {appointments?.map((appointment) => (
                        <DoctorAppointment
                            key={appointment?.id}
                            appointment={appointment}
                            appointments={appointments}
                            setAppointments={setAppointments}
                            handleUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorManageAppointments;
