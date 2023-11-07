import React from 'react'

function DoctorAvailability({ availability, handleBookAppointment }) {
    return (
        <tr className="app__availability_data_row">

            <td className="app__availability_data_cell">{availability?.date}</td>
            <td className="app__availability_data_cell">{availability?.start_time}</td>
            <td className="app__availability_data_cell">{availability?.end_time}</td>
            <td className="app__availability_data_cell">
                <button className="custom__button app__availability_dropdown_item_delete_btn" onClick={() => { handleBookAppointment(availability) }}>Book</button>
            </td>
        </tr>
    )
}

export default DoctorAvailability
