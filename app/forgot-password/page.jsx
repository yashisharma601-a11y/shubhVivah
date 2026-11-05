"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIdentifier = searchParams.get("identifier") || "";

  const [step, setStep] = useState(1); // 1: Request OTP, 2: Enter OTP & New Password
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!identifier.trim()) {
      setErrorMsg("Please enter your registered Email Address or Mobile Number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "No account found with this information.");
        setLoading(false);
        return;
      }

      setDevOtp(data.dev_otp || "");
      if (data.dev_otp) {
        setOtp(data.dev_otp); // Auto-fill for seamless user testing experience
      }
      setSuccessMsg(data.message || "Verification code sent to your registered contact.");
      setStep(2);
      setLoading(false);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp.trim()) {
      setErrorMsg("Please enter the 6-digit verification code.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          otp: otp.trim(),
          password: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Failed to reset password. Please check your OTP.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Password reset successfully! Redirecting you to login...");
      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(identifier)}`);
      }, 1200);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-4 py-1.5 text-xs font-semibold text-[#D6B875] mb-4 shadow-sm">
            <KeyRound size={14} /> Password Recovery
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8F1E5] mb-2 tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-sm text-[#C9BBAF]">
            {step === 1
              ? "Enter your registered email or mobile number to receive a verification OTP."
              : "Enter the verification code and set your new account password."}
          </p>
        </div>

        {/* Box */}
        <div className="rounded-3xl border border-[#665038] bg-[#321B30]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Success Banner */}
          {successMsg && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3.5 text-xs text-emerald-200 animate-in fade-in">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Dev OTP Helper Box */}
          {devOtp && step === 2 && (
            <div className="mb-5 rounded-xl border border-[#B08D45]/50 bg-[#241321] p-3 text-xs text-[#D6B875] flex items-center justify-between">
              <span>Demo OTP Code: <strong>{devOtp}</strong></span>
              <span className="text-[10px] text-[#C9BBAF] uppercase tracking-wider">Valid 15m</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200 animate-in fade-in">
              <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Registered Email or Mobile Number <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@example.com or 9876543210"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3 text-sm font-bold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] disabled:opacity-60 shadow-lg shadow-[#B08D45]/20 cursor-pointer"
              >
                {loading ? (
                  <span>Generating Code...</span>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* OTP */}
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  6-Digit Verification Code (OTP) <span className="text-[#D6B875]">*</span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="e.g. 123456"
                  required
                  className="w-full tracking-widest text-center text-lg font-mono font-bold rounded-xl border border-[#665038] bg-[#241321] py-2.5 px-4 text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  New Password <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#C9BBAF] hover:text-[#D6B875]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Confirm New Password <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setDevOtp("");
                  }}
                  className="text-[#C9BBAF] hover:text-[#D6B875] underline"
                >
                  Change Email / Mobile
                </button>

                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="text-[#D6B875] hover:text-white underline font-semibold"
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3 text-sm font-bold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] disabled:opacity-60 shadow-lg shadow-[#B08D45]/20 cursor-pointer"
              >
                {loading ? (
                  <span>Updating Password...</span>
                ) : (
                  <>
                    <span>Reset Password & Login</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 border-t border-[#665038]/60 pt-5 text-center">
            <p className="text-xs text-[#C9BBAF]">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-bold text-[#D6B875] hover:text-white underline transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1F0E1D] flex items-center justify-center text-[#D6B875]">
          Loading...
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}

