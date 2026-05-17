import { useState } from "react"
import { Link } from "react-router-dom"
import { IoArrowBack, IoCheckmarkSharp } from "react-icons/io5"
import { LuChevronDown, LuPlus, LuShieldCheck, LuEye, LuShieldAlert, LuPlay, LuFileText } from "react-icons/lu"
import { FiActivity, FiTrendingUp, FiAlertTriangle, FiDollarSign, FiUserCheck, FiFileText } from "react-icons/fi"
import { TbHandClick } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const modes = [
  {
    id: "manual",
    label: "Manual Mode",
    icon: TbHandClick,
    desc: "You review and manually run each payroll.",
    bullets: ["AI provides analysis and insights", "You initiate payments"],
    badge: null,
  },
  {
    id: "approval",
    label: "Approval Mode",
    icon: IoCheckmarkSharp,
    desc: "AI prepares everything and you approve before payments.",
    bullets: ["AI prepares payroll and payouts", "You approve before execution", "Recommended for most businesses"],
    badge: "RECOMMENDED",
  },
  {
    id: "autopay",
    label: "AutoPay Mode",
    icon: LuPlay,
    desc: "AI automatically executes payroll when all conditions are met.",
    bullets: ["Fully automated execution", "Smart safety checks", "Ideal for mature operations"],
    badge: "MOST AUTONOMOUS",
  },
]

const safetyRules = [
  {
    id: "wallet",
    icon: FiDollarSign,
    label: "Sufficient Wallet Balance",
    desc: "Available balance must cover total payroll amount.",
    type: "toggle",
  },
  {
    id: "variance",
    icon: FiTrendingUp,
    label: "Payroll Variance Threshold",
    desc: "Payroll amount variance must be within threshold.",
    type: "select",
    value: "10%",
  },
  {
    id: "anomalies",
    icon: FiAlertTriangle,
    label: "No Anomalies Detected",
    desc: "No high-risk anomalies or alerts detected by AI.",
    type: "toggle",
  },
  {
    id: "fx",
    icon: FiActivity,
    label: "FX Volatility Threshold",
    desc: "FX volatility must be below the defined threshold.",
    type: "select",
    value: "5%",
  },
  {
    id: "hr",
    icon: FiUserCheck,
    label: "HR Approval Required",
    desc: "Payroll must be approved in QuickBooks.",
    type: "toggle",
  },
  {
    id: "compliance",
    icon: FiFileText,
    label: "Compliance & Documentation",
    desc: "All compliance documents must be valid.",
    type: "toggle",
  },
]

const howItWorks = [
  { step: "1. Monitor", icon: LuEye, body: "Swift continuously monitors payroll conditions, balances, and data from QuickBooks & Rapyd." },
  { step: "2. Validate", icon: LuShieldCheck, body: "AI validates safety rules and detects any risks or anomalies." },
  { step: "3. Decide", icon: LuShieldAlert, body: "If all conditions are met, Swift prepares the payout execution." },
  { step: "4. Execute", icon: LuPlay, body: "Payroll is automatically executed and employees are paid." },
  { step: "5. Report", icon: LuFileText, body: "You receive a summary and audit trail for complete transparency." },
]

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? "bg-[#23662c]" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
)

const ModeCard = ({ mode, selected, onSelect }) => {
  const isSelected = selected === mode.id
  return (
    <button
      onClick={() => onSelect(mode.id)}
      className={`relative text-left border rounded-[20px] p-5 transition-all ${
        isSelected
          ? "border-[#94b398] bg-[#94b398]/5 ring-1 ring-[#94b398]"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Radio indicator */}
      <span className="absolute top-5 right-5">
        <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
          isSelected ? "border-[#94b398] bg-[#94b398]" : "border-gray-300"
        }`}>
          {isSelected && (
            <span className="h-2 w-2 rounded-full bg-white" />
          )}
        </span>
      </span>

      <span className={`inline-flex h-10 w-10 rounded-xl items-center justify-center mb-3 ${
        isSelected ? "bg-[#94b398]/20 text-[#23662c]" : "bg-gray-100 text-gray-600"
      }`}>
        <mode.icon size={18} />
      </span>

      <p className="text-[14px] font-semibold text-gray-900 mb-1">{mode.label}</p>
      <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{mode.desc}</p>

      <ul className="space-y-1.5">
        {mode.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[12px] text-gray-700">
            <IoCheckmarkSharp size={12} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      {mode.badge && (
        <span className={`inline-block mt-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          mode.badge === "RECOMMENDED"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-100 text-gray-700"
        }`}>
          {mode.badge}
        </span>
      )}
    </button>
  )
}

const SafetyRuleRow = ({ rule, enabled, onToggle }) => (
  <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
    <span className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
      <rule.icon size={16} />
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-semibold text-gray-900">{rule.label}</p>
      <p className="text-[12px] text-gray-500">{rule.desc}</p>
    </div>
    {rule.type === "toggle" ? (
      <Toggle enabled={enabled} onChange={onToggle} />
    ) : (
      <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
        {rule.value}
        <LuChevronDown size={12} className="text-gray-400" />
      </button>
    )}
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PayrollSettings = () => {
  const [selectedMode, setSelectedMode] = useState("approval")
  const [toggles, setToggles] = useState({
    wallet: true,
    variance: true,
    anomalies: true,
    fx: true,
    hr: true,
    compliance: true,
  })

  const handleToggle = (id) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <DashboardShell title="Payroll Automation" subtitle="Choose how Swift should handle payroll execution.">
      {/* Back link */}
      <Link
        to="/business/payroll"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-5 -mt-2"
      >
        <IoArrowBack size={14} />
        Back to Payroll Analysis
      </Link>

      {/* Automation Mode */}
      <section className="mb-6">
        <h2 className="text-[15px] font-semibold text-gray-900 mb-1">Automation Mode</h2>
        <p className="text-[13px] text-gray-500 mb-4">Select how you want Swift to handle payroll execution.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modes.map((m) => (
            <ModeCard key={m.id} mode={m} selected={selectedMode} onSelect={setSelectedMode} />
          ))}
        </div>
      </section>

      {/* Two-column: Safety Rules + How it works */}
      <section className="grid grid-cols-12 gap-4 mb-6">
        {/* Safety Rules */}
        <div className="col-span-12 lg:col-span-7 bg-white border border-gray-200 rounded-[20px] p-6">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-1">AutoPay Safety Rules</h3>
          <p className="text-[12px] text-gray-500 mb-4">Define the conditions that must be met for AutoPay to execute.</p>

          <div>
            {safetyRules.map((rule) => (
              <SafetyRuleRow
                key={rule.id}
                rule={rule}
                enabled={toggles[rule.id]}
                onToggle={() => handleToggle(rule.id)}
              />
            ))}
          </div>

          <button className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
            <LuPlus size={13} />
            Add Custom Rule
          </button>
        </div>

        {/* How AutoPay Works */}
        <div className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-[20px] p-6">
          <h3 className="text-[15px] font-semibold text-gray-900 mb-5">How AutoPay Works</h3>

          <ul className="space-y-4 mb-5">
            {howItWorks.map((item) => (
              <li key={item.step} className="flex items-start gap-3">
                <span className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon size={13} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-900 leading-snug">{item.step}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Security callout */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-[12px] font-semibold text-gray-900 mb-1">Security First</p>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              AutoPay actions are logged, encrypted, and fully auditable. You can pause or override anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-[12px] text-gray-400 flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">
            <IoCheckmarkSharp size={8} />
          </span>
          Your changes are saved automatically.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/business/payroll"
            className="inline-flex items-center px-5 h-10 text-[13px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button className="inline-flex items-center px-5 h-10 text-[13px] font-semibold text-white bg-black rounded-full hover:bg-gray-900 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}

export default PayrollSettings
