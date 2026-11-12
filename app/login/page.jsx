"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Store,
  ShoppingBag,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  ArrowLeft,
  UserPlus,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialType = searchParams.get("type") || "couple";
  const initialEmail = searchParams.get("email") || "";
  const registered = searchParams.get("registered") === "true";
  const queryMsg = searchParams.get("msg") || "";
  const redirectParam = searchParams.get("redirect") || "";
  const isAuthRequired = searchParams.get("message") === "auth_required" || Boolean(redirectParam);

  const [userType, setUserType] = useState(
    ["couple", "vendor", "seller"].includes(initialType) ? initialType : "couple"
  );
  const [identifier, setIdentifier] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(
    queryMsg ||
      (registered
        ? "Your account or inquiry has been registered successfully. Please log in to continue."
        : "")
  );

  const validateInputs = () => {
    const errors = {};
    const trimmed = identifier.trim();

    if (!trimmed) {
      errors.identifier = "Please enter your registered Email Address or 10-digit Mobile Number.";
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      const isPhone = /^[6-9]\d{9}$/.test(trimmed.replace(/[\s\-+()]/g, ""));
      if (!isEmail && !isPhone) {
        errors.identifier = "Please enter a valid Email (e.g. name@example.com) or a 10-digit Indian Mobile Number.";
      }
    }

    if (!password) {
      errors.password = "Password field cannot be empty.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRoleChange = (role) => {
    setUserType(role);
    setErrorMsg("");
    setFieldErrors({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
          user_type: userType,
          remember_me: rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Invalid credentials. Please verify your details.");
        setLoading(false);
        return;
      }

      // Success
      setSuccessMsg("Authentication successful! Welcome back to ShubhVivah. Redirecting...");

      // Validate safe redirect destination (prevent open redirect vulnerabilities)
      const isSafeRedirect =
        redirectParam &&
        redirectParam.startsWith("/") &&
        !redirectParam.startsWith("//") &&
        !redirectParam.startsWith("/login") &&
        !redirectParam.startsWith("/register") &&
        !redirectParam.startsWith("/api");

      const finalDestination = isSafeRedirect
        ? redirectParam
        : data.redirectUrl || `/dashboard/${data.actualType || userType}`;

      setTimeout(() => {
        router.push(finalDestination);
      }, 700);
    } catch {
      setErrorMsg("An error occurred while connecting to the server. Please check your network and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#B08D45]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B08D45]/10 blur-3xl" />

      <div className="relative z-10 max-w-md w-full mx-auto">
        {/* Top Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6B875] hover:text-[#FFE29A] transition-colors"
          >
            <ArrowLeft size={15} /> Back to ShubhVivah Home
          </Link>
        </div>

        {/* Card Header & Brand Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105 duration-200">
            <Image
              src="/shubhvivah-logo.png"
              alt="ShubhVivah"
              width={230}
              height={70}
              priority
              className="h-14 sm:h-16 w-auto object-contain mx-auto drop-shadow-[0_2px_14px_rgba(214,184,117,0.35)]"
            />
          </Link>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-4 py-1 text-xs font-semibold text-[#D6B875] shadow-sm">
            <Sparkles size={13} /> Matrimonial Member Login
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5] tracking-tight">
            Welcome to ShubhVivah
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#C9BBAF]">
            Log in to continue your matrimonial journey and connect with your partner.
          </p>
        </div>

        {/* Main Login Card */}
        <div className="rounded-3xl border border-[#665038] bg-[#321B30]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Authentication Required Notice */}
          {isAuthRequired && (
            <div className="mb-6 rounded-2xl border border-[#D6B875]/70 bg-gradient-to-r from-[#B08D45]/25 via-[#241321] to-[#B08D45]/25 p-4 text-xs shadow-xl animate-in fade-in">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#B08D45] p-2 text-[#241321] shrink-0 mt-0.5 shadow-sm">
                  <Lock size={17} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#FFE29A] mb-1">
                    Login Required
                  </h3>
                  <p className="text-[#F8F1E5] leading-relaxed mb-2.5">
                    Please log in or create an account to view profiles, partner preferences, and protected member details.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-[#C9BBAF]">New to ShubhVivah?</span>
                    <Link
                      href={`/register?type=${userType}${redirectParam ? `&redirect=${encodeURIComponent(redirectParam)}` : ""}`}
                      className="inline-flex items-center gap-1 font-bold text-[#D6B875] hover:text-white underline"
                    >
                      <UserPlus size={13} />
                      <span>Create Free Account &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Category Selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-2.5 text-center">
              Select Account Type
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#241321] border border-[#665038]">
              {/* Couple Tab */}
              <button
                type="button"
                onClick={() => handleRoleChange("couple")}
                className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  userType === "couple"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <Heart size={17} className={userType === "couple" ? "fill-[#241321]" : ""} />
                <span>Couple</span>
              </button>

              {/* Vendor Tab */}
              <button
                type="button"
                onClick={() => handleRoleChange("vendor")}
                className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  userType === "vendor"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <Store size={17} />
                <span>Vendor</span>
              </button>

              {/* Seller Tab */}
              <button
                type="button"
                onClick={() => handleRoleChange("seller")}
                className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  userType === "seller"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <ShoppingBag size={17} />
                <span>Seller</span>
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs text-emerald-200 animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Identifier (Email / Mobile) */}
            <div>
              <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                Email Address or Mobile Number <span className="text-[#D6B875]">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                  <Mail size={16} />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (fieldErrors.identifier) {
                      setFieldErrors((prev) => ({ ...prev, identifier: null }));
                    }
                  }}
                  placeholder="name@example.com or 9876543210"
                  disabled={loading}
                  className={`w-full rounded-xl border ${
                    fieldErrors.identifier ? "border-red-500/80 bg-red-950/20" : "border-[#665038] bg-[#241321]"
                  } py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875] disabled:opacity-50`}
                />
              </div>
              {fieldErrors.identifier && (
                <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.identifier}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                Password <span className="text-[#D6B875]">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: null }));
                    }
                  }}
                  placeholder="Enter your account password"
                  disabled={loading}
                  className={`w-full rounded-xl border ${
                    fieldErrors.password ? "border-red-500/80 bg-red-950/20" : "border-[#665038] bg-[#241321]"
                  } py-2.5 pl-10 pr-11 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875] disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#C9BBAF] hover:text-[#D6B875] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-[#665038] bg-[#241321] text-[#B08D45] focus:ring-[#D6B875] accent-[#B08D45]"
                />
                <span className="text-xs text-[#C9BBAF]">Remember Me (30 Days)</span>
              </label>

              <Link
                href={`/forgot-password?identifier=${encodeURIComponent(identifier)}`}
                className="text-xs font-medium text-[#D6B875] hover:text-[#FFE29A] transition-colors underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button with Loading Indicator and Multi-submission prevention */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3 text-sm font-bold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] disabled:opacity-60 shadow-lg shadow-[#B08D45]/20 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-[#241321]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Registration Navigation */}
          <div className="mt-6 border-t border-[#665038]/60 pt-5 text-center">
            <p className="text-xs text-[#C9BBAF]">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?type=${userType}&email=${encodeURIComponent(identifier)}${redirectParam ? `&redirect=${encodeURIComponent(redirectParam)}` : ""}`}
                className="font-bold text-[#D6B875] hover:text-[#FFE29A] underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1F0E1D] flex items-center justify-center text-[#D6B875]">
          Loading ShubhVivah Portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
