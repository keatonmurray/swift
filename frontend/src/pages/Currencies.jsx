const Currencies = () => {
  return (
    <div className="swift currencies mx-auto">
        <div className="px-4">
            <div className="card border-0 custom-rounded px-4 pt-2 pb-3">
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <div className="account-balance">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <img src="./img/usa.png" alt="User Profile" className="user-profile-img"/>
                            <div className="d-flex flex-column align-items-start">
                                <p className="p-0 m-0 small text-capitalize">Primary Currency</p>
                                <h4 className="m-0 fw-semibold">USD</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swift homepage notifications-icon">
                        <figure>
                            <img src="./img/settings.png" alt="Settings" />
                        </figure>
                    </div>
                </div>
            </div>

            <div className="card border-0 custom-rounded px-4 pt-2 pb-5 mt-4 available-currencies mb-3">
                <div className="mb-4">
                    <div className="border-bottom w-100">
                        <h5 className="my-3 fw-semibold">Currencies Available</h5>
                    </div>
                </div>
                <div className="w-100 mb-3">
                    <input type="text" className="form-control py-2" placeholder="Search here"/>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/canada.png" className="flag me-1" alt="Flag" />
                            Canadian Dollar
                        </span>
                        <span className="text-success small fw-semibold">+10.012</span>
                    </div>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/uk.png" className="flag me-1" alt="Flag" />
                            British Pounds
                        </span>
                        <span className="text-success small fw-semibold">+16.012</span>
                    </div>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/euro.png" className="flag me-1" alt="Flag" />
                            Euro
                        </span>
                        <span className="text-success small fw-semibold">+13.012</span>
                    </div>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/australia.png" className="flag me-1" alt="Flag" />
                            Australian Dollar
                        </span>
                        <span className="text-success small fw-semibold">+10.012</span>
                    </div>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/korea.png" className="flag me-1" alt="Flag" />
                            Korean Won
                        </span>
                        <span className="text-success small fw-semibold">+16.012</span>
                    </div>
                </div>
                <div className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2">
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-semibold">
                            <img src="/img/japan.png" className="flag me-1" alt="Flag" />
                            Japanese Yen
                        </span>
                        <span className="text-success small fw-semibold">+13.012</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Currencies