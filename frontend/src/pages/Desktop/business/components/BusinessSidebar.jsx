import { NavLink } from "react-router-dom"

import {
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5"

import { GoCreditCard } from "react-icons/go"
import { BsWallet2 } from "react-icons/bs";

import {
  TbArrowsExchange,
} from "react-icons/tb"


import { MdOutlineAccountBalance } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import {
  RiRobot2Line,
} from "react-icons/ri"

import { AiOutlineTeam } from "react-icons/ai"
import { CiMoneyBill } from "react-icons/ci";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

import useCurrentUser from "@/hooks/useCurrentUser"

const navItems = [
  { label: "Overview", icon: IoHomeOutline, to: "/business" },
  { label: "Open a wallet", icon: BsWallet2, to: "/business/accounts" },
  { label: "Transfer money", icon: GoCreditCard, to: "/business/transfer" },
  { label: "Accept money", icon: CiMoneyBill, to: "/business/pending-transfer" },
  {
    label: "Transactions",
    icon: TbArrowsExchange,
    to: "/business/transactions",
  },
  { label: "Corporate Bills", icon: MdOutlineAccountBalance, to: "/business/payments" },
  {
    label: "Payroll",
    icon: FaRegCalendarCheck,
    to: "/business/payroll",
  },
  {
    label: "Automations",
    icon: RiRobot2Line,
    to: "/business/automations",
  },
  { label: "Integrations", icon: MdOutlineIntegrationInstructions, to: "/business/integrations" },
  {
    label: "Your Employees",
    icon: AiOutlineTeam,
    to: "/business/recipients",
  },
]

const BusinessSidebar = () => {
  const { user, loading } = useCurrentUser()

  // Build display values from the loaded user, with safe fallbacks.
  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
      user.email ||
      "Account"
    : ""

  const companyName =
    user?.company_name ||
    user?.business_name ||
    (user?.account_type === "business" ? "Business Account" : "Acme Global Ltd.")

  const avatarSrc = user?.profile_avatar || "/img/profile.png"

  return (
    <aside className="flex h-screen w-full flex-col border-r border-white/10 bg-[#050816] px-5 py-6">
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <img
          src="/img/logo-inverted.png"
          alt="Swift Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/business"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon
                  size={19}
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
        <button className="flex w-full items-center gap-3 rounded-2xl bg-white/5 p-3 transition-all hover:bg-white/10">
          {loading ? (
            <span className="h-10 w-10 flex-shrink-0 rounded-full bg-white/10 animate-pulse" />
          ) : (
            <img
              src={avatarSrc}
              alt=""
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-white/5"
              onError={(e) => {
                e.currentTarget.src = "/img/profile.png"
              }}
            />
          )}

          <div className="min-w-0 flex-1 text-left">
            {loading ? (
              <>
                <span className="block h-3.5 w-24 rounded bg-white/10 animate-pulse mb-1.5" />
                <span className="block h-3 w-20 rounded bg-white/5 animate-pulse" />
              </>
            ) : (
              <>
                <p className="truncate text-sm font-semibold text-white">
                  {displayName}
                </p>

                <p className="truncate text-xs text-zinc-400">
                  {companyName}
                </p>
              </>
            )}
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0 text-zinc-400"
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

export default BusinessSidebar