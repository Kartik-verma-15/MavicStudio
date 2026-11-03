
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  ArrowLeft,
} from "lucide-react";

export default function AuthPage({ onSubmit }) {
  const [mode, setMode] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (isSignup && data.password !== data.confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    if (!onSubmit) {
      setMessage("Authentication will be connected in the next step.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ ...data, mode });
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F0E5] p-3 md:p-5">
      <div className="grid min-h-[calc(100vh-40px)] overflow-hidden rounded-[28px] bg-[#F5F0E5] lg:grid-cols-2">

        {/* LEFT PANEL */}
        <section className="relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#17251D] p-7 text-[#F5F0E5] md:p-12 lg:min-h-full">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full border border-[#C4F06A]/20" />
          <div className="pointer-events-none absolute -right-20 top-32 h-[320px] w-[320px] rounded-full border border-[#C4F06A]/20" />
          <div className="pointer-events-none absolute -right-8 top-44 h-[180px] w-[180px] rounded-full border border-[#C4F06A]/20" />

          <div className="relative z-10">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C4F06A] text-[#17251D]">
                <Sparkles size={18} />
              </span>
              <span className="text-xl font-semibold tracking-tight">
                mavic<span className="text-[#C4F06A]">.</span>studio
              </span>
            </a>
          </div>

          <div className="relative z-10 my-14 lg:my-0">
            <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C4F06A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C4F06A]" />
              Your creative universe
            </div>

            <h1 className="max-w-xl font-serif text-5xl leading-[1.08] tracking-tight md:text-6xl xl:text-7xl">
              One photo.
              <br />
              <span className="italic text-[#C4F06A]">
                Infinite worlds.
              </span>
            </h1>

            <p className="mt-7 max-w-sm text-sm leading-7 text-[#F5F0E5]/65">
              Step into a world where your imagination becomes reality.
              Transform ordinary photographs into extraordinary visual stories.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#C4F06A", "#D9B78A", "#A6B49A"].map((color, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: color }}
                    className="h-8 w-8 rounded-full border-2 border-[#17251D]"
                  />
                ))}
              </div>
              <p className="text-xs text-[#F5F0E5]/60">
                Create something extraordinary.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>© 2026 Mavic Studio</span>
            <span>Made for imagination</span>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex items-center justify-center px-5 py-14 md:px-12 lg:px-16">
          <div className="w-full max-w-[430px]">

            <a
              href="/"
              className="mb-12 inline-flex items-center gap-2 text-xs text-[#17251D]/50 transition hover:text-[#17251D]"
            >
              <ArrowLeft size={14} />
              Back to home
            </a>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-8">
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#71805A]">
                    {isSignup ? "Start creating" : "Welcome back"}
                  </span>

                  <h2 className="mt-3 font-serif text-4xl tracking-tight text-[#17251D] md:text-5xl">
                    {isSignup ? "Create account." : "Welcome back."}
                  </h2>

                  <p className="mt-3 text-sm text-[#17251D]/55">
                    {isSignup
                      ? "Create your account and discover a new creative world."
                      : "Sign in to continue your creative journey."}
                  </p>
                </div>

                {/* Mode switch */}
                <div className="mb-8 grid grid-cols-2 rounded-full border border-[#17251D]/10 bg-[#EAE5D9] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setMessage("");
                    }}
                    className={`rounded-full py-3 text-sm transition-all ${
                      isSignup
                        ? "bg-[#17251D] text-[#F5F0E5] shadow-md"
                        : "text-[#17251D]/55 hover:text-[#17251D]"
                    }`}
                  >
                    Create account
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setMessage("");
                    }}
                    className={`rounded-full py-3 text-sm transition-all ${
                      !isSignup
                        ? "bg-[#17251D] text-[#F5F0E5] shadow-md"
                        : "text-[#17251D]/55 hover:text-[#17251D]"
                    }`}
                  >
                    Login
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {isSignup && (
                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#17251D]/75">
                        Your name
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-[#17251D]/15 bg-white/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#17251D]/30 focus:border-[#71805A]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#17251D]/75">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#17251D]/15 bg-white/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#17251D]/30 focus:border-[#71805A]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#17251D]/75">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        minLength={8}
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        className="w-full rounded-xl border border-[#17251D]/15 bg-white/50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-[#17251D]/30 focus:border-[#71805A]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#17251D]/40 hover:text-[#17251D]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  {isSignup && (
                    <div>
                      <label className="mb-2 block text-xs font-medium text-[#17251D]/75">
                        Confirm password
                      </label>
                      <input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-[#17251D]/15 bg-white/50 px-4 py-3.5 text-sm outline-none transition placeholder:text-[#17251D]/30 focus:border-[#71805A]"
                      />
                    </div>
                  )}

                  {!isSignup && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setMessage("Password reset will be connected with authentication.")}
                        className="text-xs font-medium text-[#71805A] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {message && (
                    <p role="status" className="rounded-lg bg-[#EAE5D9] px-4 py-3 text-xs text-[#52613D]">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#17251D] py-4 text-sm font-medium text-[#F5F0E5] transition hover:bg-[#2C4031] disabled:opacity-60"
                  >
                    {loading
                      ? "Please wait..."
                      : isSignup
                        ? "Create your account"
                        : "Sign in to your account"}

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#17251D]/10" />
                  <span className="text-[10px] uppercase tracking-widest text-[#17251D]/35">
                    Mavic Studio
                  </span>
                  <div className="h-px flex-1 bg-[#17251D]/10" />
                </div>

                <p className="text-center text-xs text-[#17251D]/55">
                  {isSignup
                    ? "Already have an account?"
                    : "New to Mavic Studio?"}

                  <button
                    type="button"
                    onClick={() => {
                      setMode(isSignup ? "login" : "signup");
                      setMessage("");
                    }}
                    className="ml-1 font-semibold text-[#52613D] hover:underline"
                  >
                    {isSignup ? "Login instead" : "Create an account"}
                  </button>
                </p>

                <div className="mt-10 flex items-center justify-center gap-2 text-[10px] text-[#17251D]/35">
                  <Check size={12} />
                  <span>By continuing, you agree to our Terms & Privacy Policy.</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
