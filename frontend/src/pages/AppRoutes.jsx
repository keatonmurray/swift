import { Routes, Route } from "react-router-dom";

/* Shared / top-level pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";

/* Mobile pages */
import MobileDashboard from "./pages/Mobile/Dashboard";
import MobileTransfer from "./pages/Mobile/Transfer";
import MobileCurrencies from "./pages/Mobile/Currencies";
import MobileDeposit from "./pages/Mobile/Deposit";
import MobileProfile from "./pages/Mobile/Profile";
import MobileUpdateProfile from "./pages/Mobile/UpdateProfile";
import MobileManageCurrencies from "./pages/Mobile/ManageCurrencies";
import MobileAccountType from "./pages/Mobile/AccountType";
import MobileCreateWallet from "./pages/Mobile/CreatePersonalWallet";
import MobileCreateCurrency from "./pages/Mobile/CreatePersonalCurrency";
import MobileCurrencyDetails from "./pages/Mobile/CurrencyDetails";

/* Desktop pages */
import DesktopDashboard from "./pages/Desktop/personal/Dashboard";
import DesktopBusinessDashboard from "./pages/Desktop/business/BusinessDashboard";

/* Auth */
import PrivateRoute from "./routes/PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/select-account-type" element={<MobileAccountType />} />

      {/* Mobile routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/:id" element={<MobileDashboard />} />
        <Route path="/transfer" element={<MobileTransfer />} />
        <Route path="/currencies" element={<MobileCurrencies />} />
        <Route path="/currency-details/:id" element={<MobileCurrencyDetails />} />
        <Route path="/deposit" element={<MobileDeposit />} />
        <Route path="/profile/:id" element={<MobileProfile />} />
        <Route path="/update-profile/:id" element={<MobileUpdateProfile />} />
        <Route path="/your-currencies/:id" element={<MobileManageCurrencies />} />
        <Route path="/create-personal-wallet/:id" element={<MobileCreateWallet />} />
        <Route path="/create-personal-currency/:id" element={<MobileCreateCurrency />} />
      </Route>

      {/* Desktop-only routes */}
      <Route path="/personal/dashboard" element={<DesktopDashboard />} />
      <Route path="/business/dashboard" element={<DesktopBusinessDashboard />} />

      {/* fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;