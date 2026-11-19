import { NextResponse } from "next/server";
import { findUserByEmailOrPhone } from "@/lib/db";
import { verifyPassword, createSessionToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { identifier, password, remember_me } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your Super Admin Email or Username." },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Please enter your Super Admin Password." },
        { status: 400 }
      );
    }

    // Lookup user
    const user = await findUserByEmailOrPhone(identifier.trim());
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No Super Admin account found with these credentials.",
        },
        { status: 404 }
      );
    }

    // Strict Role Enforcement: Only 'admin' allowed
    if (user.user_type !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Access Denied. Only platform Super Administrators are authorized to log in here. If you are a Couple, Vendor, or Seller, please use the main website Login.",
        },
        { status: 403 }
      );
    }

    // Check account status
    if (user.status === "suspended" || user.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "This administrator account is currently suspended.",
        },
        { status: 403 }
      );
    }

    // Verify Password
    const isValid = verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin password. Access denied.",
        },
        { status: 401 }
      );
    }

    // Session token
    const days = remember_me ? 30 : 7;
    const token = createSessionToken(user, days);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      user_type: user.user_type,
      business_name: user.business_name,
      category: user.category,
      city: user.city,
    };

    const response = NextResponse.json({
      success: true,
      message: "Super Admin authenticated successfully.",
      user: safeUser,
      redirectUrl: "/admin",
    });

    response.cookies.set("shubhvivah_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: days * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An unexpected error occurred during admin authentication." },
      { status: 500 }
    );
  }
}
