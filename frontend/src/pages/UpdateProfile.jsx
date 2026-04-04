import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { RiErrorWarningFill } from "react-icons/ri";

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("/img/profile.png");
  const [file, setFile] = useState(null); // ❗ missing state
  const filePickerRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("api_token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserProfile(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // Upload Profile Picture Handler
  const triggerFileSelect = () => {
    filePickerRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setAvatarSrc(previewUrl);
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (avatarSrc.startsWith("blob:")) {
        URL.revokeObjectURL(avatarSrc);
      }
    };
  }, [avatarSrc]);

  // Upload ID Handler
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
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
      <form>
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
                ref={filePickerRef}
                onChange={handleAvatarChange}
                style={{ display: "none" }}
            />
        </div>

        <div className="text-center mt-2 mb-4">
            <h4 className="fw-semibold mb-0">
            {userProfile.first_name} {userProfile.last_name}
            </h4>
            <p className="text-secondary">Personal Account</p>
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
                value={userProfile.first_name}
                className="form-control py-3 mb-2"
                readOnly
            />
            <input
                type="text"
                value={userProfile.last_name}
                className="form-control py-3 mb-2"
                readOnly
            />
            <input
                type="email"
                value={userProfile.email}
                className="form-control py-3 mb-2"
                readOnly
            />
            <input
                type="password"
                className="form-control py-3 mb-2"
                placeholder="Password"
            />

            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border rounded-4 p-4 text-center mb-3"
                style={{
                borderStyle: "dashed",
                cursor: "pointer",
                background: "#f8f9fa",
                }}
            >
                <input
                type="file"
                onChange={handleFileChange}
                hidden
                id="fileUpload"
                />

                <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                <div className="fw-semibold">
                    {file ? file.name : "Tap to upload your ID"}
                </div>
                <small className="text-muted">
                    PDF, JPG, PNG (max 5MB)
                </small>
                </label>
            </div>

            {file && file.type.startsWith("image/") && (
                <div className="d-flex align-items-center justify-content-center w-100">
                <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "150px" }}
                />
                </div>
            )}

            <button className="btn btn-dark fw-semibold py-3 w-100 mt-3">
                Update Profile
            </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;