import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { HiOutlineMenuAlt2 } from "react-icons/hi"

/**
 * DashboardShell
 * ----------------
 * The white rounded panel that hosts every dashboard page.
 * Renders the persistent topbar (search, notifications, AI button)
 * and a left-aligned page title block. Page content is passed as children.
 *
 * Usage:
 *   <DashboardShell
 *     title="Overview"
 *     subtitle="Real-time financial overview of your business"
 *   >
 *     ...page content...
 *   </DashboardShell>
 */
const DashboardShell = ({
  title,
  subtitle,
  actions,
  children,
  onMenuClick,
}) => {
  return (
    <div className="min-h-screen bg-white p-3">
      <div className="min-h-full bg-white rounded-[32px] overflow-hidden">
        {/* Topbar */}
        <header className="border-b border-zinc-200 px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* Mobile menu */}
              <button
                onClick={onMenuClick}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white lg:hidden"
              >
                <HiOutlineMenuAlt2 className="text-zinc-700" size={20} />
              </button>

              <div>
                {title && (
                  <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="mt-1 text-base text-zinc-500">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Optional per-page actions slot */}
              {actions}

              {/* Search */}
              <div className="relative w-full sm:w-[360px]">
                <IoSearchOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search anything..."
                  className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-20 text-[15px] text-zinc-700 placeholder:text-zinc-400 outline-none transition-all focus:border-zinc-400"
                />

                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-500">
                  ⌘ K
                </kbd>
              </div>

              {/* Notifications */}
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition-all hover:bg-zinc-50">
                <IoNotificationsOutline size={20} />
              </button>

              {/* AI assistant */}
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-all hover:bg-zinc-900">
                <HiOutlineSparkles size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-5 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardShell