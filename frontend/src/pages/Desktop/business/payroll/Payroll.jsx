import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoWalletOutline,
  IoClose,
  IoSettingsOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuShieldCheck,
  LuRefreshCw,
  LuFilter,
  LuChevronDown,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiGlobe,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import ReactCountryFlag from "react-country-flag"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total Payroll Amount",
    value: "$80,700.00",
    sub: "18 employees · 6 countries",
    icon: HiOutlineUserGroup,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Payment Currencies",
    value: "3",
    sub: "USD, EUR, PHP",
    icon: FiGlobe,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    label: "Earliest Payout Date",
    value: "May 30, 2025",
    sub: "Tomorrow",
    icon: FiCalendar,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Cash After Payroll",
    value: "$97,840.20",
    sub: "Healthy",
    subDot: "bg-emerald-500",
    subColor: "text-emerald-600",
    icon: IoWalletOutline,
    iconBg: "bg-emerald-100",
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
    amount: "₱85,000.00",
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
]

const aiRecommendations = [
  {
    icon: LuRefreshCw,
    title: "Convert USD → PHP now",
    body: "PHP is forecasted to strengthen by 0.8% within 48 hours.",
  },
  {
    icon: FiClock,
    title: "Delay EUR contractor payout",
    body: "Waiting 2 days could save ~€78 in FX fees.",
  },
  {
    icon: LuShieldCheck,
    title: "No compliance issues detected",
    body: "All payrolls are compliant with local regulations.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
      checked
        ? "border-black bg-black text-white"
        : "border-zinc-300 bg-white hover:border-zinc-400"
    }`}
  >
    {checked && (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M2 5l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
)

const SummaryCard = ({ card }) => (
  <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
    <div className="min-w-0 flex-1">
      <p className="mb-3 text-sm text-zinc-500">
        {card.label}
      </p>

      <AnimatedValue
        value={card.value}
        duration={1400}
        className="mb-3 block text-3xl font-semibold tracking-tight text-zinc-900"
      />

      <p
        className={`flex items-center gap-2 text-sm ${
          card.subColor ?? "text-zinc-500"
        }`}
      >
        {card.subDot && (
          <span
            className={`h-2 w-2 rounded-full ${card.subDot}`}
          />
        )}

        {card.sub}
      </p>
    </div>

    <span
      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
    >
      <card.icon size={22} />
    </span>
  </div>
)

const PayoutsTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
}) => {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Employee Payouts
        </h3>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
            All Currencies
            <LuChevronDown
              size={14}
              className="text-zinc-400"
            />
          </button>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
            <LuFilter size={14} />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr>
              <th className="w-8 pb-4 text-left">
                <Checkbox
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>

              {[
                "Employee",
                "Country",
                "Currency",
                "Amount",
                "Method",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-wide text-zinc-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((e) => (
              <tr
                key={e.id}
                className="cursor-pointer border-t border-zinc-100 transition-colors hover:bg-zinc-50"
                onClick={() =>
                  navigate(`/business/payroll/analysis/${e.id}`)
                }
              >
                <td
                  className="py-5"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <Checkbox
                    checked={selected.has(e.id)}
                    onChange={() => toggle(e.id)}
                  />
                </td>

                <td className="py-5 pr-6">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      {e.imageSrc && (
                        <AvatarImage
                          src={e.imageSrc}
                          alt={e.name}
                        />
                      )}

                      <AvatarFallback className={e.avatarBg}>
                        {e.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {e.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        {e.role}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5 pr-6 text-sm text-zinc-500">
                  <span className="inline-flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={e.countryCode}
                      svg
                      style={{
                        width: "1.1em",
                        height: "0.8em",
                        borderRadius: "2px",
                      }}
                    />

                    {e.country}
                  </span>
                </td>

                <td className="py-5 pr-6 text-sm text-zinc-500">
                  {e.currency}
                </td>

                <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                  {e.amount}
                </td>

                <td className="py-5 pr-6">
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                    {e.method}
                  </span>
                </td>

                <td className="py-5 pr-6">
                  {e.status === "ready" ? (
                    <StatusBadge variant="success">
                      Ready
                    </StatusBadge>
                  ) : (
                    <StatusBadge
                      variant="info"
                      icon={<FiClock size={10} />}
                    >
                      Scheduled
                    </StatusBadge>
                  )}
                </td>

                <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                  <LuArrowRight size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AIPayrollAssistant = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-2 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
        <HiOutlineSparkles
          size={18}
          className="text-violet-600"
        />

        AI Payroll Assistant
      </h3>

      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
        Beta
      </span>
    </div>

    <p className="mb-6 text-sm text-zinc-500">
      Here's what AI found for today.
    </p>

    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-start gap-3">
        <IoCheckmarkCircle
          className="mt-0.5 text-emerald-600"
          size={18}
        />

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            All salaries can be safely processed today.
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Cash reserves remain healthy after payouts.
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-5">
      {aiRecommendations.map((r) => (
        <div
          key={r.title}
          className="flex items-start gap-4 border-b border-zinc-100 pb-5 last:border-none last:pb-0"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600">
            <r.icon size={16} />
          </span>

          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {r.title}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              {r.body}
            </p>
          </div>
        </div>
      ))}
    </div>

    <Link
      to="/business/payroll/analysis"
      className="mt-6 inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
    >
      View Full Analysis

      <LuArrowRight size={16} />
    </Link>
  </div>
)

const PayrollSummary = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Payroll Summary
    </h3>

    <ul className="space-y-5">
      <li className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Total Employees
        </span>

        <span className="text-sm font-semibold tabular-nums text-zinc-900">
          18
        </span>
      </li>

      <li className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Total Amount
        </span>

        <span className="text-sm font-semibold tabular-nums text-zinc-900">
          $80,700.00
        </span>
      </li>

      <li className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Payroll Date
        </span>

        <span className="text-sm font-semibold text-zinc-900">
          May 30, 2025
        </span>
      </li>

      <li className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Payment Method
        </span>

        <span className="text-sm font-semibold text-zinc-900">
          Rapyd Global Payouts
        </span>
      </li>

      <li className="border-t border-zinc-100 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">
            Funding Source
          </span>

          <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <IoWalletOutline size={16} />
            Primary Wallet (USD)
          </span>
        </div>

        <p className="mt-2 text-right text-xs text-zinc-400">
          $104,152.65 available
        </p>
      </li>
    </ul>
  </div>
)

const SecurityCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-3 flex items-start justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Security & Compliance
      </h3>

      <IoLockClosedOutline
        className="text-zinc-300"
        size={18}
      />
    </div>

    <p className="text-sm leading-relaxed text-zinc-500">
      All payrolls are encrypted and processed securely
      through Rapyd's global payout network.
    </p>
  </div>
)

const ApprovalBar = ({
  selectedCount,
  employeesCount,
  totalAmount,
}) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
          <IoCheckmarkCircle size={20} />
        </span>

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {selectedCount} selected
          </p>

          <p className="text-sm text-zinc-500">
            {employeesCount} employees
          </p>
        </div>
      </div>

      <div className="h-10 w-px bg-zinc-200" />

      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Total Selected
        </p>

        <p className="text-lg font-semibold tabular-nums text-zinc-900">
          {totalAmount}
        </p>
      </div>

      <div className="h-10 w-px bg-zinc-200" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
          <FiClock size={18} />
        </span>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Processing Time
          </p>

          <p className="text-sm font-semibold text-zinc-900">
            1–2 business days
          </p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          <IoClose size={16} />
          Reject Payroll
        </button>

        <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          <FiCalendar size={15} />
          Save for Later
        </button>

        <button className="inline-flex h-12 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90">
          Approve & Send Payroll

          <LuArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Payroll = () => {
  const [selected, setSelected] = useState(
    () =>
      new Set(
        employees
          .filter((e) => e.selected)
          .map((e) => e.id)
      )
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
      s.size === employees.length
        ? new Set()
        : new Set(employees.map((e) => e.id))
    )

  const totals = useMemo(() => {
    let amount = 0

    for (const id of selected) {
      const emp = employees.find((e) => e.id === id)

      if (emp) amount += emp.usd
    }

    return {
      count: selected.size,
      formatted: amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    }
  }, [selected])

  return (
    <DashboardShell
      title="Payroll Review"
      subtitle="Review and approve employee payments"
      actions={
        <Link
          to="/business/payroll/settings"
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
        >
          <IoSettingsOutline size={16} />
          Settings
        </Link>
      }
    >
      {/* Summary Cards */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      {/* Main */}
      <section className="mb-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <PayoutsTable
            rows={employees}
            selected={selected}
            toggle={toggle}
            toggleAll={toggleAll}
            allSelected={
              selected.size === employees.length
            }
          />
        </div>

        <aside className="col-span-12 space-y-6 lg:col-span-4">
          <AIPayrollAssistant />

          <PayrollSummary />

          <SecurityCard />
        </aside>
      </section>

      {/* Approval Bar */}
      <ApprovalBar
        selectedCount={totals.count}
        employeesCount={totals.count}
        totalAmount={totals.formatted}
      />
    </DashboardShell>
  )
}

export default Payroll