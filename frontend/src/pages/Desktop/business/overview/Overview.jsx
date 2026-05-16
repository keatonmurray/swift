import { useEffect, useId, useRef, useState } from "react"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi"
import { LuArrowRight, LuClock4 } from "react-icons/lu"
import { TbActivityHeartbeat, TbAlertTriangle } from "react-icons/tb"
import { BsCalendarEvent } from "react-icons/bs"
import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import DataTable from "@/pages/Desktop/components/DataTable"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const kpis = [
  {
    label: "Total Balance",
    value: "$1,234,567.89",
    delta: "8.6% vs last month",
    trend: "up",
    chart: "line",
    series: [42, 48, 44, 52, 58, 55, 62, 68, 64, 72, 78, 82],
  },
  {
    label: "Cash In",
    sub: "(This Month)",
    value: "$245,678.00",
    delta: "12.4% vs last month",
    trend: "up",
    chart: "bar",
    series: [40, 55, 30, 65, 45, 70, 50, 80, 60, 75, 55, 85],
  },
  {
    label: "Cash Out",
    sub: "(This Month)",
    value: "$108,430.50",
    delta: "3.7% vs last month",
    trend: "down",
    chart: "bar",
    series: [60, 45, 70, 35, 75, 40, 80, 50, 65, 45, 70, 55],
  },
  {
    label: "Net Cash Flow",
    value: "$137,247.50",
    delta: "15.8% vs last month",
    trend: "up",
    chart: "line",
    series: [30, 35, 40, 38, 45, 50, 48, 58, 62, 70, 76, 84],
  },
]

const currencyBreakdown = [
  { code: "USD", value: "$682,452.10", pct: 55, color: "#111111" },
  { code: "EUR", value: "$256,710.20", pct: 21, color: "#444444" },
  { code: "GBP", value: "$145,230.40", pct: 12, color: "#888888" },
  { code: "CAD", value: "$74,125.30",  pct: 6,  color: "#bbbbbb" },
  { code: "Others", value: "$75,049.89", pct: 6, color: "#e2e2e2" },
]

const cashFlowInflow  = [120, 145, 160, 150, 175, 195, 185, 215, 230, 245, 268, 285]
const cashFlowOutflow = [90,  100, 95,  110, 100, 115, 105, 120, 115, 125, 130, 140]
const cashFlowLabels  = ["May 1", "May 8", "May 15", "May 22", "May 29"]

const aiInsights = [
  {
    icon: TbActivityHeartbeat,
    title: "Cash flow is up 15.8%",
    body: "Great job! Your net cash flow has improved this month.",
  },
  {
    icon: TbAlertTriangle,
    title: "3 unusual transactions",
    body: "I've flagged transactions that are 3x higher than usual.",
  },
  {
    icon: BsCalendarEvent,
    title: "Upcoming payout",
    body: "You have 2 payouts scheduled in the next 7 days.",
  },
]

const recentTransactions = [
  { date: "May 29, 2025", desc: "Stripe Payment - SaaS Plan",  account: "USD Account", amount: "+ $12,450.00", positive: true,  status: "Completed" },
  { date: "May 28, 2025", desc: "Google Ads",                  account: "USD Account", amount: "- $3,250.50",  positive: false, status: "Completed" },
  { date: "May 27, 2025", desc: "Upwork - Project Payment",    account: "USD Account", amount: "+ $7,800.00",  positive: true,  status: "Completed" },
  { date: "May 26, 2025", desc: "Amazon Web Services",         account: "USD Account", amount: "- $1,125.90",  positive: false, status: "Completed" },
  { date: "May 26, 2025", desc: "Refund - Invoice #INV-2391",  account: "EUR Account", amount: "+ €2,430.00",  positive: true,  status: "Completed" },
]

const payouts = [
  { recipient: "John Smith",      currency: "USD", amount: "$5,500.00",  date: "May 30, 2025", status: "Scheduled" },
  { recipient: "Acme Corp.",      currency: "EUR", amount: "€12,000.00", date: "May 31, 2025", status: "Scheduled" },
  { recipient: "Global Solutions",currency: "GBP", amount: "£8,750.00",  date: "Jun 2, 2025",  status: "Scheduled" },
  { recipient: "Team Payout",     currency: "USD", amount: "$15,250.00", date: "Jun 3, 2025",  status: "Scheduled" },
]

/* -------------------------------------------------------------------------- */
/*  Mini charts — animated draw-in                                             */
/* -------------------------------------------------------------------------- */

const CHART_COLOR = "#d4d4d4"

const Sparkline = ({ data }) => {
  const w = 110
  const h = 40
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 6) - 3}`)
    .join(" ")

  // Approximate path length for dashoffset animation
  const pathLength = 400

  return (
    <svg ref={ref} width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        fill="none"
        stroke={CHART_COLOR}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        strokeDasharray={pathLength}
        strokeDashoffset={animate ? 0 : pathLength}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,0.61,0.36,1)" }}
      />
    </svg>
  )
}

const MiniBars = ({ data }) => {
  const w = 110
  const h = 40
  const max = Math.max(...data)
  const barW = Math.floor(w / data.length) - 2
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <svg ref={ref} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {data.map((v, i) => {
        const bh = (v / max) * h
        return (
          <rect
            key={i}
            x={i * (barW + 2)}
            y={animate ? h - bh : h}
            width={barW}
            height={animate ? bh : 0}
            rx="2"
            fill={CHART_COLOR}
            style={{
              transition: `y 0.8s cubic-bezier(0.22,0.61,0.36,1) ${i * 40}ms, height 0.8s cubic-bezier(0.22,0.61,0.36,1) ${i * 40}ms`,
            }}
          />
        )
      })}
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Donut chart                                                                */
/* -------------------------------------------------------------------------- */

const DonutChart = ({ segments }) => {
  const size   = 140
  const stroke = 22
  const r      = (size - stroke) / 2
  const c      = 2 * Math.PI * r
  let   offset = 0
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#f0f0f0" strokeWidth={stroke}
        />
        {segments.map((s, i) => {
          const dash = (s.pct / 100) * c
          const el = (
            <circle
              key={i}
              cx={size / 2} cy={size / 2} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={animate ? -offset : c}
              strokeLinecap="butt"
              style={{
                transition: `stroke-dashoffset 1s cubic-bezier(0.22,0.61,0.36,1) ${i * 150}ms`,
              }}
            />
          )
          offset += dash
          return el
        })}
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedValue
          value="1.23M"
          duration={1200}
          className="text-lg font-bold text-gray-900 tracking-tight"
        />
        <span className="text-[10px] text-gray-400 mt-0.5">Total</span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Cash flow area chart                                                       */
/* -------------------------------------------------------------------------- */

const CashFlowChart = () => {
  const id    = useId().replace(/[:]/g, "")
  const w     = 560
  const h     = 200
  const padL  = 42
  const padR  = 8
  const padT  = 12
  const padB  = 28
  const innerW = w - padL - padR
  const innerH = h - padT - padB
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const all  = [...cashFlowInflow, ...cashFlowOutflow]
  const max  = Math.max(...all)
  const xStep = innerW / (cashFlowInflow.length - 1)

  const yTicks = [0, 100, 200, 300]

  const toPath = (data) =>
    data
      .map((v, i) => {
        const x = padL + i * xStep
        const y = padT + innerH - (v / max) * innerH
        return `${i === 0 ? "M" : "L"}${x},${y}`
      })
      .join(" ")

  const inflowPath = toPath(cashFlowInflow)
  const areaPath   = inflowPath + ` L${padL + innerW},${padT + innerH} L${padL},${padT + innerH} Z`
  const outflowPath = toPath(cashFlowOutflow)

  const pathLen = 1200 // generous estimate

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a1a1a" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Grid lines + y labels */}
      {yTicks.map((t) => {
        const y = padT + innerH - (t / max) * innerH
        return (
          <g key={t}>
            <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="#f0f0f0" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#b0b8c1">
              {t === 0 ? "0" : `${t}K`}
            </text>
          </g>
        )
      })}

      {/* Area fill — fades in */}
      <path
        d={areaPath}
        fill={`url(#grad-${id})`}
        opacity={animate ? 1 : 0}
        style={{ transition: "opacity 1.2s ease 0.4s" }}
      />

      {/* Inflow line — draws in */}
      <path
        d={inflowPath}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLen}
        strokeDashoffset={animate ? 0 : pathLen}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,0.61,0.36,1)" }}
      />

      {/* Outflow dashed — draws in with delay */}
      <path
        d={outflowPath}
        fill="none"
        stroke="#b0b8c1"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={animate ? 1 : 0}
        style={{ transition: "opacity 0.8s ease 0.6s" }}
      />

      {/* X labels */}
      {cashFlowLabels.map((label, i) => {
        const x = padL + (i * innerW) / (cashFlowLabels.length - 1)
        return (
          <text key={label} x={x} y={h - 6} textAnchor="middle" fontSize="10" fill="#b0b8c1">
            {label}
          </text>
        )
      })}
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Overview = () => {
  return (
    <DashboardShell
      title="Overview"
      subtitle="Real-time financial overview of your business"
    >

      {/* ── KPI row ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4"
          >
            {/* Text block */}
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-gray-500 leading-none mb-2">
                {k.label}{" "}
                {k.sub && <span className="text-gray-400">{k.sub}</span>}
              </p>
              <AnimatedValue
                value={k.value}
                duration={1400}
                className="text-[22px] font-semibold text-gray-900 tracking-tight leading-none mb-2"
              />
              <p className="text-[12px] text-gray-500 flex items-center gap-1">
                {k.trend === "up"
                  ? <FiArrowUpRight size={12} className="text-emerald-600 flex-shrink-0" />
                  : <FiArrowDownRight size={12} className="text-rose-600 flex-shrink-0" />
                }
                {k.delta}
              </p>
            </div>

            {/* Chart — sits quietly to the right */}
            <div className="shrink-0 self-end pb-1">
              {k.chart === "line"
                ? <Sparkline data={k.series} />
                : <MiniBars   data={k.series} />
              }
            </div>
          </div>
        ))}
      </section>

      {/* ── Middle row ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-4 mb-4">

        {/* Balance by Currency */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-semibold text-gray-900">Balance by Currency</h3>
            <button className="flex items-center gap-1 text-[12px] text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors">
              All Accounts
              <span className="text-gray-400 text-[10px] ml-0.5">▾</span>
            </button>
          </div>

          <div className="flex items-center gap-4 min-w-0">
            <DonutChart segments={currencyBreakdown} />

            <ul className="flex-1 min-w-0 space-y-2.5">
              {currencyBreakdown.map((c) => (
                <li key={c.code} className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-[12px] text-gray-500 w-8 flex-shrink-0">{c.code}</span>
                  <span className="text-[12px] text-gray-900 font-semibold tabular-nums flex-1 min-w-0 truncate">
                    {c.value}
                  </span>
                  <span className="text-[11px] text-gray-400 tabular-nums flex-shrink-0 w-7 text-right">
                    {c.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="col-span-12 lg:col-span-5 bg-white border border-gray-200 rounded-[20px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-gray-900">Cash Flow</h3>
            <button className="flex items-center gap-1 text-[12px] text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors">
              This Month
              <span className="text-gray-400 text-[10px] ml-0.5">▾</span>
            </button>
          </div>

          <CashFlowChart />

          <div className="flex items-center gap-5 mt-3 text-[12px] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="h-[2px] w-5 bg-gray-900 rounded-full inline-block" />
              Inflow
            </span>
            <span className="flex items-center gap-2">
              <span
                className="inline-block"
                style={{
                  width: 20,
                  height: 2,
                  backgroundImage: "repeating-linear-gradient(90deg,#b0b8c1 0,#b0b8c1 4px,transparent 4px,transparent 8px)",
                }}
              />
              Outflow
            </span>
          </div>
        </div>

       {/* AI Financial Assistant */}
<div className="col-span-12 lg:col-span-3 bg-white border border-gray-200 rounded-[20px] p-6 flex flex-col">

  {/* Header */}
  <div className="flex items-center justify-between mb-1.5">
    <h3 className="text-[14px] font-semibold text-gray-900 flex items-center gap-1.5">
      <HiOutlineSparkles size={14} className="text-gray-700" />
      AI Financial Assistant
    </h3>
    <button className="text-gray-300 hover:text-gray-500 transition-colors">
      <IoEllipsisHorizontal size={17} />
    </button>
  </div>

  <p className="text-[12px] text-gray-500 mb-5">Here's what I found for you today.</p>

  {/* Insight rows — no card background, just rows with hairline dividers */}
  <div className="flex-1">
    {aiInsights.map((item, index) => (
      <div
        key={item.title}
        className={`flex items-start gap-3 py-4 cursor-pointer group hover:opacity-80 transition-opacity ${
          index !== aiInsights.length - 1 ? "border-b border-gray-200" : ""
        }`}
      >
        {/* Icon — DESIGN.rounded.md = 12px = tailwind rounded-xl */}
        <span className="h-6 w-6 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-700 flex-shrink-0 mt-0.5">
          <item.icon size={12} />
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 leading-snug mb-1">
            {item.title}
          </p>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            {item.body}
          </p>
        </div>

        {/* Arrow */}
        <LuArrowRight
          className="text-gray-300 flex-shrink-0 mt-1 group-hover:text-gray-500 transition-colors"
          size={14}
        />
      </div>
    ))}
  </div>

  {/* CTA — button-dark: black pill on white surface */}
  <button className="mt-4 w-full flex items-center justify-between bg-black text-white rounded-full px-5 py-3.5 text-[13px] font-semibold hover:bg-gray-900 transition-colors">
    <span>Ask Swift anything...</span>
    <LuArrowRight size={15} />
  </button>
</div>
      </section>

      {/* ── Bottom tables ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-4 min-w-0">

        {/* Recent Transactions */}
        <DataTable
          className="col-span-12 lg:col-span-7 min-w-0"
          title="Recent Transactions"
          action={
            <button className="text-[12px] text-gray-500 hover:text-gray-900 transition-colors font-semibold">
              View All
            </button>
          }
          columns={[
            {
              key: "date",
              header: "Date",
              accessor: "date",
              cellClassName: "text-gray-500 whitespace-nowrap",
            },
            {
              key: "desc",
              header: "Description",
              accessor: "desc",
              cellClassName: "text-gray-900 font-semibold",
            },
            {
              key: "account",
              header: "Account",
              accessor: "account",
              cellClassName: "text-gray-500",
            },
            {
              key: "amount",
              header: "Amount",
              accessor: "amount",
              cellClassName: (r) =>
                `font-semibold tabular-nums whitespace-nowrap ${
                  r.positive ? "text-emerald-600" : "text-gray-900"
                }`,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => <StatusBadge>{r.status}</StatusBadge>,
            },
          ]}
          rows={recentTransactions}
        />

        {/* Payouts */}
        <DataTable
          className="col-span-12 lg:col-span-5"
          title="Payouts"
          action={
            <button className="text-[12px] text-gray-500 hover:text-gray-900 transition-colors font-semibold">
              View All
            </button>
          }
          columns={[
            {
              key: "recipient",
              header: "Recipient",
              accessor: "recipient",
              cellClassName: "text-gray-900 font-semibold",
            },
            {
              key: "currency",
              header: "Currency",
              accessor: "currency",
              cellClassName: "text-gray-500",
            },
            {
              key: "amount",
              header: "Amount",
              accessor: "amount",
              cellClassName:
                "text-gray-900 font-semibold tabular-nums whitespace-nowrap",
            },
            {
              key: "date",
              header: "Date",
              accessor: "date",
              cellClassName: "text-gray-500 whitespace-nowrap",
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <StatusBadge icon={<LuClock4 size={10} />}>{r.status}</StatusBadge>
              ),
            },
          ]}
          rows={payouts}
        />

      </section>
    </DashboardShell>
  )
}

export default Overview