import { useParams, Link } from "react-router-dom"

import {
  IoArrowBack,
  IoCheckmarkSharp,
  IoDownloadOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuChevronDown,
  LuCircleHelp,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import { TbBuildingBank } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/*  Employee data                                                              */
/* -------------------------------------------------------------------------- */

const employeesData = {
  1: {
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "bg-rose-100 text-rose-700",
    imageSrc: "https://i.pravatar.cc/80?img=47",
    role: "Product Designer",
    startDate: "Jan 15, 2024",
    totalPay: "$6,608.00",
    totalHours: "160.00 hrs",
    payrollDate: "May 30, 2025",
    payrollDateSub: "Tomorrow",
    paymentMethod: "Bank Transfer",
    paymentMethodSub: "Scheduled",

    aiFindings: [
      "160.00 total hours logged",
      "Regular pay, overtime, and bonuses included",
      "Statutory deductions and taxes applied",
      "All figures match QuickBooks data and current rates",
    ],

    breakdown: [
      {
        label: "Regular Pay",
        dot: "bg-violet-500",
        amount: "$6,400.00",
        pct: "96.9%",
      },
      {
        label: "Overtime Pay",
        dot: "bg-blue-500",
        amount: "$400.00",
        pct: "6.1%",
      },
      {
        label: "Bonuses & Incentives",
        dot: "bg-amber-500",
        amount: "$0.00",
        pct: "0%",
      },
      {
        label: "Allowances",
        dot: "bg-emerald-500",
        amount: "$0.00",
        pct: "0%",
      },
      {
        label: "Reimbursements",
        dot: "bg-pink-500",
        amount: "$0.00",
        pct: "0%",
      },
    ],

    totalBeforeDeductions: "$6,800.00",
    deductions: "-$192.00",
    deductionsPct: "-2.9%",

    earnings: [
      {
        type: "Regular Pay",
        hours: "152.00 hrs",
        rate: "$40.00/hr",
        amount: "$6,080.00",
      },
      {
        type: "Overtime Pay (1.5x)",
        hours: "8.00 hrs",
        rate: "$60.00/hr",
        amount: "$480.00",
      },
      {
        type: "Bonuses & Incentives",
        hours: "—",
        rate: "—",
        amount: "$0.00",
      },
      {
        type: "Allowances",
        hours: "—",
        rate: "—",
        amount: "$0.00",
      },
      {
        type: "Reimbursements",
        hours: "—",
        rate: "—",
        amount: "$0.00",
      },
    ],

    totalEarnings: "$6,560.00",
    totalEarningsHours: "160.00 hrs",

    hoursBreakdown: {
      total: "160.00 hrs",
      delta: "+12.50 hrs vs last period",

      regular: {
        label: "Regular (152.00 hrs)",
        pct: 95,
      },

      overtime: {
        label: "Overtime (8.00 hrs)",
        pct: 5,
      },

      other: {
        label: "Other (0.00 hrs)",
        pct: 0,
      },
    },

    deductionRows: [
      {
        type: "Federal Income Tax",
        calc: "10% of taxable income",
        amount: "-$480.00",
      },
      {
        type: "Social Security (FICA)",
        calc: "6.2% of gross pay",
        amount: "-$408.00",
      },
      {
        type: "Medicare (FICA)",
        calc: "1.45% of gross pay",
        amount: "-$95.00",
      },
      {
        type: "Health Insurance",
        calc: "Employee contribution",
        amount: "-$150.00",
      },
    ],

    totalDeductions: "-$1,133.00",

    netPay: "$6,608.00",

    netPayMethod:
      "via Bank Transfer on May 30, 2025",

    dataSources: [
      {
        label: "QuickBooks Timesheets",
        value: "160.00 hours",
      },
      {
        label: "QuickBooks Payroll",
        value: "Employee pay rate",
      },
      {
        label: "Tax Tables",
        value: "United States",
      },
      {
        label: "Currency Rates",
        value: "USD",
      },
    ],
  },
}

const defaultEmployee = employeesData[1]

/* -------------------------------------------------------------------------- */
/*  Summary Card                                                               */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
  iconColor,
}) => (
  <div className="flex min-w-0 items-center justify-between gap-3 rounded-3xl border border-zinc-200 bg-white p-5">
    <div className="min-w-0 flex-1">
      <p className="mb-2 truncate text-xs text-zinc-500">
        {label}
      </p>

      <AnimatedValue
        value={value}
        duration={1400}
        className="mb-2 block truncate text-xl font-semibold tracking-tight text-zinc-900"
      />

      <p className="truncate text-xs text-zinc-500">
        {sub}
      </p>
    </div>

    <span
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
    >
      <Icon size={18} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Why Card                                                                   */
/* -------------------------------------------------------------------------- */

const WhyCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Why this payroll amount?
    </h3>

    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <HiOutlineSparkles
          size={16}
          className="text-violet-600"
        />

        Gemini analyzed{" "}
        {emp.name.split(" ")[0]}
        &apos;s payroll data and found:
      </p>

      <ul className="mb-6 space-y-4">
        {emp.aiFindings.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-zinc-700"
          >
            <IoCheckmarkSharp
              size={16}
              className="mt-0.5 flex-shrink-0 text-emerald-600"
            />

            {f}
          </li>
        ))}
      </ul>

      <p className="mb-5 text-sm text-zinc-700">
        Total calculated amount:{" "}
        <span className="font-semibold text-zinc-900">
          {emp.totalPay}
        </span>
      </p>

      <button className="inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
        View Calculation Breakdown

        <LuChevronDown size={16} />
      </button>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Amount Breakdown                                                           */
/* -------------------------------------------------------------------------- */

const AmountBreakdownCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Amount Breakdown
    </h3>

    <ul className="space-y-5">
      {emp.breakdown.map((r) => (
        <li
          key={r.label}
          className="flex items-center gap-3 text-sm"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${r.dot}`}
          />

          <span className="flex-1 truncate text-zinc-700">
            {r.label}
          </span>

          <span className="font-semibold tabular-nums text-zinc-900">
            {r.amount}
          </span>

          <span className="w-12 text-right tabular-nums text-zinc-400">
            {r.pct}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-6 space-y-4 border-t border-zinc-100 pt-6">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-zinc-900" />
          Total Before Deductions
        </span>

        <span className="font-semibold tabular-nums text-zinc-900">
          {emp.totalBeforeDeductions}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Deductions & Taxes
        </span>

        <div className="flex items-center gap-3">
          <span className="font-semibold tabular-nums text-rose-600">
            {emp.deductions}
          </span>

          <span className="tabular-nums text-zinc-400">
            {emp.deductionsPct}
          </span>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6">
      <span className="text-sm font-semibold text-zinc-900">
        Total Payroll Amount
      </span>

      <span className="text-lg font-semibold tabular-nums text-zinc-900">
        {emp.totalPay}
      </span>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Earnings Table                                                             */
/* -------------------------------------------------------------------------- */

const EarningsTable = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[14px] font-semibold text-gray-900">
        Employee Breakdown
      </h3>

      <button className="text-[12px] font-medium text-gray-500 transition hover:text-gray-900">
        View all
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            {[
              "Earning Type",
              "Hours",
              "Rate",
              "Amount",
            ].map((h) => (
              <th
                key={h}
                className="pb-4 pr-6 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {emp.earnings.map((r) => (
            <tr
              key={r.type}
              className="border-t border-gray-100 transition-colors hover:bg-gray-50"
            >
              <td className="py-4 pr-6 text-[13px] text-gray-900">
                {r.type}
              </td>

              <td className="py-4 pr-6 text-[13px] tabular-nums text-gray-500">
                {r.hours}
              </td>

              <td className="py-4 pr-6 text-[13px] tabular-nums text-gray-500">
                {r.rate}
              </td>

              <td className="py-4 text-[13px] font-semibold tabular-nums text-gray-900">
                {r.amount}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="py-4 pr-6 text-[13px] font-semibold text-gray-900">
              Total Earnings
            </td>

            <td className="py-4 pr-6 text-[13px] font-semibold tabular-nums text-gray-900">
              {emp.totalEarningsHours}
            </td>

            <td className="py-4 pr-6" />

            <td className="py-4 text-[13px] font-semibold tabular-nums text-gray-900">
              {emp.totalEarnings}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Hours Overview                                                             */
/* -------------------------------------------------------------------------- */

const HoursOverviewCard = ({ emp }) => {
  const h = emp.hoursBreakdown

  const circumference = 2 * Math.PI * 14

  const regularDash =
    (h.regular.pct / 100) * circumference

  const overtimeDash =
    (h.overtime.pct / 100) * circumference

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h3 className="mb-5 text-lg font-semibold text-zinc-900">
        Hours Overview
      </h3>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        Total Hours
      </p>

      <p className="mb-2 text-4xl font-semibold tracking-tight text-zinc-900">
        {h.total}
      </p>

      <p className="mb-8 text-sm font-medium text-emerald-600">
        {h.delta}
      </p>

      <div className="flex items-center gap-8">
        <div className="relative h-[110px] w-[110px] flex-shrink-0">
          <svg
            viewBox="0 0 36 36"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#f4f4f5"
              strokeWidth="4"
            />

            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray={`${regularDash} ${circumference}`}
              strokeLinecap="round"
            />

            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={`${overtimeDash} ${circumference}`}
              strokeDashoffset={-regularDash}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <ul className="flex-1 space-y-4">
          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {h.regular.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.regular.pct}%
            </span>
          </li>

          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />

              {h.overtime.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.overtime.pct}%
            </span>
          </li>

          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-zinc-300" />

              {h.other.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.other.pct}%
            </span>
          </li>
        </ul>
      </div>

      <button className="mt-8 inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
        View Timesheet Details

        <LuArrowRight size={16} />
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Deductions Table                                                           */
/* -------------------------------------------------------------------------- */

const DeductionsTable = ({ emp }) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Deductions & Taxes
      </h3>

      <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            {[
              "Deduction Type",
              "Calculation",
              "Amount",
            ].map((h) => (
              <th
                key={h}
                className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-wide text-zinc-400 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {emp.deductionRows.map((r) => (
            <tr
              key={r.type}
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5 pr-6 text-sm text-zinc-900">
                {r.type}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {r.calc}
              </td>

              <td className="py-5 text-sm font-semibold tabular-nums text-rose-600">
                {r.amount}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t border-zinc-200">
            <td className="py-5 pr-6 text-sm font-semibold text-zinc-900">
              Total Deductions
            </td>

            <td className="py-5 pr-6 text-sm text-zinc-500">
              —
            </td>

            <td className="py-5 text-sm font-semibold tabular-nums text-rose-600">
              {emp.totalDeductions}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Net Pay                                                                    */
/* -------------------------------------------------------------------------- */

const NetPayCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Net Pay
    </h3>

    <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-zinc-600">
            {emp.name.split(" ")[0]} will receive
          </p>

          <p className="mb-3 text-4xl font-semibold tracking-tight text-zinc-900">
            {emp.netPay}
          </p>

          <p className="text-sm text-zinc-500">
            {emp.netPayMethod}
          </p>
        </div>

        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
          <TbBuildingBank
            size={22}
            className="text-emerald-600"
          />
        </span>
      </div>
    </div>

    <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
      <IoDownloadOutline size={16} />
      Download Pay Stub
    </button>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

const calculationSteps = [
  {
    title: "Step 1: Hours & Pay Rates",
    body: "Timesheet hours × employee pay rates",
  },
  {
    title: "Step 2: Additional Pay",
    body: "Overtime, bonuses, allowances",
  },
  {
    title: "Step 3: Deductions",
    body: "Taxes, benefits, other deductions",
  },
  {
    title: "Step 4: Currency Conversion",
    body: "Multi-currency conversion to base currency",
  },
]

const CalculationDetailsCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Calculation Details
    </h3>

    <div className="mb-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
      <p className="mb-2 text-sm font-semibold text-zinc-900">
        How it works
      </p>

      <p className="mb-4 text-sm leading-relaxed text-zinc-500">
        We analyze your QuickBooks data including
        timesheets, pay rates, taxes, and deductions
        to calculate the exact payroll amount.
      </p>

      <button className="text-sm font-semibold text-violet-700 transition hover:text-violet-900">
        Learn more
      </button>
    </div>

    <ul className="space-y-5">
      {calculationSteps.map((s) => (
        <li
          key={s.title}
          className="flex items-start gap-4"
        >
          <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <IoCheckmarkSharp size={14} />
          </span>

          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {s.title}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const DataSourcesCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Data Sources
    </h3>

    <ul className="space-y-4">
      {emp.dataSources.map((d) => (
        <li
          key={d.label}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="flex min-w-0 items-center gap-2 text-zinc-700">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />

            <span className="truncate">{d.label}</span>
          </span>

          <span className="flex-shrink-0 text-right tabular-nums text-zinc-500">
            {d.value}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

const SupportCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-3 flex items-start gap-3">
      <LuCircleHelp
        className="mt-0.5 text-zinc-400"
        size={18}
      />

      <h3 className="text-lg font-semibold text-zinc-900">
        Need Help?
      </h3>
    </div>

    <p className="mb-6 text-sm leading-relaxed text-zinc-500">
      Learn more about payroll calculations or contact
      our support team.
    </p>

    <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
      <FiMessageCircle size={16} />
      Contact Support
    </button>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const EmployeePayrollDetail = () => {
  const { employeeId } = useParams()

  const emp =
    employeesData[employeeId] ??
    defaultEmployee

  return (
    <DashboardShell title="" subtitle="">
      {/* Back */}
      <Link
        to="/business/payroll/analysis"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
      >
        <IoArrowBack size={16} />
        Back to Payroll Analysis
      </Link>

      {/* Header */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
        {/* Employee */}
        <div className="flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <Avatar className="h-14 w-14 flex-shrink-0">
            {emp.imageSrc && (
              <AvatarImage
                src={emp.imageSrc}
                alt={emp.name}
              />
            )}

            <AvatarFallback
              className={`${emp.avatarBg} text-sm font-semibold`}
            >
              {emp.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                {emp.name}
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <p className="text-sm text-zinc-500">
              {emp.role}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Since {emp.startDate}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <SummaryCard
            label="Total Payroll Amount"
            value={emp.totalPay}
            sub="This Pay Period"
            icon={HiOutlineUserGroup}
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />

          <SummaryCard
            label="Total Hours Logged"
            value={emp.totalHours}
            sub="This Pay Period"
            icon={FiClock}
            iconBg="bg-sky-100"
            iconColor="text-sky-600"
          />

          <SummaryCard
            label="Payroll Date"
            value={emp.payrollDate}
            sub={emp.payrollDateSub}
            icon={FiCalendar}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
          />

          <SummaryCard
            label="Payment Method"
            value={emp.paymentMethod}
            sub={emp.paymentMethodSub}
            icon={TbBuildingBank}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>
      </div>

      {/* Main */}
      <section className="flex min-w-0 items-start gap-6">
        {/* Left */}
        <div className="min-w-0 flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WhyCard emp={emp} />

            <AmountBreakdownCard emp={emp} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <EarningsTable emp={emp} />

            <HoursOverviewCard emp={emp} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DeductionsTable emp={emp} />

            <NetPayCard emp={emp} />
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className="flex-shrink-0 space-y-6"
          style={{ width: "320px" }}
        >
          <CalculationDetailsCard />

          <DataSourcesCard emp={emp} />

          <SupportCard />
        </aside>
      </section>
    </DashboardShell>
  )
}

export default EmployeePayrollDetail