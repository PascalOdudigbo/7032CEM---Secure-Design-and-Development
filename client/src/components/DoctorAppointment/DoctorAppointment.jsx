import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from "react-router-dom";


function DoctorAppointment({ appointment, handleUpdateAppointmentStatus, setTargetAppointment }) {
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
                    appointment?.status !== "Completed" &&
                    <div className="dropdown">
                        <IconContext.Provider value={{ size: '20px', className: "app__doctor_appointment_dropdown_icon" }}>
                            <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                        </IconContext.Provider>
                        <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                            <button className='app__doctor_appointment_dropdown_item' onClick={() => {
                                handleUpdateAppointmentStatus(appointment, "Accepted")
                            }}>Accept</button>
                            <button className="app__doctor_appointment_dropdown_item_delete_btn" onClick={() => {
                                handleUpdateAppointmentStatus(appointment, "Rejected")
                            }}>Reject</button>

                            {
                                appointment?.status === "Accepted" &&
                                <button className="app__doctor_appointment_dropdown_item" onClick={() => {
                                   setTargetAppointment(appointment)
                                    navigate(`/doctor-portal/manage-appointments/create-health-record/${appointment?.id}`)
                                }}>Create Health Record</button>
                            }
                        </div>
                    </div>
                }
            </td>
        </tr>

    );


}
export default DoctorAppointment;