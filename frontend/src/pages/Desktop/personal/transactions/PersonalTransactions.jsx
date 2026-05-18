import React, { useEffect, useState } from "react"
import {
  FiSearch,
  FiDownload,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi"

import axios from "axios"
import DashboardShell from "../../components/DashboardShell"

const userId = localStorage.getItem("user_id")

const statusStyles = {
  Completed:
    "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border border-amber-100",
  Failed: "bg-red-50 text-red-600 border border-red-100",
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
    <DashboardShell
      title="Transactions"
      subtitle="Track and manage all your wallet transactions"
      actions={
        <>
          {/* Search */}
          <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4">
            <FiSearch className="text-[20px] text-[#9ca3af]" />

            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-transparent text-base outline-none placeholder:text-[#9ca3af] sm:w-[260px]"
            />
          </div>

          {/* Export */}
          <button className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#111111] transition hover:bg-[#fafafa]">
            <FiDownload className="text-[18px]" />
            Export
          </button>
        </>
      }
    >
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
            className="flex h-14 items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#374151] transition hover:bg-[#fafafa]"
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

                  <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                    Status
                  </th>

                  <th className="w-[60px]" />
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

              {recentActivities.length === 0 && (
                <p className="text-base text-[#9ca3af]">
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default PersonalTransactions