import React from "react"
import {
  FiSearch,
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi"

const recipients = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    country: "United States",
    flag: "🇺🇸",
    type: "Employee",
    currency: "USD",
    status: "Active",
  },
  {
    name: "Michael Lee",
    email: "michael.lee@globalpay.io",
    country: "Singapore",
    flag: "🇸🇬",
    type: "Contractor",
    currency: "SGD",
    status: "Active",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@agency.co",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Vendor",
    currency: "GBP",
    status: "Pending",
  },
  {
    name: "Carlos Rivera",
    email: "carlos.rivera@startup.mx",
    country: "Mexico",
    flag: "🇲🇽",
    type: "Contractor",
    currency: "MXN",
    status: "Active",
  },
  {
    name: "Anna Müller",
    email: "anna.mueller@company.de",
    country: "Germany",
    flag: "🇩🇪",
    type: "Employee",
    currency: "EUR",
    status: "Active",
  },
]

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border border-amber-100",
  Disabled: "bg-red-50 text-red-600 border border-red-100",
}

const Recipients = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
              Recipients
            </h1>

            <p className="mt-2 text-lg text-[#6b7280]">
              Manage employees, contractors, and vendors you send payments to
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            {/* Search */}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 shadow-sm">
              <FiSearch className="text-[20px] text-[#9ca3af]" />

              <input
                type="text"
                placeholder="Search recipients..."
                className="w-full bg-transparent text-base outline-none placeholder:text-[#9ca3af] sm:w-[280px]"
              />
            </div>

            {/* Add Recipient */}
            <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-base font-medium text-white shadow-sm transition hover:opacity-90">
              <FiPlus className="text-[18px]" />
              Add Recipient
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          {[
            "All Recipients",
            "All Countries",
            "All Types",
            "All Statuses",
          ].map((item) => (
            <button
              key={item}
              className="flex h-14 items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#374151] shadow-sm transition hover:bg-[#fafafa]"
            >
              {item}

              <FiChevronDown className="text-[18px]" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
          {/* Table */}
          <div className="overflow-hidden rounded-[28px] border border-[#ececec] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#f1f1f1]">
                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Recipient
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Country
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Type
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Currency
                    </th>

                    <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#9ca3af]">
                      Status
                    </th>

                    <th className="w-[60px]" />
                  </tr>
                </thead>

                <tbody>
                  {recipients.map((recipient, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#f5f5f5] transition hover:bg-[#fafafa]"
                    >
                      {/* Recipient */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-base font-semibold text-zinc-700">
                            {recipient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>

                          <div>
                            <div className="text-base font-medium text-[#111111]">
                              {recipient.name}
                            </div>

                            <div className="mt-1 text-base text-[#9ca3af]">
                              {recipient.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-base text-[#374151]">
                          <span className="text-[20px]">
                            {recipient.flag}
                          </span>

                          {recipient.country}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-8 py-6">
                        <span className="text-base font-medium text-[#111111]">
                          {recipient.type}
                        </span>
                      </td>

                      {/* Currency */}
                      <td className="px-8 py-6">
                        <span className="text-base font-medium text-[#111111]">
                          {recipient.currency}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                            statusStyles[recipient.status]
                          }`}
                        >
                          {recipient.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececec] text-[#6b7280] transition hover:bg-[#fafafa]">
                            <FiMoreHorizontal className="text-[18px]" />
                          </button>

                          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececec] text-[#6b7280] transition hover:bg-[#fafafa]">
                            <FiChevronRight className="text-[18px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-[#f3f4f6] px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-[#6b7280]">
                Showing 1 to 5 of 82 recipients
              </p>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-base font-medium transition ${
                      page === 1
                        ? "bg-[#111111] text-white"
                        : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#fafafa]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Recipient Summary
              </h3>

              <p className="mt-2 text-base text-[#9ca3af]">
                Overview of your payout network
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Total Recipients
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    82
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Countries
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    14
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Active
                  </span>

                  <span className="text-xl font-semibold text-[#111111]">
                    76
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                  Recent Activity
                </h3>

                <button className="text-base font-medium text-[#5b5cf0]">
                  View all
                </button>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "New recipient added",
                    subtitle: "Sarah Johnson",
                  },
                  {
                    title: "Recipient updated",
                    subtitle: "Michael Lee",
                  },
                  {
                    title: "Verification pending",
                    subtitle: "Emma Wilson",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500" />

                    <div className="flex-1">
                      <p className="text-base font-medium text-[#111111]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-base text-[#9ca3af]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipients