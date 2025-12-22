import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="page-wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  )
}

export default App;
