import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, PatientPortal, Register, SignIn, UserAuth, VerifyEmail } from "./pages";
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
  const hideAlert = useCallback(() => {
    let timeOut = setTimeout(
      () => {
        setAlertDisplay("none");
        clearTimeout(timeOut);
      },
      2000,
      setAlertDisplay
    );
  }, [])

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
          // setAlertMessage("Something went wrong!");
          // setAlertDisplay("block");
          hideAlert();

        }
      })
  }, [hideAlert, setRequestStatus])

  //defining a function to implement user logout
  function handleLogout() {
    const isPatient = window.location.href.includes("patient")

    fetch(isPatient ? "/patient-logout" : "/doctor-logout", {
      method: "DELETE",
    }).then(() => {
      setRequestStatus(true);
      setAlertMessage("Logout successful!");
      setAlertDisplay("block");
      hideAlert();
      isPatient ? setPatientData({}) : setDoctorData({});
      setTimeout(() => navigate("/"), 1500);
    })

  }

  useEffect(() => {
    getData("/patient-loggedin", setPatientData)
    getData("/doctor-loggedin", setDoctorData)
    getData("/patient-multi-authed", setIsAuthenticated)
    getData("/doctor-multi-authed", setIsAuthenticated)

  }, [getData])

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
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            hideAlert={hideAlert}
            setAlertDisplay={setAlertDisplay}
            setRequestStatus={setRequestStatus}
            setAlertMessage={setAlertMessage}
            patientData={patientData}
            setPatientData={setPatientData}
            isAuthenticated={isAuthenticated}

          />
        } />

        <Route path="/patient-sign-in" element={
          <SignIn
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
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
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
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

        <Route path="/doctor-sign-in" element={
          <SignIn
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
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

        <Route path="/doctor-multi-auth" element={
          <UserAuth
            userData={patientData?.id ? patientData : doctorData?.id && doctorData}
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

        <Route path="/confirm-email/*" element={
          <VerifyEmail
            hideAlert={hideAlert}
            setAlertDisplay={setAlertDisplay}
            setRequestStatus={setRequestStatus}
            setAlertMessage={setAlertMessage}
            setPatientData={setPatientData}
          />
        } />

        <Route path="/patient-portal/*" element={
          <PatientPortal
            menuDisplay={menuDisplay}
            setMenuDisplay={setMenuDisplay}
            isAuthenticated={isAuthenticated}
            patientData={patientData}
            getData={getData}
            handleLogout={handleLogout}

          />
        } />

      </Routes>

    </div>
  );
}

export default App;
