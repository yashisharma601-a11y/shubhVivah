import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getBookings, updateBookingStatus } from "@/lib/db";

export async function GET(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  const bookings = await getBookings({ coupleId: user.id });
  return NextResponse.json({ success: true, bookings });
}

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { bookingId, status } = await request.json();
    const updated = await updateBookingStatus(bookingId, status);
    return NextResponse.json({ success: true, booking: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

