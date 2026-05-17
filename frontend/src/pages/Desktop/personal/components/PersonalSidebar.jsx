import { NavLink } from "react-router-dom"

import {
  IoHomeOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5"

import { GoCreditCard } from "react-icons/go"

import {
  TbArrowsExchange,
  TbReportSearch,
  TbReportAnalytics,
} from "react-icons/tb"

import { LuGoal } from "react-icons/lu"

const navItems = [
  { label: "Dashboard", icon: IoHomeOutline, to: "/personal" },
  { label: "Account", icon: GoCreditCard, to: "/personal/account" },
  { label: "Pay", icon: GoCreditCard, to: "/personal/pay" },
  {
    label: "Transactions",
    icon: TbArrowsExchange,
    to: "/personal/transactions",
  },
  // { label: "Cards", icon: BsCreditCard2Front, to: "/personal/cards" },
  // {
  //   label: "Expenses",
  //   icon: TbReportSearch,
  //   to: "/personal/expenses",
  // },
  {
    label: "Reports",
    icon: TbReportAnalytics,
    to: "/personal/reports",
  },
  {
    label: "Documents",
    icon: IoDocumentTextOutline,
    to: "/personal/documents",
  },
  { label: "Goals", icon: LuGoal, to: "/personal/goals" },
  {
    label: "Settings",
    icon: IoSettingsOutline,
    to: "/personal/settings",
  },
]

const PersonalSidebar = () => {
  return (
    <aside className="flex h-screen w-[100%] flex-col border-r border-white/10 bg-[#050816] px-5 py-6">
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3 px-2">

        <img
          src="/img/logo-inverted.png"
          alt="Swift Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/personal"}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-4 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon
                  size={21}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER ACCOUNT */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <button className="flex w-full items-center justify-between rounded-2xl bg-white/5 p-3 transition-all hover:bg-white/10">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                Alex Morgan
              </p>

              <p className="text-xs text-zinc-400">
                Personal Account
              </p>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default PersonalSidebar