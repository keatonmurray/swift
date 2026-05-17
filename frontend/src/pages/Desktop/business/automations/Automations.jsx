import { useState } from "react"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { LuPlus, LuFilter, LuChevronDown, LuCalendar, LuExternalLink, LuShieldCheck, LuBan, LuCreditCard, LuArrowLeftRight } from "react-icons/lu"
import { FiClock, FiCalendar, FiAlertTriangle } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"
import { TbBuildingBank, TbInfoCircle } from "react-icons/tb"
import ReactCountryFlag from "react-country-flag"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import DataTable from "@/pages/Desktop/components/DataTable"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Active Automations",
    value: "6",
    sub: "Across all countries",
    icon: FiClock,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Upcoming Payrolls",
    value: "3",
    sub: "Next 30 days",
    icon: FiCalendar,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Total Employees",
    value: "18",
    sub: "In automated payrolls",
    icon: HiOutlineUserGroup,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Total Payroll Amount",
    value: "$120,450.00",
    sub: "Across upcoming payrolls",
    icon: TbBuildingBank,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
]

const automations = [
  {
    id: 1,
    name: "Monthly Payroll - Singapore",
    method: "Bank Transfer",
    country: "Singapore",
    countryCode: "SG",
    employees: 5,
    frequency: "Monthly",
    payrollDay: "Day 30",
    payrollSub: "Every month",
    nextPayment: "May 30, 2025",
    nextSub: "In 9 days",
    amount: "S$26,000.00",
    status: "active",
  },
  {
    id: 2,
    name: "Monthly Payroll - Philippines",
    method: "Bank Transfer",
    country: "Philippines",
    countryCode: "PH",
    employees: 4,
    frequency: "Monthly",
    payrollDay: "Day 30",
    payrollSub: "Every month",
    nextPayment: "May 30, 2025",
    nextSub: "In 9 days",
    amount: "\u20B134,000.00",
    status: "active",
  },
  {
    id: 3,
    name: "Bi-weekly Payroll - US",
    method: "Bank Transfer",
    country: "United States",
    countryCode: "US",
    employees: 3,
    frequency: "Every 2 weeks",
    payrollDay: "Every Friday",
    payrollSub: "",
    nextPayment: "May 30, 2025",
    nextSub: "In 9 days",
    amount: "$18,000.00",
    status: "active",
  },
  {
    id: 4,
    name: "Monthly Payroll - UK",
    method: "Bank Transfer",
    country: "United Kingdom",
    countryCode: "GB",
    employees: 2,
    frequency: "Monthly",
    payrollDay: "Day 15",
    payrollSub: "Every month",
    nextPayment: "Jun 15, 2025",
    nextSub: "In 25 days",
    amount: "\u00A38,200.00",
    status: "active",
  },
  {
    id: 5,
    name: "Monthly Payroll - Germany",
    method: "Bank Transfer",
    country: "Germany",
    countryCode: "DE",
    employees: 2,
    frequency: "Monthly",
    payrollDay: "Day 25",
    payrollSub: "Every month",
    nextPayment: "Jun 25, 2025",
    nextSub: "In 35 days",
    amount: "\u20AC6,750.00",
    status: "active",
  },
  {
    id: 6,
    name: "Monthly Payroll - India",
    method: "Bank Transfer",
    country: "India",
    countryCode: "IN",
    employees: 2,
    frequency: "Monthly",
    payrollDay: "Day 1",
    payrollSub: "Every month",
    nextPayment: "Jun 1, 2025",
    nextSub: "In 11 days",
    amount: "\u20B926,500.00",
    status: "paused",
  },
]

const paymentRules = [
  {
    id: 1,
    name: "Weekend Cut-off Rule",
    desc: "Payments submitted on weekends will be processed on the next business day.",
    icon: FiClock,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    countries: "All",
    countriesIcon: "globe",
    appliesTo: "All payrolls",
    conditions: "Submission day is Saturday or Sunday",
    actions: "Process on next business day",
    status: "active",
    lastUpdated: "May 20, 2025",
    updatedBy: "Alex Morgan",
  },
  {
    id: 2,
    name: "Payment Lead Time Rule",
    desc: "Ensure enough time for payments to reach employees.",
    icon: FiClock,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    countries: "+4",
    countriesFlags: ["GB", "US"],
    appliesTo: "All payrolls",
    conditions: "Lead time is less than 1 business day",
    actions: "Block submission and show warning",
    status: "active",
    lastUpdated: "May 18, 2025",
    updatedBy: "Alex Morgan",
  },
  {
    id: 3,
    name: "High Amount Approval",
    desc: "Requires approval for high value payrolls.",
    icon: FiAlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    countries: "All",
    countriesIcon: "globe",
    appliesTo: "Payroll amount > $50,000",
    conditions: "Total payroll amount is greater than $50,000",
    actions: "Require approval before processing",
    status: "active",
    lastUpdated: "May 15, 2025",
    updatedBy: "Alex Morgan",
  },
  {
    id: 4,
    name: "Blocked Country Rule",
    desc: "Prevent payments to restricted countries.",
    icon: LuBan,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    countries: "3 countries",
    countriesIcon: "ban",
    appliesTo: "All payrolls",
    conditions: "Destination country is in blocked countries",
    actions: "Block payment and show error",
    status: "active",
    lastUpdated: "May 10, 2025",
    updatedBy: "Alex Morgan",
  },
  {
    id: 5,
    name: "Preferred Payment Method",
    desc: "Use preferred payment methods by country.",
    icon: LuCreditCard,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    countries: "8 countries",
    countriesIcon: "globe",
    appliesTo: "All payrolls",
    conditions: "Based on destination country",
    actions: "Use preferred payment method",
    status: "draft",
    lastUpdated: "May 6, 2025",
    updatedBy: "Alex Morgan",
  },
  {
    id: 6,
    name: "Currency Conversion Rule",
    desc: "Set preferred currencies and conversion behavior.",
    icon: LuArrowLeftRight,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    countries: "All",
    countriesIcon: "globe",
    appliesTo: "Multi-currency payrolls",
    conditions: "When currency is not available",
    actions: "Convert to preferred currency",
    status: "draft",
    lastUpdated: "May 5, 2025",
    updatedBy: "Alex Morgan",
  },
]

const tabs = ["Payroll Automations", "Payment Rules"]

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
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
      <p className="text-[12px] text-gray-500">{card.sub}</p>
    </div>
    <span className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>
      <card.icon size={18} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Automations = () => {
  const [activeTab, setActiveTab] = useState("Payroll Automations")

  return (
    <DashboardShell
      title="Automations"
      subtitle="Set up recurring payrolls and automate your payment schedules"
    >
      {/* Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      {/* Tabs + Create button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`relative pb-3 text-[13px] font-semibold transition-colors ${
                activeTab === t ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {t}
              {activeTab === t && (
                <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        <button className="inline-flex items-center gap-2 bg-black text-white rounded-full px-5 h-10 text-[13px] font-semibold hover:bg-gray-900 transition-colors">
          <LuPlus size={14} />
          {activeTab === "Payroll Automations" ? "Create Payroll Automation" : "Create Payment Rule"}
        </button>
      </div>

      {/* Description + filters */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-gray-500">
          {activeTab === "Payroll Automations"
            ? "Create recurring payrolls and set payment dates for your employees."
            : "Set global rules to control how payrolls are processed and payments are made."}
        </p>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
            All Countries
            <LuChevronDown size={12} className="text-gray-400" />
          </button>
          <button className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <LuFilter size={12} />
            Filter
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "Payroll Automations" ? (
        <>
          <DataTable
            className="mb-4"
            columns={[
              {
                key: "name",
                header: "Automation Name",
                render: (a) => (
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                      <TbBuildingBank size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">{a.name}</p>
                      <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{a.method}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: "country",
                header: "Country",
                render: (a) => (
                  <span className="inline-flex items-center gap-1.5">
                    <ReactCountryFlag
                      countryCode={a.countryCode}
                      svg
                      style={{ width: "1.1em", height: "0.8em", borderRadius: "2px" }}
                    />
                    {a.country}
                  </span>
                ),
                cellClassName: "text-gray-500",
              },
              {
                key: "employees",
                header: "Employees",
                accessor: "employees",
                cellClassName: "text-gray-900 font-semibold tabular-nums text-center",
              },
              {
                key: "frequency",
                header: "Frequency",
                accessor: "frequency",
                cellClassName: "text-gray-500",
              },
              {
                key: "payrollDate",
                header: "Payroll Date",
                render: (a) => (
                  <div className="flex items-center gap-1.5">
                    <LuCalendar size={12} className="text-gray-400" />
                    <div>
                      <p className="text-[13px] text-gray-900 leading-tight">{a.payrollDay}</p>
                      {a.payrollSub && <p className="text-[11px] text-gray-400 leading-tight">{a.payrollSub}</p>}
                    </div>
                  </div>
                ),
              },
              {
                key: "nextPayment",
                header: "Next Payment",
                render: (a) => (
                  <div>
                    <p className="text-[13px] text-gray-900 leading-tight">{a.nextPayment}</p>
                    <p className="text-[11px] text-gray-400 leading-tight">{a.nextSub}</p>
                  </div>
                ),
              },
              {
                key: "amount",
                header: "Total Amount",
                accessor: "amount",
                cellClassName: "text-gray-900 font-semibold tabular-nums",
              },
              {
                key: "status",
                header: "Status",
                render: (a) =>
                  a.status === "active" ? (
                    <StatusBadge variant="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">Paused</StatusBadge>
                  ),
              },
              {
                key: "actions",
                header: "Actions",
                render: () => (
                  <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <IoEllipsisHorizontal size={16} />
                  </button>
                ),
                cellClassName: "text-center",
              },
            ]}
            rows={automations}
            getRowKey={(a) => a.id}
          />

          {/* Footer info */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-[20px] px-5 py-4">
            <p className="text-[12px] text-gray-500 flex items-center gap-2">
              <TbInfoCircle size={14} className="text-gray-400 flex-shrink-0" />
              Payroll dates are set per automation and will be used for all employees in that automation.
              You can edit or pause automations anytime.
            </p>
            <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors flex-shrink-0">
              Learn more about automations
              <LuExternalLink size={12} />
            </button>
          </div>
        </>
      ) : (
        <>
          <DataTable
            className="mb-4"
            columns={[
              {
                key: "name",
                header: "Rule Name",
                render: (r) => (
                  <div className="flex items-center gap-3">
                    <span className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${r.iconBg} ${r.iconColor}`}>
                      <r.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">{r.name}</p>
                      <p className="text-[11px] text-gray-400 leading-tight mt-0.5 max-w-[200px] truncate">{r.desc}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: "countries",
                header: "Countries",
                render: (r) => (
                  <span className="inline-flex items-center gap-1.5 text-gray-700">
                    {r.countriesFlags ? (
                      <>
                        {r.countriesFlags.map((code) => (
                          <ReactCountryFlag
                            key={code}
                            countryCode={code}
                            svg
                            style={{ width: "1.1em", height: "0.8em", borderRadius: "2px" }}
                          />
                        ))}
                        <span className="text-[12px] text-gray-500">{r.countries}</span>
                      </>
                    ) : (
                      <span className="text-[12px] flex items-center gap-1">
                        <LuShieldCheck size={12} className="text-gray-400" />
                        {r.countries}
                      </span>
                    )}
                  </span>
                ),
              },
              {
                key: "appliesTo",
                header: "Applies To",
                accessor: "appliesTo",
                cellClassName: "text-gray-500",
              },
              {
                key: "conditions",
                header: "Conditions",
                render: (r) => (
                  <span className="text-gray-700">
                    <span className="text-gray-400 mr-1">&bull;</span>
                    {r.conditions}
                  </span>
                ),
              },
              {
                key: "ruleActions",
                header: "Actions",
                accessor: "actions",
                cellClassName: "text-gray-700",
              },
              {
                key: "status",
                header: "Status",
                render: (r) =>
                  r.status === "active" ? (
                    <StatusBadge variant="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">Draft</StatusBadge>
                  ),
              },
              {
                key: "lastUpdated",
                header: "Last Updated",
                render: (r) => (
                  <div>
                    <p className="text-[13px] text-gray-900 leading-tight">{r.lastUpdated}</p>
                    <p className="text-[11px] text-gray-400 leading-tight">by {r.updatedBy}</p>
                  </div>
                ),
              },
              {
                key: "rowActions",
                header: "Actions",
                render: () => (
                  <button className="text-gray-300 hover:text-gray-600 transition-colors">
                    <IoEllipsisHorizontal size={16} />
                  </button>
                ),
                cellClassName: "text-center",
              },
            ]}
            rows={paymentRules}
            getRowKey={(r) => r.id}
          />

          {/* Footer info */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-[20px] px-5 py-4">
            <p className="text-[12px] text-gray-500 flex items-center gap-2">
              <TbInfoCircle size={14} className="text-gray-400 flex-shrink-0" />
              Payment rules help you enforce policies and automate decisions across all your payrolls.
              Rules are evaluated in order from top to bottom.
            </p>
            <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors flex-shrink-0">
              Learn more about payment rules
              <LuExternalLink size={12} />
            </button>
          </div>
        </>
      )}
    </DashboardShell>
  )
}

export default Automations
