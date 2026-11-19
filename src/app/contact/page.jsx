"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Store,
  ShoppingBag,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  IndianRupee,
  Users,
  CheckCircle2,
  Sparkles,
  Send,
  Building,
  Globe,
  Tag,
  FileText,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const COUPLE_SERVICES = [
  "Wedding Venue",
  "Wedding Decoration",
  "Bridal & Groom Wear",
  "Wedding Photography",
  "Makeup Artist",
  "Mehndi Artist",
  "Catering",
  "Wedding Planner",
  "E-invitation",
  "Other",
];

const VENDOR_CATEGORIES = [
  "Wedding Venue",
  "Wedding Decoration",
  "Photographer",
  "Makeup Artist",
  "Mehndi Artist",
  "Bridal & Groom Wear",
  "Catering",
  "Wedding Planner",
  "Other",
];

const SELLER_CATEGORIES = [
  "Wedding Clothing",
  "Wedding Jewelry",
  "Wedding Accessories",
  "Wedding Gifts",
  "Invitation Cards",
  "Wedding Decoration Products",
  "Dairy Products",
  "Vegetable Supplier",
  "Cylinder Supplier",
  "Other",
];

export default function ContactPage() {
  const router = useRouter();
  const [userType, setUserType] = useState("couple"); // 'couple' | 'vendor' | 'seller'
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [accountPassword, setAccountPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [errors, setErrors] = useState({});

  // Couple Form State
  const [coupleData, setCoupleData] = useState({
    brideName: "",
    groomName: "",
    email: "",
    mobile: "",
    weddingDate: "",
    location: "",
    budget: "",
    guestCount: "",
    services: [],
    message: "",
  });

  // Vendor Form State
  const [vendorData, setVendorData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    mobile: "",
    category: "",
    location: "",
    address: "",
    servicesOffered: "",
    website: "",
    message: "",
  });

  // Seller Form State
  const [sellerData, setSellerData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    mobile: "",
    category: "",
    location: "",
    address: "",
    productsOffered: "",
    website: "",
    message: "",
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile.replace(/[\s-]/g, ""));
  };

  const handleCoupleServiceToggle = (service) => {
    setCoupleData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (userType === "couple") {
      if (!coupleData.brideName.trim()) newErrors.brideName = "Bride's name is required";
      if (!coupleData.groomName.trim()) newErrors.groomName = "Groom's name is required";
      if (!validateEmail(coupleData.email)) newErrors.email = "Enter a valid email address";
      if (!validateMobile(coupleData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
      if (!coupleData.weddingDate) newErrors.weddingDate = "Wedding date is required";
      if (!coupleData.location.trim()) newErrors.location = "Wedding location/city is required";
    } else if (userType === "vendor") {
      if (!vendorData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!vendorData.ownerName.trim()) newErrors.ownerName = "Owner's name is required";
      if (!validateEmail(vendorData.email)) newErrors.email = "Enter a valid email address";
      if (!validateMobile(vendorData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
      if (!vendorData.category) newErrors.category = "Please select a business category";
      if (!vendorData.location.trim()) newErrors.location = "City/Location is required";
    } else if (userType === "seller") {
      if (!sellerData.businessName.trim()) newErrors.businessName = "Seller/Business name is required";
      if (!sellerData.contactPerson.trim()) newErrors.contactPerson = "Contact person name is required";
      if (!validateEmail(sellerData.email)) newErrors.email = "Enter a valid email address";
      if (!validateMobile(sellerData.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";
      if (!sellerData.category) newErrors.category = "Please select a product category";
      if (!sellerData.location.trim()) newErrors.location = "City/Location is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const activeEmail =
      userType === "couple"
        ? coupleData.email
        : userType === "vendor"
        ? vendorData.email
        : sellerData.email;
    setRegisteredEmail(activeEmail);

    try {
      await fetch("/api/contact/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          coupleData,
          vendorData,
          sellerData,
          password: accountPassword || "Password@123",
        }),
      });
    } catch (e) {
      console.error("Auto registration error:", e);
    }

    setSubmitting(false);
    setSubmitted(true);

    // Automatic redirect countdown to existing Login page
    let count = 2;
    setRedirectCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setRedirectCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        router.push(
          `/login?registered=true&msg=${encodeURIComponent(
            "Your inquiry has been submitted successfully. Please log in to continue."
          )}&email=${encodeURIComponent(activeEmail)}&type=${userType}`
        );
      }
    }, 1000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header Banner */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-4 py-1.5 text-xs font-semibold text-[#D6B875] mb-4">
            <Sparkles size={14} className="text-[#D6B875]" /> Let's Connect
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
            Get in Touch with ShubhVivah
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#C9BBAF]">
            Whether you are planning your dream wedding, an established vendor, or a product seller, we are here to support your journey.
          </p>
        </div>

        {/* Success Modal / Banner */}
        {submitted ? (
          <div className="rounded-3xl border border-[#665038] bg-[#321B30] p-8 sm:p-12 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#B08D45]/20 text-[#D6B875] mb-5 border border-[#B08D45]">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5] mb-2">
              Your inquiry has been submitted successfully.
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#D6B875] mb-3">
              Please log in to continue.
            </p>
            <p className="text-xs sm:text-sm text-[#C9BBAF] max-w-lg mx-auto mb-6">
              Your inquiry has been registered as a{" "}
              <span className="font-semibold text-[#F8F1E5] capitalize">{userType}</span>. Redirecting you to the Login page in {redirectCountdown}s...
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/login?registered=true&msg=${encodeURIComponent(
                  "Your inquiry has been submitted successfully. Please log in to continue."
                )}&email=${encodeURIComponent(registeredEmail)}&type=${userType}`}
                className="w-full sm:w-auto rounded-full bg-[#B08D45] px-6 py-2.5 text-sm font-bold text-[#241321] hover:bg-[#D6B875] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Login Now</span>
                <ArrowRight size={16} />
              </Link>
              <button suppressHydrationWarning
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto rounded-full border border-[#B08D45] px-6 py-2.5 text-sm font-semibold text-[#D6B875] hover:bg-[#3A2638] transition-colors"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#665038] bg-[#321B30]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            {/* Step 1: User Type Selection Tabs */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D6B875] mb-3 text-center sm:text-left">
                I Am Contacting As:
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 p-1.5 rounded-2xl bg-[#241321] border border-[#665038]">
                {/* Couple Tab */}
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setUserType("couple");
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    userType === "couple"
                      ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                      : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                  }`}
                >
                  <Heart size={16} className={userType === "couple" ? "fill-[#241321]" : ""} />
                  <span>Couple</span>
                </button>

                {/* Vendor Tab */}
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setUserType("vendor");
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    userType === "vendor"
                      ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                      : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                  }`}
                >
                  <Store size={16} />
                  <span>Vendor</span>
                </button>

                {/* Seller Tab */}
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setUserType("seller");
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    userType === "seller"
                      ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30 font-bold"
                      : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                  }`}
                >
                  <ShoppingBag size={16} />
                  <span>Seller</span>
                </button>
              </div>
            </div>

            {/* Step 2: Dynamic Form Fields */}
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* ========================================================= */}
              {/* 1. COUPLE FIELDS */}
              {/* ========================================================= */}
              {userType === "couple" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Bride's Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Bride's Full Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={coupleData.brideName}
                        onChange={(e) => setCoupleData({ ...coupleData, brideName: e.target.value })}
                        placeholder="e.g. Radhika Sharma"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                          errors.brideName ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      {errors.brideName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.brideName}
                        </p>
                      )}
                    </div>

                    {/* Groom's Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Groom's Full Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={coupleData.groomName}
                        onChange={(e) => setCoupleData({ ...coupleData, groomName: e.target.value })}
                        placeholder="e.g. Aryan Verma"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                          errors.groomName ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      {errors.groomName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.groomName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Email Address <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={coupleData.email}
                          onChange={(e) => setCoupleData({ ...coupleData, email: e.target.value })}
                          placeholder="couple@example.com"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.email ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Mail size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Mobile Number <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={coupleData.mobile}
                          onChange={(e) => setCoupleData({ ...coupleData, mobile: e.target.value })}
                          placeholder="10-digit mobile number"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.mobile ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Phone size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Wedding Date */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Wedding Date <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={coupleData.weddingDate}
                          onChange={(e) => setCoupleData({ ...coupleData, weddingDate: e.target.value })}
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] outline-none transition-colors ${
                            errors.weddingDate ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Calendar size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.weddingDate && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.weddingDate}
                        </p>
                      )}
                    </div>

                    {/* Wedding Location / City */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Wedding Location / City <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={coupleData.location}
                          onChange={(e) => setCoupleData({ ...coupleData, location: e.target.value })}
                          placeholder="e.g. Udaipur / Jaipur / Mumbai"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.location ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <MapPin size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Wedding Budget */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Wedding Budget (Approx)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={coupleData.budget}
                          onChange={(e) => setCoupleData({ ...coupleData, budget: e.target.value })}
                          placeholder="e.g. ₹15 - 25 Lakhs"
                          className="w-full rounded-xl border border-[#665038] bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                        />
                        <IndianRupee size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Number of Guests (Approx)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={coupleData.guestCount}
                          onChange={(e) => setCoupleData({ ...coupleData, guestCount: e.target.value })}
                          placeholder="e.g. 350"
                          className="w-full rounded-xl border border-[#665038] bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                        />
                        <Users size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                    </div>
                  </div>

                  {/* Services Multi-Select */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-2">
                      Wedding Services Required (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {COUPLE_SERVICES.map((srv) => {
                        const isSelected = coupleData.services.includes(srv);
                        return (
                          <button suppressHydrationWarning
                            key={srv}
                            type="button"
                            onClick={() => handleCoupleServiceToggle(srv)}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                              isSelected
                                ? "border-[#D6B875] bg-[#B08D45]/20 text-[#D6B875]"
                                : "border-[#665038] bg-[#241321] text-[#C9BBAF] hover:border-[#B08D45]"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                isSelected
                                  ? "border-[#D6B875] bg-[#D6B875] text-[#241321]"
                                  : "border-[#665038] bg-transparent"
                              }`}
                            >
                              {isSelected && <CheckCircle2 size={12} className="stroke-[3]" />}
                            </span>
                            <span className="truncate">{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Requirements / Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Additional Requirements / Message
                    </label>
                    <textarea
                      rows={4}
                      value={coupleData.message}
                      onChange={(e) => setCoupleData({ ...coupleData, message: e.target.value })}
                      placeholder="Tell us more about your wedding theme, preferences, or any specific requests..."
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 2. VENDOR FIELDS */}
              {/* ========================================================= */}
              {userType === "vendor" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Vendor / Business Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={vendorData.businessName}
                          onChange={(e) => setVendorData({ ...vendorData, businessName: e.target.value })}
                          placeholder="e.g. Royal Shutter Photography"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.businessName ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Building size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.businessName}
                        </p>
                      )}
                    </div>

                    {/* Owner's Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Owner's Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={vendorData.ownerName}
                        onChange={(e) => setVendorData({ ...vendorData, ownerName: e.target.value })}
                        placeholder="e.g. Rajesh Mehra"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                          errors.ownerName ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      {errors.ownerName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.ownerName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Email Address <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={vendorData.email}
                          onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                          placeholder="vendor@business.com"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.email ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Mail size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Mobile Number <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={vendorData.mobile}
                          onChange={(e) => setVendorData({ ...vendorData, mobile: e.target.value })}
                          placeholder="10-digit mobile number"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.mobile ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Phone size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Business Category */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Business Category <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={vendorData.category}
                          onChange={(e) => setVendorData({ ...vendorData, category: e.target.value })}
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] outline-none transition-colors ${
                            errors.category ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        >
                          <option value="" className="bg-[#241321]">Select Category</option>
                          {VENDOR_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-[#241321]">
                              {cat}
                            </option>
                          ))}
                        </select>
                        <Tag size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.category}
                        </p>
                      )}
                    </div>

                    {/* City / Location */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        City / Location <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={vendorData.location}
                          onChange={(e) => setVendorData({ ...vendorData, location: e.target.value })}
                          placeholder="e.g. Jaipur, Rajasthan"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.location ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <MapPin size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Business Address */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Business Address
                    </label>
                    <input
                      type="text"
                      value={vendorData.address}
                      onChange={(e) => setVendorData({ ...vendorData, address: e.target.value })}
                      placeholder="Shop/Studio address, landmark, area"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>

                  {/* Services Offered */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Services Offered
                    </label>
                    <input
                      type="text"
                      value={vendorData.servicesOffered}
                      onChange={(e) => setVendorData({ ...vendorData, servicesOffered: e.target.value })}
                      placeholder="e.g. Pre-wedding shoots, Cinematic films, Drone coverage, Traditional photography"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>

                  {/* Website / Social Media Link */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Website / Social Media Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={vendorData.website}
                        onChange={(e) => setVendorData({ ...vendorData, website: e.target.value })}
                        placeholder="https://instagram.com/yourbusiness or website"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <Globe size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Additional Information
                    </label>
                    <textarea
                      rows={3}
                      value={vendorData.message}
                      onChange={(e) => setVendorData({ ...vendorData, message: e.target.value })}
                      placeholder="Pricing range, years of experience, awards, or queries..."
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 3. SELLER FIELDS */}
              {/* ========================================================= */}
              {userType === "seller" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Seller / Business Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Seller / Business Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={sellerData.businessName}
                          onChange={(e) => setSellerData({ ...sellerData, businessName: e.target.value })}
                          placeholder="e.g. Royal Ghee & Dairy Supply"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.businessName ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <ShoppingBag size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.businessName}
                        </p>
                      )}
                    </div>

                    {/* Contact Person Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Contact Person Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={sellerData.contactPerson}
                        onChange={(e) => setSellerData({ ...sellerData, contactPerson: e.target.value })}
                        placeholder="e.g. Vikramaditya Rathore"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                          errors.contactPerson ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      {errors.contactPerson && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.contactPerson}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Email Address <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={sellerData.email}
                          onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })}
                          placeholder="seller@business.com"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.email ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Mail size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Mobile Number <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={sellerData.mobile}
                          onChange={(e) => setSellerData({ ...sellerData, mobile: e.target.value })}
                          placeholder="10-digit mobile number"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.mobile ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <Phone size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Product Category */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        Product Category <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={sellerData.category}
                          onChange={(e) => setSellerData({ ...sellerData, category: e.target.value })}
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] outline-none transition-colors ${
                            errors.category ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        >
                          <option value="" className="bg-[#241321]">Select Product Category</option>
                          {SELLER_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-[#241321]">
                              {cat}
                            </option>
                          ))}
                        </select>
                        <Tag size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.category && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.category}
                        </p>
                      )}
                    </div>

                    {/* City / Location */}
                    <div>
                      <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                        City / Location <span className="text-[#D6B875]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={sellerData.location}
                          onChange={(e) => setSellerData({ ...sellerData, location: e.target.value })}
                          placeholder="e.g. Udaipur, Rajasthan"
                          className={`w-full rounded-xl border bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors ${
                            errors.location ? "border-rose-500" : "border-[#665038] focus:border-[#D6B875]"
                          }`}
                        />
                        <MapPin size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Business Address */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Business Address
                    </label>
                    <input
                      type="text"
                      value={sellerData.address}
                      onChange={(e) => setSellerData({ ...sellerData, address: e.target.value })}
                      placeholder="Warehouse / Store / Outlet address"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>

                  {/* Products Offered */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Products Offered
                    </label>
                    <input
                      type="text"
                      value={sellerData.productsOffered}
                      onChange={(e) => setSellerData({ ...sellerData, productsOffered: e.target.value })}
                      placeholder="e.g. Pure Desi Ghee tins, 20L Chilled Water Campers, Commercial Gas Cylinders, Exotic vegetables"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>

                  {/* Website / Social Media Link */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Website / Social Media Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={sellerData.website}
                        onChange={(e) => setSellerData({ ...sellerData, website: e.target.value })}
                        placeholder="https://yourstore.com or catalog link"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] pl-10 pr-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <Globe size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-xs font-medium text-[#F8F1E5] mb-1.5">
                      Additional Information
                    </label>
                    <textarea
                      rows={3}
                      value={sellerData.message}
                      onChange={(e) => setSellerData({ ...sellerData, message: e.target.value })}
                      placeholder="Minimum order quantity, supply capacities, wholesale rates or queries..."
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Optional Portal Login Password */}
              <div className="p-4 rounded-2xl bg-[#241321] border border-[#665038]/80 mt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#D6B875] flex items-center gap-1.5">
                    <Lock size={14} /> Set Password for ShubhVivah Portal Login
                  </label>
                  <span className="text-[11px] text-[#C9BBAF]">Optional</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={accountPassword}
                    onChange={(e) => setAccountPassword(e.target.value)}
                    placeholder="Create a password (default: Password@123)"
                    className="w-full rounded-xl border border-[#665038] bg-[#321B30] px-4 py-2.5 pr-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875] transition-colors"
                  />
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#C9BBAF] hover:text-[#D6B875]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="mt-1.5 text-[11px] text-[#C9BBAF]">
                  After submitting, your account will be created and you'll be redirected to the Login page (accessible via <strong>Login</strong> in the navbar).
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button suppressHydrationWarning
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3.5 px-6 text-sm font-bold text-[#241321] shadow-lg shadow-[#B08D45]/20 transition-all duration-200 hover:bg-[#D6B875] hover:shadow-xl hover:shadow-[#D6B875]/30 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  <Send size={16} />
                  <span>
                    {submitting
                      ? "Submitting & Registering..."
                      : `Submit & Register as ${userType === "couple" ? "Couple" : userType === "vendor" ? "Vendor" : "Seller"}`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

