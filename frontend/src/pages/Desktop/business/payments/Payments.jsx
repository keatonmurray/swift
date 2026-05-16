import { useMemo, useState } from "react"
import {
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoWalletOutline,
} from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { LuArrowRight, LuClock4, LuShieldCheck, LuRefreshCw } from "react-icons/lu"
import { FiFileText, FiClock, FiCheckCircle } from "react-icons/fi"
import { TbBuildingBank } from "react-icons/tb"
import { BsBriefcase, BsHouseDoor } from "react-icons/bs"
import { FaAws, FaGoogle, FaStripe } from "react-icons/fa"
import { HiOutlineUserGroup } from "react-icons/hi"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactCountryFlag from "react-country-flag"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total to Pay Today",
    value: "$106,950.00",
    sub: "7 payments",
    icon: FiFileText,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    label: "Bills",
    value: "$24,650.00",
    sub: "4 payments",
    icon: BsBriefcase,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    label: "Employee Payouts",
    value: "$82,300.00",
    sub: "18 employees",
    icon: HiOutlineUserGroup,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    label: "Cash After Payments",
    value: "$97,840.20",
    sub: "Healthy",
    subDot: "bg-emerald-500",
    subColor: "text-emerald-600",
    icon: IoWalletOutline,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
]

/* Vendor icon â€” sized up to match Figma */
const VendorIcon = ({ kind }) => {
  if (kind === "aws")
    return (
      <span className="h-9 w-9 rounded-xl overflow-hidden flex-shrink-0 bg-black p-1.5">
        <img src="/img/aws-color.png" alt="AWS" className="h-full w-full object-contain" />
      </span>
    )
  if (kind === "google")
    return (
      <span className="h-9 w-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </span>
    )
  if (kind === "stripe")
    return (
      <span className="h-9 w-9 rounded-xl bg-[#635bff] flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.076c0 4.72 2.891 6.394 6.014 7.588 2.115.81 2.964 1.414 2.964 2.354 0 .975-.838 1.538-2.227 1.538-1.952 0-4.876-.89-6.832-2.039l-.89 5.55C4.57 23.013 7.476 24 10.885 24c2.612 0 4.69-.627 6.175-1.845 1.659-1.331 2.497-3.272 2.497-5.604.057-4.833-2.94-6.487-5.58-7.401z" fill="#fff"/>
        </svg>
      </span>
    )
  return (
    <span className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
      <BsHouseDoor size={16} />
    </span>
  )
}

const bills = [
  { id: 1, vendor: "Amazon Web Services", vendorKind: "aws",    desc: "Cloud Infrastructure",     dueDate: "May 30, 2025", dueLabel: "Today",    amount: "$4,200.00",  currency: "USD", statusVariant: "warning", statusLabel: "Due Today", selected: true  },
  { id: 2, vendor: "Google Workspace",    vendorKind: "google", desc: "Business Subscription",    dueDate: "May 30, 2025", dueLabel: "Today",    amount: "$1,250.00",  currency: "USD", statusVariant: "warning", statusLabel: "Due Today", selected: true  },
  { id: 3, vendor: "Stripe",              vendorKind: "stripe", desc: "Payment Processing Fees",  dueDate: "May 30, 2025", dueLabel: "Today",    amount: "$850.00",    currency: "USD", statusVariant: "warning", statusLabel: "Due Today", selected: true  },
  { id: 4, vendor: "Office Rent",         vendorKind: "office", desc: "June Office Rent",         dueDate: "Jun 3, 2025",  dueLabel: "In 4 days",amount: "$18,350.00", currency: "USD", statusVariant: "info",    statusLabel: "Upcoming",  selected: false },
]

// USD equivalents for total calculation
const billUSD    = { 1: 4200, 2: 1250, 3: 850, 4: 18350 }

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
    currency: "SGD",
    method: "Bank Transfer",
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
    currency: "PHP",
    method: "Bank Transfer",
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
    currency: "USD",
    method: "Wallet",
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
    currency: "GBP",
    method: "Bank Transfer",
    selected: false,
  },
]

// USD equivalents for total calculation
const empUSD = { 1: 3900, 2: 1510, 3: 6000, 4: 5300 }

const aiRecommendations = [
  { icon: LuRefreshCw,   title: "Convert USD â†’ PHP now",             body: "PHP is forecasted to strengthen by 0.8% within 48 hours."     },
  { icon: FiClock,       title: "Delay EUR contractor payout",        body: "Waiting 2 days could save ~â‚¬78 in FX fees."                   },
  { icon: LuShieldCheck, title: "No compliance issues detected",      body: "All payments are compliant with local regulations."           },
]

const tabs = ["All Payments", "Bills", "Employee Payouts"]

/* -------------------------------------------------------------------------- */
/*  Shared sub-components                                                      */
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

/* -------------------------------------------------------------------------- */
/*  Summary cards â€” borderless, icon right-aligned                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Bills table                                                                */
/* -------------------------------------------------------------------------- */

const BillsTable = ({ rows, selected, toggle, toggleAll, allSelected }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5 overflow-hidden">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[14px] font-semibold text-violet-600">
        Bills <span className="text-violet-300 font-normal">({rows.length})</span>
      </h3>
      <button className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors font-medium">
        View all
      </button>
    </div>

    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            <th className="pb-3 pr-3 w-7">
              <Checkbox checked={allSelected} onChange={toggleAll} />
            </th>
            {["Vendor", "Description", "Due Date", "Amount", "Currency", "Status", ""].map((h) => (
              <th key={h} className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td className="py-3 pr-3">
                <Checkbox checked={selected.has(b.id)} onChange={() => toggle(b.id)} />
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <VendorIcon kind={b.vendorKind} />
                  <span className="text-[13px] font-semibold text-gray-900">{b.vendor}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{b.desc}</td>
              <td className="py-3 pr-4">
                <p className="text-[13px] text-gray-800 leading-tight">{b.dueDate}</p>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{b.dueLabel}</p>
              </td>
              <td className="py-3 pr-4 text-[13px] font-semibold text-gray-900 tabular-nums">{b.amount}</td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{b.currency}</td>
              <td className="py-3 pr-4">
                <StatusBadge variant={b.statusVariant}>{b.statusLabel}</StatusBadge>
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

/* -------------------------------------------------------------------------- */
/*  Employees table                                                            */
/* -------------------------------------------------------------------------- */

const EmployeesTable = ({ rows, selected, toggle, toggleAll, allSelected }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5 overflow-hidden">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[14px] font-semibold text-emerald-600">
        Employee Payouts <span className="text-emerald-300 font-normal">({rows.length})</span>
      </h3>
      <button className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors font-medium">
        View all
      </button>
    </div>

    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            <th className="pb-3 pr-3 w-7">
              <Checkbox checked={allSelected} onChange={toggleAll} />
            </th>
            {["Employee", "Role", "Country", "Amount", "Currency", "Method", "Status", ""].map((h) => (
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
                    <AvatarFallback className={e.avatarBg}>
                      {e.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[13px] font-semibold text-gray-900">{e.name}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{e.role}</td>
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
              <td className="py-3 pr-4 text-[13px] font-semibold text-gray-900 tabular-nums">{e.amount}</td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{e.currency}</td>
              <td className="py-3 pr-4 text-[13px] text-gray-400">{e.method}</td>
              <td className="py-3 pr-4">
                <StatusBadge variant="success">Ready</StatusBadge>
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

/* -------------------------------------------------------------------------- */
/*  AI Payment Assistant      */
/* -------------------------------------------------------------------------- */

const AIPaymentAssistant = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    {/* Header */}
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-[14px] font-semibold text-gray-900 flex items-center gap-1.5">
        <HiOutlineSparkles size={14} className="text-violet-500" />
        AI Payment Assistant
      </h3>
      <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 rounded-full px-2 py-0.5 border border-violet-100">
        Beta
      </span>
    </div>

    <p className="text-[12px] text-gray-400 mb-4">Here's what AI found for today.</p>

    {/* Green callout */}
    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-5">
      <div className="flex items-start gap-2.5">
        <FiCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={14} />
        <div>
          <p className="text-[12px] font-semibold text-gray-900 leading-snug">
            All selected payments can be safely processed today.
          </p>
          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
            Cash reserves remain healthy after payments.
          </p>
        </div>
      </div>
    </div>

    {/* Section label */}
    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">
      AI Recommendations
    </p>

    {/* Recommendation rows â€” circular icons matching Figma */}
    <div>
      {aiRecommendations.map((r, i) => (
        <div
          key={r.title}
          className={`flex items-start gap-3 py-3 ${
            i !== aiRecommendations.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          {/* Circular icon â€” matches Figma style */}
          <span className="h-7 w-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 flex-shrink-0 mt-0.5">
            <r.icon size={12} />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-gray-900 leading-snug">{r.title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{r.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Payment Summary                                                            */
/* -------------------------------------------------------------------------- */

const PaymentSummary = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Payment Summary</h3>

    <ul className="space-y-3">
      {[
        { label: "Total Bills",            value: "$24,650.00"  },
        { label: "Total Employee Payouts", value: "$82,300.00"  },
        { label: "Total Amount",           value: "$106,950.00" },
        { label: "Employees",              value: "18"          },
      ].map((row) => (
        <li key={row.label} className="flex items-center justify-between">
          <span className="text-[13px] text-gray-400">{row.label}</span>
          <span className="text-[13px] font-semibold text-gray-900 tabular-nums">{row.value}</span>
        </li>
      ))}

      {/* Divider */}
      <li className="pt-1 border-t border-gray-100">
        <div className="flex items-center justify-between pt-2">
          <span className="text-[13px] text-gray-400">Funding Source</span>
          <span className="text-[13px] font-semibold text-gray-900 flex items-center gap-1.5">
            <IoWalletOutline size={13} className="text-gray-500" />
            Primary Wallet (USD)
          </span>
        </div>
        <p className="text-right text-[11px] text-gray-400 mt-1">$104,152.65 available</p>
      </li>
    </ul>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Security card                                                              */
/* -------------------------------------------------------------------------- */

const SecurityCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-[14px] font-semibold text-gray-900">Security & Compliance</h3>
      <IoLockClosedOutline className="text-gray-300" size={16} />
    </div>
    <p className="text-[12px] text-gray-400 leading-relaxed">
      All payments are encrypted and processed securely through Rapyd's global payout network.
    </p>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Bottom approval bar                                                        */
/* -------------------------------------------------------------------------- */

const ApprovalBar = ({ selectedCount, billsCount, employeesCount, totalAmount }) => (
  <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-[20px] px-6 py-4 flex items-center gap-6 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]">
    {/* Selected count */}
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white flex-shrink-0">
        <IoCheckmarkCircle size={18} />
      </span>
      <div>
        <p className="text-[14px] font-semibold text-gray-900 leading-tight">{selectedCount} selected</p>
        <p className="text-[12px] text-gray-400">{billsCount} bills Â· {employeesCount} employees</p>
      </div>
    </div>

    <div className="h-9 w-px bg-gray-100 flex-shrink-0" />

    {/* Total amount */}
    <div className="flex-shrink-0">
      <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Total Amount</p>
      <p className="text-[15px] font-bold text-gray-900 tabular-nums">{totalAmount}</p>
    </div>

    <div className="h-9 w-px bg-gray-100 flex-shrink-0" />

    {/* Processing time */}
    <div className="flex items-center gap-2.5 flex-shrink-0">
      <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
        <FiClock size={14} />
      </span>
      <div>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold leading-none mb-1">
          Est. Processing Time
        </p>
        <p className="text-[13px] font-semibold text-gray-900">1â€“2 business days</p>
      </div>
    </div>

    {/* Spacer */}
    <div className="flex-1" />

    {/* CTA */}
    <div className="text-right flex-shrink-0">
      <button className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 h-11 text-[13px] font-semibold hover:bg-gray-900 active:scale-95 transition-all">
        Review &amp; Approve
        <LuArrowRight size={15} />
      </button>
      <p className="text-[10px] text-gray-400 mt-1.5">You will be redirected to confirm payments via Rapyd.</p>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Payments = () => {
  const [activeTab, setActiveTab] = useState("All Payments")

  const [selectedBills, setSelectedBills] = useState(
    () => new Set(bills.filter((b) => b.selected).map((b) => b.id))
  )
  const [selectedEmployees, setSelectedEmployees] = useState(
    () => new Set(employees.filter((e) => e.selected).map((e) => e.id))
  )

  const toggleBill = (id) =>
    setSelectedBills((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const toggleAllBills = () =>
    setSelectedBills((s) => (s.size === bills.length ? new Set() : new Set(bills.map((b) => b.id))))

  const toggleEmployee = (id) =>
    setSelectedEmployees((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const toggleAllEmployees = () =>
    setSelectedEmployees((s) => (s.size === employees.length ? new Set() : new Set(employees.map((e) => e.id))))

  // Correct totals using USD equivalents
  const totals = useMemo(() => {
    let amount = 0
    for (const id of selectedBills)    amount += billUSD[id] ?? 0
    for (const id of selectedEmployees) amount += empUSD[id]  ?? 0
    return {
      count: selectedBills.size + selectedEmployees.size,
      bills: selectedBills.size,
      employees: selectedEmployees.size,
      formatted: amount.toLocaleString("en-US", { style: "currency", currency: "USD" }),
    }
  }, [selectedBills, selectedEmployees])

  return (
    <DashboardShell
      title="Payments"
      subtitle="Manage and approve bills and employee payouts"
    >
      {/* â”€â”€ Tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex items-center gap-7 border-b border-gray-100 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`relative pb-3 text-[13px] font-semibold transition-colors whitespace-nowrap ${
              activeTab === t ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t}
            {activeTab === t && (
              <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* â”€â”€ Summary cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {summaryCards.map((c) => <SummaryCard key={c.label} card={c} />)}
      </section>

      {/* â”€â”€ Main two-column layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {/*
          FIX: was xl:col-span-9 / xl:col-span-3 which only kicked in at xl.
          Now lg:col-span-8 / lg:col-span-4 so sidebar is always visible and
          wider â€” matching the Figma proportions.
      */}
      <section className="grid grid-cols-12 gap-4 mb-4">

        {/* Left â€” tables */}
        <div className="col-span-12 lg:col-span-8 min-w-0 space-y-4">
          <BillsTable
            rows={bills}
            selected={selectedBills}
            toggle={toggleBill}
            toggleAll={toggleAllBills}
            allSelected={selectedBills.size === bills.length}
          />
          <EmployeesTable
            rows={employees}
            selected={selectedEmployees}
            toggle={toggleEmployee}
            toggleAll={toggleAllEmployees}
            allSelected={selectedEmployees.size === employees.length}
          />
        </div>

        {/* Right â€” sidebar; fixed at col-span-4, no shrinking */}
        <aside className="col-span-12 lg:col-span-4 min-w-0 space-y-4">
          <AIPaymentAssistant />
          <PaymentSummary />
          <SecurityCard />
        </aside>
      </section>

      {/* ── Approval bar (sticky to bottom of viewport while scrolling) ─── */}
      <div className="sticky bottom-0 z-20 -mx-7 -mb-7 mt-4 px-7 py-4 bg-gradient-to-t from-white via-white to-white/0">
        <ApprovalBar
          selectedCount={totals.count}
          billsCount={totals.bills}
          employeesCount={totals.employees}
          totalAmount={totals.formatted}
        />
      </div>
    </DashboardShell>
  )
}

export default Payments
