import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from 'react-router-dom';
import { FormInputReadOnly, FormTextArea } from "..";
import axios from 'axios';

function DoctorEditHealthRecord({ doctorData, targetPatient, setTargetPatient, targetHealthRecord, setRequestStatus, setAlertMessage, setAlertDisplay, hideAlert, getData, setPatients}) {
    const navigate = useNavigate()
    const [healthInformation, setHealthInformation] = useState(targetHealthRecord?.health_information)

    // A function to handle health record creation
    function handleEditHealthRecord(e){
        e.preventDefault()

        const healthRecordData ={
            health_information: healthInformation
        }

        axios.patch(`/health_records/${targetHealthRecord?.id}`, healthRecordData)
        .then(res => {
            setRequestStatus(true);
            setAlertMessage("Health record editted successfully!");
            setAlertDisplay("block");
            hideAlert();
            getData(`/doctor-patients/${doctorData?.id}`, setPatients)
            getData(`/patients/${targetPatient?.id}`, setTargetPatient)
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

    useEffect(() => {
        targetHealthRecord?.id === undefined&& window.history.back()
        // navigate(`/doctor-portal/patients/view-health-records/${targetPatient?.id}`)

    }, [targetPatient, targetHealthRecord, getData])

    return (
        <div className='app__health_record-wrapper'>
            <Tooltip title={<p className="app__health_record_tooltip">close</p>} arrow>
                <button className="app__health_record_btn_close_page" onClick={() => navigate(`/doctor-portal/patients/view-health-records/${targetPatient?.id}`)}>
                    <IconContext.Provider value={{ size: '20px', className: "app__health_record_btn_close_page_icon" }}>
                        <AiFillCloseCircle />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className='flex__column_center'>
                <h1 className='headtext__cormorant app__health_record_title'>HEALTH RECORD</h1>
            </div>

            <form className='app__health_record_input-wrapper' onSubmit={(e)=>{handleEditHealthRecord(e)}}>
                <div className='flex__row_center_space'>
                    <p className='p__opensans app__health_record_text'>{targetHealthRecord?.appointment?.availability?.date}</p>
                    <p className='p__opensans app__health_record_text'>{`${targetHealthRecord?.appointment?.availability?.start_time} - ${targetHealthRecord?.appointment?.availability?.end_time}`}</p>
                </div>

                <div className='flex__row_center_space app__health_record_input_row_spaced'>
                    <FormInputReadOnly
                        inputLabel={"Patient frist name"}
                        type={"text"}
                        value={targetPatient?.first_name}
                    />

                    <FormInputReadOnly
                        inputLabel={"Patient last name"}
                        type={"text"}
                        value={targetPatient?.last_name}
                    />
                </div>

                <div className='flex__row_center_space app__health_record_input_row_spaced'>
                    <FormInputReadOnly
                        inputLabel={"Doctor frist name"}
                        type={"text"}
                        value={doctorData?.first_name}
                    />

                    <FormInputReadOnly
                        inputLabel={"Doctor last name"}
                        type={"text"}
                        value={doctorData?.last_name}
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
                   <button type="submit" className='custom__button'>Update</button>
                </div>


            </form>


        </div>
    )
}

export default DoctorEditHealthRecord
