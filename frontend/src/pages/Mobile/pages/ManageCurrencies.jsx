import React from 'react'
import { useParams } from 'react-router-dom'

const ManageCurrencies = () => {
    const { id } = useParams()

    const currencyData = [
        { name: "Canadian Dollar", flag: "/img/canada.png", value: "$10,056.98" },
        { name: "British Pounds", flag: "/img/uk.png", value: "£8,910.76" },
        { name: "Euro", flag: "/img/euro.png", value: "€12,901.00" },
    ];

    return (
        <div className="swift manage-currencies">
            <div className="d-flex align-items-center justify-content-center py-4 my-4">
                <div>
                    <div className="mb-4">
                        <div className="border-bottom w-100">
                            <h5 className="my-4 fw-semibold">Your Currencies</h5>
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
        </div>
    )
}

export default ManageCurrencies