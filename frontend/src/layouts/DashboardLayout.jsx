import { Outlet } from "react-router-dom"

const DashboardLayout = ({ sidebar }) => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col bg-black text-white flex-shrink-0">
        {sidebar}
      </aside>

      {/* Main content — own scroll container so sticky bars work */}
      <main className="flex-1 overflow-y-auto bg-black">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
