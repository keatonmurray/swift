import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="swift desktop-view home vh-100 bg-main-pallette p-0 m-0">
        <nav className="w-10 px-3 bg-black d-flex align-items-center justify-content-between">
            <div className="logo-container">
                <img src="/img/logo-inverted.png" alt="LOgo" />
            </div>
            <ul>
                <li className="list-unstyled">
                    <Link to="#" className="text-decoration-none px-5 text-white fs-18 fw-semibold">
                        Home
                    </Link>
                    <Link to="#" className="text-decoration-none px-5 text-white fs-18 fw-semibold">
                        Features
                    </Link>
                    <Link to="#" className="text-decoration-none px-5 text-white fs-18 fw-semibold">
                        About
                    </Link>
                    <Link to="#" className="text-decoration-none px-5 text-white fs-18 fw-semibold">
                        Contact
                    </Link>
                </li>
            </ul>
            <button className="px-5 btn btn-bg-primary py-3 fw-semibold">Get Started</button>
        </nav>
    </div>
  );
};

export default Home;