import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateOrderStatus } from "@/lib/db";

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user || (user.user_type !== "seller" && user.user_type !== "admin")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderId, status } = await request.json();
    const updated = await updateOrderStatus(orderId, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

