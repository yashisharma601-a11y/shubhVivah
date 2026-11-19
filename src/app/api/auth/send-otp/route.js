import { NextResponse } from "next/server";
import { findUserByEmailOrPhone, saveOtpVerification, verifyOtpCode } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, target, type, otp } = body; // action: 'send' | 'verify'

    if (!target || !target.trim()) {
      return NextResponse.json(
        { success: false, message: "Email or Mobile Number is required." },
        { status: 400 }
      );
    }

    const cleanTarget = target.trim();

    if (action === "send") {
      // Check if user already registered
      const existing = await findUserByEmailOrPhone(cleanTarget);
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            message: `An account with this ${type === "phone" ? "mobile number" : "email"} is already registered. Please log in.`,
          },
          { status: 409 }
        );
      }

      // Generate 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await saveOtpVerification({
        target: cleanTarget,
        type: type || (cleanTarget.includes("@") ? "email" : "phone"),
        otp: generatedOtp,
        expiresAt,
      });

      return NextResponse.json({
        success: true,
        message: `OTP sent successfully to ${cleanTarget}.`,
        dev_otp: generatedOtp, // For quick testing and seamless demo
      });
    }

    if (action === "verify") {
      if (!otp || !otp.trim()) {
        return NextResponse.json(
          { success: false, message: "Please enter the 6-digit verification code." },
          { status: 400 }
        );
      }

      const isValid = await verifyOtpCode(cleanTarget, otp.trim());
      if (!isValid) {
        return NextResponse.json(
          { success: false, message: "Invalid or expired verification code. Please try again." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Verification successful!",
        verified: true,
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("OTP API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process OTP." },
      { status: 500 }
    );
  }
}

