import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="swift desktop-view home bg-yellow-primary vh-100 py-4">
        <div className="p-0">
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
                            Careers
                        </a>
                        </li>
                    </ul>
                    <a className="btn btn-rounded px-4 btn-dark fw-semibold py-3 border-0 ms-lg-3" href="#">
                        Get in touch
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="d-flex px-5 flex-column flex-lg-row align-items-center justify-content-between px-5 py-5 bg-yellow-primary text-light">
                <div className="hero-text mb-4 mb-lg-0" style={{ maxWidth: "700px" }}>
                   <h1 className="display-6 fw-bold hero-heading-title">
                        Get paid <span className="text-dark">globally.</span>
                        <br />
                        Manage money <span className="text-dark">intelligently.</span>
                    </h1>
                    <p className="mt-4 hero-subheading text-muted">
                        Create invoices, receive multi-currency payments, and automatically split, convert, and withdraw funds — all in one intelligent financial system.
                    </p>
                    <div className="d-flex align-items-center">
                        <a className="btn btn-rounded px-4 d-flex align-items-center btn-dark fw-semibold py-3 border-0 mt-3 me-2" href="#">
                            <img src="/img/google-play.png" className="google-play-img" alt="Google Play" />
                            Download on Google Play
                        </a>
                        <a className="btn btn-rounded px-4 d-flex align-items-center btn-dark fw-semibold py-3 border-0 mt-3" href="#">
                            <img src="/img/app-store.png" className="google-play-img" alt="Google Play" />
                            Download on Apple Store
                        </a>
                    </div>
                </div>

                <div className="hero-image text-center">
                    <img
                        src="./img/ui-preview.png"
                        alt="SecurePay App"
                        className="img-fluid"
                    />
                </div>
            </section>

        </div>
    </div>
  );
};

export default Home;