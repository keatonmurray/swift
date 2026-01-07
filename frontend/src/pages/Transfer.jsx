import { useEffect } from "react";
import { Carousel } from "bootstrap";

import cardLogo from '../../public/img/mastercard.png';

const Transfer = () => {
  useEffect(() => {
    const el = document.getElementById("transferCarousel");
    if (!el) return;

    const carousel = new Carousel(el, {
      interval: false,
      ride: false,
      touch: true,
      wrap: true
    });

    const handleSlide = (event) => {
      const indicators = el.querySelectorAll(".carousel-indicators button");
      indicators.forEach(btn => btn.classList.remove("active"));
      indicators[event.to]?.classList.add("active");
    };

    el.addEventListener("slide.bs.carousel", handleSlide);

    return () => {
      el.removeEventListener("slide.bs.carousel", handleSlide);
      carousel.dispose();
    };
  }, []);

  const cardNumbers =[
    {cardNumber: "4121491291024212", cardType: "Mastercard", initials: "M", cardLogo: cardLogo},
    {cardNumber: "4232819271829056", cardType: "Mastercard", initials: "M", cardLogo: cardLogo},
    {cardNumber: "4325213465783323", cardType: "Mastercard", initials: "M", cardLogo: cardLogo}
  ];

  return (
    <div className="swift transfer">
      <div className="bg-white px-4 py-5 w-100">
        <h3 className="fw-bold mb-3">Send Money</h3>

        <div id="transferCarousel" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#transferCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#transferCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#transferCarousel"
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
                <div className="card border-0 p-3 account-details w-100">
                  <div className="d-flex align-items-center">
                    <div className="card-container text-white">{c.initials}</div>
                    <div className="card-details ms-2 text-white w-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="lead fw-semibold p-0 m-0">{c.cardType}</p>
                          <p className="small fw-semibold p-0 m-0">
                            {c.cardNumber}
                          </p>
                        </div>
                        <div className="text-end">
                          <img src={cardLogo} alt="Card Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Everything below remains untouched */}
      <div className="beneficiary-container container my-4">
        <p className="lead fw-bold">Beneficiary</p>
        <div className="list">
          <ul className="beneficiary-list">
            <li className="beneficiary-item text-center add-new">
              <div className="avatar">+</div>
              <span className="name small fw-semibold">Add New</span>
            </li>

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

        <button className="send-money btn btn-dark w-100 my-3 py-3 fw-semibold">
          Send $670.00
        </button>
      </div>
    </div>
  );
};

export default Transfer;
