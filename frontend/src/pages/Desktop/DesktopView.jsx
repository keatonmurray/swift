import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/personal/Dashboard";

const DesktopView = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default DesktopView