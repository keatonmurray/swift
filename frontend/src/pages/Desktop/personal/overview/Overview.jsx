import {
  Bell,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  CreditCard,
  FileText,
  Home,
  Landmark,
  Menu,
  Search,
  Settings,
  Sparkles,
  Users,
  Wallet,
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

const userId = localStorage.getItem("user_id");


// const spendTrend = [
//   { month: "Dec 2024", amount: 58000 },
//   { month: "Jan 2025", amount: 45000 },
//   { month: "Feb 2025", amount: 59000 },
//   { month: "Mar 2025", amount: 80000 },
//   { month: "Apr 2025", amount: 75000 },
//   { month: "May 2025", amount: 89000 },
// ]

// const payrollStatus = [
//   { name: "Completed", value: 12, color: "#22c55e" },
//   { name: "Scheduled", value: 4, color: "#4f46e5" },
//   { name: "Draft", value: 2, color: "#e5e7eb" },
// ]

// const payrolls = [
//   {
//     date: "May 30, 2025",
//     name: "Monthly Payroll – May 2025",
//     amount: "$80,700.00",
//     employees: 18,
//     status: "Scheduled",
//   },
//   {
//     date: "Apr 30, 2025",
//     name: "Monthly Payroll – Apr 2025",
//     amount: "$78,150.00",
//     employees: 18,
//     status: "Completed",
//   },
//   {
//     date: "Mar 31, 2025",
//     name: "Monthly Payroll – Mar 2025",
//     amount: "$75,600.00",
//     employees: 17,
//     status: "Completed",
//   },
//   {
//     date: "Feb 28, 2025",
//     name: "Monthly Payroll – Feb 2025",
//     amount: "$73,200.00",
//     employees: 17,
//     status: "Completed",
//   },
//   {
//     date: "Jan 31, 2025",
//     name: "Monthly Payroll – Jan 2025",
//     amount: "$72,100.00",
//     employees: 16,
//     status: "Completed",
//   },
// ]

const notifications = [
  {
    title: "Payroll for April 30, 2025 was approved",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    title: "New employee Emma Williams added",
    time: "5 hours ago",
    color: "bg-indigo-500",
  },
]

const sidebarItems = [
  { label: "Overview", icon: Home, active: true },
  { label: "Accounts", icon: Wallet },
  { label: "Transactions", icon: Landmark },
  { label: "Payments", icon: CreditCard },
  { label: "Payouts", icon: Wallet },
  { label: "Payroll", icon: Users },
  { label: "Reports", icon: FileText },
  { label: "AI Insights", icon: Sparkles },
  { label: "Automations", icon: Sparkles },
  { label: "Recipients", icon: Users },
  { label: "Settings", icon: Settings },
]

const StatCard = ({ title, value, subtitle, icon, iconBg }) => {
  const Icon = icon

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>

          <h3 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
            {value}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon className="h-6 w-6 text-zinc-900" />
        </div>
      </div>
    </div>
  )
}

const Overview = () => {

   // STATE DECLARATIONS
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [walletTransactions, setWalletTransactions] = useState([])

  // ---------------- RETRIEVE WALLET ----------------
  const handleRetrieveWallet = async () => {
    const token = localStorage.getItem("api_token")

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setWallet(response.data.data.wallet_rapyd)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      handleRetrieveWallet()
    }
  }, [userId])

  // ---------------- TOTAL BALANCE ----------------
  const totalBalance =
    wallet?.accounts?.reduce(
      (sum, account) => sum + Number(account.balance || 0),
      0
    ) || 0

  console.log("Total Balance:", totalBalance)

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

      setWalletTransactions(response.data.transactions)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWalletTransactions()
    }
  }, [userId])

  // ---------------- FORMAT TRANSACTIONS ----------------
  const transactions = walletTransactions.map((transaction) => ({
    name: transaction.type
      ?.replaceAll("_", " ")
      ?.replace(/\b\w/g, (char) => char.toUpperCase()),

    initials: transaction.currency,

    time: new Date(
      transaction.created_at * 1000
    ).toLocaleString(),

    amount: `${
      transaction.type?.includes("in") ? "+" : "-"
    }$${Number(transaction.amount).toLocaleString()}`,

    color: transaction.type?.includes("in")
      ? "#D4EDDA"
      : "#F8D7DA",
  }))

  const payrolls = transactions.map((transaction) => ({
    date: transaction.time,

    name: transaction.name,

    amount: transaction.amount,

    currency: transaction.initials,

    status:
      transaction.amount.includes("+")
        ? "Received"
        : "Sent",

    color: transaction.color,
  }))

  // ===============================
  // FINANCIAL STATUS CALCULATION
  // ===============================

  const totalTransactions = payrolls.length

  const receivedTransactions = payrolls.filter(
    (p) => p.status === "Received"
  ).length

  const sentTransactions = payrolls.filter(
    (p) => p.status === "Sent"
  ).length

  // Convert amount string to number
  const parseAmount = (amount) => {
    return parseFloat(
      amount.replace(/[^\d.-]/g, "")
    ) || 0
  }

  const totalReceived = payrolls
    .filter((p) => p.status === "Received")
    .reduce((sum, p) => sum + parseAmount(p.amount), 0)

  const totalSent = payrolls
    .filter((p) => p.status === "Sent")
    .reduce((sum, p) => sum + parseAmount(p.amount), 0)

  // Health score logic
  let financialScore = 0

  // Positive incoming cashflow
  if (totalReceived > totalSent) {
    financialScore += 4
  } else if (totalReceived === totalSent) {
    financialScore += 2
  } else {
    financialScore += 1
  }

  // Transaction activity
  if (totalTransactions >= 15) {
    financialScore += 3
  } else if (totalTransactions >= 8) {
    financialScore += 2
  } else if (totalTransactions >= 3) {
    financialScore += 1
  }

  // Ratio of received transactions
  const receiveRatio =
    totalTransactions > 0
      ? receivedTransactions / totalTransactions
      : 0

  if (receiveRatio >= 0.6) {
    financialScore += 3
  } else if (receiveRatio >= 0.4) {
    financialScore += 2
  } else {
    financialScore += 1
  }

  // Cap at 10
  financialScore = Math.min(financialScore, 10)

  // Rating label
  let financialLabel = "Poor"

  if (financialScore >= 9) {
    financialLabel = "Excellent"
  } else if (financialScore >= 7) {
    financialLabel = "Good"
  } else if (financialScore >= 5) {
    financialLabel = "Average"
  } else if (financialScore >= 3) {
    financialLabel = "Weak"
  }

  // Rating color
  let financialIconBg = "bg-red-100"

  if (financialScore >= 9) {
    financialIconBg = "bg-emerald-100"
  } else if (financialScore >= 7) {
    financialIconBg = "bg-blue-100"
  } else if (financialScore >= 5) {
    financialIconBg = "bg-yellow-100"
  }

  // =================================
  // CARD
  // =================================


  // ---------------- SPEND TREND ----------------
  const spendTrend = walletTransactions.reduce((acc, transaction) => {
    const month = new Date(
      transaction.created_at * 1000
    ).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    })

    const existingMonth = acc.find(
      (item) => item.month === month
    )

    if (existingMonth) {
      existingMonth.amount += Number(transaction.amount || 0)
    } else {
      acc.push({
        month,
        amount: Number(transaction.amount || 0),
      })
    }

    return acc
  }, [])

  // ---------------- PAYROLL STATUS ----------------
  const payrollStatus = [
    {
      name: "Received",
      value: transactions.filter((t) =>
        t.amount.includes("+")
      ).length,
      color: "#22c55e",
    },

    {
      name: "Sent",
      value: transactions.filter((t) =>
        t.amount.includes("-")
      ).length,
      color: "#ef4444",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="flex">
        {/* MAIN */}
        <main className="flex-1">
          {/* HEADER */}
          <div className="border-b border-zinc-200 bg-white px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white lg:hidden">
                  <Menu className="h-5 w-5" />
                </button>

                <div>
                  <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
                    Overview
                  </h1>

                  <p className="mt-1 text-base text-zinc-500">
                    Get a summary of your payroll operations
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-[360px]">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-20 text-[15px] outline-none transition-all focus:border-zinc-400"
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-500">
                    ⌘ K
                  </div>
                </div>

                <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
                  <Bell className="h-5 w-5 text-zinc-700" />
                </button>

                <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-6 p-5 sm:p-8">
            {/* STATS */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Payroll Amount"
                value={`$${totalBalance.toLocaleString()}`}
                subtitle="Total income"
                icon={Users}
                iconBg="bg-indigo-100"
              />

              <StatCard
                title="This Month's Payrolls"
                value="2"
                subtitle="May 1 – May 31, 2025"
                icon={Wallet}
                iconBg="bg-green-100"
              />
              
              <StatCard
                title="Upcoming Payroll"
                value="May 30, 2025"
                subtitle="2 days from now"
                icon={Wallet}
                iconBg="bg-green-100"
              />

              <StatCard
                title="Financial Status"
                value={`${financialScore}/10`}
                subtitle={financialLabel}
                icon={TbReportAnalytics}
                iconBg={financialIconBg}
              />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              {/* LEFT */}
              <div className="space-y-6 xl:col-span-9">
                {/* CHARTS */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* TREND */}
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 lg:col-span-8">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-zinc-900">
                        Income Overview
                      </h2>

                      {/* <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
                        Last 6 months
                        <ChevronDown className="h-4 w-4" />
                      </button> */}
                    </div>

                    <div className="h-[340px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendTrend}>
                          <defs>
                            <linearGradient
                              id="colorAmount"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#4f46e5"
                                stopOpacity={0.25}
                              />

                              <stop
                                offset="95%"
                                stopColor="#4f46e5"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>

                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e4e4e7"
                          />

                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <YAxis
                            tickFormatter={(value) => `$${value / 1000}K`}
                            tick={{ fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <Tooltip />

                          <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#4f46e5"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 lg:col-span-4">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                      Transaction Status
                    </h2>

                    <div className="mt-8 flex flex-col items-center">
                      <div className="relative h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={payrollStatus}
                              dataKey="value"
                              innerRadius={65}
                              outerRadius={90}
                              paddingAngle={4}
                            >
                              {payrollStatus.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <h3 className="text-5xl font-bold text-zinc-900">
                            {transactions.length}
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            Total Transactions
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 w-full space-y-4">
                        {payrollStatus.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />

                              <span className="text-sm font-medium text-zinc-700">
                                {item.name}
                              </span>
                            </div>

                            <span className="text-sm text-zinc-500">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* TABLE */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-zinc-900">
                      Recent Payrolls
                    </h2>

                    <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700">
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px]">
                      <thead>
                        <tr className="border-b border-zinc-200">
                          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Transaction Date
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Transaction Type
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Total Amount
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Currencies
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {payrolls.map((payroll) => (
                          <tr
                            key={payroll.date}
                            className="border-b border-zinc-100 transition-all hover:bg-zinc-50"
                          >
                            <td className="px-4 py-5 text-[15px] font-medium text-zinc-800">
                              {payroll.date}
                            </td>

                            <td className="px-4 py-5 text-[15px] text-zinc-700">
                              {payroll.name}
                            </td>

                            <td className="px-4 py-5 text-[15px] font-medium text-zinc-800">
                              {payroll.amount}
                            </td>

                            <td className="px-4 py-5 text-[15px] text-zinc-700">
                              {payroll.currency}
                            </td>

                            <td className="px-4 py-5">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  payroll.status === "Received"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {payroll.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6 xl:col-span-3">
                {/* AI INSIGHTS */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-500" />

                      <h2 className="text-xl font-semibold text-zinc-900">
                        AI Insights
                      </h2>
                    </div>

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Beta
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-zinc-500">
                    Here's what AI found for you.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                      <div className="flex gap-3">
                        <CircleCheck className="mt-0.5 h-5 w-5 text-green-600" />

                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900">
                            Payroll is on track
                          </h3>

                          <p className="mt-1 text-sm text-zinc-600">
                            All scheduled payrolls are on track for this
                            month.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
                      <div className="flex gap-3">
                        <CircleAlert className="mt-0.5 h-5 w-5 text-orange-500" />

                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900">
                            3 employees have changes
                          </h3>

                          <p className="mt-1 text-sm text-zinc-600">
                            Review salary or details changes before May
                            30 payroll.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* APPROVALS */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900">
                        Approvals
                      </h2>

                      <h3 className="mt-3 text-5xl font-bold tracking-tight text-zinc-900">
                        2
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Pending Approvals
                      </p>
                    </div>

                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200">
                      →
                    </button>
                  </div>
                </div>

                {/* AUDIT */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900">
                        Audit Logs
                      </h2>

                      <h3 className="mt-3 text-5xl font-bold tracking-tight text-zinc-900">
                        12
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Activities this week
                      </p>
                    </div>

                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200">
                      →
                    </button>
                  </div>
                </div>

                {/* NOTIFICATIONS */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-zinc-900">
                      Notifications
                    </h2>

                    <button className="text-sm font-semibold text-indigo-600">
                      View all
                    </button>
                  </div>

                  <div className="space-y-5">
                    {notifications.map((notification) => (
                      <div
                        key={notification.title}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`mt-1 h-3 w-3 rounded-full ${notification.color}`}
                        />

                        <div>
                          <p className="text-sm font-medium leading-6 text-zinc-800">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Overview