import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import {
  findUserById,
  getBookings,
  getWishlist,
  getChecklist,
  getBudgetItems,
  getEnquiries,
} from "@/lib/db";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("shubhvivah_session");
    if (!cookie || !cookie.value) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifySessionToken(cookie.value);
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const user = await findUserById(payload.id);
    const coupleId = payload.id;

    const [bookings, wishlist, checklist, budget, enquiries] = await Promise.all([
      getBookings({ coupleId }),
      getWishlist(coupleId),
      getChecklist(coupleId),
      getBudgetItems(coupleId),
      getEnquiries({ coupleId }),
    ]);

    // Calculate profile completion percentage
    let filledFields = 0;
    const fieldsToCheck = [
      user?.name,
      user?.email,
      user?.phone,
      user?.bride_name,
      user?.groom_name,
      user?.wedding_date,
      user?.wedding_location,
      user?.wedding_budget,
      user?.guest_count,
      user?.city,
    ];
    fieldsToCheck.forEach((val) => {
      if (val && String(val).trim() !== "") filledFields += 1;
    });
    const profileCompletion = Math.round((filledFields / fieldsToCheck.length) * 100);

    // Calculate countdown
    let daysRemaining = 120;
    if (user?.wedding_date) {
      const target = new Date(user.wedding_date).getTime();
      const diff = target - Date.now();
      daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    // Process Bookings (Calculate Remaining Amount)
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

    // Wishlist separation
    const savedVenues = wishlist.filter(
      (w) => (w.item_type || "").toLowerCase().includes("venue") || (w.category || "").toLowerCase().includes("venue") || (w.category || "").toLowerCase().includes("palace")
    );
    const savedVendors = wishlist.filter(
      (w) => !(w.item_type || "").toLowerCase().includes("venue") && !(w.category || "").toLowerCase().includes("venue") && !(w.category || "").toLowerCase().includes("palace")
    );

    // Dynamic Notifications
    const notifications = [
      ...formattedBookings.map((b) => ({
        id: `notif-bk-${b.id}`,
        type: "booking",
        title: `Booking #${b.id} ${b.booking_status}`,
        message: `Your booking for ${b.service_name} with ${b.vendor_name} is currently ${b.booking_status}.`,
        date: b.created_at || new Date().toISOString(),
        read: false,
      })),
      ...enquiries
        .filter((e) => e.status === "Replied" || e.reply_message)
        .map((e) => ({
          id: `notif-enq-${e.id}`,
          type: "enquiry",
          title: `Reply Received from ${e.target_name || "Vendor"}`,
          message: e.reply_message || "A vendor has responded to your quote request.",
          date: e.replied_at || e.created_at || new Date().toISOString(),
          read: false,
        })),
      {
        id: "notif-countdown",
        type: "milestone",
        title: `${daysRemaining} Days to Your Wedding!`,
        message: `Keep checking your wedding checklist and budget planner as your big day approaches.`,
        date: new Date().toISOString(),
        read: true,
      },
    ];

    // Stats
    const totalBookings = formattedBookings.length;
    const upcomingBookings = formattedBookings.filter((b) => b.booking_status === "Confirmed").length;
    const pendingRequests = formattedBookings.filter((b) => b.booking_status === "Pending").length;
    const completedTasks = checklist.filter((c) => c.completed).length;

    return NextResponse.json({
      success: true,
      user,
      stats: {
        profileCompletion,
        daysRemaining,
        totalBookings,
        upcomingBookings,
        pendingBookingRequests: pendingRequests,
        savedVenuesCount: savedVenues.length,
        savedVendorsCount: savedVendors.length,
        totalEnquiries: enquiries.length,
        wishlistCount: wishlist.length,
        completedTasks,
        totalTasks: checklist.length,
        planningProgress: checklist.length > 0 ? Math.round((completedTasks / checklist.length) * 100) : 0,
      },
      bookings: formattedBookings,
      wishlist,
      savedVenues,
      savedVendors,
      checklist,
      budget,
      enquiries,
      notifications,
    });
  } catch (error) {
    console.error("Couple dashboard API error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
