import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveEnquiry, saveBooking, getEnquiries, getBookings } from "@/lib/db";
import { validateName, validatePhone, validateEmail } from "@/lib/validations/formValidation";

export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "bookings" or "enquiries"

    if (type === "bookings") {
      const bookings = await getBookings(user ? { coupleId: user.id } : {});
      return NextResponse.json({ success: true, bookings });
    }

    const enquiries = await getEnquiries(user ? { coupleId: user.id } : {});
    return NextResponse.json({ success: true, enquiries });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    const body = await request.json();

    // Determine sender identity: either from logged-in user or from submitted form fields
    const rawName = user?.name || body.name || body.couple_name || "";
    const rawEmail = user?.email || body.email || body.couple_email || "";
    const rawPhone = user?.phone || body.phone || body.couple_phone || "";

    // Validate inputs
    const nameVal = validateName(rawName);
    if (!nameVal.isValid) {
      return NextResponse.json({ success: false, message: nameVal.error }, { status: 400 });
    }

    const phoneVal = validatePhone(rawPhone);
    if (!phoneVal.isValid) {
      return NextResponse.json({ success: false, message: phoneVal.error }, { status: 400 });
    }

    const emailVal = validateEmail(rawEmail);
    if (!emailVal.isValid) {
      return NextResponse.json({ success: false, message: emailVal.error }, { status: 400 });
    }

    const senderName = nameVal.value;
    const senderEmail = emailVal.value;
    const senderPhone = phoneVal.value;
    const coupleId = user?.id || body.couple_id || null;

    // Check if this is a direct booking request or an enquiry
    const isBooking = Boolean(body.is_booking || body.event_date || body.wedding_date);

    // Save as Enquiry (which feeds Super Admin Enquiry Management)
    const enquiry = await saveEnquiry({
      couple_id: coupleId,
      couple_name: senderName,
      couple_email: senderEmail,
      couple_phone: senderPhone,
      target_id: body.target_id || body.vendor_id || null,
      target_type: body.target_type || "vendor",
      target_name: body.target_name || body.vendor_name || body.company || "Wedding Vendor",
      service_or_product: body.service_or_product || body.service_name || body.service || "Wedding Service",
      message: body.message || `Booking inquiry for ${body.date || body.event_date || "upcoming wedding"}. Expected guests: ${body.guests || body.guestCount || "N/A"}.`,
      event_date: body.date || body.event_date || body.wedding_date || null,
      budget: body.budget || body.total_amount || null,
      guest_count: body.guests || body.guestCount || null,
      location: body.location || body.city || null,
      source: body.source || "Wedding Vendor Page",
    });

    // Also record into Bookings so it appears in Admin Booking Management and Couple Dashboard
    let booking = null;
    if (isBooking) {
      booking = await saveBooking({
        couple_id: coupleId,
        couple_name: senderName,
        couple_email: senderEmail,
        couple_phone: senderPhone,
        vendor_id: body.target_id || body.vendor_id || 104,
        vendor_name: body.target_name || body.vendor_name || body.company || "Wedding Vendor",
        service_name: body.service_or_product || body.service_name || body.service || "Wedding Service",
        wedding_date: body.date || body.event_date || body.wedding_date || new Date().toISOString().split("T")[0],
        event_date: body.date || body.event_date || body.wedding_date || new Date().toISOString().split("T")[0],
        location: body.location || body.city || "Venue TBD",
        total_amount: body.budget || body.total_amount || "₹90,000",
        advance_paid: "₹0",
        remaining_amount: body.budget || body.total_amount || "₹90,000",
        booking_status: "Pending",
        payment_status: "Pending",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry and booking request registered successfully!",
      enquiry,
      booking,
    });
  } catch (err) {
    console.error("Error creating enquiry/booking:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
