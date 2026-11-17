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

      results.push({
        id: `vendor-service-${s.id}`,
        dbId: s.id,
        sourceType: "vendor_service",
        name: s.name || companyName,
        company: companyName,
        categoryType: s.category || "Wedding Service",
        city: cityName,
        location: `${cityName}, India`,
        priceStarting: Number(s.price || 0),
        priceDisplay: `₹${Number(s.price || 0).toLocaleString("en-IN")}`,
        priceRange: `₹${Number(s.price || 0).toLocaleString("en-IN")}`,
        experience: vendor?.experience || "Experienced Professional",
        rating: 5.0,
        reviewCount: 1,
        badge: "Verified Vendor",
        image: Array.isArray(s.images) && s.images.length > 0 ? s.images[0] : "/images/decoration/royal-wedding-stage.jpg",
        gallery: Array.isArray(s.images) && s.images.length > 0 ? s.images : ["/images/decoration/royal-wedding-stage.jpg"],
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
          address: vendor?.fullAddress || "",
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
