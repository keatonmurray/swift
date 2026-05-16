import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="swift auth bg-main-pallette d-flex align-items-center justify-content-center">
        <div className="content text-center px-3 px-md-0">
            <div className="content text-center px-3 px-md-0 mt-4">
                <div className="w-100 d-flex align-items-center justify-content-center">
                    <img src="/img/logo-inverted.png" className="mobile-view-logo" alt="Logo" />
                </div>
                <h4 className="display-4-custom fw-bold mb-3 text-white mt-3">
                    Move money. Track finances. 
                </h4>
                <p className="text-white small">
                    A gateway that operates accounting for you.
                </p>
            </div>
            <br />
            <div className="action-btn d-flex justify-content-center">
                <Link to="/login" className="btn btn-rounded px-5 py-3 btn-light me-2 fw-semibold">Login</Link>
                <Link to="/select-account-type" className="btn btn-rounded px-5 py-3 btn-bg-primary fw-semibold border-0 fs-18">Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Home