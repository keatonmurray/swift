import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("api_token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render child routes
};

export default PrivateRoute;