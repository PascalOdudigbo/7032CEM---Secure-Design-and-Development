import React from "react";
import { PatientConsentRequest, Search } from "../../components";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HealthRecord from "../../components/DoctorCreateHealthRecord/DoctorCreateHealthRecord";


function PatientConsentRequests({
    consentRequests,
    setConsentRequests,
    getData,
    patientData,
    sendEmail, setRequestStatus, setAlertMessage, setAlertDisplay, hideAlert
}) {

    //a function to help update the status of the booked availability
    function handleUpdateConsentStatus(consent, status) {
        axios.patch(`/patient_consents/${consent?.id}`, { status: status })
            .then(res => {
                setRequestStatus(true);
                setAlertMessage(`Consent ${status} successfully!`);
                setAlertDisplay("block");
                hideAlert();

                const emailValues = {
                    email_title: "HAB Consent Request Information",
                    image_url: "https://res.cloudinary.com/dr8mwphvk/image/upload/v1697720316/HAB_logo_bk55e1.png",
                    user_name: `${consent?.doctor?.first_name} ${consent?.doctor?.last_name}`,
                    email_body: `Your health records access consent request for (${consent?.patient?.first_name} ${consent?.patient?.last_name}) has been ${status}.`,
                    email_to: consent?.doctor?.email
                };

                sendEmail(emailValues, "Doctor has been notified of decision!", () => { });

                getData(`/a_patient_consents/${patientData?.id}`, setConsentRequests)
            })
            .catch(error => {
                if (error.response) {
                    setRequestStatus(false);
                    setAlertMessage("Consent status update failed!");
                    setAlertDisplay("block");
                    hideAlert();

                }
            })
    }

    // A function to handle searching through consent requests
    function handleConsentSearch(searchInput){
        if (searchInput === "") {
            getData(`/a_patient_consents/${patientData?.id}`, setConsentRequests)
        }
        else {
            let filteredData = consentRequests.filter(consent => `${consent?.doctor?.first_name} ${consent?.doctor?.last_name}`.toLowerCase().includes(searchInput.toLowerCase()));
            setConsentRequests(filteredData);
        }

    }

    // useEffect(() => {
    //     // consentRequests.length === 0 && getData(`/a_patient_consents/${patientData?.id}`, setConsentRequests)
    // }, [consentRequests, getData, setConsentRequests, patientData])


    return (
        <div className="app__patient_consent_requests-wrapper">
            <div className="app__patient_consent_requests_title_and_add_button-wrapper">
                <h1 className="headtext__cormorant app__patient_consent_requests_page_title">HEALTH RECORDS ACCESS REQUESTS</h1>
            </div>

            <div className="app__patient_consent_requests_table_search-wrapper">
                <Search
                    placeholderText={"doctor name..."}
                    handleSearch={handleConsentSearch}
                />
            </div>
            <table className="app__patient_consent_requests_table">
                <thead>
                    <tr className="app__patient_consent_requests_table_headers-wrapper">
                        <th className="p__opensans app__patient_consent_requests_table_header">DOCTOR</th>
                        <th className="p__opensans app__patient_consent_requests_table_header">REQUEST DATE</th>
                        <th className="p__opensans app__patient_consent_requests_table_header">STATUS</th>
                        <th className="p__opensans app__patient_consent_requests_table_header">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {consentRequests?.map((consent) => (
                        <PatientConsentRequest
                            key={consent?.id}
                            consent={consent}
                            // consents={consents}
                            // setConsents={setConsents}
                            handleUpdateConsentStatus={handleUpdateConsentStatus}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientConsentRequests;
