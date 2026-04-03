import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Transfer from "./pages/Transfer";
import Currencies from "./pages/Currencies";
import Deposit from './pages/Deposit';
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./routes/PrivateRoutes";

const App = () => {
  return (
    <div className="page-wrapper">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;