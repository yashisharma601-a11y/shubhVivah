"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Heart,
  Store,
  Briefcase,
  Layers,
  CalendarCheck,
  MessageSquare,
  IndianRupee,
  Star,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  LogOut,
  Download,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Ban,
  Check,
  X,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";

export default function SuperAdminPage() {
  const router = useRouter();

  // Authentication State
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [unauthorizedUser, setUnauthorizedUser] = useState(null); // non-admin logged-in user

  // Admin Login Form State (Used when not logged in as admin)
  const [adminIdentifier, setAdminIdentifier] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState("overview");
  const [adminData, setAdminData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Filters & Search
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userStatusFilter, setUserStatusFilter] = useState("all");

  const [listingSearch, setListingSearch] = useState("");
  const [listingTypeFilter, setListingTypeFilter] = useState("all");
  const [listingStatusFilter, setListingStatusFilter] = useState("all");

  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("all");
  const [enquirySourceFilter, setEnquirySourceFilter] = useState("all");

  // Modals state
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [rejectRemarksModal, setRejectRemarksModal] = useState(null);
  const [remarksText, setRemarksText] = useState("");
  const [replyEnquiryModal, setReplyEnquiryModal] = useState(null);

  // 1. Check existing session on load
  const checkAdminAuth = async () => {
    try {
      setAuthLoading(true);
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.authenticated && data.user) {
        if (data.user.user_type === "admin") {
          setCurrentUser(data.user);
          setUnauthorizedUser(null);
          await fetchAdminData();
        } else {
          // A couple, vendor, or seller is trying to view /admin
          setUnauthorizedUser(data.user);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        setUnauthorizedUser(null);
      }
    } catch {
      setCurrentUser(null);
      setUnauthorizedUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  // 2. Fetch full platform data for Super Admin
  const fetchAdminData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin");
      if (res.status === 401 || res.status === 403) {
        setCurrentUser(null);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setAdminData(data);
      } else {
        showFeedback(data.message || "Failed to load admin data", "error");
      }
    } catch (err) {
      showFeedback("Network error loading admin data", "error");
    } finally {
      setRefreshing(false);
    }
  };

  // 3. Handle Separate Admin Login Submission
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    if (!adminIdentifier.trim()) {
      setLoginError("Please enter your Super Admin Email or Username.");
      return;
    }
    if (!adminPassword) {
      setLoginError("Please enter your Super Admin Password.");
      return;
    }

    try {
      setLoginLoading(true);
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: adminIdentifier.trim(),
          password: adminPassword,
          remember_me: rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoginError(data.message || "Invalid administrator credentials. Access denied.");
        setLoginLoading(false);
        return;
      }

      setLoginSuccess("Admin identity verified. Launching Super Admin Dashboard...");
      setCurrentUser(data.user);
      setUnauthorizedUser(null);
      setAdminIdentifier("");
      setAdminPassword("");

      // Load data immediately
      await fetchAdminData();
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // 4. Handle Super Admin Logout
  const handleAdminLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      setAdminData(null);
      setUnauthorizedUser(null);
      setLoginSuccess("");
      setLoginError("");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // Toast feedback helper
  const showFeedback = (text, type = "success") => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // 5. Execute Admin Action (Status updates, deletions, etc.)
  const executeAdminAction = async (payload) => {
    try {
      setActionLoading(true);
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showFeedback(data.message || "Action updated successfully");
        fetchAdminData();
        return true;
      } else {
        showFeedback(data.message || "Action failed", "error");
        return false;
      }
    } catch {
      showFeedback("Error executing admin action", "error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  // CSV Exporters
  const exportUsersCSV = () => {
    if (!adminData?.users) return;
    const headers = ["User ID,Name,Email,Phone,Role,Status,City,Created At\n"];
    const rows = adminData.users.map((u) =>
      `"${u.id}","${u.name || ""}","${u.email}","${u.phone || ""}","${u.user_type}","${u.status || "active"}","${u.city || ""}","${u.created_at || ""}"`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shubhvivah_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTransactionsCSV = () => {
    if (!adminData?.transactions) return;
    const headers = ["Transaction ID,Type,Payer,Payee,Item,Amount,Status,Payment Method,Date\n"];
    const rows = adminData.transactions.map((t) =>
      `"${t.id}","${t.type}","${t.payer}","${t.payee}","${t.item}","${t.amount}","${t.payment_status}","${t.payment_method}","${t.date}"`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shubhvivah_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    if (!adminData?.users) return [];
    return adminData.users.filter((u) => {
      const matchSearch =
        u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.phone?.includes(userSearch) ||
        u.business_name?.toLowerCase().includes(userSearch.toLowerCase());
      const matchRole = userRoleFilter === "all" || u.user_type === userRoleFilter;
      const matchStatus = userStatusFilter === "all" || (u.status || "active") === userStatusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [adminData?.users, userSearch, userRoleFilter, userStatusFilter]);

  // Combined Listings List (Services + Products)
  const allListings = useMemo(() => {
    if (!adminData) return [];
    const services = (adminData.services || []).map((s) => ({
      ...s,
      listing_type: "service",
      owner_name: s.vendor_name || `Vendor #${s.vendor_id}`,
    }));
    const products = (adminData.products || []).map((p) => ({
      ...p,
      listing_type: "product",
      owner_name: p.seller_name || `Seller #${p.seller_id}`,
    }));
    return [...services, ...products];
  }, [adminData]);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return allListings.filter((item) => {
      const matchSearch =
        item.name?.toLowerCase().includes(listingSearch.toLowerCase()) ||
        item.category?.toLowerCase().includes(listingSearch.toLowerCase()) ||
        item.owner_name?.toLowerCase().includes(listingSearch.toLowerCase());
      const matchType = listingTypeFilter === "all" || item.listing_type === listingTypeFilter;
      const matchStatus = listingStatusFilter === "all" || (item.status || "active") === listingStatusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [allListings, listingSearch, listingTypeFilter, listingStatusFilter]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    if (!adminData?.bookings) return [];
    return adminData.bookings.filter((b) => {
      if (bookingStatusFilter === "all") return true;
      return (b.booking_status || "").toLowerCase() === bookingStatusFilter.toLowerCase();
    });
  }, [adminData?.bookings, bookingStatusFilter]);

  // Filtered Enquiries (Combines Direct, Contact Us, and Sathi AI Chatbot Inquiries)
  const combinedEnquiries = useMemo(() => {
    if (!adminData) return [];
    const direct = (adminData.enquiries || []).map((e) => ({ ...e, source: e.source || "Direct Enquiry" }));
    const contact = (adminData.contactInquiries || []).map((c) => ({
      ...c,
      couple_name: c.bride_name ? `${c.bride_name} & ${c.groom_name}` : c.business_name || c.full_name || c.name || "Guest User",
      couple_email: c.email || c.email_address,
      couple_phone: c.phone || c.mobile_number,
      message: c.message || c.query || c.additional_requirements || c.business_description || "Website Inquiry Form Submission",
      source: c.source || "Contact Us Form",
    }));
    const chatbot = (adminData.chatbotInquiries || []).map((b) => ({
      ...b,
      couple_name: b.full_name || b.name || "Matrimonial Lead",
      couple_email: b.email,
      couple_phone: b.mobile_number || b.phone,
      message: b.query || b.message,
      source: "Sathi AI Chatbot",
    }));

    const all = [...chatbot, ...contact, ...direct];
    const seen = new Set();
    const unique = [];
    for (const item of all) {
      const key = `${item.source}-${item.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }, [adminData]);

  const filteredEnquiries = useMemo(() => {
    return combinedEnquiries.filter((e) => {
      const matchStatus =
        enquiryStatusFilter === "all" ||
        (e.status || "New").toLowerCase() === enquiryStatusFilter.toLowerCase();
      const matchSource =
        enquirySourceFilter === "all" ||
        (e.source || "").toLowerCase() === enquirySourceFilter.toLowerCase();
      return matchStatus && matchSource;
    });
  }, [combinedEnquiries, enquiryStatusFilter, enquirySourceFilter]);

  // Loading spinner during initial auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#1A0B18] flex items-center justify-center text-[#D6B875]">
        <div className="text-center space-y-3">
          <Sparkles className="animate-spin mx-auto text-[#D6B875]" size={36} />
          <h2 className="text-xl font-serif font-bold text-[#F8F1E5]">Verifying Administrator Security</h2>
          <p className="text-xs text-[#C9BBAF]">Validating session credentials and role clearance...</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO 1: ACCESS DENIED (User is logged in as Couple, Vendor, or Seller)
  // ---------------------------------------------------------------------------
  if (unauthorizedUser && !currentUser) {
    return (
      <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-red-500/50 bg-[#2A1325] p-8 text-center shadow-2xl space-y-5">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400">
            <ShieldAlert size={36} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800 px-3 py-1 rounded-full">
              Access Restricted
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#F8F1E5] mt-3">
              Super Admin Access Only
            </h2>
            <p className="text-xs text-[#C9BBAF] mt-2 leading-relaxed">
              You are currently logged in as a{" "}
              <span className="font-bold text-[#D6B875] uppercase">{unauthorizedUser.user_type}</span>{" "}
              ({unauthorizedUser.email}). This admin portal is strictly reserved for ShubhVivah Super Administrators.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href={`/dashboard/${unauthorizedUser.user_type}`}
              className="block w-full py-2.5 px-4 rounded-xl bg-[#B08D45] text-[#1F0E1D] font-bold text-xs hover:bg-[#D6B875] transition-colors"
            >
              Go to My {unauthorizedUser.user_type.toUpperCase()} Dashboard
            </Link>
            <button suppressHydrationWarning
              onClick={handleAdminLogout}
              className="block w-full py-2.5 px-4 rounded-xl border border-[#665038] text-xs text-[#C9BBAF] hover:text-white hover:bg-[#321B30] transition-colors cursor-pointer"
            >
              Logout & Sign In as Admin
            </button>
            <Link
              href="/"
              className="inline-block text-xs text-[#D6B875] hover:underline pt-1"
            >
              Back to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO 2: DEDICATED SUPER ADMIN LOGIN PAGE (Not logged in)
  // ---------------------------------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#1A0B18] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Back to Site Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#D6B875] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to ShubhVivah Website
          </Link>

          {/* Admin Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B08D45]/15 border border-[#B08D45]/40 text-[#D6B875] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck size={13} /> Restricted Access • Super Admin
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F8F1E5]">
              Shubh<span className="text-[#D6B875]">Vivah</span> Admin
            </h1>
            <p className="text-xs text-[#C9BBAF]">
              Enter authorized administrator credentials to access the centralized management console.
            </p>
          </div>

          {/* Admin Login Card */}
          <div className="rounded-3xl border border-[#665038]/70 bg-[#241321]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
            {/* Feedback Alerts */}
            {loginSuccess && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{loginSuccess}</span>
              </div>
            )}

            {loginError && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
                <AlertTriangle size={16} className="text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Admin Email / Username *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Mail size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={adminIdentifier}
                    onChange={(e) => setAdminIdentifier(e.target.value)}
                    placeholder="admin@shubhvivah.com"
                    className="w-full rounded-xl border border-[#665038] bg-[#1A0B18] py-2.5 pl-10 pr-4 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#D6B875] uppercase tracking-wider mb-1.5">
                  Admin Password *
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#C9BBAF]">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full rounded-xl border border-[#665038] bg-[#1A0B18] py-2.5 pl-10 pr-11 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none transition-colors focus:border-[#D6B875] focus:ring-1 focus:ring-[#D6B875]"
                  />
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#C9BBAF] hover:text-[#D6B875] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#C9BBAF]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#665038] bg-[#1A0B18] accent-[#B08D45]"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-[11px] text-[#C9BBAF]">Port 3000 / SSL Encrypted</span>
              </div>

              <button suppressHydrationWarning
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-3 text-xs font-bold text-[#1F0E1D] transition-all hover:bg-[#D6B875] disabled:opacity-60 shadow-lg shadow-[#B08D45]/20 cursor-pointer"
              >
                {loginLoading ? (
                  <span>Authenticating Admin...</span>
                ) : (
                  <>
                    <span>Authenticate & Enter Admin Panel</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/40 text-[11px] text-[#C9BBAF] space-y-1">
              <p className="font-semibold text-[#D6B875]">Default Super Admin Credentials:</p>
              <p>Email: <span className="font-mono text-[#F8F1E5]">admin@shubhvivah.com</span></p>
              <p>Password: <span className="font-mono text-[#F8F1E5]">Admin@123</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENARIO 3: AUTHENTICATED SUPER ADMIN DASHBOARD
  // ---------------------------------------------------------------------------
  const stats = adminData?.stats || {};

  return (
    <div className="min-h-screen bg-[#1A0B18] text-[#F8F1E5] flex flex-col lg:flex-row antialiased">
      {/* Toast Feedback Notification */}
      {feedbackMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-md text-sm font-medium transition-all ${
            feedbackMessage.type === "error"
              ? "bg-red-950/90 border-red-500 text-red-200"
              : "bg-[#321B30]/95 border-[#D6B875] text-[#D6B875]"
          }`}
        >
          {feedbackMessage.type === "error" ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Super Admin Sidebar */}
      <aside className="w-full lg:w-72 bg-[#241321] border-r border-[#665038]/50 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-[#665038]/40">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold tracking-wide text-[#F8F1E5] group-hover:text-[#D6B875] transition-colors">
                Shubh<span className="text-[#D6B875]">Vivah</span>
              </span>
            </Link>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#B08D45]/20 border border-[#B08D45]/50 text-[10px] font-bold tracking-wider uppercase text-[#D6B875] flex items-center gap-1">
                <ShieldCheck size={11} /> Super Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-sm font-medium">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "users", label: "User Management", icon: Users, badge: stats.totalUsers },
              { id: "couples", label: "Couple Management", icon: Heart, badge: stats.totalCouples },
              { id: "sellers", label: "Seller Management", icon: Store, badge: stats.totalSellers },
              { id: "vendors", label: "Vendor Management", icon: Briefcase, badge: stats.totalVendors },
              { id: "listings", label: "Listing Management", icon: Layers, badge: allListings.length },
              { id: "bookings", label: "Booking Management", icon: CalendarCheck, badge: stats.totalBookings },
              { id: "enquiries", label: "Enquiry Management", icon: MessageSquare, badge: stats.totalEnquiries },
              { id: "payments", label: "Platform Payments", icon: IndianRupee },
              { id: "reviews", label: "Reviews Moderation", icon: Star, badge: adminData?.reviews?.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button suppressHydrationWarning
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#B08D45] text-[#1F0E1D] font-bold shadow-md shadow-[#B08D45]/20"
                      : "text-[#C9BBAF] hover:bg-[#321B30] hover:text-[#F8F1E5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-[#1F0E1D]" : "text-[#D6B875]"} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-[#1F0E1D] text-[#D6B875]" : "bg-[#321B30] text-[#C9BBAF]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-4 border-t border-[#665038]/40 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#F8F1E5] truncate max-w-[140px]">{currentUser?.name}</p>
              <p className="text-[10px] text-[#D6B875] truncate max-w-[140px]">{currentUser?.email}</p>
            </div>
            <Link
              href="/"
              target="_blank"
              title="Preview Website"
              className="p-1.5 rounded-lg bg-[#321B30] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
            >
              <ExternalLink size={14} />
            </Link>
          </div>
          <button suppressHydrationWarning
            onClick={handleAdminLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/60 border border-red-800/40 text-xs font-bold text-red-200 hover:bg-red-900/80 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Logout Admin Session
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Operational Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#665038]/40 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5] capitalize">
                {activeTab.replace("-", " ")}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Live
              </span>
              {stats.newChatbotInquiries > 0 && (
                <button suppressHydrationWarning
                  onClick={() => {
                    setActiveTab("enquiries");
                    setEnquirySourceFilter("Sathi AI Chatbot");
                    setEnquiryStatusFilter("all");
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold shadow-md shadow-[#B08D45]/30 flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer animate-pulse"
                >
                  <Sparkles size={13} />
                  <span>{stats.newChatbotInquiries} New Sathi Inquiries</span>
                </button>
              )}
            </div>
            <p className="text-xs text-[#C9BBAF] mt-1">
              Centralized platform administration, KYC approvals, inventory & bookings control
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button suppressHydrationWarning
              onClick={fetchAdminData}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#665038] bg-[#241321] text-xs font-semibold text-[#D6B875] hover:bg-[#321B30] transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              <span>{refreshing ? "Refreshing..." : "Sync Platform"}</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors"
            >
              View Live Website
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & ANALYTICS                                              */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 16 Summary Metrics Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] flex items-center gap-2">
                  <TrendingUp size={16} /> Key Platform Indicators
                </h3>
                <span className="text-xs text-[#C9BBAF]">Auto-calculated in real time</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-[#D6B875]" },
                  { label: "Total Couples", value: stats.totalCouples, icon: Heart, color: "text-rose-400" },
                  { label: "Total Sellers", value: stats.totalSellers, icon: Store, color: "text-amber-400" },
                  { label: "Total Vendors", value: stats.totalVendors, icon: Briefcase, color: "text-sky-400" },
                  { label: "Pending Registrations", value: stats.pendingRegistrations, icon: Clock, color: "text-amber-300", alert: stats.pendingRegistrations > 0 },
                  { label: "Approved Users", value: stats.approvedUsers, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Rejected / Suspended", value: stats.rejectedUsers, icon: Ban, color: "text-red-400" },
                  { label: "Wedding Venues", value: stats.totalVenues, icon: MapPin, color: "text-[#D6B875]" },
                  { label: "Total Products", value: stats.totalProducts, icon: Store, color: "text-amber-400" },
                  { label: "Total Services", value: stats.totalServices, icon: Layers, color: "text-purple-400" },
                  { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck, color: "text-sky-400" },
                  { label: "Pending Bookings", value: stats.pendingBookings, icon: Clock, color: "text-amber-400" },
                  { label: "Confirmed Bookings", value: stats.confirmedBookings, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Total Enquiries", value: stats.totalEnquiries, icon: MessageSquare, color: "text-[#D6B875]" },
                  { label: "Platform Revenue", value: stats.totalRevenue, icon: IndianRupee, color: "text-emerald-400" },
                  { label: "Pending Payments", value: stats.pendingPayments, icon: Clock, color: "text-rose-400" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all ${
                        item.alert
                          ? "bg-[#321B30] border-amber-500/60 shadow-lg shadow-amber-500/10"
                          : "bg-[#241321] border-[#665038]/50 hover:border-[#D6B875]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#C9BBAF] font-medium leading-tight">{item.label}</span>
                        <Icon size={18} className={item.color} />
                      </div>
                      <p className="text-2xl font-serif font-bold text-[#F8F1E5]">{item.value ?? 0}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Distribution Bar Chart */}
              <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-4">
                  User Role Distribution
                </h4>
                <div className="space-y-4">
                  {(adminData?.charts?.userDistribution || []).map((chart, i) => {
                    const pct = stats.totalUsers > 0 ? Math.round((chart.count / stats.totalUsers) * 100) : 0;
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#F8F1E5] font-semibold">{chart.role}</span>
                          <span className="text-[#C9BBAF]">
                            {chart.count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#1A0B18] h-3 rounded-full overflow-hidden border border-[#665038]/30">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: chart.color }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Listing Approval Status */}
              <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-4">
                  Listing Approval Status
                </h4>
                <div className="space-y-4">
                  {(adminData?.charts?.listingStatus || []).map((chart, i) => {
                    const totalListings = allListings.length;
                    const pct = totalListings > 0 ? Math.round((chart.count / totalListings) * 100) : 0;
                    const colors = {
                      Approved: "bg-emerald-500",
                      Pending: "bg-amber-500",
                      Rejected: "bg-red-500",
                    };
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#F8F1E5] font-semibold">{chart.status}</span>
                          <span className="text-[#C9BBAF]">
                            {chart.count} items ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-[#1A0B18] h-3 rounded-full overflow-hidden border border-[#665038]/30">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${colors[chart.status] || "bg-[#D6B875]"}`}
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Revenue Projection */}
              <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-4">
                  Revenue Growth (2026)
                </h4>
                <div className="flex items-end justify-between gap-2 h-40 pt-4">
                  {(adminData?.charts?.monthlyRevenue || []).map((m, idx) => {
                    const heightPct = Math.min(100, Math.round((m.amount / 220000) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] text-[#C9BBAF]">₹{(m.amount / 1000).toFixed(0)}k</span>
                        <div
                          className="w-full bg-gradient-to-t from-[#B08D45] to-[#D6B875] rounded-t-lg transition-all duration-500 hover:brightness-110"
                          style={{ height: `${heightPct}%` }}
                        ></div>
                        <span className="text-[11px] font-semibold text-[#F8F1E5]">{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Activities Audit Feed */}
            <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#D6B875] mb-4 flex items-center gap-2">
                <Clock size={16} /> Recent Platform Audit Activities
              </h4>
              <div className="divide-y divide-[#665038]/30">
                {(adminData?.recentActivities || []).map((act) => (
                  <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#321B30] text-[#D6B875] border border-[#665038]/40">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#F8F1E5]">{act.title}</p>
                        <p className="text-xs text-[#C9BBAF]">{act.detail}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#C9BBAF] shrink-0">
                      {act.time ? new Date(act.time).toLocaleDateString() : "Just now"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 2: USER MANAGEMENT                                                    */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div className="flex-1 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3.5 top-3 text-[#C9BBAF]" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, email, phone, business..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Roles</option>
                  <option value="couple">Couples</option>
                  <option value="vendor">Vendors</option>
                  <option value="seller">Sellers</option>
                  <option value="admin">Super Admins</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active / Approved</option>
                  <option value="pending">Pending Verification</option>
                  <option value="suspended">Suspended</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button suppressHydrationWarning
                onClick={exportUsersCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#321B30] border border-[#665038] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors cursor-pointer shrink-0"
              >
                <Download size={14} /> Export CSV
              </button>
            </div>

            <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A0B18] text-[#D6B875] uppercase text-[10px] tracking-wider border-b border-[#665038]/40">
                    <tr>
                      <th className="py-3 px-4">User ID</th>
                      <th className="py-3 px-4">Full Name / Profile</th>
                      <th className="py-3 px-4">Contact Details</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#665038]/30">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#C9BBAF]">
                          No users found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isSuspended = u.status === "suspended";
                        const isPending = u.status === "pending";
                        const isActive = !isSuspended && !isPending && u.status !== "rejected";

                        return (
                          <tr key={u.id} className="hover:bg-[#321B30]/40 transition-colors">
                            <td className="py-3 px-4 font-mono text-[#D6B875]">#{u.id}</td>
                            <td className="py-3 px-4">
                              <p className="font-semibold text-[#F8F1E5]">{u.name}</p>
                              {u.business_name && (
                                <p className="text-[11px] text-[#C9BBAF] truncate max-w-[180px]">
                                  {u.business_name}
                                </p>
                              )}
                            </td>
                            <td className="py-3 px-4 space-y-0.5">
                              <p className="text-[#F8F1E5] flex items-center gap-1.5">
                                <Mail size={11} className="text-[#D6B875]" /> {u.email}
                              </p>
                              {u.phone && (
                                <p className="text-[#C9BBAF] flex items-center gap-1.5">
                                  <Phone size={11} className="text-[#D6B875]" /> +91 {u.phone}
                                </p>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                  u.user_type === "admin"
                                    ? "bg-purple-950/70 border border-purple-500 text-purple-300"
                                    : u.user_type === "vendor"
                                    ? "bg-sky-950/70 border border-sky-500 text-sky-300"
                                    : u.user_type === "seller"
                                    ? "bg-amber-950/70 border border-amber-500 text-amber-300"
                                    : "bg-rose-950/70 border border-rose-500 text-rose-300"
                                }`}
                              >
                                {u.user_type}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                  isActive
                                    ? "bg-emerald-950/70 border border-emerald-500 text-emerald-300"
                                    : isPending
                                    ? "bg-amber-950/70 border border-amber-500 text-amber-300"
                                    : "bg-red-950/70 border border-red-500 text-red-300"
                                }`}
                              >
                                {isActive ? "Active" : isPending ? "Pending KYC" : u.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#C9BBAF]">{u.city || "Pan India"}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button suppressHydrationWarning
                                  onClick={() => setSelectedUserModal(u)}
                                  title="View User Details"
                                  className="p-1.5 rounded-lg bg-[#321B30] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                                >
                                  <Eye size={14} />
                                </button>

                                {u.user_type !== "admin" && (
                                  <>
                                    {isPending && (
                                      <button suppressHydrationWarning
                                        onClick={() =>
                                          executeAdminAction({
                                            action: "update_user_status",
                                            id: u.id,
                                            status: "active",
                                            remarks: "Verified & Approved by Super Admin",
                                          })
                                        }
                                        title="Approve User"
                                        className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-800 transition-colors"
                                      >
                                        <Check size={14} />
                                      </button>
                                    )}

                                    {isActive ? (
                                      <button suppressHydrationWarning
                                        onClick={() => {
                                          const reason = prompt("Enter suspension reason:", "Account under compliance review");
                                          if (reason !== null) {
                                            executeAdminAction({
                                              action: "update_user_status",
                                              id: u.id,
                                              status: "suspended",
                                              remarks: reason,
                                            });
                                          }
                                        }}
                                        title="Suspend User"
                                        className="p-1.5 rounded-lg bg-amber-950 text-amber-300 hover:bg-amber-800 transition-colors"
                                      >
                                        <Ban size={14} />
                                      </button>
                                    ) : (
                                      <button suppressHydrationWarning
                                        onClick={() =>
                                          executeAdminAction({
                                            action: "update_user_status",
                                            id: u.id,
                                            status: "active",
                                            remarks: "Reactivated by Super Admin",
                                          })
                                        }
                                        title="Activate User"
                                        className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-800 transition-colors"
                                      >
                                        <CheckCircle2 size={14} />
                                      </button>
                                    )}

                                    <button suppressHydrationWarning
                                      onClick={() => {
                                        if (confirm(`Delete account for ${u.name}? This action is irreversible.`)) {
                                          executeAdminAction({
                                            action: "delete_user",
                                            id: u.id,
                                          });
                                        }
                                      }}
                                      title="Delete User Permanently"
                                      className="p-1.5 rounded-lg bg-red-950 text-red-300 hover:bg-red-800 transition-colors"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 3: COUPLE MANAGEMENT                                                  */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "couples" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F8F1E5]">Couple Profiles & Wedding Registrations</h3>
                <p className="text-xs text-[#C9BBAF]">Monitor couple wedding dates, budgets, guest estimates, and bookings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData?.users
                ?.filter((u) => u.user_type === "couple")
                .map((couple) => {
                  const coupleBookings = (adminData.bookings || []).filter((b) => b.couple_id === couple.id);
                  const coupleEnquiries = (adminData.enquiries || []).filter((e) => e.couple_id === couple.id);

                  return (
                    <div
                      key={couple.id}
                      className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/40 text-[10px] font-bold text-rose-300">
                            Couple #{couple.id}
                          </span>
                          <span className="text-xs text-[#D6B875] font-semibold">{couple.city || "Pan India"}</span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-[#F8F1E5]">{couple.name}</h4>
                        <p className="text-xs text-[#C9BBAF] mt-0.5 flex items-center gap-1.5">
                          <Mail size={12} className="text-[#D6B875]" /> {couple.email}
                        </p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5">
                          <Phone size={12} className="text-[#D6B875]" /> +91 {couple.phone}
                        </p>

                        <div className="mt-4 p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Wedding Date:</span>
                            <span className="font-semibold text-[#F8F1E5]">{couple.wedding_date || "To be decided"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Budget:</span>
                            <span className="font-semibold text-[#D6B875]">{couple.wedding_budget || "₹10 - 25 Lakhs"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Total Bookings:</span>
                            <span className="font-semibold text-[#F8F1E5]">{coupleBookings.length} bookings</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Total Enquiries:</span>
                            <span className="font-semibold text-[#F8F1E5]">{coupleEnquiries.length} queries</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#665038]/30">
                        <button suppressHydrationWarning
                          onClick={() => setSelectedUserModal(couple)}
                          className="flex-1 py-1.5 rounded-xl bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                        >
                          View Full Profile
                        </button>
                        <button suppressHydrationWarning
                          onClick={() => {
                            const newStatus = couple.status === "active" ? "suspended" : "active";
                            executeAdminAction({
                              action: "update_user_status",
                              id: couple.id,
                              status: newStatus,
                              remarks: `Status updated by Admin to ${newStatus}`,
                            });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                            couple.status === "active"
                              ? "border-amber-700/50 text-amber-300 hover:bg-amber-950"
                              : "border-emerald-700/50 text-emerald-300 hover:bg-emerald-950"
                          }`}
                        >
                          {couple.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 4: SELLER MANAGEMENT                                                  */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "sellers" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F8F1E5]">Seller Partners & Bulk Wholesalers</h3>
                <p className="text-xs text-[#C9BBAF]">Manage product sellers, bulk dairy, camper water suppliers & orders</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData?.users
                ?.filter((u) => u.user_type === "seller")
                .map((seller) => {
                  const sellerProducts = (adminData.products || []).filter((p) => p.seller_id === seller.id);
                  const sellerOrders = (adminData.orders || []).filter((o) => o.seller_id === seller.id);
                  const sellerRevenue = sellerOrders.reduce((sum, o) => {
                    const num = Number(String(o.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
                    return sum + num;
                  }, 0);

                  return (
                    <div
                      key={seller.id}
                      className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                            Seller #{seller.id}
                          </span>
                          <span className="text-xs text-[#D6B875] font-semibold">{seller.category || "Bulk Supplies"}</span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-[#F8F1E5]">{seller.business_name || seller.name}</h4>
                        <p className="text-xs text-[#C9BBAF]">Owner: {seller.name}</p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5 mt-1">
                          <Mail size={12} className="text-[#D6B875]" /> {seller.email}
                        </p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5">
                          <Phone size={12} className="text-[#D6B875]" /> +91 {seller.phone}
                        </p>

                        <div className="mt-4 p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Listed Products:</span>
                            <span className="font-semibold text-[#F8F1E5]">{sellerProducts.length} items</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Total Orders:</span>
                            <span className="font-semibold text-[#F8F1E5]">{sellerOrders.length} orders</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Total Earnings:</span>
                            <span className="font-semibold text-emerald-400">₹{sellerRevenue.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Verification:</span>
                            <span className="font-semibold text-[#D6B875]">GST Verified</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#665038]/30">
                        <button suppressHydrationWarning
                          onClick={() => setSelectedUserModal(seller)}
                          className="flex-1 py-1.5 rounded-xl bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                        >
                          Seller Details
                        </button>
                        <button suppressHydrationWarning
                          onClick={() => {
                            const newStatus = seller.status === "active" ? "suspended" : "active";
                            executeAdminAction({
                              action: "update_user_status",
                              id: seller.id,
                              status: newStatus,
                              remarks: `Seller status updated to ${newStatus}`,
                            });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                            seller.status === "active"
                              ? "border-amber-700/50 text-amber-300 hover:bg-amber-950"
                              : "border-emerald-700/50 text-emerald-300 hover:bg-emerald-950"
                          }`}
                        >
                          {seller.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 5: VENDOR MANAGEMENT                                                  */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "vendors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F8F1E5]">Wedding Service Vendors</h3>
                <p className="text-xs text-[#C9BBAF]">
                  Manage photographers, decorators, makeup artists, venues, and caterers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminData?.users
                ?.filter((u) => u.user_type === "vendor")
                .map((vendor) => {
                  const vendorServices = (adminData.services || []).filter((s) => s.vendor_id === vendor.id);
                  const vendorBookings = (adminData.bookings || []).filter((b) => b.vendor_id === vendor.id);
                  const vendorReviews = (adminData.reviews || []).filter((r) => r.vendor_id === vendor.id);
                  const avgRating =
                    vendorReviews.length > 0
                      ? (vendorReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / vendorReviews.length).toFixed(1)
                      : "5.0";

                  return (
                    <div
                      key={vendor.id}
                      className="rounded-3xl border border-[#665038]/50 bg-[#241321] p-6 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-950/70 border border-sky-500/40 text-[10px] font-bold text-sky-300">
                            Vendor #{vendor.id}
                          </span>
                          <span className="text-xs text-[#D6B875] font-semibold">{vendor.category || "Wedding Pro"}</span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-[#F8F1E5]">{vendor.business_name || vendor.name}</h4>
                        <p className="text-xs text-[#C9BBAF]">Owner: {vendor.name}</p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5 mt-1">
                          <Mail size={12} className="text-[#D6B875]" /> {vendor.email}
                        </p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5">
                          <Phone size={12} className="text-[#D6B875]" /> +91 {vendor.phone}
                        </p>

                        <div className="mt-4 p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Active Services:</span>
                            <span className="font-semibold text-[#F8F1E5]">{vendorServices.length} packages</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Client Bookings:</span>
                            <span className="font-semibold text-[#F8F1E5]">{vendorBookings.length} booked</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">Average Rating:</span>
                            <span className="font-semibold text-[#D6B875] flex items-center gap-1">
                              <Star size={12} className="fill-[#D6B875]" /> {avgRating} ({vendorReviews.length})
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C9BBAF]">City:</span>
                            <span className="font-semibold text-[#F8F1E5]">{vendor.city || "Pan India"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#665038]/30">
                        <button suppressHydrationWarning
                          onClick={() => setSelectedUserModal(vendor)}
                          className="flex-1 py-1.5 rounded-xl bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                        >
                          Vendor Portfolio
                        </button>
                        <button suppressHydrationWarning
                          onClick={() => {
                            const newStatus = vendor.status === "active" ? "suspended" : "active";
                            executeAdminAction({
                              action: "update_user_status",
                              id: vendor.id,
                              status: newStatus,
                              remarks: `Vendor status updated to ${newStatus}`,
                            });
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                            vendor.status === "active"
                              ? "border-amber-700/50 text-amber-300 hover:bg-amber-950"
                              : "border-emerald-700/50 text-emerald-300 hover:bg-emerald-950"
                          }`}
                        >
                          {vendor.status === "active" ? "Suspend" : "Activate"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 6: LISTING MANAGEMENT (PRODUCTS & SERVICES UNIFIED)                   */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div className="flex-1 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute left-3.5 top-3 text-[#C9BBAF]" />
                  <input
                    type="text"
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    placeholder="Search listings by title, category, owner..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <select
                  value={listingTypeFilter}
                  onChange={(e) => setListingTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Types</option>
                  <option value="service">Vendor Services</option>
                  <option value="product">Seller Products</option>
                </select>

                <select
                  value={listingStatusFilter}
                  onChange={(e) => setListingStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Approved / Active</option>
                  <option value="pending">Pending Approval</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <span className="text-xs text-[#C9BBAF] shrink-0">
                Showing {filteredListings.length} of {allListings.length} listings
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.length === 0 ? (
                <div className="col-span-full py-12 text-center text-[#C9BBAF] bg-[#241321] rounded-3xl border border-[#665038]/40">
                  No listings found matching your search.
                </div>
              ) : (
                filteredListings.map((item) => {
                  const isApproved = item.status === "active";
                  const isPending = item.status === "pending";

                  return (
                    <div
                      key={`${item.listing_type}-${item.id}`}
                      className="rounded-3xl border border-[#665038]/50 bg-[#241321] overflow-hidden shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 w-full bg-[#1A0B18]">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#1F0E1D]/80 backdrop-blur-md border border-[#D6B875]/40 text-[10px] font-bold text-[#D6B875] uppercase">
                              {item.listing_type}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase backdrop-blur-md ${
                                isApproved
                                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50"
                                  : isPending
                                  ? "bg-amber-950/80 text-amber-300 border border-amber-500/50"
                                  : "bg-red-950/80 text-red-300 border border-red-500/50"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-[10px] font-bold text-[#D6B875] uppercase tracking-wider">
                              {item.category}
                            </span>
                            <h4 className="text-base font-serif font-bold text-[#F8F1E5] line-clamp-1 mt-0.5">
                              {item.name}
                            </h4>
                            <p className="text-xs text-[#C9BBAF]">Listed by: {item.owner_name}</p>
                          </div>

                          <p className="text-xs text-[#C9BBAF] line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#665038]/30">
                            <span className="text-[#C9BBAF]">Price / Rates:</span>
                            <span className="font-bold text-[#D6B875]">
                              {typeof item.price === "number" ? `₹${item.price.toLocaleString("en-IN")}` : item.price}
                            </span>
                          </div>

                          {item.admin_remarks && (
                            <div className="p-2.5 rounded-xl bg-[#321B30]/70 border border-amber-500/30 text-[11px] text-amber-200">
                              <span className="font-bold">Admin Remarks:</span> {item.admin_remarks}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-[#1A0B18]/60 border-t border-[#665038]/40 flex items-center justify-between gap-2">
                        {isPending && (
                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_listing_status",
                                listingType: item.listing_type,
                                listingId: item.id,
                                newStatus: "active",
                                remarks: "Approved by Super Admin",
                              })
                            }
                            className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#1F0E1D] text-xs font-bold transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        )}

                        {!isPending && isApproved && (
                          <button suppressHydrationWarning
                            onClick={() => {
                              setRejectRemarksModal({
                                type: item.listing_type,
                                id: item.id,
                                title: item.name,
                              });
                            }}
                            className="flex-1 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-700/50 text-xs font-semibold hover:bg-amber-900 transition-colors cursor-pointer"
                          >
                            Mark Pending / Reject
                          </button>
                        )}

                        {item.status === "rejected" && (
                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_listing_status",
                                listingType: item.listing_type,
                                listingId: item.id,
                                newStatus: "active",
                                remarks: "Re-approved after corrections",
                              })
                            }
                            className="flex-1 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
                          >
                            Re-Approve
                          </button>
                        )}

                        <button suppressHydrationWarning
                          onClick={() => {
                            if (confirm(`Permanently delete this listing: "${item.name}"?`)) {
                              executeAdminAction({
                                action: "delete_listing",
                                listingType: item.listing_type,
                                listingId: item.id,
                              });
                            }
                          }}
                          className="p-1.5 rounded-xl bg-red-950 text-red-300 hover:bg-red-900 transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 7: BOOKING MANAGEMENT                                                 */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#C9BBAF]">Filter Bookings:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <span className="text-xs text-[#D6B875] font-semibold">
                Total Bookings: {filteredBookings.length}
              </span>
            </div>

            <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A0B18] text-[#D6B875] uppercase text-[10px] tracking-wider border-b border-[#665038]/40">
                    <tr>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Customer / Couple</th>
                      <th className="py-3 px-4">Service & Vendor</th>
                      <th className="py-3 px-4">Event Date</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Booking Status</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#665038]/30">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-[#C9BBAF]">
                          No bookings found matching filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#321B30]/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-[#D6B875]">{b.id}</td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-[#F8F1E5]">{b.couple_name || `Couple #${b.couple_id}`}</p>
                            <p className="text-[11px] text-[#C9BBAF]">{b.couple_phone || ""}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-[#F8F1E5]">{b.service_name}</p>
                            <p className="text-[11px] text-[#C9BBAF]">{b.vendor_name || `Vendor #${b.vendor_id}`}</p>
                          </td>
                          <td className="py-3 px-4 text-[#F8F1E5]">{b.event_date || "Upcoming"}</td>
                          <td className="py-3 px-4 font-bold text-[#D6B875]">{b.total_amount || "₹25,000"}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                                (b.booking_status || "").toLowerCase() === "confirmed"
                                  ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                                  : (b.booking_status || "").toLowerCase() === "completed"
                                  ? "bg-sky-950 border border-sky-500 text-sky-300"
                                  : (b.booking_status || "").toLowerCase() === "cancelled"
                                  ? "bg-red-950 border border-red-500 text-red-300"
                                  : "bg-amber-950 border border-amber-500 text-amber-300"
                              }`}
                            >
                              {b.booking_status || "Pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                (b.payment_status || "").toLowerCase() === "paid"
                                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                                  : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              }`}
                            >
                              {b.payment_status || "Pending"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={b.booking_status || "Pending"}
                              onChange={(e) =>
                                executeAdminAction({
                                  action: "update_booking_status",
                                  bookingId: b.id,
                                  bookingStatus: e.target.value,
                                })
                              }
                              className="px-2 py-1 rounded-lg bg-[#1A0B18] border border-[#665038] text-[11px] text-[#D6B875] focus:outline-none focus:border-[#D6B875]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 8: ENQUIRY MANAGEMENT                                                 */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#C9BBAF]">Filter Status:</span>
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#C9BBAF]">Source:</span>
                  <select
                    value={enquirySourceFilter}
                    onChange={(e) => setEnquirySourceFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="all">All Sources</option>
                    <option value="Sathi AI Chatbot">🤖 Sathi AI Chatbot</option>
                    <option value="Contact Us Form">Contact Us Form</option>
                    <option value="Direct Enquiry">Direct Enquiry</option>
                  </select>
                </div>
              </div>

              <span className="text-xs text-[#D6B875] font-semibold">
                Total Enquiries: {filteredEnquiries.length}
              </span>
            </div>

            <div className="space-y-4">
              {filteredEnquiries.length === 0 ? (
                <div className="p-8 text-center text-[#C9BBAF] bg-[#241321] rounded-3xl border border-[#665038]/40">
                  No inquiries found matching selected filters.
                </div>
              ) : (
                filteredEnquiries.map((enq) => {
                  const isChatbot = enq.source === "Sathi AI Chatbot";
                  const cleanPhone = (enq.couple_phone || "").replace(/[^0-9]/g, "");

                  return (
                    <div
                      key={`${enq.source}-${enq.id}`}
                      className={`p-6 rounded-3xl border bg-[#241321] shadow-xl space-y-4 transition-all ${
                        isChatbot ? "border-[#B08D45]/60 hover:border-[#D6B875]" : "border-[#665038]/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#665038]/30 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border flex items-center gap-1 ${
                                isChatbot
                                  ? "bg-gradient-to-r from-[#B08D45]/30 to-[#D6B875]/30 text-[#D6B875] border-[#D6B875]/60"
                                  : "bg-[#B08D45]/20 text-[#D6B875] border-[#B08D45]/40"
                              }`}
                            >
                              {isChatbot && <Sparkles size={11} />}
                              <span>{enq.source}</span>
                            </span>
                            <h4 className="font-semibold text-base text-[#F8F1E5]">{enq.couple_name}</h4>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-[#C9BBAF] mt-1">
                            {enq.couple_email && <span>{enq.couple_email}</span>}
                            <span>+91 {enq.couple_phone}</span>
                            {enq.looking_for && (
                              <span className="px-2 py-0.2 rounded-md bg-[#321B30] text-[#D6B875] text-[10px] font-bold border border-[#B08D45]/30">
                                Looking for: {enq.looking_for}
                              </span>
                            )}
                            {enq.age && (
                              <span className="px-2 py-0.2 rounded-md bg-[#321B30] text-[#E8D9B5] text-[10px] font-medium border border-[#665038]/40">
                                Age: {enq.age}
                              </span>
                            )}
                            {(enq.preferred_location || enq.city) && (
                              <span className="px-2 py-0.2 rounded-md bg-[#321B30] text-[#E8D9B5] text-[10px] font-medium border border-[#665038]/40">
                                Location: {enq.preferred_location || enq.city}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                              (enq.status || "New").toLowerCase() === "resolved"
                                ? "bg-emerald-950 text-emerald-300 border-emerald-500"
                                : (enq.status || "New").toLowerCase() === "contacted"
                                ? "bg-purple-950 text-purple-300 border-purple-500"
                                : (enq.status || "New").toLowerCase() === "in progress"
                                ? "bg-amber-950 text-amber-300 border-amber-500"
                                : "bg-blue-950 text-blue-300 border-blue-500"
                            }`}
                          >
                            {enq.status || "New"}
                          </span>
                          <span className="text-xs text-[#C9BBAF]">
                            {enq.created_at || enq.submitted_at
                              ? new Date(enq.created_at || enq.submitted_at).toLocaleDateString()
                              : "Recent"}
                          </span>
                        </div>
                      </div>

                      {/* Inquiry Message */}
                      <div className="bg-[#1A0B18] p-4 rounded-2xl border border-[#665038]/30">
                        <p className="text-xs font-semibold text-[#D6B875] mb-1">
                          {isChatbot ? "Matrimonial Preferences / Inquiry:" : "Inquiry Message / Wedding Needs:"}
                        </p>
                        <p className="text-xs text-[#F8F1E5] leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                      </div>

                      {/* Conversation Summary with Sathi (if present) */}
                      {enq.conversation_summary && (
                        <div className="bg-[#140A13] p-3 rounded-2xl border border-[#B08D45]/30">
                          <p className="text-[11px] font-semibold text-[#D6B875] flex items-center gap-1 mb-1">
                            <Sparkles size={12} />
                            <span>Chat Context with Sathi AI:</span>
                          </p>
                          <p className="text-[11px] text-[#C9BBAF] italic line-clamp-3">{enq.conversation_summary}</p>
                        </div>
                      )}

                      {/* Admin Response Note */}
                      {enq.admin_reply && (
                        <div className="bg-[#321B30] p-4 rounded-2xl border border-emerald-500/30">
                          <p className="text-xs font-semibold text-emerald-400 mb-1">Admin Response / Remarks:</p>
                          <p className="text-xs text-[#C9BBAF]">{enq.admin_reply}</p>
                        </div>
                      )}

                      {/* Action Controls Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          {/* Direct Contact Links */}
                          {cleanPhone && (
                            <>
                              <a
                                href={`https://wa.me/91${cleanPhone}?text=Namaste%20${encodeURIComponent(
                                  enq.couple_name
                                )}%2C%20greetings%20from%20ShubhVivah!%20We%20received%20your%20matchmaking%20inquiry.`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium hover:bg-emerald-900 transition-colors flex items-center gap-1"
                              >
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:+91${cleanPhone}`}
                                className="px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038] text-xs font-medium text-[#F8F1E5] hover:border-[#D6B875] transition-colors flex items-center gap-1"
                              >
                                <Phone size={12} className="text-[#D6B875]" />
                                <span>Call</span>
                              </a>
                            </>
                          )}

                          <button suppressHydrationWarning
                            onClick={() => setReplyEnquiryModal(enq)}
                            className="px-3 py-1.5 rounded-xl bg-[#321B30] border border-[#665038] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors cursor-pointer"
                          >
                            Reply / Remarks
                          </button>
                        </div>

                        {/* Status Actions */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_enquiry_status",
                                enquiryId: enq.id,
                                enquiryStatus: "Contacted",
                                isContactInquiry: enq.source === "Contact Us Form",
                                isChatbotInquiry: isChatbot,
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-700/50 text-purple-300 text-xs font-medium hover:bg-purple-900 transition-colors cursor-pointer"
                          >
                            Mark Contacted
                          </button>

                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_enquiry_status",
                                enquiryId: enq.id,
                                enquiryStatus: "In Progress",
                                isContactInquiry: enq.source === "Contact Us Form",
                                isChatbotInquiry: isChatbot,
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-medium hover:bg-amber-900 transition-colors cursor-pointer"
                          >
                            In Progress
                          </button>

                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_enquiry_status",
                                enquiryId: enq.id,
                                enquiryStatus: "Resolved",
                                isContactInquiry: enq.source === "Contact Us Form",
                                isChatbotInquiry: isChatbot,
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-xs font-medium hover:bg-emerald-900 transition-colors cursor-pointer"
                          >
                            Resolve
                          </button>

                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_enquiry_status",
                                enquiryId: enq.id,
                                enquiryStatus: "Rejected",
                                isContactInquiry: enq.source === "Contact Us Form",
                                isChatbotInquiry: isChatbot,
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-red-950 border border-red-700/50 text-red-300 text-xs font-medium hover:bg-red-900 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 9: PAYMENT & TRANSACTIONS MANAGEMENT                                  */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div>
                <h3 className="text-base font-serif font-bold text-[#F8F1E5]">Platform Financial Ledger</h3>
                <p className="text-xs text-[#C9BBAF]">All booking deposits, product checkout orders & settlements</p>
              </div>

              <button suppressHydrationWarning
                onClick={exportTransactionsCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#321B30] border border-[#665038] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors cursor-pointer"
              >
                <Download size={14} /> Export Transactions (CSV)
              </button>
            </div>

            <div className="rounded-3xl border border-[#665038]/50 bg-[#241321] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A0B18] text-[#D6B875] uppercase text-[10px] tracking-wider border-b border-[#665038]/40">
                    <tr>
                      <th className="py-3 px-4">Transaction ID</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Customer (Payer)</th>
                      <th className="py-3 px-4">Vendor / Seller (Payee)</th>
                      <th className="py-3 px-4">Item Details</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#665038]/30">
                    {(adminData?.transactions || []).map((txn) => (
                      <tr key={txn.id} className="hover:bg-[#321B30]/40 transition-colors">
                        <td className="py-3 px-4 font-mono text-[#D6B875]">{txn.id}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-[#1A0B18] border border-[#665038]/50 text-[10px] font-semibold text-[#F8F1E5]">
                            {txn.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#F8F1E5]">{txn.payer}</td>
                        <td className="py-3 px-4 text-[#C9BBAF]">{txn.payee}</td>
                        <td className="py-3 px-4 text-[#F8F1E5] max-w-[180px] truncate">{txn.item}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{txn.amount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              (txn.payment_status || "").toLowerCase() === "paid"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500"
                                : "bg-amber-950 text-amber-300 border border-amber-500"
                            }`}
                          >
                            {txn.payment_status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#C9BBAF]">{txn.payment_method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* TAB 10: REVIEWS & RATINGS MODERATION                                      */}
        {/* ------------------------------------------------------------------------- */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#F8F1E5]">Reviews & Testimonials Moderation</h3>
                <p className="text-xs text-[#C9BBAF]">Moderate client reviews, star ratings, and vendor responses</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(adminData?.reviews || []).length === 0 ? (
                <div className="col-span-full p-8 text-center text-[#C9BBAF] bg-[#241321] rounded-3xl border border-[#665038]/40">
                  No customer reviews submitted yet.
                </div>
              ) : (
                (adminData?.reviews || []).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl border border-[#665038]/50 bg-[#241321] shadow-xl flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-[#D6B875]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < (rev.rating || 5) ? "fill-[#D6B875]" : "text-[#665038]"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#C9BBAF]">
                          {rev.created_at ? new Date(rev.created_at).toLocaleDateString() : "Recent"}
                        </span>
                      </div>

                      <h4 className="font-semibold text-sm text-[#F8F1E5]">{rev.couple_name}</h4>
                      <p className="text-xs text-[#C9BBAF] mb-3">Vendor ID #{rev.vendor_id}</p>

                      <p className="text-xs text-[#F8F1E5] italic leading-relaxed bg-[#1A0B18] p-3 rounded-2xl border border-[#665038]/30">
                        "{rev.review_text}"
                      </p>

                      {rev.reply_text && (
                        <div className="mt-3 p-3 rounded-2xl bg-[#321B30] border border-[#665038]/30 text-xs">
                          <span className="font-semibold text-[#D6B875]">Vendor Reply:</span> {rev.reply_text}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#665038]/30">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          rev.status === "rejected"
                            ? "bg-red-950 text-red-300 border border-red-500"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-500"
                        }`}
                      >
                        {rev.status || "Approved"}
                      </span>

                      <div className="flex items-center gap-2">
                        {rev.status !== "rejected" ? (
                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_review_status",
                                reviewId: rev.id,
                                reviewStatus: "rejected",
                              })
                            }
                            className="px-3 py-1 rounded-xl bg-amber-950 border border-amber-700/50 text-amber-300 text-xs font-semibold hover:bg-amber-900 transition-colors cursor-pointer"
                          >
                            Hide Review
                          </button>
                        ) : (
                          <button suppressHydrationWarning
                            onClick={() =>
                              executeAdminAction({
                                action: "update_review_status",
                                reviewId: rev.id,
                                reviewStatus: "approved",
                              })
                            }
                            className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-700/50 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        )}

                        <button suppressHydrationWarning
                          onClick={() => {
                            if (confirm("Delete this review permanently?")) {
                              executeAdminAction({
                                action: "update_review_status",
                                reviewId: rev.id,
                                reviewStatus: "deleted",
                              });
                            }
                          }}
                          className="p-1 rounded-xl bg-red-950 text-red-300 hover:bg-red-900 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------------------- */}
      {/* MODAL 1: USER DETAILS MODAL                                               */}
      {/* ------------------------------------------------------------------------- */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-lg w-full rounded-3xl border border-[#665038] bg-[#241321] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#B08D45]/20 text-[#D6B875] text-[10px] font-bold uppercase">
                  {selectedUserModal.user_type} Profile
                </span>
                <h3 className="text-lg font-serif font-bold text-[#F8F1E5]">User #{selectedUserModal.id}</h3>
              </div>
              <button suppressHydrationWarning
                onClick={() => setSelectedUserModal(null)}
                className="p-1 rounded-lg text-[#C9BBAF] hover:text-[#F8F1E5] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30">
                <div>
                  <span className="text-[#C9BBAF]">Full Name:</span>
                  <p className="font-semibold text-[#F8F1E5]">{selectedUserModal.name}</p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Role / Type:</span>
                  <p className="font-semibold text-[#D6B875] uppercase">{selectedUserModal.user_type}</p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Email Address:</span>
                  <p className="font-semibold text-[#F8F1E5]">{selectedUserModal.email}</p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Mobile Number:</span>
                  <p className="font-semibold text-[#F8F1E5]">+91 {selectedUserModal.phone}</p>
                </div>
              </div>

              {selectedUserModal.business_name && (
                <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-1">
                  <span className="text-[#C9BBAF]">Business Name:</span>
                  <p className="font-semibold text-[#F8F1E5]">{selectedUserModal.business_name}</p>
                  <p className="text-[#C9BBAF]">Category: {selectedUserModal.category || "Wedding Industry"}</p>
                  <p className="text-[#C9BBAF]">Location: {selectedUserModal.city || "Pan India"}</p>
                </div>
              )}

              {selectedUserModal.wedding_date && (
                <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 space-y-1">
                  <span className="text-[#C9BBAF]">Couple Wedding Details:</span>
                  <p className="text-[#F8F1E5]">Wedding Date: {selectedUserModal.wedding_date}</p>
                  <p className="text-[#F8F1E5]">Location: {selectedUserModal.wedding_location || "Jaipur"}</p>
                  <p className="text-[#F8F1E5]">Budget: {selectedUserModal.wedding_budget || "₹15 Lakhs"}</p>
                </div>
              )}

              {selectedUserModal.admin_remarks && (
                <div className="p-3 rounded-2xl bg-[#321B30] border border-amber-500/40 text-amber-200">
                  <span className="font-bold">Admin Remarks:</span> {selectedUserModal.admin_remarks}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#665038]/40">
              <button suppressHydrationWarning
                onClick={() => setSelectedUserModal(null)}
                className="px-4 py-2 rounded-xl bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* MODAL 2: REJECT REMARKS MODAL                                             */}
      {/* ------------------------------------------------------------------------- */}
      {rejectRemarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-3xl border border-[#665038] bg-[#241321] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-[#F8F1E5]">
              Reject / Request Correction for Listing
            </h3>
            <p className="text-xs text-[#C9BBAF]">
              Item: <span className="text-[#D6B875] font-semibold">{rejectRemarksModal.title}</span>
            </p>

            <textarea
              rows={4}
              value={remarksText}
              onChange={(e) => setRemarksText(e.target.value)}
              placeholder="State the reason for rejection (e.g., incomplete pricing, low quality photos, invalid license)..."
              className="w-full p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
            />

            <div className="flex justify-end gap-2">
              <button suppressHydrationWarning
                onClick={() => {
                  setRejectRemarksModal(null);
                  setRemarksText("");
                }}
                className="px-4 py-2 rounded-xl border border-[#665038] text-xs text-[#C9BBAF] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button suppressHydrationWarning
                onClick={async () => {
                  await executeAdminAction({
                    action: "update_listing_status",
                    listingType: rejectRemarksModal.type,
                    listingId: rejectRemarksModal.id,
                    newStatus: "rejected",
                    remarks: remarksText || "Listing does not satisfy ShubhVivah quality guidelines",
                  });
                  setRejectRemarksModal(null);
                  setRemarksText("");
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* MODAL 3: ENQUIRY REPLY MODAL                                              */}
      {/* ------------------------------------------------------------------------- */}
      {replyEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-3xl border border-[#665038] bg-[#241321] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-serif font-bold text-[#F8F1E5]">
              Reply to Customer Inquiry
            </h3>
            <p className="text-xs text-[#C9BBAF]">
              Sender: <span className="text-[#D6B875] font-semibold">{replyEnquiryModal.couple_name}</span> ({replyEnquiryModal.couple_email})
            </p>

            <textarea
              rows={4}
              value={remarksText}
              onChange={(e) => setRemarksText(e.target.value)}
              placeholder="Type your official ShubhVivah administration reply or vendor assignment remarks..."
              className="w-full p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
            />

            <div className="flex justify-end gap-2">
              <button suppressHydrationWarning
                onClick={() => {
                  setReplyEnquiryModal(null);
                  setRemarksText("");
                }}
                className="px-4 py-2 rounded-xl border border-[#665038] text-xs text-[#C9BBAF] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button suppressHydrationWarning
                onClick={async () => {
                  await executeAdminAction({
                    action: "update_enquiry_status",
                    enquiryId: replyEnquiryModal.id,
                    enquiryStatus: "In Progress",
                    replyMessage: remarksText,
                    isContactInquiry: replyEnquiryModal.source === "Contact Us Form",
                    isChatbotInquiry: replyEnquiryModal.source === "Sathi AI Chatbot",
                  });
                  setReplyEnquiryModal(null);
                  setRemarksText("");
                }}
                className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors cursor-pointer"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
