"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  User,
  Phone,
  Building,
  MapPin,
  ArrowLeft,
} from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const prefillType = searchParams.get("type") || "couple";
  const prefillName = searchParams.get("name") || "";
  const prefillEmail = searchParams.get("email") || "";
  const prefillPhone = searchParams.get("phone") || "";
  const prefillCity = searchParams.get("city") || "";
  const prefillBusiness = searchParams.get("businessName") || "";
  const prefillCategory = searchParams.get("category") || "";
  const redirectParam = searchParams.get("redirect") || "";

  const [userType, setUserType] = useState(
    ["couple", "vendor", "seller"].includes(prefillType) ? prefillType : "couple"
  );

  const [formData, setFormData] = useState({
    name: prefillName,
    email: prefillEmail,
    phone: prefillPhone,
    business_name: prefillBusiness,
    category: prefillCategory,
    city: prefillCity,
    password: "",
    confirmPassword: "",
    terms_accepted: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validations
    if (!formData.name.trim()) {
      setErrorMsg("Full Name is required.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("A valid Email address is required.");
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }
    if (!formData.terms_accepted) {
      setErrorMsg("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: cleanPhone,
          password: formData.password,
          user_type: userType,
          business_name: formData.business_name.trim() || undefined,
          category: formData.category.trim() || undefined,
          city: formData.city.trim() || undefined,
          terms_accepted: formData.terms_accepted,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Account created successfully! Redirecting...");
      const finalDestination =
        redirectParam &&
        redirectParam.startsWith("/") &&
        !redirectParam.startsWith("//") &&
        !redirectParam.startsWith("/login") &&
        !redirectParam.startsWith("/register")
          ? redirectParam
          : data.redirectUrl || `/dashboard/${userType}`;

      setTimeout(() => {
        router.push(finalDestination);
      }, 800);
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to ShubhVivah Home
        </Link>

        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-4 py-1.5 text-xs font-semibold text-[#D6B875] mb-4 shadow-sm">
            <Sparkles size={14} /> Join The ShubhVivah Family
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8F1E5] mb-2 tracking-tight">
            Create Your ShubhVivah Account
          </h1>
          <p className="text-sm text-[#C9BBAF]">
            Join thousands of couples, vendors, and sellers making dream weddings come true.
          </p>
        </div>

        {/* Main Form Box */}
        <div className="rounded-3xl border border-[#665038] bg-[#321B30]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* User Type Selection Cards / Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-3 text-center">
              Register As:
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#241321] border border-[#665038]">
              {/* Couple Tab */}
              <button
                type="button"
                onClick={() => setUserType("couple")}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  userType === "couple"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <Heart size={18} className={userType === "couple" ? "fill-[#241321]" : ""} />
                <span>Couple</span>
              </button>

              {/* Vendor Tab */}
              <button
                type="button"
                onClick={() => setUserType("vendor")}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  userType === "vendor"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <Store size={18} />
                <span>Vendor</span>
              </button>

              {/* Seller Tab */}
              <button
                type="button"
                onClick={() => setUserType("seller")}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  userType === "seller"
                    ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                    : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                }`}
              >
                <ShoppingBag size={18} />
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
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-red-200 animate-in fade-in">
              <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                Full Name <span className="text-[#D6B875]">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={userType === "couple" ? "e.g. Priya Sharma & Rohan Verma" : "e.g. Rahul Sharma"}
                  required
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                />
              </div>
            </div>

            {/* Email & Mobile 2-column on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                </div>
              </div>
            </div>

            {/* If Vendor or Seller, show Business Fields */}
            {userType !== "couple" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                    {userType === "vendor" ? "Business / Agency Name" : "Store / Brand Name"}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                      <Building size={16} />
                    </div>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder={userType === "vendor" ? "e.g. Royal Moments Photography" : "e.g. Shubh Jewels & Apparel"}
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                    City / Location
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur, Delhi, Mumbai"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Create Password <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
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
                  Confirm Password <span className="text-[#D6B875]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#C9BBAF] hover:text-[#D6B875]"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-[#665038] bg-[#241321] text-[#B08D45] focus:ring-[#D6B875] accent-[#B08D45]"
                />
                <span className="text-xs text-[#C9BBAF] leading-relaxed">
                  I agree to ShubhVivah&apos;s{" "}
                  <span className="text-[#D6B875] underline">Terms of Service</span> and{" "}
                  <span className="text-[#D6B875] underline">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3 text-sm font-bold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] disabled:opacity-60 shadow-lg shadow-[#B08D45]/20 cursor-pointer"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 border-t border-[#665038]/60 pt-5 text-center">
            <p className="text-xs text-[#C9BBAF]">
              Already have an account?{" "}
              <Link
                href={`/login?type=${userType}&email=${encodeURIComponent(formData.email)}${redirectParam ? `&redirect=${encodeURIComponent(redirectParam)}` : ""}`}
                className="font-bold text-[#D6B875] hover:text-white underline transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1F0E1D] flex items-center justify-center text-[#D6B875]">
          Loading Registration...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

