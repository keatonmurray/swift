import {
  CircleAlert,
  CircleCheck,
  Sparkles,
  Users,
  Wallet,
  ChevronDown,
  ArrowRight,
} from "lucide-react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { TbReportAnalytics } from "react-icons/tb"
import { useState, useEffect } from "react"
import axios from "axios"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -------------------------------------------------------------------------- */
/*  Stat card                                                                  */
/* -------------------------------------------------------------------------- */

const StatCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-gray-500 leading-none mb-2">{title}</p>
      <p className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2 truncate">
        {value}
      </p>
      <p className="text-[12px] text-gray-400">{subtitle}</p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={18} className={iconColor} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Notifications (static)                                                     */
/* -------------------------------------------------------------------------- */

const notifications = [
  { title: "Deposit received from employer", time: "2 hours ago", color: "bg-emerald-500" },
  { title: "Subscription renewed – Spotify", time: "5 hours ago", color: "bg-indigo-500" },
]

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Overview = () => {
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [walletTransactions, setWalletTransactions] = useState([])

  const userId = localStorage.getItem("user_id")

  // Retrieve wallet
  const handleRetrieveWallet = async () => {
    const token = localStorage.getItem("api_token")
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWallet(response.data.data.wallet_rapyd)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch transactions
  const fetchWalletTransactions = async () => {
    try {
      const token = localStorage.getItem("api_token")
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWalletTransactions(response.data.transactions || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userId) {
      handleRetrieveWallet()
      fetchWalletTransactions()
    }
  }, [userId])

  // Total balance
  const totalBalance =
    wallet?.accounts?.reduce(
      (sum, account) => sum + Number(account.balance || 0),
      0
    ) || 0

  // Format transactions
  const transactions = walletTransactions.map((transaction) => {
    const numericAmount = Number(transaction.amount || 0)

    // Positive = received
    // Negative = sent
    const isIncoming = numericAmount > 0

    return {
      id: transaction.id,

      name:
        transaction.type
          ?.replaceAll("_", " ")
          ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Transaction",

      initials: transaction.currency?.toUpperCase() || "USD",

      time: new Date(transaction.created_at * 1000).toLocaleString(),

      amount: `${isIncoming ? "+" : "-"}$${Math.abs(
        numericAmount
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,

      rawAmount: numericAmount,

      isIncoming,
    }
  })

  const payrolls = transactions.map((t) => ({
    date: t.time,
    name: t.name,
    amount: t.amount,
    rawAmount: t.rawAmount,
    currency: t.initials,
    status: t.isIncoming ? "Received" : "Sent",
  }))

  // Financial score
  const totalTransactions = payrolls.length

  const receivedCount = payrolls.filter(
    (p) => p.rawAmount > 0
  ).length

  const sentCount = payrolls.filter(
    (p) => p.rawAmount < 0
  ).length

  const totalReceived = payrolls
    .filter((p) => p.rawAmount > 0)
    .reduce((sum, p) => sum + Math.abs(p.rawAmount), 0)

  const totalSent = payrolls
    .filter((p) => p.rawAmount < 0)
    .reduce((sum, p) => sum + Math.abs(p.rawAmount), 0)

  let financialScore = 0

  if (totalReceived > totalSent) financialScore += 4
  else if (totalReceived === totalSent) financialScore += 2
  else financialScore += 1

  if (totalTransactions >= 15) financialScore += 3
  else if (totalTransactions >= 8) financialScore += 2
  else if (totalTransactions >= 3) financialScore += 1

  const receiveRatio =
    totalTransactions > 0 ? receivedCount / totalTransactions : 0

  if (receiveRatio >= 0.6) financialScore += 3
  else if (receiveRatio >= 0.4) financialScore += 2
  else financialScore += 1

  financialScore = Math.min(financialScore, 10)

  let financialLabel = "Poor"

  if (financialScore >= 9) financialLabel = "Excellent"
  else if (financialScore >= 7) financialLabel = "Good"
  else if (financialScore >= 5) financialLabel = "Average"
  else if (financialScore >= 3) financialLabel = "Weak"

  let financialIconBg = "bg-red-50"
  let financialIconColor = "text-red-500"

  if (financialScore >= 9) {
    financialIconBg = "bg-emerald-50"
    financialIconColor = "text-emerald-500"
  } else if (financialScore >= 7) {
    financialIconBg = "bg-sky-50"
    financialIconColor = "text-sky-500"
  } else if (financialScore >= 5) {
    financialIconBg = "bg-amber-50"
    financialIconColor = "text-amber-500"
  }

  // Spend trend
  const spendTrend = walletTransactions.reduce((acc, transaction) => {
    const month = new Date(transaction.created_at * 1000).toLocaleString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    )

    const existing = acc.find((item) => item.month === month)

    if (existing) {
      existing.amount += Number(transaction.amount || 0)
    } else {
      acc.push({
        month,
        amount: Number(transaction.amount || 0),
      })
    }

    return acc
  }, [])

  // Transaction status for donut
  const transactionStatus = [
    {
      name: "Received",
      value: transactions.filter((t) => t.rawAmount > 0).length,
      color: "#22c55e",
    },
    {
      name: "Sent",
      value: transactions.filter((t) => t.rawAmount < 0).length,
      color: "#6366f1",
    },
  ]

  return (
    <DashboardShell
      title="Overview"
      subtitle="Your personal financial summary"
    >
      {/* ── Stat cards ─────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <StatCard
          title="Total Balance"
          value={`$${totalBalance.toLocaleString()}`}
          subtitle="All accounts"
          icon={Wallet}
          iconBg="bg-violet-50"
          iconColor="text-violet-500"
        />
        <StatCard
          title="Total Transactions"
          value={String(totalTransactions)}
          subtitle={`${receivedCount} in · ${sentCount} out`}
          icon={Users}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="Currencies"
          value={String(wallet?.accounts?.length || 0)}
          subtitle="Active accounts"
          icon={Wallet}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatCard
          title="Financial Score"
          value={`${financialScore}/10`}
          subtitle={financialLabel}
          icon={TbReportAnalytics}
          iconBg={financialIconBg}
          iconColor={financialIconColor}
        />
      </section>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {/* Charts row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Income trend */}
            <div className="col-span-12 lg:col-span-7 bg-white border border-gray-200 rounded-[20px] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[14px] font-semibold text-gray-900">
                  Income Overview
                </h2>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={spendTrend}
                    margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `$${v / 1000}K`}
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                      }}
                      formatter={(v) => [`$${v.toLocaleString()}`, "Amount"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAmt)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transaction status donut */}
            <div className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-[20px] p-5">
              <h2 className="text-[14px] font-semibold text-gray-900 mb-3">
                Transaction Status
              </h2>
              <div className="relative h-[130px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={transactionStatus}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={58}
                      paddingAngle={3}
                    >
                      {transactionStatus.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[20px] font-bold text-gray-900 leading-none">
                    {transactions.length}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Total</p>
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                {transactionStatus.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[13px] text-gray-600">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[13px] text-gray-400 tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent transactions table */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-gray-900">
                Recent Transactions
              </h2>
              <button className="text-[12px] text-gray-400 hover:text-gray-700 font-medium transition-colors">
                View all
              </button>
            </div>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-left">
                    {["Date", "Type", "Amount", "Currency", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="pb-3 pr-6 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {payrolls.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-[13px] text-gray-400"
                      >
                        No transactions yet
                      </td>
                    </tr>
                  ) : (
                    payrolls.slice(0, 5).map((p, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="py-3 pr-6 text-[13px] text-gray-400 whitespace-nowrap">
                          {p.date}
                        </td>
                        <td className="py-3 pr-6 text-[13px] text-gray-800 font-medium">
                          {p.name}
                        </td>
                        <td className="py-3 pr-6 text-[13px] font-semibold text-gray-900 tabular-nums">
                          {p.amount}
                        </td>
                        <td className="py-3 pr-6 text-[13px] text-gray-400">
                          {p.currency}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                              p.status === "Received"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-indigo-50 text-indigo-700"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          {/* AI Insights */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[14px] font-semibold text-gray-900 flex items-center gap-1.5">
                <Sparkles size={14} className="text-violet-500" />
                AI Insights
              </h2>
              <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2 py-0.5">
                Beta
              </span>
            </div>
            <p className="text-[12px] text-gray-400 mb-4">
              Here&apos;s what AI found for you.
            </p>
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <div className="flex items-start gap-2.5">
                  <CircleCheck
                    size={14}
                    className="text-emerald-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900 leading-snug">
                      Finances are healthy
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      Your income exceeds spending this month.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <div className="flex items-start gap-2.5">
                  <CircleAlert
                    size={14}
                    className="text-amber-500 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-gray-900 leading-snug">
                      Subscription renewal coming
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      3 subscriptions renew in the next 7 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-gray-900 mb-3">
                  Total Received
                </h2>
                <p className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">
                  ${totalReceived.toLocaleString()}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  {receivedCount} transactions
                </p>
              </div>
              <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[14px] font-semibold text-gray-900 mb-3">
                  Total Sent
                </h2>
                <p className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">
                  ${totalSent.toLocaleString()}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  {sentCount} transactions
                </p>
              </div>
              <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-gray-900">
                Notifications
              </h2>
              <button className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.title} className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${n.color}`}
                  />
                  <div>
                    <p className="text-[13px] font-medium text-gray-800 leading-snug">
                      {n.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {n.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  )
}

export default Overview
