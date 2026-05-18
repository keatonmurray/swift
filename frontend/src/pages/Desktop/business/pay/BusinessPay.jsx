import React, { useEffect, useState } from "react"
import {
  FiSearch,
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiArrowUpRight,
  FiCreditCard,
  FiDollarSign,
  FiClock,
} from "react-icons/fi"
import {
  TransferMoneySkeleton,
  TransferStatsSkeleton,
} from "@/pages/Desktop/components/Skeleton"

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
]

const statusStyles = {
  Completed:
    "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border border-amber-100",
}

const BusinessPay = () => {
  // TODO: replace with real wallet fetch when wired
  const [walletLoading, setWalletLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setWalletLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
              Pay
            </h1>

            <p className="mt-2 text-lg text-[#6b7280]">
              Send payouts, manage balances, and track outgoing payments
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#111111] shadow-sm transition hover:bg-[#fafafa]">
              <FiSearch className="text-[18px]" />
              Search Payments
            </button>

            <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-base font-medium text-white shadow-sm transition hover:opacity-90">
              <FiPlus className="text-[18px]" />
              New Payment
            </button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* Wallet Card */}
          {walletLoading ? (
            <TransferMoneySkeleton />
          ) : (
          <div className="overflow-hidden rounded-[28px] bg-main-pallette p-8 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base text-zinc-400">
                  Primary Wallet Balance
                </p>

                <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em]">
                  $128,450.00
                </h2>

                <div className="mt-6 flex items-center gap-3">
                  <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                    USD Wallet
                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
                    +12.4% this month
                  </div>
                </div>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                <FiDollarSign className="text-[28px]" />
              </div>
            </div>

            {/* Credit Card */}
            <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Corporate Card
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-14 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-300" />

                    <span className="text-xl tracking-[0.25em]">
                      •••• 4821
                    </span>
                  </div>
                </div>

                <FiCreditCard className="text-[26px] text-zinc-300" />
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Card Holder
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    Acme Global Ltd.
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-400">
                    Expires
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    12 / 28
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Stats */}
          {walletLoading ? (
            <TransferStatsSkeleton />
          ) : (
          <div className="space-y-6">
            {/* Available */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base text-[#6b7280]">
                    Available Balance
                  </p>

                  <h3 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                    $96,240
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <FiArrowUpRight className="text-[24px] text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base text-[#6b7280]">
                    Pending Payments
                  </p>

                  <h3 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                    $12,840
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                  <FiClock className="text-[24px] text-amber-600" />
                </div>
              </div>
            </div>

            {/* Wallet Selector */}
            <button className="flex h-16 w-full items-center justify-between rounded-[28px] border border-[#ececec] bg-white px-6 text-base font-medium text-[#111111] shadow-sm transition hover:bg-[#fafafa]">
              USD Wallet

              <FiChevronDown className="text-[20px]" />
            </button>
          </div>
          )}
        </div>

        {/* Payments */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
          {/* Table */}
          <div className="overflow-hidden rounded-[28px] border border-[#ececec] bg-white shadow-sm">
            <div className="border-b border-[#f1f1f1] px-8 py-6">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Recent Payments
              </h3>

              <p className="mt-2 text-base text-[#6b7280]">
                Latest outgoing transfers and payouts
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#f1f1f1]">
                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Recipient
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
                  {recentPayments.map((payment, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#f5f5f5] transition hover:bg-[#fafafa]"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-base font-semibold text-zinc-700">
                            {payment.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>

                          <div>
                            <div className="text-base font-medium text-[#111111]">
                              {payment.name}
                            </div>

                            <div className="mt-1 text-base text-[#9ca3af]">
                              {payment.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="text-base font-medium text-[#111111]">
                          {payment.amount}
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                            statusStyles[payment.status]
                          }`}
                        >
                          {payment.status}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Quick Actions
              </h3>

              <div className="mt-6 space-y-4">
                <button className="flex h-16 w-full items-center justify-between rounded-2xl border border-[#ececec] px-5 text-base font-medium text-[#111111] transition hover:bg-[#fafafa]">
                  Send Payment

                  <FiArrowUpRight className="text-[20px]" />
                </button>

                <button className="flex h-16 w-full items-center justify-between rounded-2xl border border-[#ececec] px-5 text-base font-medium text-[#111111] transition hover:bg-[#fafafa]">
                  Bulk Payout

                  <FiArrowUpRight className="text-[20px]" />
                </button>

                <button className="flex h-16 w-full items-center justify-between rounded-2xl border border-[#ececec] px-5 text-base font-medium text-[#111111] transition hover:bg-[#fafafa]">
                  Manage Cards

                  <FiArrowUpRight className="text-[20px]" />
                </button>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Wallet Details
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Wallet ID
                  </span>

                  <span className="text-base font-medium text-[#111111]">
                    WAL-482194
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Currency
                  </span>

                  <span className="text-base font-medium text-[#111111]">
                    USD
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Status
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessPay