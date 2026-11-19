import { NextResponse } from "next/server";
import { saveChatbotInquiry } from "@/lib/db";
import { validateName, validatePhone, validateEmail } from "@/lib/validations/formValidation";

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
    const nameVal = validateName(fullName);
    if (!nameVal.isValid) {
      return NextResponse.json(
        { success: false, message: nameVal.error },
        { status: 400 }
      );
    }

    const phoneVal = validatePhone(mobileNumber);
    if (!phoneVal.isValid) {
      return NextResponse.json(
        { success: false, message: phoneVal.error },
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
    let validEmail = null;
    if (email && email.trim()) {
      const emailVal = validateEmail(email);
      if (!emailVal.isValid) {
        return NextResponse.json(
          { success: false, message: emailVal.error },
          { status: 400 }
        );
      }
      validEmail = emailVal.value;
    }
    // Save Inquiry
    const result = await saveChatbotInquiry({
      fullName: nameVal.value,
      mobileNumber: phoneVal.value,
      email: validEmail || "",
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

