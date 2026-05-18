import React, { useEffect, useState } from "react"
import {
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiArrowUpRight,
  FiCreditCard,
  FiDollarSign,
  FiClock,
} from "react-icons/fi"
import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import { Link } from "react-router-dom"
import {
  TransferMoneySkeleton,
  TransferStatsSkeleton,
} from "@/pages/Desktop/components/Skeleton"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const recentPayments = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    amount: "$4,200.00",
    status: "Completed",
  },
  {
    name: "Michael Lee",
    email: "michael.lee@globalpay.io",
    amount: "$2,850.00",
    status: "Pending",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@agency.co",
    amount: "$1,250.00",
    status: "Completed",
  },
  {
    name: "Carlos Rivera",
    email: "carlos.rivera@startup.mx",
    amount: "$890.00",
    status: "Completed",
  },
]

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Pending:   "bg-amber-50  text-amber-700  border border-amber-100",
  Failed:    "bg-red-50    text-red-700    border border-red-100",
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PersonalPay = () => {
  // TODO: replace with real wallet fetch when wired
  const [walletLoading, setWalletLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setWalletLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
  <DashboardShell
    title="Pay"
    subtitle="Send payouts, manage balances, and track outgoing payments"
    actions={
      <Link to="/personal/transfer" className="inline-flex items-center gap-1.5 h-10 text-[13px] font-semibold text-white bg-black rounded-full px-5 hover:opacity-90 transition-colors">
        <FiPlus size={14} />
        Send to another wallet
      </Link>
    }
  >
    {/* ── Top row: Wallet hero + stats ───────────────────────────────── */}
    <section className="grid grid-cols-12 gap-4 mb-5">
      {/* Wallet Hero — keeps the original brand color */}
      <div className="col-span-12 xl:col-span-4">
        {walletLoading ? (
          <TransferMoneySkeleton />
        ) : (
        <div className="overflow-hidden rounded-[20px] bg-main-pallette p-5 text-white relative">
        {/* Balance */}
        <div className="relative flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              Primary Wallet Balance
            </p>

            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] leading-none">
              $128,450.00
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white border border-white/10">
                USD Wallet
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/20">
                +12.4%
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 shrink-0">
            <FiDollarSign size={16} />
          </div>
        </div>

        {/* Credit card */}
        <div className="relative mt-4 h-[170px] w-full max-w-[320px] rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:h-[180px] sm:max-w-[340px]">
          <div className="flex h-full flex-col justify-between">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                  Personal Card
                </p>

                <div className="mt-3 flex items-center gap-2.5">
                  <div className="h-5 w-7 rounded bg-gradient-to-br from-zinc-100 to-zinc-300" />

                  <span className="text-[13px] font-medium tracking-[0.2em]">
                    •••• 4821
                  </span>
                </div>
              </div>

              <FiCreditCard size={16} className="text-zinc-300" />
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider">
                  Card Holder
                </p>

                <p className="mt-0.5 text-[12px] font-medium">
                  Keaton Murray
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider">
                  Expires
                </p>

                <p className="mt-0.5 text-[12px] font-medium tabular-nums">
                  12 / 28
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        )}
      </div>

      {/* Stats column */}
      <div className="col-span-12 xl:col-span-8">
        {walletLoading ? (
          <TransferStatsSkeleton />
        ) : (
          <>
        {/* Top stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Available */}
          <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-gray-500 leading-none mb-2">
                Available Balance
              </p>

              <p className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2">
                $96,240.00
              </p>

              <p className="text-[12px] text-emerald-600 font-medium">
                Ready to send
              </p>
            </div>

            <span className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50">
              <FiArrowUpRight size={18} className="text-emerald-500" />
            </span>
          </div>

          {/* Pending */}
          <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-gray-500 leading-none mb-2">
                Pending Payments
              </p>

              <p className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2">
                $12,840.00
              </p>

              <p className="text-[12px] text-amber-600 font-medium">
                3 in progress
              </p>
            </div>

            <span className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50">
              <FiClock size={18} className="text-amber-500" />
            </span>
          </div>
        </div>

        {/* Wallet selector */}
        <button className="mt-4 bg-white border border-gray-200 rounded-[20px] px-5 h-12 w-full flex items-center justify-between text-[13px] font-medium text-gray-900 hover:bg-gray-50 transition-colors">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            USD Wallet
          </span>

          <FiChevronDown size={14} className="text-gray-400" />
        </button>
        </>
        )}
      </div>
    </section>

    {/* ── Main grid: lg:8/4 ───────────────────────────────────────────── */}
    <section className="grid grid-cols-12 gap-4">
      {/* LEFT — Recent payments table */}
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <p className="text-[12px] text-gray-400 mt-0.5">
              Latest outgoing transfers and payouts
            </p>
          </div>
          <button className="text-[12px] text-gray-400 hover:text-gray-700 font-medium transition-colors">
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-left border-b border-gray-50">
                {["Recipient", "Amount", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors last:border-b-0"
                >
                  {/* Recipient */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-600">
                        {payment.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">
                          {payment.name}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                          {payment.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Amount */}
                  <td className="px-5 py-4 text-[13px] font-semibold text-gray-900 tabular-nums">
                    {payment.amount}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                        statusStyles[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  {/* Action */}
                  <td className="px-5 py-4">
                    <button className="h-8 w-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                      <FiChevronRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4 space-y-4">
        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>

          <div className="space-y-2">
            {[
              { label: "Send Payment", desc: "Transfer to a recipient" },
              { label: "Bulk Payout", desc: "Pay multiple at once" },
              { label: "Manage Cards", desc: "Add or update cards" },
            ].map((action) => (
              <button
                key={action.label}
                className="group w-full flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <div className="text-left">
                  <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                    {action.desc}
                  </p>
                </div>
                <FiArrowUpRight
                  size={14}
                  className="text-gray-400 group-hover:text-gray-700 transition-colors flex-shrink-0"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Wallet Details */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
            Wallet Details
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">Wallet ID</span>
              <span className="text-[13px] font-medium text-gray-900 tabular-nums">
                WAL-482194
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">Currency</span>
              <span className="text-[13px] font-medium text-gray-900">USD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">Status</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-[13px] text-gray-400">Created</span>
              <span className="text-[13px] font-medium text-gray-900">
                Jan 15, 2024
              </span>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </DashboardShell>
  )
}

export default PersonalPay
