import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { LuWallet } from "react-icons/lu";

const SelectPrimaryCurrencyModal = ({
  show,
  handleClose,
  ewallet,
  account,
}) => {
  const [selectedPrimary, setSelectedPrimary] = useState("primary_currency");

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="border-0"
    >
      <Modal.Body className="p-4">

        {/* Header */}
        <div className="text-center mb-4 position-relative">
          <button
            onClick={handleClose}
            className="btn-close position-absolute end-0 top-0"
          ></button>

          <div
            className="mx-auto mb-3"
            style={{
              width: "50px",
              height: "5px",
              borderRadius: "999px",
              background: "#dcdcdc",
            }}
          />

          <h4 className="fw-semibold mb-2">
            Select Primary Account
          </h4>

          <p className="text-muted small mb-0">
            This will be your main account for transactions and balance overview.
          </p>
        </div>

        {/* Primary Currency */}
        <div
          className={`card border mb-3 ${
            selectedPrimary === "primary_currency"
              ? "border-success bg-success bg-opacity-10"
              : ""
          }`}
          onClick={() => setSelectedPrimary("primary_currency")}
          style={{
            cursor: "pointer",
            borderRadius: "18px",
          }}
        >
          <div className="card-body py-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="wallet-icon">
                  <LuWallet className="wallet-svg" />
                </div>

                <div>
                  <div className="fw-semibold">
                    Primary Currency Account
                  </div>
                  <div className="small text-muted">
                    Main eWallet balance
                  </div>
                </div>
              </div>

              <Form.Check
                type="radio"
                checked={selectedPrimary === "primary_currency"}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Bank Accounts */}
        {account?.map((bankAccount, index) => (
          <div
            key={index}
            className={`card border mb-3 ${
              selectedPrimary === `bank_${bankAccount.account_id}`
                ? "border-success bg-success bg-opacity-10"
                : ""
            }`}
            onClick={() =>
              setSelectedPrimary(`bank_${bankAccount.account_id}`)
            }
            style={{
              cursor: "pointer",
              borderRadius: "18px",
            }}
          >
            <div className="card-body py-3">
              <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center gap-3">
                  <div className="wallet-icon">
                    <LuWallet className="wallet-svg" />
                  </div>

                  <div>
                    <div className="fw-semibold">
                      {bankAccount.account_id}
                    </div>

                    <div className="small text-muted">
                      {bankAccount.currency} • {bankAccount.country_iso}
                    </div>
                  </div>
                </div>

                <Form.Check
                  type="radio"
                  checked={
                    selectedPrimary === `bank_${bankAccount.account_id}`
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}

        {/* Button */}
        <button
          className="btn-dark w-100 fw-semibold border-0 text-white py-3 mt-2"
          style={{ borderRadius: "16px" }}
        >
          Set as Primary
        </button>

      </Modal.Body>
    </Modal>
  );
};

export default SelectPrimaryCurrencyModal;