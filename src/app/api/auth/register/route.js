import { NextResponse } from "next/server";
import {
  createUser,
  findUserByEmailOrPhone,
  saveCoupleProfile,
  saveSellerProfile,
  saveVendorProfile,
  savePartnerPreferences,
  saveUserDocuments,
  saveProduct,
  saveService,
  saveWeddingDetails,
  saveCustomerPreferences,
  saveVendorPackage,
  saveVendorPortfolio,
} from "@/lib/db";
import { hashPassword, createSessionToken } from "@/lib/auth";
import { validateName, validatePhone, validateEmail } from "@/lib/validations/formValidation";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      user_type, // 'couple' | 'seller' | 'vendor'
      email,
      phone,
      password,
      terms_accepted,
      // Generic / Basic
      name,
      firstName,
      lastName,
      alternatePhone,
      avatar_url,
      // Couple Specific
      groomName,
      brideName,
      userRole, // Bride / Groom / Parent / Family Member / Other
      weddingDate,
      dateNotFinalized,
      isDateFlexible,
      weddingLocation,
      guestCount,
      weddingBudget,
      weddingFunctions,
      servicesRequired,
      preferredVendorCity,
      estimatedBudgetPerService,
      preferredContactMethod,
      additionalRequirements,
      country,
      state,
      city,
      fullAddress,
      pincode,
      // Seller Specific
      businessName,
      sellerType,
      businessCategory,
      businessDescription,
      yearOfEstablishment,
      gstNumber,
      panNumber,
      websiteUrl,
      instagramUrl,
      facebookUrl,
      productCategories,
      // Seller Product
      initialProduct,
      storeAddress,
      businessLogoUrl,
      idProofUrl,
      businessProofUrl,
      gstCertificateUrl,
      // Vendor Specific
      vendorType,
      vendorCategory,
      vendorCategories,
      experienceYears,
      teamSize,
      youtubeUrl,
      // Vendor Services & Pricing
      serviceName,
      serviceDescription,
      servicesOffered,
      startingPrice,
      maxPrice,
      pricingType,
      packagesAvailable,
      initialPackage,
      customizationAvailable,
      advanceBookingAmount,
      cancellationPolicy,
      // Vendor Location & Availability
      businessAddress,
      serviceAreas,
      destinationWeddingServices,
      outstationWeddingAvailability,
      travelCharges,
      bookingAvailability,
      advanceBookingRequired,
      vendorEventDate,
      // Vendor Portfolio & Verification
      portfolioImages,
      previousWorkUrl,
      portfolioWebsiteUrl,
      addressProofUrl,
    } = body;

    // 1. Role validation
    const validRoles = ["couple", "seller", "vendor"];
    const normalizedRole = (user_type || "").toLowerCase().trim();
    if (!validRoles.includes(normalizedRole)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid user category (Couple, Seller, or Vendor)." },
        { status: 400 }
      );
    }

    // 2. Email & Phone validation
    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      return NextResponse.json(
        { success: false, message: emailVal.error },
        { status: 400 }
      );
    }

    const phoneVal = validatePhone(phone);
    if (!phoneVal.isValid) {
      return NextResponse.json(
        { success: false, message: phoneVal.error },
        { status: 400 }
      );
    }
    const cleanPhone = phoneVal.value;

    // 3. Password Validation: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must have at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
        { status: 400 }
      );
    }

    // 4. Terms acceptance
    if (!terms_accepted) {
      return NextResponse.json(
        { success: false, message: "You must accept the Terms & Conditions and Privacy Policy to proceed." },
        { status: 400 }
      );
    }

    // 5. Duplicate Check
    const existingEmail = await findUserByEmailOrPhone(email.trim());
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "An account with this Email Address already exists. Please log in instead." },
        { status: 409 }
      );
    }

    const existingPhone = await findUserByEmailOrPhone(cleanPhone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "An account with this Mobile Number already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // 6. Name resolution
    const resolvedName =
      (name && name.trim()) ||
      (groomName && brideName ? `${groomName} & ${brideName}` : groomName || brideName) ||
      [firstName, lastName].filter(Boolean).join(" ").trim() ||
      businessName ||
      "Member";

    // 7. Hash Password
    const { hash, salt } = hashPassword(password);

    // 8. Create Central User Record
    const userPayload = {
      name: resolvedName,
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      alternate_phone: alternatePhone || null,
      password_hash: hash,
      salt,
      user_type: normalizedRole,
      business_name: businessName || null,
      category: normalizedRole === "vendor" ? (vendorCategory || (Array.isArray(vendorCategories) ? vendorCategories[0] : null)) : normalizedRole === "seller" ? businessCategory : null,
      city: city || weddingLocation || null,
      state: state || null,
      country: country || "India",
      address: businessAddress || fullAddress || null,
      avatar_url: avatar_url || businessLogoUrl || null,
      bio: businessDescription || additionalRequirements || null,
      gst_number: gstNumber || null,
      experience_years: experienceYears ? Number(experienceYears) : 0,
      wedding_date: normalizedRole === "couple" ? (dateNotFinalized ? null : weddingDate || null) : null,
      terms_accepted: true,
      status: "active",
    };

    const newUser = await createUser(userPayload);
    const userId = newUser.id;

    // 9. Role-Specific Profile Persist
    if (normalizedRole === "couple") {
      await saveCoupleProfile({
        userId,
        firstName: firstName || "",
        lastName: lastName || "",
        groomName: groomName || "",
        brideName: brideName || "",
        userRole: userRole || "Bride",
        weddingDate: dateNotFinalized ? "Not Finalized Yet" : weddingDate || "",
        dateNotFinalized: Boolean(dateNotFinalized),
        isDateFlexible: isDateFlexible || "No",
        weddingLocation: weddingLocation || "",
        country: country || "India",
        state: state || "",
        city: city || "",
        fullAddress: fullAddress || "",
        pincode: pincode || "",
        expectedGuestCount: guestCount || "",
        weddingBudget: weddingBudget || "",
        weddingFunctions: Array.isArray(weddingFunctions) ? weddingFunctions : [],
        servicesRequired: Array.isArray(servicesRequired) ? servicesRequired : [],
        avatar_url: avatar_url || null,
      });

      await saveWeddingDetails({
        userId,
        groomName: groomName || "",
        brideName: brideName || "",
        weddingDate: dateNotFinalized ? null : weddingDate || null,
        dateNotFinalized: Boolean(dateNotFinalized),
        isDateFlexible: isDateFlexible || "No",
        location: weddingLocation || city || "",
        guestCount: guestCount || "",
        budget: weddingBudget || "",
        functions: Array.isArray(weddingFunctions) ? weddingFunctions : [],
      });

      await saveCustomerPreferences({
        userId,
        servicesRequired: Array.isArray(servicesRequired) ? servicesRequired : [],
        preferredVendorCity: preferredVendorCity || city || "",
        estimatedBudgetPerService: estimatedBudgetPerService || "",
        preferredContactMethod: preferredContactMethod || "WhatsApp",
        additionalRequirements: additionalRequirements || "",
      });
    } else if (normalizedRole === "seller") {
      await saveSellerProfile({
        userId,
        ownerFirstName: firstName || "",
        ownerLastName: lastName || "",
        fullName: resolvedName,
        businessName: businessName || "",
        sellerType: sellerType || "Individual",
        businessCategory: businessCategory || "",
        businessDescription: businessDescription || "",
        yearOfEstablishment: yearOfEstablishment || "",
        gstNumber: gstNumber || "",
        panNumber: panNumber || "",
        websiteUrl: websiteUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        productCategories: Array.isArray(productCategories) ? productCategories : [productCategories].filter(Boolean),
        country: country || "India",
        state: state || "",
        city: city || "",
        fullAddress: fullAddress || businessAddress || "",
        pincode: pincode || "",
        storeAddress: storeAddress || "",
        businessLogoUrl: businessLogoUrl || null,
      });

      if (initialProduct && initialProduct.name) {
        await saveProduct({
          seller_id: userId,
          name: initialProduct.name,
          category: initialProduct.category || businessCategory || "Wedding Essentials",
          description: initialProduct.description || "",
          price: initialProduct.price || 0,
          discount_price: initialProduct.discountPrice || 0,
          stock: initialProduct.stock || 10,
          variants: initialProduct.variants || "",
          customization_available: Boolean(initialProduct.customizationAvailable),
          made_to_order: Boolean(initialProduct.madeToOrder),
          delivery_available: Boolean(initialProduct.deliveryAvailable),
          delivery_locations: initialProduct.deliveryLocations || "",
          return_policy: initialProduct.returnPolicy || "",
          images: Array.isArray(initialProduct.images) ? initialProduct.images : [],
        });
      }

      if (idProofUrl || businessProofUrl || gstCertificateUrl) {
        await saveUserDocuments({
          userId,
          idProofUrl: idProofUrl || null,
          businessProofUrl: businessProofUrl || null,
          gstCertificateUrl: gstCertificateUrl || null,
          documentType: "Seller Verification",
        });
      }
    } else if (normalizedRole === "vendor") {
      await saveVendorProfile({
        userId,
        firstName: firstName || "",
        lastName: lastName || "",
        fullName: resolvedName,
        businessName: businessName || "",
        vendorType: vendorType || "Individual",
        businessCategory: vendorCategory || "Wedding Service",
        vendorCategories: Array.isArray(vendorCategories) ? vendorCategories : [vendorCategory].filter(Boolean),
        businessDescription: businessDescription || "",
        experienceYears: Number(experienceYears) || 0,
        yearOfEstablishment: yearOfEstablishment || "",
        teamSize: teamSize || "",
        gstNumber: gstNumber || "",
        panNumber: panNumber || "",
        websiteUrl: websiteUrl || "",
        instagramUrl: instagramUrl || "",
        facebookUrl: facebookUrl || "",
        youtubeUrl: youtubeUrl || "",
        country: country || "India",
        state: state || "",
        city: city || "",
        businessAddress: businessAddress || fullAddress || "",
        pincode: pincode || "",
        serviceAreas: serviceAreas || "",
        destinationWeddingServices: destinationWeddingServices || "Yes",
        outstationWeddingAvailability: outstationWeddingAvailability || "Yes",
        travelCharges: travelCharges || "Client pays stay & travel",
        bookingAvailability: bookingAvailability || "Open for bookings",
        advanceBookingRequired: advanceBookingRequired || "Yes",
        eventAvailabilityDate: vendorEventDate || null,
        startingPrice: startingPrice || "",
        maxPrice: maxPrice || "",
        pricingType: pricingType || "Per Event",
        businessLogoUrl: businessLogoUrl || null,
      });

      if (serviceName || servicesOffered) {
        await saveService({
          vendor_id: userId,
          name: serviceName || servicesOffered,
          category: vendorCategory || "Wedding Service",
          starting_price: startingPrice || "0",
          max_price: maxPrice || "0",
          price_type: pricingType || "Per Event",
          description: serviceDescription || businessDescription || "",
          customization_available: Boolean(customizationAvailable),
          advance_booking_amount: advanceBookingAmount || "",
          cancellation_policy: cancellationPolicy || "",
        });
      }

      if (packagesAvailable && initialPackage && initialPackage.name) {
        await saveVendorPackage({
          userId,
          name: initialPackage.name,
          description: initialPackage.description || "",
          price: initialPackage.price || "",
          inclusions: initialPackage.inclusions || "",
        });
      }

      if (portfolioImages?.length || previousWorkUrl || portfolioWebsiteUrl) {
        await saveVendorPortfolio({
          userId,
          images: Array.isArray(portfolioImages) ? portfolioImages : [],
          previousWorkUrl: previousWorkUrl || "",
          portfolioWebsiteUrl: portfolioWebsiteUrl || "",
          instagramUrl: instagramUrl || "",
          youtubeUrl: youtubeUrl || "",
        });
      }

      if (idProofUrl || businessProofUrl || gstCertificateUrl || addressProofUrl) {
        await saveUserDocuments({
          userId,
          idProofUrl: idProofUrl || null,
          businessProofUrl: businessProofUrl || null,
          gstCertificateUrl: gstCertificateUrl || null,
          addressProofUrl: addressProofUrl || null,
          documentType: "Vendor Verification",
        });
      }
    }

    // 10. Prepare Safe User Summary (Do NOT auto-login or set session cookie)
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

    const targetLogin = `/login?type=${encodeURIComponent(newUser.user_type)}&registered=true&email=${encodeURIComponent(newUser.email)}`;

    return NextResponse.json({
      success: true,
      message: "Registration Successful! Your ShubhVivah account has been created. Please log in to explore wedding services.",
      user: safeUser,
      redirectUrl: targetLogin,
    });
  } catch (error) {
    console.error("Complete registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to complete registration. Please try again." },
      { status: 500 }
    );
  }
}
