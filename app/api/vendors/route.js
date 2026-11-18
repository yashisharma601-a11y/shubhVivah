import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function readJson(filename) {
  try {
    const filePath = path.join(process.cwd(), "data", filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category")?.toLowerCase() || "";

    const [products, services, sellerProfiles, vendorProfiles, users] = await Promise.all([
      readJson("products.json"),
      readJson("services.json"),
      readJson("seller_profiles.json"),
      readJson("vendor_profiles.json"),
      readJson("users.json"),
    ]);

    const userMap = new Map();
    users.forEach((u) => {
      userMap.set(String(u.id), u);
    });

    const sellerMap = new Map();
    sellerProfiles.forEach((s) => {
      sellerMap.set(String(s.userId), s);
    });

    const vendorMap = new Map();
    vendorProfiles.forEach((v) => {
      vendorMap.set(String(v.userId), v);
    });

    const results = [];

    // Process seller products
    for (const p of products) {
      if (p.status !== "active") continue;
      const pCat = (p.category || "").toLowerCase();
      const pName = (p.name || "").toLowerCase();
      const pDesc = (p.description || "").toLowerCase();

      // Check match if category param provided
      if (category) {
        const matchesCategory =
          pCat.includes(category) ||
          pName.includes(category) ||
          pDesc.includes(category) ||
          (category.includes("decor") && (pCat.includes("decor") || pName.includes("decor"))) ||
          (category.includes("photo") && (pCat.includes("photo") || pName.includes("photo"))) ||
          (category.includes("makeup") && (pCat.includes("makeup") || pName.includes("makeup"))) ||
          (category.includes("mehndi") && (pCat.includes("mehndi") || pName.includes("mehndi"))) ||
          (category.includes("wear") && (pCat.includes("wear") || pCat.includes("bridal") || pCat.includes("groom"))) ||
          (category.includes("planner") && (pCat.includes("plan") || pCat.includes("event")));

        if (!matchesCategory) continue;
      }

      const seller = sellerMap.get(String(p.seller_id));
      const user = userMap.get(String(p.seller_id));

      const companyName = seller?.businessName || user?.business_name || p.seller_name || user?.name || "Verified Vendor";
      const cityName = seller?.city || user?.city || "New Delhi";

      results.push({
        id: `seller-product-${p.id}`,
        dbId: p.id,
        sourceType: "seller_product",
        name: p.name || companyName,
        company: companyName,
        categoryType: p.category || "Wedding Decorations",
        city: cityName,
        location: `${cityName}, India`,
        priceStarting: Number(p.discount_price || p.price || 0),
        priceDisplay: `₹${(p.discount_price || p.price || 0).toLocaleString("en-IN")}`,
        priceRange: p.discount_price
          ? `₹${Number(p.discount_price).toLocaleString("en-IN")} – ₹${Number(p.price).toLocaleString("en-IN")}`
          : `₹${Number(p.price || 0).toLocaleString("en-IN")}`,
        experience: seller?.yearOfEstablishment
          ? `${new Date().getFullYear() - Number(seller.yearOfEstablishment)}+ Years Experience`
          : "Verified Seller",
        rating: 5.0,
        reviewCount: 1,
        badge: "Verified Seller",
        image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : "/images/decoration/royal-wedding-stage.jpg",
        gallery: Array.isArray(p.images) && p.images.length > 0 ? p.images : ["/images/decoration/royal-wedding-stage.jpg"],
        services: p.variants ? p.variants.split(",").map((s) => s.trim()) : [p.name, p.category],
        highlights: [
          p.customization_available ? "Customization Available" : "Quality Assured",
          p.made_to_order ? "Made to Order" : "Ready Setup",
          p.delivery_available ? "On-Site Setup Available" : "Verified Partner",
        ],
        about: p.description || seller?.businessDescription || "Professional wedding services with personalized touch.",
        packageIncludes: [
          "Complete Ceremony Setup & Decor Arrangement",
          "Dedicated Coordinator & Execution Crew",
          "Custom Theme Styling as per Couple Requirements",
          "Premium Materials & Floral Lighting Integration",
        ],
        sellerContact: {
          phone: user?.phone || "",
          email: user?.email || "",
          storeAddress: seller?.storeAddress || seller?.fullAddress || "",
        },
      });
    }

    // Process vendor services
    for (const s of services) {
      if (s.status !== "active") continue;
      const sCat = (s.category || "").toLowerCase();
      const sName = (s.name || "").toLowerCase();
      const sDesc = (s.description || "").toLowerCase();

      if (category) {
        const matchesCategory =
          sCat.includes(category) ||
          sName.includes(category) ||
          sDesc.includes(category) ||
          (category.includes("decor") && (sCat.includes("decor") || sName.includes("decor"))) ||
          (category.includes("photo") && (sCat.includes("photo") || sName.includes("photo"))) ||
          (category.includes("makeup") && (sCat.includes("makeup") || sName.includes("makeup"))) ||
          (category.includes("mehndi") && (sCat.includes("mehndi") || sName.includes("mehndi"))) ||
          (category.includes("wear") && (sCat.includes("wear") || sCat.includes("bridal") || sCat.includes("groom"))) ||
          (category.includes("planner") && (sCat.includes("plan") || sCat.includes("event")));

        if (!matchesCategory) continue;
      }

      const vendor = vendorMap.get(String(s.vendor_id));
      const user = userMap.get(String(s.vendor_id));

      const companyName = vendor?.businessName || user?.business_name || s.vendor_name || user?.name || "Verified Vendor";
      const cityName = vendor?.city || user?.city || "New Delhi";
      const priceNum = Number(s.starting_price || s.price || 0);
      const maxPriceNum = Number(s.max_price || 0);

      results.push({
        id: `vendor-service-${s.id}`,
        dbId: s.id,
        sourceType: "vendor_service",
        name: s.name || companyName,
        company: companyName,
        categoryType: s.category || "Wedding Service",
        city: cityName,
        location: `${cityName}, India`,
        priceStarting: priceNum,
        priceDisplay: priceNum > 0 ? `₹${priceNum.toLocaleString("en-IN")}` : "Custom Quote",
        priceRange: maxPriceNum > priceNum
          ? `₹${priceNum.toLocaleString("en-IN")} – ₹${maxPriceNum.toLocaleString("en-IN")}`
          : priceNum > 0 ? `₹${priceNum.toLocaleString("en-IN")}` : "Custom Quote",
        experience: vendor?.experienceYears ? `${vendor.experienceYears}+ Years Experience` : (vendor?.experience || "Experienced Professional"),
        rating: 5.0,
        reviewCount: 1,
        badge: "Verified Vendor",
        image: Array.isArray(s.images) && s.images.length > 0 ? s.images[0] : (Array.isArray(vendor?.portfolioImages) && vendor.portfolioImages[0] ? vendor.portfolioImages[0] : "/images/decoration/royal-wedding-stage.jpg"),
        gallery: Array.isArray(s.images) && s.images.length > 0 ? s.images : (Array.isArray(vendor?.portfolioImages) && vendor.portfolioImages.length > 0 ? vendor.portfolioImages : ["/images/decoration/royal-wedding-stage.jpg"]),
        services: s.inclusions ? s.inclusions.split(",").map((i) => i.trim()) : [s.name, s.category],
        highlights: [
          "Professional On-time Delivery",
          "Dedicated Execution Team",
          "100% Satisfaction Guarantee",
        ],
        about: s.description || vendor?.businessDescription || "Luxury wedding service crafted to perfection.",
        packageIncludes: [
          "Complete Service Coordination",
          "Premium Equipment & Materials",
          "Dedicated Event Staff",
        ],
        vendorContact: {
          phone: user?.phone || "",
          email: user?.email || "",
          address: vendor?.businessAddress || vendor?.fullAddress || user?.address || "",
        },
      });
    }

    const servicedVendorIds = new Set(services.filter((s) => s.status === "active").map((s) => String(s.vendor_id)));

    // Process vendors without specific services registered yet
    for (const u of users) {
      if (u.user_type !== "vendor" || u.status === "suspended") continue;
      if (servicedVendorIds.has(String(u.id))) continue;

      const vendor = vendorMap.get(String(u.id));
      const uCat = (u.category || vendor?.businessCategory || "").toLowerCase();
      const uBus = (u.business_name || vendor?.businessName || "").toLowerCase();
      const uName = (u.name || "").toLowerCase();

      if (category) {
        const matchesCategory =
          uCat.includes(category) ||
          uBus.includes(category) ||
          uName.includes(category) ||
          (category.includes("cater") && (uCat.includes("cater") || uBus.includes("cater"))) ||
          (category.includes("decor") && (uCat.includes("decor") || uBus.includes("decor"))) ||
          (category.includes("photo") && (uCat.includes("photo") || uBus.includes("photo"))) ||
          (category.includes("makeup") && (uCat.includes("makeup") || uBus.includes("makeup"))) ||
          (category.includes("mehndi") && (uCat.includes("mehndi") || uBus.includes("mehndi"))) ||
          (category.includes("wear") && (uCat.includes("wear") || uCat.includes("bridal") || uCat.includes("groom"))) ||
          (category.includes("planner") && (uCat.includes("plan") || uCat.includes("event")));

        if (!matchesCategory) continue;
      }

      const companyName = vendor?.businessName || u.business_name || u.name || "Verified Vendor";
      const cityName = vendor?.city || u.city || "New Delhi";
      const startPrice = Number(vendor?.startingPrice || 50000);
      const maxPrice = Number(vendor?.maxPrice || 0);

      results.push({
        id: `vendor-profile-${u.id}`,
        dbId: u.id,
        sourceType: "vendor_profile",
        name: companyName,
        company: companyName,
        categoryType: u.category || vendor?.businessCategory || "Caterer",
        city: cityName,
        location: `${cityName}, India`,
        priceStarting: startPrice,
        priceDisplay: startPrice > 0 ? `₹${startPrice.toLocaleString("en-IN")}` : "Custom Quote",
        priceRange: maxPrice > startPrice
          ? `₹${startPrice.toLocaleString("en-IN")} – ₹${maxPrice.toLocaleString("en-IN")}`
          : startPrice > 0 ? `₹${startPrice.toLocaleString("en-IN")}` : "Custom Quote",
        experience: vendor?.experienceYears ? `${vendor.experienceYears}+ Years Experience` : `${u.experience_years || 5}+ Years Experience`,
        rating: 5.0,
        reviewCount: 1,
        badge: "Verified Vendor",
        image: Array.isArray(vendor?.portfolioImages) && vendor.portfolioImages[0] ? vendor.portfolioImages[0] : "/images/decoration/royal-wedding-stage.jpg",
        gallery: Array.isArray(vendor?.portfolioImages) && vendor.portfolioImages.length > 0 ? vendor.portfolioImages : ["/images/decoration/royal-wedding-stage.jpg"],
        services: [companyName, u.category || "Wedding Caterer"],
        highlights: [
          "Professional On-time Delivery",
          "Dedicated Execution Team",
          "100% Satisfaction Guarantee",
        ],
        about: vendor?.businessDescription || u.bio || "Premier wedding catering services tailored to your taste and celebrations.",
        packageIncludes: [
          "Complete Catering Setup & Service Management",
          "Uniformed Waitstaff & Chefs",
          "Custom Menu Consultation & Tasting",
          "Hygienic Prep & Presentation Counters",
        ],
        vendorContact: {
          phone: u.phone || "",
          email: u.email || "",
          address: vendor?.businessAddress || u.address || "",
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      listings: results,
    });
  } catch (error) {
    console.error("Error fetching vendor listings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch vendor listings" },
      { status: 500 }
    );
  }
}
