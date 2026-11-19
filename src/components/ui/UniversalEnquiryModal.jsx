"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { validateName, validatePhone, validateEmail, sanitizePhoneInput } from "@/lib/validations/formValidation";

export default function UniversalEnquiryModal({
  isOpen,
  onClose,
  target,
  targetType = "vendor", // "vendor" | "venue" | "caterer" | "photographer" | etc.
  source = "Wedding Marketplace",
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    guests: "250",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !target) return null;

  const handleBlur = (field, value, type) => {
    let error = "";
    if (type === "name") {
      const val = validateName(value);
      if (!val.isValid) error = val.error;
    } else if (type === "phone") {
      const val = validatePhone(value);
      if (!val.isValid) error = val.error;
    } else if (type === "email") {
      const val = validateEmail(value);
      if (!val.isValid) error = val.error;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameVal = validateName(formData.name);
    if (!nameVal.isValid) newErrors.name = nameVal.error;

    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.isValid) newErrors.phone = phoneVal.error;

    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) newErrors.email = emailVal.error;

    if (!formData.date) {
      newErrors.date = "Event date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameVal.value,
          phone: phoneVal.value,
          email: emailVal.value,
          date: formData.date,
          guests: formData.guests,
          message: formData.message,
          target_id: target.dbId || target.id || null,
          target_type: targetType,
          target_name: target.company || target.name || "Wedding Partner",
          service_or_product: target.service || target.categoryType || target.category || target.name || "Wedding Service",
          budget: target.priceDisplay || target.priceRange || target.pricing || "₹90,000",
          location: target.location || target.city || "India",
          source,
          is_booking: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrors({ general: data.message || "Failed to submit inquiry. Please try again." });
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: "", phone: "", email: "", date: "", guests: "250", message: "" });
      }, 2500);
    } catch (err) {
      setErrors({ general: err.message || "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#665038] bg-[#2A1325] p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#C9BBAF] hover:text-[#F8F1E5] transition-colors p-1 rounded-full hover:bg-white/5"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D6B875]">
            Verified Wedding Enquiry
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
            Enquire with {target.name || target.company}
          </h3>
          <p className="text-xs text-[#C9BBAF] mt-0.5">
            {target.location || target.city ? `${target.location || target.city} • ` : ""}
            Instant quote & direct availability request
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-2 animate-in fade-in duration-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-emerald-200">Enquiry Sent Successfully!</h4>
            <p className="text-xs text-emerald-300/80">
              The wedding partner has received your requirements and will reach out with customized pricing and details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0 text-rose-400" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                Your Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                onBlur={(e) => handleBlur("name", e.target.value, "name")}
                placeholder="e.g. Radhika Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors ${
                  errors.name ? "border-rose-500 focus:border-rose-400" : "border-[#B08D45]/30 focus:border-[#D6B875]"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.name}
                </p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                  Mobile Number (10 Digits) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: sanitizePhoneInput(e.target.value) });
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  onBlur={(e) => handleBlur("phone", e.target.value, "phone")}
                  placeholder="e.g. 9876543210"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors ${
                    errors.phone ? "border-rose-500 focus:border-rose-400" : "border-[#B08D45]/30 focus:border-[#D6B875]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  onBlur={(e) => handleBlur("email", e.target.value, "email")}
                  placeholder="name@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors ${
                    errors.email ? "border-rose-500 focus:border-rose-400" : "border-[#B08D45]/30 focus:border-[#D6B875]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                  Event / Wedding Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border text-xs text-[#F8F1E5] outline-none transition-colors ${
                    errors.date ? "border-rose-500 focus:border-rose-400" : "border-[#B08D45]/30 focus:border-[#D6B875]"
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                  Expected Guests
                </label>
                <input
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  placeholder="e.g. 250"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875] transition-colors"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-[#D6B875] mb-1">
                Message / Specific Requirements
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention timing, specific theme, special requirements..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875] transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#B08D45]/30 text-xs font-semibold text-[#F8F1E5]/80 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-xs font-bold text-[#1A0B18] hover:brightness-110 shadow-lg shadow-[#B08D45]/20 flex items-center gap-2 disabled:opacity-60 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Inquiry</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
