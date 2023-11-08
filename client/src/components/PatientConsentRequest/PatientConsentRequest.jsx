import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';


function PatientConsentRequest({ consent, handleUpdateConsentStatus }) {
    const [dropdownDisplay, setDropdownDisplay] = useState("none");



    return (
        <tr className="app__patient_consent_request_data_row">

            <td className="app__patient_consent_request_data_cell">{`${consent?.doctor?.first_name} ${consent?.doctor?.last_name}`}</td>
            <td className="app__patient_consent_request_data_cell">{consent?.created_at.slice(0, 10)}</td>
            <td className="app__patient_consent_request_data_cell">{consent?.status}</td>

            <td className="app__patient_consent_request_data_cell">
                {
                    <div className="dropdown">
                        <IconContext.Provider value={{ size: '20px', className: "app__patient_consent_request_dropdown_icon" }}>
                            <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                        </IconContext.Provider>
                        <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                            <button className='app__patient_consent_request_dropdown_item' onClick={() => {
                                handleUpdateConsentStatus(consent, "Granted")
                            }}>Grant</button>
                            <button className="app__patient_consent_request_dropdown_item_delete_btn" onClick={() => {
                                handleUpdateConsentStatus(consent, "Denied")
                            }}>Deny</button>
                        </div>
                    </div>
                }
            </td>
        </tr>

    );


}
export default PatientConsentRequest;