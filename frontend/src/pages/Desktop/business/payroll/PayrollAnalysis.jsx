import { Link, useNavigate } from "react-router-dom"
import {
  IoArrowBack,
  IoCheckmarkSharp,
} from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { LuArrowRight, LuChevronDown, LuCircleHelp } from "react-icons/lu"
import {
  FiClock,
  FiCalendar,
  FiGlobe,
  FiMessageCircle,
} from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import DataTable from "@/pages/Desktop/components/DataTable"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total Payroll Amount",
    value: "$80,700.00",
    sub: "18 employees · 6 countries",
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
    label: "Payroll Date",
    value: "May 30, 2025",
    sub: "Tomorrow",
    icon: FiCalendar,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Total Hours Logged",
    value: "1,248.75 hrs",
    sub: "+45.5 hrs vs last period",
    subColor: "text-gray-500",
    icon: FiClock,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
]

const aiFindings = [
  "18 employees across 6 countries",
  "1,248.75 total hours logged",
  "Regular pay, overtime, and bonuses included",
  "Statutory deductions and taxes applied",
  "Multi-currency conversion using current rates",
]

const breakdownRows = [
  { label: "Regular Pay",          dot: "bg-violet-500",  amount: "$65,800.00", pct: "81.6%" },
  { label: "Overtime Pay",         dot: "bg-blue-500",    amount: "$5,750.00",  pct: "7.1%"  },
  { label: "Bonuses & Incentives", dot: "bg-amber-500",   amount: "$3,200.00",  pct: "4.0%"  },
  { label: "Allowances",           dot: "bg-emerald-500", amount: "$2,150.00",  pct: "2.7%"  },
  { label: "Reimbursements",       dot: "bg-pink-500",    amount: "$1,800.00",  pct: "2.2%"  },
]

const calculationSteps = [
  { title: "Step 1: Hours & Pay Rates",    body: "Timesheet hours × employee pay rates" },
  { title: "Step 2: Additional Pay",       body: "Overtime, bonuses, allowances" },
  { title: "Step 3: Deductions",           body: "Taxes, benefits, other deductions" },
  { title: "Step 4: Currency Conversion",  body: "Multi-currency conversion to base currency" },
]

const dataSources = [
  { label: "QuickBooks Timesheets", value: "1,248.75 hours" },
  { label: "QuickBooks Payroll",    value: "18 employees"   },
  { label: "Tax Tables",            value: "6 countries"    },
  { label: "Currency Rates",        value: "3 currencies"   },
]

const employeeBreakdown = [
  {
    id: 1,
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "bg-rose-100 text-rose-700",
    imageSrc: "https://i.pravatar.cc/80?img=47",
    role: "Product Designer",
    hours: "160.00 hrs",
    regular: "$6,400.00",
    overtime: "$400.00",
    deductions: "-$192.00",
    total: "$6,608.00",
  },
  {
    id: 2,
    name: "Miguel Santos",
    initials: "MS",
    avatarBg: "bg-blue-100 text-blue-700",
    imageSrc: "https://i.pravatar.cc/80?img=12",
    role: "Software Engineer",
    hours: "168.50 hrs",
    regular: "$8,100.00",
    overtime: "$850.00",
    deductions: "-$243.00",
    total: "$8,707.00",
  },
  {
    id: 3,
    name: "John Doe",
    initials: "JD",
    avatarBg: "bg-amber-100 text-amber-700",
    imageSrc: "https://i.pravatar.cc/80?img=33",
    role: "Marketing Manager",
    hours: "160.00 hrs",
    regular: "$5,500.00",
    overtime: "$0.00",
    deductions: "-$165.00",
    total: "$5,335.00",
  },
  {
    id: 4,
    name: "Emma Williams",
    initials: "EW",
    avatarBg: "bg-emerald-100 text-emerald-700",
    imageSrc: "https://i.pravatar.cc/80?img=45",
    role: "Customer Success",
    hours: "155.75 hrs",
    regular: "$4,800.00",
    overtime: "$0.00",
    deductions: "-$144.00",
    total: "$4,656.00",
  },
  {
    id: 5,
    name: "Carlos Lima",
    initials: "CL",
    avatarBg: "bg-orange-100 text-orange-700",
    imageSrc: "https://i.pravatar.cc/80?img=58",
    role: "Sales Executive",
    hours: "172.00 hrs",
    regular: "$4,200.00",
    overtime: "$600.00",
    deductions: "-$126.00",
    total: "$4,674.00",
  },
]

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ card }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4 min-w-0">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-gray-500 leading-none mb-2 truncate">{card.label}</p>
      <AnimatedValue
        value={card.value}
        duration={1400}
        className="text-[20px] font-semibold text-gray-900 tracking-tight leading-none mb-2 block"
      />
      <p className={`text-[12px] ${card.subColor ?? "text-gray-500"}`}>{card.sub}</p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>
      <card.icon size={18} />
    </span>
  </div>
)

const WhyCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Why this payroll amount?</h3>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-[12px] font-semibold text-gray-900 flex items-center gap-1.5 mb-3">
        <HiOutlineSparkles size={13} className="text-violet-600" />
        Gemini analyzed your payroll data and found:
      </p>

      <ul className="space-y-2 mb-4">
        {aiFindings.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12px] text-gray-700">
            <IoCheckmarkSharp size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <p className="text-[12px] text-gray-700 mb-3">
        Total calculated amount:{" "}
        <span className="font-semibold text-gray-900">$80,700.00</span>
      </p>

      <button className="w-full inline-flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
        View Calculation Breakdown
        <LuChevronDown size={13} />
      </button>
    </div>
  </div>
)

const AmountBreakdownCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Amount Breakdown</h3>

    <ul className="space-y-3">
      {breakdownRows.map((r) => (
        <li key={r.label} className="flex items-center text-[13px] gap-2">
          <span className={`h-2 w-2 rounded-full flex-shrink-0 ${r.dot}`} />
          <span className="text-gray-700 flex-1 min-w-0 truncate">{r.label}</span>
          <span className="text-gray-900 font-semibold tabular-nums">{r.amount}</span>
          <span className="text-gray-400 tabular-nums w-10 text-right">{r.pct}</span>
        </li>
      ))}
    </ul>

    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5 text-[13px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full bg-gray-900 flex-shrink-0" />
          Total Before Deductions
        </span>
        <span className="text-gray-900 font-semibold tabular-nums flex-shrink-0">$78,700.00</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
          Deductions & Taxes
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-rose-600 font-semibold tabular-nums">-$2,000.00</span>
          <span className="text-gray-400 tabular-nums">-2.5%</span>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
      <span className="text-[13px] font-semibold text-gray-900">Total Payroll Amount</span>
      <span className="text-[15px] font-semibold text-gray-900 tabular-nums flex-shrink-0">$80,700.00</span>
    </div>
  </div>
)

const CalculationDetailsCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Calculation Details</h3>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-5">
      <p className="text-[13px] font-semibold text-gray-900 mb-1.5">How it works</p>
      <p className="text-[12px] text-gray-600 leading-relaxed mb-3">
        We analyze your QuickBooks data including timesheets, pay rates, taxes, and deductions to
        calculate the exact payroll amount.
      </p>
      <button className="text-[12px] font-semibold text-violet-700 hover:text-violet-900 transition-colors">
        Learn more
      </button>
    </div>

    <ul className="space-y-4">
      {calculationSteps.map((s) => (
        <li key={s.title} className="flex items-start gap-3">
          <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <IoCheckmarkSharp size={11} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 leading-snug">{s.title}</p>
            <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">{s.body}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const DataSourcesCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Data Sources</h3>
    <ul className="space-y-3">
      {dataSources.map((d) => (
        <li key={d.label} className="flex items-center justify-between gap-2 text-[13px]">
          <span className="text-gray-700 flex items-center gap-2 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="truncate">{d.label}</span>
          </span>
          <span className="text-gray-500 tabular-nums flex-shrink-0">{d.value}</span>
        </li>
      ))}
    </ul>
  </div>
)

const SupportCard = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="flex items-start gap-2 mb-2">
      <LuCircleHelp className="text-gray-400 mt-0.5 flex-shrink-0" size={15} />
      <h3 className="text-[14px] font-semibold text-gray-900">Need Help?</h3>
    </div>
    <p className="text-[12px] text-gray-500 leading-relaxed mb-4">
      Learn more about payroll calculations or contact our support team.
    </p>
    <button className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
      <FiMessageCircle size={13} />
      Contact Support
    </button>
  </div>
)

const EmployeeBreakdownCard = () => {
  const navigate = useNavigate()

  return (
    <DataTable
      title="Employee Breakdown"
      onRowClick={(e) => navigate(`/business/payroll/analysis/${e.id}`)}
      getRowKey={(e) => e.id}
      rows={employeeBreakdown}
      columns={[
        {
          key: "employee",
          header: "Employee",
          render: (e) => (
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
          ),
        },
        {
          key: "hours",
          header: "Hours Logged",
          accessor: "hours",
          cellClassName: "text-gray-500 tabular-nums",
        },
        {
          key: "regular",
          header: "Regular Pay",
          accessor: "regular",
          cellClassName: "text-gray-900 font-semibold tabular-nums",
        },
        {
          key: "overtime",
          header: "Overtime",
          accessor: "overtime",
          cellClassName: "text-gray-500 tabular-nums",
        },
        {
          key: "deductions",
          header: "Deductions",
          accessor: "deductions",
          cellClassName: "text-rose-600 font-semibold tabular-nums",
        },
        {
          key: "total",
          header: "Total",
          accessor: "total",
          cellClassName: "text-gray-900 font-semibold tabular-nums",
        },
        {
          key: "arrow",
          header: "",
          render: () => <LuArrowRight size={14} className="text-gray-300" />,
        },
      ]}
      footer={
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-400">Showing 5 of 18 employees</p>
          <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors">
            View All Employees
            <LuArrowRight size={12} />
          </button>
        </div>
      }
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PayrollAnalysis = () => {
  return (
    <DashboardShell
      title="Payroll Analysis"
      subtitle="AI-powered breakdown and explanation of your payroll bill"
    >
      {/* Back link */}
      <Link
        to="/business/payroll"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4 -mt-2"
      >
        <IoArrowBack size={14} />
        Back to Payroll Review
      </Link>

      {/* Summary cards — 4 equal columns */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Two-column layout: main (left) + sidebar (right)                   */}
      {/* FIX: use explicit pixel min-width on the sidebar so it never       */}
      {/* shrinks below a readable width, regardless of viewport.            */}
      {/* ------------------------------------------------------------------ */}
      <section className="flex gap-4 items-start min-w-0">

        {/* Left — main content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Why + Amount breakdown side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WhyCard />
            <AmountBreakdownCard />
          </div>

          {/* Employee table full width inside left column */}
          <EmployeeBreakdownCard />
        </div>

        {/* Right — sidebar, fixed width so it never shrinks */}
        <aside
          className="flex-shrink-0 space-y-4"
          style={{ width: "280px" }}
        >
          <CalculationDetailsCard />
          <DataSourcesCard />
          <SupportCard />
        </aside>
      </section>
    </DashboardShell>
  )
}

export default PayrollAnalysis