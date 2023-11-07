import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function DoctorAppointment({appointment, handleUpdateAppointmentStatus}) {
    const [dropdownDisplay, setDropdownDisplay] = useState("none");
    const navigate = useNavigate();

    

    return (
        <tr className="app__doctor_appointment_data_row">

            <td className="app__doctor_appointment_data_cell">{`${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`}</td>
            <td className="app__doctor_appointment_data_cell">{appointment?.availability?.date}</td>
            <td className="app__doctor_appointment_data_cell">{appointment?.availability?.start_time}</td>
            <td className="app__doctor_appointment_data_cell">{appointment?.availability?.end_time}</td>
            <td className="app__doctor_appointment_data_cell">{appointment?.status}</td>

            <td className="app__doctor_appointment_data_cell">
                {
                    // submission?.publication_decision?.id === undefined &&
                    <div className="dropdown">
                        <IconContext.Provider value={{ size: '20px', className: "app__doctor_appointment_dropdown_icon" }}>
                            <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                        </IconContext.Provider>
                        <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                            <button className='app__doctor_appointment_dropdown_item' onClick={() => {
                               handleUpdateAppointmentStatus(appointment, "Accepted")
                            }}>Accept</button>
                            <button className="app__doctor_appointment_dropdown_item_delete_btn" onClick={() => { handleUpdateAppointmentStatus(appointment, "Rejected") }}>Reject</button>
                        </div>
                    </div>
                }
            </td>
        </tr>

    );


}
export default DoctorAppointment;