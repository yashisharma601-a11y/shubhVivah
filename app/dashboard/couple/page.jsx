"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Calendar,
  Users,
  IndianRupee,
  Sparkles,
  LogOut,
  Mail,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Search,
  FileText,
  Clock,
  ArrowRight,
  AlertTriangle,
  Bookmark,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Lock,
  Edit,
  Save,
  X,
  MessageSquare,
  Bell,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Percent,
  SlidersHorizontal,
  DollarSign,
  Camera,
  Layers,
  CalendarDays,
  XCircle,
  Menu,
} from "lucide-react";

export default function CoupleDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mismatchedRole, setMismatchedRole] = useState(null);

  // Active Section
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Live Dashboard Data
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Search & Filters
  const [bookingFilter, setBookingFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);
  const [contactVendorModal, setContactVendorModal] = useState(null);
  const [contactMessage, setContactMessage] = useState("");

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: "",
    bride_name: "",
    groom_name: "",
    email: "",
    phone: "",
    avatar_url: "",
    wedding_date: "",
    wedding_city: "",
    wedding_location: "",
    wedding_budget: "",
    guest_count: "",
    event_types: "Sangeet, Mehendi, Royal Wedding Ceremony & Reception",
  });

  // Planning Tools Form
  const [newChecklistTask, setNewChecklistTask] = useState("");
  const [newChecklistCategory, setNewChecklistCategory] = useState("Venue & Decor");
  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [newBudgetEstimated, setNewBudgetEstimated] = useState("");
  const [newBudgetActual, setNewBudgetActual] = useState("");

  // Password Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState(null);

  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Load Couple Dashboard Data
  const loadCoupleDashboard = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/dashboard/couple");
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
        setUser(data.user);
        setProfileForm({
          name: data.user.name || "",
          bride_name: data.user.bride_name || "",
          groom_name: data.user.groom_name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          avatar_url: data.user.avatar_url || "",
          wedding_date: data.user.wedding_date || "",
          wedding_city: data.user.city || data.user.wedding_location?.split(",")[0] || "Jaipur",
          wedding_location: data.user.wedding_location || "",
          wedding_budget: data.user.wedding_budget || "₹25,00,000",
          guest_count: data.user.guest_count || 350,
          event_types: data.user.event_types || "Sangeet, Mehendi, Royal Wedding Ceremony & Reception",
        });
      }
    } catch (err) {
      console.error("Error loading couple dashboard:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // 2. Auth Guard
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.authenticated || !data.user) {
          router.push("/login?type=couple");
          return;
        }

        if (data.user.user_type !== "couple") {
          setMismatchedRole(data.user.user_type);
          setUser(data.user);
          setLoading(false);
          return;
        }

        setUser(data.user);
        await loadCoupleDashboard();
        setLoading(false);
      } catch {
        router.push("/login?type=couple");
      }
    }
    checkAuth();
  }, [router]);

  // 3. Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login?type=couple");
    } catch {
      router.push("/login");
    }
  };

  // 4. Update Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Wedding profile details saved successfully!");
        setIsEditingProfile(false);
        loadCoupleDashboard();
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch {
      showToast("Error updating profile", "error");
    }
  };

  // 5. Checklist Controls
  const handleToggleChecklist = async (id) => {
    try {
      const res = await fetch("/api/dashboard/couple/checklist", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        loadCoupleDashboard();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddChecklist = async (e) => {
    e.preventDefault();
    if (!newChecklistTask.trim()) return;
    try {
      const res = await fetch("/api/dashboard/couple/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newChecklistTask.trim(), category: newChecklistCategory }),
      });
      const data = await res.json();
      if (data.success) {
        setNewChecklistTask("");
        showToast("Checklist task added!");
        loadCoupleDashboard();
      }
    } catch {
      showToast("Failed to add task", "error");
    }
  };

  const handleDeleteChecklist = async (id) => {
    try {
      await fetch(`/api/dashboard/couple/checklist?id=${id}`, { method: "DELETE" });
      showToast("Task removed");
      loadCoupleDashboard();
    } catch {
      showToast("Failed to remove task", "error");
    }
  };

  // 6. Budget Controls
  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!newBudgetCategory.trim()) return;
    try {
      const res = await fetch("/api/dashboard/couple/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: newBudgetCategory.trim(),
          estimated: Number(newBudgetEstimated) || 0,
          actual: Number(newBudgetActual) || 0,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewBudgetCategory("");
        setNewBudgetEstimated("");
        setNewBudgetActual("");
        showToast("Budget entry recorded!");
        loadCoupleDashboard();
      }
    } catch {
      showToast("Failed to add budget item", "error");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await fetch(`/api/dashboard/couple/budget?id=${id}`, { method: "DELETE" });
      showToast("Budget entry deleted");
      loadCoupleDashboard();
    } catch {
      showToast("Failed to remove item", "error");
    }
  };

  // 7. Booking Cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this wedding booking request?")) return;
    try {
      const res = await fetch("/api/dashboard/couple/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: "Cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Booking request cancelled");
        loadCoupleDashboard();
      }
    } catch {
      showToast("Failed to cancel booking", "error");
    }
  };

  // 8. Wishlist Remove
  const handleRemoveWishlist = async (id) => {
    try {
      await fetch(`/api/dashboard/couple/wishlist?id=${id}`, { method: "DELETE" });
      showToast("Item removed from your wedding wishlist");
      loadCoupleDashboard();
    } catch {
      showToast("Failed to remove item", "error");
    }
  };

  // 9. Send Direct Vendor Enquiry
  const handleSendVendorEnquiry = async (e) => {
    e.preventDefault();
    if (!contactMessage.trim() || !contactVendorModal) return;
    try {
      const res = await fetch("/api/dashboard/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_id: contactVendorModal.vendor_id || 2,
          target_type: "vendor",
          target_name: contactVendorModal.vendor_name || "Wedding Vendor",
          service_or_product: contactVendorModal.service_name || "Wedding Service",
          message: contactMessage.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Message sent to vendor successfully!");
        setContactVendorModal(null);
        setContactMessage("");
        loadCoupleDashboard();
      }
    } catch {
      showToast("Failed to send message", "error");
    }
  };

  // 10. Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordFeedback(null);
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ text: "New passwords do not match.", type: "error" });
      return;
    }
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setPasswordFeedback({ text: "Password changed successfully!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordFeedback({ text: data.message || "Failed to change password", type: "error" });
      }
    } catch {
      setPasswordFeedback({ text: "Error changing password", type: "error" });
    }
  };

  // Role Mismatch Guard Screen
  if (mismatchedRole) {
    return (
      <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-amber-500/50 bg-[#2A1325] p-8 text-center shadow-2xl space-y-4">
          <AlertTriangle className="mx-auto text-amber-400" size={44} />
          <h2 className="text-2xl font-serif font-bold text-[#F8F1E5]">Role Separation Guard</h2>
          <p className="text-xs text-[#C9BBAF] leading-relaxed">
            You are currently logged in as a{" "}
            <span className="font-bold text-[#D6B875] uppercase">{mismatchedRole}</span>.
            This dashboard is dedicated exclusively to couples.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href={`/dashboard/${mismatchedRole}`}
              className="block w-full py-2.5 px-4 rounded-xl bg-[#B08D45] text-[#1F0E1D] font-bold text-xs hover:bg-[#D6B875] transition-colors"
            >
              Go to My {mismatchedRole.toUpperCase()} Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full py-2.5 px-4 rounded-xl border border-[#665038] text-xs text-[#C9BBAF] hover:text-white"
            >
              Logout & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-[#1F0E1D] flex items-center justify-center text-[#D6B875]">
        <div className="text-center space-y-3">
          <Sparkles className="animate-spin mx-auto text-[#D6B875]" size={36} />
          <h2 className="text-xl font-serif font-bold text-[#F8F1E5]">Loading Your Couple Dashboard</h2>
          <p className="text-xs text-[#C9BBAF]">Synchronizing wedding plans, bookings, and vendor chats...</p>
        </div>
      </div>
    );
  }

  const { stats, bookings, wishlist, checklist, budget, enquiries, notifications } = dashboardData;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter !== "all" && (b.booking_status || "").toLowerCase() !== bookingFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.service_name?.toLowerCase().includes(q) ||
        b.vendor_name?.toLowerCase().includes(q) ||
        b.location?.toLowerCase().includes(q) ||
        b.id?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalBudgetEst = budget.reduce((acc, b) => acc + (Number(b.estimated) || 0), 0);
  const totalBudgetAct = budget.reduce((acc, b) => acc + (Number(b.actual) || 0), 0);
  const unreadNotifs = notifications?.filter((n) => !n.read)?.length || 0;

  return (
    <div className="min-h-screen bg-[#1A0B18] text-[#F8F1E5] flex flex-col lg:flex-row antialiased">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md transition-all ${
            toastMessage.type === "error"
              ? "bg-red-950/90 border-red-500 text-red-200"
              : "bg-[#321B30]/95 border-[#D6B875] text-[#D6B875]"
          }`}
        >
          {toastMessage.type === "error" ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* RESPONSIVE SIDEBAR NAVIGATION                                 */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#241321] border-r border-[#665038]/50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Couple Identifier */}
          <div className="p-6 border-b border-[#665038]/40">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-serif text-2xl font-bold tracking-wide text-[#F8F1E5] group-hover:text-[#D6B875] transition-colors">
                  Shubh<span className="text-[#D6B875]">Vivah</span>
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 text-[#C9BBAF] hover:text-[#F8F1E5]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-[10px] font-bold tracking-wider uppercase text-rose-300 flex items-center gap-1">
                <Heart size={11} className="fill-rose-300" /> Couple Portal #{user.id}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            {[
              { id: "overview", label: "Dashboard Overview", icon: Sparkles },
              { id: "profile", label: "My Wedding Profile", icon: Users },
              { id: "planning", label: "My Wedding Planning", icon: CheckSquare, badge: `${stats.completedTasks}/${stats.totalTasks}` },
              { id: "bookings", label: "My Bookings", icon: Calendar, badge: stats.totalBookings },
              { id: "wishlist", label: "My Wishlist", icon: Bookmark, badge: stats.wishlistCount },
              { id: "enquiries", label: "My Enquiries", icon: MessageSquare, badge: stats.totalEnquiries },
              { id: "notifications", label: "Notifications", icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : null },
              { id: "settings", label: "Account Security", icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#B08D45] text-[#1F0E1D] font-bold shadow-md shadow-[#B08D45]/20"
                      : "text-[#C9BBAF] hover:bg-[#321B30] hover:text-[#F8F1E5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? "text-[#1F0E1D]" : "text-[#D6B875]"} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-[#1F0E1D] text-[#D6B875]" : "bg-[#321B30] text-[#D6B875]"
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

        {/* Sidebar Footer User Box */}
        <div className="p-4 border-t border-[#665038]/40 space-y-3">
          <div className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/30 flex items-center justify-between">
            <div className="truncate max-w-[150px]">
              <p className="text-xs font-semibold text-[#F8F1E5] truncate">
                {user.bride_name && user.groom_name ? `${user.bride_name} & ${user.groom_name}` : user.name}
              </p>
              <p className="text-[10px] text-[#D6B875] truncate">{user.email}</p>
            </div>
            <Link
              href="/"
              target="_blank"
              title="Explore Website"
              className="p-1.5 rounded-lg bg-[#321B30] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
            >
              <ExternalLink size={14} />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/60 border border-red-800/40 text-xs font-bold text-red-200 hover:bg-red-900/80 transition-colors cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA                                             */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Navbar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#665038]/40 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#241321] border border-[#665038] text-[#D6B875]"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5] capitalize">
                  {activeTab === "overview" ? `Welcome, ${user.bride_name || user.name}!` : activeTab.replace("-", " ")}
                </h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold">
                  Profile {stats.profileCompletion}% Complete
                </span>
              </div>
              <p className="text-xs text-[#C9BBAF] mt-1">
                Wedding Date: <span className="text-[#D6B875] font-semibold">{user.wedding_date || "To be decided"}</span> • City: <span className="text-[#F8F1E5]">{profileForm.wedding_city}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions & Notification Bell */}
          <div className="flex items-center gap-3">
            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl border border-[#665038] bg-[#241321] text-[#D6B875] hover:bg-[#321B30] transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell size={18} />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#665038] bg-[#241321] p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#665038]/40 pb-2">
                    <h4 className="text-xs font-bold text-[#D6B875] uppercase tracking-wider">
                      Recent Notifications
                    </h4>
                    <span className="text-[10px] text-[#C9BBAF]">{notifications.length} total</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#C9BBAF] py-3 text-center">No new notifications</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-[#1A0B18] border border-[#665038]/30 text-xs space-y-1">
                          <p className="font-semibold text-[#F8F1E5]">{n.title}</p>
                          <p className="text-[11px] text-[#C9BBAF] line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("notifications");
                      setNotificationsOpen(false);
                    }}
                    className="w-full py-1.5 rounded-xl bg-[#321B30] text-[11px] font-bold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                  >
                    View All Notifications →
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/venues"
              className="px-3.5 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors"
            >
              Browse Venues & Vendors
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1: DASHBOARD OVERVIEW                                 */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 7 Summary Cards Requested */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D6B875] flex items-center gap-2">
                  <TrendingUp size={15} /> Wedding Overview & Key Metrics
                </h3>
                <span className="text-xs text-[#C9BBAF]">{stats.daysRemaining} days remaining</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
                {[
                  { label: "Profile Completion", value: `${stats.profileCompletion}%`, icon: Percent, color: "text-emerald-400" },
                  { label: "Total Bookings", value: stats.totalBookings, icon: Calendar, color: "text-sky-400" },
                  { label: "Upcoming Bookings", value: stats.upcomingBookings, icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Pending Requests", value: stats.pendingBookingRequests, icon: Clock, color: "text-amber-400" },
                  { label: "Saved Venues", value: stats.savedVenuesCount, icon: MapPin, color: "text-rose-400" },
                  { label: "Saved Vendors", value: stats.savedVendorsCount, icon: Users, color: "text-[#D6B875]" },
                  { label: "Total Enquiries", value: stats.totalEnquiries, icon: MessageSquare, color: "text-purple-400" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#241321] border border-[#665038]/50 hover:border-[#D6B875]/40 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-[#C9BBAF] font-medium leading-tight">{item.label}</span>
                        <Icon size={16} className={item.color} />
                      </div>
                      <p className="text-xl font-serif font-bold text-[#F8F1E5]">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Wedding Countdown & Checklist Progress Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Wedding Countdown Hero */}
              <div className="rounded-3xl border border-[#665038]/60 bg-gradient-to-br from-[#321B30] to-[#241321] p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6B875]">The Big Day</span>
                  <h4 className="text-xl font-serif font-bold text-[#F8F1E5] mt-1">Wedding Countdown</h4>
                  <p className="text-xs text-[#C9BBAF] mt-1">
                    {user.wedding_date ? `Scheduled for ${new Date(user.wedding_date).toDateString()}` : "Set your date in profile"}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-5 text-center">
                    <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/40">
                      <p className="text-2xl font-serif font-bold text-[#D6B875]">{stats.daysRemaining}</p>
                      <span className="text-[10px] text-[#C9BBAF] uppercase">Days</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/40">
                      <p className="text-2xl font-serif font-bold text-[#D6B875]">18</p>
                      <span className="text-[10px] text-[#C9BBAF] uppercase">Hours</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/40">
                      <p className="text-2xl font-serif font-bold text-[#D6B875]">45</p>
                      <span className="text-[10px] text-[#C9BBAF] uppercase">Mins</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#665038]/30 flex items-center justify-between text-xs">
                  <span className="text-[#C9BBAF]">Location: {profileForm.wedding_location || "Jaipur, Rajasthan"}</span>
                  <button onClick={() => setActiveTab("profile")} className="text-[#D6B875] hover:underline font-semibold">
                    Edit →
                  </button>
                </div>
              </div>

              {/* Planning Progress & Checklist Snapshot */}
              <div className="lg:col-span-2 rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#F8F1E5]">Wedding Planning Progress</h4>
                    <p className="text-xs text-[#C9BBAF]">
                      {stats.completedTasks} of {stats.totalTasks} essential checklist milestones completed
                    </p>
                  </div>
                  <span className="text-base font-bold text-emerald-400">{stats.planningProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#1A0B18] h-3 rounded-full overflow-hidden border border-[#665038]/30">
                  <div
                    className="h-full bg-gradient-to-r from-[#B08D45] to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${stats.planningProgress}%` }}
                  ></div>
                </div>

                {/* Checklist Preview */}
                <div className="space-y-2 pt-2">
                  {checklist.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleChecklist(task.id)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 cursor-pointer hover:border-[#D6B875]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Square size={16} className="text-[#C9BBAF] shrink-0" />
                        )}
                        <span className={`text-xs ${task.completed ? "line-through text-[#C9BBAF]" : "text-[#F8F1E5]"}`}>
                          {task.task}
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#321B30] text-[#D6B875]">
                        {task.category || "General"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setActiveTab("planning")}
                    className="text-xs font-semibold text-[#D6B875] hover:underline"
                  >
                    Open Full Wedding Planner & Budget Tracker →
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Bookings & Shortlisted Vendors Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
                  <h4 className="text-base font-serif font-bold text-[#F8F1E5]">My Active Wedding Bookings</h4>
                  <button onClick={() => setActiveTab("bookings")} className="text-xs text-[#D6B875] hover:underline">
                    View All ({bookings.length}) →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#C9BBAF] bg-[#1A0B18] rounded-2xl border border-[#665038]/30">
                    No active bookings. Browse{" "}
                    <Link href="/vendors" className="text-[#D6B875] underline">
                      vendors
                    </Link>{" "}
                    to secure your dates!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <p className="font-semibold text-[#F8F1E5]">{b.service_name}</p>
                          <p className="text-[11px] text-[#C9BBAF]">{b.vendor_name} • {b.wedding_date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#D6B875]">{b.amount}</p>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                              b.booking_status === "Confirmed"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500"
                                : "bg-amber-950 text-amber-300 border border-amber-500"
                            }`}
                          >
                            {b.booking_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shortlisted Venues & Vendors */}
              <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
                  <h4 className="text-base font-serif font-bold text-[#F8F1E5]">Shortlisted Wishlist</h4>
                  <button onClick={() => setActiveTab("wishlist")} className="text-xs text-[#D6B875] hover:underline">
                    View All ({wishlist.length}) →
                  </button>
                </div>

                {wishlist.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#C9BBAF] bg-[#1A0B18] rounded-2xl border border-[#665038]/30">
                    Your wishlist is empty. Tap the bookmark icon on any venue or vendor profile.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wishlist.slice(0, 3).map((w) => (
                      <div
                        key={w.id}
                        className="p-3.5 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-[#321B30] overflow-hidden shrink-0">
                            <img src={w.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"} alt="" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#F8F1E5]">{w.title}</p>
                            <p className="text-[11px] text-[#C9BBAF]">{w.category || w.item_type} • {w.location}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#D6B875] shrink-0">{w.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 2: MY PROFILE (COMPREHENSIVE EDITABLE)                */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "profile" && (
          <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#665038]/40 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">Couple Wedding Profile</h3>
                <p className="text-xs text-[#C9BBAF]">Personal details, bride & groom identity, wedding budget, and city details</p>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#665038] bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors cursor-pointer shrink-0"
              >
                {isEditingProfile ? <X size={14} /> : <Edit size={14} />}
                <span>{isEditingProfile ? "Cancel Editing" : "Edit Profile Details"}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Bride's Full Name *</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.bride_name}
                    onChange={(e) => setProfileForm({ ...profileForm, bride_name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Groom's Full Name *</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.groom_name}
                    onChange={(e) => setProfileForm({ ...profileForm, groom_name: e.target.value })}
                    placeholder="e.g. Aarav Singhania"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Email Address (Registered)</label>
                  <input
                    type="email"
                    disabled
                    value={profileForm.email}
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/40 text-xs text-[#C9BBAF] cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Mobile Number *</label>
                  <input
                    type="tel"
                    disabled={!isEditingProfile}
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Wedding Date *</label>
                  <input
                    type="date"
                    disabled={!isEditingProfile}
                    value={profileForm.wedding_date}
                    onChange={(e) => setProfileForm({ ...profileForm, wedding_date: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Wedding City *</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.wedding_city}
                    onChange={(e) => setProfileForm({ ...profileForm, wedding_city: e.target.value })}
                    placeholder="e.g. Udaipur, Jaipur, Delhi NCR"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Wedding Location / Venue</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.wedding_location}
                    onChange={(e) => setProfileForm({ ...profileForm, wedding_location: e.target.value })}
                    placeholder="e.g. The Oberoi Udaivilas, Lake Pichola"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Total Wedding Budget</label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.wedding_budget}
                    onChange={(e) => setProfileForm({ ...profileForm, wedding_budget: e.target.value })}
                    placeholder="e.g. ₹25,00,000"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#C9BBAF] mb-1 font-medium">Estimated Guests Count</label>
                  <input
                    type="number"
                    disabled={!isEditingProfile}
                    value={profileForm.guest_count}
                    onChange={(e) => setProfileForm({ ...profileForm, guest_count: e.target.value })}
                    placeholder="e.g. 350"
                    className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#C9BBAF] mb-1 font-medium">Wedding Event Types Planned</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileForm.event_types}
                  onChange={(e) => setProfileForm({ ...profileForm, event_types: e.target.value })}
                  placeholder="Haldi, Mehendi, Cocktail, Sangeet, Royal Pheras, Grand Reception"
                  className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] disabled:opacity-60 focus:border-[#D6B875] focus:outline-none"
                />
              </div>

              {isEditingProfile && (
                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] font-bold text-xs hover:bg-[#D6B875] transition-colors cursor-pointer"
                  >
                    <Save size={15} /> Save Changes to Database
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 3: MY WEDDING PLANNING (CHECKLIST + BUDGET TRACKER)   */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "planning" && (
          <div className="space-y-8">
            {/* Checklist Box */}
            <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#665038]/40 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">Interactive Wedding Checklist</h3>
                  <p className="text-xs text-[#C9BBAF]">
                    {stats.completedTasks} completed out of {stats.totalTasks} tasks ({stats.planningProgress}%)
                  </p>
                </div>

                <form onSubmit={handleAddChecklist} className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={newChecklistTask}
                    onChange={(e) => setNewChecklistTask(e.target.value)}
                    placeholder="Enter wedding planning task..."
                    className="px-3.5 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                  <select
                    value={newChecklistCategory}
                    onChange={(e) => setNewChecklistCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="Venue & Decor">Venue & Decor</option>
                    <option value="Photo & Cinema">Photo & Cinema</option>
                    <option value="Bridal Beauty">Bridal Beauty</option>
                    <option value="Invitations">Invitations</option>
                    <option value="Catering & Cake">Catering & Cake</option>
                    <option value="Music & DJ">Music & DJ</option>
                  </select>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors cursor-pointer shrink-0"
                  >
                    <Plus size={14} /> Add Task
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklist.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1A0B18] border border-[#665038]/40 hover:border-[#D6B875]/40 transition-colors"
                  >
                    <div
                      onClick={() => handleToggleChecklist(task.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      {task.completed ? (
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                      ) : (
                        <Square size={18} className="text-[#C9BBAF] shrink-0" />
                      )}
                      <span
                        className={`text-xs ${
                          task.completed ? "line-through text-[#C9BBAF]" : "text-[#F8F1E5] font-semibold"
                        }`}
                      >
                        {task.task}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#321B30] text-[#D6B875] border border-[#665038]/30">
                        {task.category || "Custom"}
                      </span>
                      <button
                        onClick={() => handleDeleteChecklist(task.id)}
                        className="text-[#C9BBAF] hover:text-red-400 p-1"
                        title="Remove Task"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Tracker Box */}
            <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#665038]/40 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">Wedding Budget Tracker</h3>
                  <p className="text-xs text-[#C9BBAF]">
                    Estimated Total: <span className="font-semibold text-[#F8F1E5]">₹{totalBudgetEst.toLocaleString("en-IN")}</span> •
                    Actual Spent: <span className="font-semibold text-[#D6B875]">₹{totalBudgetAct.toLocaleString("en-IN")}</span>
                  </p>
                </div>

                <form onSubmit={handleAddBudget} className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={newBudgetCategory}
                    onChange={(e) => setNewBudgetCategory(e.target.value)}
                    placeholder="Expense item (e.g. Mehndi Artist)"
                    className="px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                  <input
                    type="number"
                    value={newBudgetEstimated}
                    onChange={(e) => setNewBudgetEstimated(e.target.value)}
                    placeholder="Est ₹"
                    className="w-24 px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                  <input
                    type="number"
                    value={newBudgetActual}
                    onChange={(e) => setNewBudgetActual(e.target.value)}
                    placeholder="Act ₹"
                    className="w-24 px-3 py-1.5 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors cursor-pointer"
                  >
                    Add Expense
                  </button>
                </form>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A0B18] text-[#D6B875] uppercase text-[10px] tracking-wider border-b border-[#665038]/40">
                    <tr>
                      <th className="py-3 px-4">Service Category / Item</th>
                      <th className="py-3 px-4">Estimated (₹)</th>
                      <th className="py-3 px-4">Actual (₹)</th>
                      <th className="py-3 px-4">Variance</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#665038]/30">
                    {budget.map((item) => {
                      const diff = (Number(item.estimated) || 0) - (Number(item.actual) || 0);
                      return (
                        <tr key={item.id} className="hover:bg-[#321B30]/40">
                          <td className="py-3 px-4 font-semibold text-[#F8F1E5]">{item.category}</td>
                          <td className="py-3 px-4 text-[#C9BBAF]">
                            ₹{Number(item.estimated).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-4 text-[#D6B875] font-semibold">
                            ₹{Number(item.actual).toLocaleString("en-IN")}
                          </td>
                          <td
                            className={`py-3 px-4 font-bold ${
                              diff >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {diff >= 0 ? `+₹${diff.toLocaleString("en-IN")}` : `-₹${Math.abs(diff).toLocaleString("en-IN")}`}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteBudget(item.id)}
                              className="text-[#C9BBAF] hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4: MY BOOKINGS                                        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#241321] p-4 rounded-2xl border border-[#665038]/50">
              <div className="flex-1 flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-3 text-[#C9BBAF]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bookings..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <Link
                href="/vendors"
                className="px-3 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors shrink-0"
              >
                + Book New Service
              </Link>
            </div>

            <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A0B18] text-[#D6B875] uppercase text-[10px] tracking-wider border-b border-[#665038]/40">
                    <tr>
                      <th className="py-3 px-4">Booking ID</th>
                      <th className="py-3 px-4">Vendor / Venue</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Wedding Date</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Advance Paid</th>
                      <th className="py-3 px-4">Remaining</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#665038]/30">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-10 text-center text-[#C9BBAF]">
                          No bookings matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#321B30]/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-[#D6B875] font-semibold">{b.id}</td>
                          <td className="py-3 px-4 font-semibold text-[#F8F1E5]">{b.vendor_name}</td>
                          <td className="py-3 px-4 text-[#C9BBAF]">{b.service_category || "Service"}</td>
                          <td className="py-3 px-4 text-[#F8F1E5]">{b.wedding_date || "Confirmed on Call"}</td>
                          <td className="py-3 px-4 text-[#C9BBAF] truncate max-w-[140px]">{b.location}</td>
                          <td className="py-3 px-4 font-bold text-[#F8F1E5]">{b.amount}</td>
                          <td className="py-3 px-4 text-emerald-400 font-semibold">{b.advance_paid}</td>
                          <td className="py-3 px-4 text-amber-400 font-semibold">{b.remaining_amount}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                b.booking_status === "Confirmed"
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500"
                                  : b.booking_status === "Completed"
                                  ? "bg-sky-950 text-sky-300 border border-sky-500"
                                  : b.booking_status === "Cancelled"
                                  ? "bg-red-950 text-red-300 border border-red-500"
                                  : "bg-amber-950 text-amber-300 border border-amber-500"
                              }`}
                            >
                              {b.booking_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedBookingModal(b)}
                                className="px-2.5 py-1 rounded-lg bg-[#321B30] text-[11px] text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => setContactVendorModal(b)}
                                className="px-2.5 py-1 rounded-lg bg-[#321B30] text-[11px] text-[#F8F1E5] hover:bg-[#D6B875] hover:text-[#1F0E1D] transition-colors"
                              >
                                Message
                              </button>
                              {b.booking_status !== "Cancelled" && (
                                <button
                                  onClick={() => handleCancelBooking(b.id)}
                                  className="px-2.5 py-1 rounded-lg bg-red-950/80 text-[11px] text-red-300 hover:bg-red-900 transition-colors"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
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

        {/* ------------------------------------------------------------- */}
        {/* SECTION 5: MY WISHLIST                                        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">My Saved Wishlist</h3>
              <p className="text-xs text-[#C9BBAF]">Shortlisted heritage palaces, banquet halls, photographers, and makeup artists</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.length === 0 ? (
                <div className="col-span-full p-10 text-center text-[#C9BBAF] bg-[#241321] rounded-3xl border border-[#665038]/40">
                  Your wedding wishlist is empty. Bookmark your dream venues and vendors to save them here!
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-[#665038]/60 bg-[#241321] overflow-hidden shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-[#1A0B18]">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1F0E1D]/80 text-[#D6B875] text-[10px] font-bold uppercase backdrop-blur-md border border-[#D6B875]/40">
                          {item.category || item.item_type}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-serif font-bold text-base text-[#F8F1E5]">{item.title}</h4>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#D6B875]" /> {item.location}
                        </p>
                        <div className="pt-2 flex justify-between text-xs border-t border-[#665038]/30">
                          <span className="text-[#C9BBAF]">Starting From:</span>
                          <span className="font-bold text-[#D6B875]">{item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#1A0B18]/60 border-t border-[#665038]/40 flex items-center justify-between">
                      <Link
                        href={item.link || "/venues"}
                        className="text-xs font-semibold text-[#D6B875] hover:underline flex items-center gap-1"
                      >
                        Explore Details <ChevronRight size={13} />
                      </Link>
                      <button
                        onClick={() => handleRemoveWishlist(item.id)}
                        className="text-xs text-red-300 hover:text-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 6: MY ENQUIRIES                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">My Quotes & Vendor Enquiries</h3>
              <p className="text-xs text-[#C9BBAF]">Track inquiries sent to photographers, decorators, caterers, and planners</p>
            </div>

            <div className="space-y-4">
              {enquiries.length === 0 ? (
                <div className="p-10 text-center text-[#C9BBAF] bg-[#241321] rounded-3xl border border-[#665038]/40">
                  No enquiries sent yet. Inquire directly on any vendor's profile to receive personalized quotes here!
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-6 rounded-3xl border border-[#665038]/60 bg-[#241321] shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#665038]/30 pb-3">
                      <div>
                        <h4 className="font-semibold text-base text-[#F8F1E5]">
                          {enq.target_name || `Vendor #${enq.target_id}`}
                        </h4>
                        <p className="text-xs text-[#C9BBAF]">Service: {enq.service_or_product || "Wedding Service"}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            enq.status === "Replied"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500"
                              : "bg-amber-950 text-amber-300 border border-amber-500"
                          }`}
                        >
                          {enq.status || "Pending"}
                        </span>
                        <span className="text-xs text-[#C9BBAF]">
                          {new Date(enq.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#1A0B18] border border-[#665038]/30 text-xs">
                      <p className="font-semibold text-[#D6B875] mb-1">Your Inquiry Message:</p>
                      <p className="text-[#F8F1E5] italic">"{enq.message}"</p>
                    </div>

                    {enq.reply_message && (
                      <div className="p-3.5 rounded-2xl bg-[#321B30] border border-emerald-500/40 text-xs">
                        <p className="font-semibold text-emerald-400 mb-1">Vendor Response:</p>
                        <p className="text-[#F8F1E5]">{enq.reply_message}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 7: NOTIFICATIONS                                      */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">Wedding Notifications & Updates</h3>
              <p className="text-xs text-[#C9BBAF]">Booking confirmations, vendor replies, and wedding planning milestones</p>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-5 rounded-2xl border border-[#665038]/50 bg-[#241321] flex items-start gap-4 shadow-lg"
                >
                  <div className="p-2.5 rounded-xl bg-[#321B30] text-[#D6B875] border border-[#665038]/40 shrink-0 mt-0.5">
                    {n.type === "booking" ? <Calendar size={18} /> : n.type === "enquiry" ? <MessageSquare size={18} /> : <Sparkles size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#F8F1E5]">{n.title}</h4>
                      <span className="text-[11px] text-[#C9BBAF]">{new Date(n.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-[#C9BBAF] mt-1">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 8: ACCOUNT SECURITY & SETTINGS                        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "settings" && (
          <div className="rounded-3xl border border-[#665038]/60 bg-[#241321] p-6 sm:p-8 shadow-xl max-w-lg mx-auto space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">Account Security</h3>
              <p className="text-xs text-[#C9BBAF]">Update your account password</p>
            </div>

            {passwordFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  passwordFeedback.type === "success"
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-500"
                    : "bg-red-950 text-red-300 border border-red-500"
                }`}
              >
                {passwordFeedback.text}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#C9BBAF] mb-1 font-medium">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div>
                <label className="block text-[#C9BBAF] mb-1 font-medium">New Password (minimum 6 characters)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div>
                <label className="block text-[#C9BBAF] mb-1 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] font-bold text-xs hover:bg-[#D6B875] transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: VIEW BOOKING DETAILS                                   */}
      {/* ------------------------------------------------------------- */}
      {selectedBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-3xl border border-[#665038] bg-[#241321] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
              <h3 className="text-base font-serif font-bold text-[#F8F1E5]">
                Booking #{selectedBookingModal.id}
              </h3>
              <button
                onClick={() => setSelectedBookingModal(null)}
                className="text-[#C9BBAF] hover:text-[#F8F1E5]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Service Name:</span>
                <span className="font-semibold text-[#F8F1E5]">{selectedBookingModal.service_name}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Vendor:</span>
                <span className="font-semibold text-[#F8F1E5]">{selectedBookingModal.vendor_name}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Event Date:</span>
                <span className="font-semibold text-[#D6B875]">{selectedBookingModal.wedding_date}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Event Location:</span>
                <span className="font-semibold text-[#F8F1E5]">{selectedBookingModal.location}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Total Amount:</span>
                <span className="font-bold text-[#F8F1E5]">{selectedBookingModal.amount}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Advance Paid:</span>
                <span className="font-bold text-emerald-400">{selectedBookingModal.advance_paid}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Remaining Balance:</span>
                <span className="font-bold text-amber-400">{selectedBookingModal.remaining_amount}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1A0B18]">
                <span className="text-[#C9BBAF]">Booking Status:</span>
                <span className="font-bold text-[#D6B875]">{selectedBookingModal.booking_status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#665038]/40">
              <button
                onClick={() => setSelectedBookingModal(null)}
                className="px-4 py-2 rounded-xl bg-[#321B30] text-xs font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: CONTACT VENDOR                                         */}
      {/* ------------------------------------------------------------- */}
      {contactVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-3xl border border-[#665038] bg-[#241321] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#665038]/40 pb-3">
              <h3 className="text-base font-serif font-bold text-[#F8F1E5]">
                Contact {contactVendorModal.vendor_name}
              </h3>
              <button
                onClick={() => setContactVendorModal(null)}
                className="text-[#C9BBAF] hover:text-[#F8F1E5]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#C9BBAF]">
              Concerning: <span className="text-[#D6B875] font-semibold">{contactVendorModal.service_name}</span> (Booking #{contactVendorModal.id})
            </p>

            <textarea
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Send a direct message or inquiry to your vendor regarding timeline, venue access, or specific requirements..."
              className="w-full p-3 rounded-2xl bg-[#1A0B18] border border-[#665038]/60 text-xs text-[#F8F1E5] placeholder-[#C9BBAF] focus:outline-none focus:border-[#D6B875]"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setContactVendorModal(null)}
                className="px-4 py-2 rounded-xl border border-[#665038] text-xs text-[#C9BBAF]"
              >
                Cancel
              </button>
              <button
                onClick={handleSendVendorEnquiry}
                className="px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:bg-[#D6B875] transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
