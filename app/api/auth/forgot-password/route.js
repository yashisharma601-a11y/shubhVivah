import { NextResponse } from "next/server";
import { findUserByEmailOrPhone, setUserResetOtp } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { identifier } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter your registered Email Address or Mobile Number." },
        { status: 400 }
      );
    }

    const user = await findUserByEmailOrPhone(identifier);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No registered account found with this Email Address or Mobile Number.",
        },
        { status: 404 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await setUserResetOtp(user.id, otp, expiresAt);

    // In production, integrate SMS/Email service.
    // For demo/dev convenience, we provide dev_otp so testing is seamless!
    return NextResponse.json({
      success: true,
      message: `Verification code generated successfully for ${user.email}.`,
      user_identifier: user.email,
      dev_otp: otp, // For convenient testing and immediate verification
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}

