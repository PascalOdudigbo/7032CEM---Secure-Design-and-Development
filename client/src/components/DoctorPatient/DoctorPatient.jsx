import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from "react-router-dom";


function DoctorPatient({ patient, doIHaveConscent, setTargetPatient, handleAccessRequest }) {
    const [dropdownDisplay, setDropdownDisplay] = useState("none");
    const navigate = useNavigate();


    return (
        <tr className="app__doctor_appointment_data_row">

            <td className="app__doctor_appointment_data_cell">{patient?.first_name}</td>
            <td className="app__doctor_appointment_data_cell">{patient?.last_name}</td>
            <td className="app__doctor_appointment_data_cell">{patient?.email}</td>
            <td className="app__doctor_appointment_data_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "app__doctor_appointment_dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                        {   doIHaveConscent(patient) === 0 &&
                            <button className='app__doctor_appointment_dropdown_item' onClick={() => {
                                handleAccessRequest(patient)
                            }}>Request Health Records Access</button>
                        }

                        {
                            doIHaveConscent(patient) === 2 &&
                            <button className="app__doctor_appointment_dropdown_item" onClick={() => {
                                setTargetPatient(patient)
                                navigate(`/doctor-portal/patients/view-health-records/${patient?.id}`)
                            }}>View Health Records</button>
                        }
                    </div>
                </div>
            </td>
        </tr>

    );


}
export default DoctorPatient;