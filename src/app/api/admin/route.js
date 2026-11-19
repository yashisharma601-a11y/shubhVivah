import { NextResponse } from "next/server";
import {
  getAllUsers,
  updateUser,
  getServices,
  saveService,
  deleteService,
  getProducts,
  saveProduct,
  deleteProduct,
  getBookings,
  updateBookingStatus,
  getOrders,
  updateOrderStatus,
  getEnquiries,
  replyEnquiry,
  getVendorRegistrations,
  updateVendorRegistrationStatus,
  findUserById,
  getChatbotInquiries,
  updateChatbotInquiryStatus,
} from "@/lib/db";
import { getCurrentUser, verifySessionToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

async function readDataFile(filename, fallback = []) {
  try {
    const filePath = path.join(process.cwd(), "src", "data", filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function writeDataFile(filename, data) {
  try {
    const backupDir = path.join(process.cwd(), "src", "data");
    await fs.mkdir(backupDir, { recursive: true });
    const filePath = path.join(backupDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving ${filename}:`, err);
  }
}

async function getAuthAdmin(request) {
  const token = request?.cookies?.get("shubhvivah_session")?.value;
  if (token) {
    const user = verifySessionToken(token);
    if (user) return user;
  }
  if (typeof getCurrentUser === "function") {
    try {
      return await getCurrentUser(request);
    } catch {}
  }
  return null;
}

// -------------------------------------------------------------
// GET /api/admin: Comprehensive Platform Data for Super Admin
// -------------------------------------------------------------
export async function GET(request) {
  try {
    const currentUser = await getAuthAdmin(request);
    if (!currentUser || currentUser.user_type !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Super Admin privileges required." },
        { status: 403 }
      );
    }

    const [
      users,
      services,
      products,
      bookings,
      orders,
      enquiries,
      reviews,
      vendorRegistrations,
      contactInquiries,
      chatbotInquiries,
    ] = await Promise.all([
      getAllUsers(),
      getServices(),
      getProducts(),
      getBookings(),
      getOrders(),
      getEnquiries(),
      readDataFile("reviews.json"),
      getVendorRegistrations(),
      readDataFile("contact_inquiries.json"),
      getChatbotInquiries(),
    ]);

    // Calculate Summary Metrics
    const totalUsers = users.length;
    const totalCouples = users.filter((u) => u.user_type === "couple").length;
    const totalSellers = users.filter((u) => u.user_type === "seller").length;
    const totalVendors = users.filter((u) => u.user_type === "vendor").length;
    
    const pendingRegistrations = users.filter((u) => u.status === "pending").length + vendorRegistrations.filter((v) => v.status === "pending").length;
    const approvedUsers = users.filter((u) => u.status === "active" || u.status === "approved").length;
    const rejectedUsers = users.filter((u) => u.status === "rejected" || u.status === "suspended").length;

    const totalProducts = products.length;
    const totalServices = services.length;
    const totalVenues = services.filter((s) => s.category?.toLowerCase().includes("venue")).length;

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => (b.booking_status || "").toLowerCase() === "pending").length;
    const confirmedBookings = bookings.filter((b) => (b.booking_status || "").toLowerCase() === "confirmed").length;

    const newChatbotInquiries = chatbotInquiries.filter(
      (c) => (c.status || "New").toLowerCase() === "new"
    ).length;

    const totalEnquiries = enquiries.length + contactInquiries.length + chatbotInquiries.length;

    // Platform Revenue & Payments Calculation
    const bookingRevenue = bookings.reduce((sum, b) => {
      const num = Number(String(b.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
      return sum + num;
    }, 0);

    const orderRevenue = orders.reduce((sum, o) => {
      const num = Number(String(o.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
      return sum + num;
    }, 0);

    const totalRevenue = bookingRevenue + orderRevenue;
    const pendingPayments = bookings.filter((b) => (b.payment_status || "").toLowerCase() === "pending").length +
      orders.filter((o) => (o.payment_status || "").toLowerCase() === "pending").length;

    // Aggregate Transactions List
    const transactions = [
      ...bookings.map((b) => ({
        id: `TXN-BK-${b.id}`,
        reference_id: b.id,
        type: "Booking",
        payer: b.couple_name || `Couple #${b.couple_id}`,
        payee: b.vendor_name || `Vendor #${b.vendor_id}`,
        item: b.service_name || "Wedding Service",
        amount: b.total_amount || "₹25,000",
        payment_status: b.payment_status || "Pending",
        payment_method: b.payment_method || "UPI / Card",
        date: b.created_at || new Date().toISOString(),
      })),
      ...orders.map((o) => ({
        id: `TXN-ORD-${o.id}`,
        reference_id: o.id,
        type: "Product Order",
        payer: o.customer_name || o.customer_email || "Customer",
        payee: o.seller_name || `Seller #${o.seller_id}`,
        item: o.items?.[0]?.name || "Wedding Bulk Supply",
        amount: o.total_amount || "₹1,500",
        payment_status: o.payment_status || "Paid",
        payment_method: o.payment_method || "COD / NetBanking",
        date: o.created_at || new Date().toISOString(),
      })),
    ];

    // Recent Activities Feed
    const recentActivities = [
      ...users.slice(-5).map((u) => ({
        id: `ACT-U-${u.id}`,
        type: "user_registered",
        title: `New ${u.user_type?.toUpperCase()} registered`,
        detail: `${u.name} (${u.email}) joined ShubhVivah`,
        time: u.created_at,
      })),
      ...bookings.slice(-5).map((b) => ({
        id: `ACT-B-${b.id}`,
        type: "booking_created",
        title: `New booking: ${b.service_name}`,
        detail: `Couple ${b.couple_name} booked for ${b.event_date}`,
        time: b.created_at,
      })),
      ...enquiries.slice(-5).map((e) => ({
        id: `ACT-E-${e.id}`,
        type: "enquiry_received",
        title: `New Enquiry from ${e.couple_name}`,
        detail: e.message?.slice(0, 80) + "...",
        time: e.created_at,
      })),
    ].sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0)).slice(0, 10);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalCouples,
        totalSellers,
        totalVendors,
        pendingRegistrations,
        approvedUsers,
        rejectedUsers,
        totalVenues,
        totalProducts,
        totalServices,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalEnquiries,
        newChatbotInquiries,
        totalRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`,
        pendingPayments,
      },
      charts: {
        userDistribution: [
          { role: "Couples", count: totalCouples, color: "#D6B875" },
          { role: "Vendors", count: totalVendors, color: "#B08D45" },
          { role: "Sellers", count: totalSellers, color: "#665038" },
        ],
        listingStatus: [
          { status: "Approved", count: services.filter((s) => s.status === "active").length + products.filter((p) => p.status === "active").length },
          { status: "Pending", count: services.filter((s) => s.status === "pending").length + products.filter((p) => p.status === "pending").length },
          { status: "Rejected", count: services.filter((s) => s.status === "rejected").length + products.filter((p) => p.status === "rejected").length },
        ],
        bookingStatus: [
          { status: "Confirmed", count: confirmedBookings },
          { status: "Pending", count: pendingBookings },
          { status: "Completed", count: bookings.filter((b) => (b.booking_status || "").toLowerCase() === "completed").length },
          { status: "Cancelled", count: bookings.filter((b) => (b.booking_status || "").toLowerCase() === "cancelled").length },
        ],
        monthlyRevenue: [
          { month: "Jun", amount: 45000 },
          { month: "Jul", amount: 72000 },
          { month: "Aug", amount: 110000 },
          { month: "Sep", amount: 145000 },
          { month: "Oct", amount: 215000 },
        ],
      },
      users: users.map((u) => {
        const { password_hash, salt, ...safeUser } = u;
        return safeUser;
      }),
      services,
      products,
      bookings,
      orders,
      enquiries,
      reviews,
      vendorRegistrations,
      contactInquiries,
      chatbotInquiries,
      transactions,
      recentActivities,
    });
  } catch (error) {
    console.error("Super Admin GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch platform admin data: " + error.message },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------
// PUT /api/admin: Super Admin Modification Workflow
// -------------------------------------------------------------
export async function PUT(request) {
  try {
    const currentUser = await getAuthAdmin(request);
    if (!currentUser || currentUser.user_type !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Super Admin privileges required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, id, status, remarks, updateData, type } = body;

    // 1. User Status Update (Approve, Reject, Suspend, Activate, Pending)
    if (action === "update_user_status") {
      if (!id || !status) {
        return NextResponse.json({ success: false, message: "User ID and status are required" }, { status: 400 });
      }
      const users = await readDataFile("users.json");
      const idx = users.findIndex((u) => u.id === Number(id));
      if (idx === -1) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
      users[idx].status = status;
      users[idx].admin_remarks = remarks || users[idx].admin_remarks || "";
      users[idx].status_updated_at = new Date().toISOString();
      await writeDataFile("users.json", users);

      return NextResponse.json({
        success: true,
        message: `User status changed to ${status}`,
        user: users[idx],
      });
    }

    // 2. Delete User
    if (action === "delete_user") {
      if (!id) {
        return NextResponse.json({ success: false, message: "User ID required" }, { status: 400 });
      }
      const users = await readDataFile("users.json");
      const targetUser = users.find((u) => u.id === Number(id));
      if (targetUser?.user_type === "admin") {
        return NextResponse.json({ success: false, message: "Cannot delete the Super Admin account" }, { status: 403 });
      }
      const filtered = users.filter((u) => u.id !== Number(id));
      await writeDataFile("users.json", filtered);
      return NextResponse.json({ success: true, message: "User account deleted permanently" });
    }

    // 3. Update User Profile (Admin Edit)
    if (action === "edit_user") {
      if (!id || !updateData) {
        return NextResponse.json({ success: false, message: "User ID and update data required" }, { status: 400 });
      }
      const updated = await updateUser(id, updateData);
      return NextResponse.json({ success: true, message: "User profile updated successfully", user: updated });
    }

    // 4. Listing Status (Product or Service: Approve, Reject, Pending)
    if (action === "update_listing_status") {
      const { listingType, listingId, newStatus } = body;
      if (!listingType || !listingId || !newStatus) {
        return NextResponse.json({ success: false, message: "Listing type, ID, and new status required" }, { status: 400 });
      }

      if (listingType === "service") {
        const services = await readDataFile("services.json");
        const idx = services.findIndex((s) => s.id === Number(listingId));
        if (idx !== -1) {
          services[idx].status = newStatus;
          services[idx].admin_remarks = remarks || "";
          services[idx].reviewed_at = new Date().toISOString();
          await writeDataFile("services.json", services);
          return NextResponse.json({ success: true, message: `Service listing status updated to ${newStatus}`, item: services[idx] });
        }
      } else if (listingType === "product") {
        const products = await readDataFile("products.json");
        const idx = products.findIndex((p) => p.id === Number(listingId));
        if (idx !== -1) {
          products[idx].status = newStatus;
          products[idx].admin_remarks = remarks || "";
          products[idx].reviewed_at = new Date().toISOString();
          await writeDataFile("products.json", products);
          return NextResponse.json({ success: true, message: `Product listing status updated to ${newStatus}`, item: products[idx] });
        }
      }
      return NextResponse.json({ success: false, message: "Listing not found" }, { status: 404 });
    }

    // 5. Delete Listing
    if (action === "delete_listing") {
      const { listingType, listingId } = body;
      if (listingType === "service") {
        await deleteService(listingId);
        return NextResponse.json({ success: true, message: "Service listing deleted" });
      } else if (listingType === "product") {
        await deleteProduct(listingId);
        return NextResponse.json({ success: true, message: "Product listing deleted" });
      }
      return NextResponse.json({ success: false, message: "Invalid listing type" }, { status: 400 });
    }

    // 6. Booking Status Update
    if (action === "update_booking_status") {
      const { bookingId, bookingStatus, paymentStatus } = body;
      const bookings = await readDataFile("bookings.json");
      const idx = bookings.findIndex((b) => b.id === bookingId);
      if (idx !== -1) {
        if (bookingStatus) bookings[idx].booking_status = bookingStatus;
        if (paymentStatus) bookings[idx].payment_status = paymentStatus;
        bookings[idx].admin_remarks = remarks || bookings[idx].admin_remarks || "";
        bookings[idx].updated_at = new Date().toISOString();
        await writeDataFile("bookings.json", bookings);
        return NextResponse.json({ success: true, message: "Booking updated successfully", booking: bookings[idx] });
      }
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    // 7. Enquiry Status Update (Supports Chatbot & Contact Inquiries)
    if (action === "update_enquiry_status" || action === "update_chatbot_inquiry_status") {
      const enquiryId = body.enquiryId || body.id;
      const enquiryStatus = body.enquiryStatus || body.status;
      const replyMessage = body.replyMessage || body.remarks || body.admin_reply;
      const { isContactInquiry, isChatbotInquiry } = body;

      if (isChatbotInquiry || action === "update_chatbot_inquiry_status") {
        const updated = await updateChatbotInquiryStatus(enquiryId, enquiryStatus, replyMessage);
        return NextResponse.json({ success: true, message: "Chatbot inquiry updated successfully", enquiry: updated });
      }

      const filename = isContactInquiry ? "contact_inquiries.json" : "enquiries.json";
      const list = await readDataFile(filename);
      const idx = list.findIndex((e) => String(e.id) === String(enquiryId));
      if (idx !== -1) {
        if (enquiryStatus) list[idx].status = enquiryStatus;
        if (replyMessage) {
          list[idx].admin_reply = replyMessage;
          list[idx].replied_at = new Date().toISOString();
        }
        await writeDataFile(filename, list);
        return NextResponse.json({ success: true, message: "Enquiry updated successfully", enquiry: list[idx] });
      }
      return NextResponse.json({ success: false, message: "Enquiry not found" }, { status: 404 });
    }

    // 8. Reviews Moderation
    if (action === "update_review_status") {
      const { reviewId, reviewStatus } = body;
      const reviews = await readDataFile("reviews.json");
      const idx = reviews.findIndex((r) => r.id === Number(reviewId));
      if (idx !== -1) {
        if (reviewStatus === "deleted") {
          const filtered = reviews.filter((r) => r.id !== Number(reviewId));
          await writeDataFile("reviews.json", filtered);
          return NextResponse.json({ success: true, message: "Review removed permanently" });
        }
        reviews[idx].status = reviewStatus;
        await writeDataFile("reviews.json", reviews);
        return NextResponse.json({ success: true, message: `Review marked as ${reviewStatus}`, review: reviews[idx] });
      }
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
    }

    // 9. Vendor Registration Status
    if (action === "update_vendor_registration") {
      const { regId, regStatus } = body;
      const updated = await updateVendorRegistrationStatus(regId, regStatus);
      return NextResponse.json({ success: true, message: `Vendor registration marked as ${regStatus}`, registration: updated });
    }

    return NextResponse.json({ success: false, message: "Unknown admin action" }, { status: 400 });
  } catch (error) {
    console.error("Super Admin PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Admin action failed: " + error.message },
      { status: 500 }
    );
  }
}

