import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("shubhvivah_session");
    if (!cookie || !cookie.value) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const payload = verifySessionToken(cookie.value);
    if (!payload) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    // Retrieve fresh user info from store
    const dbUser = await findUserById(payload.id);
    const userSource = dbUser || payload;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: userSource.id,
        name: userSource.name,
        email: userSource.email,
        phone: userSource.phone,
        user_type: userSource.user_type,
        business_name: userSource.business_name || null,
        category: userSource.category || null,
        city: userSource.city || null,
        state: userSource.state || null,
        address: userSource.address || null,
        bride_name: userSource.bride_name || null,
        groom_name: userSource.groom_name || null,
        wedding_date: userSource.wedding_date || null,
        wedding_location: userSource.wedding_location || null,
        wedding_budget: userSource.wedding_budget || null,
        guest_count: userSource.guest_count || null,
        avatar_url: userSource.avatar_url || null,
        bio: userSource.bio || null,
        gst_number: userSource.gst_number || null,
        experience_years: userSource.experience_years || 0,
        status: userSource.status || "active",
      },
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
}


