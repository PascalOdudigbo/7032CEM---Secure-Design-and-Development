import React from 'react'

function PatientAppointment({ appointment, handleCancelAppointment }) {
    return (
        <tr className="app__patient_appointment_data_row">

            <td className="app__patient_appointment_data_cell">{appointment?.availability?.date}</td>
            <td className="app__patient_appointment_data_cell">{appointment?.availability?.start_time}</td>
            <td className="app__patient_appointment_data_cell">{appointment?.availability?.end_time}</td>
            <td className="app__patient_appointment_data_cell">{appointment?.doctor?.specialty}</td>
            <td className="app__patient_appointment_data_cell">{appointment?.status}</td>
            <td className="app__patient_appointment_data_cell">
                {
                    appointment?.status !== "Rejected" &&
                    <button className="custom__button app__patient_appointment_dropdown_item_delete_btn" onClick={() => { handleCancelAppointment(appointment) }}>Cancel</button>
                }
            </td>
        </tr>
    )
}

export default PatientAppointment
