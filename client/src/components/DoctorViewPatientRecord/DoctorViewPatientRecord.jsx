import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from "react-router-dom";


function DoctorViewPatientRecord({ doctorData, patient, healthRecord, setTargetHealthRecord }) {
    const [dropdownDisplay, setDropdownDisplay] = useState("none");
    const navigate = useNavigate();


    return (
        <tr className="app__doctor_appointment_data_row">

            <td className="app__doctor_appointment_data_cell">{patient?.first_name}</td>
            <td className="app__doctor_appointment_data_cell">{patient?.last_name}</td>
            <td className="app__doctor_appointment_data_cell">{healthRecord?.created_at.slice(0, 10)}</td>
            <td className="app__doctor_appointment_data_cell">{healthRecord?.health_information}</td>
            <td className="app__doctor_appointment_data_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "app__doctor_appointment_dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                        {   healthRecord?.doctor?.id === doctorData?.id &&
                            <button className='app__doctor_appointment_dropdown_item' onClick={() => {
                                navigate("edit-health-record/")
                                setTargetHealthRecord(healthRecord)
                                // handleAccessRequest(patient)
                            }}>Edit</button>
                        }
                    </div>
                </div>
            </td>
        </tr>

    );


}
export default DoctorViewPatientRecord;