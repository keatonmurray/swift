import DashboardShell from "../../components/DashboardShell"
import {
  IoChevronDownOutline,
  IoCalendarOutline,
} from "react-icons/io5"
import { HiOutlinePaperAirplane } from "react-icons/hi2"
import { RiShieldCheckLine } from "react-icons/ri"

const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[15px] text-zinc-500">{label}</span>

      <span className="text-[15px] font-medium text-black">{value}</span>
    </div>
  )
}

const PersonalTransferMoney = () => {
  return (
    <DashboardShell
      title="Transfer To Another Wallet"
      subtitle="Send money securely"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_0.95fr]">
        {/* LEFT */}
        <div className="rounded-[32px] border border-zinc-200/70 bg-white p-5 md:p-8">
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Amount
              </label>

              <input
                type="number"
                placeholder="0.00"
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition focus:border-zinc-300"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Currency
              </label>

              <div className="relative">
                <select className="h-12 w-full appearance-none rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] text-zinc-500 outline-none transition focus:border-zinc-300">
                  <option disabled selected>Select currency</option>
                  <option>USD</option>
                </select>

                <IoChevronDownOutline className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-zinc-500" />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Destination E-Wallet
              </label>

              <input
                type="text"
                placeholder="Enter destination e-wallet"
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition focus:border-zinc-300"
              />

              <p className="mt-2 text-[13px] text-zinc-500">
                The e-wallet that will receive the payment.
              </p>
            </div>

            {/* Source */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Source E-Wallet
              </label>

              <input
                type="text"
                placeholder="Enter source e-wallet"
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition focus:border-zinc-300"
              />

              <p className="mt-2 text-[13px] text-zinc-500">
                The e-wallet the payment will be sent from.
              </p>
            </div>

            {/* Expiration */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Expiration
              </label>

              <div className="relative">
                <input
                  type="datetime-local"
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 pr-12 text-[15px] text-zinc-500 outline-none transition focus:border-zinc-300"
                />

                <IoCalendarOutline className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-zinc-500" />
              </div>

              <p className="mt-2 text-[13px] text-zinc-500">
                When the payment request will expire.
              </p>
            </div>

            {/* Button */}
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-[15px] font-medium text-white transition hover:opacity-95">
              <HiOutlinePaperAirplane className="text-[16px]" />
              Send Payment
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[32px] bg-white p-5 md:p-6 border border-zinc-200/70">
          <h2 className="text-[28px] font-semibold tracking-tight text-black text-center">
            Transfer Summary
          </h2>

          {/* Icon */}
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <HiOutlinePaperAirplane className="text-[34px] text-emerald-600" />
            </div>

            <h3 className="mt-6 text-[28px] font-semibold text-black">
              Swift Payment
            </h3>

            <p className="mt-2 max-w-[260px] text-center text-[15px] leading-6 text-zinc-500">
              Money should hit the destination wallet within seconds.
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-6">
            <div className="space-y-5">
              <SummaryRow label="Amount" value="—" />
              <SummaryRow label="Currency" value="—" />
              <SummaryRow label="Destination E-Wallet" value="—" />
              <SummaryRow label="Source E-Wallet" value="—" />
              <SummaryRow label="Expiration" value="—" />
            </div>

            {/* Secure Card */}
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                  <RiShieldCheckLine className="text-[22px] text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-[15px] font-semibold text-black">
                    Secure & Trusted
                  </h4>

                  <p className="mt-1 text-[14px] leading-6 text-zinc-600">
                    Your payment will be processed securely via Rapyd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END RIGHT */}
      </div>
    </DashboardShell>
  )
}

export default PersonalTransferMoney