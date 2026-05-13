import { LuWallet } from "react-icons/lu";
import { RiBankCard2Line } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { MdOutlineCurrencyExchange } from "react-icons/md";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CurrencyDetails = () => {
  const { id } = useParams();

  const token = localStorage.getItem("api_token");
  const userId = localStorage.getItem("user_id");

  const [account, setAccount] = useState([]);
  const [ewallet, setEwallet] = useState("");

  const handleRetrieveAccountDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-currency/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const walletRapyd = response?.data?.data?.wallet_rapyd ?? {};
      const accounts = walletRapyd?.bank_accounts ?? [];

      setAccount(accounts);
      setEwallet(walletRapyd?.ewallet || "");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      handleRetrieveAccountDetails();
    }
  }, [userId]);

  return (
    <div className="swift currency-details">
      <div
        className="d-flex align-items-center justify-content-center pt-4 my-4"
        style={{ paddingBottom: "130px" }}
      >
        <div className="w-100 px-4">
          <div className="mb-4">
            <div className="my-4 w-100">
              <h5 className="fw-semibold m-0">Account Details</h5>
            </div>
          </div>

          <div className="ewallet-details">
            <div className="card py-0 px-3">
              <div className="d-flex align-items-start mt-3">
                <div className="wallet-icon">
                  <LuWallet className="wallet-svg" />
                </div>

                <div className="ewallet-info">
                  <p className="fw-semibold m-0">
                    <span style={{ fontSize: "18px" }}>
                      E-Wallet
                    </span>

                    <span className="d-block">
                      <p className="small text-muted fw-normal">
                        {ewallet || "N/A"}
                      </p>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bank-account-details my-4">
              <h5
                className="fw-semibold my-4"
                style={{ fontSize: "18px" }}
              >
                Bank Accounts
              </h5>

              {account?.map((bankAccount, index) => (
                <div key={index}>
                  <div className="card py-0 px-3">
                    <div className="d-flex align-items-start my-3">
                      <div className="ewallet-info w-100">
                        <div className="d-flex align-items-center justify-content-between">

                          {/* Left side */}
                          <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">

                            <div className="wallet-icon">
                              <LuWallet className="wallet-svg" />
                            </div>

                            <div className="min-w-0">
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: 600,
                                }}
                              >
                                {bankAccount.account_id}
                              </div>

                              <div className="small text-muted fw-normal">
                                {bankAccount.currency} • {bankAccount.country_iso}
                              </div>
                            </div>

                          </div>

                          {/* Right side */}
                          <span className="badge fw-semibold rounded-pill bg-success-badge ms-3 flex-shrink-0">
                            {bankAccount.status}
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card py-0 px-3">
                    <div className="d-flex align-items-start my-3">

                      <div className="ewallet-info w-100">
                        <div className="d-flex align-items-center w-100">

                          {/* Left side */}
                          <div className="d-flex align-items-center">
                            <div className="atm-icon">
                              <RiBankCard2Line className="atm-svg" />
                            </div>

                            <div className="small text-muted fw-normal">
                              Currency
                            </div>
                          </div>

                          {/* Right side */}
                          <span className="fw-normal small text-muted ms-auto">
                            {bankAccount.currency}
                          </span>

                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="card py-0 px-3">
                    <div className="d-flex align-items-start my-3">

                      <div className="ewallet-info w-100">
                        <div className="d-flex align-items-center w-100">

                          {/* Left side */}
                          <div className="d-flex align-items-center">
                            <div className="atm-icon">
                              <TbWorld className="atm-svg" />
                            </div>

                            <div className="small text-muted fw-normal">
                              Country
                            </div>
                          </div>

                          {/* Right side */}
                          <span className="fw-normal small text-muted ms-auto">
                            {bankAccount.country_iso}
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card py-0 px-3">
                    <div className="d-flex align-items-start my-3">

                      <div className="ewallet-info w-100">
                        <div className="d-flex align-items-center w-100">

                          <div className="d-flex align-items-center">
                            <div className="atm-icon">
                              <RiBankCard2Line className="atm-svg" />
                            </div>

                            <div className="small text-muted fw-normal">
                              Issuing ID

                              <span className="fw-normal small text-muted d-block issuing-id">
                                {bankAccount.issuing_id}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="card py-0 px-3 mb-4">
                    <div className="d-flex align-items-start my-3">

                      <div className="ewallet-info w-100">
                        <div className="d-flex align-items-center w-100">

                          {/* Left side */}
                          <div className="d-flex align-items-center">
                            <div className="atm-icon">
                              <MdOutlineCurrencyExchange className="atm-svg" />
                            </div>

                            <div className="small text-muted fw-normal">
                              Requested Currency
                            </div>
                          </div>

                          {/* Right side */}
                          <span className="fw-normal small text-muted ms-auto">
                            {bankAccount.requested_currency}
                          </span>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}

              <button className="btn-dark w-100 fw-semibold border-0 btn-rounded mt-4 text-white py-3">
                Add another bank account
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetails;