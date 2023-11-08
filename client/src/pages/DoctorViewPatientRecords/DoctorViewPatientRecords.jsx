import React, { useEffect } from 'react'
import { DoctorViewPatientRecord, DoctorEditHealthRecord } from '../../components'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'

function DoctorViewPatientRecords({ doctorData, targetPatient, setTargetPatient, targetHealthRecord, setTargetHealthRecord, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, getData, sendEmail, setPatients }) {

    useEffect(()=>{
        const pathArr = window.location.href.split("/")
        targetPatient?.id === undefined && getData(`/patients/${pathArr[pathArr.length -1]}`, setTargetPatient)
    }, [])

    return (
        <div className='app__doctor_view_patient_records-wrapper'>
            <div className="app__doctor_view_patient_records_title_and_add_button-wrapper">
                <h1 className="headtext__cormorant app__doctor_view_patient_records_page_title">PATIENT RECORDS</h1>
            </div>

            <div className="app__doctor_view_patient_records_create_health_record-wrapper">
                <Routes>
                    <Route path="/edit-health-record/*" element={
                        <DoctorEditHealthRecord
                            doctorData={doctorData}
                            targetPatient={targetPatient}
                            setTargetPatient={setTargetPatient}
                            targetHealthRecord={targetHealthRecord}
                            setRequestStatus={setRequestStatus}
                            setAlertDisplay={setAlertDisplay}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            getData={getData}
                            setPatients={setPatients}
                        />
                    }/>
                </Routes>
            </div>

            <table className="app__doctor_view_patient_records_table">
                <thead>
                    <tr className="app__doctor_view_patient_records_table_headers-wrapper">
                        <th className="p__opensans app__doctor_view_patient_records_table_header">FIRST NAME</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">LAST NAME</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">DATE</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">HEALTH INFORMATION</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {targetPatient?.health_records?.map((healthRecord) => (
                        <DoctorViewPatientRecord
                            key={healthRecord?.id}
                            doctorData={doctorData}
                            patient={targetPatient}
                            healthRecord={healthRecord}
                            targetHealthRecord={targetHealthRecord}
                            setTargetHealthRecord={setTargetHealthRecord}
                            sendEmail={sendEmail}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default DoctorViewPatientRecords
