import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProducts, getOrders, getEnquiries, findUserById } from "@/lib/db";

export async function GET(request) {
  try {
    const userPayload = await getCurrentUser(request);
    if (!userPayload || (userPayload.user_type !== "seller" && userPayload.user_type !== "admin")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const sellerId = userPayload.id;
    const [dbUser, products, orders, enquiries] = await Promise.all([
      findUserById(sellerId),
      getProducts(sellerId),
      getOrders({ sellerId }),
      getEnquiries({ targetId: sellerId, targetType: "seller" }),
    ]);

    const user = dbUser || userPayload;

    // Product breakdown
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.status === "active" || p.status === "Approved").length;
    const pendingProducts = products.filter((p) => p.status === "pending" || p.status === "Pending").length;
    const rejectedProducts = products.filter((p) => p.status === "rejected" || p.status === "Rejected").length;

    // Order breakdown
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (o) => (o.order_status || "").toLowerCase() === "pending" || (o.order_status || "").toLowerCase() === "processing"
    ).length;
    const completedOrders = orders.filter(
      (o) => (o.order_status || "").toLowerCase() === "delivered" || (o.order_status || "").toLowerCase() === "completed"
    ).length;

    // Earnings breakdown
    const totalEarningsNum = orders
      .filter((o) => (o.order_status || "").toLowerCase() !== "cancelled")
      .reduce((sum, o) => {
        const val = Number(String(o.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
        return sum + val;
      }, 0);

    const pendingPaymentsNum = orders
      .filter((o) => (o.payment_status || "").toLowerCase() === "pending")
      .reduce((sum, o) => {
        const val = Number(String(o.total_amount || 0).replace(/[^0-9]/g, "")) || 0;
        return sum + val;
      }, 0);

    const completedPaymentsNum = Math.max(0, totalEarningsNum - pendingPaymentsNum);

    // Payments / Transactions History
    const transactions = orders.map((o) => ({
      id: `TXN-${o.id}`,
      order_id: o.id,
      customer_name: o.customer_name || "Customer",
      customer_email: o.customer_email || "",
      product_name: o.product_name || o.items?.[0]?.name || "Bulk Supplies",
      amount: typeof o.total_amount === "number" ? `₹${o.total_amount.toLocaleString("en-IN")}` : o.total_amount,
      payment_date: o.order_date || o.created_at || new Date().toISOString(),
      payment_status: o.payment_status || "Paid",
      payment_method: o.payment_method || "UPI / Direct Transfer",
    }));

    // Dynamic Notifications
    const notifications = [
      ...orders.map((o) => ({
        id: `notif-ord-${o.id}`,
        type: "order",
        title: `New Order #${o.id} Received`,
        message: `${o.customer_name} placed an order for ${o.product_name || o.items?.[0]?.name || "items"}.`,
        date: o.created_at || new Date().toISOString(),
      })),
      ...enquiries.map((e) => ({
        id: `notif-enq-${e.id}`,
        type: "enquiry",
        title: `Bulk Inquiry from ${e.couple_name || e.user_name || "Client"}`,
        message: e.message?.slice(0, 80) + "...",
        date: e.created_at || new Date().toISOString(),
      })),
    ];

    return NextResponse.json({
      success: true,
      user,
      stats: {
        totalProducts,
        activeProducts,
        pendingProducts,
        rejectedProducts,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalEarnings: `₹${totalEarningsNum.toLocaleString("en-IN")}`,
        pendingPayments: `₹${pendingPaymentsNum.toLocaleString("en-IN")}`,
        completedPayments: `₹${completedPaymentsNum.toLocaleString("en-IN")}`,
        customerEnquiries: enquiries.length,
      },
      products,
      orders,
      enquiries,
      transactions,
      notifications,
    });
  } catch (error) {
    console.error("Seller dashboard error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
