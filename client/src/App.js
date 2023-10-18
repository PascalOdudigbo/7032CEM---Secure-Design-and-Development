import { Route, Routes } from "react-router-dom";
import { Home, Register } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
