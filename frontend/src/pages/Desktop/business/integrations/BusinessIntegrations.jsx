import DashboardShell from "../../components/DashboardShell"

import {
  RefreshCcw,
  Wallet,
  Clock3,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Lock,
} from "lucide-react"

const features = [
  {
    icon: <RefreshCcw size={20} className="text-green-600" />,
    title: "Automatically sync transactions",
    description: "Keep your books up to date in real time.",
    bg: "bg-green-50",
  },
  {
    icon: <Wallet size={20} className="text-violet-600" />,
    title: "Categorize with confidence",
    description: "Match payments and payouts to the right accounts.",
    bg: "bg-violet-50",
  },
  {
    icon: <Clock3 size={20} className="text-amber-600" />,
    title: "Save time, reduce errors",
    description: "Automate repetitive tasks and focus on growth.",
    bg: "bg-amber-50",
  },
]

const steps = [
  {
    icon: "qb",
    title: "Connect QuickBooks",
    description: "Enter your Company ID and Access Token to connect.",
    bg: "bg-green-50",
  },
  {
    icon: <SlidersHorizontal size={22} className="text-violet-600" />,
    title: "Map accounts",
    description: "Choose how your accounts and data sync.",
    bg: "bg-violet-50",
  },
  {
    icon: <RefreshCcw size={22} className="text-amber-600" />,
    title: "Sync data",
    description: "We'll securely sync your transactions and contacts.",
    bg: "bg-amber-50",
  },
  {
    icon: <CheckCircle2 size={22} className="text-green-600" />,
    title: "You're all set",
    description: "Automation is active and your books stay updated.",
    bg: "bg-green-50",
  },
]

const BusinessIntegrations = () => {
  return (
    <DashboardShell
      title="Integrations"
      subtitle="Securely connect your quickbooks to automate transactions, sync data and save time"
    >
      <div className="w-full bg-[#fafafa] p-4 md:p-6">
        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-green-50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2CA01C] text-3xl font-bold text-white">
                    qb
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-black">
                    Connect QuickBooks
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Securely connect your QuickBooks account to automate
                    transactions, sync data, and save time.
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-7">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.bg}`}
                    >
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-2xl font-semibold text-black">
                QuickBooks Connection
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter your QuickBooks credentials to connect your account.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Company ID
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your Company ID"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Access Token
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your Access Token"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Lock size={15} />
                  <span>
                    Your credentials are encrypted and securely stored.
                  </span>
                </div>

                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-medium text-white transition hover:opacity-90">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA01C] text-[10px] font-bold text-white">
                    qb
                  </div>

                  Connect QuickBooks
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 md:p-8">
          <div>
            <h2 className="text-xl font-semibold text-black">
              How it works
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Get started in just a few simple steps.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-4 xl:flex-row"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${step.bg}`}
                  >
                    {step.icon === "qb" ? (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2CA01C] text-xl font-bold text-white">
                        qb
                      </div>
                    ) : (
                      step.icon
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-xs font-semibold text-green-600">
                      {index + 1}
                    </div>

                    <h3 className="text-sm font-semibold text-black">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute right-[-18px] top-8 hidden text-gray-300 xl:flex">
                    <ChevronRight size={22} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Security */}
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                <ShieldCheck size={22} className="text-gray-700" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-black">
                  Secure & private
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  We never store your QuickBooks password. Your data is
                  encrypted and protected.
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-black transition hover:opacity-70">
              Learn more about security
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default BusinessIntegrations