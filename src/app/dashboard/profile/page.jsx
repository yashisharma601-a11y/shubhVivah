"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  validateName,
  validatePhone,
  validateEmail,
  sanitizePhoneInput,
  sanitizeNameInput,
  VALIDATION_MESSAGES,
} from "@/lib/validations/formValidation";
import {
  User,
  Heart,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Smile,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Camera,
  Edit3,
  Trash2,
  Lock,
  Phone,
  Mail,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  LogOut,
  X,
  Save,
  Check,
  Globe,
  Award,
  Home,
  Sliders,
  Eye,
  EyeOff,
  Building,
} from "lucide-react";

// Dropdown options
const HEIGHT_OPTIONS = [
  "4'6\" (137 cm)", "4'7\" (140 cm)", "4'8\" (142 cm)", "4'9\" (145 cm)", "4'10\" (147 cm)",
  "4'11\" (150 cm)", "5'0\" (152 cm)", "5'1\" (155 cm)", "5'2\" (157 cm)", "5'3\" (160 cm)",
  "5'4\" (163 cm)", "5'5\" (165 cm)", "5'6\" (168 cm)", "5'7\" (170 cm)", "5'8\" (173 cm)",
  "5'9\" (175 cm)", "5'10\" (178 cm)", "5'11\" (180 cm)", "6'0\" (183 cm)", "6'1\" (185 cm)",
  "6'2\" (188 cm)", "6'3\" (190 cm)", "6'4\" (193 cm)", "6'5\" (195 cm)"
];

const MARITAL_STATUS_OPTIONS = [
  "Never Married", "Divorced", "Widowed", "Awaiting Divorce", "Annulled"
];

const RELIGION_OPTIONS = [
  "Hindu", "Jain", "Sikh", "Muslim", "Christian", "Buddhist", "Parsi", "Jewish", "Spiritual - Not Religious"
];

const MOTHER_TONGUE_OPTIONS = [
  "Hindi", "English", "Punjabi", "Bengali", "Gujarati", "Marathi", "Marwari", "Tamil",
  "Telugu", "Kannada", "Malayalam", "Odia", "Urdu", "Sindhi", "Bhojpuri", "Assamese"
];

const DIET_OPTIONS = [
  "Vegetarian", "Non-Vegetarian", "Eggetarian", "Jain", "Vegan", "Occasionally Non-Vegetarian"
];

const HABIT_OPTIONS = ["No", "Occasionally", "Yes"];

const FAMILY_TYPE_OPTIONS = ["Nuclear", "Joint"];
const FAMILY_STATUS_OPTIONS = ["Middle Class", "Upper Middle Class", "Affluent / Rich", "Royal / High Net Worth"];
const FAMILY_VALUES_OPTIONS = ["Traditional", "Moderate", "Liberal"];

const INCOME_OPTIONS = [
  "No Income / Student",
  "Under 3 Lakhs PA",
  "3 - 5 Lakhs PA",
  "5 - 7.5 Lakhs PA",
  "7.5 - 10 Lakhs PA",
  "10 - 15 Lakhs PA",
  "15 - 20 Lakhs PA",
  "20 - 30 Lakhs PA",
  "30 - 50 Lakhs PA",
  "50 - 75 Lakhs PA",
  "75 Lakhs - 1 Crore PA",
  "1 Crore+ PA"
];

const EDUCATION_OPTIONS = [
  "B.Tech / B.E. / Engineering",
  "MCA / BCA / Computers",
  "MBA / PGDM / Management",
  "MBBS / MD / MS / Medical",
  "B.Com / M.Com / Commerce",
  "CA / CS / CFA / ICWA",
  "B.A / M.A / Arts & Humanities",
  "B.Sc / M.Sc / Science",
  "LLB / LLM / Law",
  "B.Arch / M.Arch / Architecture",
  "B.Des / M.Des / Fashion / Design",
  "Ph.D / Doctorate",
  "Diploma / Higher Secondary"
];

const PROFESSION_OPTIONS = [
  "Software / IT / Tech Professional",
  "Civil Services / IAS / IPS / IRS",
  "Government / PSU Employee",
  "Doctor / Healthcare Professional",
  "Chartered Accountant / Finance",
  "Business Owner / Entrepreneur",
  "Corporate Executive / Manager",
  "Banking / Investment Professional",
  "Lawyer / Legal Professional",
  "Professor / Teacher / Academician",
  "Architect / Interior Designer",
  "Defense / Military / Police",
  "Merchant Navy / Aviation / Pilot",
  "Creative / Media / Entertainment",
  "Self Employed"
];

export default function MyProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);

  // Modal edit states
  const [editSection, setEditSection] = useState(null); // 'personal', 'education', 'family', 'lifestyle', 'preferences', 'contact'
  const [editFormData, setEditFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Photo upload
  const fileInputRef = useRef(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/dashboard/profile");
      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 401) {
          router.push("/login?redirect=/dashboard/profile&message=auth_required");
          return;
        }
        showToast(data.message || "Failed to load profile", "error");
        setLoading(false);
        return;
      }

      setProfile(data.profile);
      setLoading(false);
    } catch {
      showToast("Network error loading profile", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/dashboard/profile");
        const data = await res.json();
        if (!active) return;

        if (!res.ok || !data.success) {
          if (res.status === 401) {
            router.push("/login?redirect=/dashboard/profile&message=auth_required");
            return;
          }
          showToast(data.message || "Failed to load profile", "error");
          setLoading(false);
          return;
        }

        setProfile(data.profile);
        setLoading(false);
      } catch {
        if (active) {
          showToast("Network error loading profile", "error");
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  // Open Section Editor
  const openEditor = (section) => {
    setEditSection(section);
    setEditFormData({ ...(profile || {}) });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone" || name === "mobile") {
      value = sanitizePhoneInput(value);
    } else if (name === "first_name" || name === "last_name" || name === "name") {
      value = sanitizeNameInput(value);
    }
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Section Changes
  const handleSaveSection = async (e) => {
    e.preventDefault();

    // Validate fields if edited
    if (editFormData.name) {
      const v = validateName(editFormData.name);
      if (!v.isValid) {
        showToast(v.error, "error");
        return;
      }
    }
    if (editFormData.first_name) {
      const v = validateName(editFormData.first_name);
      if (!v.isValid) {
        showToast(v.error, "error");
        return;
      }
    }
    if (editFormData.last_name) {
      const v = validateName(editFormData.last_name);
      if (!v.isValid) {
        showToast(v.error, "error");
        return;
      }
    }
    if (editFormData.phone || editFormData.mobile) {
      const v = validatePhone(editFormData.phone || editFormData.mobile);
      if (!v.isValid) {
        showToast(v.error, "error");
        return;
      }
    }
    if (editFormData.email) {
      const v = validateEmail(editFormData.email);
      if (!v.isValid) {
        showToast(v.error, "error");
        return;
      }
    }

    setSaving(true);

    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();
      setSaving(false);

      if (data.success) {
        setProfile(data.profile);
        setEditSection(null);
        showToast("Profile section updated successfully!");
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch {
      setSaving(false);
      showToast("Network error. Please try again.", "error");
    }
  };

  // Photo Upload Handler
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
      showToast("Please select a JPG, PNG, or WebP image", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB", "error");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = () => setPreviewPhoto(reader.result);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append("photo", file);

    setPhotoUploading(true);
    try {
      const res = await fetch("/api/dashboard/profile/photo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPhotoUploading(false);

      if (data.success) {
        setProfile((prev) => ({
          ...prev,
          avatar_url: data.avatar_url,
          completion: {
            ...prev?.completion,
            total: Math.min(100, (prev?.completion?.total || 0) + (prev?.avatar_url ? 0 : 15)),
          },
        }));
        setPreviewPhoto(null);
        showToast("Profile photograph updated successfully!");
        fetchProfile();
      } else {
        showToast(data.message || "Photo upload failed", "error");
      }
    } catch {
      setPhotoUploading(false);
      showToast("Error uploading photograph", "error");
    }
  };

  // Remove Photo Handler
  const handleRemovePhoto = async () => {
    if (!window.confirm("Are you sure you want to remove your profile photograph?")) return;

    try {
      const res = await fetch("/api/dashboard/profile/photo", { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setProfile((prev) => ({ ...prev, avatar_url: "" }));
        showToast("Profile photograph removed.");
        fetchProfile();
      } else {
        showToast(data.message || "Failed to remove photo", "error");
      }
    } catch {
      showToast("Network error", "error");
    }
  };

  // Password Change Handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showToast("Please provide both current and new password", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      setPasswordLoading(false);

      if (data.success) {
        showToast("Password updated successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showToast(data.message || "Failed to change password", "error");
      }
    } catch {
      setPasswordLoading(false);
      showToast("Network error updating password", "error");
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  // Navigation Tabs Configuration
  const TABS = [
    { id: "overview", label: "Profile Overview", icon: User },
    { id: "personal", label: "Personal Information", icon: Smile },
    { id: "education", label: "Education & Career", icon: GraduationCap },
    { id: "family", label: "Family Details", icon: Users },
    { id: "lifestyle", label: "Lifestyle Details", icon: Heart },
    { id: "preferences", label: "Partner Preferences", icon: Sliders },
    { id: "contact", label: "Contact & Privacy", icon: Phone },
    { id: "settings", label: "Account Settings", icon: Lock },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-[#D6B875] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-[#D6B875]">Loading your matrimonial profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const completion = profile.completion || { total: 40, message: "" };

  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] pb-20 pt-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md border animate-in slide-in-from-top ${
            toast.type === "error"
              ? "bg-red-950/90 text-red-200 border-red-500/50"
              : "bg-emerald-950/90 text-emerald-200 border-emerald-500/50"
          }`}
        >
          {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Breadcrumb & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#665038]/40 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href={profile.user_type ? `/dashboard/${profile.user_type}` : "/"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B875] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <span className="text-[#665038]">•</span>
            <span className="text-xs text-[#C9BBAF]">Matrimonial Profile Center</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#B08D45]/20 text-[#D6B875] border border-[#B08D45]/40">
              ID: {profile.profile_id}
            </span>
            <button suppressHydrationWarning
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-[#C9BBAF] hover:text-rose-400 transition-colors"
              title="Logout from session"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* HERO PROFILE OVERVIEW CARD                                            */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#291426] via-[#241321] to-[#1A0B18] border border-[#B08D45]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B08D45]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8">
            {/* Profile Avatar with Upload Controls */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#FFE29A] via-[#D6B875] to-[#7A5B28] p-[3px] shadow-[0_0_25px_rgba(214,184,117,0.35)]">
                <div className="w-full h-full rounded-full bg-[#1F0E1D] overflow-hidden flex items-center justify-center relative">
                  {profile.avatar_url || previewPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewPhoto || profile.avatar_url}
                      alt={profile.name || "User Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#C9BBAF]">
                      <User size={48} className="text-[#D6B875]/70" />
                      <span className="text-[10px] mt-1 font-serif">Add Photo</span>
                    </div>
                  )}

                  {photoUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Upload Floating Button */}
              <button suppressHydrationWarning
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 rounded-full bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                title="Upload or Change Profile Photo"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handlePhotoSelect}
              />
            </div>

            {/* Profile Core Highlights */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5] tracking-tight">
                  {profile.name || "Registered Member"}
                </h1>

                {/* Verification Badge */}
                {profile.verification_status === "verified" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500">
                    <ShieldCheck size={13} />
                    <span>Verified Profile</span>
                  </span>
                ) : profile.verification_status === "verification_pending" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500">
                    <Clock size={13} />
                    <span>Verification Under Review</span>
                  </span>
                ) : profile.verification_status === "rejected" ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-500">
                    <AlertCircle size={13} />
                    <span>Verification Incomplete</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#321B30] text-[#C9BBAF] border border-[#665038]">
                    <AlertCircle size={13} />
                    <span>Unverified Profile</span>
                  </span>
                )}
              </div>

              {/* Vital Statistics Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-1.5 gap-x-3 text-xs text-[#C9BBAF]">
                <span>
                  <strong className="text-[#F8F1E5]">{profile.gender || "Gender not set"}</strong>
                </span>
                <span>•</span>
                <span>
                  <strong className="text-[#F8F1E5]">{profile.age ? `${profile.age} Yrs` : "Age not set"}</strong>
                  {profile.height ? `, ${profile.height}` : ""}
                </span>
                <span>•</span>
                <span>
                  <strong className="text-[#F8F1E5]">{profile.marital_status || "Never Married"}</strong>
                </span>
                <span>•</span>
                <span>
                  <strong className="text-[#F8F1E5]">{profile.religion || "Hindu"}</strong>
                  {profile.caste ? ` (${profile.caste})` : ""}
                </span>
                <span>•</span>
                <span>
                  <strong className="text-[#F8F1E5]">{profile.city || profile.current_location || "Location not set"}</strong>
                </span>
              </div>

              {/* Career & Education quick tag */}
              <div className="text-xs text-[#E8D9B5]">
                {profile.occupation || profile.profession || "Profession details pending"}
                {profile.company ? ` at ${profile.company}` : ""}
                {profile.highest_qualification ? ` • ${profile.highest_qualification}` : ""}
              </div>

              {/* Profile Photo Remove Link if photo exists */}
              {profile.avatar_url && (
                <div className="pt-1">
                  <button suppressHydrationWarning
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-[11px] text-rose-400 hover:text-rose-300 underline inline-flex items-center gap-1"
                  >
                    <Trash2 size={11} /> Remove Photograph
                  </button>
                </div>
              )}
            </div>

            {/* Profile Completion Dynamic Gauge */}
            <div className="w-full md:w-64 p-4 rounded-2xl bg-[#1A0B18]/80 border border-[#665038]/50 space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFE29A] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} /> Profile Strength
                </span>
                <span className="text-sm font-bold text-[#F8F1E5]">
                  {completion.total}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#321B30] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-[#FFE29A] transition-all duration-500"
                  style={{ width: `${completion.total}%` }}
                />
              </div>

              <p className="text-[11px] text-[#C9BBAF] leading-tight italic">
                {completion.message}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MAIN NAVIGATION & CONTENT LAYOUT                                      */}
        {/* --------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Navigation Tabs (Desktop & Mobile) */}
          <div className="lg:col-span-1 space-y-2">
            <div className="p-3 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-1">
              <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#D6B875]">
                Profile Sections
              </p>

              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button suppressHydrationWarning
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold shadow-md shadow-[#B08D45]/30 scale-[1.01]"
                        : "text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={isActive ? "text-[#1F0E1D]" : "text-[#D6B875]"} />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight size={14} className={isActive ? "text-[#1F0E1D]" : "text-[#665038]"} />
                  </button>
                );
              })}
            </div>

            {/* Quick Tips Box */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-[#321B30] to-[#241321] border border-[#665038]/40 text-xs space-y-2 shadow-lg">
              <h4 className="font-bold text-[#FFE29A] flex items-center gap-1.5">
                <ShieldCheck size={14} /> Trust & Verification
              </h4>
              <p className="text-[11px] text-[#C9BBAF] leading-relaxed">
                Profiles with genuine photos, verified mobile numbers, and complete partner preferences receive up to <strong>5x more responses</strong> on Shubvivah.
              </p>
            </div>
          </div>

          {/* Right Main Detail Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Highlights Card */}
                <div className="p-6 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#B08D45]/20 text-[#D6B875]">
                        <User size={18} />
                      </div>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#F8F1E5]">
                          Matrimonial Summary
                        </h2>
                        <p className="text-xs text-[#C9BBAF]">
                          Core identification details visible to verified matchmaking partners
                        </p>
                      </div>
                    </div>
                    <button suppressHydrationWarning
                      onClick={() => openEditor("personal")}
                      className="px-3.5 py-1.5 rounded-xl border border-[#B08D45] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit Personal</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <InfoBox label="Full Name" value={profile.name} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Matrimonial ID" value={profile.profile_id} isBadge />
                    <InfoBox label="Gender" value={profile.gender} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Date of Birth" value={profile.dob} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Age" value={profile.age ? `${profile.age} Years` : null} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Height" value={profile.height} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Marital Status" value={profile.marital_status} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Religion" value={profile.religion} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Caste / Community" value={profile.caste} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Mother Tongue" value={profile.mother_tongue} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Current City" value={profile.city || profile.current_location} onAdd={() => openEditor("personal")} />
                    <InfoBox label="Verification Status" value={profile.verification_status?.toUpperCase()} isBadge />
                  </div>
                </div>

                {/* Education & Career Preview */}
                <div className="p-6 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#B08D45]/20 text-[#D6B875]">
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#F8F1E5]">
                          Education & Career Preview
                        </h2>
                        <p className="text-xs text-[#C9BBAF]">Academic and employment credentials</p>
                      </div>
                    </div>
                    <button suppressHydrationWarning
                      onClick={() => openEditor("education")}
                      className="px-3.5 py-1.5 rounded-xl border border-[#B08D45] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit Career</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <InfoBox label="Highest Degree" value={profile.highest_qualification} onAdd={() => openEditor("education")} />
                    <InfoBox label="Occupation" value={profile.occupation} onAdd={() => openEditor("education")} />
                    <InfoBox label="Company / Employer" value={profile.company} onAdd={() => openEditor("education")} />
                    <InfoBox label="Annual Income" value={profile.annual_income} onAdd={() => openEditor("education")} />
                    <InfoBox label="Work Location" value={profile.work_location} onAdd={() => openEditor("education")} />
                    <InfoBox label="College / University" value={profile.college} onAdd={() => openEditor("education")} />
                  </div>
                </div>

                {/* Partner Preferences Preview */}
                <div className="p-6 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#B08D45]/20 text-[#D6B875]">
                        <Heart size={18} />
                      </div>
                      <div>
                        <h2 className="font-serif font-bold text-lg text-[#F8F1E5]">
                          Partner Preferences Overview
                        </h2>
                        <p className="text-xs text-[#C9BBAF]">Criteria used by Sathi & Matchmaking Concierge</p>
                      </div>
                    </div>
                    <button suppressHydrationWarning
                      onClick={() => openEditor("preferences")}
                      className="px-3.5 py-1.5 rounded-xl border border-[#B08D45] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit Preferences</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <InfoBox
                      label="Preferred Age"
                      value={profile.pref_age_min ? `${profile.pref_age_min} to ${profile.pref_age_max || "35"} Yrs` : null}
                      onAdd={() => openEditor("preferences")}
                    />
                    <InfoBox label="Preferred Marital Status" value={profile.pref_marital_status} onAdd={() => openEditor("preferences")} />
                    <InfoBox label="Preferred Religion" value={profile.pref_religion} onAdd={() => openEditor("preferences")} />
                    <InfoBox label="Preferred Education" value={profile.pref_education} onAdd={() => openEditor("preferences")} />
                    <InfoBox label="Preferred Income" value={profile.pref_income} onAdd={() => openEditor("preferences")} />
                    <InfoBox label="Preferred Location" value={profile.pref_location} onAdd={() => openEditor("preferences")} />
                  </div>
                </div>
              </div>
            )}

            {/* 2. PERSONAL INFORMATION TAB */}
            {activeTab === "personal" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Personal Information</h2>
                    <p className="text-xs text-[#C9BBAF]">Basic identification, biological details, and roots</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("personal")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Personal Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <InfoBox label="Full Name" value={profile.name} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Gender" value={profile.gender} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Date of Birth" value={profile.dob} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Calculated Age" value={profile.age ? `${profile.age} Years Old` : null} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Height" value={profile.height} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Weight" value={profile.weight} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Marital Status" value={profile.marital_status} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Mother Tongue" value={profile.mother_tongue} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Religion" value={profile.religion} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Caste / Community" value={profile.caste} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Sub Caste / Gothra" value={profile.sub_caste} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Nationality" value={profile.nationality || "Indian"} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Current Location" value={profile.city || profile.current_location} onAdd={() => openEditor("personal")} />
                  <InfoBox label="Native Place" value={profile.native_place} onAdd={() => openEditor("personal")} />
                </div>
              </div>
            )}

            {/* 3. EDUCATION & CAREER TAB */}
            {activeTab === "education" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Education & Career</h2>
                    <p className="text-xs text-[#C9BBAF]">Academic degrees, occupation, company, and annual income</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("education")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Education & Career</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <InfoBox label="Highest Qualification" value={profile.highest_qualification} onAdd={() => openEditor("education")} />
                  <InfoBox label="Degree / Course Details" value={profile.education_details} onAdd={() => openEditor("education")} />
                  <InfoBox label="College / University" value={profile.college} onAdd={() => openEditor("education")} />
                  <InfoBox label="Profession / Sector" value={profile.profession} onAdd={() => openEditor("education")} />
                  <InfoBox label="Job Title / Occupation" value={profile.occupation} onAdd={() => openEditor("education")} />
                  <InfoBox label="Organization / Employer" value={profile.company} onAdd={() => openEditor("education")} />
                  <InfoBox label="Annual Income" value={profile.annual_income} onAdd={() => openEditor("education")} />
                  <InfoBox label="Work Location" value={profile.work_location} onAdd={() => openEditor("education")} />
                </div>
              </div>
            )}

            {/* 4. FAMILY DETAILS TAB */}
            {activeTab === "family" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Family Background</h2>
                    <p className="text-xs text-[#C9BBAF]">Parents, siblings, family status and traditional values</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("family")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Family Details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <InfoBox label="Father's Name" value={profile.father_name} onAdd={() => openEditor("family")} />
                  <InfoBox label="Father's Occupation" value={profile.father_occupation} onAdd={() => openEditor("family")} />
                  <InfoBox label="Mother's Name" value={profile.mother_name} onAdd={() => openEditor("family")} />
                  <InfoBox label="Mother's Occupation" value={profile.mother_occupation} onAdd={() => openEditor("family")} />
                  <InfoBox label="Number of Brothers" value={profile.brothers_count} onAdd={() => openEditor("family")} />
                  <InfoBox label="Number of Sisters" value={profile.sisters_count} onAdd={() => openEditor("family")} />
                  <InfoBox label="Family Type" value={profile.family_type} onAdd={() => openEditor("family")} />
                  <InfoBox label="Family Status" value={profile.family_status} onAdd={() => openEditor("family")} />
                  <InfoBox label="Family Values" value={profile.family_values} onAdd={() => openEditor("family")} />
                  <InfoBox label="Family Native Place" value={profile.family_native_place} onAdd={() => openEditor("family")} />
                </div>

                {profile.family_about && (
                  <div className="pt-4 border-t border-[#665038]/40 space-y-1">
                    <p className="text-xs font-semibold text-[#D6B875]">About Family & Heritage</p>
                    <p className="text-xs text-[#F8F1E5] leading-relaxed bg-[#1A0B18] p-4 rounded-2xl border border-[#665038]/30">
                      {profile.family_about}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 5. LIFESTYLE TAB */}
            {activeTab === "lifestyle" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Lifestyle & Habits</h2>
                    <p className="text-xs text-[#C9BBAF]">Dietary preferences, personal habits, interests and languages</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("lifestyle")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Lifestyle</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <InfoBox label="Dietary Preference" value={profile.diet} onAdd={() => openEditor("lifestyle")} />
                  <InfoBox label="Smoking Habit" value={profile.smoking} onAdd={() => openEditor("lifestyle")} />
                  <InfoBox label="Drinking Habit" value={profile.drinking} onAdd={() => openEditor("lifestyle")} />
                  <InfoBox label="Languages Known" value={profile.languages_known} onAdd={() => openEditor("lifestyle")} />
                  <InfoBox label="Hobbies & Interests" value={profile.hobbies} onAdd={() => openEditor("lifestyle")} />
                </div>
              </div>
            )}

            {/* 6. PARTNER PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Partner Preferences</h2>
                    <p className="text-xs text-[#C9BBAF]">Define what you seek in an ideal life companion</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("preferences")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Preferences</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <InfoBox
                    label="Preferred Age Range"
                    value={profile.pref_age_min ? `${profile.pref_age_min} to ${profile.pref_age_max || "35"} Years` : null}
                    onAdd={() => openEditor("preferences")}
                  />
                  <InfoBox label="Preferred Height" value={profile.pref_height} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Marital Status" value={profile.pref_marital_status} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Religion" value={profile.pref_religion} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Community / Caste" value={profile.pref_caste} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Education Level" value={profile.pref_education} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Profession / Sector" value={profile.pref_profession} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred Annual Income" value={profile.pref_income} onAdd={() => openEditor("preferences")} />
                  <InfoBox label="Preferred City / Location" value={profile.pref_location} onAdd={() => openEditor("preferences")} />
                </div>

                {profile.pref_notes && (
                  <div className="pt-4 border-t border-[#665038]/40 space-y-1">
                    <p className="text-xs font-semibold text-[#D6B875]">Expectations in Partner</p>
                    <p className="text-xs text-[#F8F1E5] leading-relaxed bg-[#1A0B18] p-4 rounded-2xl border border-[#665038]/30">
                      {profile.pref_notes}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 7. CONTACT & PRIVACY TAB */}
            {activeTab === "contact" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Contact & Privacy Controls</h2>
                    <p className="text-xs text-[#C9BBAF]">Manage who can view your phone number and private contact info</p>
                  </div>
                  <button suppressHydrationWarning
                    onClick={() => openEditor("contact")}
                    className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] hover:bg-[#D6B875] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Edit3 size={14} />
                    <span>Edit Privacy Rules</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-4 rounded-2xl bg-[#1A0B18] border border-[#665038]/40 space-y-1">
                    <p className="text-[11px] text-[#D6B875] font-semibold">Registered Mobile Number</p>
                    <p className="text-sm font-bold text-[#F8F1E5] flex items-center gap-2">
                      <Phone size={15} className="text-emerald-400" />
                      <span>+91 {profile.phone || "Not set"}</span>
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Primary mobile verified
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1A0B18] border border-[#665038]/40 space-y-1">
                    <p className="text-[11px] text-[#D6B875] font-semibold">Registered Email Address</p>
                    <p className="text-sm font-bold text-[#F8F1E5] flex items-center gap-2">
                      <Mail size={15} className="text-emerald-400" />
                      <span>{profile.email || "Not set"}</span>
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Primary email verified
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#321B30] to-[#241321] border border-[#665038]/40 space-y-3">
                  <h4 className="font-bold text-sm text-[#FFE29A] flex items-center gap-2">
                    <ShieldCheck size={16} /> Contact Number Visibility Policy
                  </h4>
                  <p className="text-xs text-[#C9BBAF]">
                    Currently: <strong className="text-[#F8F1E5]">{profile.privacy_phone || "Only Verified Members"}</strong>
                  </p>
                  <p className="text-[11px] text-[#C9BBAF] leading-relaxed">
                    By default, your mobile number and contact coordinates are masked from unverified visitors and public search crawlers. Only authenticated members with active verification status can request your contact info.
                  </p>
                </div>
              </div>
            )}

            {/* 8. ACCOUNT SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Change Password Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#241321] border border-[#665038]/50 shadow-xl space-y-5">
                  <div className="border-b border-[#665038]/40 pb-4">
                    <h2 className="font-serif font-bold text-xl text-[#F8F1E5]">Security & Password</h2>
                    <p className="text-xs text-[#C9BBAF]">Ensure your account remains safe and protected</p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-semibold text-[#D6B875] uppercase mb-1.5">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPw ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                          }
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                          placeholder="Enter your existing password"
                        />
                        <button suppressHydrationWarning
                          type="button"
                          onClick={() => setShowCurrentPw(!showCurrentPw)}
                          className="absolute right-3 top-2.5 text-[#C9BBAF] hover:text-[#F8F1E5]"
                        >
                          {showCurrentPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D6B875] uppercase mb-1.5">
                        New Password (Min 6 Characters) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPw ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                          }
                          required
                          minLength={6}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                          placeholder="Create strong new password"
                        />
                        <button suppressHydrationWarning
                          type="button"
                          onClick={() => setShowNewPw(!showNewPw)}
                          className="absolute right-3 top-2.5 text-[#C9BBAF] hover:text-[#F8F1E5]"
                        >
                          {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D6B875] uppercase mb-1.5">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        placeholder="Re-enter new password"
                      />
                    </div>

                    <button suppressHydrationWarning
                      type="submit"
                      disabled={passwordLoading}
                      className="px-6 py-2.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] font-bold text-xs hover:bg-[#D6B875] transition-all disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      {passwordLoading ? "Updating Password..." : "Save New Password"}
                    </button>
                  </form>
                </div>

                {/* Account Actions */}
                <div className="p-6 rounded-3xl bg-[#241321] border border-rose-900/40 shadow-xl space-y-4">
                  <h3 className="font-serif font-bold text-base text-rose-300">
                    Account Deactivation & Pause
                  </h3>
                  <p className="text-xs text-[#C9BBAF] leading-relaxed">
                    Temporarily hide your profile from search results if you have found your life partner or want to take a break from matchmaking.
                  </p>
                  <button suppressHydrationWarning
                    onClick={() => {
                      if (window.confirm("Do you want to submit a profile deactivation request to the Shubvivah relationship team?")) {
                        showToast("Deactivation request submitted. Our support team will confirm with you.");
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-rose-500/50 text-rose-400 hover:bg-rose-950/60 text-xs font-bold transition-all cursor-pointer"
                  >
                    Request Profile Deactivation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION EDIT MODAL POPUP                                              */}
      {/* --------------------------------------------------------------------- */}
      {editSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#241321] border border-[#B08D45]/70 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#665038]/50 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#FFE29A]">
                  Edit {editSection.charAt(0).toUpperCase() + editSection.slice(1)} Details
                </h3>
                <p className="text-xs text-[#C9BBAF]">Update your verified matrimonial records</p>
              </div>
              <button suppressHydrationWarning
                onClick={() => setEditSection(null)}
                className="p-1.5 rounded-lg text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4">
              {/* EDIT PERSONAL */}
              {editSection === "personal" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Gender *</label>
                    <select
                      name="gender"
                      value={editFormData.gender || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male (Groom)</option>
                      <option value="Female">Female (Bride)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Date of Birth (DOB) *</label>
                    <input
                      type="date"
                      name="dob"
                      value={editFormData.dob || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Height *</label>
                    <select
                      name="height"
                      value={editFormData.height || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Height</option>
                      {HEIGHT_OPTIONS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Weight (optional)</label>
                    <input
                      type="text"
                      name="weight"
                      value={editFormData.weight || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 65 kg"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Marital Status *</label>
                    <select
                      name="marital_status"
                      value={editFormData.marital_status || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Marital Status</option>
                      {MARITAL_STATUS_OPTIONS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Religion *</label>
                    <select
                      name="religion"
                      value={editFormData.religion || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Religion</option>
                      {RELIGION_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Caste / Community</label>
                    <input
                      type="text"
                      name="caste"
                      value={editFormData.caste || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajput, Brahmin, Agarwal"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Mother Tongue</label>
                    <select
                      name="mother_tongue"
                      value={editFormData.mother_tongue || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Mother Tongue</option>
                      {MOTHER_TONGUE_OPTIONS.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Current City / Location *</label>
                    <input
                      type="text"
                      name="city"
                      value={editFormData.city || editFormData.current_location || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Jaipur, Delhi NCR, Mumbai"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Native Place / Hometown</label>
                    <input
                      type="text"
                      name="native_place"
                      value={editFormData.native_place || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Udaipur, Rajasthan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              )}

              {/* EDIT EDUCATION & CAREER */}
              {editSection === "education" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Highest Qualification *</label>
                    <select
                      name="highest_qualification"
                      value={editFormData.highest_qualification || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Qualification</option>
                      {EDUCATION_OPTIONS.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Degree Details</label>
                    <input
                      type="text"
                      name="education_details"
                      value={editFormData.education_details || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">College / University</label>
                    <input
                      type="text"
                      name="college"
                      value={editFormData.college || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. IIT Delhi, BITS, DU"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Profession / Sector *</label>
                    <select
                      name="profession"
                      value={editFormData.profession || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Sector</option>
                      {PROFESSION_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Job Title / Occupation *</label>
                    <input
                      type="text"
                      name="occupation"
                      value={editFormData.occupation || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      value={editFormData.company || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Microsoft, Infosys, Deloitte"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Annual Income *</label>
                    <select
                      name="annual_income"
                      value={editFormData.annual_income || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Annual Income</option>
                      {INCOME_OPTIONS.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Work Location City</label>
                    <input
                      type="text"
                      name="work_location"
                      value={editFormData.work_location || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              )}

              {/* EDIT FAMILY */}
              {editSection === "family" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Father&apos;s Name</label>
                    <input
                      type="text"
                      name="father_name"
                      value={editFormData.father_name || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Shri Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Father&apos;s Occupation</label>
                    <input
                      type="text"
                      name="father_occupation"
                      value={editFormData.father_occupation || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Businessman, Retired Govt Officer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Mother&apos;s Name</label>
                    <input
                      type="text"
                      name="mother_name"
                      value={editFormData.mother_name || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Smt. Sunita Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Mother&apos;s Occupation</label>
                    <input
                      type="text"
                      name="mother_occupation"
                      value={editFormData.mother_occupation || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Homemaker, Professor, Teacher"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Family Type</label>
                    <select
                      name="family_type"
                      value={editFormData.family_type || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Family Type</option>
                      {FAMILY_TYPE_OPTIONS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Family Status</label>
                    <select
                      name="family_status"
                      value={editFormData.family_status || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Status</option>
                      {FAMILY_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Family Values</label>
                    <select
                      name="family_values"
                      value={editFormData.family_values || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Values</option>
                      {FAMILY_VALUES_OPTIONS.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Brothers Count</label>
                    <input
                      type="text"
                      name="brothers_count"
                      value={editFormData.brothers_count || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 1 Brother (Married)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Sisters Count</label>
                    <input
                      type="text"
                      name="sisters_count"
                      value={editFormData.sisters_count || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. None / 1 Younger Sister"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Family Native Place</label>
                    <input
                      type="text"
                      name="family_native_place"
                      value={editFormData.family_native_place || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Jodhpur, Rajasthan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#D6B875] font-semibold mb-1">About Family & Cultural Background</label>
                    <textarea
                      name="family_about"
                      rows={3}
                      value={editFormData.family_about || ""}
                      onChange={handleInputChange}
                      placeholder="Brief note about your family heritage, traditions, and values..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              )}

              {/* EDIT LIFESTYLE */}
              {editSection === "lifestyle" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Dietary Preference *</label>
                    <select
                      name="diet"
                      value={editFormData.diet || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select Diet</option>
                      {DIET_OPTIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Smoking Habit</label>
                    <select
                      name="smoking"
                      value={editFormData.smoking || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select</option>
                      {HABIT_OPTIONS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Drinking Habit</label>
                    <select
                      name="drinking"
                      value={editFormData.drinking || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Select</option>
                      {HABIT_OPTIONS.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Languages Known</label>
                    <input
                      type="text"
                      name="languages_known"
                      value={editFormData.languages_known || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Hindi, English, Marwari"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#D6B875] font-semibold mb-1">Hobbies & Personal Interests</label>
                    <input
                      type="text"
                      name="hobbies"
                      value={editFormData.hobbies || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Traveling, Reading, Music, Cooking, Yoga"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              )}

              {/* EDIT PREFERENCES */}
              {editSection === "preferences" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Min Preferred Age</label>
                    <input
                      type="number"
                      name="pref_age_min"
                      min={18}
                      max={70}
                      value={editFormData.pref_age_min || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 23"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Max Preferred Age</label>
                    <input
                      type="number"
                      name="pref_age_max"
                      min={18}
                      max={70}
                      value={editFormData.pref_age_max || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 29"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Marital Status</label>
                    <select
                      name="pref_marital_status"
                      value={editFormData.pref_marital_status || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Any Marital Status</option>
                      {MARITAL_STATUS_OPTIONS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Religion</label>
                    <select
                      name="pref_religion"
                      value={editFormData.pref_religion || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="">Any Religion</option>
                      {RELIGION_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Community / Caste</label>
                    <input
                      type="text"
                      name="pref_caste"
                      value={editFormData.pref_caste || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajput, Brahmin, Any Caste"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Education</label>
                    <input
                      type="text"
                      name="pref_education"
                      value={editFormData.pref_education || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Graduate or Above, Post Graduate"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Profession</label>
                    <input
                      type="text"
                      name="pref_profession"
                      value={editFormData.pref_profession || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Working Professional, IT, Govt, Business"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">Preferred Location</label>
                    <input
                      type="text"
                      name="pref_location"
                      value={editFormData.pref_location || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajasthan, Delhi NCR, Anywhere in India"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#D6B875] font-semibold mb-1">Other Expectations</label>
                    <textarea
                      name="pref_notes"
                      rows={3}
                      value={editFormData.pref_notes || ""}
                      onChange={handleInputChange}
                      placeholder="Mention any specific personal expectations, family outlook, or preferences..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>
                </div>
              )}

              {/* EDIT CONTACT & PRIVACY */}
              {editSection === "contact" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">
                      Who Can View Your Phone Number?
                    </label>
                    <select
                      name="privacy_phone"
                      value={editFormData.privacy_phone || "Only Verified Members"}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="Only Verified Members">Only Verified Members</option>
                      <option value="Only Members I Accept Interest From">Only Members I Accept Interest From</option>
                      <option value="All Logged-in Members">All Logged-in Members</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#D6B875] font-semibold mb-1">
                      Profile Photograph Visibility
                    </label>
                    <select
                      name="privacy_photo"
                      value={editFormData.privacy_photo || "Visible to All Members"}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    >
                      <option value="Visible to All Members">Visible to All Logged-in Members</option>
                      <option value="Visible to Verified Members Only">Visible to Verified Members Only</option>
                      <option value="Visible on Request">Visible on Request Only</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#665038]/50">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setEditSection(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#321B30] transition-colors"
                >
                  Cancel
                </button>
                <button suppressHydrationWarning
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>{saving ? "Saving Changes..." : "Save Details"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Empty / Present Field Info Component
function InfoBox({ label, value, onAdd, isBadge = false }) {
  const isPresent = Boolean(value && String(value).trim() && String(value).trim() !== "Not set");

  return (
    <div className="p-3.5 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-1">
      <p className="text-[11px] text-[#C9BBAF] font-medium">{label}</p>
      {isPresent ? (
        isBadge ? (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#B08D45]/20 text-[#FFE29A] border border-[#B08D45]/40">
            {value}
          </span>
        ) : (
          <p className="text-xs font-semibold text-[#F8F1E5] break-words">{value}</p>
        )
      ) : (
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] text-[#7A5B28] italic">Not Added</span>
          {onAdd && (
            <button suppressHydrationWarning
              type="button"
              onClick={onAdd}
              className="text-[11px] font-bold text-[#D6B875] hover:text-white underline cursor-pointer"
            >
              + Add
            </button>
          )}
        </div>
      )}
    </div>
  );
}
