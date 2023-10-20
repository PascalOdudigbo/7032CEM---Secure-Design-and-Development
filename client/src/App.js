import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Register, SignIn, UserAuth } from "./pages";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "./components";
import axios from "axios";
import emailjs from "@emailjs/browser";


function App() {
  //creating state variables to manage user data
  const [patientData, setPatientData] = useState({})
  const [doctorData, setDoctorData] = useState({})

  //creating alert management states
  const [requestStatus, setRequestStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDisplay, setAlertDisplay] = useState("none");

  //creating portal menu display management states
  const [menuDisplay, setMenuDisplay] = useState(false)

  //creating navigation variable function
  const navigate = useNavigate();

  const [encryptedCode, setEncryptedCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState({});

  //emailJs variables
  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID_1;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  //defining a function to hide alerts
  function hideAlert() {
    let timeOut = setTimeout(
      () => {
        setAlertDisplay("none");
        clearTimeout(timeOut);
      },
      2000,
      setAlertDisplay
    );
  }

  //creating a function to send multi-factor auth email 
  function sendEmail(emailValues, alertMessage, navigationFunction) {

    emailjs.send(serviceID, templateID, emailValues, publicKey).then(
      () => {
        setRequestStatus(true);
        setAlertMessage(alertMessage);
        setAlertDisplay("block");
        hideAlert();
        navigationFunction()
      },
      (err) => {
        setRequestStatus(false);
        setAlertMessage(JSON.stringify(err));
        setAlertDisplay("block");
        hideAlert();
      }
    );
  }


  const getData = useCallback((url, setter) => {
    axios.get(url)
      .then(response => {
        //if data fetched successfully
        setter(response?.data);
      })
      .catch(error => {
        if (error?.response) {
          //if data not fetched successfully
          setRequestStatus(false);
          setAlertMessage("Something went wrong!");
          setAlertDisplay("block");
          hideAlert();

        }
      })
  }, [hideAlert, setAlertDisplay, setAlertMessage, setRequestStatus])


  useEffect(() => {

    getData("/patient-loggedin", setPatientData)
    getData("/doctor-loggedin", setDoctorData)
    getData("/patient-multi-authed", setIsAuthenticated)
    getData("/doctor-multi-authed", setIsAuthenticated)

}, [])

  return (
    <div>
      <div className="flex__column_center">
        <Alert
          requestStatus={requestStatus}
          alertMessage={alertMessage}
          display={alertDisplay}
        />
      </div>

      <Routes>
        <Route path="/" element={
          <Home
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            isAuthenticated={isAuthenticated}
          />
        } />

        <Route path="/register" element={
          <Register
            userData={patientData}
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            hideAlert={hideAlert}
            setAlertDisplay={setAlertDisplay}
            setRequestStatus={setRequestStatus}
            setAlertMessage={setAlertMessage}
            patientData={patientData}
            setPatientData={setPatientData}

          />
        } />

        <Route path="/patient-sign-in" element={
          <SignIn
            userData={patientData}
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            hideAlert={hideAlert}
            setAlertDisplay={setAlertDisplay}
            setRequestStatus={setRequestStatus}
            setAlertMessage={setAlertMessage}
            patientData={patientData}
            setPatientData={setPatientData}
            doctorData={doctorData}
            setDoctorData={setDoctorData}
            setEncryptedCode={setEncryptedCode}
            sendEmail={sendEmail}
            isAuthenticated={isAuthenticated}
          />
        } />

        <Route path="/patient-multi-auth" element={
          <UserAuth
            userData={patientData}
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            hideAlert={hideAlert}
            setAlertDisplay={setAlertDisplay}
            setRequestStatus={setRequestStatus}
            setAlertMessage={setAlertMessage}
            patientData={patientData}
            setPatientData={setPatientData}
            doctorData={doctorData}
            setDoctorData={setDoctorData}
            encryptedCode={encryptedCode}
            setEncryptedCode={setEncryptedCode}
            getData={getData}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            sendEmail={sendEmail}
          />
        } />
        
      </Routes>

    </div>
  );
}

export default App;
