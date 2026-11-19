import { NextResponse } from "next/server";
import { getCurrentUser, verifyPassword, hashPassword } from "@/lib/auth";
import { findUserById, updateUserPassword } from "@/lib/db";

export async function POST(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Current and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: "New password must be at least 6 characters long." }, { status: 400 });
    }

    const fullUser = await findUserById(user.id);
    if (!fullUser) {
      return NextResponse.json({ success: false, message: "User account not found." }, { status: 404 });
    }

    const isValid = verifyPassword(currentPassword, fullUser.password_hash, fullUser.salt);
    if (!isValid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect." }, { status: 400 });
    }

    const { hash, salt } = hashPassword(newPassword);
    await updateUserPassword(user.id, hash, salt);

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

