"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Store,
  Sparkles,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  MapPin,
  IndianRupee,
  Clock,
  CalendarCheck,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  ShieldCheck,
  Award,
  Users2,
  HelpCircle,
  Check,
} from "lucide-react";

const CATEGORIES = [
  "Wedding Planner",
  "Wedding Photographer",
  "Wedding Videographer",
  "Makeup Artist",
  "Mehndi Artist",
  "Wedding Decorator",
  "Caterer",
  "Bridal Wear",
  "Groom Wear",
  "Jewellery",
  "Wedding Invitation Designer",
  "Banquet Hall",
  "Wedding Resort",
  "Destination Wedding Venue",
  "Florist",
  "DJ and Music",
  "Wedding Choreographer",
  "Pandit / Wedding Officiant",
  "Wedding Transportation",
  "Other Wedding Services",
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi (NCT)",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
];

const PRICING_TYPES = ["Starting From", "Fixed Price", "Custom Quote"];

export default function VendorRegisterPage() {
  const [formData, setFormData] = useState({
    business_name: "",
    category: "",
    owner_name: "",
    email: "",
    phone: "",
    whatsapp: "",
    website: "",
    description: "",

    country: "India",
    state: "",
    city: "",
    address: "",
    pincode: "",

    services_offered: "",
    starting_price: "",
    pricing_type: "Starting From",
    service_areas: "",
    experience_years: "",
    weddings_completed: "",

    instagram_url: "",
    facebook_url: "",
    youtube_url: "",

    working_hours: "9:00 AM - 8:00 PM",
    availability: "All Days (Mon - Sun)",
    preferred_contact: "Phone",

    terms_accepted: false,
  });

  // File states
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [portfolioPreviews, setPortfolioPreviews] = useState([]);

  // UI status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [serverError, setServerError] = useState("");

  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const portfolioInputRef = useRef(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Sync Phone to WhatsApp if desired
  const handleSameAsPhone = () => {
    setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
  };

  // Logo Upload Handler
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Logo file size must be under 5MB");
        return;
      }
      setLogoFile(file);
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  // Cover Image Handler
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("Cover image file size must be under 8MB");
        return;
      }
      setCoverFile(file);
      const preview = URL.createObjectURL(file);
      setCoverPreview(preview);
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  // Portfolio Multi-File Handler
  const handlePortfolioChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (file.size <= 8 * 1024 * 1024) {
        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setPortfolioFiles((prev) => [...prev, ...validFiles]);
    setPortfolioPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePortfolioImage = (index) => {
    setPortfolioFiles((prev) => prev.filter((_, i) => i !== index));
    setPortfolioPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Client Validation
  const validate = () => {
    const errs = {};

    if (!formData.business_name.trim()) errs.business_name = "Business name is required.";
    if (!formData.category) errs.category = "Please select a business category.";
    if (!formData.owner_name.trim()) errs.owner_name = "Owner's full name is required.";

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address (e.g. name@business.com).";
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "Contact number is required.";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
    }

    if (formData.whatsapp) {
      const cleanWa = formData.whatsapp.replace(/[\s-]/g, "");
      if (!/^[6-9]\d{9}$/.test(cleanWa)) {
        errs.whatsapp = "Enter a valid 10-digit Indian WhatsApp number.";
      }
    }

    if (!formData.description.trim()) {
      errs.description = "Please describe your business and specialties.";
    } else if (formData.description.trim().length < 20) {
      errs.description = "Description should be at least 20 characters long.";
    }

    if (!formData.country.trim()) errs.country = "Country is required.";
    if (!formData.state) errs.state = "Please select a state.";
    if (!formData.city.trim()) errs.city = "City is required.";
    if (!formData.address.trim()) errs.address = "Full business address is required.";

    const cleanPin = formData.pincode.replace(/\s/g, "");
    if (!formData.pincode.trim()) {
      errs.pincode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(cleanPin)) {
      errs.pincode = "Enter a valid 6-digit Indian PIN code (e.g. 302001).";
    }

    if (!formData.services_offered.trim()) errs.services_offered = "Please specify services offered.";
    if (!formData.starting_price.trim()) errs.starting_price = "Starting price or package rate is required.";

    if (!formData.terms_accepted) {
      errs.terms_accepted = "You must agree to the Terms & Conditions and Privacy Policy.";
    }

    return errs;
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const dataPayload = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        dataPayload.append(key, value);
      });

      // Append files
      if (logoFile) dataPayload.append("logo", logoFile);
      if (coverFile) dataPayload.append("cover_image", coverFile);
      portfolioFiles.forEach((file) => {
        dataPayload.append("portfolio_images", file);
      });

      const response = await fetch("/api/vendors/register", {
        method: "POST",
        body: dataPayload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration. Please try again.");
      }

      setSubmittedData({
        ...formData,
        logo_url: result.vendor?.logo_url || logoPreview,
        id: result.registrationId,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission Error:", err);
      setServerError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      business_name: "",
      category: "",
      owner_name: "",
      email: "",
      phone: "",
      whatsapp: "",
      website: "",
      description: "",
      country: "India",
      state: "",
      city: "",
      address: "",
      pincode: "",
      services_offered: "",
      starting_price: "",
      pricing_type: "Starting From",
      service_areas: "",
      experience_years: "",
      weddings_completed: "",
      instagram_url: "",
      facebook_url: "",
      youtube_url: "",
      working_hours: "9:00 AM - 8:00 PM",
      availability: "All Days (Mon - Sun)",
      preferred_contact: "Phone",
      terms_accepted: false,
    });
    setLogoFile(null);
    setLogoPreview(null);
    setCoverFile(null);
    setCoverPreview(null);
    setPortfolioFiles([]);
    setPortfolioPreviews([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5]">
      {/* Royal Hero Header */}
      <section className="relative overflow-hidden border-b border-[#665038] bg-gradient-to-b from-[#241321] via-[#2F172C] to-[#1F0E1D] px-4 py-16 text-center text-[#F8F1E5] sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#D6B875_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-4 py-1.5 text-xs font-semibold text-[#D6B875] backdrop-blur-md shadow-md">
            <Sparkles size={14} className="text-[#D6B875]" />
            ShubhVivah Verified Partner Portal
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
            List Your Wedding Business
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
            Join ShubhVivah and connect with couples looking for wedding services. Register your business and showcase your services to thousands of potential customers.
          </p>

          {/* Quick Value Points */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-xl border border-[#665038] bg-[#321B30]/70 p-3 text-center backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D6B875]">25,000+</div>
              <div className="text-[11px] text-[#C9BBAF]">Couples Planning</div>
            </div>
            <div className="rounded-xl border border-[#665038] bg-[#321B30]/70 p-3 text-center backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D6B875]">50+ Cities</div>
              <div className="text-[11px] text-[#C9BBAF]">Across India</div>
            </div>
            <div className="rounded-xl border border-[#665038] bg-[#321B30]/70 p-3 text-center backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D6B875]">Verified</div>
              <div className="text-[11px] text-[#C9BBAF]">Vendor Badge</div>
            </div>
            <div className="rounded-xl border border-[#665038] bg-[#321B30]/70 p-3 text-center backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D6B875]">Direct Leads</div>
              <div className="text-[11px] text-[#C9BBAF]">Zero Commission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Success Confirmation Card */}
        {submittedData ? (
          <div className="overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-12 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#B08D45]/20 text-[#D6B875] border-2 border-[#B08D45] shadow-lg shadow-[#B08D45]/20">
                <CheckCircle2 size={44} />
              </div>

              <span className="mt-6 inline-block rounded-full bg-[#241321] border border-[#665038] px-4 py-1 text-xs font-semibold text-[#D6B875]">
                Registration ID: #{submittedData.id || "SV-PENDING"}
              </span>

              <h2 className="mt-3 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                Your business registration has been submitted successfully!
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm text-[#C9BBAF] sm:text-base">
                Our team will review your details and contact you shortly. Once verified, your storefront will be published across ShubhVivah.
              </p>
            </div>

            {/* Registration Summary Preview */}
            <div className="mt-8 rounded-2xl border border-[#665038] bg-[#241321] p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#D6B875] border-b border-[#665038] pb-3">
                Submitted Business Overview
              </h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 text-sm">
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Business Name</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.business_name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Category</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.category}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Owner Name</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.owner_name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Contact Email</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Phone / WhatsApp</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.phone} {submittedData.whatsapp && `(WA: ${submittedData.whatsapp})`}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Location</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.city}, {submittedData.state} ({submittedData.pincode})</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Starting Price</dt>
                  <dd className="font-medium text-[#F8F1E5]">{submittedData.starting_price} ({submittedData.pricing_type})</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#C9BBAF] uppercase font-semibold">Verification Status</dt>
                  <dd className="inline-flex items-center gap-1.5 font-semibold text-[#D6B875]">
                    <Clock size={14} /> Under Review (24-48 hrs)
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="w-full rounded-full border border-[#B08D45] bg-transparent px-8 py-3 text-sm font-semibold text-[#D6B875] transition hover:bg-[#3A2638] sm:w-auto"
              >
                Register Another Business
              </button>
              <Link
                href="/"
                className="w-full rounded-full bg-[#B08D45] px-8 py-3 text-center text-sm font-bold text-[#241321] shadow-md transition hover:bg-[#D6B875] sm:w-auto"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* The Registration Form Card */
          <div className="overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30]/80 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-12">
            {serverError && (
              <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
                <AlertCircle className="shrink-0 text-red-400" size={20} />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-12">
              {/* ========================================================= */}
              {/* SECTION 1: BUSINESS INFORMATION */}
              {/* ========================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#665038] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D45] text-xs font-bold text-[#241321] shadow-md">
                    1
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Business Information
                    </h2>
                    <p className="text-xs text-[#C9BBAF]">
                      Core profile details of your wedding brand
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Business Name */}
                  <div>
                    <label htmlFor="business_name" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Name <span className="text-[#D6B875]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="business_name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        placeholder="e.g. Royal Shutter Studios"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.business_name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <Building2 size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.business_name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.business_name}
                      </p>
                    )}
                  </div>

                  {/* Business Category */}
                  <div>
                    <label htmlFor="category" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Category <span className="text-[#D6B875]">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none transition-colors ${
                        errors.category ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    >
                      <option value="" className="bg-[#241321] text-[#F8F1E5]">Select Wedding Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#241321] text-[#F8F1E5]">
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label htmlFor="owner_name" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Owner Name <span className="text-[#D6B875]">*</span>
                    </label>
                    <input
                      type="text"
                      id="owner_name"
                      name="owner_name"
                      value={formData.owner_name}
                      onChange={handleChange}
                      placeholder="e.g. Vikramaditya Rathore"
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                        errors.owner_name ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    />
                    {errors.owner_name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.owner_name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Email Address <span className="text-[#D6B875]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="business@example.com"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.email ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <Mail size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Contact Number <span className="text-[#D6B875]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.phone ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <Phone size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="whatsapp" className="text-xs font-semibold text-[#D6B875] uppercase tracking-wider">
                        WhatsApp Number (Optional)
                      </label>
                      {formData.phone && (
                        <button
                          type="button"
                          onClick={handleSameAsPhone}
                          className="text-[11px] font-semibold text-[#D6B875] hover:underline"
                        >
                          Same as Phone
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="WhatsApp number for couple leads"
                        maxLength={10}
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.whatsapp ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <MessageSquare size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* Business Website */}
                  <div className="sm:col-span-2">
                    <label htmlFor="website" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Website (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://www.yourweddingbusiness.com"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <Globe size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                  </div>

                  {/* Business Description */}
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Description <span className="text-[#D6B875]">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Share your business story, specialty, working style, types of events covered, and why couples should choose you..."
                      className={`w-full rounded-xl border bg-[#241321] p-4 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                        errors.description ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 2: BUSINESS LOCATION */}
              {/* ========================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#665038] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D45] text-xs font-bold text-[#241321] shadow-md">
                    2
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Business Location
                    </h2>
                    <p className="text-xs text-[#C9BBAF]">
                      Where couples can find your studio, venue, or service hub
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Country <span className="text-[#D6B875]">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="state" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      State <span className="text-[#D6B875]">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none transition-colors ${
                        errors.state ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    >
                      <option value="" className="bg-[#241321] text-[#F8F1E5]">Select State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-[#241321] text-[#F8F1E5]">
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.state}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      City <span className="text-[#D6B875]">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur / Mumbai"
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                        errors.city ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Full Business Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Full Business Address <span className="text-[#D6B875]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Shop / Studio / Office No, Street, Landmark"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.address ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <MapPin size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div>
                    <label htmlFor="pincode" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      PIN Code <span className="text-[#D6B875]">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                        errors.pincode ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 3: SERVICES AND PRICING */}
              {/* ========================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#665038] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D45] text-xs font-bold text-[#241321] shadow-md">
                    3
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Business Services & Pricing
                    </h2>
                    <p className="text-xs text-[#C9BBAF]">
                      Packages, rates, and capabilities you offer to couples
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Services Offered */}
                  <div className="sm:col-span-3">
                    <label htmlFor="services_offered" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Services Offered <span className="text-[#D6B875]">*</span>
                    </label>
                    <input
                      type="text"
                      id="services_offered"
                      name="services_offered"
                      value={formData.services_offered}
                      onChange={handleChange}
                      placeholder="e.g. Candid Photography, Traditional Video, Drone Shoots, Pre-Wedding Films"
                      className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                        errors.services_offered ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                      }`}
                    />
                    {errors.services_offered && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.services_offered}
                      </p>
                    )}
                  </div>

                  {/* Starting Price */}
                  <div>
                    <label htmlFor="starting_price" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Starting Price / Package Price <span className="text-[#D6B875]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="starting_price"
                        name="starting_price"
                        value={formData.starting_price}
                        onChange={handleChange}
                        placeholder="e.g. ₹50,000 / day"
                        className={`w-full rounded-xl border bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none transition-colors ${
                          errors.starting_price ? "border-red-500" : "border-[#665038] focus:border-[#D6B875]"
                        }`}
                      />
                      <IndianRupee size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                    {errors.starting_price && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.starting_price}
                      </p>
                    )}
                  </div>

                  {/* Pricing Type */}
                  <div>
                    <label htmlFor="pricing_type" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Pricing Type
                    </label>
                    <select
                      id="pricing_type"
                      name="pricing_type"
                      value={formData.pricing_type}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none focus:border-[#D6B875]"
                    >
                      {PRICING_TYPES.map((pt) => (
                        <option key={pt} value={pt} className="bg-[#241321] text-[#F8F1E5]">
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <label htmlFor="service_areas" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Service Areas
                    </label>
                    <input
                      type="text"
                      id="service_areas"
                      name="service_areas"
                      value={formData.service_areas}
                      onChange={handleChange}
                      placeholder="e.g. Pan India, Rajasthan, Delhi NCR"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  {/* Business Experience */}
                  <div className="sm:col-span-1">
                    <label htmlFor="experience_years" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Experience (Years)
                    </label>
                    <input
                      type="number"
                      id="experience_years"
                      name="experience_years"
                      min={0}
                      value={formData.experience_years}
                      onChange={handleChange}
                      placeholder="e.g. 8"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  {/* Weddings Completed */}
                  <div className="sm:col-span-2">
                    <label htmlFor="weddings_completed" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Number of Weddings Completed (Optional)
                    </label>
                    <input
                      type="number"
                      id="weddings_completed"
                      name="weddings_completed"
                      min={0}
                      value={formData.weddings_completed}
                      onChange={handleChange}
                      placeholder="e.g. 150+"
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 4: PORTFOLIO & MEDIA UPLOADS */}
              {/* ========================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#665038] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D45] text-xs font-bold text-[#241321] shadow-md">
                    4
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Business Portfolio & Media
                    </h2>
                    <p className="text-xs text-[#C9BBAF]">
                      Showcase high-resolution photos and social profiles to impress couples
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Upload Logo */}
                  <div>
                    <span className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Upload Business Logo
                    </span>
                    <div className="rounded-2xl border-2 border-dashed border-[#665038] hover:border-[#D6B875] bg-[#241321]/70 p-4 text-center transition backdrop-blur-sm">
                      {logoPreview ? (
                        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-xl border border-[#D6B875] shadow-md">
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                            aria-label="Remove logo"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => logoInputRef.current?.click()}
                          className="flex cursor-pointer flex-col items-center justify-center py-6"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#321B30] text-[#D6B875] border border-[#665038]">
                            <Upload size={20} />
                          </div>
                          <p className="mt-2 text-xs font-bold text-[#F8F1E5]">
                            Click to upload Logo
                          </p>
                          <p className="text-[11px] text-[#C9BBAF]">
                            PNG, JPG or WEBP (Max 5MB)
                          </p>
                        </div>
                      )}
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Upload Cover Image */}
                  <div>
                    <span className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Upload Business Cover Image
                    </span>
                    <div className="rounded-2xl border-2 border-dashed border-[#665038] hover:border-[#D6B875] bg-[#241321]/70 p-4 text-center transition backdrop-blur-sm">
                      {coverPreview ? (
                        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-[#D6B875] shadow-md">
                          <Image
                            src={coverPreview}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeCover}
                            className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                            aria-label="Remove cover image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => coverInputRef.current?.click()}
                          className="flex cursor-pointer flex-col items-center justify-center py-6"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#321B30] text-[#D6B875] border border-[#665038]">
                            <ImageIcon size={20} />
                          </div>
                          <p className="mt-2 text-xs font-bold text-[#F8F1E5]">
                            Click to upload Cover Banner
                          </p>
                          <p className="text-[11px] text-[#C9BBAF]">
                            Landscape format recommended (Max 8MB)
                          </p>
                        </div>
                      )}
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Upload Portfolio Images (Multiple) */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#D6B875] uppercase tracking-wider">
                        Upload Portfolio Images (Multiple Images)
                      </span>
                      {portfolioPreviews.length > 0 && (
                        <span className="text-xs font-semibold text-[#D6B875]">
                          {portfolioPreviews.length} image{portfolioPreviews.length > 1 ? "s" : ""} selected
                        </span>
                      )}
                    </div>

                    <div className="rounded-2xl border-2 border-dashed border-[#665038] hover:border-[#D6B875] bg-[#241321]/70 p-5 text-center transition backdrop-blur-sm">
                      <div
                        onClick={() => portfolioInputRef.current?.click()}
                        className="cursor-pointer flex flex-col items-center justify-center py-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#321B30] text-[#D6B875] border border-[#665038]">
                          <Upload size={20} />
                        </div>
                        <p className="mt-2 text-sm font-bold text-[#F8F1E5]">
                          Click to select portfolio photos
                        </p>
                        <p className="text-xs text-[#C9BBAF]">
                          Select multiple images showing your wedding work (decorations, albums, bridal shoots)
                        </p>
                      </div>

                      <input
                        ref={portfolioInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePortfolioChange}
                        className="hidden"
                      />

                      {/* Preview Thumbnails Grid */}
                      {portfolioPreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 border-t border-[#665038] pt-4">
                          {portfolioPreviews.map((src, idx) => (
                            <div
                              key={idx}
                              className="group relative h-20 w-full overflow-hidden rounded-lg border border-[#D6B875] shadow-sm"
                            >
                              <Image
                                src={src}
                                alt={`Portfolio image ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePortfolioImage(idx);
                                }}
                                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                                aria-label="Delete image"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social Profile Links */}
                  <div>
                    <label htmlFor="instagram_url" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Instagram Profile Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="instagram_url"
                        name="instagram_url"
                        value={formData.instagram_url}
                        onChange={handleChange}
                        placeholder="https://instagram.com/yourhandle"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <svg className="absolute left-3.5 top-3 h-4 w-4 fill-current text-[#B08D45]" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="facebook_url" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Facebook Profile Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="facebook_url"
                        name="facebook_url"
                        value={formData.facebook_url}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourpage"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <svg className="absolute left-3.5 top-3 h-4 w-4 fill-current text-[#B08D45]" viewBox="0 0 24 24">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="youtube_url" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      YouTube Link (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="youtube_url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        placeholder="https://youtube.com/@yourchannel or video teaser link"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875] transition-colors"
                      />
                      <svg className="absolute left-3.5 top-3 h-4 w-4 fill-current text-[#B08D45]" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 5: ADDITIONAL DETAILS */}
              {/* ========================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#665038] pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B08D45] text-xs font-bold text-[#241321] shadow-md">
                    5
                  </span>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Additional Details & Availability
                    </h2>
                    <p className="text-xs text-[#C9BBAF]">
                      Working hours and response preferences for wedding couples
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Working Hours */}
                  <div>
                    <label htmlFor="working_hours" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Working Hours
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="working_hours"
                        name="working_hours"
                        value={formData.working_hours}
                        onChange={handleChange}
                        placeholder="e.g. 9:00 AM - 8:00 PM"
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 pl-10 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 shadow-sm outline-none focus:border-[#D6B875]"
                      />
                      <Clock size={16} className="absolute left-3.5 top-3 text-[#B08D45]" />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label htmlFor="availability" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Business Availability
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none focus:border-[#D6B875]"
                    >
                      <option value="All Days (Mon - Sun)" className="bg-[#241321] text-[#F8F1E5]">All Days (Mon - Sun)</option>
                      <option value="Monday - Saturday" className="bg-[#241321] text-[#F8F1E5]">Monday - Saturday</option>
                      <option value="Weekends Only" className="bg-[#241321] text-[#F8F1E5]">Weekends Only</option>
                      <option value="By Appointment Only" className="bg-[#241321] text-[#F8F1E5]">By Appointment Only</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label htmlFor="preferred_contact" className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferred_contact"
                      name="preferred_contact"
                      value={formData.preferred_contact}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-sm text-[#F8F1E5] shadow-sm outline-none focus:border-[#D6B875]"
                    >
                      <option value="Phone" className="bg-[#241321] text-[#F8F1E5]">Phone Call</option>
                      <option value="WhatsApp" className="bg-[#241321] text-[#F8F1E5]">WhatsApp</option>
                      <option value="Email" className="bg-[#241321] text-[#F8F1E5]">Email</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 6: TERMS & CONDITIONS CHECKBOX */}
              {/* ========================================================= */}
              <div className="rounded-2xl border border-[#665038] bg-[#241321] p-5 shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="terms_accepted"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-[#665038] bg-[#321B30] text-[#B08D45] focus:ring-[#D6B875] accent-[#B08D45]"
                  />
                  <div className="text-xs leading-relaxed text-[#F8F1E5]">
                    <span className="font-semibold text-[#D6B875]">
                      I agree to the Terms & Conditions and Privacy Policy of ShubhVivah. *
                    </span>
                    <p className="mt-0.5 text-[#C9BBAF]">
                      I verify that all information provided is accurate and represent genuine business operations. I understand that ShubhVivah may verify my identity and business credentials before publishing the listing.
                    </p>
                  </div>
                </label>
                {errors.terms_accepted && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.terms_accepted}
                  </p>
                )}
              </div>

              {/* ========================================================= */}
              {/* SUBMIT BUTTON */}
              {/* ========================================================= */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#B08D45] px-10 py-4 text-base font-bold text-[#241321] shadow-xl shadow-[#B08D45]/20 transition-all duration-200 hover:bg-[#D6B875] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#241321] border-t-transparent" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Store size={18} />
                      <span>Register Your Business</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="mt-3 text-xs text-[#C9BBAF]">
                  🔒 Your information is safely encrypted & stored. No upfront fees required to register.
                </p>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
