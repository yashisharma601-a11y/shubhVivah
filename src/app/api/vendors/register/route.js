import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { saveVendorRegistration } from "@/lib/db";

// Helper to sanitize filenames
function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
}

/**
 * Saves an uploaded file to the specified public directory and returns its URL.
 */
async function saveUploadedFile(file, subfolder) {
  if (!file || typeof file === "string" || !file.name || file.size === 0) {
    return null;
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "vendors", subfolder);
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, ext);
    const uniqueName = `${sanitizeFileName(baseName)}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filePath, buffer);

    return `/uploads/vendors/${subfolder}/${uniqueName}`;
  } catch (error) {
    console.error(`Failed to save uploaded file in ${subfolder}:`, error);
    return null;
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // 1. Extract text fields
    const businessName = formData.get("business_name")?.trim();
    const category = formData.get("category")?.trim();
    const ownerName = formData.get("owner_name")?.trim();
    const email = formData.get("email")?.trim();
    const phone = formData.get("phone")?.trim();
    const whatsapp = formData.get("whatsapp")?.trim() || "";
    const website = formData.get("website")?.trim() || "";
    const description = formData.get("description")?.trim();

    const country = formData.get("country")?.trim() || "India";
    const state = formData.get("state")?.trim();
    const city = formData.get("city")?.trim();
    const address = formData.get("address")?.trim();
    const pincode = formData.get("pincode")?.trim();

    const servicesOffered = formData.get("services_offered")?.trim();
    const startingPrice = formData.get("starting_price")?.trim();
    const pricingType = formData.get("pricing_type")?.trim() || "Starting From";
    const serviceAreas = formData.get("service_areas")?.trim() || "";
    const experienceYears = formData.get("experience_years") || 0;
    const weddingsCompleted = formData.get("weddings_completed") || 0;

    const instagramUrl = formData.get("instagram_url")?.trim() || "";
    const facebookUrl = formData.get("facebook_url")?.trim() || "";
    const youtubeUrl = formData.get("youtube_url")?.trim() || "";

    const workingHours = formData.get("working_hours")?.trim() || "";
    const availability = formData.get("availability")?.trim() || "";
    const preferredContact = formData.get("preferred_contact")?.trim() || "Phone";
    const termsAccepted = formData.get("terms_accepted") === "true";

    // 2. Validate required fields
    if (!businessName) return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    if (!category) return NextResponse.json({ error: "Business category is required" }, { status: 400 });
    if (!ownerName) return NextResponse.json({ error: "Owner name is required" }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid business email address is required" }, { status: 400 });
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      return NextResponse.json({ error: "Valid 10-digit Indian contact number is required" }, { status: 400 });
    }
    if (!description) return NextResponse.json({ error: "Business description is required" }, { status: 400 });
    if (!state) return NextResponse.json({ error: "State is required" }, { status: 400 });
    if (!city) return NextResponse.json({ error: "City is required" }, { status: 400 });
    if (!address) return NextResponse.json({ error: "Full business address is required" }, { status: 400 });
    if (!pincode || !/^\d{6}$/.test(pincode.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Valid 6-digit PIN code is required" }, { status: 400 });
    }
    if (!servicesOffered) return NextResponse.json({ error: "Services offered is required" }, { status: 400 });
    if (!startingPrice) return NextResponse.json({ error: "Starting package price is required" }, { status: 400 });
    if (!termsAccepted) return NextResponse.json({ error: "Terms and conditions must be accepted" }, { status: 400 });

    // 3. Process Uploaded Files
    const logoFile = formData.get("logo");
    const coverFile = formData.get("cover_image");
    const portfolioFiles = formData.getAll("portfolio_images");

    const logoUrl = await saveUploadedFile(logoFile, "logos");
    const coverUrl = await saveUploadedFile(coverFile, "covers");

    const portfolioUrls = [];
    for (const pFile of portfolioFiles) {
      if (pFile && typeof pFile !== "string" && pFile.size > 0) {
        const pUrl = await saveUploadedFile(pFile, "portfolio");
        if (pUrl) portfolioUrls.push(pUrl);
      }
    }

    // 4. Save into Database
    const vendorPayload = {
      business_name: businessName,
      category,
      owner_name: ownerName,
      email,
      phone,
      whatsapp,
      website,
      description,
      country,
      state,
      city,
      address,
      pincode,
      services_offered: servicesOffered,
      starting_price: startingPrice,
      pricing_type: pricingType,
      service_areas: serviceAreas,
      experience_years: Number(experienceYears) || 0,
      weddings_completed: Number(weddingsCompleted) || 0,
      logo_url: logoUrl,
      cover_image_url: coverUrl,
      portfolio_images: portfolioUrls,
      instagram_url: instagramUrl,
      facebook_url: facebookUrl,
      youtube_url: youtubeUrl,
      working_hours: workingHours,
      availability,
      preferred_contact: preferredContact,
      terms_accepted: termsAccepted,
    };

    const result = await saveVendorRegistration(vendorPayload);

    return NextResponse.json({
      success: true,
      message:
        "Your business registration has been submitted successfully! Our team will review your details and contact you shortly.",
      registrationId: result.id,
      storage: result.storage,
      vendor: {
        business_name: businessName,
        category,
        owner_name: ownerName,
        email,
        phone,
        city,
        state,
        logo_url: logoUrl,
      },
    });
  } catch (error) {
    console.error("API /api/vendors/register error:", error);
    return NextResponse.json(
      { error: "Failed to process vendor registration. Please try again." },
      { status: 500 }
    );
  }
}

