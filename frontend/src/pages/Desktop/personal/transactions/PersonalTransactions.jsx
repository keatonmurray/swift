import React, { useEffect, useState } from "react"
import {
  FiSearch,
  FiDownload,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi"

import axios from "axios"

const userId = localStorage.getItem("user_id")

/* -------------------------------------------------------------------------- */
/*  Status styles                                                              */
/* -------------------------------------------------------------------------- */

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Pending:   "bg-amber-50  text-amber-700  border border-amber-100",
  Failed:    "bg-red-50    text-red-700    border border-red-100",
  Received:  "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Sent:      "bg-indigo-50  text-indigo-700  border border-indigo-100",
}

const PersonalTransactions = () => {
  const [walletTransactions, setWalletTransactions] = useState([])

  // ---------------- WALLET TRANSACTIONS ----------------
  const fetchWalletTransactions = async () => {
    try {
      const token = localStorage.getItem("api_token")

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("Wallet Transactions:", response.data.transactions)

      setWalletTransactions(response.data.transactions || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWalletTransactions()
    }
  }, [])

  // ---------------- FORMAT TRANSACTIONS ----------------
  const transactions = walletTransactions.map((transaction) => {
    // Detect incoming/outgoing
    const isIncoming =
      transaction.type?.includes("in") ||
      transaction.type === "add_funds"

    // Clean readable title
    const formattedName = transaction.type
      ?.replaceAll("_", " ")
      ?.replace(/\b\w/g, (char) => char.toUpperCase())

    // Format amount
    const formattedAmount = `${
      isIncoming ? "+" : "-"
    }${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: transaction.currency || "USD",
    }).format(Number(transaction.amount || 0))}`

    // Date
    const transactionDate = new Date(
      transaction.created_at * 1000
    )

    // Currency flags
    const currencyFlags = {
      USD: "🇺🇸",
      AUD: "🇦🇺",
      EUR: "🇪🇺",
      GBP: "🇬🇧",
      CAD: "🇨🇦",
      PHP: "🇵🇭",
      SGD: "🇸🇬",
      JPY: "🇯🇵",
    }

    return {
      id: transaction.id,

      date: transactionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      time: transactionDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      description: formattedName || "Wallet Transaction",

      sub: `Balance: ${new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: transaction.currency || "USD",
        }
      ).format(Number(transaction.balance || 0))}`,

      country: transaction.currency || "USD",

      flag:
        currencyFlags[transaction.currency] || "🌍",

      amount: formattedAmount,

      status:
        transaction.status === "CLOSED"
          ? "Completed"
          : transaction.status === "PENDING"
          ? "Pending"
          : "Failed",

      rawAmount: Number(transaction.amount || 0),

      isIncoming,
    }
  })

  // ---------------- PAYROLLS ----------------
  const payrolls = transactions.map((transaction) => ({
    date: transaction.time,

    name: transaction.description,

    amount: transaction.amount,

    currency: transaction.country,

    status: transaction.isIncoming
      ? "Received"
      : "Sent",
  }))

  // ---------------- SUMMARY ----------------
  const totalVolume = transactions.reduce(
    (sum, transaction) =>
      sum + transaction.rawAmount,
    0
  )

  const totalTransactions = transactions.length

  const completedTransactions =
    transactions.filter(
      (t) => t.status === "Completed"
    ).length

  const pendingTransactions =
    transactions.filter(
      (t) => t.status === "Pending"
    ).length

  const failedTransactions =
    transactions.filter(
      (t) => t.status === "Failed"
    ).length

  // ---------------- RECENT ACTIVITY ----------------
  const recentActivities = transactions
    .slice(0, 5)
    .map((transaction) => ({
      title: transaction.description,

      amount: transaction.amount,

      time: transaction.time,

      color:
        transaction.status === "Completed"
          ? "bg-emerald-500"
          : transaction.status === "Pending"
          ? "bg-amber-500"
          : "bg-red-500",
    }))

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
              Track and manage all your wallet transactions
            </p>
          </div>

  const summaryStatuses = [
    { label: "Received", count: received, color: "bg-emerald-500" },
    { label: "Sent",     count: sent,     color: "bg-indigo-500"  },
  ]

  const recentActivity = transactions.slice(0, 3).map((t) => ({
    title: t.description,
    amount: t.amount,
    time: t.time,
    color: t.status === "Received" ? "bg-emerald-500" : "bg-indigo-500",
  }))

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
            "Last 30 Days",
            "All Currencies",
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
                      Currency
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Amount
                    </th>

      {/* ── Main grid: lg:8/4 ───────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-4">
        {/* LEFT — table */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  {["Date", "Description", "Currency", "Amount", "Status", ""].map((h) => (
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
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-[13px] text-gray-400">
                      Loading transactions...
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id || index}
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
                      {/* Description */}
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">{t.description}</p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{t.sub}</p>
                      </td>
                      {/* Currency */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500">
                          {t.currency}
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div
                          className={`text-base font-semibold ${
                            transaction.isIncoming
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.amount}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                            statusStyles[
                              transaction.status
                            ]
                          }`}
                        >
                          {transaction.status}
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

                  {transactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-8 py-16 text-center text-lg text-[#9ca3af]"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-[#f3f4f6] px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-[#6b7280]">
                Showing 1 to {transactions.length} of{" "}
                {transactions.length} transactions
              </p>

              <div className="flex items-center gap-2">
                {[1].map((page) => (
                  <button
                    key={page}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-base font-medium text-white transition"
                  >
                    {page}
                  </button>
                ))}
              </div>
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
                Last 30 Days
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Total Volume
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    {new Intl.NumberFormat(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    ).format(totalVolume)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Total Transactions
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    {totalTransactions}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-[#f3f4f6] pt-6">
                <div className="space-y-4">
                  {[
                    {
                      label: "Completed",
                      count: completedTransactions,
                      color: "bg-emerald-500",
                    },
                    {
                      label: "Pending",
                      count: pendingTransactions,
                      color: "bg-amber-500",
                    },
                    {
                      label: "Failed",
                      count: failedTransactions,
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
                {recentActivities.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`}
                    />

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-[12px] text-gray-400">No recent activity</p>
              ) : (
                recentActivity.map((item, i) => (
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

                {recentActivities.length === 0 && (
                  <p className="text-base text-[#9ca3af]">
                    No recent activity
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  )
}

export default PersonalTransactions
