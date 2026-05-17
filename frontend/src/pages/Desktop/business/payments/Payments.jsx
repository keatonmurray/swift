import { useMemo, useState } from "react"
import {
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoWalletOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuClock4,
  LuShieldCheck,
  LuRefreshCw,
} from "react-icons/lu"

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi"

import { BsBriefcase, BsHouseDoor } from "react-icons/bs"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import ReactCountryFlag from "react-country-flag"

/* -------------------------------------------------------------------------- */
/*  Mock Data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total to Pay Today",
    value: "$106,950.00",
    sub: "7 payments",
    icon: FiFileText,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Bills",
    value: "$24,650.00",
    sub: "4 payments",
    icon: BsBriefcase,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    label: "Employee Payouts",
    value: "$82,300.00",
    sub: "18 employees",
    icon: HiOutlineSparkles,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Cash After Payments",
    value: "$97,840.20",
    sub: "Healthy",
    subDot: "bg-emerald-500",
    subColor: "text-emerald-600",
    icon: IoWalletOutline,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
]

const bills = [
  {
    id: 1,
    vendor: "Amazon Web Services",
    vendorKind: "aws",
    desc: "Cloud Infrastructure",
    dueDate: "May 30, 2025",
    dueLabel: "Today",
    amount: "$4,200.00",
    currency: "USD",
    statusVariant: "warning",
    statusLabel: "Due Today",
    selected: true,
  },
  {
    id: 2,
    vendor: "Google Workspace",
    vendorKind: "google",
    desc: "Business Subscription",
    dueDate: "May 30, 2025",
    dueLabel: "Today",
    amount: "$1,250.00",
    currency: "USD",
    statusVariant: "warning",
    statusLabel: "Due Today",
    selected: true,
  },
  {
    id: 3,
    vendor: "Stripe",
    vendorKind: "stripe",
    desc: "Payment Processing Fees",
    dueDate: "May 30, 2025",
    dueLabel: "Today",
    amount: "$850.00",
    currency: "USD",
    statusVariant: "warning",
    statusLabel: "Due Today",
    selected: true,
  },
  {
    id: 4,
    vendor: "Office Rent",
    vendorKind: "office",
    desc: "June Office Rent",
    dueDate: "Jun 3, 2025",
    dueLabel: "In 4 days",
    amount: "$18,350.00",
    currency: "USD",
    statusVariant: "info",
    statusLabel: "Upcoming",
    selected: false,
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
    amount: "₱85,000.00",
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
]

const tabs = ["All Payments", "Bills", "Employee Payouts"]

/* -------------------------------------------------------------------------- */
/*  Vendor Icon                                                                */
/* -------------------------------------------------------------------------- */

const VendorIcon = ({ kind }) => {
  if (kind === "aws") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black p-2">
        <img
          src="/img/aws-color.png"
          alt="AWS"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  if (kind === "google") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
        G
      </span>
    )
  }

  if (kind === "stripe") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#635BFF] text-sm font-semibold text-white">
        S
      </span>
    )
  }

  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
      <BsHouseDoor size={18} />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Checkbox                                                                   */
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

/* -------------------------------------------------------------------------- */
/*  Summary Card                                                               */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ card }) => (
  <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
    <div className="min-w-0 flex-1">
      <p className="mb-3 text-sm text-zinc-500">{card.label}</p>

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
      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
    >
      <card.icon size={22} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Bills Table                                                                */
/* -------------------------------------------------------------------------- */

const BillsTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
}) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Bills
      </h3>

      <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button>
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
              "Vendor",
              "Description",
              "Due Date",
              "Amount",
              "Currency",
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
          {rows.map((b) => (
            <tr
              key={b.id}
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5">
                <Checkbox
                  checked={selected.has(b.id)}
                  onChange={() => toggle(b.id)}
                />
              </td>

              <td className="py-5 pr-6">
                <div className="flex items-center gap-3">
                  <VendorIcon kind={b.vendorKind} />

                  <span className="text-sm font-semibold text-zinc-900">
                    {b.vendor}
                  </span>
                </div>
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {b.desc}
              </td>

              <td className="py-5 pr-6">
                <p className="text-sm text-zinc-900">
                  {b.dueDate}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {b.dueLabel}
                </p>
              </td>

              <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                {b.amount}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {b.currency}
              </td>

              <td className="py-5 pr-6">
                <StatusBadge variant={b.statusVariant}>
                  {b.statusLabel}
                </StatusBadge>
              </td>

              <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                <IoEllipsisVertical size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Employees Table                                                            */
/* -------------------------------------------------------------------------- */

const EmployeesTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
}) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Employee Payouts
      </h3>

      <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button>
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
              "Role",
              "Country",
              "Amount",
              "Currency",
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
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5">
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

                  <span className="text-sm font-semibold text-zinc-900">
                    {e.name}
                  </span>
                </div>
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.role}
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

              <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                {e.amount}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.currency}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.method}
              </td>

              <td className="py-5 pr-6">
                <StatusBadge variant="success">
                  Ready
                </StatusBadge>
              </td>

              <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                <IoEllipsisVertical size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  AI Assistant                                                               */
/* -------------------------------------------------------------------------- */

const AIPaymentAssistant = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-2 flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
        <HiOutlineSparkles
          size={18}
          className="text-violet-600"
        />

        AI Payment Assistant
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
        <FiCheckCircle
          className="mt-0.5 text-emerald-600"
          size={18}
        />

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            All selected payments can be safely processed today.
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Cash reserves remain healthy after payments.
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-5">
      {[
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
          body: "All payments are compliant with local regulations.",
        },
      ].map((r) => (
        <div
          key={r.title}
          className="flex items-start gap-4 border-b border-zinc-100 pb-5 last:border-none last:pb-0"
        >
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600">
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
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Payment Summary                                                            */
/* -------------------------------------------------------------------------- */

const PaymentSummary = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Payment Summary
    </h3>

    <ul className="space-y-5">
      {[
        {
          label: "Total Bills",
          value: "$24,650.00",
        },
        {
          label: "Total Employee Payouts",
          value: "$82,300.00",
        },
        {
          label: "Total Amount",
          value: "$106,950.00",
        },
        {
          label: "Employees",
          value: "18",
        },
      ].map((row) => (
        <li
          key={row.label}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-zinc-500">
            {row.label}
          </span>

          <span className="text-sm font-semibold tabular-nums text-zinc-900">
            {row.value}
          </span>
        </li>
      ))}

      <li className="border-t border-zinc-100 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">
            Funding Source
          </span>

          <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
            <IoWalletOutline
              size={16}
              className="text-zinc-500"
            />

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

/* -------------------------------------------------------------------------- */
/*  Security                                                                   */
/* -------------------------------------------------------------------------- */

const SecurityCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Security & Compliance
      </h3>

      <IoLockClosedOutline
        className="text-zinc-300"
        size={18}
      />
    </div>

    <p className="text-sm leading-relaxed text-zinc-500">
      All payments are encrypted and processed securely
      through Rapyd's global payout network.
    </p>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Approval Bar                                                               */
/* -------------------------------------------------------------------------- */

const ApprovalBar = ({
  selectedCount,
  billsCount,
  employeesCount,
  totalAmount,
}) => (
  <div className="flex items-center gap-6 rounded-3xl border border-zinc-200 bg-white px-8 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm">
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
        <IoCheckmarkCircle size={20} />
      </span>

      <div>
        <p className="text-sm font-semibold text-zinc-900">
          {selectedCount} selected
        </p>

        <p className="text-sm text-zinc-500">
          {billsCount} bills · {employeesCount} employees
        </p>
      </div>
    </div>

    <div className="h-10 w-px bg-zinc-200" />

    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        Total Amount
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

    <div className="text-right">
      <button className="inline-flex h-12 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90">
        Review & Approve

        <LuArrowRight size={16} />
      </button>

      <p className="mt-2 text-xs text-zinc-400">
        You will be redirected to confirm payments.
      </p>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Payments = () => {
  const [activeTab, setActiveTab] =
    useState("All Payments")

  const [selectedBills, setSelectedBills] = useState(
    () => new Set(bills.filter((b) => b.selected).map((b) => b.id))
  )

  const [selectedEmployees, setSelectedEmployees] =
    useState(
      () =>
        new Set(
          employees
            .filter((e) => e.selected)
            .map((e) => e.id)
        )
    )

  const toggleBill = (id) =>
    setSelectedBills((s) => {
      const n = new Set(s)

      n.has(id) ? n.delete(id) : n.add(id)

      return n
    })

  const toggleAllBills = () =>
    setSelectedBills((s) =>
      s.size === bills.length
        ? new Set()
        : new Set(bills.map((b) => b.id))
    )

  const toggleEmployee = (id) =>
    setSelectedEmployees((s) => {
      const n = new Set(s)

      n.has(id) ? n.delete(id) : n.add(id)

      return n
    })

  const toggleAllEmployees = () =>
    setSelectedEmployees((s) =>
      s.size === employees.length
        ? new Set()
        : new Set(employees.map((e) => e.id))
    )

  const totals = useMemo(() => {
    return {
      count:
        selectedBills.size +
        selectedEmployees.size,
      bills: selectedBills.size,
      employees: selectedEmployees.size,
      formatted: "$106,950.00",
    }
  }, [selectedBills, selectedEmployees])

  return (
    <DashboardShell
      title="Payments"
      subtitle="Manage and approve bills and employee payouts"
    >
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-8 border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`relative pb-4 text-sm font-medium transition-colors ${
              activeTab === t
                ? "text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {t}

            {activeTab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      {/* Main */}
      <section className="mb-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <BillsTable
            rows={bills}
            selected={selectedBills}
            toggle={toggleBill}
            toggleAll={toggleAllBills}
            allSelected={
              selectedBills.size === bills.length
            }
          />

          <EmployeesTable
            rows={employees}
            selected={selectedEmployees}
            toggle={toggleEmployee}
            toggleAll={toggleAllEmployees}
            allSelected={
              selectedEmployees.size ===
              employees.length
            }
          />
        </div>

        <aside className="col-span-12 space-y-6 lg:col-span-4">
          <AIPaymentAssistant />

          <PaymentSummary />

          <SecurityCard />
        </aside>
      </section>

      {/* Approval Bar */}
      <div className="sticky bottom-0 z-20 -mx-7 -mb-7 mt-6 bg-gradient-to-t from-white via-white to-white/0 px-7 py-5">
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