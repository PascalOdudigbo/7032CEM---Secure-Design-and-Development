import { Route, Routes } from "react-router-dom";
import { Home, Register, SignIn } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
