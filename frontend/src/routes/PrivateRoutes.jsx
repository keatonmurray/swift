import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("api_token");
  const { id } = useParams();
  const userId = parseInt(localStorage.getItem("user_id")); // store this at login

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Prevent users from manually entering someone else's dashboard ID
  if (id && id !== String(userId)) {
    return <Navigate to={`/dashboard/${userId}`} />;
  }

  return <Outlet />;
};

export default PrivateRoute;