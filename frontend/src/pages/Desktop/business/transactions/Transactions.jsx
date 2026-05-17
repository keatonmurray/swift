import React from "react"
import {
  FiSearch,
  FiDownload,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi"

const transactions = [
  {
    date: "May 30, 2025",
    time: "10:24 AM",
    description: "Monthly Payroll – May 2025",
    sub: "Payroll for 18 employees",
    country: "United States",
    flag: "🇺🇸",
    amount: "$80,700.00",
    status: "Completed",
  },
  {
    date: "May 30, 2025",
    time: "09:15 AM",
    description: "Tax Payment – May 2025",
    sub: "Federal income tax",
    country: "United States",
    flag: "🇺🇸",
    amount: "-$18,250.00",
    status: "Completed",
  },
  {
    date: "May 29, 2025",
    time: "04:45 PM",
    description: "Benefits Payment – May 2025",
    sub: "Health insurance premium",
    country: "United States",
    flag: "🇺🇸",
    amount: "-$6,450.00",
    status: "Completed",
  },
  {
    date: "May 28, 2025",
    time: "11:30 AM",
    description: "Contractor Payment",
    sub: "Invoice #INV-2045",
    country: "United Kingdom",
    flag: "🇬🇧",
    amount: "-$2,400.00",
    status: "Completed",
  },
  {
    date: "May 27, 2025",
    time: "02:10 PM",
    description: "Employee Reimbursement",
    sub: "Travel expenses",
    country: "Canada",
    flag: "🇨🇦",
    amount: "-$320.00",
    status: "Completed",
  },
  {
    date: "May 26, 2025",
    time: "10:05 AM",
    description: "Monthly Payroll – Germany",
    sub: "Payroll for 22 employees",
    country: "Germany",
    flag: "🇩🇪",
    amount: "€48,600.00",
    status: "Completed",
  },
]

const statusStyles = {
  Completed:
    "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border border-amber-100",
  Failed: "bg-red-50 text-red-600 border border-red-100",
}

const Transactions = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
              Transactions
            </h1>

            <p className="mt-2 text-lg text-[#6b7280]">
              Track and manage all your payroll transactions
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            {/* Search */}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 shadow-sm">
              <FiSearch className="text-[20px] text-[#9ca3af]" />

              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-transparent text-base outline-none placeholder:text-[#9ca3af] sm:w-[260px]"
              />
            </div>

            {/* Export */}
            <button className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#111111] shadow-sm transition hover:bg-[#fafafa]">
              <FiDownload className="text-[18px]" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            "All Transactions",
            "May 1 – May 31, 2025",
            "All Countries",
            "All Statuses",
          ].map((item) => (
            <button
              key={item}
              className="flex h-14 items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#374151] shadow-sm transition hover:bg-[#fafafa]"
            >
              {item}
              <FiChevronDown className="text-[18px]" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
          {/* Table */}
          <div className="overflow-hidden rounded-[28px] border border-[#ececec] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#f1f1f1]">
                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Date
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Description
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Country
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Amount
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Status
                    </th>

                    <th className="w-[60px]" />
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#f5f5f5] transition hover:bg-[#fafafa]"
                    >
                      <td className="px-8 py-6">
                        <div className="text-base font-medium text-[#111111]">
                          {transaction.date}
                        </div>

                        <div className="mt-1 text-base text-[#9ca3af]">
                          {transaction.time}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="text-base font-medium text-[#111111]">
                          {transaction.description}
                        </div>

                        <div className="mt-1 text-base text-[#9ca3af]">
                          {transaction.sub}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-base text-[#374151]">
                          <span className="text-[20px]">
                            {transaction.flag}
                          </span>

                          {transaction.country}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="text-base font-medium text-[#111111]">
                          {transaction.amount}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                            statusStyles[transaction.status]
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececec] text-[#6b7280] transition hover:bg-[#fafafa]">
                          <FiChevronRight className="text-[18px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-[#f3f4f6] px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-[#6b7280]">
                Showing 1 to 6 of 142 transactions
              </p>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-medium transition ${
                      page === 1
                        ? "bg-[#111111] text-white"
                        : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#fafafa]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Transaction Summary
              </h3>

              <p className="mt-2 text-base text-[#9ca3af]">
                May 1 – May 31, 2025
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Total Volume
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    $389,750.00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Total Transactions
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    142
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-[#f3f4f6] pt-6">
                <div className="space-y-4">
                  {[
                    {
                      label: "Completed",
                      count: 128,
                      color: "bg-emerald-500",
                    },
                    {
                      label: "Pending",
                      count: 10,
                      color: "bg-amber-500",
                    },
                    {
                      label: "Failed",
                      count: 4,
                      color: "bg-red-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                        />

                        <span className="text-base text-[#374151]">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-base font-medium text-[#111111]">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                  Recent Activity
                </h3>

                <button className="text-base font-medium text-[#5b5cf0]">
                  View all
                </button>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "Payroll completed",
                    amount: "$80,700.00",
                    time: "10:24 AM",
                    color: "bg-emerald-500",
                  },
                  {
                    title: "Payroll pending approval",
                    amount: "$92,500.00",
                    time: "09:15 AM",
                    color: "bg-amber-500",
                  },
                  {
                    title: "Payment failed",
                    amount: "$1,200.00",
                    time: "04:45 PM",
                    color: "bg-red-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`}
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-medium text-[#111111]">
                            {item.title}
                          </p>

                          <p className="mt-1 text-base text-[#9ca3af]">
                            {item.amount}
                          </p>
                        </div>

                        <span className="text-sm text-[#9ca3af]">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions