import React from 'react'
import { DoctorPatient } from '../../components'
import axios from 'axios'

function DoctorPatients({ patients, setPatients, doctorData, hideAlert, setAlertDisplay, setRequestStatus, setAlertMessage, getData, sendEmail, setTargetPatient}) {

    // A function to confirm if doctor has patient consent to view and modify records
    function doIHaveConscent(patient) {
        let access = 0
        patient?.patient_consents.forEach(consent => {
            if (consent?.doctor?.id === doctorData?.id && consent?.status === "Granted") {
                access = 2
            }
            else if(consent?.doctor?.id === doctorData?.id){
                access = 1
            }
        })
        return access
    }

    // A function to handle requesting for access to health records
    function handleAccessRequest(patient){
        axios.post("/patient_consents", { patient_id: patient?.id, doctor_id: doctorData?.id, status: "Requested"})
        .then(res => {
          setRequestStatus(true);
          setAlertMessage("Consent request sent successfully!");
          setAlertDisplay("block");
          hideAlert();
          getData(`/doctor-patients/${doctorData?.id}`, setPatients)
          // getData(`/doctor-availabilities/${doctorData?.id}`, setAvailabilities)
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
    

    return (
        <div className='app__doctor_patients-wrapper'>
            <div className="app__doctor_patients_title_and_add_button-wrapper">
                <h1 className="headtext__cormorant app__doctor_patients_page_title">PATIENTS</h1>
            </div>

            <table className="app__doctor_patients_table">
                <thead>
                    <tr className="app__doctor_patients_table_headers-wrapper">
                        <th className="p__opensans app__doctor_patients_table_header">FIRST NAME</th>
                        <th className="p__opensans app__doctor_patients_table_header">LAST NAME</th>
                        <th className="p__opensans app__doctor_patients_table_header">EMAIL</th>
                        <th className="p__opensans app__doctor_patients_table_header">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {patients?.map((patient) => (
                        <DoctorPatient
                            key={patient?.id}
                            patient={patient}
                            doIHaveConscent={doIHaveConscent}
                            setTargetPatient={setTargetPatient}
                            handleAccessRequest={handleAccessRequest}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default DoctorPatients
