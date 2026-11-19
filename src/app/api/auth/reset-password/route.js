import { NextResponse } from "next/server";
import { findUserByEmailOrPhone, updateUserPassword } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { identifier, otp, password } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json(
        { success: false, message: "Registered Email or Mobile Number is required." },
        { status: 400 }
      );
    }

    if (!otp || !otp.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter the 6-digit verification OTP." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const user = await findUserByEmailOrPhone(identifier);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Account not found." },
        { status: 404 }
      );
    }

    // Verify OTP
    if (!user.reset_otp || user.reset_otp !== otp.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code. Please check and enter the correct OTP." },
        { status: 400 }
      );
    }

    // Check expiry
    if (user.reset_otp_expires) {
      const expires = new Date(user.reset_otp_expires).getTime();
      if (Date.now() > expires) {
        return NextResponse.json(
          { success: false, message: "Verification code has expired. Please request a new OTP." },
          { status: 400 }
        );
      }
    }

    // Hash new password
    const { hash, salt } = hashPassword(password);
    await updateUserPassword(user.id, hash, salt);

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}

