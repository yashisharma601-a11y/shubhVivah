import { NextResponse } from "next/server";
import { createUser, findUserByEmailOrPhone, saveContactInquiry } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userType, coupleData, vendorData, sellerData, password } = body;

    let name = "";
    let email = "";
    let phone = "";
    let city = "";
    let businessName = "";
    let category = "";
    let details = {};

    if (userType === "couple") {
      name =
        coupleData?.brideName && coupleData?.groomName
          ? `${coupleData.brideName} & ${coupleData.groomName}`
          : coupleData?.brideName || coupleData?.groomName || "ShubhVivah Couple";
      email = (coupleData?.email || "").toLowerCase().trim();
      phone = (coupleData?.mobile || "").trim();
      city = (coupleData?.location || "").trim();
      details = coupleData || {};
    } else if (userType === "vendor") {
      name = (vendorData?.ownerName || vendorData?.businessName || "Vendor Partner").trim();
      businessName = (vendorData?.businessName || "").trim();
      email = (vendorData?.email || "").toLowerCase().trim();
      phone = (vendorData?.mobile || "").trim();
      category = (vendorData?.category || "").trim();
      city = (vendorData?.location || "").trim();
      details = vendorData || {};
    } else if (userType === "seller") {
      name = (sellerData?.contactPerson || sellerData?.businessName || "Seller Partner").trim();
      businessName = (sellerData?.businessName || "").trim();
      email = (sellerData?.email || "").toLowerCase().trim();
      phone = (sellerData?.mobile || "").trim();
      category = (sellerData?.category || "").trim();
      city = (sellerData?.location || "").trim();
      details = sellerData || {};
    }

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "") || "9876543210";

    // 1. Permanently save the contact inquiry
    await saveContactInquiry({
      userType,
      name,
      email,
      phone: cleanPhone,
      city,
      businessName,
      category,
      details,
    });

    const userPassword = password && password.length >= 6 ? password : "Password@123";

    // 2. Ensure user account exists
    const existing = await findUserByEmailOrPhone(email);
    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        message: "Your inquiry has been submitted successfully. Please log in to continue.",
        email,
        userType: existing.user_type || userType,
      });
    }

    // Register user account
    const { hash, salt } = hashPassword(userPassword);
    const newUser = await createUser({
      name,
      email,
      phone: cleanPhone,
      password_hash: hash,
      salt,
      user_type: userType,
      business_name: businessName || null,
      category: category || null,
      city: city || null,
      terms_accepted: true,
    });

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      message: "Your inquiry has been submitted successfully. Please log in to continue.",
      email: newUser.email,
      userType: newUser.user_type,
    });
  } catch (error) {
    console.error("Error in contact register route:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process inquiry submission." },
      { status: 500 }
    );
  }
}
