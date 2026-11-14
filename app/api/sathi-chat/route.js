import { NextResponse } from "next/server";

// Rate limiting map (in-memory, IP/Session based)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;

  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count += 1;
  }
  rateLimitMap.set(ip, record);

  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  return record.count <= maxRequests;
}

// -----------------------------------------------------------------------------
// SATHI'S WEDDING MARKETPLACE KNOWLEDGE BASE
// -----------------------------------------------------------------------------
const KNOWLEDGE_RESPONSES = [
  // 1. GREETINGS & INTRODUCTIONS
  {
    triggers: [
      "namaste", "namaskar", "pranam", "hello", "hi", "hey", "hola", "kese ho",
      "kaise ho", "how are you", "who are you", "tum kaun ho", "aap kaun ho",
      "sathi", "good morning", "good evening", "good afternoon"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `नमस्ते! 🙏 शुभविवाह (ShubhVivah) में आपका हार्दिक स्वागत है।\n\nमैं **साथी (Sathi)** हूँ, आपका पर्सनल वेडिंग प्लानिंग असिस्टेंट।\n\nमैं आपकी शादी की तैयारी में कैसे मदद कर सकता हूँ? आप हेरिटेज वेन्यू, बैंक्वेट हॉल, वेडिंग फोटोग्राफर, मेकअप आर्टिस्ट, कैटरिंग या शादी के सप्लायर्स के बारे में पूछ सकते हैं।`,
          actions: ["Browse Wedding Venues", "Find Wedding Vendors", "Wedding Suppliers", "Book a Venue"],
          navLinks: [
            { label: "Explore Wedding Venues", href: "/venues" },
            { label: "Find Wedding Vendors", href: "/wedding-vendors/wedding-photography" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Namaste! 🙏 ShubhVivah par aapka swagat hai.\n\nMain **Sathi** hoon, aapka personal wedding planning assistant.\n\nAapko wedding venues (Palaces, Banquet Halls), wedding vendors (Photographer, Makeup, Decorator) ya bulk suppliers (Water, Dairy) dhoondhne me main kaise madad kar sakta hoon?`,
          actions: ["Browse Wedding Venues", "Find Wedding Vendors", "Wedding Suppliers", "Book a Venue"],
          navLinks: [
            { label: "Browse Venues", href: "/venues" },
            { label: "Explore Vendors", href: "/wedding-vendors/wedding-photography" }
          ]
        };
      }
      return {
        text: `Namaste! 🙏 Welcome to **ShubhVivah** — Your Premier Luxury Wedding Marketplace.\n\nI'm **Sathi**, your AI Wedding Concierge. I can help you discover luxury heritage palaces, top banquet halls, certified wedding vendors (photographers, decorators, makeup artists), and bulk wedding suppliers.`,
        actions: ["Browse Wedding Venues", "Find Wedding Vendors", "Wedding Suppliers", "Book a Venue"],
        navLinks: [
          { label: "Browse Venues", href: "/venues" },
          { label: "Find Vendors", href: "/wedding-vendors/wedding-photography" }
        ]
      };
    }
  },

  // 2. BROWSE / FIND VENUES
  {
    triggers: [
      "venue", "venues", "banquet", "palace", "resort", "garden", "hall", "lawns",
      "heritage", "udaipur", "jaipur", "hotel", "marriage garden", "booking", "fort", "place"
    ],
    getReply: (lang) => {
      return {
        text: `ShubhVivah offers 3,200+ hand-picked luxury wedding venues across India:\n\n• **Heritage Palaces & Forts**: Neemrana Fort, Samode Palace, Umaid Bhawan Resort, Chomu Palace (Royal destination weddings)\n• **Luxury Banquet Halls**: Crystal ballrooms with centralized AC, guest rooms & catering\n• **Wedding Resorts & Lawns**: Open-air lush green marriage lawns (500–5,000+ guest capacities)\n\nWhich destination or city are you planning your wedding in?`,
        actions: ["Heritage Palaces", "Luxury Banquet Halls", "Destination Resorts", "Contact Concierge"],
        navLinks: [
          { label: "Explore All Venues", href: "/venues" },
          { label: "Banquet Halls", href: "/venues/banquet-halls" },
          { label: "Heritage Palaces", href: "/venues/heritage-palaces" }
        ]
      };
    }
  },

  // 3. WEDDING VENDORS (Photographers, Makeup, Decor, Planners)
  {
    triggers: [
      "vendor", "vendors", "photographer", "photography", "photo", "candid", "drone",
      "makeup", "bridal", "mua", "mehndi", "mehandi", "decorator", "decoration",
      "mandap", "planner", "dj", "catering", "wear", "lehenga", "sherwani"
    ],
    getReply: (lang) => {
      return {
        text: `We connect you with 100% verified premium wedding artists & professionals:\n\n• **Wedding Photographers**: 4K Cinematic films, drone shoots, pre-wedding & candid photography\n• **Bridal Makeup Artists**: HD, Airbrush, Reception & Sagan looks with trial sessions\n• **Wedding Decorators**: Royal marigold, floral mandaps, fairy-light stage themes\n• **Mehndi Artists**: Traditional Marwari, Arabic & bridal storytelling henna\n• **Wedding Planners**: Complete end-to-end event management`,
        actions: ["Wedding Photographers", "Bridal Makeup Artists", "Wedding Decorators", "Mehndi Artists"],
        navLinks: [
          { label: "Photographers", href: "/wedding-vendors/wedding-photography" },
          { label: "Makeup Artists", href: "/wedding-vendors/bridal-makeup-artist" },
          { label: "Decorators", href: "/wedding-vendors/decoration" },
          { label: "Mehndi Artists", href: "/wedding-vendors/mehndi-artist" }
        ]
      };
    }
  },

  // 4. SUPPLIERS (Water Camper, Dairy, Cylinder, Vegetables)
  {
    triggers: [
      "supplier", "suppliers", "water", "camper", "dairy", "paneer", "ghee",
      "cylinder", "gas", "vegetable", "milk", "catering supply", "bulk"
    ],
    getReply: (lang) => {
      return {
        text: `Get direct wholesale wedding supplies delivered to banquet lawns & venues:\n\n• **Water Campers**: 20L chilled RO water campers with stands\n• **Dairy Products**: Pure fresh malai paneer, desi cow ghee tins, curd & butter in bulk\n• **Commercial Gas Cylinders**: 19kg commercial LPG cylinders for catering halwais\n• **Bulk Vegetables**: Fresh farm-to-mandap seasonal vegetables`,
        actions: ["Water Camper Supplier", "Dairy Products", "Cylinder Suppliers", "Vegetable Supplier"],
        navLinks: [
          { label: "Water Campers", href: "/suppliers/water-camper" },
          { label: "Dairy Supplies", href: "/suppliers/dairy-products" },
          { label: "Gas Cylinders", href: "/suppliers/cylinder-suppliers" }
        ]
      };
    }
  },

  // 5. E-INVITES & CARDS
  {
    triggers: [
      "invite", "invites", "e-invite", "invitation", "card", "video", "template", "whatsapp invite", "wedding card"
    ],
    getReply: (lang) => {
      return {
        text: `Make your announcement unforgettable with our digital invite design studio:\n\n• **WhatsApp Video Invites**: 3D motion graphics with royal palace themes & customized music\n• **Digital E-Cards**: Interactive PDF cards with RSVP links & Google Maps venue locations\n• **Bespoke Card Designers**: Customized royal stationery & traditional print boxes`,
        actions: ["E-Invitation Cards", "Invitation Video Templates", "Card Designers"],
        navLinks: [
          { label: "E-Invitation Cards", href: "/e-invites/e-invitation-card-design" },
          { label: "Video Templates", href: "/e-invites/invitation-video-template" }
        ]
      };
    }
  },

  // 6. LIST YOUR BUSINESS (For Vendors / Sellers)
  {
    triggers: [
      "list", "list business", "register as vendor", "sell", "partner", "join as vendor", "business registration"
    ],
    getReply: (lang) => {
      return {
        text: `Are you a wedding vendor, banquet hall owner, or wedding supplier? Grow your bookings with ShubhVivah!\n\n• Reach thousands of engaged couples actively planning their weddings\n• Get verified leads, direct inquiries, and portfolio showcase pages\n• Fast verification and dedicated business support`,
        actions: ["List Your Business", "Vendor Registration", "Pricing & Plans"],
        navLinks: [
          { label: "List Your Business Now", href: "/vendors/register" },
          { label: "Register New Account", href: "/register?type=vendor" }
        ]
      };
    }
  },

  // 7. PRICING & INQUIRY HELP
  {
    triggers: [
      "price", "pricing", "cost", "budget", "quotation", "rate", "charges", "package", "how much"
    ],
    getReply: (lang) => {
      return {
        text: `Every wedding is unique! Venue and vendor pricing depends on your guest count, wedding dates, and custom packages:\n\n• **Banquet Halls**: Starting from ₹1,200 to ₹3,500 per plate / day packages\n• **Heritage Palaces**: Custom royal buyout packages starting from ₹5 Lakhs to ₹25+ Lakhs\n• **Photographers & Artists**: Daily and 3-day wedding packages available\n\nWould you like our wedding concierge team to send you custom quotations for your wedding date?`,
        showInquiryForm: true,
        actions: ["Request Quotation", "Browse Venues", "Contact Concierge"],
        navLinks: [
          { label: "Explore Venues & Pricing", href: "/venues" },
          { label: "Contact Us", href: "/contact" }
        ]
      };
    }
  },

  // 8. CONTACT / SUPPORT
  {
    triggers: [
      "contact", "support", "help", "phone", "call", "email", "number", "talk", "human"
    ],
    getReply: (lang) => {
      return {
        text: `Our dedicated ShubhVivah Wedding Concierge team is always here to assist you:\n\n• **Phone / WhatsApp**: +91 98290 12345\n• **Email**: support@shubhvivah.com\n• **Hours**: 9:00 AM – 9:00 PM (Monday – Sunday)\n\nYou can also fill out our quick enquiry form and a senior wedding coordinator will call you back within 2 hours.`,
        showInquiryForm: true,
        actions: ["Request Callback", "Browse Venues", "Find Vendors"],
        navLinks: [{ label: "Contact Support Page", href: "/contact" }]
      };
    }
  }
];

// Helper to detect language
function detectLanguage(text) {
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) return "hindi";

  const lower = text.toLowerCase();
  const hinglishMarkers = [
    "kaise", "kya", "kaha", "kahan", "chahiye", "karna", "hai", "mujhe", "mera", "meri",
    "batao", "shadi", "vivah", "ladka", "ladki", "rishta", "dhundo", "dhoondo", "hoga"
  ];
  if (hinglishMarkers.some((m) => lower.includes(m))) return "hinglish";

  return "english";
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          reply: "You have sent too many messages in a short time. Please wait a moment before sending another query.",
          actions: ["Browse Venues", "Find Vendors"],
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, reply: "Please enter your wedding query." },
        { status: 400 }
      );
    }

    const cleanMsg = message.trim().toLowerCase();
    const lang = detectLanguage(cleanMsg);

    // Match with knowledge base
    let matchedItem = null;
    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.triggers.some((trigger) => cleanMsg.includes(trigger))) {
        matchedItem = item;
        break;
      }
    }

    if (matchedItem) {
      const responsePayload = matchedItem.getReply(lang);
      return NextResponse.json({
        success: true,
        ...responsePayload,
      });
    }

    // Default Fallback Response
    const defaultResponse = {
      text:
        lang === "hindi"
          ? `मैं आपकी वेडिंग प्लानिंग में मदद करने के लिए यहाँ हूँ! आप हेरिटेज वेन्यू, बैंक्वेट हॉल, वेडिंग फोटोग्राफर, मेकअप आर्टिस्ट, या शादी के सप्लायर्स के बारे में पूछ सकते हैं।`
          : lang === "hinglish"
          ? `Main ShubhVivah par wedding planning me aapki madad kar sakta hoon! Aap venues (Banquet halls, Palaces), vendors (Photographer, Makeup, Decorator) ya bulk suppliers ke baare me pooch sakte hain.`
          : `I'm here to assist you with everything wedding-related on ShubhVivah! You can explore heritage venues, luxury banquet halls, certified wedding vendors (photographers, makeup artists, decorators), or bulk wedding suppliers.`,
      actions: ["Browse Wedding Venues", "Find Wedding Vendors", "Wedding Suppliers", "Request Callback"],
      navLinks: [
        { label: "Explore Venues", href: "/venues" },
        { label: "Find Vendors", href: "/wedding-vendors/wedding-photography" },
      ],
      showInquiryForm: false,
    };

    return NextResponse.json({
      success: true,
      reply: defaultResponse.text,
      actions: defaultResponse.actions,
      navLinks: defaultResponse.navLinks,
      showInquiryForm: defaultResponse.showInquiryForm,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        reply: "I'm having a brief connection issue. Please feel free to browse our venues and vendors directly.",
        navLinks: [{ label: "Browse Venues", href: "/venues" }],
      },
      { status: 500 }
    );
  }
}
