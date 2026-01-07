const currencyData = [
  { name: "Canadian Dollar", flag: "/img/canada.png", value: "+10.012" },
  { name: "British Pounds", flag: "/img/uk.png", value: "+16.012" },
  { name: "Euro", flag: "/img/euro.png", value: "+13.012" },
  { name: "Australian Dollar", flag: "/img/australia.png", value: "+10.012" },
  { name: "Korean Won", flag: "/img/korea.png", value: "+16.012" },
  { name: "Japanese Yen", flag: "/img/japan.png", value: "+13.012" },
];

const Currencies = () => {
  return (
    <div className="swift currencies mx-auto">
      <div className="px-4">
        <div className="card border-0 custom-rounded px-4 pt-2 pb-3">
          <div className="d-flex align-items-center justify-content-between pt-2">
            <div className="account-balance">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <img
                  src="./img/usa.png"
                  alt="User Profile"
                  className="user-profile-img"
                />
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
      </div>

      <br />

      <div className="card border-0 custom-rounded-top px-4 pt-2 pb-4 mt-4 available-currencies">
        <div className="mb-4">
          <div className="border-bottom w-100">
            <h5 className="my-3 fw-semibold">Currencies Available</h5>
          </div>
        </div>

        <div className="w-100 mb-4">
          <input type="text" className="form-control py-2" placeholder="Search here" />
        </div>

        {/* Scrollable wrapper */}
        <div className="currency-list-wrapper">
          {currencyData.map((currency, index) => (
            <div
              key={index}
              className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2"
            >
              <div className="d-flex align-items-center justify-content-between mt-1">
                <span className="fw-semibold">
                  <img src={currency.flag} className="flag me-1" alt="Flag" />
                  {currency.name}
                </span>
                <span className="text-success small fw-semibold">{currency.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Currencies;
