import { Link } from "react-router-dom";

const userId = localStorage.getItem("user_id");

const Footer = () => {
  return (
    <div className="swift homepage footer-fixed">
      <div className="card custom-rounded border-0 px-4 py-3">
        <div className="d-flex align-items-center justify-content-between text-center">

          <Link
            to={`/dashboard/${userId}`}
            className="footer-item text-decoration-none text-dark small fw-semibold pt-2"
          >
            <img src="/img/home.png" alt="Home" />
            <span>Home</span>
          </Link>

          <div className="footer-item text-decoration-none text-dark small fw-semibold pt-2">
            <img src="/img/transfer-solid.png" alt="Transfer" />
            <span>Transfer</span>
          </div>

          <Link
            to={`/profile/${userId}`}
            className="footer-item text-decoration-none text-dark small fw-semibold pt-2"
          >
            <img src="/img/user.png" alt="Profile" />
            <span>Profile</span>
          </Link>

          <div className="footer-item text-decoration-none text-dark small fw-semibold pt-2">
            <img src="/img/graph.png" alt="Analytics" />
            <span>Stats</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;