import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

import PrivateRoute from "../../routes/PrivateRoutes";

// Auth pages
import Login from "./auth/Login";
import Register from "./auth/Register";

// Layouts & Sidebars
import DashboardLayout from "@/layouts/DashboardLayout";
import BusinessSidebar from "./business/components/BusinessSidebar";
import PersonalSidebar from "./personal/components/PersonalSidebar";

// Business pages
import BusinessOverview from "./business/overview/Overview";
import BusinessPayments from "./business/payments/Payments";
import BusinessPayroll from "./business/payroll/Payroll";
import BusinessPayrollAnalysis from "./business/payroll/PayrollAnalysis";
import BusinessEmployeePayrollDetail from "./business/payroll/EmployeePayrollDetail";
import BusinessPayrollSettings from "./business/payroll/PayrollSettings";
import BusinessAutomations from "./business/automations/Automations";

// Personal pages
import PersonalOverview from "./personal/overview/Overview";

const DesktopView = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/select-account-type" element={<Register />} />

      {/* =========================
          BUSINESS ROUTES
      ========================== */}
      <Route element={<PrivateRoute allowedType="business" />}>
        <Route
          path="/business"
          element={
            <DashboardLayout sidebar={<BusinessSidebar />} />
          }
        >
          <Route index element={<BusinessOverview />} />

          <Route
            path="payments"
            element={<BusinessPayments />}
          />

          <Route
            path="payroll"
            element={<BusinessPayroll />}
          />

          <Route
            path="payroll/analysis"
            element={<BusinessPayrollAnalysis />}
          />

          <Route
            path="payroll/analysis/:employeeId"
            element={<BusinessEmployeePayrollDetail />}
          />

          <Route
            path="payroll/settings"
            element={<BusinessPayrollSettings />}
          />

          <Route
            path="automations"
            element={<BusinessAutomations />}
          />

          {/* Future Routes */}
          {/* <Route path="accounts" element={<Accounts />} /> */}
          {/* <Route path="transactions" element={<Transactions />} /> */}
          {/* <Route path="payouts" element={<Payouts />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
          {/* <Route path="ai-insights" element={<AiInsights />} /> */}
          {/* <Route path="recipients" element={<Recipients />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>

      {/* =========================
          PERSONAL ROUTES
      ========================== */}
      <Route element={<PrivateRoute allowedType="personal" />}>
        <Route
          path="/personal"
          element={
            <DashboardLayout sidebar={<PersonalSidebar />} />
          }
        >
          <Route index element={<PersonalOverview />} />

          {/* Future Routes */}
          {/* <Route path="pay" element={<Pay />} /> */}
          {/* <Route path="transactions" element={<Transactions />} /> */}
          {/* <Route path="cards" element={<Cards />} /> */}
          {/* <Route path="expenses" element={<Expenses />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
          {/* <Route path="documents" element={<Documents />} /> */}
          {/* <Route path="goals" element={<Goals />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default DesktopView;