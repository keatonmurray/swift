import { NavLink } from "react-router-dom"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5"
import { GoCreditCard } from "react-icons/go"
import { TbArrowsExchange, TbReportAnalytics } from "react-icons/tb"
import { BsCreditCard2Front } from "react-icons/bs"
import { MdOutlinePayments } from "react-icons/md"
import { RiGeminiLine, RiRobot2Line } from "react-icons/ri"
import { AiOutlineTeam } from "react-icons/ai"

const navItems = [
  { label: "Overview", icon: IoHomeOutline, to: "/business" },
  { label: "Accounts", icon: GoCreditCard, to: "/business/accounts" },
  { label: "Transactions", icon: TbArrowsExchange, to: "/business/transactions" },
  { label: "Payments", icon: BsCreditCard2Front, to: "/business/payments" },
  { label: "Payouts", icon: MdOutlinePayments, to: "/business/payouts" },
  { label: "Reports", icon: TbReportAnalytics, to: "/business/reports" },
  { label: "AI Insights", icon: RiGeminiLine, to: "/business/ai-insights" },
  { label: "Automations", icon: RiRobot2Line, to: "/business/automations" },
  { label: "Recipients", icon: AiOutlineTeam, to: "/business/recipients" },
  { label: "Settings", icon: IoSettingsOutline, to: "/business/settings" },
]

const BusinessSidebar = () => {
  return (
    <div className="flex flex-col h-full p-6">
      {/* Logo */}
      <header className="mb-8">
        <img
          className="h-8 w-auto"
          src="/img/logo-inverted.png"
          alt="Swift Logo"
        />
      </header>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/business"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default BusinessSidebar
