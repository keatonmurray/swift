import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Transfer from "./pages/Transfer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Currencies from "./pages/Currencies";
import Deposit from "./pages/Deposit";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "../../routes/PrivateRoutes";
import ManageCurrencies from "./pages/ManageCurrencies";
import AccountType from "./pages/AccountType";
import CreatePersonalWallet from "./pages/CreatePersonalWallet";
import CreatePersonalCurrency from "./pages/CreatePersonalCurrency";

const MobileView = () => {
  return (
    <div className="page-wrapper">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-account-type" element={<AccountType/>}/>

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/currencies" element={<Currencies />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path="/your-currencies/:id" element={<ManageCurrencies />} />
            <Route path="/create-personal-wallet/:id" element={<CreatePersonalWallet />} />
            <Route path="/create-personal-currency/:id" element={<CreatePersonalCurrency />} />
          </Route>
        </Routes>
      </div>
  )
}

export default MobileView