import { NavLink } from "react-router-dom"
import { IoHomeOutline, IoSettingsOutline, IoDocumentTextOutline } from "react-icons/io5"
import { GoCreditCard } from "react-icons/go"
import { TbArrowsExchange, TbReportSearch, TbReportAnalytics } from "react-icons/tb"
import { BsCreditCard2Front } from "react-icons/bs"
import { LuGoal } from "react-icons/lu"

const navItems = [
  { label: "Dashboard", icon: IoHomeOutline, to: "/personal" },
  { label: "Pay", icon: GoCreditCard, to: "/personal/pay" },
  { label: "Account", icon: GoCreditCard, to: "/personal/account" },
  { label: "Transactions", icon: TbArrowsExchange, to: "/personal/transactions" },
  { label: "Cards", icon: BsCreditCard2Front, to: "/personal/cards" },
  { label: "Expenses", icon: TbReportSearch, to: "/personal/expenses" },
  { label: "Reports", icon: TbReportAnalytics, to: "/personal/reports" },
  { label: "Documents", icon: IoDocumentTextOutline, to: "/personal/documents" },
  { label: "Goals", icon: LuGoal, to: "/personal/goals" },
  { label: "Settings", icon: IoSettingsOutline, to: "/personal/settings" },
]

const PersonalSidebar = () => {
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
                end={item.to === "/personal"}
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

export default PersonalSidebar
