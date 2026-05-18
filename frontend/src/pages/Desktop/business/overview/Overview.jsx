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

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const spendTrend = [
  { month: "Dec 2024", amount: 58000 },
  { month: "Jan 2025", amount: 45000 },
  { month: "Feb 2025", amount: 59000 },
  { month: "Mar 2025", amount: 80000 },
  { month: "Apr 2025", amount: 75000 },
  { month: "May 2025", amount: 89000 },
]

const payrollStatus = [
  { name: "Completed", value: 12, color: "#22c55e" },
  { name: "Scheduled", value: 4,  color: "#4f46e5" },
  { name: "Draft",     value: 2,  color: "#e5e7eb" },
]

const payrolls = [
  { date: "May 30, 2025", name: "Monthly Payroll \u2013 May 2025", amount: "$80,700.00", employees: 18, status: "Scheduled" },
  { date: "Apr 30, 2025", name: "Monthly Payroll \u2013 Apr 2025", amount: "$78,150.00", employees: 18, status: "Completed" },
  { date: "Mar 31, 2025", name: "Monthly Payroll \u2013 Mar 2025", amount: "$75,600.00", employees: 17, status: "Completed" },
  { date: "Feb 28, 2025", name: "Monthly Payroll \u2013 Feb 2025", amount: "$73,200.00", employees: 17, status: "Completed" },
  { date: "Jan 31, 2025", name: "Monthly Payroll \u2013 Jan 2025", amount: "$72,100.00", employees: 16, status: "Completed" },
]

const notifications = [
  { title: "Payroll for April 30, 2025 was approved", time: "2 hours ago", color: "bg-green-500"  },
  { title: "New employee Emma Williams added",         time: "5 hours ago", color: "bg-indigo-500" },
]

/* -------------------------------------------------------------------------- */
/*  Stat card — matches established card style across the dashboard           */
/* -------------------------------------------------------------------------- */

const StatCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-gray-500 leading-none mb-2">{title}</p>
      <p className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2">{value}</p>
      <p className="text-[12px] text-gray-400">{subtitle}</p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={18} className={iconColor} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Overview = () => (
  <DashboardShell
    title="Overview"
    subtitle="Get a summary of your payroll operations"
  >
    {/* ── Stat cards ───────────────────────────────────────────────────── */}
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
      <StatCard
        title="Total Corporate Balance"
        value="$80,700.00"
        subtitle="18 employees \u00B7 6 countries"
        icon={Users}
        iconBg="bg-violet-50"
        iconColor="text-violet-500"
      />
      <StatCard
        title="This Month's Payrolls"
        value="2"
        subtitle="May 1 \u2013 May 31, 2025"
        icon={Wallet}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-500"
      />
      <StatCard
        title="Total Employees"
        value="18"
        subtitle="Across 6 countries"
        icon={Users}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
      />
      <StatCard
        title="Upcoming Payroll"
        value="May 30, 2025"
        subtitle="2 days from now"
        icon={Wallet}
        iconBg="bg-sky-50"
        iconColor="text-sky-500"
      />
    </section>

    {/* ── Main grid: lg:8/4 columns — same fix as every other page ─────── */}
    <section className="grid grid-cols-12 gap-4">

      {/* LEFT */}
      <div className="col-span-12 lg:col-span-8 space-y-4">

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-4">

          {/* Spend trend */}
          <div className="col-span-12 lg:col-span-7 bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold text-gray-900">Payroll Spend Trend</h2>
              <button className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
                Last 6 months
                <ChevronDown size={12} className="text-gray-400" />
              </button>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendTrend} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#4f46e5" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `$${v / 1000}K`} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 10, border: "1px solid #e5e7eb", boxShadow: "none" }}
                    formatter={(v) => [`$${v.toLocaleString()}`, "Amount"]}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorAmt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payroll status donut */}
          <div className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-[20px] p-5">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-3">Payroll Status</h2>
            <div className="relative h-[130px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={payrollStatus} dataKey="value" innerRadius={42} outerRadius={58} paddingAngle={3}>
                    {payrollStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[20px] font-bold text-gray-900 leading-none">18</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Total</p>
              </div>
            </div>
            <div className="mt-3 space-y-2.5">
              {payrollStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[13px] text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-[13px] text-gray-400 tabular-nums">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent payrolls table */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-gray-900">Recent Payrolls</h2>
            <button className="text-[12px] text-gray-400 hover:text-gray-700 font-medium transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left">
                  {["Payroll Date", "Payroll Name", "Total Amount", "Employees", "Status"].map((h) => (
                    <th key={h} className="pb-3 pr-6 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payrolls.map((p) => (
                  <tr key={p.date} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-6 text-[13px] text-gray-400 whitespace-nowrap">{p.date}</td>
                    <td className="py-3 pr-6 text-[13px] text-gray-800 font-medium">{p.name}</td>
                    <td className="py-3 pr-6 text-[13px] font-semibold text-gray-900 tabular-nums">{p.amount}</td>
                    <td className="py-3 pr-6 text-[13px] text-gray-400">{p.employees}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                        p.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-indigo-50 text-indigo-700"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
          <p className="text-[12px] text-gray-400 mb-4">Here&apos;s what AI found for you.</p>
          <div className="space-y-3">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <div className="flex items-start gap-2.5">
                <CircleCheck size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] font-semibold text-gray-900 leading-snug">Payroll is on track</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">All scheduled payrolls are on track for this month.</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <div className="flex items-start gap-2.5">
                <CircleAlert size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] font-semibold text-gray-900 leading-snug">3 employees have changes</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Review salary or details changes before May 30 payroll.</p>
                  <button className="mt-3 text-[11px] font-semibold text-gray-700 border border-gray-200 rounded-full px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors">
                    Review Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approvals */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-gray-900 mb-3">Approvals</h2>
              <p className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">2</p>
              <p className="text-[12px] text-gray-400 mt-1">Pending Approvals</p>
            </div>
            <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0">
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Audit logs */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-gray-900 mb-3">Audit Logs</h2>
              <p className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">12</p>
              <p className="text-[12px] text-gray-400 mt-1">Activities this week</p>
            </div>
            <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors flex-shrink-0">
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-[20px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold text-gray-900">Notifications</h2>
            <button className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View all</button>
          </div>
          <div className="space-y-4">
            {notifications.map((n) => (
              <div key={n.title} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${n.color}`} />
                <div>
                  <p className="text-[13px] font-medium text-gray-800 leading-snug">{n.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </aside>
    </section>
  </DashboardShell>
)

export default Overview