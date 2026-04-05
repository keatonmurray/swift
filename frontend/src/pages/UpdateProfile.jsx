import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("/img/profile.png");
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const avatarPickerRef = useRef(null);
  const idPickerRef = useRef(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("api_token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserProfile(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // Initialize user profile when it loads
  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name);
      setLastName(userProfile.last_name);
      setEmail(userProfile.email);
      setCountry(userProfile.country);
      setAvatarSrc(userProfile.profile_avatar || "/img/profile.png");
      setFile(userProfile.id_photo || "");
    }
  }, [userProfile]);

  // Avatar handlers
  const triggerFileSelect = () => avatarPickerRef.current.click();

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setAvatarSrc(URL.createObjectURL(selectedFile));
  };

  // ID handlers
  const triggerIdSelect = () => idPickerRef.current.click();

  const handleIdFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setFile(URL.createObjectURL(selectedFile));
  };

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/update/${userId}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          country: country,
          profile_avatar: avatarSrc,
          id_photo: file,
          password: password,
          password_confirmation: confirmPassword
        }
      );

      // Success toast
      toast.success("Success! We'll be reviewing your profile.");
    } catch (error) {
      // Dynamic error messages from backend
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          toast.error(errors[key]); // display each field error
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (!userProfile) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="swift update-profile mx-4">
      <form onSubmit={handleProfileUpdate}>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={avatarSrc}
            className="user-profile img-fluid"
            alt="Profile Photo"
            onClick={triggerFileSelect}
          />
          <input
            type="file"
            accept="image/*"
            ref={avatarPickerRef}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="text-center mt-2 mb-4">
          <div className="d-flex align-items-center gap-1 justify-content-center m-0">
              {(userProfile.kyc_status === "pending" || userProfile.kyc_status === "rejected") && (
                  <GoUnverified size={20} style={{ color: "orange" }} />
              )}
              {userProfile.kyc_status === "approved" && (
                  <MdVerified size={20} style={{ color: "green" }} />
              )}
              <h4 className="fw-semibold mb-0">
                  {userProfile.first_name} {userProfile.last_name}
              </h4>
          </div>
          <p className="text-secondary">
              {userProfile.kyc_status === "approved" ? "Verified Account" : "Unverified Account"}
          </p>
        </div>

        <div className="d-flex align-items-start justify-content-start kyc-info custom-rounded-x">
          <div className="text-center">
            <RiErrorWarningFill size={35} className="warning-icon mb-1" />
            <p className="fw-semibold text-center mb-0">
              Updating your profile information is subject to KYC approval. We
              will review your information within 3–5 business days.
            </p>
          </div>
        </div>

        <div className="w-100 d-flex align-items-center justify-content-center my-4">
          <div className="w-100">
            <input
              type="text"
              value={firstName}
              className="form-control py-3 mb-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              className="form-control py-3 mb-2"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              className="form-control py-3 mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control py-3 mb-2"
            >
              <option value={country}>{country}</option>
            </select>
            <input
              type="password"
              className="form-control py-3 mb-2"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control py-3 mb-2"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* --- ID Upload Block --- */}
            <div
              onClick={triggerIdSelect}
              className="border custom-rounded-x p-4 text-center mb-3"
              style={{ borderStyle: "dashed", cursor: "pointer", background: "#f8f9fa" }}
            >
              <input
                type="file"
                accept="image/*"
                ref={idPickerRef}
                onChange={handleIdFileChange}
                style={{ display: "none" }}
              />
              <div className="fw-semibold">{file ? "ID Selected" : "Tap to upload your ID"}</div>
              <small className="text-muted">JPG, PNG (max 5MB)</small>
            </div>

            {/* Preview */}
            {file && (
              <div className="d-flex align-items-center justify-content-center w-100">
                <img
                  src={file}
                  alt="ID preview"
                  className="img-fluid rounded mb-3 w-100"
                  style={{ maxHeight: "150px" }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-dark fw-semibold py-3 w-100 mt-3"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;