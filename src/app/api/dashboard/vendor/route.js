import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getServices, getBookings, getReviews, getEnquiries, findUserById } from "@/lib/db";
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

export async function GET(request) {
  try {
    const userPayload = await getCurrentUser(request);
    if (!userPayload || (userPayload.user_type !== "vendor" && userPayload.user_type !== "admin")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const vendorId = userPayload.id;
    const [dbUser, services, bookings, reviews, enquiries, availabilityList] = await Promise.all([
      findUserById(vendorId),
      getServices(vendorId),
      getBookings({ vendorId }),
      getReviews(vendorId),
      getEnquiries({ targetId: vendorId, targetType: "vendor" }),
      readDataFile("vendor_availability.json", []),
    ]);

    const user = dbUser || userPayload;

    // Services breakdown
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.status === "active" || s.status === "Approved").length;
    const pendingServices = services.filter((s) => s.status === "pending" || s.status === "Pending").length;
    const rejectedServices = services.filter((s) => s.status === "rejected" || s.status === "Rejected").length;

    // Bookings breakdown
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => (b.booking_status || "").toLowerCase() === "pending").length;
    const confirmedBookings = bookings.filter((b) => (b.booking_status || "").toLowerCase() === "confirmed").length;
    const completedBookings = bookings.filter((b) => (b.booking_status || "").toLowerCase() === "completed").length;
    const upcomingBookings = confirmedBookings;

    // Process Bookings with Remaining Amount
    const formattedBookings = bookings.map((b) => {
      const totalNum = Number(String(b.amount || b.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
      const advanceNum = Number(String(b.advance_paid || 0).replace(/[^0-9]/g, "")) || 0;
      const remainingNum = Math.max(0, totalNum - advanceNum);

      return {
        ...b,
        amount: b.amount || b.total_amount || "₹0",
        advance_paid: b.advance_paid || `₹${advanceNum.toLocaleString("en-IN")}`,
        remaining_amount: `₹${remainingNum.toLocaleString("en-IN")}`,
        booking_status: b.booking_status || "Pending",
        payment_status: b.payment_status || "Pending",
      };
    });

    // Earnings breakdown
    const totalEarningsNum = formattedBookings
      .filter((b) => (b.booking_status || "").toLowerCase() !== "cancelled")
      .reduce((sum, b) => {
        const val = Number(String(b.amount || 0).replace(/[^0-9]/g, "")) || 0;
        return sum + val;
      }, 0);

    const pendingPaymentsNum = formattedBookings
      .filter((b) => (b.payment_status || "").toLowerCase() === "pending" || (b.payment_status || "").toLowerCase() === "partial")
      .reduce((sum, b) => {
        const total = Number(String(b.amount || 0).replace(/[^0-9]/g, "")) || 0;
        const advance = Number(String(b.advance_paid || 0).replace(/[^0-9]/g, "")) || 0;
        return sum + Math.max(0, total - advance);
      }, 0);

    const completedPaymentsNum = Math.max(0, totalEarningsNum - pendingPaymentsNum);

    // Reviews breakdown
    const avgRating = reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

    // Transactions History
    const transactions = formattedBookings.map((b) => ({
      id: `TXN-${b.id}`,
      booking_id: b.id,
      couple_name: b.couple_name,
      amount: b.amount,
      advance_paid: b.advance_paid,
      payment_date: b.booking_date || b.created_at || new Date().toISOString(),
      payment_status: b.payment_status,
      payment_method: "Bank Transfer / UPI",
    }));

    // Vendor's blocked dates
    const vendorAvailability = availabilityList.filter((a) => a.vendor_id === vendorId);

    // Notifications
    const notifications = [
      ...formattedBookings.map((b) => ({
        id: `notif-vbk-${b.id}`,
        type: "booking",
        title: `Booking Request #${b.id}`,
        message: `${b.couple_name} requested ${b.service_name} for wedding on ${b.wedding_date || "date"}.`,
        date: b.created_at || new Date().toISOString(),
      })),
      ...enquiries.map((e) => ({
        id: `notif-venq-${e.id}`,
        type: "enquiry",
        title: `New Enquiry from ${e.couple_name || e.user_name || "Couple"}`,
        message: e.message?.slice(0, 80) + "...",
        date: e.created_at || new Date().toISOString(),
      })),
    ];

    return NextResponse.json({
      success: true,
      user,
      stats: {
        totalServices,
        activeServices,
        pendingServices,
        rejectedServices,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        upcomingBookings,
        completedBookings,
        totalEarnings: `₹${totalEarningsNum.toLocaleString("en-IN")}`,
        pendingPayments: `₹${pendingPaymentsNum.toLocaleString("en-IN")}`,
        completedPayments: `₹${completedPaymentsNum.toLocaleString("en-IN")}`,
        customerEnquiries: enquiries.length,
        avgRating,
        totalReviews: reviews.length,
      },
      services,
      bookings: formattedBookings,
      reviews,
      enquiries,
      transactions,
      availability: vendorAvailability,
      notifications,
    });
  } catch (error) {
    console.error("Vendor dashboard error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
