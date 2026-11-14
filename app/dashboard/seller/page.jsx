"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  Package,
  TrendingUp,
  Truck,
  Sparkles,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  MapPin,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Boxes,
  IndianRupee,
  Lock,
  MessageSquare,
  Menu,
  Search,
  Bell,
  ChevronRight,
  ExternalLink,
  Filter,
  Eye,
  Globe,
  CheckSquare,
  XCircle,
  Send,
  ShoppingCart,
  Tag,
  Receipt,
} from "lucide-react";

export default function SellerDashboardPage() {
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
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [orderFilter, setOrderFilter] = useState("all");

  // Modals
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [viewProductModal, setViewProductModal] = useState(null);
  const [viewOrderModal, setViewOrderModal] = useState(null);
  const [replyEnquiryModal, setReplyEnquiryModal] = useState(null);
  const [enquiryReplyText, setEnquiryReplyText] = useState("");

  // Forms
  const [profileForm, setProfileForm] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
    category: "Water Camper Supplier",
    address: "",
    city: "Udaipur",
    state: "Rajasthan",
    pincode: "313001",
    gst_number: "08AAACR1234F1Z8",
    website: "https://shubhvivah.com",
    instagram: "@shubhvivah_supplies",
    bio: "",
    avatar_url: "",
  });

  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    category: "Water Camper Supplier",
    price: "",
    discount_price: "",
    stock: 100,
    description: "",
    imageUrl: "",
  });

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

  // 1. Load Seller Dashboard Data
  const loadSellerData = async () => {
    try {
      const res = await fetch("/api/dashboard/seller");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats || {});
        setProducts(data.products || []);
        setOrders(data.orders || []);
        setEnquiries(data.enquiries || []);
        setTransactions(data.transactions || []);
        setNotifications(data.notifications || []);
        if (data.user) {
          setUser(data.user);
          setProfileForm({
            name: data.user.name || "",
            business_name: data.user.business_name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            category: data.user.category || "Water Camper Supplier",
            address: data.user.address || "",
            city: data.user.city || "Udaipur",
            state: data.user.state || "Rajasthan",
            pincode: data.user.pincode || "313001",
            gst_number: data.user.gst_number || "08AAACR1234F1Z8",
            website: data.user.website || "https://shubhvivah.com",
            instagram: data.user.instagram || "@shubhvivah_supplies",
            bio: data.user.bio || "",
            avatar_url: data.user.avatar_url || "",
          });
        }
      }
    } catch (err) {
      console.error("Error loading seller data:", err);
    }
  };

  // 2. Auth Guard
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.authenticated || !data.user) {
          router.push("/login?type=seller");
          return;
        }

        if (data.user.user_type !== "seller" && data.user.user_type !== "admin") {
          setMismatchedRole(data.user.user_type);
          setUser(data.user);
          setLoading(false);
          return;
        }

        setUser(data.user);
        await loadSellerData();
        setLoading(false);
      } catch {
        router.push("/login?type=seller");
      }
    }
    checkAuth();
  }, [router]);

  // 3. Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login?type=seller");
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
        showToast("Seller business profile updated successfully!");
        setIsEditingProfile(false);
        loadSellerData();
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch {
      showToast("Error saving profile", "error");
    }
  };

  // 5. Product Handlers (Add / Edit / Delete / Stock update)
  const handleOpenAddProduct = () => {
    setProductForm({
      id: null,
      name: "",
      category: profileForm.category || "Water Camper Supplier",
      price: "",
      discount_price: "",
      stock: 100,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    });
    setProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setProductForm({
      id: prod.id,
      name: prod.name || "",
      category: prod.category || "Water Camper Supplier",
      price: prod.price || "",
      discount_price: prod.discount_price || "",
      stock: prod.stock || 50,
      description: prod.description || "",
      imageUrl: prod.imageUrl || prod.images?.[0] || "",
    });
    setProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.price) {
      showToast("Product name and MRP price are required.", "error");
      return;
    }
    try {
      const method = productForm.id ? "PUT" : "POST";
      const payload = {
        ...productForm,
        images: productForm.imageUrl ? [productForm.imageUrl] : [],
      };
      const res = await fetch("/api/dashboard/seller/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        showToast(productForm.id ? "Product catalog updated successfully!" : "Product submitted for catalog approval!");
        setProductModal(false);
        loadSellerData();
      } else {
        showToast(data.message || "Failed to save product", "error");
      }
    } catch {
      showToast("Error saving product", "error");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to remove this product from your inventory?")) return;
    try {
      const res = await fetch(`/api/dashboard/seller/products?id=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Product removed from catalog.");
        loadSellerData();
      } else {
        showToast(data.message || "Could not delete product", "error");
      }
    } catch {
      showToast("Error deleting product", "error");
    }
  };

  const handleQuickStockToggle = async (prod) => {
    try {
      const newStock = Number(prod.stock) > 0 ? 0 : 50;
      const res = await fetch("/api/dashboard/seller/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...prod,
          stock: newStock,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Stock updated: ${prod.name} is now ${newStock > 0 ? "In Stock (50)" : "Out of Stock"}.`);
        loadSellerData();
      }
    } catch {
      showToast("Error updating stock", "error");
    }
  };

  // 6. Order Workflow Handlers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/dashboard/seller/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order #${orderId} marked as ${newStatus}!`);
        if (viewOrderModal && viewOrderModal.id === orderId) {
          setViewOrderModal((prev) => ({ ...prev, order_status: newStatus }));
        }
        loadSellerData();
      } else {
        showToast(data.message || "Could not update order status", "error");
      }
    } catch {
      showToast("Error updating order status", "error");
    }
  };

  // 7. Bulk Enquiry Reply
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
        showToast("Quotation reply sent to client successfully!");
        setReplyEnquiryModal(null);
        setEnquiryReplyText("");
        loadSellerData();
      } else {
        showToast(data.message || "Could not send reply", "error");
      }
    } catch {
      showToast("Error sending reply", "error");
    }
  };

  // 8. Change Password
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

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const pStatus = (p.status || "active").toLowerCase();
      if (productFilter === "all") return matchSearch;
      if (productFilter === "active") return matchSearch && (pStatus === "active" || pStatus === "approved");
      if (productFilter === "pending") return matchSearch && pStatus === "pending";
      if (productFilter === "rejected") return matchSearch && pStatus === "rejected";
      if (productFilter === "outofstock") return matchSearch && Number(p.stock || 0) <= 0;
      return matchSearch;
    });
  }, [products, searchQuery, productFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        (o.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.customer_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.product_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.delivery_address || "").toLowerCase().includes(searchQuery.toLowerCase());
      const oStatus = (o.order_status || "Pending").toLowerCase();
      if (orderFilter === "all") return matchSearch;
      return matchSearch && oStatus === orderFilter.toLowerCase();
    });
  }, [orders, searchQuery, orderFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#140A13] flex flex-col items-center justify-center text-[#F8F1E5]">
        <div className="w-16 h-16 border-4 border-[#B08D45]/30 border-t-[#D6B875] rounded-full animate-spin mb-4" />
        <p className="text-sm text-[#C9BBAF] font-serif tracking-widest uppercase">
          Loading ShubhVivah Seller Portal...
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
            designed for verified ShubhVivah wedding supply sellers.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/dashboard/${mismatchedRole}`}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-medium hover:opacity-90 transition-all text-sm"
            >
              Go to My {mismatchedRole.toUpperCase()} Dashboard
            </Link>
            <button suppressHydrationWarning
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
                  Seller Portal
                </span>
              </div>
            </Link>
            <button suppressHydrationWarning
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[#C9BBAF] hover:text-[#F8F1E5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Info */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-[#241321]/80 border border-[#B08D45]/25 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#B08D45] to-[#78561C] flex items-center justify-center text-lg font-serif font-bold text-[#F8F1E5] shadow-inner">
              {(user?.business_name || user?.name || "S").charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-[#B08D45] uppercase tracking-wider font-semibold">Registered Seller</p>
              <p className="text-sm font-medium text-[#F8F1E5] truncate">
                {user?.business_name || user?.name || "Royal Supplies"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] text-emerald-400 font-medium">Verified Merchant</span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 text-sm">
            {[
              { id: "overview", label: "Overview", icon: Store },
              { id: "profile", label: "My Seller Profile", icon: Building2 },
              { id: "products", label: "My Products / Catalog", icon: Package, badge: products.length },
              { id: "orders", label: "My Orders", icon: Truck, badge: stats.pendingOrders || orders.length },
              { id: "enquiries", label: "Customer Inquiries", icon: MessageSquare, badge: enquiries.length },
              { id: "payments", label: "Payments & Earnings", icon: IndianRupee },
              { id: "security", label: "Account Security", icon: Lock },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button suppressHydrationWarning
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
          <button suppressHydrationWarning
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
            <button suppressHydrationWarning
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#241321]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B08D45]" />
              <input
                type="text"
                placeholder="Search products, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none focus:border-[#D6B875]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Add Product Button */}
            <button suppressHydrationWarning
              onClick={handleOpenAddProduct}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold shadow-md hover:brightness-110 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button suppressHydrationWarning
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
                    <span className="font-semibold text-[#E5C583]">Seller Alerts</span>
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
                {(user?.business_name || user?.name || "S").charAt(0)}
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
                      <span>ShubhVivah Official Seller Portal</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#F8F1E5]">
                      Welcome, <span className="text-[#E5C583]">{user?.business_name || user?.name || "Merchant"}</span>
                    </h1>
                    <p className="text-sm text-[#C9BBAF] mt-1 max-w-xl">
                      Manage your wedding supplies catalog, stock inventory, customer orders, and wholesale inquiries.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button suppressHydrationWarning
                      onClick={handleOpenAddProduct}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold text-xs shadow-lg hover:brightness-110 flex items-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                    <button suppressHydrationWarning
                      onClick={() => setActiveTab("orders")}
                      className="px-4 py-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/40 text-[#E5C583] font-semibold text-xs hover:bg-[#2B1428] flex items-center gap-2 transition-all"
                    >
                      <Truck className="w-4 h-4" />
                      <span>View Orders</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 10 SUMMARY KPI CARDS */}
              <div>
                <h2 className="text-lg font-serif font-semibold text-[#E5C583] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#B08D45]" />
                  <span>Catalog & Order Performance Summary</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { title: "Total Products Listed", value: stats.totalProducts || products.length, icon: Package, color: "text-[#E5C583]" },
                    { title: "Active Products", value: stats.activeProducts || 0, icon: CheckCircle2, color: "text-emerald-400" },
                    { title: "Pending Products", value: stats.pendingProducts || 0, icon: Clock, color: "text-amber-400" },
                    { title: "Rejected Products", value: stats.rejectedProducts || 0, icon: XCircle, color: "text-rose-400" },
                    { title: "Total Orders", value: stats.totalOrders || orders.length, icon: ShoppingCart, color: "text-[#E5C583]" },
                    { title: "Pending Orders", value: stats.pendingOrders || 0, icon: AlertTriangle, color: "text-amber-400" },
                    { title: "Completed Orders", value: stats.completedOrders || 0, icon: CheckSquare, color: "text-teal-400" },
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

              {/* RECENT ORDERS & INQUIRIES PREVIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Preview */}
                <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/25 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B08D45]/20">
                    <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#B08D45]" />
                      <span>Recent Wedding Supply Orders</span>
                    </h3>
                    <button suppressHydrationWarning
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-[#E5C583] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-xs text-[#C9BBAF]/70 py-8 text-center">No orders received yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 4).map((o) => (
                        <div
                          key={o.id}
                          className="p-3 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-[#F8F1E5]">{o.customer_name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#B08D45]/15 text-[#E5C583] border border-[#B08D45]/25">
                                #{o.id}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#C9BBAF] mt-0.5">
                              {o.product_name} (Qty: {o.quantity || 1})
                            </p>
                            <p className="text-[11px] text-[#B08D45]">Ordered: {o.order_date || "Recent"}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#E5C583] block">
                              {typeof o.total_amount === "number" ? `₹${o.total_amount.toLocaleString("en-IN")}` : o.total_amount}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${
                                (o.order_status || "").toLowerCase() === "delivered"
                                  ? "bg-teal-950/70 text-teal-300 border border-teal-500/30"
                                  : (o.order_status || "").toLowerCase() === "processing"
                                  ? "bg-blue-950/70 text-blue-300 border border-blue-500/30"
                                  : (o.order_status || "").toLowerCase() === "confirmed"
                                  ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                  : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {o.order_status || "Pending"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bulk Inquiries Preview */}
                <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/25 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B08D45]/20">
                    <h3 className="font-serif font-semibold text-[#E5C583] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#B08D45]" />
                      <span>Recent Customer Wholesale Inquiries</span>
                    </h3>
                    <button suppressHydrationWarning
                      onClick={() => setActiveTab("enquiries")}
                      className="text-xs text-[#E5C583] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  {enquiries.length === 0 ? (
                    <p className="text-xs text-[#C9BBAF]/70 py-8 text-center">No wholesale inquiries yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map((e) => (
                        <div
                          key={e.id}
                          className="p-3 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#F8F1E5]">
                              {e.couple_name || e.user_name || "Wedding Host"}
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

          {/* ==================== 2. MY SELLER PROFILE TAB ==================== */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">My Seller Profile</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Your official supplier credentials, trade licenses, GST registration, and contact details.
                  </p>
                </div>
                {!isEditingProfile ? (
                  <button suppressHydrationWarning
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-md"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button suppressHydrationWarning
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
                          Merchant Contact Person Name *
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
                          Enterprise / Business Name *
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
                          Product Category Specialization *
                        </label>
                        <select
                          value={profileForm.category}
                          onChange={(e) => setProfileForm({ ...profileForm, category: e.target.value })}
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        >
                          <option value="Water Camper Supplier">Water Camper & Beverage Supplier</option>
                          <option value="Bridal Wear & Sarees">Bridal Wear, Lehengas & Sarees</option>
                          <option value="Groom Sherwani & Safa">Groom Sherwani, Pagdi & Safa</option>
                          <option value="Wedding Jewelry">Royal Kundan & Polki Jewelry</option>
                          <option value="Wedding Favors & Gifts">Wedding Favors, Dry Fruit Boxes & Return Gifts</option>
                          <option value="Invitation Cards & Boxes">Designer Invitation Cards & Boxes</option>
                          <option value="Floral & Mandap Raw Material">Floral & Mandap Raw Materials</option>
                          <option value="Catering Crockery & Tent">Catering Crockery, Chafing Dishes & Tents</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          GST Identification Number (GSTIN)
                        </label>
                        <input
                          type="text"
                          value={profileForm.gst_number}
                          onChange={(e) => setProfileForm({ ...profileForm, gst_number: e.target.value })}
                          placeholder="e.g. 08AAACR1234F1Z8"
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
                          Warehouse / Store Address
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
                          Social Media / Instagram
                        </label>
                        <input
                          type="text"
                          value={profileForm.instagram}
                          onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                          placeholder="@seller_handle"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-[#E5C583] mb-1.5">
                          Business Bio & Bulk Supply Details
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          placeholder="Describe wholesale fulfillment capacity, minimum order quantities, delivery fleets..."
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#B08D45]/20">
                      <button suppressHydrationWarning
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-5 py-2.5 rounded-xl border border-[#B08D45]/40 text-[#C9BBAF] text-xs font-semibold hover:text-[#F8F1E5]"
                      >
                        Cancel
                      </button>
                      <button suppressHydrationWarning
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
                        {(user?.business_name || user?.name || "S").charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-serif font-bold text-[#F8F1E5]">
                            {user?.business_name || "Ramesh Royal Wedding Supplies"}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified ShubhVivah Merchant</span>
                          </span>
                        </div>
                        <p className="text-xs text-[#E5C583] font-medium">
                          {user?.category || profileForm.category} • GSTIN: {profileForm.gst_number}
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
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Mobile / WhatsApp</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.phone || user?.phone || "+91 9876543212"}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">GST Number</span>
                        <p className="text-sm font-medium text-[#F8F1E5] font-mono">{profileForm.gst_number}</p>
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
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Social Handle</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.instagram}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1 md:col-span-2">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Warehouse / Outlet Address</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.address || "Plot 45, Industrial Area, Madri, Udaipur"}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Pincode</span>
                        <p className="text-sm font-medium text-[#F8F1E5]">{profileForm.pincode}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 space-y-1 md:col-span-3">
                        <span className="text-[11px] text-[#B08D45] uppercase font-semibold">Fulfillment Capacity & Logistics</span>
                        <p className="text-xs text-[#C9BBAF] leading-relaxed">
                          {profileForm.bio ||
                            "Supplying premium chilled RO mineral water campers, wedding disposable glassware, dairy ghee, and wholesale banquet catering commodities across Rajasthan wedding venues."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== 3. MY PRODUCTS / CATALOG TAB ==================== */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">My Products & Inventory Catalog</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Maintain wholesale inventory, bulk pricing discounts, product specs, and stock levels.
                  </p>
                </div>
                <button suppressHydrationWarning
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-md w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 pb-2">
                {["all", "active", "pending", "rejected", "outofstock"].map((flt) => (
                  <button suppressHydrationWarning
                    key={flt}
                    onClick={() => setProductFilter(flt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                      productFilter === flt
                        ? "bg-[#E5C583] text-[#1F0E1D] font-bold shadow-md"
                        : "bg-[#1F0E1D] text-[#C9BBAF] border border-[#B08D45]/30 hover:border-[#D6B875]"
                    }`}
                  >
                    {flt} (
                    {flt === "all"
                      ? products.length
                      : flt === "outofstock"
                      ? products.filter((p) => Number(p.stock || 0) <= 0).length
                      : products.filter((p) => (p.status || "active").toLowerCase() === flt).length}
                    )
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20">
                  <Package className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-3" />
                  <p className="text-[#C9BBAF] font-serif text-base">No products found in this filter.</p>
                  <p className="text-xs text-[#C9BBAF]/60 mt-1">Add items to your catalog so couples and caterers can order.</p>
                  <button suppressHydrationWarning
                    onClick={handleOpenAddProduct}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold"
                  >
                    + Add First Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#D6B875] transition-all"
                    >
                      {/* Image / Header */}
                      <div className="relative h-44 w-full bg-[#241321] overflow-hidden">
                        <img
                          src={
                            prod.imageUrl ||
                            prod.images?.[0] ||
                            "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E1D] via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1F0E1D]/80 backdrop-blur-md text-[#E5C583] border border-[#B08D45]/40">
                          {prod.category || "Supplies"}
                        </span>
                        <span
                          className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
                            (prod.status || "active").toLowerCase() === "active" ||
                            (prod.status || "").toLowerCase() === "approved"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : (prod.status || "").toLowerCase() === "pending"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                          }`}
                        >
                          {(prod.status || "active").toUpperCase()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-serif font-bold text-base text-[#F8F1E5] line-clamp-1">
                              {prod.name}
                            </h3>
                            <button suppressHydrationWarning
                              onClick={() => handleQuickStockToggle(prod)}
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap border ${
                                Number(prod.stock || 0) > 0
                                  ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                                  : "bg-rose-950/60 text-rose-300 border-rose-500/30"
                              }`}
                              title="Click to toggle stock status"
                            >
                              {Number(prod.stock || 0) > 0 ? `In Stock (${prod.stock})` : "Out of Stock"}
                            </button>
                          </div>
                          <p className="text-xs text-[#C9BBAF] mt-2 line-clamp-2">
                            {prod.description || "Premium bulk supplies for royal weddings and celebrations."}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
                            <div>
                              <span className="text-[10px] text-[#B08D45] block uppercase font-medium">Wholesale Rate</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-base font-bold text-[#E5C583]">
                                  {prod.discount_price || prod.price || "₹35 / unit"}
                                </span>
                                {prod.discount_price && prod.price && prod.discount_price !== prod.price && (
                                  <span className="text-xs text-[#C9BBAF]/60 line-through">
                                    {prod.price}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] text-[#C9BBAF]">ID: #{prod.id}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-3 gap-2 pt-3">
                            <button suppressHydrationWarning
                              onClick={() => setViewProductModal(prod)}
                              className="py-1.5 rounded-lg bg-[#241321] text-[#E5C583] hover:bg-[#2B1428] text-xs font-semibold border border-[#B08D45]/30 flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button suppressHydrationWarning
                              onClick={() => handleOpenEditProduct(prod)}
                              className="py-1.5 rounded-lg bg-[#241321] text-[#C9BBAF] hover:text-[#F8F1E5] hover:bg-[#2B1428] text-xs font-semibold border border-[#B08D45]/30 flex items-center justify-center gap-1"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button suppressHydrationWarning
                              onClick={() => handleDeleteProduct(prod.id)}
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

          {/* ==================== 4. MY ORDERS TAB ==================== */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#E5C583]">Customer Supplies Orders</h2>
                  <p className="text-xs text-[#C9BBAF] mt-0.5">
                    Track incoming purchase orders, process fulfillment stages, and monitor delivery logistics.
                  </p>
                </div>
                {/* Status Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  {["all", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((flt) => (
                    <button suppressHydrationWarning
                      key={flt}
                      onClick={() => setOrderFilter(flt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                        orderFilter === flt
                          ? "bg-[#E5C583] text-[#1F0E1D] font-bold shadow-md"
                          : "bg-[#1F0E1D] text-[#C9BBAF] border border-[#B08D45]/30 hover:border-[#D6B875]"
                      }`}
                    >
                      {flt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table Card */}
              <div className="bg-[#1F0E1D]/90 border border-[#B08D45]/30 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#F8F1E5]">
                    <thead className="bg-[#241321] text-[#E5C583] font-serif uppercase tracking-wider text-[11px] border-b border-[#B08D45]/25">
                      <tr>
                        <th className="py-4 px-4">Order ID</th>
                        <th className="py-4 px-4">Customer Name</th>
                        <th className="py-4 px-4">Product Name</th>
                        <th className="py-4 px-4">Quantity</th>
                        <th className="py-4 px-4">Order Date</th>
                        <th className="py-4 px-4">Total Amount</th>
                        <th className="py-4 px-4">Payment</th>
                        <th className="py-4 px-4">Order Status</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#B08D45]/15">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-[#C9BBAF]/70">
                            No orders match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#241321]/50 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#E5C583]">#{ord.id}</td>
                            <td className="py-3.5 px-4 font-medium">
                              <div>{ord.customer_name}</div>
                              <div className="text-[10px] text-[#C9BBAF]">{ord.customer_phone || ord.customer_email}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-[180px] truncate">{ord.product_name}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#F8F1E5]">{ord.quantity || 1} units</td>
                            <td className="py-3.5 px-4 text-[#B08D45] font-medium">{ord.order_date || "Recent"}</td>
                            <td className="py-3.5 px-4 font-bold text-[#F8F1E5]">
                              {typeof ord.total_amount === "number" ? `₹${ord.total_amount.toLocaleString("en-IN")}` : ord.total_amount}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  (ord.payment_status || "").toLowerCase() === "paid"
                                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                    : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {ord.payment_status || "Paid"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  (ord.order_status || "").toLowerCase() === "delivered"
                                    ? "bg-teal-950/70 text-teal-300 border border-teal-500/30"
                                    : (ord.order_status || "").toLowerCase() === "shipped"
                                    ? "bg-purple-950/70 text-purple-300 border border-purple-500/30"
                                    : (ord.order_status || "").toLowerCase() === "processing"
                                    ? "bg-blue-950/70 text-blue-300 border border-blue-500/30"
                                    : (ord.order_status || "").toLowerCase() === "confirmed"
                                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
                                    : "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {ord.order_status || "Pending"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button suppressHydrationWarning
                                  onClick={() => setViewOrderModal(ord)}
                                  className="p-1.5 rounded-lg bg-[#241321] text-[#E5C583] hover:bg-[#2B1428] border border-[#B08D45]/30"
                                  title="View Order Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                {(ord.order_status || "").toLowerCase() === "pending" && (
                                  <button suppressHydrationWarning
                                    onClick={() => handleUpdateOrderStatus(ord.id, "Confirmed")}
                                    className="px-2 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-[11px] font-semibold"
                                    title="Confirm Order"
                                  >
                                    Confirm
                                  </button>
                                )}
                                {(ord.order_status || "").toLowerCase() === "confirmed" && (
                                  <button suppressHydrationWarning
                                    onClick={() => handleUpdateOrderStatus(ord.id, "Processing")}
                                    className="px-2 py-1 rounded-lg bg-blue-700/80 hover:bg-blue-600 text-white text-[11px] font-semibold"
                                    title="Process Order"
                                  >
                                    Process
                                  </button>
                                )}
                                {(ord.order_status || "").toLowerCase() === "processing" && (
                                  <button suppressHydrationWarning
                                    onClick={() => handleUpdateOrderStatus(ord.id, "Shipped")}
                                    className="px-2 py-1 rounded-lg bg-purple-700/80 hover:bg-purple-600 text-white text-[11px] font-semibold"
                                    title="Mark as Shipped"
                                  >
                                    Ship
                                  </button>
                                )}
                                {(ord.order_status || "").toLowerCase() === "shipped" && (
                                  <button suppressHydrationWarning
                                    onClick={() => handleUpdateOrderStatus(ord.id, "Delivered")}
                                    className="px-2 py-1 rounded-lg bg-teal-700/80 hover:bg-teal-600 text-white text-[11px] font-semibold"
                                    title="Mark as Delivered"
                                  >
                                    Deliver
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

          {/* ==================== 5. CUSTOMER INQUIRIES TAB ==================== */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Customer Wholesale & Bulk Inquiries</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Direct quotations requested by wedding planners, caterers, and families for bulk supplies.
                </p>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20">
                  <MessageSquare className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-3" />
                  <p className="text-[#C9BBAF] font-serif text-base">No customer inquiries received yet.</p>
                  <p className="text-xs text-[#C9BBAF]/60 mt-1">Wholesale rate requests from clients will show up here.</p>
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
                            {enq.couple_name || enq.user_name || "Wedding Host"}
                          </span>
                          <span className="text-xs text-[#B08D45] block mt-0.5">
                            Target Product: {enq.product_name || "Bulk Supplies Requirement"}
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
                          <span className="text-[#B08D45]">Delivery Date:</span> {enq.wedding_date || "To be discussed"}
                        </div>
                      </div>

                      {/* Message Body */}
                      <div className="p-3.5 rounded-xl bg-[#241321]/70 border border-[#B08D45]/15 text-xs text-[#F8F1E5]">
                        <p className="text-[11px] text-[#B08D45] uppercase font-semibold mb-1">Inquiry Details:</p>
                        <p className="leading-relaxed">{enq.message}</p>
                      </div>

                      {/* Seller's response */}
                      {enq.reply_message && (
                        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200">
                          <p className="text-[11px] font-semibold text-emerald-400 mb-0.5">Your Sent Quotation Reply:</p>
                          <p className="leading-relaxed">{enq.reply_message}</p>
                        </div>
                      )}

                      <div className="flex justify-end pt-2">
                        <button suppressHydrationWarning
                          onClick={() => {
                            setReplyEnquiryModal(enq);
                            setEnquiryReplyText(enq.reply_message || "");
                          }}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 flex items-center gap-1.5 shadow"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{enq.reply_message ? "Edit Reply" : "Send Quotation Reply"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== 6. PAYMENTS & EARNINGS TAB ==================== */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Payments & Earnings Ledger</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Detailed track record of product purchases, payouts received, and unsettled balances.
                </p>
              </div>

              {/* Earnings Highlight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Total Revenue Dispatched</span>
                  <div className="text-2xl font-serif font-bold text-[#E5C583] mt-2">
                    {stats.totalEarnings || "₹0"}
                  </div>
                  <span className="text-[10px] text-[#B08D45] mt-1 block">From confirmed & delivered supply orders</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Settled Earnings Received</span>
                  <div className="text-2xl font-serif font-bold text-emerald-400 mt-2">
                    {stats.completedPayments || "₹0"}
                  </div>
                  <span className="text-[10px] text-emerald-400/80 mt-1 block">Settled via Direct Bank Account</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#1F0E1D]/90 border border-[#B08D45]/30 shadow-lg">
                  <span className="text-xs text-[#C9BBAF] uppercase font-semibold">Pending Escrow Settlement</span>
                  <div className="text-2xl font-serif font-bold text-amber-300 mt-2">
                    {stats.pendingPayments || "₹0"}
                  </div>
                  <span className="text-[10px] text-amber-300/80 mt-1 block">Disbursed upon courier confirmation</span>
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
                        <th className="py-3 px-4">Order Ref</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Product Item</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Payment Method</th>
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
                            <td className="py-3 px-4 font-mono text-[#C9BBAF]">#{tx.order_id}</td>
                            <td className="py-3 px-4 font-medium">{tx.customer_name}</td>
                            <td className="py-3 px-4 text-[#F8F1E5] max-w-[150px] truncate">{tx.product_name}</td>
                            <td className="py-3 px-4 font-bold text-[#E5C583]">{tx.amount}</td>
                            <td className="py-3 px-4 text-[#C9BBAF]">
                              {new Date(tx.payment_date).toLocaleDateString("en-IN")}
                            </td>
                            <td className="py-3 px-4 text-[#C9BBAF]">{tx.payment_method}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  (tx.payment_status || "").toLowerCase() === "paid"
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

          {/* ==================== 7. ACCOUNT SECURITY TAB ==================== */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#E5C583]">Account Security & Password</h2>
                <p className="text-xs text-[#C9BBAF] mt-0.5">
                  Update your seller credentials to safeguard your inventory pricing and wholesale orders.
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

                  <button suppressHydrationWarning
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

      {/* PRODUCT MODAL (ADD / EDIT) */}
      {productModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-lg text-[#E5C583]">
                {productForm.id ? "Edit Product Catalog Item" : "Add New Wedding Supply Product"}
              </h3>
              <button suppressHydrationWarning
                onClick={() => setProductModal(false)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20L Chilled RO Water Camper (Pack of 50)"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  >
                    <option value="Water Camper Supplier">Water Camper Supplier</option>
                    <option value="Bridal Wear & Sarees">Bridal Wear & Sarees</option>
                    <option value="Groom Sherwani & Safa">Groom Sherwani & Safa</option>
                    <option value="Wedding Jewelry">Wedding Jewelry</option>
                    <option value="Wedding Favors & Gifts">Wedding Favors & Gifts</option>
                    <option value="Invitation Cards & Boxes">Invitation Cards & Boxes</option>
                    <option value="Floral & Mandap Raw Material">Floral & Mandap Raw Material</option>
                    <option value="Catering Crockery & Tent">Catering Crockery & Tent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    MRP / Base Price * (e.g. ₹50)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="₹50 / camper"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Discount Wholesale Price (e.g. ₹35)
                  </label>
                  <input
                    type="text"
                    placeholder="₹35 / camper"
                    value={productForm.discount_price}
                    onChange={(e) => setProductForm({ ...productForm, discount_price: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Product Description & Packaging Specs
                </label>
                <textarea
                  rows={3}
                  placeholder="Triple filtered hygienic RO water, chilled, durable food-grade tap containers..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#B08D45]/20">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setProductModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#C9BBAF] hover:text-white"
                >
                  Cancel
                </button>
                <button suppressHydrationWarning
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow"
                >
                  {productForm.id ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PRODUCT MODAL */}
      {viewProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-base text-[#E5C583]">
                Product Details
              </h3>
              <button suppressHydrationWarning
                onClick={() => setViewProductModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-44 w-full rounded-2xl overflow-hidden bg-[#241321]">
              <img
                src={
                  viewProductModal.imageUrl ||
                  viewProductModal.images?.[0] ||
                  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                }
                alt={viewProductModal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B08D45]/20 text-[#E5C583] font-bold">
                {viewProductModal.category}
              </span>
              <h4 className="text-lg font-serif font-bold text-[#F8F1E5] mt-1">{viewProductModal.name}</h4>
            </div>
            <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#B08D45] block">Wholesale Rate</span>
                <span className="text-base font-bold text-[#E5C583]">
                  {viewProductModal.discount_price || viewProductModal.price}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">
                Available Stock: {viewProductModal.stock || 0} units
              </span>
            </div>
            <p className="text-xs text-[#C9BBAF] leading-relaxed">
              {viewProductModal.description || "Premium bulk supplies for weddings and celebrations."}
            </p>
            <div className="flex justify-end pt-2">
              <button suppressHydrationWarning
                onClick={() => setViewProductModal(null)}
                className="px-5 py-1.5 rounded-xl bg-[#B08D45] text-[#1F0E1D] text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ORDER DETAILS MODAL */}
      {viewOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-[#E5C583]">
                  Order #{viewOrderModal.id}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-950 text-amber-300">
                  {viewOrderModal.order_status}
                </span>
              </div>
              <button suppressHydrationWarning
                onClick={() => setViewOrderModal(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20 space-y-1">
                <span className="text-[10px] text-[#B08D45] uppercase font-bold">Customer Details</span>
                <p className="text-sm font-bold text-[#F8F1E5]">{viewOrderModal.customer_name}</p>
                <p className="text-[#C9BBAF] flex items-center gap-2">
                  <Phone className="w-3 h-3 text-[#B08D45]" />
                  <span>{viewOrderModal.customer_phone || "+91 9876543211"}</span>
                  <Mail className="w-3 h-3 text-[#B08D45] ml-2" />
                  <span>{viewOrderModal.customer_email || "client@example.com"}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#241321] border border-[#B08D45]/20">
                <span className="text-[10px] text-[#B08D45] uppercase block mb-1">Delivery Destination</span>
                <p className="text-sm font-medium text-[#F8F1E5]">{viewOrderModal.delivery_address || "Venue Lawn, Udaipur"}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-[#B08D45] block">Product</span>
                  <span className="font-bold text-[#F8F1E5] truncate block">{viewOrderModal.product_name}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-emerald-400 block">Quantity</span>
                  <span className="font-bold text-emerald-400">{viewOrderModal.quantity || 1} units</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/20 text-center">
                  <span className="text-[10px] text-amber-300 block">Total</span>
                  <span className="font-bold text-amber-300">
                    {typeof viewOrderModal.total_amount === "number"
                      ? `₹${viewOrderModal.total_amount.toLocaleString("en-IN")}`
                      : viewOrderModal.total_amount}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#B08D45]/20">
              <div className="flex gap-2">
                {(viewOrderModal.order_status || "").toLowerCase() === "pending" && (
                  <button suppressHydrationWarning
                    onClick={() => handleUpdateOrderStatus(viewOrderModal.id, "Confirmed")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Confirm Order
                  </button>
                )}
                {(viewOrderModal.order_status || "").toLowerCase() === "confirmed" && (
                  <button suppressHydrationWarning
                    onClick={() => handleUpdateOrderStatus(viewOrderModal.id, "Processing")}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Mark Processing
                  </button>
                )}
                {(viewOrderModal.order_status || "").toLowerCase() === "processing" && (
                  <button suppressHydrationWarning
                    onClick={() => handleUpdateOrderStatus(viewOrderModal.id, "Shipped")}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                  >
                    Mark Shipped
                  </button>
                )}
                {(viewOrderModal.order_status || "").toLowerCase() === "shipped" && (
                  <button suppressHydrationWarning
                    onClick={() => handleUpdateOrderStatus(viewOrderModal.id, "Delivered")}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
              <button suppressHydrationWarning
                onClick={() => setViewOrderModal(null)}
                className="px-4 py-1.5 rounded-xl bg-[#241321] text-[#C9BBAF] text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPLY WHOLESALE INQUIRY MODAL */}
      {replyEnquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <h3 className="font-serif font-bold text-base text-[#E5C583]">
                Reply to {replyEnquiryModal.couple_name || "Client"}
              </h3>
              <button suppressHydrationWarning
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
                  Wholesale Price Quotation & Terms *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Thank you for your bulk order inquiry! We can supply 100 campers with free delivery to your venue at ₹35/camper..."
                  value={enquiryReplyText}
                  onChange={(e) => setEnquiryReplyText(e.target.value)}
                  className="w-full bg-[#140A13] border border-[#B08D45]/40 rounded-xl p-3 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#B08D45]/20">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setReplyEnquiryModal(null)}
                  className="px-4 py-1.5 rounded-xl text-xs text-[#C9BBAF]"
                >
                  Cancel
                </button>
                <button suppressHydrationWarning
                  type="submit"
                  className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow"
                >
                  Send Quotation Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
