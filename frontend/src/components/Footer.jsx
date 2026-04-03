import { Link } from "react-router-dom"

const userId = localStorage.getItem("user_id");

const Footer = () => {
  return (
    <div className="swift homepage footer-fixed">
        <div className="card custom-rounded border-0 px-4 py-3">
            <div className="d-flex align-items-center justify-content-between">
                <Link to={`/dashboard/${userId}`}>
                    <img src="/img/home.png" alt="Home" />
                </Link>
                <img src="/img/transfer-solid.png" alt="Home" />
                <Link to="/profile">
                    <img src="/img/user.png" alt="Profile" />
                </Link>
                <img src="/img/graph.png" alt="Home" />
            </div>
        </div>
    </div>
  )
}

export default Footer