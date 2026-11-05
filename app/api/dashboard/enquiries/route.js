import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveEnquiry, replyEnquiry } from "@/lib/db";

export async function POST(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const enquiry = await saveEnquiry({
      ...body,
      couple_id: user.id,
      couple_name: user.name,
      couple_email: user.email,
      couple_phone: user.phone,
    });
    return NextResponse.json({ success: true, enquiry });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = await getCurrentUser(request);
  if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  try {
    const { enquiryId, replyMessage } = await request.json();
    const updated = await replyEnquiry(enquiryId, replyMessage);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

