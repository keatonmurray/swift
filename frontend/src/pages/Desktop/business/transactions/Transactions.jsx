import React from "react"
import { FiSearch, FiDownload, FiChevronDown, FiChevronRight } from "react-icons/fi"
import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const transactions = [
  {
    date: "May 30, 2025",
    time: "10:24 AM",
    description: "Monthly Payroll \u2013 May 2025",
    sub: "Payroll for 18 employees",
    country: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    amount: "$80,700.00",
    status: "Completed",
  },
  {
    date: "May 30, 2025",
    time: "09:15 AM",
    description: "Tax Payment \u2013 May 2025",
    sub: "Federal income tax",
    country: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    amount: "-$18,250.00",
    status: "Completed",
  },
  {
    date: "May 29, 2025",
    time: "04:45 PM",
    description: "Benefits Payment \u2013 May 2025",
    sub: "Health insurance premium",
    country: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    amount: "-$6,450.00",
    status: "Completed",
  },
  {
    date: "May 28, 2025",
    time: "11:30 AM",
    description: "Contractor Payment",
    sub: "Invoice #INV-2045",
    country: "United Kingdom",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    amount: "-$2,400.00",
    status: "Completed",
  },
  {
    date: "May 27, 2025",
    time: "02:10 PM",
    description: "Employee Reimbursement",
    sub: "Travel expenses",
    country: "Canada",
    flag: "\uD83C\uDDE8\uD83C\uDDE6",
    amount: "-$320.00",
    status: "Completed",
  },
  {
    date: "May 26, 2025",
    time: "10:05 AM",
    description: "Monthly Payroll \u2013 Germany",
    sub: "Payroll for 22 employees",
    country: "Germany",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    amount: "\u20AC48,600.00",
    status: "Completed",
  },
]

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Pending:   "bg-amber-50  text-amber-700  border border-amber-100",
  Failed:    "bg-red-50    text-red-700    border border-red-100",
}

const summaryStatuses = [
  { label: "Completed", count: 128, color: "bg-emerald-500" },
  { label: "Pending",   count: 10,  color: "bg-amber-500"   },
  { label: "Failed",    count: 4,   color: "bg-red-500"     },
]

const recentActivity = [
  { title: "Payroll completed",          amount: "$80,700.00", time: "10:24 AM", color: "bg-emerald-500" },
  { title: "Payroll pending approval",   amount: "$92,500.00", time: "09:15 AM", color: "bg-amber-500"   },
  { title: "Payment failed",             amount: "$1,200.00",  time: "04:45 PM", color: "bg-red-500"     },
]

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Transactions = () => (
  <DashboardShell
    title="Transactions"
    subtitle="Track and manage all your payroll transactions"
  >
    {/* ── Toolbar: search + filters + export ─────────────────────────── */}
    <div className="flex flex-wrap items-center gap-2 mb-5">

      {/* Search */}
      <div className="flex items-center gap-2 h-9 bg-white border border-gray-200 rounded-full px-3 w-[220px]">
        <FiSearch size={13} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400 min-w-0"
        />
      </div>

      {/* Filter pills */}
      {["All Transactions", "May 1 \u2013 May 31, 2025", "All Countries", "All Statuses"].map((item) => (
        <button
          key={item}
          className="inline-flex items-center gap-1.5 h-9 text-[12px] text-gray-600 bg-white border border-gray-200 rounded-full px-3 hover:bg-gray-50 transition-colors"
        >
          {item}
          <FiChevronDown size={11} className="text-gray-400" />
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Export */}
      <button className="inline-flex items-center gap-1.5 h-9 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-full px-4 hover:bg-gray-50 transition-colors">
        <FiDownload size={12} />
        Export
      </button>
    </div>

    {/* ── Main grid: lg:8/4 ───────────────────────────────────────────── */}
    <section className="grid grid-cols-12 gap-4">

      {/* LEFT — table */}
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-left border-b border-gray-50">
                {["Date", "Description", "Country", "Amount", "Status", ""].map((h) => (
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
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  {/* Date */}
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-medium text-gray-800 leading-tight">{t.date}</p>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{t.time}</p>
                  </td>
                  {/* Description */}
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-medium text-gray-800 leading-tight">{t.description}</p>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{t.sub}</p>
                  </td>
                  {/* Country */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500">
                      <span className="text-base">{t.flag}</span>
                      {t.country}
                    </span>
                  </td>
                  {/* Amount */}
                  <td className="px-5 py-4 text-[13px] font-semibold text-gray-900 tabular-nums">
                    {t.amount}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                  {/* Arrow */}
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

        {/* Table footer — pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
          <p className="text-[12px] text-gray-400">Showing 1 to 6 of 142 transactions</p>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`h-8 w-8 flex items-center justify-center rounded-xl text-[12px] font-medium transition-colors ${
                  page === 1
                    ? "bg-black text-white"
                    : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="col-span-12 lg:col-span-4 space-y-4">

        {/* Transaction Summary */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <h3 className="text-[14px] font-semibold text-gray-900 mb-0.5">Transaction Summary</h3>
          <p className="text-[12px] text-gray-400 mb-4">May 1 \u2013 May 31, 2025</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">Total Volume</span>
              <span className="text-[14px] font-semibold text-gray-900 tabular-nums">$389,750.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-gray-400">Total Transactions</span>
              <span className="text-[14px] font-semibold text-gray-900 tabular-nums">142</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-3">
            {summaryStatuses.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 ${item.color}`} />
                  <span className="text-[13px] text-gray-600">{item.label}</span>
                </div>
                <span className="text-[13px] font-medium text-gray-900 tabular-nums">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${item.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-gray-800 leading-snug">{item.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 tabular-nums">{item.amount}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 flex-shrink-0">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </aside>
    </section>
  </DashboardShell>
)

export default Transactions