import React from 'react';

function PatientViewHealthRecord({healthRecord}) {
    // console.log(healthRecord)
    return (
        <tr className="app__doctor_appointment_data_row">

            <td className="app__doctor_appointment_data_cell">{`${healthRecord?.doctor?.first_name} ${healthRecord?.doctor?.first_name}`}</td>
            <td className="app__doctor_appointment_data_cell">{healthRecord?.created_at.slice(0, 10)}</td>
            <td className="app__doctor_appointment_data_cell">{`${healthRecord?.appointment?.availability?.start_time} - ${healthRecord?.appointment?.availability?.end_time}`}</td>
            <td className="app__doctor_appointment_data_cell">{healthRecord?.health_information}</td>
        </tr>

    );


}
export default PatientViewHealthRecord;