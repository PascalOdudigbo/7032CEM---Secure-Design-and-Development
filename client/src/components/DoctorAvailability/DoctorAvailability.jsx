import React from 'react'

function DoctorAvailability({ availability, handleDeleteAvailability }) {
    return (
        <tr className="app__doctor_manage_availability_data_row">

            <td className="app__doctor_manage_availability_data_cell">{availability?.date}</td>
            <td className="app__doctor_manage_availability_data_cell">{availability?.start_time}</td>
            <td className="app__doctor_manage_availability_data_cell">{availability?.end_time}</td>
            <td className="app__doctor_manage_availability_data_cell">
                <button className="custom__button app__doctor_manage_availability_dropdown_item_delete_btn" onClick={() => { handleDeleteAvailability(availability) }}>Delete</button>
            </td>
        </tr>
    )
}

export default DoctorAvailability
