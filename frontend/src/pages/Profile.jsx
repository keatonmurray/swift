const Profile = () => {
  return (
    <div className="swift profile">
        <div className="d-flex align-items-center justify-content-center">
            <img src="./img/profile.png" className="user-profile img-fluid" alt="Profile Photo" />
        </div>
        <div className="text-center">
            <h4 className="fw-semibold">Keaton M.</h4>
            <p className="text-secondary">Personal Account</p>
        </div>
        <div className="profile-nav-menu w-100 mt-4">
            <ul className="list-group">
                <li className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="./img/pen.png" alt="Edit" />
                    Update Profile
                </li>
                <li className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="./img/invoice.png" alt="Invoices" />
                    Download Invoice
                </li>
                <li className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="./img/payments.png" alt="Payments" />
                    Review Payments
                </li>
                <li className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="./img/calculator.png" alt="Accounts" />
                    Manage Accounts
                </li>
                <li className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="./img/logout.png" alt="Logout" />
                    Logout
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Profile