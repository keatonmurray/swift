import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { IoEllipsisVertical, IoCheckmarkCircle, IoLockClosedOutline, IoWalletOutline, IoClose, IoSettingsOutline } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { LuArrowRight, LuShieldCheck, LuRefreshCw, LuFilter, LuChevronDown } from "react-icons/lu"
import { FiClock, FiCalendar, FiGlobe } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"
import ReactCountryFlag from "react-country-flag"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total Payroll Amount",
    value: "$80,700.00",
    sub: "18 employees \u00B7 6 countries",
    icon: HiOutlineUserGroup,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Payment Currencies",
    value: "3",
    sub: "USD, EUR, PHP",
    icon: FiGlobe,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Earliest Payout Date",
    value: "May 30, 2025",
    sub: "Tomorrow",
    icon: FiCalendar,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Cash After Payroll",
    value: "$97,840.20",
    sub: "Healthy",
    subDot: "bg-emerald-500",
    subColor: "text-emerald-600",
    icon: IoWalletOutline,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
]

const employees = [
  {
    id: 1,
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "bg-rose-100 text-rose-700",
    imageSrc: "https://i.pravatar.cc/80?img=47",
    role: "Product Designer",
    country: "Singapore",
    countryCode: "SG",
    amount: "S$5,200.00",
    usd: 3900,
    currency: "SGD",
    method: "Bank Transfer",
    status: "ready",
    selected: true,
  },
  {
    id: 2,
    name: "Miguel Santos",
    initials: "MS",
    avatarBg: "bg-blue-100 text-blue-700",
    imageSrc: "https://i.pravatar.cc/80?img=12",
    role: "Software Engineer",
    country: "Philippines",
    countryCode: "PH",
    amount: "\u20B185,000.00",
    usd: 1510,
    currency: "PHP",
    method: "Bank Transfer",
    status: "ready",
    selected: true,
  },
  {
    id: 3,
    name: "John Doe",
    initials: "JD",
    avatarBg: "bg-amber-100 text-amber-700",
    imageSrc: "https://i.pravatar.cc/80?img=33",
    role: "Marketing Manager",
    country: "United States",
    countryCode: "US",
    amount: "$6,000.00",
    usd: 6000,
    currency: "USD",
    method: "Wallet",
    status: "ready",
    selected: true,
  },
  {
    id: 4,
    name: "Emma Williams",
    initials: "EW",
    avatarBg: "bg-emerald-100 text-emerald-700",
    imageSrc: "https://i.pravatar.cc/80?img=45",
    role: "Customer Success",
    country: "United Kingdom",
    countryCode: "GB",
    amount: "\u00A34,200.00",
    usd: 5300,
    currency: "GBP",
    method: "Bank Transfer",
    status: "ready",
    selected: true,
  },
  {
    id: 5,
    name: "Carlos Lima",
    initials: "CL",
    avatarBg: "bg-orange-100 text-orange-700",
    imageSrc: "https://i.pravatar.cc/80?img=58",
    role: "Sales Executive",
    country: "Brazil",
    countryCode: "BR",
    amount: "R$7,800.00",
    usd: 1490,
    currency: "BRL",
    method: "Bank Transfer",
    status: "scheduled",
    selected: false,
  },
  {
    id: 6,
    name: "Nina M\u00FCller",
    initials: "NM",
    avatarBg: "bg-fuchsia-100 text-fuchsia-700",
    imageSrc: "https://i.pravatar.cc/80?img=49",
    role: "Finance Analyst",
    country: "Germany",
    countryCode: "DE",
    amount: "\u20AC5,600.00",
    usd: 6010,
    currency: "EUR",
    method: "Bank Transfer",
    status: "scheduled",
    selected: false,
  },
  {
    id: 7,
    name: "Arjun Patel",
    initials: "AP",
    avatarBg: "bg-indigo-100 text-indigo-700",
    imageSrc: "https://i.pravatar.cc/80?img=68",
    role: "DevOps Engineer",
    country: "India",
    countryCode: "IN",
    amount: "\u20B9320,000.00",
    usd: 3840,
    currency: "INR",
    method: "Bank Transfer",
    status: "scheduled",
    selected: false,
  },
]

// FIX 1: Arrow character encoded correctly → instead of ->
const aiRecommendations = [
  {
    icon: LuRefreshCw,
    title: "Convert USD \u2192 PHP now",
    body: "PHP is forecasted to strengthen by 0.8% within 48 hours.",
  },
  {
    icon: FiClock,
    title: "Delay EUR contractor payout",
    body: "Waiting 2 days could save ~\u20AC78 in FX fees.",
  },
  {
    icon: LuShieldCheck,
    title: "No compliance issues detected",
    body: "All payrolls are compliant with local regulations.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
      checked ? "bg-black border-black text-white" : "bg-white border-gray-300 hover:border-gray-400"
    }`}
    aria-checked={checked}
    role="checkbox"
  >
    {checked && (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
)

const SummaryCard = ({ card }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-gray-500 leading-none mb-2">{card.label}</p>
      <AnimatedValue
        value={card.value}
        duration={1400}
        className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2 block"
      />
      <p className={`text-[12px] flex items-center gap-1.5 ${card.subColor ?? "text-gray-500"}`}>
        {card.subDot && <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${card.subDot}`} />}
        {card.sub}
      </p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>
      <card.icon size={18} />
    </span>
  </div>
)

const PayoutsTable = ({ rows, selected, toggle, toggleAll, allSelected }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5 overflow-hidden">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[14px] font-semibold text-gray-900">
        Employee Payouts <span className="text-gray-400">({rows.length})</span>
      </h3>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
          All Currencies
          <LuChevronDown size={12} className="text-gray-400" />
        </button>
        <button className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
          <LuFilter size={12} />
          Filter
        </button>
      </div>
    </div>

    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            <th className="pb-3 pr-3 w-7">
              <Checkbox checked={allSelected} onChange={toggleAll} />
            </th>
            {["Employee", "Country", "Currency", "Amount", "Method", "Status", ""].map((h) => (
              <th key={h} className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td className="py-3 pr-3">
                <Checkbox checked={selected.has(e.id)} onChange={() => toggle(e.id)} />
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    {e.imageSrc && <AvatarImage src={e.imageSrc} alt={e.name} />}
                    <AvatarFallback className={e.avatarBg}>{e.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-gray-900 leading-tight">{e.name}</p>
                    <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{e.role}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-[13px] text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <ReactCountryFlag
                    countryCode={e.countryCode}
                    svg
                    style={{ width: "1.1em", height: "0.8em", borderRadius: "2px" }}
                  />
                  {e.country}
                </span>
              </td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{e.currency}</td>
              <td className="py-3 pr-4 text-[13px] font-semibold text-gray-900 tabular-nums">{e.amount}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-700 bg-gray-100 rounded-full px-2.5 py-1">
                  {e.method}
                </span>
              </td>
              <td className="py-3 pr-4">
                {e.status === "ready" ? (
                  <StatusBadge variant="success">Ready</StatusBadge>
                ) : (
                  <StatusBadge variant="info" icon={<FiClock size={10} />}>
                    Scheduled
                  </StatusBadge>
                )}
              </td>
              <td className="py-3 text-gray-300 hover:text-gray-600 cursor-pointer transition-colors">
                <IoEllipsisVertical size={14} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const AIPayrollAssistant = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-[13px] font-semibold text-gray-900 flex items-center gap-1.5">
        <HiOutlineSparkles size={13} className="text-violet-600" />
        AI Payroll Assistant
      </h3>
      <span className="text-[9px] font-semibold text-violet-700 bg-violet-50 rounded-full px-2 py-0.5">
        Beta
      </span>
    </div>

    <p className="text-[11px] text-gray-500 mb-3">Here&apos;s what AI found for today.</p>

    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 mb-4">
      <div className="flex items-start gap-2">
        <IoCheckmarkCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={14} />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-900 leading-snug">
            All salaries can be safely processed today.
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5 leading-relaxed">
            Cash reserves remain healthy after payouts.
          </p>
        </div>
      </div>
    </div>

    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
      AI Recommendations
    </p>

    {/* FIX 2: rounded-full + bg-white (circular) instead of rounded-lg + bg-gray-50 (square) */}
    <div className="space-y-0">
      {aiRecommendations.map((r, i) => (
        <div
          key={r.title}
          className={`flex items-start gap-2.5 py-2.5 ${
            i !== aiRecommendations.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <span className="h-6 w-6 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 flex-shrink-0 mt-0.5">
            <r.icon size={11} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-gray-900 leading-snug">{r.title}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{r.body}</p>
          </div>
        </div>
      ))}
    </div>

    <Link
      to="/business/payroll/analysis"
      className="mt-4 w-full inline-flex items-center justify-between text-[12px] font-semibold text-gray-900 border border-gray-200 rounded-full px-4 py-2.5 hover:bg-gray-50 transition-colors"
    >
      View Full Analysis
      <LuArrowRight size={13} />
    </Link>
  </div>
)

const PayrollSummary = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Payroll Summary</h3>

    <ul className="space-y-3 text-[13px]">
      <li className="flex items-center justify-between">
        <span className="text-gray-500">Total Employees</span>
        <span className="text-gray-900 font-semibold tabular-nums">18</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-500">Total Amount</span>
        <span className="text-gray-900 font-semibold tabular-nums">$80,700.00</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-500">Payroll Date</span>
        <span className="text-gray-900 font-semibold">May 30, 2025</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-500">Payment Method</span>
        <span className="text-gray-900 font-semibold">Rapyd Global Payouts</span>
      </li>
      <li className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-gray-500">Funding Source</span>
        <span className="text-gray-900 font-semibold flex items-center gap-1.5">
          <IoWalletOutline size={13} />
          Primary Wallet (USD)
        </span>
      </li>
      <li className="text-right text-[11px] text-gray-400">$104,152.65 available</li>
    </ul>
  </div>
)

const SecurityCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[14px] font-semibold text-gray-900">Security &amp; Compliance</h3>
      <IoLockClosedOutline className="text-gray-400" size={16} />
    </div>
    <p className="text-[12px] text-gray-500 leading-relaxed">
      All payrolls are encrypted and processed securely through Rapyd&apos;s global payout network.
    </p>
  </div>
)

const ApprovalBar = ({ selectedCount, employeesCount, totalAmount }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-6 py-4 flex flex-col gap-4">
    {/* Top row — totals */}
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="h-7 w-7 rounded-full bg-black flex items-center justify-center text-white">
          <IoCheckmarkCircle size={18} />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">{selectedCount} selected</p>
          <p className="text-[11px] text-gray-500">{employeesCount} employees</p>
        </div>
      </div>

      <div className="h-9 w-px bg-gray-200" />

      <div className="flex-shrink-0">
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
          Total Selected
        </p>
        <p className="text-[15px] font-semibold text-gray-900 tabular-nums">{totalAmount}</p>
      </div>

      <div className="h-9 w-px bg-gray-200" />

      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
          <FiClock size={14} />
        </span>
        <div>
          <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold leading-none mb-1">
            Estimated Processing Time
          </p>
          {/* FIX 3: proper en-dash instead of hyphen */}
          <p className="text-[13px] font-semibold text-gray-900">1–2 business days</p>
        </div>
      </div>
    </div>

    {/* Bottom row — actions */}
    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
      <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-5 h-10 hover:bg-gray-50 transition-colors">
        <IoClose size={14} />
        Reject Payroll
      </button>
      <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-5 h-10 hover:bg-gray-50 transition-colors">
        <FiCalendar size={13} />
        Save for Later
      </button>
      <div className="flex-1" />
      <div className="text-right">
        <button className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 h-10 text-[13px] font-semibold hover:bg-gray-900 active:scale-95 transition-all">
          Approve &amp; Send Payroll
          <LuArrowRight size={14} />
        </button>
        <p className="text-[10px] text-gray-400 mt-1.5">
          You will be redirected to confirm payouts via Rapyd.
        </p>
      </div>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Payroll = () => {
  const [selected, setSelected] = useState(
    () => new Set(employees.filter((e) => e.selected).map((e) => e.id))
  )

  const toggle = (id) =>
    setSelected((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const toggleAll = () =>
    setSelected((s) =>
      s.size === employees.length ? new Set() : new Set(employees.map((e) => e.id))
    )

  const totals = useMemo(() => {
    let amount = 0
    for (const id of selected) {
      const emp = employees.find((e) => e.id === id)
      if (emp) amount += emp.usd
    }
    return {
      count: selected.size,
      formatted: amount.toLocaleString("en-US", { style: "currency", currency: "USD" }),
    }
  }, [selected])

  return (
    <DashboardShell
      title="Payroll Review"
      subtitle="Review and approve employee payments"
      actions={
        <Link
          to="/business/payroll/settings"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <IoSettingsOutline size={14} />
          Settings
        </Link>
      }
    >

      {/* Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      {/* FIX: xl:col-span-9/3 → lg:col-span-8/4
          xl only fires at ~1280px+, so sidebar was collapsing to full width
          on normal 1024–1280px screens. lg fires at 1024px+ and keeps
          the sidebar at a proper col-span-4 width at all times. */}
      <section className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-8 min-w-0 space-y-4">
          <PayoutsTable
            rows={employees}
            selected={selected}
            toggle={toggle}
            toggleAll={toggleAll}
            allSelected={selected.size === employees.length}
          />
        </div>

        <aside className="col-span-12 lg:col-span-4 min-w-0 space-y-4">
          <AIPayrollAssistant />
          <PayrollSummary />
          <SecurityCard />
        </aside>
      </section>

      {/* Approval bar */}
      <div className="mt-4">
        <ApprovalBar
          selectedCount={totals.count}
          employeesCount={totals.count}
          totalAmount={totals.formatted}
        />
      </div>

    </DashboardShell>
  )
}

export default Payroll