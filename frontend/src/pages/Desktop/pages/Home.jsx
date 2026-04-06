import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="swift desktop-view home bg-yellow-primary px-5">
        <div className="px-5 py-4">
             {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark px-5">
                <Link to="/" className="navbar-brand" href="#">
                    <img src="../../../../img/logo-inverted.png" alt="" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <a className="nav-link active fw-semibold" href="#">
                            Home
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link fw-semibold text-white" href="#">
                            Features
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link fw-semibold text-white" href="#">
                            About
                        </a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link fw-semibold text-white" href="#">
                            Contact
                        </a>
                        </li>
                    </ul>
                    <a className="btn btn-rounded px-4 btn-dark fw-semibold py-3 border-0 ms-lg-3" href="#">
                        Get Started
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-5 py-5 bg-yellow-primary text-light">
                <div className="hero-text mb-4 mb-lg-0" style={{ maxWidth: "500px" }}>
                    <h1 className="display-6 fw-bold hero-heading-title">
                        The next-generation <br /> payment method.
                    </h1>
                    <p className="mt-3 hero-subheading">
                        SecurePay's mobile application provides a seamless and secure platform
                        for the next generation of payments.
                    </p>
                    <a className="btn btn-rounded px-4 btn-dark fw-semibold py-3 border-0 mt-3" href="#">
                        Get Started
                    </a>
                </div>

                <div className="hero-image text-center">
                    <img
                        src="./img/vector.png"
                        alt="SecurePay App"
                        className="img-fluid"
                        style={{ maxHeight: "500px" }}
                    />
                </div>
            </section>

            {/* Stats Section */}
            <section className="d-flex flex-column flex-lg-row justify-content-around align-items-center bg-yellow-primary text-white px-5 py-5">
                <div className="text-center mb-4 mb-lg-0">
                    <h2 className="fw-bold">450k+</h2>
                    <p>Total active users</p>
                </div>
                <div className="text-center mb-4 mb-lg-0">
                    <h2 className="fw-bold">600k+</h2>
                    <p>App downloads</p>
                </div>
                <div className="text-center">
                    <h2 className="fw-bold">4.9 ⭐</h2>
                    <p>Positive reviews</p>
                </div>
            </section>
        </div>
    </div>
  );
};

export default Home;