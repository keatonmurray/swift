import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import Notification from "../../../components/dashboard/Notification";
import cardLogo from '../../../../public/img/mastercard.png';

import { MdKeyboardArrowRight } from "react-icons/md";

const Dashboard = () => {
    const { id } = useParams()
    const userId = localStorage.getItem("user_id");

    const [user, setUser] = useState(null);
    const [notificationIsTrue, setNotification] = useState(false); 
    const [wallet, setWallet] = useState(null);
    const [bankAccounts, setBankAccounts] = useState(null);
    const [walletTransactions, setWalletTransactions] = useState([]);

    // TODO: To add dynamic real time conversion rates
    const [fxRates] = useState({
        USD: 1,
        AUD: 0.65,
        GBP: 1.27,
        CAD: 0.74,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("api_token");
            const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/profile`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
            );
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
        }
        };

        fetchProfile();
    }, []);

// ---------------- WALLET FETCH ----------------
    const fetchWallet = async () => {
        try {
            const token = localStorage.getItem("api_token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet/${localStorage.getItem("user_id")}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWallet(response.data.data.wallet_rapyd);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWallet();
    }, []);

    // ---------------- TOTAL BALANCE (USD CONVERSION) ----------------
    const totalBalance =
        wallet?.accounts?.reduce((sum, acc) => {
            if (!fxRates) return sum;

            const balance = Number(acc.balance || 0);
            const rate = fxRates?.[acc.currency] ?? 0;

            return sum + balance * rate;
        }, 0) || 0;

    // ---------------- FORMAT ----------------
    const formattedTotal = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(totalBalance);

    // ---------------- WALLET TRANSACTIONS ----------------
    const fetchWalletTransactions = async () => {
        try {
            const token = localStorage.getItem("api_token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWalletTransactions(response.data.transactions);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWalletTransactions();
    }, []);

    const transactions = walletTransactions.map((transaction) => ({
        name: transaction.type
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
        initials: transaction.currency,
        time: new Date(transaction.created_at * 1000).toLocaleString(),
        amount: `${transaction.type.includes("in") ? "+" : "-"}$${transaction.amount}`,
        color: transaction.type.includes("in") ? "#D4EDDA" : "#F8D7DA",
    }));

    const handleRetrieveWallet = async () => {
        const token = localStorage.getItem("api_token");

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setWallet(response.data.data.wallet_rapyd);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            handleRetrieveWallet();
        }
    }, [userId]);


    const handleRetrieveBankAccounts = async () => {

        const token = localStorage.getItem("api_token");

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-currency`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const accounts = response?.data?.data?.wallet_rapyd?.bank_accounts ?? [];

            setBankAccounts(accounts);
            
            
        } catch (error) {
            console.error(error);
        }
    };

   useEffect(() => {
        if (userId) {
            handleRetrieveBankAccounts();
        }
    }, [userId]);

    useEffect(() => {
        const carousel = document.getElementById("carouselExample");

        const handleSlide = (event) => {
        const indicators = document.querySelectorAll(
            "#carouselExample .carousel-indicators button"
        );
        indicators.forEach((btn) => btn.classList.remove("active"));
        indicators[event.to].classList.add("active");
        };

        carousel.addEventListener("slide.bs.carousel", handleSlide);

        return () => {
        carousel.removeEventListener("slide.bs.carousel", handleSlide);
        };
    }, []);

    useEffect(() => {
        const el = document.getElementById("carouselExample");
        new Carousel(el, {
            interval: false,
            ride: false,
            touch: true
        });
    }, []);

    const cardNumbers = [
        { cardHolderName: `${user?.first_name || ''} ${user?.last_name || ''}`, cardType: cardLogo, cardNumber: "4312121354637564", currencyType: "USD", expirationDate: "11/29" },
        { cardHolderName: `${user?.first_name || ''} ${user?.last_name || ''}`, cardType: cardLogo, cardNumber: "4333232154673212", currencyType: "GBP", expirationDate: "12/32" },
        { cardHolderName: `${user?.first_name || ''} ${user?.last_name || ''}`, cardType: cardLogo, cardNumber: "4546879709872341", currencyType: "CAD", expirationDate: "06/29" },
    ];

    const openNotification = () => {
        setNotification(prev => !prev);
    }

  return (
    <div className="swift homepage mx-auto">

        {/* Notifications (show if state is true) */}
        {notificationIsTrue && (
            <Notification notification={notificationIsTrue} setNotification={setNotification} />
        )}
        {/* Homepage Elements start here  */}
       <div className="px-4">
            <div className="card border-0 custom-rounded px-4 pt-2 pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="account-balance">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src={user?.profile_avatar ?? "/img/profile.png"} alt="User Profile" className="user-profile-img"/>
                            <div className="d-flex flex-column align-items-start">
                                <p className="p-0 m-0 small text-capitalize fs-18">Total balance</p>
                                <h4 className="m-0 fw-semibold fs-26">{formattedTotal}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swift homepage notifications-icon" onClick={openNotification}>
                        <figure>
                            <img src="/img/bell.png" alt="Notification Bell" />
                        </figure>
                    </div>
                </div>
            </div>
            {/* <div className="card border-0 custom-rounded px-3 pt-2 pb-3 mb-3">
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="account-balance">
                        <div className="d-flex align-items-center">
                            <img src="/img/increase.png" alt="Increase Icon" className="increase-icon-img me-2"/>
                            <div className="d-flex flex-column align-items-start">
                                <p className="fs-18 ms-2 p-0 m-0 small text-capitalize d-flex align-items-center justify-content-center"> 
                                    Smart Insight
                                    <span className="badge bg-success ms-2 fs-10">New</span>
                                </p>
                                <p className="small ms-2 mt-2">USD → PHP conversion is good. <span className="d-block">You could get $40 more today.</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="swift homepage card-container">
                <div
                    id="carouselExample"
                    className="carousel slide"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExample"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    <div className="carousel-inner">
                        {cardNumbers.map((c, index) => (
                            <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <div className="credit-card">
                                    <div className="card-header">
                                        <span className="card-name">{c.cardHolderName}</span>
                                        <span className="card-type">
                                            <img src={c.cardType} alt="" />
                                        </span>
                                    </div>
                                <div className="chip">
                                    <img src="/img/logo-inverted.png" alt="Logo" />
                                </div>
                                <div className="card-number">{c.cardNumber}</div>
                                    <div className="card-footer">
                                        <span className="fw-bold text-white">{c.currencyType}</span>
                                        <span className="fw-bold text-white">{c.expirationDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <br />
            <div className="card border-0 custom-rounded px-3 pt-2 pb-3 mb-3 mt-4">
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <h6 className="fw-semibold fs-18">Your Currencies</h6>
                   <Link
                        to={`/currency-details/${userId}`}
                        className={`text-decoration-none d-inline-block ${
                            bankAccounts?.length ? "text-dark" : "disabled-link text-muted"
                        }`}
                        onClick={(e) => {
                            if (!bankAccounts?.length) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <h6 className="fw-semibold fs-18 d-flex align-items-center justify-content-center">
                            See all
                            <MdKeyboardArrowRight className="ms-1" size={25} />
                        </h6>
                    </Link>
                </div>
                <hr style={{margin:"7px"}} />
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <span className="d-flex align-items-center gap-2 w-100">

                        {loading ? (
                            <div className="w-100 d-flex justify-content-center py-3">
                                <Spinner />
                            </div>
                        ) : !wallet ? (
                            <div className="w-100">
                                <p className="text-center text-muted py-2">
                                    You have not opened any currency account
                                </p>

                                <Link
                                    to={`/create-personal-wallet`}
                                    className="btn w-100 btn-dark fw-semibold btn-rounded border-0 py-3 px-4"
                                >
                                    Create a wallet
                                </Link>
                            </div>
                        ) : (
                            <div className="currency-scroll d-flex align-items-center gap-2 w-100">

                                {/* currencies (only if exist) */}
                                {(bankAccounts ?? []).map((acc, index) => (
                                    <Link to={`/currency-details/${userId}`} className="text-decoration-none">
                                        <span
                                            key={index}
                                            className="currency-container ms-1 d-flex align-items-center justify-content-center border-0 fs-26 btn-bg-primary text-dark fw-semibold"
                                        >
                                            {acc.currency}
                                        </span>
                                    </Link>
                                ))}

                                {/* ONLY show message when NO accounts */}
                                {!(bankAccounts ?? []).length && (
                                    <div className="w-100">
                                        <p className="text-center text-muted py-2">
                                            You have an available wallet! <span className="d-block">You can now add a currency into it.</span>
                                        </p>

                                        <Link
                                            to={`/create-personal-currency/${userId}`}
                                            className="btn w-100 btn-dark fw-semibold btn-rounded border-0 py-3 px-4"
                                        >
                                            Open currency
                                        </Link>
                                    </div>
                                )}

                            </div>
                        )}

                    </span>
                </div>
            </div>
            <div className="swift homepage actions">
                <div className="card border-0 custom-rounded px-4 py-3">
                    <div className="d-flex justify-content-between">
                       

                        <div className="d-flex flex-column align-items-center">
                            <Link to="/currencies" className="text-decoration-none">
                                <img src="/img/currency.png" alt="Withdraw Money Icon" />
                            </Link>
                            <span className="fw-semibold fs-18 mt-1">Currencies</span>
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <Link to="/deposit" className="text-decoration-none">
                                <img src="/img/deposit.png" alt="Deposit Money Icon" />
                            </Link>
                            <span className="fw-semibold fs-18 mt-1">Deposit</span>
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <Link to="#" className="text-decoration-none">
                                <img src="/img/invoice.png" alt="Transfer Money Icon" />
                            </Link>
                            <span className="fw-semibold fs-18 mt-1">Invoices</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br /> <br />

        <div className="swift homepage transaction-history">
            <div className="transactions card border-0 custom-rounded-top d-flex flex-column">
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between px-3 py-2">
                    <h6 className="mb-0 fw-semibold fs-18">Current Transactions </h6>
                    <a href="#" className="text-decoration-none m-0 p-0">
                        <img src="/img/filter.png" alt="Filter" />
                    </a>
                </div>
                <hr style={{margin:"7px"}} />
                {/* Scrollable wrapper */}
                <div className="transaction-list-wrapper flex-1 overflow-auto px-3">
                    <div className="h-100">
                        {transactions && transactions.length > 0 ? (
                            transactions.map((t, index) => (
                            <div
                                key={index}
                                className="transaction d-flex align-items-center justify-content-between py-2"
                            >
                                <div className="d-flex align-items-center">
                                <div
                                    className="avatar me-3"
                                    style={{ backgroundColor: t.color }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="name">
                                    <h6 className="fw-semibold mb-0">{t.name}</h6>
                                    </div>
                                    <div className="time">{t.time}</div>
                                </div>
                                </div>

                                <div
                                className={`amount ${
                                    t.amount.startsWith('+') ? 'text-success' : 'text-danger'
                                }`}
                                >
                                {t.amount}
                                </div>
                            </div>
                            ))
                        ) : (
                            <div class="d-flex align-items-center justify-content-center h-100">
                                <p class="text-center py-3 text-muted">No current transaction history</p>  
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard