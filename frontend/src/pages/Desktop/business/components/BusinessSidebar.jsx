import { NavLink } from "react-router-dom"
import { IoHomeOutline, IoSettingsOutline, IoChevronUp } from "react-icons/io5"
import { GoCreditCard } from "react-icons/go"
import { TbArrowsExchange, TbReportAnalytics } from "react-icons/tb"
import { BsCreditCard2Front } from "react-icons/bs"
import { MdOutlinePayments } from "react-icons/md"
import { RiGeminiLine, RiRobot2Line } from "react-icons/ri"
import { AiOutlineTeam } from "react-icons/ai"
import { LuWallet } from "react-icons/lu"

const navItems = [
  { label: "Overview", icon: IoHomeOutline, to: "/business" },
  { label: "Accounts", icon: GoCreditCard, to: "/business/accounts" },
  { label: "Transactions", icon: TbArrowsExchange, to: "/business/transactions" },
  { label: "Payments", icon: BsCreditCard2Front, to: "/business/payments" },
  { label: "Payouts", icon: MdOutlinePayments, to: "/business/payouts" },
  { label: "Payroll", icon: LuWallet, to: "/business/payroll" },
  { label: "Reports", icon: TbReportAnalytics, to: "/business/reports" },
  { label: "AI Insights", icon: RiGeminiLine, to: "/business/ai-insights" },
  { label: "Automations", icon: RiRobot2Line, to: "/business/automations" },
  { label: "Recipients", icon: AiOutlineTeam, to: "/business/recipients" },
  { label: "Settings", icon: IoSettingsOutline, to: "/business/settings" },
]

const BusinessSidebar = () => {
  return (
    <div className="flex flex-col h-full px-4 py-5">
      {/* Logo */}
      <header className="flex items-center gap-2 px-3 mb-8">
        <img
          src="/img/logo-inverted.png"
          alt="Swift"
          className="h-8 w-auto"
        />
      </header>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/business"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile footer */}
      <div className="border-t border-white/10 pt-4">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors">
          <span className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            AM
          </span>
          <span className="flex-1 text-left min-w-0">
            <span className="block text-sm font-medium text-white truncate">
              Alex Morgan
            </span>
            <span className="block text-[11px] text-gray-400 truncate">
              Acme Global Ltd.
            </span>
          </span>
          <IoChevronUp className="text-gray-400 shrink-0" size={14} />
        </button>
      </div>
    </div>
  )
}

export default BusinessSidebar
