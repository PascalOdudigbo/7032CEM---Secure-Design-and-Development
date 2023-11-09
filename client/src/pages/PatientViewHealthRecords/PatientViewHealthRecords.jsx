import React from 'react'
import { PatientViewHealthRecord } from '../../components'

function PatientViewHealthRecords({patientData}) {
    console.log(patientData)

    return (
        <div className='app__doctor_view_patient_records-wrapper'>
            <div className="app__doctor_view_patient_records_title_and_add_button-wrapper">
                <h1 className="headtext__cormorant app__doctor_view_patient_records_page_title">PATIENT RECORDS</h1>
            </div>


            <table className="app__doctor_view_patient_records_table">
                <thead>
                    <tr className="app__doctor_view_patient_records_table_headers-wrapper">
                        <th className="p__opensans app__doctor_view_patient_records_table_header">DOCTOR NAME</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">APPOINTMENT DATE</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">APPOINTMENT TIME</th>
                        <th className="p__opensans app__doctor_view_patient_records_table_header">HEALTH INFORMATION</th>
                    </tr>
                </thead>

                <tbody>
                    {patientData?.health_records?.map((healthRecord) => (
                        <PatientViewHealthRecord
                            key={healthRecord?.id}
                            healthRecord={healthRecord}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default PatientViewHealthRecords
