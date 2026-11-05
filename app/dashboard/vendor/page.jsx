"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Layers,
  CalendarCheck,
  CalendarDays,
  Calendar,
  Star,
  IndianRupee,
  Sparkles,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Camera,
  Check,
  Ban,
  MessageSquare,
  Lock,
  Menu,
  Search,
  Bell,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  Users,
  Filter,
  Eye,
  Globe,
  Building2,
  CheckSquare,
  XCircle,
  Send,
} from "lucide-react";

export default function VendorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mismatchedRole, setMismatchedRole] = useState(null);

  // Active Tab & Layout
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Live Data State
  const [stats, setStats] = useState({});
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");

  // Modals
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [viewServiceModal, setViewServiceModal] = useState(null);
  const [viewBookingModal, setViewBookingModal] = useState(null);
  const [contactCoupleModal, setContactCoupleModal] = useState(null);
  const [replyEnquiryModal, setReplyEnquiryModal] = useState(null);
  const [enquiryReplyText, setEnquiryReplyText] = useState("");

  // Forms
  const [profileForm, setProfileForm] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
    category: "Photographer",
    address: "",
    city: "",
    state: "Rajasthan",
    pincode: "313001",
    service_locations: "Udaipur, Jaipur, Jodhpur, Pan India",
    experience_years: "8",
    website: "https://shubhvivah.com",
    instagram: "@royalheritagecaptures",
    bio: "",
    avatar_url: "",
  });

  const [serviceForm, setServiceForm] = useState({
    id: null,
    name: "",
    category: "Photographer",
    price: "",
    pricing_type: "Starting From",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityReason, setAvailabilityReason] = useState("Booked for Wedding Ceremony");

  const [reviewReplyId, setReviewReplyId] = useState(null);
  const [reviewReplyText, setReviewReplyText] = useState("");

  // Password Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (text, type = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Load Vendor Dashboard Data
  const loadVendorData = async () => {
    try {
      const res = await fetch("/api/dashboard/vendor");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
        setServices(data.services || []);
        setBookings(data.bookings || []);
        setReviews(data.reviews || []);
        setEnquiries(data.enquiries || []);
        setTransactions(data.transactions || []);
        setAvailability(data.availability || []);
        setNotifications(data.notifications || []);
        if (data.user) {
          setUser(data.user);
          setProfileForm({
            name: data.user.name || "",
            business_name: data.user.business_name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            category: data.user.category || "Photographer",
            address: data.user.address || "",
            city: data.user.city || "Udaipur",
            state: data.user.state || "Rajasthan",
            pincode: data.user.pincode || "313001",
            service_locations: data.user.service_locations || "Udaipur, Jaipur, Jodhpur, Pan India",
            experience_years: String(data.user.experience_years || "8"),
            website: data.user.website || "https://shubhvivah.com",
            instagram: data.user.instagram || "@royalheritagecaptures",
            bio: data.user.bio || "",
            avatar_url: data.user.avatar_url || "",
          });
        }
      }
    } catch (err) {
      console.error("Error loading vendor data:", err);
    }
  };

  // 2. Auth Guard
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.authenticated || !data.user) {
          router.push("/login?type=vendor");
          return;
        }

        if (data.user.user_type !== "vendor" && data.user.user_type !== "admin") {
          setMismatchedRole(data.user.user_type);
          setUser(data.user);
          setLoading(false);
          return;
        }

        setUser(data.user);
        await loadVendorData();
        setLoading(false);
      } catch {
        router.push("/login?type=vendor");
      }
    }
    checkAuth();
  }, [router]);

  // 3. Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login?type=vendor");
    } catch {
      router.push("/login");
    }
  };

  // 4. Profile Save
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
        showToast("Vendor profile updated successfully!");
        setIsEditingProfile(false);
        loadVendorData();
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch {
      showToast("Error saving profile", "error");
    }
  };

  // 5. Service Handlers (Add / Edit / Delete / Toggle)
  const handleOpenAddService = () => {
    setServiceForm({
      id: null,
      name: "",
      category: profileForm.category || "Photographer",
      price: "",
      pricing_type: "Starting From",
      location: profileForm.city || "Udaipur, Rajasthan",
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    });
    setServiceModal(true);
  };

  const handleOpenEditService = (service) => {
    setServiceForm({
      id: service.id,
      name: service.name || "",
      category: service.category || "Photographer",
      price: service.price || "",
      pricing_type: service.pricing_type || "Starting From",
      location: service.location || "",
      description: service.description || "",
      imageUrl: service.imageUrl || service.images?.[0] || "",
    });
    setServiceModal(true);
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.price.trim()) {
      showToast("Service name and pricing are required.", "error");
      return;
    }
    try {
      const method = serviceForm.id ? "PUT" : "POST";
      const payload = {
        ...serviceForm,
        images: serviceForm.imageUrl ? [serviceForm.imageUrl] : [],
      };
      const res = await fetch("/api/dashboard/vendor/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast(serviceForm.id ? "Service updated successfully!" : "Service listing created successfully!");
        setServiceModal(false);
        loadVendorData();
      } else {
        showToast(data.message || "Failed to save service", "error");
      }
    } catch {
      showToast("Error saving service", "error");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this wedding service listing?")) return;
    try {
      const res = await fetch(`/api/dashboard/vendor/services?id=${serviceId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Service listing deleted.");
        loadVendorData();
      } else {
        showToast(data.message || "Could not delete service", "error");
      }
    } catch {
      showToast("Error deleting service", "error");
    }
  };

  // 6. Booking Actions (Accept, Reject, Complete)
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch("/api/dashboard/vendor/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Booking #${bookingId} marked as ${newStatus}!`);
        if (viewBookingModal && viewBookingModal.id === bookingId) {
          setViewBookingModal((prev) => ({ ...prev, booking_status: newStatus }));
        }
        loadVendorData();
      } else {
        showToast(data.message || "Could not update booking", "error");
      }
    } catch {
      showToast("Error updating booking", "error");
    }
  };

  // 7. Availability Handlers (Mark date unavailable / unblock)
  const handleAddUnavailableDate = async (e) => {
    e.preventDefault();
    if (!availabilityDate) {
      showToast("Please choose a date to block.", "error");
      return;
    }
    try {
      const res = await fetch("/api/dashboard/vendor/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: availabilityDate,
          reason: availabilityReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Date ${availabilityDate} marked as unavailable.`);
        setAvailabilityDate("");
        loadVendorData();
      } else {
        showToast(data.message || "Could not block date", "error");
      }
    } catch {
      showToast("Error blocking date", "error");
    }
  };

  const handleRemoveUnavailableDate = async (date) => {
    try {
      const res = await fetch(`/api/dashboard/vendor/availability?date=${date}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Date ${date} is now available for bookings.`);
        loadVendorData();
      } else {
        showToast(data.message || "Could not remove block", "error");
      }
    } catch {
      showToast("Error updating availability", "error");
    }
  };

  // 8. Enquiry Reply
  const handleSendEnquiryReply = async (e) => {
    e.preventDefault();
    if (!replyEnquiryModal || !enquiryReplyText.trim()) return;
    try {
      const res = await fetch("/api/dashboard/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryId: replyEnquiryModal.id,
          replyMessage: enquiryReplyText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reply sent to couple successfully!");
        setReplyEnquiryModal(null);
        setEnquiryReplyText("");
        loadVendorData();
      } else {
        showToast(data.message || "Could not send reply", "error");
      }
    } catch {
      showToast("Error sending reply", "error");
    }
  };

  // 9. Review Reply
  const handleSendReviewReply = async (reviewId) => {
    if (!reviewReplyText.trim()) return;
    try {
      const res = await fetch("/api/dashboard/vendor/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId,
          replyText: reviewReplyText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Your response to the review has been published.");
        setReviewReplyId(null);
        setReviewReplyText("");
        loadVendorData();
      } else {
        showToast(data.message || "Failed to publish reply", "error");
      }
    } catch {
      showToast("Error posting reply", "error");
    }
  };

  // 10. Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordFeedback(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordFeedback({ type: "error", message: "Please fill in all password fields." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ type: "error", message: "New password must be at least 6 characters." });
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
        setPasswordFeedback({ type: "success", message: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordFeedback({ type: "error", message: data.message || "Failed to update password." });
      }
    } catch {
      setPasswordFeedback({ type: "error", message: "Server error updating password." });
    }
  };

  // Filtered Services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchSearch =
        (s.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.location || "").toLowerCase().includes(searchQuery.toLowerCase());
      const sStatus = (s.status || "active").toLowerCase();
      if (serviceFilter === "all") return matchSearch;
      if (serviceFilter === "active") return matchSearch && (sStatus === "active" || sStatus === "approved");
      if (serviceFilter === "pending") return matchSearch && sStatus === "pending";
      if (serviceFilter === "rejected") return matchSearch && sStatus === "rejected";
      return matchSearch;
    });
  }, [services, searchQuery, serviceFilter]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        (b.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.couple_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.service_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.location || "").toLowerCase().includes(searchQuery.toLowerCase());
      const bStatus = (b.booking_status || "Pending").toLowerCase();
      if (bookingFilter === "all") return matchSearch;
      return matchSearch && bStatus === bookingFilter.toLowerCase();
    });
  }, [bookings, searchQuery, bookingFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#140A13] flex flex-col items-center justify-center text-[#F8F1E5]">
        <div className="w-16 h-16 border-4 border-[#B08D45]/30 border-t-[#D6B875] rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#C9BBAF] font-serif tracking-widest uppercase">
          Loading ShubhVivah Vendor Portal...
        </p>
      </div>
    );
  }

  // Mismatched Role Warning
  if (mismatchedRole) {
    return (
      <div className="min-h-screen bg-[#140A13] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1F0E1D] border border-[#B08D45]/40 rounded-2xl p-6 text-center text-[#F8F1E5] shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-[#E5C583] mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[#E5C583] mb-2">Role Mismatch</h2>
          <p className="text-[#C9BBAF] text-sm mb-6">
            You are currently logged in as a{" "}
            <span className="font-bold text-[#E5C583] uppercase">{mismatchedRole}</span>. This portal is exclusively
            designed for verified ShubhVivah wedding vendors.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/dashboard/${mismatchedRole}`}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-medium hover:opacity-90 transition-all text-sm"
            >
              Go to My {mismatchedRole.toUpperCase()} Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-lg border border-[#B08D45]/40 text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#241321] transition-all text-sm"
            >
              Logout & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#140A13] text-[#F8F1E5] flex font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium border backdrop-blur-md transition-all ${
            toastMessage.type === "error"
              ? "bg-rose-950/90 text-rose-200 border-rose-600/40"
              : "bg-[#241321]/95 text-[#E5C583] border-[#B08D45]/60"
          }`}
        >
          {toastMessage.type === "error" ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : <Sparkles className="w-5 h-5 text-[#E5C583]" />}
          {toastMessage.text}
        </div>
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1F0E1D] border-r border-[#B08D45]/25 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo / Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#B08D45]/20">
            <Link href="/" className="flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-[#D6B875]" />
              <div>
                <span className="text-xl font-serif font-bold text-[#E5C583] tracking-wide block">
                  ShubhVivah
                </span>
                <span className="text-[10px] tracking-widest text-[#B08D45] uppercase block -mt-1 font-medium">
                  Vendor Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#C9BBAF] hover:text-[#F8F1E5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-[#241321]/80 border border-[#B08D45]/25 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#B08D45] to-[#78561C] flex items-center justify-center text-lg font-serif font-bold text-[#F8F1E5] shadow-inner">
              {(user?.business_name || user?.name || "V").charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-[#B08D45] uppercase tracking-wider font-semibold">Vendor Partner</p>
              <p className="text-sm font-medium text-[#F8F1E5] truncate">
                {user?.business_name || user?.name || "Royal Partner"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] text-emerald-400 font-medium">Verified Vendor</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 text-sm">
            {[
              { id: "overview", label: "Overview", icon: Layers },
              { id: "profile", label: "My Vendor Profile", icon: Building2 },
              { id: "services", label: "My Services", icon: Briefcase, badge: services.length },
              { id: "bookings", label: "My Bookings", icon: CalendarCheck, badge: stats.pendingBookings || bookings.length },
              { id: "availability", label: "Availability Calendar", icon: CalendarDays },
              { id: "enquiries", label: "Customer Enquiries", icon: MessageSquare, badge: enquiries.length },
              { id: "reviews", label: "Reviews & Ratings", icon: Star, badge: stats.avgRating ? `${stats.avgRating} ★` : null },
              { id: "payments", label: "Payments & Earnings", icon: IndianRupee },
              { id: "security", label: "Account Security", icon: Lock },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#B08D45]/30 to-[#B08D45]/10 text-[#E5C583] border border-[#B08D45]/40 font-semibold"
                      : "text-[#C9BBAF] hover:bg-[#241321]/60 hover:text-[#F8F1E5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#E5C583]" : "text-[#B08D45]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge !== null && item.badge !== 0 && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-[#E5C583] text-[#1F0E1D]"
                          : "bg-[#241321] text-[#E5C583] border border-[#B08D45]/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#B08D45]/20 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium text-[#C9BBAF] hover:text-[#E5C583] hover:bg-[#241321]/50 transition-all border border-transparent hover:border-[#B08D45]/20"
          >
            <Globe className="w-4 h-4" />
            <span>Visit ShubhVivah Home</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-800/40 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-20 bg-[#1F0E1D]/90 backdrop-blur-md border-b border-[#B08D45]/25 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#241321]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B08D45]" />
              <input
                type="text"
                placeholder="Search services, bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none focus:border-[#D6B875]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Add Service Button */}
            <button
              onClick={handleOpenAddService}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold shadow-md hover:brightness-110 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Service</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full bg-[#241321] text-[#E5C583] hover:text-white border border-[#B08D45]/30"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#1F0E1D] border border-[#B08D45]/40 rounded-2xl shadow-2xl p-4 text-xs z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#B08D45]/20 mb-2">
                    <span className="font-semibold text-[#E5C583]">Vendor Notifications</span>
                    <span className="text-[10px] text-[#C9BBAF]">{notifications.length} alerts</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center py-4 text-[#C9BBAF]/70">No new alerts.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-[#241321]/60 border border-[#B08D45]/15"
                        >
                          <p className="font-medium text-[#F8F1E5]">{n.title}</p>
                          <p className="text-[#C9BBAF] text-[11px] mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <div
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-2 cursor-pointer pl-2 py-1 pr-3 rounded-full bg-[#241321] border border-[#B08D45]/30 hover:border-[#D6B875] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold text-xs flex items-center justify-center">
                {(user?.business_name || user?.name || "V").charAt(0)}
              </div>
              <span className="text-xs font-medium text-[#F8F1E5] hidden md:inline max-w-[120px] truncate">
                {user?.business_name || user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* ---------------- MAIN BODY CONTENT ---------------- */}
        <main className="p-4 md:p-8 flex-1 space-y-8">
          {/* ==================== 1. OVERVIEW TAB ==================== */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Royal Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2B1428] via-[#1F0E1D] to-[#361A32] border border-[#B08D45]/40 p-6 md:p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#B08D45]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B08D45]/20 border border-[#B08D45]/40 text-[#E5C583] text-xs font-semibold mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ShubhVivah Official Vendor Portal</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#F8F1E5]">
                      Welcome, <span className="text-[#E5C583]">{user?.business_name || user?.name || "Partner"}</span>
                    </h1>
                    <p className="text-sm text-[#C9BBAF] mt-1 max-w-xl">
                      Monitor your luxury wedding services, pending booking requests, client enquiries, and seasonal calendar bookings.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleOpenAddService}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="px-4 py-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/40 text-[#E5C583] font-semibold text-xs hover:bg-[#2B1428] flex items-center gap-2 transition-all"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>View Bookings</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 12 SUMMARY KPI CARDS */}
              <div>
                <h2 className="text-lg font-serif font-semibold text-[#E5C583] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#B08D45]" />
                  <span>Business Performance & Services Overview</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Total Services Listed", value: stats.totalServices || services.length, icon: Briefcase, color: "text-[#E5C583]" },
                    { title: "Active Services", value: stats.activeServices || 0, icon: CheckCircle2, color: "text-emerald-400" },
                    { title: "Pending Services", value: stats.pendingServices || 0, icon: Clock, color: "text-amber-400" },
                    { title: "Rejected Services", value: stats.rejectedServices || 0, icon: XCircle, color: "text-rose-400" },
                    { title: "Total Bookings", value: stats.totalBookings || bookings.length, icon: CalendarCheck, color: "text-[#E5C583]" },
                    { title: "Pending Bookings", value: stats.pendingBookings || 0, icon: AlertTriangle, color: "text-amber-400" },
                    { title: "Confirmed Bookings", value: stats.confirmedBookings || 0, icon: CheckSquare, color: "text-emerald-400" },
                    { title: "Upcoming Bookings", value: stats.upcomingBookings || 0, icon: Calendar, color: "text-blue-400" },
                    { title: "Completed Bookings", value: stats.completedBookings || 0, icon: Check, color: "text-teal-400" },
                    { title: "Total Earnings", value: stats.totalEarnings || "₹0", icon: IndianRupee, color: "text-[#E5C583]" },
                    { title: "Pending Payments", value: stats.pendingPayments || "₹0", icon: Clock, color: "text-amber-300" },
                    { title: "Customer Enquiries", value: stats.customerEnquiries || enquiries.length, icon: MessageSquare, color: "text-purple-300" },
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/25 hover:border-[#B08D45]/60 transition-all shadow-md group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#C9BBAF] font-medium leading-tight">{card.title}</span>
                          <div className="p-2 rounded-lg bg-[#241321] group-hover:scale-110 transition-transform">
                            <Icon className={`w-4 h-4 ${card.color}`} />
                          </div>
                        </div>
                        <div className={`text-xl font-serif font-bold ${card.color}`}>{card.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RECENT BOOKINGS & ENQUIRIES PREVIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bookings Preview */}
                <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/25 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B08D45]/20">
                    <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-[#B08D45]" />
                      <span>Recent Wedding Booking Requests</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs text-[#E5C583] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {bookings.length === 0 ? (
                    <p className="text-xs text-[#C9BBAF]/70 py-8 text-center">No bookings received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          className="p-3 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#F8F1E5]">{b.couple_name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#B08D45]/15 text-[#E5C583] border border-[#B08D45]/25">
                                #{b.id}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#C9BBAF] mt-0.5">{b.service_name}</p>
                            <p className="text-[11px] text-[#B08D45]">Wedding: {b.wedding_date || "TBD"}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#E5C583] block">{b.amount}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${
                                (b.booking_status || "").toLowerCase() === "confirmed"
                                  ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                  : (b.booking_status || "").toLowerCase() === "completed"
                                  ? "bg-teal-950/70 text-teal-300 border border-teal-500/30"
                                  : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {b.booking_status || "Pending"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enquiries Preview */}
                <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/25 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B08D45]/20">
                    <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#B08D45]" />
                      <span>Recent Client Enquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("enquiries")}
                      className="text-xs text-[#E5C583] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {enquiries.length === 0 ? (
                    <p className="text-xs text-[#C9BBAF]/70 py-8 text-center">No enquiries yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map((e) => (
                        <div
                          key={e.id}
                          className="p-3 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#F8F1E5]">
                              {e.couple_name || e.user_name || "Wedding Client"}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                e.reply_message
                                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                                  : "bg-amber-950/60 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {e.reply_message ? "Replied" : "Pending Reply"}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#C9BBAF] line-clamp-2">{e.message}</p>
                          <div className="flex items-center justify-between text-[10px] text-[#B08D45] pt-1">
                            <span>Phone: {e.couple_phone || e.phone || "On Request"}</span>
                            <span>{new Date(e.created_at || Date.now()).toLocaleDateString("en-IN")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. MY VENDOR PROFILE TAB ==================== */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">My Vendor Profile</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Your official business credentials, service specialties, and contact channels.
                  </p>
                </div>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-md"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl bg-[#241321] border border-[#B08D45]/40 text-[#C9BBAF] text-xs font-semibold hover:text-white"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              {/* Profile Card & Form */}
              <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl p-6 md:p-8 shadow-xl">
                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Vendor Contact Person Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Official Business Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.business_name}
                          onChange={(e) => setProfileForm({ ...profileForm, business_name: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Primary Service Category *
                        </label>
                        <select
                          value={profileForm.category}
                          onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        >
                          <option value="Photographer">Photographer & Cinematographer</option>
                          <option value="Makeup Artist">Bridal Makeup & Hair Stylist</option>
                          <option value="Wedding Decorator">Wedding Decor & Mandap Setup</option>
                          <option value="Mehndi Artist">Bridal Mehndi Artist</option>
                          <option value="Banquet & Venue">Banquet Hall & Heritage Venue</option>
                          <option value="Catering & Feast">Royal Wedding Catering & Feasts</option>
                          <option value="DJ & Entertainment">DJ, Live Band & Sound Systems</option>
                          <option value="Choreographer">Sangeet Choreographer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Years of Industry Experience
                        </label>
                        <input
                          type="text"
                          value={profileForm.experience_years}
                          onChange={(e) => setProfileForm({ ...profileForm, experience_years: e.target.value })}
                          placeholder="e.g. 8 years"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          State & Pincode
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="State"
                            value={profileForm.state}
                            onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                            className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-2.5 text-xs text-[#F8F1E5]"
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={profileForm.pincode}
                            onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                            className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-2.5 text-xs text-[#F8F1E5]"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Service Locations & Coverage Areas
                        </label>
                        <input
                          type="text"
                          value={profileForm.service_locations}
                          onChange={(e) => setProfileForm({ ...profileForm, service_locations: e.target.value })}
                          placeholder="e.g. Udaipur, Jaipur, Jodhpur, Delhi NCR, Pan India"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Studio / Office Address
                        </label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Official Website Link
                        </label>
                        <input
                          type="url"
                          value={profileForm.website}
                          onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Instagram / Social Handle
                        </label>
                        <input
                          type="text"
                          value={profileForm.instagram}
                          onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                          placeholder="@instagram_handle"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Business Bio & Brand Description
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          placeholder="Describe your craft, royal wedding packages, and brand philosophy..."
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#B08D45]/20">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-5 py-2.5 rounded-xl border border-[#B08D45]/40 text-[#C9BBAF] text-xs font-semibold hover:text-[#F8F1E5]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow-lg flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Profile Changes</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8">
                    {/* Top Identity Block */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#B08D45]/20">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#B08D45] to-[#78561C] flex items-center justify-center text-3xl font-serif font-bold text-[#F8F1E5] shadow-lg border border-[#B08D45]/40">
                        {(user?.business_name || user?.name || "V").charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">
                            {user?.business_name || "Royal Heritage Captures"}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified ShubhVivah Partner</span>
                          </span>
                        </div>
                        <p className="text-xs text-[#E5C583] font-medium">
                          {user?.category || profileForm.category} Specialist • {profileForm.experience_years} Years Experience
                        </p>
                        <p className="text-xs text-[#C9BBAF] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B08D45]" />
                          <span>{profileForm.city || "Udaipur"}, {profileForm.state || "Rajasthan"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Detailed Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Contact Person</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.name || user?.name}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Email Address</span>
                        <p className="text-sm font-medium text-[#F8F1E5] truncate">{profileForm.email || user?.email}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Phone / WhatsApp</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.phone || user?.phone || "+91 9876543210"}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Coverage Locations</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.service_locations}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Website</span>
                        <a
                          href={profileForm.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[#E5C583] hover:underline flex items-center gap-1 truncate"
                        >
                          <span>{profileForm.website}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Instagram</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.instagram}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1 md:col-span-2">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Business Studio Address</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.address || "Heritage Lane, Lake Pichola Road, Udaipur"}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Pincode</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.pincode}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1 md:col-span-3">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Brand Bio & Specialties</span>
                        <p className="text-xs text-[#C9BBAF] leading-relaxed">
                          {profileForm.bio ||
                            "Specializing in royal Rajasthani palace weddings, candid bridal portraits, multi-day cinematic wedding documentaries, and pre-wedding shoots with drone coverage."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 3. MY SERVICES / LISTINGS TAB ==================== */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">My Wedding Services & Packages</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Manage service catalogs, pricing tiers, coverage packages, and availability.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddService}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-md w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 pb-2">
                {["all", "active", "pending", "rejected"].map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setServiceFilter(flt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                      serviceFilter === flt
                        ? "bg-[#E5C583] text-[#1F0E1D] font-bold shadow-md"
                        : "bg-[#1F0E1D] text-[#C9BBAF] border border-[#B08D45]/30 hover:border-[#D6B875]"
                    }`}
                  >
                    {flt} ({flt === "all" ? services.length : services.filter((s) => (s.status || "active").toLowerCase() === flt).length})
                  </button>
                ))}
              </div>

              {/* Services Grid */}
              {filteredServices.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20">
                  <Briefcase className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-3" />
                  <p className="text-[#C9BBAF] font-serif text-base">No services found in this category.</p>
                  <p className="text-xs text-[#C9BBAF]/60 mt-1">Add your wedding packages to start receiving bookings.</p>
                  <button
                    onClick={handleOpenAddService}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold"
                  >
                    + Create First Service
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#D6B875] transition-all"
                    >
                      {/* Image / Header */}
                      <div className="relative h-44 w-full bg-[#241321] overflow-hidden">
                        <img
                          src={
                            service.imageUrl ||
                            service.images?.[0] ||
                            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E1D] via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1F0E1D]/80 backdrop-blur-md text-[#E5C583] border border-[#B08D45]/40">
                          {service.category || "Wedding Service"}
                        </span>
                        <span
                          className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
                            (service.status || "active").toLowerCase() === "active" ||
                            (service.status || "").toLowerCase() === "approved"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : (service.status || "").toLowerCase() === "pending"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                          }`}
                        >
                          {(service.status || "active").toUpperCase()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#F8F1E5] line-clamp-1">
                            {service.name}
                          </h3>
                          <p className="text-xs text-[#B08D45] flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{service.location || "Pan India"}</span>
                          </p>
                          <p className="text-xs text-[#C9BBAF] mt-2 line-clamp-2">
                            {service.description || "Premium wedding service with royal hospitality and experience."}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
                            <div>
                              <span className="text-[10px] text-[#B08D45] block uppercase font-medium">Pricing</span>
                              <span className="text-base font-bold text-[#E5C583]">
                                {service.price || "₹50,000"}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#C9BBAF]">{service.pricing_type || "Per Day"}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-3 gap-2 pt-3">
                            <button
                              onClick={() => setViewServiceModal(service)}
                              className="py-1.5 rounded-lg bg-[#241321] text-[#E5C583] hover:bg-[#2B1428] text-xs font-semibold border border-[#B08D45]/30 flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleOpenEditService(service)}
                              className="py-1.5 rounded-lg bg-[#241321] text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#2B1428] text-xs font-semibold border border-[#B08D45]/30 flex items-center justify-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="py-1.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-950/80 text-xs font-semibold border border-rose-800/40 flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== 4. MY BOOKINGS TAB ==================== */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">Wedding Booking Requests</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Review incoming couple booking inquiries, confirm schedules, and track payment deposits.
                  </p>
                </div>
                {/* Status Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  {["all", "pending", "confirmed", "completed", "cancelled"].map((flt) => (
                    <button
                      key={flt}
                      onClick={() => setBookingFilter(flt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                        bookingFilter === flt
                          ? "bg-[#E5C583] text-[#1F0E1D] font-bold shadow-md"
                          : "bg-[#1F0E1D] text-[#C9BBAF] border border-[#B08D45]/30 hover:border-[#D6B875]"
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table Card */}
              <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#F8F1E5]">
                    <thead className="bg-[#241321] text-[#E5C583] font-serif uppercase tracking-wider text-[11px] border-b border-[#B08D45]/25">
                      <tr>
                        <th className="py-4 px-4">Booking ID</th>
                        <th className="py-4 px-4">Couple Name</th>
                        <th className="py-4 px-4">Service</th>
                        <th className="py-4 px-4">Wedding Date</th>
                        <th className="py-4 px-4">Location</th>
                        <th className="py-4 px-4">Total Amount</th>
                        <th className="py-4 px-4">Advance Paid</th>
                        <th className="py-4 px-4">Remaining</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B08D45]/15">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="py-12 text-center text-[#C9BBAF]/70">
                            No bookings match your current filter.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-[#241321]/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#E5C583]">#{b.id}</td>
                            <td className="py-3.5 px-4 font-medium">
                              <div>{b.couple_name}</div>
                              <div className="text-[10px] text-[#C9BBAF]">{b.couple_phone || b.couple_email}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-[160px] truncate">{b.service_name}</td>
                            <td className="py-3.5 px-4 text-[#B08D45] font-medium">{b.wedding_date || "TBD"}</td>
                            <td className="py-3.5 px-4 text-[#C9BBAF] max-w-[140px] truncate">{b.location}</td>
                            <td className="py-3.5 px-4 font-bold text-[#F8F1E5]">{b.amount}</td>
                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">{b.advance_paid}</td>
                            <td className="py-3.5 px-4 text-amber-300 font-semibold">{b.remaining_amount}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  (b.booking_status || "").toLowerCase() === "confirmed"
                                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                    : (b.booking_status || "").toLowerCase() === "completed"
                                    ? "bg-teal-950/70 text-teal-300 border border-teal-500/30"
                                    : (b.booking_status || "").toLowerCase() === "rejected" ||
                                      (b.booking_status || "").toLowerCase() === "cancelled"
                                    ? "bg-rose-950/70 text-rose-300 border border-rose-500/30"
                                    : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {b.booking_status || "Pending"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setViewBookingModal(b)}
                                  className="p-1.5 rounded-lg bg-[#241321] text-[#E5C583] hover:bg-[#2B1428] border border-[#B08D45]/30"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                {(b.booking_status || "").toLowerCase() === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(b.id, "Confirmed")}
                                      className="px-2 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-semibold"
                                      title="Confirm Booking"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(b.id, "Rejected")}
                                      className="px-2 py-1 rounded-lg bg-rose-800/60 hover:bg-rose-700 text-white text-[11px] font-semibold"
                                      title="Reject Booking"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                {(b.booking_status || "").toLowerCase() === "confirmed" && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, "Completed")}
                                    className="px-2 py-1 rounded-lg bg-teal-700/80 hover:bg-teal-600 text-white text-[11px] font-semibold"
                                    title="Mark as Completed"
                                  >
                                    Complete
                                  </button>
                                )}
                                <button
                                  onClick={() => setContactCoupleModal(b)}
                                  className="p-1.5 rounded-lg bg-[#241321] text-[#C9BBAF] hover:text-[#F8F1E5] border border-[#B08D45]/30"
                                  title="Contact Couple"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </button>
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

          {/* ==================== 5. AVAILABILITY CALENDAR TAB ==================== */}
          {activeTab === "availability" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Availability Calendar & Date Locker</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Block dates for personal commitments or existing off-platform weddings so couples see accurate schedule availability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Date Blocker Form */}
                <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                    <Ban className="w-4 h-4 text-rose-400" />
                    <span>Block a Date</span>
                  </h3>
                  <form onSubmit={handleAddUnavailableDate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#C9BBAF] mb-1.5">
                        Select Wedding Date to Block *
                      </label>
                      <input
                        type="date"
                        required
                        value={availabilityDate}
                        onChange={(e) => setAvailabilityDate(e.target.value)}
                        className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#C9BBAF] mb-1.5">
                        Reason / Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={availabilityReason}
                        onChange={(e) => setAvailabilityReason(e.target.value)}
                        placeholder="e.g. Booked for Royal Palace Sangeet"
                        className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Mark Date as Unavailable</span>
                    </button>
                  </form>

                  {/* Upcoming Booked Wedding Dates */}
                  <div className="pt-4 border-t border-[#B08D45]/20 space-y-2">
                    <span className="text-xs font-semibold text-[#E5C583]">Upcoming Confirmed Weddings:</span>
                    {bookings
                      .filter((b) => (b.booking_status || "").toLowerCase() === "confirmed")
                      .map((b) => (
                        <div
                          key={b.id}
                          className="p-2.5 rounded-xl bg-[#241321] border border-emerald-500/20 text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="font-semibold text-emerald-300 block">{b.wedding_date}</span>
                            <span className="text-[11px] text-[#C9BBAF]">{b.couple_name}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold">
                            Confirmed
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Blocked Dates List */}
                <div className="lg:col-span-2 bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl p-6 shadow-xl space-y-4">
                  <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#B08D45]" />
                    <span>Currently Blocked / Unavailable Dates ({availability.length})</span>
                  </h3>
                  {availability.length === 0 ? (
                    <div className="py-12 text-center text-[#C9BBAF]/70">
                      <Calendar className="w-10 h-10 text-[#B08D45]/30 mx-auto mb-2" />
                      <p>You have not manually blocked any dates.</p>
                      <p className="text-xs text-[#C9BBAF]/50 mt-1">All unbooked calendar dates are open for inquiries.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availability.map((item) => (
                        <div
                          key={item.id || item.date}
                          className="p-3.5 rounded-2xl bg-[#241321]/80 border border-amber-600/30 flex items-center justify-between gap-3 shadow-md"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#E5C583] block">{item.date}</span>
                            <span className="text-[11px] text-[#C9BBAF] block mt-0.5">
                              {item.reason || "Unavailable"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveUnavailableDate(item.date)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900 text-[11px] font-semibold"
                            title="Make Available"
                          >
                            Unblock
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 6. CUSTOMER ENQUIRIES TAB ==================== */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Customer Enquiries & Custom Quotations</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Direct inquiries received from prospective couples browsing your services.
                </p>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20">
                  <MessageSquare className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-3" />
                  <p className="text-[#C9BBAF] font-serif text-base">No enquiries received yet.</p>
                  <p className="text-xs text-[#C9BBAF]/60 mt-1">When couples submit quotation inquiries, they appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#B08D45]/20">
                        <div>
                          <span className="text-sm font-serif font-bold text-[#F8F1E5]">
                            {enq.couple_name || enq.user_name || "Prospective Couple"}
                          </span>
                          <span className="text-xs text-[#B08D45] block mt-0.5">
                            Target Service: {enq.service_name || "General Inquiry"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              enq.reply_message
                                ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {enq.reply_message ? "Replied" : "Pending Reply"}
                          </span>
                          <span className="text-[11px] text-[#C9BBAF]">
                            {new Date(enq.created_at || Date.now()).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#C9BBAF]">
                        <div>
                          <span className="text-[#B08D45]">Email:</span> {enq.couple_email || enq.email || "Confidential"}
                        </div>
                        <div>
                          <span className="text-[#B08D45]">Phone:</span> {enq.couple_phone || enq.phone || "On Request"}
                        </div>
                        <div>
                          <span className="text-[#B08D45]">Wedding Date:</span> {enq.wedding_date || "To be discussed"}
                        </div>
                      </div>

                      {/* Message Body */}
                      <div className="p-3.5 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 text-xs text-[#F8F1E5]">
                        <p className="text-[11px] text-[#B08D45] uppercase font-semibold mb-1">Couple's Inquiry Message:</p>
                        <p className="leading-relaxed">{enq.message}</p>
                      </div>

                      {/* Vendor's existing response */}
                      {enq.reply_message && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                          <p className="text-[11px] font-semibold text-emerald-400 mb-0.5">Your Sent Reply:</p>
                          <p className="leading-relaxed">{enq.reply_message}</p>
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => {
                            setReplyEnquiryModal(enq);
                            setEnquiryReplyText(enq.reply_message || "");
                          }}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{enq.reply_message ? "Edit Reply" : "Reply to Couple"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== 7. REVIEWS & RATINGS TAB ==================== */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">Client Reviews & Testimonials</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Read feedback from couples who celebrated their wedding with your services and post official replies.
                  </p>
                </div>
                {/* Overall Rating Header */}
                <div className="px-5 py-2.5 rounded-2xl bg-[#1F0E1D] border border-[#B08D45]/40 flex items-center gap-3">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  <div>
                    <span className="text-xl font-serif font-bold text-[#E5C583]">{stats.avgRating || "5.0"}</span>
                    <span className="text-xs text-[#C9BBAF] ml-1">/ 5.0 Rating</span>
                    <span className="text-[10px] text-[#B08D45] block">({reviews.length} Verified Reviews)</span>
                  </div>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20">
                  <Star className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-3" />
                  <p className="text-[#C9BBAF] font-serif text-base">No reviews received yet.</p>
                  <p className="text-xs text-[#C9BBAF]/60 mt-1">Reviews submitted after completed bookings will show here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-serif font-semibold text-sm text-[#F8F1E5]">
                            {rev.couple_name || "Happy Couple"}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < (Number(rev.rating) || 5)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-zinc-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-[11px] text-[#C9BBAF]">
                          {new Date(rev.created_at || Date.now()).toLocaleDateString("en-IN")}
                        </span>
                      </div>

                      <p className="text-xs text-[#E0D4C5] leading-relaxed italic">
                        "{rev.review_text || rev.comment || "Outstanding professionalism and royal execution!"}"
                      </p>

                      {/* Official Reply Display */}
                      {rev.reply_text ? (
                        <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/25 text-xs text-[#E5C583]">
                          <span className="text-[10px] uppercase font-bold text-[#B08D45] block mb-0.5">
                            Official Vendor Response:
                          </span>
                          <p className="text-[#F8F1E5]">{rev.reply_text}</p>
                        </div>
                      ) : (
                        <div>
                          {reviewReplyId === rev.id ? (
                            <div className="space-y-2 pt-2">
                              <textarea
                                rows={2}
                                value={reviewReplyText}
                                onChange={(e) => setReviewReplyText(e.target.value)}
                                placeholder="Thank the couple and express gratitude..."
                                className="w-full bg-[#140A13] border border-[#B08D45]/40 rounded-xl p-3 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setReviewReplyId(null);
                                    setReviewReplyText("");
                                  }}
                                  className="px-3 py-1 rounded-lg text-xs text-[#C9BBAF]"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSendReviewReply(rev.id)}
                                  className="px-4 py-1 rounded-lg bg-[#B08D45] text-[#1F0E1D] text-xs font-bold hover:brightness-110"
                                >
                                  Submit Reply
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setReviewReplyId(rev.id);
                                setReviewReplyText("");
                              }}
                              className="text-xs text-[#E5C583] hover:underline font-medium"
                            >
                              + Reply to this Review
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== 8. PAYMENTS & EARNINGS TAB ==================== */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Payments & Earnings Ledger</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Detailed track record of advance payments received, settled transactions, and pending balances.
                </p>
              </div>

              {/* Earnings Highlight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Total Revenue Booked</span>
                  <div className="text-2xl font-serif font-bold text-[#E5C583] mt-2">
                    {stats.totalEarnings || "₹0"}
                  </div>
                  <span className="text-[10px] text-[#B08D45] mt-1 block">From confirmed & active bookings</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Advance Payments Received</span>
                  <div className="text-2xl font-serif font-bold text-emerald-400 mt-2">
                    {stats.completedPayments || "₹0"}
                  </div>
                  <span className="text-[10px] text-emerald-400/80 mt-1 block">Deposited via UPI & Net Banking</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Pending Remaining Balance</span>
                  <div className="text-2xl font-serif font-bold text-amber-300 mt-2">
                    {stats.pendingPayments || "₹0"}
                  </div>
                  <span className="text-[10px] text-amber-300/80 mt-1 block">Payable upon event completion</span>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-4 bg-[#241321] border-b border-[#B08D45]/20 flex items-center justify-between">
                  <h3 className="font-serif font-semibold text-sm text-[#E5C583]">Transaction History</h3>
                  <span className="text-xs text-[#C9BBAF]">{transactions.length} Records</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#F8F1E5]">
                    <thead className="bg-[#140A13] text-[#B08D45] uppercase text-[10px] border-b border-[#B08D45]/20">
                      <tr>
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Booking Ref</th>
                        <th className="py-3 px-4">Couple Name</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4">Advance Paid</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Method</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B08D45]/15">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-[#C9BBAF]/70">
                            No payment transactions recorded yet.
                          </td>
                        </tr>
                      ) : (
                        transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-[#241321]/40">
                            <td className="py-3 px-4 font-mono text-[#E5C583]">{tx.id}</td>
                            <td className="py-3 px-4 font-mono text-[#C9BBAF]">#{tx.booking_id}</td>
                            <td className="py-3 px-4 font-medium">{tx.couple_name}</td>
                            <td className="py-3 px-4 font-bold text-[#F8F1E5]">{tx.amount}</td>
                            <td className="py-3 px-4 text-emerald-400 font-semibold">{tx.advance_paid}</td>
                            <td className="py-3 px-4 text-[#C9BBAF]">
                              {new Date(tx.payment_date).toLocaleDateString("en-IN")}
                            </td>
                            <td className="py-3 px-4 text-[#C9BBAF]">{tx.payment_method}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  (tx.payment_status || "").toLowerCase() === "paid" ||
                                  (tx.payment_status || "").toLowerCase() === "partial"
                                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                    : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {tx.payment_status}
                              </span>
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

          {/* ==================== 9. ACCOUNT SECURITY TAB ==================== */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Account Security & Password</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Update your vendor credentials to protect your business profile and bookings data.
                </p>
              </div>

              <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl p-6 md:p-8 shadow-xl">
                {passwordFeedback && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-medium mb-4 border ${
                      passwordFeedback.type === "error"
                        ? "bg-rose-950/70 text-rose-200 border-rose-600/40"
                        : "bg-emerald-950/70 text-emerald-200 border-emerald-500/40"
                    }`}
                  >
                    {passwordFeedback.message}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C9BBAF] mb-1.5">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#C9BBAF] mb-1.5">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#C9BBAF] mb-1.5">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow-lg transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================== MODALS ==================== */}

      {/* SERVICE MODAL (ADD / EDIT) */}
      {serviceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-lg text-[#E5C583]">
                {serviceForm.id ? "Edit Wedding Service Listing" : "Add New Wedding Service Listing"}
              </h3>
              <button
                onClick={() => setServiceModal(false)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Palace 4K Cinematography & Drone Shoot"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Service Category *
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="Photographer">Photographer</option>
                    <option value="Makeup Artist">Makeup Artist</option>
                    <option value="Wedding Decorator">Wedding Decorator</option>
                    <option value="Mehndi Artist">Mehndi Artist</option>
                    <option value="Banquet & Venue">Banquet & Venue</option>
                    <option value="Catering & Feast">Catering & Feast</option>
                    <option value="DJ & Entertainment">DJ & Entertainment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Pricing Type
                  </label>
                  <select
                    value={serviceForm.pricing_type}
                    onChange={(e) => setServiceForm({ ...serviceForm, pricing_type: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="Starting From">Starting From</option>
                    <option value="Per Day">Per Day</option>
                    <option value="Full Package">Full Package</option>
                    <option value="Per Plate">Per Plate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Package Price * (e.g. ₹85,000)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="₹85,000 / day"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Location / Coverage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Udaipur, Jaipur & Pan India"
                    value={serviceForm.location}
                    onChange={(e) => setServiceForm({ ...serviceForm, location: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={serviceForm.imageUrl}
                  onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Package Description & Deliverables
                </label>
                <textarea
                  rows={3}
                  placeholder="Includes 3-day coverage, cinematic teaser, 2 photographers, 1 drone pilot, photo book..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#B08D45]/20">
                <button
                  type="button"
                  onClick={() => setServiceModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#C9BBAF] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow"
                >
                  {serviceForm.id ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW SERVICE MODAL */}
      {viewServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-base text-[#E5C583]">
                Service Details
              </h3>
              <button
                onClick={() => setViewServiceModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-44 w-full rounded-2xl overflow-hidden bg-[#241321]">
              <img
                src={
                  viewServiceModal.imageUrl ||
                  viewServiceModal.images?.[0] ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                }
                alt={viewServiceModal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B08D45]/20 text-[#E5C583] font-bold">
                {viewServiceModal.category}
              </span>
              <h4 className="text-lg font-serif font-bold text-[#F8F1E5] mt-1">{viewServiceModal.name}</h4>
              <p className="text-xs text-[#B08D45] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{viewServiceModal.location || "Pan India"}</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#B08D45] block">Price</span>
                <span className="text-base font-bold text-[#E5C583]">{viewServiceModal.price}</span>
              </div>
              <span className="text-xs text-[#C9BBAF]">{viewServiceModal.pricing_type}</span>
            </div>
            <p className="text-xs text-[#C9BBAF] leading-relaxed">
              {viewServiceModal.description || "Complete royal wedding coverage package."}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewServiceModal(null)}
                className="px-5 py-1.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW BOOKING DETAILS MODAL */}
      {viewBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-[#E5C583]">
                  Booking #{viewBookingModal.id}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-950 text-amber-300">
                  {viewBookingModal.booking_status}
                </span>
              </div>
              <button
                onClick={() => setViewBookingModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20 space-y-1">
                <span className="text-[10px] text-[#B08D45] uppercase font-bold">Couple Details</span>
                <p className="text-sm font-bold text-[#F8F1E5]">{viewBookingModal.couple_name}</p>
                <p className="text-[#C9BBAF] flex items-center gap-2">
                  <Phone className="w-3 h-3 text-[#B08D45]" />
                  <span>{viewBookingModal.couple_phone || "Not provided"}</span>
                  <Mail className="w-3 h-3 text-[#B08D45] ml-2" />
                  <span>{viewBookingModal.couple_email || "Not provided"}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20">
                  <span className="text-[10px] text-[#B08D45] uppercase block">Wedding Date</span>
                  <span className="font-bold text-[#F8F1E5]">{viewBookingModal.wedding_date}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20">
                  <span className="text-[10px] text-[#B08D45] uppercase block">Location</span>
                  <span className="font-bold text-[#F8F1E5] truncate block">{viewBookingModal.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-[#B08D45] block">Total Amount</span>
                  <span className="font-bold text-[#F8F1E5]">{viewBookingModal.amount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-emerald-400 block">Advance</span>
                  <span className="font-bold text-emerald-400">{viewBookingModal.advance_paid}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-amber-300 block">Remaining</span>
                  <span className="font-bold text-amber-300">{viewBookingModal.remaining_amount}</span>
                </div>
              </div>

              {viewBookingModal.notes && (
                <div className="p-3 rounded-xl bg-[#140A13] border border-[#B08D45]/15">
                  <span className="text-[10px] text-[#B08D45] uppercase font-bold block mb-1">Couple's Event Notes:</span>
                  <p className="text-[#C9BBAF]">{viewBookingModal.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#B08D45]/20">
              <div className="flex gap-2">
                {(viewBookingModal.booking_status || "").toLowerCase() === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateBookingStatus(viewBookingModal.id, "Confirmed")}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      Accept Booking
                    </button>
                    <button
                      onClick={() => handleUpdateBookingStatus(viewBookingModal.id, "Rejected")}
                      className="px-3 py-1.5 rounded-xl bg-rose-700 text-white text-xs font-bold"
                    >
                      Reject
                    </button>
                  </>
                )}
                {(viewBookingModal.booking_status || "").toLowerCase() === "confirmed" && (
                  <button
                    onClick={() => handleUpdateBookingStatus(viewBookingModal.id, "Completed")}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
              <button
                onClick={() => setViewBookingModal(null)}
                className="px-4 py-1.5 rounded-xl bg-[#241321] text-[#C9BBAF] text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT COUPLE MODAL */}
      {contactCoupleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-base text-[#E5C583]">
                Contact {contactCoupleModal.couple_name}
              </h3>
              <button
                onClick={() => setContactCoupleModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#C9BBAF]">
              Direct communication channels for Booking #{contactCoupleModal.id}.
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${contactCoupleModal.couple_phone || ""}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#241321] border border-[#B08D45]/30 text-xs font-medium text-[#F8F1E5] hover:border-[#D6B875] transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-[#B08D45] uppercase block">Call Mobile</span>
                  <span>{contactCoupleModal.couple_phone || "+91 9876543211"}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/91${(contactCoupleModal.couple_phone || "").replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(
                  contactCoupleModal.couple_name
                )},%20this%20is%20regarding%20your%20wedding%20booking%20with%20ShubhVivah.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#241321] border border-emerald-500/30 text-xs font-medium text-emerald-300 hover:border-emerald-400 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-500 uppercase block">WhatsApp Chat</span>
                  <span>Message on WhatsApp</span>
                </div>
              </a>

              <a
                href={`mailto:${contactCoupleModal.couple_email || ""}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#241321] border border-[#B08D45]/30 text-xs font-medium text-[#F8F1E5] hover:border-[#D6B875] transition-all"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-[10px] text-[#B08D45] uppercase block">Send Official Email</span>
                  <span>{contactCoupleModal.couple_email || "couple@example.com"}</span>
                </div>
              </a>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setContactCoupleModal(null)}
                className="px-4 py-1.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPLY ENQUIRY MODAL */}
      {replyEnquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-base text-[#E5C583]">
                Reply to {replyEnquiryModal.couple_name || "Couple"}
              </h3>
              <button
                onClick={() => setReplyEnquiryModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#241321] text-xs text-[#C9BBAF]">
              <span className="text-[10px] text-[#B08D45] font-bold block mb-1">Inquiry:</span>
              <p className="text-[#F8F1E5]">{replyEnquiryModal.message}</p>
            </div>
            <form onSubmit={handleSendEnquiryReply} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Your Reply & Quotation *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Thank you for reaching out! We are delighted to confirm our availability for your wedding date..."
                  value={enquiryReplyText}
                  onChange={(e) => setEnquiryReplyText(e.target.value)}
                  className="w-full bg-[#140A13] border border-[#B08D45]/40 rounded-xl p-3 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#B08D45]/20">
                <button
                  type="button"
                  onClick={() => setReplyEnquiryModal(null)}
                  className="px-4 py-1.5 rounded-xl text-xs text-[#C9BBAF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
