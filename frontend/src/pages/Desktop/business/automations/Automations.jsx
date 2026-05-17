import { useState } from "react"

import { IoEllipsisHorizontal } from "react-icons/io5"

import {
  LuPlus,
  LuFilter,
  LuChevronDown,
  LuCalendar,
  LuExternalLink,
  LuShieldCheck,
  LuBan,
  LuCreditCard,
  LuArrowLeftRight,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiAlertTriangle,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import {
  TbBuildingBank,
  TbInfoCircle,
} from "react-icons/tb"

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
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Upcoming Payrolls",
    value: "3",
    sub: "Next 30 days",
    icon: FiCalendar,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    label: "Total Employees",
    value: "18",
    sub: "In automated payrolls",
    icon: HiOutlineUserGroup,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Total Payroll Amount",
    value: "$120,450.00",
    sub: "Across upcoming payrolls",
    icon: TbBuildingBank,
    iconBg: "bg-emerald-100",
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
    amount: "₱34,000.00",
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
]

const paymentRules = [
  {
    id: 1,
    name: "Weekend Cut-off Rule",
    desc: "Payments submitted on weekends will be processed on the next business day.",
    icon: FiClock,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    countries: "All",
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
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    countries: "+4",
    appliesTo: "All payrolls",
    conditions: "Lead time is less than 1 business day",
    actions: "Block submission and show warning",
    status: "active",
    lastUpdated: "May 18, 2025",
    updatedBy: "Alex Morgan",
  },
]

const tabs = [
  "Payroll Automations",
  "Payment Rules",
]

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ card }) => (
  <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 min-w-0">
    <div className="min-w-0 flex-1">
      <p className="mb-3 truncate text-sm text-zinc-500">
        {card.label}
      </p>

      <AnimatedValue
        value={card.value}
        duration={1400}
        className="mb-3 block text-2xl font-semibold tracking-tight text-zinc-900"
      />

      <p className="text-sm text-zinc-500">
        {card.sub}
      </p>
    </div>

    <span
      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
    >
      <card.icon size={22} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Automations = () => {
  const [activeTab, setActiveTab] =
    useState("Payroll Automations")

  return (
    <DashboardShell
      title="Automations"
      subtitle="Set up recurring payrolls and automate your payment schedules"
    >
      {/* Summary cards */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <SummaryCard
            key={c.label}
            card={c}
          />
        ))}
      </section>

      {/* Tabs + CTA */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-8 border-b border-zinc-200">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`relative pb-4 text-sm font-semibold transition-colors ${
                activeTab === t
                  ? "text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {t}

              {activeTab === t && (
                <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-black" />
              )}
            </button>
          ))}
        </div>

        <button className="inline-flex h-12 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-900">
          <LuPlus size={16} />

          {activeTab === "Payroll Automations"
            ? "Create Payroll Automation"
            : "Create Payment Rule"}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {activeTab === "Payroll Automations"
            ? "Create recurring payrolls and set payment dates for your employees."
            : "Set global rules to control how payrolls are processed and payments are made."}
        </p>

        <div className="flex items-center gap-3">
          <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
            All Countries

            <LuChevronDown
              size={16}
              className="text-zinc-400"
            />
          </button>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
            <LuFilter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Payroll Automations */}
      {activeTab === "Payroll Automations" ? (
        <>
          <DataTable
            className="mb-5"
            columns={[
              {
                key: "name",
                header: "Automation Name",
                render: (a) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
                      <TbBuildingBank size={18} />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 leading-tight">
                        {a.name}
                      </p>

                      <p className="mt-1 text-sm text-zinc-400 leading-tight">
                        {a.method}
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                key: "country",
                header: "Country",
                render: (a) => (
                  <span className="inline-flex items-center gap-2 text-sm text-zinc-700">
                    <ReactCountryFlag
                      countryCode={a.countryCode}
                      svg
                      style={{
                        width: "1.1em",
                        height: "0.8em",
                        borderRadius: "2px",
                      }}
                    />

                    {a.country}
                  </span>
                ),
                cellClassName: "text-zinc-500",
              },
              {
                key: "employees",
                header: "Employees",
                accessor: "employees",
                cellClassName:
                  "text-zinc-900 font-semibold tabular-nums text-center text-sm",
              },
              {
                key: "frequency",
                header: "Frequency",
                accessor: "frequency",
                cellClassName:
                  "text-zinc-500 text-sm",
              },
              {
                key: "payrollDate",
                header: "Payroll Date",
                render: (a) => (
                  <div className="flex items-center gap-2">
                    <LuCalendar
                      size={14}
                      className="text-zinc-400"
                    />

                    <div>
                      <p className="text-sm text-zinc-900 leading-tight">
                        {a.payrollDay}
                      </p>

                      {a.payrollSub && (
                        <p className="mt-1 text-sm text-zinc-400 leading-tight">
                          {a.payrollSub}
                        </p>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                key: "nextPayment",
                header: "Next Payment",
                render: (a) => (
                  <div>
                    <p className="text-sm text-zinc-900 leading-tight">
                      {a.nextPayment}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400 leading-tight">
                      {a.nextSub}
                    </p>
                  </div>
                ),
              },
              {
                key: "amount",
                header: "Total Amount",
                accessor: "amount",
                cellClassName:
                  "text-zinc-900 font-semibold tabular-nums text-sm",
              },
              {
                key: "status",
                header: "Status",
                render: (a) =>
                  a.status === "active" ? (
                    <StatusBadge variant="success">
                      Active
                    </StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">
                      Paused
                    </StatusBadge>
                  ),
              },
              {
                key: "actions",
                header: "",
                render: () => (
                  <button className="text-zinc-300 transition hover:text-zinc-600">
                    <IoEllipsisHorizontal size={18} />
                  </button>
                ),
                cellClassName: "text-center",
              },
            ]}
            rows={automations}
            getRowKey={(a) => a.id}
          />

          {/* Footer */}
          <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="flex items-center gap-3 text-sm text-zinc-500">
              <TbInfoCircle
                size={18}
                className="flex-shrink-0 text-zinc-400"
              />

              Payroll dates are set per automation and will be used for all employees in that automation.
              You can edit or pause automations anytime.
            </p>

            <button className="inline-flex h-11 flex-shrink-0 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
              Learn more about automations

              <LuExternalLink size={16} />
            </button>
          </div>
        </>
      ) : (
        <>
          <DataTable
            className="mb-5"
            columns={[
              {
                key: "name",
                header: "Rule Name",
                render: (r) => (
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${r.iconBg} ${r.iconColor}`}
                    >
                      <r.icon size={18} />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 leading-tight">
                        {r.name}
                      </p>

                      <p className="mt-1 max-w-[220px] truncate text-sm text-zinc-400 leading-tight">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                key: "countries",
                header: "Countries",
                render: (r) => (
                  <span className="inline-flex items-center gap-2 text-sm text-zinc-700">
                    <LuShieldCheck
                      size={14}
                      className="text-zinc-400"
                    />

                    {r.countries}
                  </span>
                ),
              },
              {
                key: "appliesTo",
                header: "Applies To",
                accessor: "appliesTo",
                cellClassName:
                  "text-zinc-500 text-sm",
              },
              {
                key: "conditions",
                header: "Conditions",
                render: (r) => (
                  <span className="text-sm text-zinc-700">
                    <span className="mr-1 text-zinc-400">
                      •
                    </span>

                    {r.conditions}
                  </span>
                ),
              },
              {
                key: "ruleActions",
                header: "Actions",
                accessor: "actions",
                cellClassName:
                  "text-zinc-700 text-sm",
              },
              {
                key: "status",
                header: "Status",
                render: (r) =>
                  r.status === "active" ? (
                    <StatusBadge variant="success">
                      Active
                    </StatusBadge>
                  ) : (
                    <StatusBadge variant="neutral">
                      Draft
                    </StatusBadge>
                  ),
              },
              {
                key: "lastUpdated",
                header: "Last Updated",
                render: (r) => (
                  <div>
                    <p className="text-sm text-zinc-900 leading-tight">
                      {r.lastUpdated}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400 leading-tight">
                      by {r.updatedBy}
                    </p>
                  </div>
                ),
              },
              {
                key: "rowActions",
                header: "",
                render: () => (
                  <button className="text-zinc-300 transition hover:text-zinc-600">
                    <IoEllipsisHorizontal size={18} />
                  </button>
                ),
                cellClassName: "text-center",
              },
            ]}
            rows={paymentRules}
            getRowKey={(r) => r.id}
          />

          {/* Footer */}
          <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="flex items-center gap-3 text-sm text-zinc-500">
              <TbInfoCircle
                size={18}
                className="flex-shrink-0 text-zinc-400"
              />

              Payment rules help you enforce policies and automate decisions across all your payrolls.
              Rules are evaluated in order from top to bottom.
            </p>

            <button className="inline-flex h-11 flex-shrink-0 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
              Learn more about payment rules

              <LuExternalLink size={16} />
            </button>
          </div>
        </>
      )}
    </DashboardShell>
  )
}

export default Automations