import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Register, SignIn } from "./pages";
import { useState } from "react";
import { Alert } from "./components";

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
  const [isAthenticated, setIsAuthenticated] = useState(false);

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
        <Route path="/" element={<Home/>}/>
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
        }/>
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
        />
        }/>
      </Routes>
      
    </div>
  );
}

export default App;
