import { NextResponse } from "next/server";
import { saveChatbotInquiry } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      mobileNumber,
      email,
      lookingFor,
      age,
      preferredLocation,
      query,
      conversationSummary,
    } = body;

    // Field Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your valid Full Name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!mobileNumber || typeof mobileNumber !== "string") {
      return NextResponse.json(
        { success: false, message: "Please provide a valid Mobile Number." },
        { status: 400 }
      );
    }

    const cleanPhone = mobileNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 14) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Please provide a brief query or partner requirement." },
        { status: 400 }
      );
    }

    // Optional email validation
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { success: false, message: "Please enter a valid email address or leave it empty." },
          { status: 400 }
        );
      }
    }

    // Save Inquiry
    const result = await saveChatbotInquiry({
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      email: (email || "").trim(),
      lookingFor: lookingFor || "Bride",
      age: age ? String(age).trim() : "",
      preferredLocation: (preferredLocation || "").trim(),
      query: query.trim(),
      conversationSummary: conversationSummary || "",
    });

    if (result.duplicate) {
      return NextResponse.json({
        success: true,
        isDuplicate: true,
        referenceId: `SB-INQ-${result.id}`,
        message: result.message,
      });
    }

    return NextResponse.json({
      success: true,
      referenceId: `SB-INQ-${result.id}`,
      inquiryId: result.id,
      message: `Thank you, ${fullName.trim()} ji! 🙏 Your matchmaking inquiry has been successfully registered (Ref: SB-INQ-${result.id}). Our relationship advisor will reach out to you shortly at +91 ${cleanPhone}.`,
    });
  } catch (error) {
    console.error("Chatbot Inquiry API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry: " + error.message },
      { status: 500 }
    );
  }
}

