import { NextResponse } from "next/server";
import { findUserByEmailOrPhone } from "@/lib/db";
import { verifyPassword, createSessionToken } from "@/lib/auth";

// In-memory rate limiting map: ipOrIdentifier -> { attempts: number, lockoutUntil: number }
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout after 5 failed attempts

function checkRateLimit(key) {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record) return { blocked: false };

  if (record.lockoutUntil && now < record.lockoutUntil) {
    const remainingMinutes = Math.ceil((record.lockoutUntil - now) / 60000);
    return {
      blocked: true,
      remainingMinutes,
    };
  }

  if (record.lockoutUntil && now >= record.lockoutUntil) {
    rateLimitMap.delete(key);
    return { blocked: false };
  }

  return { blocked: false };
}

function recordFailedAttempt(key) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { attempts: 0, lockoutUntil: null };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockoutUntil = now + LOCKOUT_DURATION_MS;
  }
  rateLimitMap.set(key, record);
}

function clearRateLimit(key) {
  rateLimitMap.delete(key);
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = await request.json();
    const { identifier, password, remember_me } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your Email Address or Mobile Number." },
        { status: 400 }
      );
    }

    const trimmedIdentifier = identifier.trim().toLowerCase();

    // Rate limit check by IP & identifier
    const rateLimitKey = `${ip}_${trimmedIdentifier}`;
    const rateLimitStatus = checkRateLimit(rateLimitKey);
    if (rateLimitStatus.blocked) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many unsuccessful login attempts. For your security, this account is temporarily locked for ${rateLimitStatus.remainingMinutes} minute(s). Please try again later or reset your password.`,
        },
        { status: 429 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Please enter your Password." },
        { status: 400 }
      );
    }

    // Lookup user by email or mobile number
    const user = await findUserByEmailOrPhone(trimmedIdentifier);

    // Generic error to prevent account enumeration if user doesn't exist
    if (!user) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login credentials. Please check your email/mobile and password or register a new account.",
        },
        { status: 401 }
      );
    }

    // Security: Super Admin accounts must access the dedicated Super Admin portal
    if (user.user_type === "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Administrator account detected. Please access the dedicated Super Admin Portal directly at /admin.",
        },
        { status: 403 }
      );
    }

    // Check account status
    if (user.status === "suspended" || user.status === "blocked") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been deactivated or suspended by the platform administrator. Please contact support.",
        },
        { status: 403 }
      );
    }

    // Verify Password securely
    const isValid = verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login credentials. Please verify your password or use 'Forgot Password' to reset it.",
        },
        { status: 401 }
      );
    }

    // Clear rate limit on successful credentials
    clearRateLimit(rateLimitKey);

    // User type resolution
    const registeredType = (user.user_type || "couple").toLowerCase();
    const effectiveType = registeredType;

    // Set session cookie
    const days = remember_me ? 30 : 7;
    const token = createSessionToken(user, days);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      user_type: effectiveType,
      business_name: user.business_name || null,
      category: user.category || null,
      city: user.city || null,
    };

    const targetDashboard = `/dashboard/${effectiveType}`;

    const response = NextResponse.json({
      success: true,
      message: "Login successful! Welcome back.",
      user: safeUser,
      actualType: effectiveType,
      redirectUrl: targetDashboard,
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
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
