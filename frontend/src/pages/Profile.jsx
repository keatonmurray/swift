import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import axios from "axios"

const Profile = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("api_token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  const handleLogout = async (e) => {
    console.log(localStorage.getItem("api_token"))
        try {
            await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
            {},
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("api_token")}`
                }
            }
            );
            localStorage.removeItem("api_token");
            toast.success("Logged out successfully");
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Logout failed. Please try again.");
        }
   };

  return (
    <div className="swift profile">
        <div className="d-flex align-items-center justify-content-center">
            <img src="/img/profile.png" className="user-profile img-fluid" alt="Profile Photo" />
        </div>
        <div className="text-center">
            <h4 className="fw-semibold mb-0">{user.first_name} {user.last_name}</h4>
            <p className="text-secondary">Personal Account</p>
        </div>
        <div className="profile-nav-menu w-100 my-4">
            <ul className="list-group">
                <Link to="/update-profile" className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/pen.png" alt="Edit" />
                    Update Profile
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/invoice.png" alt="Invoices" />
                    Download Invoice
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/payments.png" alt="Payments" />
                    Review Payments
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/calculator.png" alt="Accounts" />
                    Manage Accounts
                </Link>
                <Link
                    to="#" // prevents navigation
                    onClick={handleLogout}
                    className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center"
                    style={{ border: "none", background: "none", width: "100%", textAlign: "left" }}
                    >
                    <img src="/img/logout.png" alt="Logout" />
                    Logout
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Profile