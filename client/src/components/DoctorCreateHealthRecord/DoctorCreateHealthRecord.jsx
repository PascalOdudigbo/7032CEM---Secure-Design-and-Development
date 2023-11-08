import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import { FormInputReadOnly, FormTextArea } from "..";
import axios from 'axios';

function DoctorCreateHealthRecord({ doctorData, setAppointments, targetAppointment, setTargetAppointment, setRequestStatus, setAlertMessage, setAlertDisplay, hideAlert, getData }) {
    const navigate = useNavigate()
    const [healthInformation, setHealthInformation] = useState("")

    // A function to handle health record creation
    function handleCreateHealthRecord(e){
        e.preventDefault()

        const healthRecordData ={
            patient_id: targetAppointment?.patient?.id, 
            doctor_id: targetAppointment?.doctor?.id, 
            appointment_id: targetAppointment?.id, 
            health_information: healthInformation
        }

        axios.post("/health_records", healthRecordData)
        .then(res => {
            setRequestStatus(true);
            setAlertMessage("Availability added successfully!");
            setAlertDisplay("block");
            hideAlert();
            handleUpdateAppointmentStatus(targetAppointment, "Completed")
            // getData(`/health_records/`, setHealthRecords)
          })
          .catch(error => {
            if (error.response) {
              setRequestStatus(false);
              setAlertMessage("Something went wrong, please try again!");
              setAlertDisplay("block");
              hideAlert();
            }
          })
        
    }

    function handleUpdateAppointmentStatus(appointment, status) {
        axios.patch(`/appointments/${appointment?.id}`, { status: status })
            .then(res => {
                setRequestStatus(true);
                // setAlertMessage(`Appointment ${status} successfully!`);
                setAlertDisplay("block");
                hideAlert();

                getData(`/doctor-appointments/${doctorData?.id}`, setAppointments)
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
        const pathArr = window.location.href.split("/")
        targetAppointment?.id === undefined && getData(`/appointments/${pathArr[pathArr.length -1]}`, setTargetAppointment)

    }, [targetAppointment, getData])

    return (
        <div className='app__health_record-wrapper'>
            <Tooltip title={<p className="app__health_record_tooltip">close</p>} arrow>
                <button className="app__health_record_btn_close_page" onClick={() => navigate("/doctor-portal/manage-appointments/")}>
                    <IconContext.Provider value={{ size: '20px', className: "app__health_record_btn_close_page_icon" }}>
                        <AiFillCloseCircle />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className='flex__column_center'>
                <h1 className='headtext__cormorant app__health_record_title'>HEALTH RECORD</h1>
            </div>

            <form className='app__health_record_input-wrapper' onSubmit={(e)=>{handleCreateHealthRecord(e)}}>
                <div className='flex__row_center_space'>
                    <p className='p__opensans app__health_record_text'>{targetAppointment?.availability?.date}</p>
                    <p className='p__opensans app__health_record_text'>{`${targetAppointment?.availability?.start_time} - ${targetAppointment?.availability?.end_time}`}</p>
                </div>

                <div className='flex__row_center_space app__health_record_input_row_spaced'>
                    <FormInputReadOnly
                        inputLabel={"Patient frist name"}
                        type={"text"}
                        value={targetAppointment?.patient?.first_name}
                    />

                    <FormInputReadOnly
                        inputLabel={"Patient last name"}
                        type={"text"}
                        value={targetAppointment?.patient?.last_name}
                    />
                </div>

                <div className='flex__row_center_space app__health_record_input_row_spaced'>
                    <FormInputReadOnly
                        inputLabel={"Doctor frist name"}
                        type={"text"}
                        value={targetAppointment?.doctor?.first_name}
                    />

                    <FormInputReadOnly
                        inputLabel={"Doctor last name"}
                        type={"text"}
                        value={targetAppointment?.doctor?.last_name}
                    />
                </div>

                <div className='app__health_record_text_area-wrapper'>
                    <FormTextArea
                        inputLabel={"Health information"}
                        value={healthInformation}
                        required={true}
                        onChangeFunction={e => setHealthInformation(e.target.value)}
                        maxInput={240}
                        readOnly={false}
                    />
                </div>

                <div className='flex__column_center'>
                    <button type="submit" className='custom__button'>Submit</button>
                </div>


            </form>


        </div>
    )
}

export default DoctorCreateHealthRecord
