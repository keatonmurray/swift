import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="swift auth">
        <div className="bg-img-wrapper">
            <img src="./img/auth-bg.png" alt="Page Background" />
        </div>
        <div className="content text-center px-3 px-md-0">
            <div className="content text-center px-3 px-md-0 mt-4">
                <h4 className="display-4-custom fw-bold mb-3">
                    Get paid globally. Spend locally.
                </h4>
                <p className="lead small">Your multi-currency account, all in one place</p>
            </div>
            <br />
            <div className="action-btn d-flex justify-content-center">
                <Link to="/login" className="btn btn-rounded px-5 py-3 btn-light me-2 fw-semibold">Login</Link>
                <Link to="/register" className="btn btn-rounded px-5 py-3 btn-dark fw-semibold">Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Home