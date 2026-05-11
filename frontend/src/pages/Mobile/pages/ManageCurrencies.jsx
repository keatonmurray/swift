import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Spinner from "react-bootstrap/Spinner";

const ManageCurrencies = () => {
    const { id } = useParams()
    const token = localStorage.getItem("api_token");
    const userId = localStorage.getItem("user_id");

    const [currencies, setCurrencies] = useState("");
    const [loading, setLoading] = useState(true);

    const handleRetrieveCurrencies = async () => {
        try {
           const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-currency/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const accounts = response?.data?.data?.wallet_rapyd?.bank_accounts ?? [];
            setCurrencies(accounts ?? []);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            handleRetrieveCurrencies();
        }
    }, [userId]);

    // TO DO: 
    // Download flag images for all countries we support and replace the images with it according to case

    const getFlag = (currency) => {
        switch (currency) {
            case "USD":
                return "/img/uk.png";
            case "CAD":
                return "/img/canada.png";
            case "GBP":
                return "/img/uk.png";
            case "EUR":
                return "/img/euro.png";
            default:
                return "/img/default.png";
        }
    };

    const safeCurrencies = Array.isArray(currencies) ? currencies : [];

    const currencyData = (safeCurrencies ?? []).map((acc) => ({
        name: acc.currency,
        flag: getFlag(acc.currency),
        value: acc.balance ?? "0.00",
    }));

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
                        <input
                            type="text"
                            className="form-control py-2"
                            placeholder="Search here"
                        />
                    </div>

                    <div className="currency-list-wrapper">

                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center py-5">
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : currencyData.length === 0 ? (
                            <div className="text-center text-muted py-4">
                                No currencies found
                            </div>
                        ) : (
                            currencyData.map((currency, index) => (
                                <div
                                    key={index}
                                    className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2"
                                >
                                    <div className="d-flex align-items-center justify-content-between mt-1">
                                        <span className="fw-semibold">
                                            <img
                                                src={currency.flag}
                                                className="flag me-2"
                                                alt="Flag"
                                            />
                                            {currency.name}
                                        </span>

                                        <span className="text-success small fw-semibold">
                                            {currency.value}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}

                        <Link to={`/create-personal-currency/${userId}`}
                            className="mt-4 btn btn-dark w-100 py-3 btn-rounded border-0 px-4 fw-semibold"
                            disabled={loading}
                            className={loading ? "d-none" : "mt-4 btn btn-dark w-100 py-3 btn-rounded border-0 px-4 fw-semibold"}
                        >
                            Add more currencies
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCurrencies