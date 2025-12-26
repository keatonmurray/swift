const Transfer = () => {
  return (
    <div className="swift transfer">
        <div className="bg-white p-4 w-100">
            <h3 className="fw-bold mb-3">Send Money</h3>
            <div className="d-flex align-items-center justify-content-center">
                <div className="card border-0 p-3 account-details w-100">
                    <div className="d-flex align-items-center">
                        <div className="card-container text-white">
                            V
                        </div>
                        <div className="card-details ms-2 text-white">
                            <p className="lead fw-semibold p-0 m-0">Visa Card</p>
                            <p className="small fw-semibold p-0 m-0">034191820192809</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="beneficiary-container container my-4">
            <p className="lead fw-bold">
                Beneficiary
            </p>
            <div className="list">
                <ul className="d-flex align-items-center justify-content-start gap-2 list-unstyled">
                    <div className="list-wrapper add-new">
                        <li className="fw-semibold"> + </li>
                    </div>
                    <div className="list-wrapper beneficiary-profile">
                        <li>
                            <img src="./img/profile.png" alt="Beneficiary Profile" />
                        </li>
                    </div>
                    <div className="list-wrapper beneficiary-profile">
                        <li>
                            <img src="./img/profile.png" alt="Beneficiary Profile" />
                        </li>
                    </div>
                    <div className="list-wrapper beneficiary-profile">
                        <li>
                            <img src="./img/profile.png" alt="Beneficiary Profile" />
                        </li>
                    </div>
                    <div className="list-wrapper beneficiary-profile">
                        <li>
                            <img src="./img/profile.png" alt="Beneficiary Profile" />
                        </li>
                    </div>
                        <div className="list-wrapper beneficiary-profile">
                        <li>
                            <img src="./img/profile.png" alt="Beneficiary Profile" />
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        <div className="set-amount bg-white p-4 w-100">
            <div className="text-center mb-4">
                <h1 className="fw-semibold">$670.00</h1>
                <p className="text-muted">You have $123,456.00 available</p>
            </div>

            <div className="d-flex justify-content-center">
                <div className="keypad">
                <div className="row g-2">
                    <div className="col-4"><button className="key-btn">1</button></div>
                    <div className="col-4"><button className="key-btn">2</button></div>
                    <div className="col-4"><button className="key-btn">3</button></div>

                    <div className="col-4"><button className="key-btn">4</button></div>
                    <div className="col-4"><button className="key-btn">5</button></div>
                    <div className="col-4"><button className="key-btn">6</button></div>

                    <div className="col-4"><button className="key-btn">7</button></div>
                    <div className="col-4"><button className="key-btn">8</button></div>
                    <div className="col-4"><button className="key-btn">9</button></div>

                    <div className="col-4"><button className="key-btn">.</button></div>
                    <div className="col-4"><button className="key-btn">0</button></div>
                    <div className="col-4">
                    <button className="key-btn backspace">⌫</button>
                    </div>
                </div>
                </div>
            </div>
            <button className="btn btn-dark w-100 my-3 py-4 fw-semibold">Send $670.00</button>
        </div>
    </div>
  )
}

export default Transfer