import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const DesktopView = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default DesktopView