const Transfer = () => {
  return (
    <div className="swift transfer">
        <div className="bg-white p-4 w-100">
            <h3 className="fw-bold mb-3">Send Money</h3>
            <div className="d-flex align-items-center justify-content-center flex-column">
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
                <div className="bubble-slider d-flex align-items-center justify-content-center gap-3">
                    <div className="first-slide">.</div>
                    <div className="second-slide">.</div>
                    <div className="third-slide">.</div>
                    <div className="fourth-slide">.</div>
                </div>
            </div>
        </div>
        <div className="beneficiary-container container my-4">
            <p className="lead fw-bold">
                Beneficiary
            </p>
            <div className="list">
                <ul className="beneficiary-list">
                    {/* Add new */}
                    <li className="beneficiary-item text-center add-new">
                        <div className="avatar">+</div>
                        <span className="name small fw-semibold">Add New</span>
                    </li>

                    {/* Beneficiaries */}
                    <li className="beneficiary-item text-center">
                        <img src="./img/person1.jpg" alt="Theresa Webb" />
                        <span className="name small fw-semibold">Theresa Webb</span>
                    </li>

                    <li className="beneficiary-item text-center">
                        <img src="./img/person2.jpg" alt="Kathryn Murphy" />
                        <span className="name small fw-semibold">Kathryn Murphy</span>
                    </li>

                    <li className="beneficiary-item text-center">
                        <img src="./img/person3.jpg" alt="Kristin Watson" />
                        <span className="name small fw-semibold">Kristin Watson</span>
                    </li>

                    <li className="beneficiary-item text-center">
                        <img src="./img/person1.jpg" alt="Jane Cooper" />
                        <span className="name small fw-semibold">Jane Cooper</span>
                    </li>
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