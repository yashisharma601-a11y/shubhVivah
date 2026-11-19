import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { replyReview } from "@/lib/db";

export async function POST(request) {
  const user = await getCurrentUser(request);
  if (!user || (user.user_type !== "vendor" && user.user_type !== "admin")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { reviewId, replyText } = await request.json();
    const updated = await replyReview(reviewId, replyText);
    return NextResponse.json({ success: true, review: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

