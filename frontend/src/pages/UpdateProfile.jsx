import axios from "axios";
import { useEffect, useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";

const UpdateProfile = () => {

    const [userProfile, setUserProfile] = useState(null);

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
            setUserProfile(res.data.user);
        } catch (err) {
            console.error(err);
        }
        };

        fetchProfile();
    }, []);

    if (!userProfile) return 
    <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }} // full viewport height
    >
        <ClipLoader color="#36d7b7" size={50} />
    </div>;
    

    return (
        <div className="swift update-profile">
            <div className="d-flex align-items-center justify-content-center">
                <img src="/img/profile.png" className="user-profile img-fluid" alt="Profile Photo" />
            </div>
            <div className="text-center">
                <h4 className="fw-semibold mb-0">{userProfile.first_name} {userProfile.last_name}</h4>
                <p className="text-secondary">Personal Account</p>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center my-4">
                <form action="#">
                    <input type="text" value={userProfile.first_name} className="form-control py-3 mb-2" />
                    <input type="text" value={userProfile.last_name} className="form-control py-3 mb-2"/>
                    <input type="email" value={userProfile.email} className="form-control py-3 mb-2"/>
                    <input type="password" className="form-control py-3 mb-2" placeholder="Password"/>
                    <button className="btn btn-dark fw-semibold py-3 w-100 mt-3">Update Profile</button>
                </form>
            </div>
        </div>
  )
}

export default UpdateProfile