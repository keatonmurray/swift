import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/personal/Dashboard";
import PageNotFound from "./pages/PageNotFound";

const DesktopView = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal/dashboard" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default DesktopView