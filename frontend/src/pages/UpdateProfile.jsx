
const UpdateProfile = () => {
  return (
    <div className="swift update-profile">
        <div className="d-flex align-items-center justify-content-center">
            <img src="./img/profile.png" className="user-profile img-fluid" alt="Profile Photo" />
        </div>
        <div className="text-center">
            <h4 className="fw-semibold">Keaton M.</h4>
            <p className="text-secondary">Personal Account</p>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center my-4">
            <form action="#">
                <input type="text" className="form-control py-3 mb-2" placeholder="First Name"/>
                <input type="text" className="form-control py-3 mb-2" placeholder="Last Name"/>
                <input type="email" className="form-control py-3 mb-2" placeholder="Email Address"/>
                <input type="password" className="form-control py-3 mb-2" placeholder="Password"/>
                <button className="btn btn-dark fw-semibold py-3 w-100 mt-3">Update Profile</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateProfile