import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TbArrowLeft, TbEye, TbEyeOff, TbBuilding, TbUser } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc"
import Speeder from "@/components/Speeder"

const Register = () => {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState("business")
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const requiredFields = accountType === "business"
      ? ["firstName", "lastName", "company", "email", "password"]
      : ["firstName", "lastName", "email", "password"]

    const missing = requiredFields.find((f) => !form[f])
    if (missing) {
      setError("Please fill in all required fields")
      return
    }
    if (!agree) {
      setError("Please accept the terms to continue")
      return
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    // TODO: wire to api/register
    setTimeout(() => {
      setLoading(false)
      navigate(accountType === "business" ? "/business" : "/personal")
    }, 800)
  }

  const inputStyle = {
    background: "#0A0A0A",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "0.875rem",
  }

  const focusBorder = (e) => (e.currentTarget.style.borderColor = "rgba(217,255,67,0.4)")
  const blurBorder = (e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")

  return (
    <div className="min-h-screen bg-black flex items-center justify-center page-x py-10 font-sans">
      <div
        className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden"
        style={{
          background: "#0F0F0F",
          border: "1px solid rgba(255,255,255,0.08)",
          minHeight: "640px",
        }}
      >

        {/* ================ LEFT PANEL ================ */}
        <div className="bg-main-palette relative p-10 flex flex-col justify-between hidden md:flex overflow-hidden">

          {/* Animated speeder behind the content */}
          <Speeder className="opacity-80" />

          <div className="flex items-center justify-between relative z-10">
            <Link to="/" className="flex items-center no-underline">
              <img src="/img/logo-inverted.png" alt="Swift" className="h-8 w-auto" />
            </Link>
            <Link
              to="/"
              className="no-underline inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <TbArrowLeft size={16} />
              Back to website
            </Link>
          </div>

          <div className="relative z-10">
            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Connect QuickBooks.<br />Set rules. Done.
            </h2>
            <p className="text-white/60 text-sm max-w-sm" style={{ lineHeight: 1.65 }}>
              Get your team paid, your books reconciled, and your reports written —
              all from one autonomous workspace.
            </p>
            <div className="mt-7 flex items-center gap-1.5">
              <span className="w-1.5 h-1 rounded-full bg-white/30" />
              <span className="w-8 h-1 rounded-full bg-[#D9FF43]" />
              <span className="w-1.5 h-1 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* ================ RIGHT PANEL — FORM ================ */}
        <div className="p-10 md:p-14 flex flex-col justify-center" style={{ background: "#0F0F0F" }}>

          {/* Heading */}
          <div className="mb-7">
            <h1
              className="font-display text-white mb-2"
              style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Create your account
            </h1>
            <p className="text-white/50 text-sm">
              Start with the agent in co-pilot mode — graduate to autonomy when you're ready.
            </p>
          </div>

          {/* Account type segmented control */}
          <div
            className="grid grid-cols-2 gap-1 p-1 rounded-full mb-6"
            style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { value: "business", label: "Business", icon: TbBuilding },
              { value: "personal", label: "Personal", icon: TbUser },
            ].map(({ value, label, icon: Icon }) => {
              const active = accountType === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAccountType(value)}
                  className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: active ? "#D9FF43" : "transparent",
                    color: active ? "#000" : "rgba(255,255,255,0.6)",
                    border: "0",
                    padding: "9px 12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  <Icon size={15} />
                  {label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-white/70 text-xs font-medium mb-2">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Ada"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="w-full text-white placeholder-white/30 outline-none transition-colors"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white/70 text-xs font-medium mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Okonkwo"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="w-full text-white placeholder-white/30 outline-none transition-colors"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            {/* Company (business only) */}
            {accountType === "business" && (
              <div>
                <label htmlFor="company" className="block text-white/70 text-xs font-medium mb-2">
                  Company name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Loophole Labs"
                  value={form.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="w-full text-white placeholder-white/30 outline-none transition-colors"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white/70 text-xs font-medium mb-2">
                Work email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full text-white placeholder-white/30 outline-none transition-colors"
                style={inputStyle}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white/70 text-xs font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full text-white placeholder-white/30 outline-none transition-colors"
                  style={{ ...inputStyle, padding: "12px 48px 12px 16px" }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1 bg-transparent border-0 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <TbEyeOff size={18} /> : <TbEye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="sr-only"
              />
              <span
                className="w-4 h-4 mt-0.5 rounded flex items-center justify-center transition-all flex-shrink-0"
                style={{
                  background: agree ? "#D9FF43" : "transparent",
                  border: `1px solid ${agree ? "#D9FF43" : "rgba(255,255,255,0.2)"}`,
                }}
              >
                {agree && (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="text-white/60 text-xs leading-relaxed">
                I agree to Swift's{" "}
                <Link to="#" className="no-underline text-[#D9FF43] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="#" className="no-underline text-[#D9FF43] hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            {/* Error */}
            {error && (
              <div
                className="text-xs px-3 py-2.5 rounded-lg"
                style={{
                  background: "rgba(255,118,118,0.08)",
                  color: "#ff7676",
                  border: "1px solid rgba(255,118,118,0.18)",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "#D9FF43",
                color: "#000",
                border: "0",
                fontSize: "0.9rem",
                padding: "14px 24px",
              }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.filter = "brightness(0.95)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-white/30 text-xs">Or continue with</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-3 rounded-full font-medium text-white transition-all duration-200"
            style={{
              background: "#0A0A0A",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "0.875rem",
              padding: "12px 24px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0A0A0A")}
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* Login */}
          <p className="text-center text-white/50 text-xs mt-6">
            Already have an account?{" "}
            <Link to="/login" className="no-underline text-[#D9FF43] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
