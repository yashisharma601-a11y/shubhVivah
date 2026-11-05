import { NextResponse } from "next/server";
import { createUser, findUserByEmailOrPhone } from "@/lib/db";
import { hashPassword, createSessionToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, user_type, business_name, category, city, terms_accepted } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: "Full Name is required." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "A valid Email address is required." }, { status: 400 });
    }
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, message: "A valid 10-digit Mobile Number is required." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters long." }, { status: 400 });
    }
    const validRoles = ["couple", "vendor", "seller"];
    if (!user_type || !validRoles.includes(user_type)) {
      return NextResponse.json({ success: false, message: "Please select a valid user type (Couple, Vendor, or Seller)." }, { status: 400 });
    }

    // Check duplicate
    const existing = await findUserByEmailOrPhone(email);
    if (existing) {
      return NextResponse.json(
        { success: false, message: "An account with this email address already exists. Please log in instead." },
        { status: 409 }
      );
    }
    const existingPhone = await findUserByEmailOrPhone(cleanPhone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "An account with this mobile number already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Hash password
    const { hash, salt } = hashPassword(password);

    // Create user in DB
    const newUser = await createUser({
      name,
      email,
      phone: cleanPhone,
      password_hash: hash,
      salt,
      user_type,
      business_name: business_name || null,
      category: category || null,
      city: city || null,
      terms_accepted: terms_accepted !== false,
    });

    // Session token
    const token = createSessionToken(newUser, 7);

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      user_type: newUser.user_type,
      business_name: newUser.business_name,
      category: newUser.category,
      city: newUser.city,
    };

    const response = NextResponse.json({
      success: true,
      message: "Registration successful!",
      user: safeUser,
      redirectUrl: `/dashboard/${newUser.user_type}`,
    });

    response.cookies.set("shubhvivah_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to register account. Please try again." },
      { status: 500 }
    );
  }
}

