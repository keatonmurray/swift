import { Link } from "react-router-dom";

const Dashboard = () => {
    const transactions = [
        { name: "Jenny Wilson", initials: "JW", time: "Today, 12:30 pm", amount: "-$438", color: "#FDEBD0" },
        { name: "Wade Warren", initials: "WW", time: "Today, 12:30 pm", amount: "+$1200", color: "#F5D3E0" },
        { name: "Cameron Williamson", initials: "CW", time: "Today, 12:30 pm", amount: "+$786", color: "#CDE4F7" },
        { name: "Esther Howard", initials: "EH", time: "Today, 12:30 pm", amount: "-$250", color: "#D0F7D0" },
        { name: "Ralph Edwards", initials: "RE", time: "Today, 12:30 pm", amount: "+$500", color: "#F7D0D0" },
    ];
  return (
    <div className="swift homepage mx-auto">
       <div className="px-4">
            <div className="card border-0 custom-rounded px-4 py-2">
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="account-balance">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src="./img/profile.png" alt="User Profile" className="user-profile-img"/>
                            <div className="d-flex flex-column align-items-start">
                                <p className="p-0 m-0 small text-capitalize">Total balance</p>
                                <h4 className="m-0 fw-semibold">$123,456</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swift homepage notifications-icon">
                        <figure>
                            <img src="./img/bell.png" alt="Notification Bell" />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="swift homepage card-container">
                <div className="credit-card">
                    <div className="card-header">
                        <span className="card-name">Anik Deb</span>
                        <span className="card-type">VISA</span>
                    </div>

                    <div className="chip"></div>

                    <div className="card-number">6458 6354 7909 0001</div>

                    <div className="card-footer">
                        <span className="fw-semibold">Valid Thru</span>
                        <span className="fw-semibold">10/25</span>
                    </div>
                </div>
            </div>
            <div className="swift homepage actions">
                <div className="card border-0 custom-rounded px-4 py-3">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column align-items-center">
                            <a href="#" className="text-decoration-none">
                            <img src="./img/deposit.png" alt="Deposit Money Icon" />
                            </a>
                            <span className="fw-semibold mt-1">Deposit</span>
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <a href="#" className="text-decoration-none">
                            <img src="./img/withdraw.png" alt="Withdraw Money Icon" />
                            </a>
                            <span className="fw-semibold mt-1">Withdraw</span>
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <Link to="/transfer" className="text-decoration-none">
                                <img src="./img/transfer.png" alt="Transfer Money Icon" />
                            </Link>
                            <span className="fw-semibold mt-1">Transfer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="swift homepage transaction-history">
            <div className="transactions card border-0 custom-rounded-top">
                <div className="border-bottom d-flex align-items-center justify-content-between">
                    <h6 className="mb-3 fw-semibold">Transactions</h6>
                    <a href="#" className="text-decoration-none m-0 p-0">
                        <img src="./img/filter.png" alt="Filter" className="mb-3"/>
                    </a>
                </div>
                <br />
                {transactions.map((t, index) => (
                    <div key={index} className="transaction d-flex align-items-center justify-content-between py-2">
                        <div className="d-flex align-items-center">
                            <div className="avatar me-3" style={{ backgroundColor: t.color }}>
                                {t.initials}
                            </div>
                            <div>
                            <div className="name"><h6 className="fw-semibold">{t.name}</h6></div>
                            <div className="time">{t.time}</div>
                            </div>
                        </div>
                        <div className={`amount ${t.amount.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                            {t.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="swift homepage footer-fixed">
            <div className="card custom-rounded border-0 px-4 py-3">
                <div className="d-flex align-items-center justify-content-between">
                    <img src="./img/home.png" alt="Home" />
                    <img src="./img/transfer-solid.png" alt="Home" />
                    <img src="./img/user.png" alt="Home" />
                    <img src="./img/graph.png" alt="Home" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard