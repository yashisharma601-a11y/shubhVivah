import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateBookingStatus } from "@/lib/db";

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user || (user.user_type !== "vendor" && user.user_type !== "admin")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { bookingId, status } = await request.json();
    const updated = await updateBookingStatus(bookingId, status);
    return NextResponse.json({ success: true, booking: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

