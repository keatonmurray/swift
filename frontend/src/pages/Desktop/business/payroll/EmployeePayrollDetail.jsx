import { useParams, Link } from "react-router-dom"
import { IoArrowBack, IoCheckmarkSharp, IoDownloadOutline } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { LuArrowRight, LuChevronDown, LuCircleHelp } from "react-icons/lu"
import { FiClock, FiCalendar, FiMessageCircle } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"
import { TbBuildingBank } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      { label: "Regular Pay",          dot: "bg-violet-500",  amount: "$6,400.00", pct: "96.9%" },
      { label: "Overtime Pay",         dot: "bg-blue-500",    amount: "$400.00",   pct: "6.1%"  },
      { label: "Bonuses & Incentives", dot: "bg-amber-500",   amount: "$0.00",     pct: "0%"    },
      { label: "Allowances",           dot: "bg-emerald-500", amount: "$0.00",     pct: "0%"    },
      { label: "Reimbursements",       dot: "bg-pink-500",    amount: "$0.00",     pct: "0%"    },
    ],
    totalBeforeDeductions: "$6,800.00",
    deductions: "-$192.00",
    deductionsPct: "-2.9%",
    earnings: [
      { type: "Regular Pay",           hours: "152.00 hrs", rate: "$40.00/hr", amount: "$6,080.00" },
      { type: "Overtime Pay (1.5x)",   hours: "8.00 hrs",   rate: "$60.00/hr", amount: "$480.00"   },
      { type: "Bonuses & Incentives",  hours: "—",          rate: "—",         amount: "$0.00"     },
      { type: "Allowances",            hours: "—",          rate: "—",         amount: "$0.00"     },
      { type: "Reimbursements",        hours: "—",          rate: "—",         amount: "$0.00"     },
    ],
    totalEarnings: "$6,560.00",
    totalEarningsHours: "160.00 hrs",
    hoursBreakdown: {
      total: "160.00 hrs",
      delta: "+12.50 hrs vs last period",
      regular: { label: "Regular (152.00 hrs)", pct: 95 },
      overtime: { label: "Overtime (8.00 hrs)",  pct: 5  },
      other:    { label: "Other (0.00 hrs)",      pct: 0  },
    },
    deductionRows: [
      { type: "Federal Income Tax",       calc: "10% of taxable income", amount: "-$480.00" },
      { type: "Social Security (FICA)",   calc: "6.2% of gross pay",     amount: "-$408.00" },
      { type: "Medicare (FICA)",          calc: "1.45% of gross pay",    amount: "-$95.00"  },
      { type: "Health Insurance",         calc: "Employee contribution",  amount: "-$150.00" },
    ],
    totalDeductions: "-$1,133.00",
    netPay: "$6,608.00",
    netPayMethod: "via Bank Transfer on May 30, 2025",
    dataSources: [
      { label: "QuickBooks Timesheets", value: "160.00 hours"    },
      { label: "QuickBooks Payroll",    value: "Employee pay rate" },
      { label: "Tax Tables",            value: "United States"   },
      { label: "Currency Rates",        value: "USD"             },
    ],
  },
}

const defaultEmployee = employeesData[1]

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4 min-w-0">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-gray-500 leading-none mb-2 truncate">{label}</p>
      <AnimatedValue
        value={value}
        duration={1400}
        className="text-[18px] font-semibold text-gray-900 tracking-tight leading-none mb-2 block"
      />
      <p className="text-[12px] text-gray-500">{sub}</p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
      <Icon size={18} />
    </span>
  </div>
)

const WhyCard = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Why this payroll amount?</h3>
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-[12px] font-semibold text-gray-900 flex items-center gap-1.5 mb-3">
        <HiOutlineSparkles size={13} className="text-violet-600" />
        Gemini analyzed {emp.name.split(" ")[0]}&apos;s payroll data and found:
      </p>
      <ul className="space-y-2 mb-4">
        {emp.aiFindings.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12px] text-gray-700">
            <IoCheckmarkSharp size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-gray-700 mb-3">
        Total calculated amount:{" "}
        <span className="font-semibold text-gray-900">{emp.totalPay}</span>
      </p>
      <button className="w-full inline-flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
        View Calculation Breakdown
        <LuChevronDown size={13} />
      </button>
    </div>
  </div>
)

const AmountBreakdownCard = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Amount Breakdown</h3>
    <ul className="space-y-3">
      {emp.breakdown.map((r) => (
        <li key={r.label} className="flex items-center text-[13px] gap-2">
          <span className={`h-2 w-2 rounded-full flex-shrink-0 ${r.dot}`} />
          <span className="text-gray-700 flex-1 min-w-0 truncate">{r.label}</span>
          <span className="text-gray-900 font-semibold tabular-nums flex-shrink-0">{r.amount}</span>
          <span className="text-gray-400 tabular-nums w-10 text-right flex-shrink-0">{r.pct}</span>
        </li>
      ))}
    </ul>
    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5 text-[13px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-900 flex-shrink-0" />
          Total Before Deductions
        </span>
        <span className="text-gray-900 font-semibold tabular-nums flex-shrink-0">{emp.totalBeforeDeductions}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-700 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
          Deductions &amp; Taxes
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-rose-600 font-semibold tabular-nums">{emp.deductions}</span>
          <span className="text-gray-400 tabular-nums">{emp.deductionsPct}</span>
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
      <span className="text-[13px] font-semibold text-gray-900">Total Payroll Amount</span>
      <span className="text-[15px] font-semibold text-gray-900 tabular-nums flex-shrink-0">{emp.totalPay}</span>
    </div>
  </div>
)

const EarningsTable = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5 overflow-hidden">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Employee Breakdown</h3>
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            {["Earning Type", "Hours", "Rate", "Amount"].map((h) => (
              <th key={h} className="pb-3 pr-5 last:pr-0 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emp.earnings.map((r) => (
            <tr key={r.type} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td className="py-3 pr-5 text-[13px] text-gray-900">{r.type}</td>
              <td className="py-3 pr-5 text-[13px] text-gray-500 tabular-nums">{r.hours}</td>
              <td className="py-3 pr-5 text-[13px] text-gray-500 tabular-nums">{r.rate}</td>
              <td className="py-3 text-[13px] text-gray-900 font-semibold tabular-nums">{r.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="py-3 pr-5 text-[13px] font-semibold text-gray-900">Total Earnings</td>
            <td className="py-3 pr-5 text-[13px] font-semibold text-gray-900 tabular-nums">{emp.totalEarningsHours}</td>
            <td className="py-3 pr-5" />
            <td className="py-3 text-[13px] font-semibold text-gray-900 tabular-nums">{emp.totalEarnings}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

const HoursOverviewCard = ({ emp }) => {
  const h = emp.hoursBreakdown
  const circumference = 2 * Math.PI * 14  // ≈ 87.96
  const regularDash  = (h.regular.pct / 100) * circumference
  const overtimeDash = (h.overtime.pct / 100) * circumference

  return (
    <div className="bg-white border border-gray-200 rounded-[20px] p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Hours Overview</h3>

      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Hours</p>
      <p className="text-[24px] font-semibold text-gray-900 tracking-tight leading-none mb-1">{h.total}</p>
      <p className="text-[12px] text-emerald-600 font-medium mb-5">{h.delta}</p>

      <div className="flex items-center gap-5">
        {/* Donut chart */}
        <div className="relative h-[88px] w-[88px] flex-shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
            {/* Regular */}
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="#10b981" strokeWidth="4"
              strokeDasharray={`${regularDash} ${circumference}`}
              strokeLinecap="round"
            />
            {/* Overtime */}
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="#3b82f6" strokeWidth="4"
              strokeDasharray={`${overtimeDash} ${circumference}`}
              strokeDashoffset={-regularDash}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Legend */}
        <ul className="space-y-2.5 flex-1 min-w-0">
          <li className="flex items-center justify-between gap-2 text-[12px]">
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-gray-700 truncate">{h.regular.label}</span>
            </span>
            <span className="text-gray-400 tabular-nums flex-shrink-0">{h.regular.pct}%</span>
          </li>
          <li className="flex items-center justify-between gap-2 text-[12px]">
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span className="text-gray-700 truncate">{h.overtime.label}</span>
            </span>
            <span className="text-gray-400 tabular-nums flex-shrink-0">{h.overtime.pct}%</span>
          </li>
          <li className="flex items-center justify-between gap-2 text-[12px]">
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full bg-gray-300 flex-shrink-0" />
              <span className="text-gray-700 truncate">{h.other.label}</span>
            </span>
            <span className="text-gray-400 tabular-nums flex-shrink-0">{h.other.pct}%</span>
          </li>
        </ul>
      </div>

      <button className="mt-5 w-full inline-flex items-center justify-between text-[12px] font-semibold text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors">
        View Timesheet Details
        <LuArrowRight size={12} />
      </button>
    </div>
  )
}

const DeductionsTable = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5 overflow-hidden">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Deductions &amp; Taxes</h3>
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            {["Deduction Type", "Calculation", "Amount"].map((h) => (
              <th key={h} className="pb-3 pr-5 last:pr-0 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {emp.deductionRows.map((r) => (
            <tr key={r.type} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
              <td className="py-3 pr-5 text-[13px] text-gray-900">{r.type}</td>
              <td className="py-3 pr-5 text-[13px] text-gray-500">{r.calc}</td>
              <td className="py-3 text-[13px] text-rose-600 font-semibold tabular-nums">{r.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="py-3 pr-5 text-[13px] font-semibold text-gray-900">Total Deductions</td>
            <td className="py-3 pr-5 text-[13px] text-gray-500">&mdash;</td>
            <td className="py-3 text-[13px] text-rose-600 font-semibold tabular-nums">{emp.totalDeductions}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

const NetPayCard = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Net Pay</h3>

    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] text-gray-600 mb-1">
            {emp.name.split(" ")[0]} will receive
          </p>
          <p className="text-[28px] font-semibold text-gray-900 tracking-tight leading-none mb-2">
            {emp.netPay}
          </p>
          <p className="text-[12px] text-gray-500">{emp.netPayMethod}</p>
        </div>
        {/* Wallet icon decorative */}
        <span className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <TbBuildingBank size={18} className="text-emerald-600" />
        </span>
      </div>
    </div>

    <button className="w-full inline-flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
      <IoDownloadOutline size={14} />
      Download Pay Stub
    </button>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Sidebar cards                                                              */
/* -------------------------------------------------------------------------- */

const calculationSteps = [
  { title: "Step 1: Hours & Pay Rates",   body: "Timesheet hours × employee pay rates"          },
  { title: "Step 2: Additional Pay",      body: "Overtime, bonuses, allowances"                  },
  { title: "Step 3: Deductions",          body: "Taxes, benefits, other deductions"              },
  { title: "Step 4: Currency Conversion", body: "Multi-currency conversion to base currency"     },
]

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

const DataSourcesCard = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Data Sources</h3>
    <ul className="space-y-3">
      {emp.dataSources.map((d) => (
        <li key={d.label} className="flex items-center justify-between gap-2 text-[13px]">
          <span className="text-gray-700 flex items-center gap-2 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="truncate">{d.label}</span>
          </span>
          <span className="text-gray-500 tabular-nums flex-shrink-0 text-right">{d.value}</span>
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

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const EmployeePayrollDetail = () => {
  const { employeeId } = useParams()
  const emp = employeesData[employeeId] ?? defaultEmployee

  return (
    <DashboardShell title="" subtitle="">
      {/* Back link */}
      <Link
        to="/business/payroll/analysis"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4 -mt-2"
      >
        <IoArrowBack size={14} />
        Back to Payroll Analysis
      </Link>

      {/* ------------------------------------------------------------------ */}
      {/* Employee header + summary cards in one flex row                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-stretch gap-4 mb-4 min-w-0">
        {/* Avatar + name block — fixed width so it never collapses */}
        <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center gap-4 flex-shrink-0" style={{ minWidth: "220px" }}>
          <Avatar className="h-12 w-12 flex-shrink-0">
            {emp.imageSrc && <AvatarImage src={emp.imageSrc} alt={emp.name} />}
            <AvatarFallback className={`${emp.avatarBg} text-sm font-semibold`}>{emp.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <h2 className="text-[16px] font-semibold text-gray-900 tracking-tight leading-tight">{emp.name}</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5 flex-shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
            <p className="text-[12px] text-gray-500 leading-tight">{emp.role}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Since {emp.startDate}</p>
          </div>
        </div>

        {/* Summary cards — fill remaining space */}
        <div className="flex-1 min-w-0 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <SummaryCard
            label="Total Payroll Amount"
            value={emp.totalPay}
            sub="This Pay Period"
            icon={HiOutlineUserGroup}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
          <SummaryCard
            label="Total Hours Logged"
            value={emp.totalHours}
            sub="This Pay Period"
            icon={FiClock}
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
          />
          <SummaryCard
            label="Payroll Date"
            value={emp.payrollDate}
            sub={emp.payrollDateSub}
            icon={FiCalendar}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <SummaryCard
            label="Payment Method"
            value={emp.paymentMethod}
            sub={emp.paymentMethodSub}
            icon={TbBuildingBank}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main 2-column layout: flex so sidebar width is fixed               */}
      {/* ------------------------------------------------------------------ */}
      <section className="flex gap-4 items-start min-w-0">

        {/* Left — main content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Why + Amount Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WhyCard emp={emp} />
            <AmountBreakdownCard emp={emp} />
          </div>

          {/* Earnings table + Hours donut */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EarningsTable emp={emp} />
            <HoursOverviewCard emp={emp} />
          </div>

          {/* Deductions + Net Pay */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeductionsTable emp={emp} />
            <NetPayCard emp={emp} />
          </div>
        </div>

        {/* Right — sidebar fixed at 280px, never shrinks */}
        <aside className="flex-shrink-0 space-y-4" style={{ width: "280px" }}>
          <CalculationDetailsCard />
          <DataSourcesCard emp={emp} />
          <SupportCard />
        </aside>
      </section>
    </DashboardShell>
  )
}

export default EmployeePayrollDetail