"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Star,
  Heart,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  X,
  ChevronRight,
  Eye,
  ShieldCheck,
  Check,
  Send,
} from "lucide-react";

// =========================================================================
// CURATED ALL VERIFIED VENDORS DATA
// Across Photographers, Makeup Artists, Decorators, Planners, Couture & Mehndi
// =========================================================================
const ALL_VERIFIED_VENDORS = [
  // 1. Photographers
  {
    id: "stories-joseph-radhika",
    name: "Stories by Joseph & Radhika",
    company: "Stories Luxury Wedding Photojournalism",
    category: "Photographers",
    categoryLabel: "Candid Photography",
    categoryRoute: "/wedding-vendors/wedding-photography",
    location: "Mumbai & Pan India",
    city: "Mumbai",
    priceStarting: 120000,
    priceDisplay: "₹1,20,000 / day",
    pricingType: "Starting From",
    rating: 5.0,
    reviewCount: 148,
    badge: "Celebrity Favorite",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Candid Photography",
      "Cinematic 4K Films",
      "Pre-Wedding Shoots",
      "Drone Cinematography",
    ],
    about:
      "Pioneers of candid wedding photojournalism in India. Known for capturing raw, intimate emotions with a timeless cinematic palette for royal and destination weddings.",
    phone: "+91 98201 12345",
    email: "contact@storiesbyjr.com",
  },
  {
    id: "royal-heritage-captures",
    name: "Royal Heritage Captures",
    company: "Royal Heritage Visual Arts Pvt Ltd",
    category: "Photographers",
    categoryLabel: "Cinematic Photography",
    categoryRoute: "/wedding-vendors/wedding-photography",
    location: "Udaipur & Rajasthan",
    city: "Udaipur",
    priceStarting: 85000,
    priceDisplay: "₹85,000 / day",
    pricingType: "Full Package",
    rating: 4.9,
    reviewCount: 126,
    badge: "Palace Wedding Specialist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Royal Palace Shoots",
      "Traditional & Candid",
      "4K Drone Cinematography",
      "Handcrafted Albums",
    ],
    about:
      "Specializing in royal Rajasthani palace weddings, candid bridal portraits, multi-day cinematic documentaries, and sunset drone shoots across Udaipur and Jaipur.",
    phone: "+91 98765 43212",
    email: "vikram.photo@example.com",
  },
  {
    id: "golden-frame-studios",
    name: "Golden Frame Studios",
    company: "Golden Frame Wedding Works",
    category: "Photographers",
    categoryLabel: "Wedding Films",
    categoryRoute: "/wedding-vendors/wedding-photography",
    location: "Delhi NCR",
    city: "Delhi NCR",
    priceStarting: 95000,
    priceDisplay: "₹95,000 / day",
    pricingType: "Starting From",
    rating: 4.8,
    reviewCount: 112,
    badge: "Top Rated in NCR",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Photography",
      "Candid Coverage",
      "Live Streaming",
      "Teaser Edits",
    ],
    about:
      "Award-winning Delhi cinematography studio delivering timeless wedding albums, emotion-driven teasers, and high-fashion couple portraits.",
    phone: "+91 98110 54321",
    email: "info@goldenframe.in",
  },

  // 2. Bridal Makeup Artists
  {
    id: "glam-by-shweta-delhi",
    name: "Shweta Gaur Makeup Studio",
    company: "Shweta Gaur Luxury Bridal Artistry",
    category: "Makeup Artists",
    categoryLabel: "Bridal Makeup",
    categoryRoute: "/wedding-vendors/bridal-makeup-artist",
    location: "South Delhi & NCR",
    city: "Delhi NCR",
    priceStarting: 28000,
    priceDisplay: "₹28,000 / event",
    pricingType: "Per Function",
    rating: 4.9,
    reviewCount: 136,
    badge: "Celebrity Artist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "HD Bridal Makeup",
      "Airbrush Makeup",
      "Luxury Hair Styling",
      "Dupatta Draping",
    ],
    about:
      "Renowned celebrity bridal artist known for dewy skin aesthetics, royal jewelry coordination, and flawless high-definition bridal transformations.",
    phone: "+91 99990 87654",
    email: "shweta@gaurmakeup.com",
  },
  {
    id: "glamour-by-pooja-khurana",
    name: "Glamour by Pooja Khurana",
    company: "Pooja Khurana Beauty Studio",
    category: "Makeup Artists",
    categoryLabel: "Airbrush Makeup",
    categoryRoute: "/wedding-vendors/bridal-makeup-artist",
    location: "Mumbai & Pan India",
    city: "Mumbai",
    priceStarting: 35000,
    priceDisplay: "₹35,000 / event",
    pricingType: "Per Function",
    rating: 5.0,
    reviewCount: 154,
    badge: "Fashion Week Stylist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "International Airbrush",
      "Contour & Glow",
      "Bridal Bun & Florals",
      "Pre-Bridal Glow",
    ],
    about:
      "International makeup educator and couture bridal stylist trusted by discerning brides for modern royal aesthetics and long-lasting airbrush glam.",
    phone: "+91 98210 65432",
    email: "pooja@khuranabeauty.com",
  },

  // 3. Decorators
  {
    id: "amara-floral-mandap-creators",
    name: "Amara Floral & Set Design",
    company: "Amara Luxury Mandap & Floral Studio",
    category: "Decorators",
    categoryLabel: "Mandap & Decor",
    categoryRoute: "/wedding-vendors/decoration",
    location: "South Delhi & NCR",
    city: "Delhi NCR",
    priceStarting: 150000,
    priceDisplay: "₹1,50,000 / event",
    pricingType: "Starting From",
    rating: 4.9,
    reviewCount: 168,
    badge: "Master Mandap Artist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Floral Vedic Mandap",
      "Chandelier Ceilings",
      "Royal Stage Setups",
      "Haldi & Sangeet Themes",
    ],
    about:
      "Crafting fairytale royal mandaps with cascades of fresh mogra, Dutch roses, carved golden pillars, and atmospheric candlelight scapes for destination celebrations.",
    phone: "+91 98101 23456",
    email: "info@amaradecor.com",
  },
  {
    id: "shahi-darbar-royal-stage",
    name: "Shahi Darbar Stage Scenography",
    company: "Shahi Darbar Royal Decorators Pvt Ltd",
    category: "Decorators",
    categoryLabel: "Royal Stage Decor",
    categoryRoute: "/wedding-vendors/decoration",
    location: "Jaipur & Rajasthan",
    city: "Jaipur",
    priceStarting: 175000,
    priceDisplay: "₹1,75,000 / event",
    pricingType: "Starting From",
    rating: 4.9,
    reviewCount: 142,
    badge: "Royal Stage Specialist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "3D Mughal Jharokhas",
      "Maharaja Throne Pairs",
      "Velvet Backdrop Drapes",
      "Intelligent Lighting",
    ],
    about:
      "Specialists in regal Indian wedding stage production featuring monumental 3D Mughal jharokhas, antique gold-carved pillars, handcrafted Rajasthani mirror panels, and rich velvet canopies.",
    phone: "+91 94140 12345",
    email: "shahidarbar@decor.in",
  },

  // 4. Wedding Planners
  {
    id: "royal-vivah-luxury-planners",
    name: "Royal Vivah Luxury Planners",
    company: "Royal Vivah Event Management Pvt Ltd",
    category: "Wedding Planners",
    categoryLabel: "Turnkey Planning",
    categoryRoute: "/wedding-vendors/wedding-planner",
    location: "Udaipur & Pan India",
    city: "Udaipur",
    priceStarting: 250000,
    priceDisplay: "₹2,50,000 / wedding",
    pricingType: "Full Coordination",
    rating: 4.9,
    reviewCount: 138,
    badge: "Heritage Wedding Specialist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "End-to-End Planning",
      "Guest Hospitality",
      "Vendor Management",
      "Budget Optimization",
    ],
    about:
      "Full-service luxury destination wedding management company overseeing palace bookings, royal baraat logistics, artist curation, and seamless multi-day coordination.",
    phone: "+91 98290 77777",
    email: "weddings@royalvivah.com",
  },
  {
    id: "shaadi-squad-experiences",
    name: "Shaadi Squad Experiences",
    company: "Shaadi Squad Entertainment Ltd",
    category: "Wedding Planners",
    categoryLabel: "Celebrity Planners",
    categoryRoute: "/wedding-vendors/wedding-planner",
    location: "Mumbai & Goa",
    city: "Mumbai",
    priceStarting: 300000,
    priceDisplay: "₹3,00,000 / wedding",
    pricingType: "Full Coordination",
    rating: 5.0,
    reviewCount: 172,
    badge: "A-List Planner",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Boutique Curation",
      "Destination Logistics",
      "Show Running & Sound",
      "VIP Hospitality",
    ],
    about:
      "Contemporary luxury planners renowned for bespoke wedding concepts, stress-free couple experiences, and flawless timing for celebrity and NRI unions.",
    phone: "+91 98200 88888",
    email: "hello@shaadisquad.com",
  },

  // 5. Bridal & Groom Couture
  {
    id: "sabyasachi-bridal-collective",
    name: "Sabyasachi Heritage Collective",
    company: "Heritage Bridal Atelier",
    category: "Bridal & Groom Wear",
    categoryLabel: "Bridal Lehengas",
    categoryRoute: "/wedding-vendors/bridal-groom-wear",
    location: "Delhi & Kolkata",
    city: "Delhi NCR",
    priceStarting: 180000,
    priceDisplay: "₹1,80,000 onwards",
    pricingType: "Couture Piece",
    rating: 5.0,
    reviewCount: 195,
    badge: "Iconic Couture",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Handcrafted Red Lehengas",
      "Zardozi & Dabka Work",
      "Royal Sherwanis",
      "Custom Veil Embroidery",
    ],
    about:
      "Preserving centuries of Indian textile craftsmanship through vintage hand-dyed silks, antique dabka embroidery, and heirloom bridal ensembles fit for royalty.",
    phone: "+91 98100 11111",
    email: "atelier@sabyasachibridal.in",
  },
  {
    id: "rawat-sherwani-palace",
    name: "Rawat Royal Sherwani & Safa",
    company: "Rawat Menswear & Royal Trousseau",
    category: "Bridal & Groom Wear",
    categoryLabel: "Groom Sherwanis",
    categoryRoute: "/wedding-vendors/bridal-groom-wear",
    location: "Jaipur, Rajasthan",
    city: "Jaipur",
    priceStarting: 65000,
    priceDisplay: "₹65,000 onwards",
    pricingType: "Starting From",
    rating: 4.8,
    reviewCount: 114,
    badge: "Groom Specialist",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Bespoke Groom Sherwani",
      "Silk Bandhgala",
      "Jodhpuri Breeches",
      "Hand-tied Royal Safas",
    ],
    about:
      "Finest bespoke menswear tailoring for grooms, featuring pure raw silk, hand-carved meenakari buttons, sword belts, and regal embroidered safas.",
    phone: "+91 94140 22222",
    email: "rawat@sherwanipalace.com",
  },

  // 6. Mehndi Artists
  {
    id: "sunita-mehandi-artistry",
    name: "Sunita Mehandi Artistry",
    company: "Sunita Mehandi Artistry Jaipur",
    category: "Mehndi Artists",
    categoryLabel: "Bridal Henna",
    categoryRoute: "/wedding-vendors/mehndi-artist",
    location: "Jaipur & Delhi NCR",
    city: "Jaipur",
    priceStarting: 15000,
    priceDisplay: "₹15,000 / bridal",
    pricingType: "Fixed Package",
    rating: 4.9,
    reviewCount: 124,
    badge: "100% Organic Henna",
    verified: true,
    image: "/images/mehndi/bridal-mehndi.jpg",
    gallery: [
      "/images/mehndi/bridal-mehndi.jpg",
      "/images/mehndi/rajasthani-mehndi.jpg",
    ],
    services: [
      "Bridal Storytelling Henna",
      "Radha-Krishna Motifs",
      "Baraat Procession Designs",
      "Family Guest Team",
    ],
    about:
      "Crafting intricate bridal marwari henna with dark clove and eucalyptus stain, custom couple portraits, and personal wedding vows woven into bridal hands.",
    phone: "+91 98765 43299",
    email: "sunita.mehandi@example.com",
  },
];

const CATEGORY_TABS = [
  "All Vendors",
  "Photographers",
  "Makeup Artists",
  "Decorators",
  "Wedding Planners",
  "Bridal & Groom Wear",
  "Mehndi Artists",
];

const CITY_OPTIONS = [
  "All Cities",
  "Delhi NCR",
  "Mumbai",
  "Jaipur",
  "Udaipur",
];

function VendorsContent() {
  const searchParams = useSearchParams();
  const serviceParam = (searchParams?.get("service") || searchParams?.get("category") || "").toLowerCase();
  const cityParam = searchParams?.get("city") || "";

  const initialCategory = useMemo(() => {
    if (serviceParam.includes("photo")) return "Photographers";
    if (serviceParam.includes("makeup")) return "Makeup Artists";
    if (serviceParam.includes("decor")) return "Decorators";
    if (serviceParam.includes("planner")) return "Wedding Planners";
    if (serviceParam.includes("wear") || serviceParam.includes("bridal") || serviceParam.includes("groom")) return "Bridal & Groom Wear";
    if (serviceParam.includes("mehndi") || serviceParam.includes("henna")) return "Mehndi Artists";
    return "All Vendors";
  }, [serviceParam]);

  const initialCity = useMemo(() => {
    if (!cityParam) return "All Cities";
    const matched = CITY_OPTIONS.find((c) => c.toLowerCase() === cityParam.toLowerCase());
    return matched || "All Cities";
  }, [cityParam]);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals
  const [profileModalVendor, setProfileModalVendor] = useState(null);
  const [quoteModalVendor, setQuoteModalVendor] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    city: "Udaipur",
    guestCount: "350",
    message: "",
  });

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCity("All Cities");
    setSelectedCategory("All Vendors");
    setSortBy("recommended");
  };

  // Filter & Sort Logic
  const filteredVendors = useMemo(() => {
    let result = ALL_VERIFIED_VENDORS.filter((vendor) => {
      // Category Filter
      if (selectedCategory !== "All Vendors" && vendor.category !== selectedCategory) {
        return false;
      }

      // City Filter
      if (selectedCity !== "All Cities" && vendor.city !== selectedCity) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = vendor.name.toLowerCase().includes(q);
        const matchCompany = vendor.company.toLowerCase().includes(q);
        const matchCategory = vendor.category.toLowerCase().includes(q);
        const matchLocation = vendor.location.toLowerCase().includes(q);
        const matchServices = vendor.services.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchCompany && !matchCategory && !matchLocation && !matchServices) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "rating-desc") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.priceStarting - b.priceStarting;
      if (sortBy === "price-desc") return b.priceStarting - a.priceStarting;
      return b.reviewCount - a.reviewCount; // Recommended
    });

    return result;
  }, [selectedCategory, selectedCity, searchQuery, sortBy]);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    showToast(`Quotation inquiry sent successfully to ${quoteModalVendor?.name}!`);
    setQuoteModalVendor(null);
    setQuoteForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      city: "Udaipur",
      guestCount: "350",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#140A13] text-[#F8F1E5] font-sans selection:bg-[#B08D45] selection:text-[#1F0E1D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#241321]/95 text-[#E5C583] border border-[#B08D45]/60 shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm font-medium animate-fade-in">
          <Sparkles className="w-5 h-5 text-[#E5C583]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          1. BREADCRUMBS & SECTION HEADER
         ========================================================================= */}
      <section className="relative border-b border-[#B08D45]/30 bg-gradient-to-b from-[#2B1428] via-[#1F0E1D] to-[#140A13] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B08D45]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#C9BBAF]">
            <Link href="/" className="transition-colors hover:text-[#D6B875]">
              Home
            </Link>
            <ChevronRight size={13} className="text-[#B08D45]" />
            <span className="text-[#C9BBAF]">Wedding Vendors</span>
            <ChevronRight size={13} className="text-[#B08D45]" />
            <span className="font-semibold text-[#E5C583]">All Verified Vendors</span>
          </nav>

          {/* Heading */}
          <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30]/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8D9B5] backdrop-blur-md">
                <Sparkles size={13} className="text-[#D6B875]" />
                <span>Handpicked & Verified Wedding Professionals</span>
              </div>
              <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl md:text-5xl">
                Explore All <span className="text-[#E5C583]">Verified Vendors</span>
              </h1>
              <p className="mt-2 max-w-2xl text-xs text-[#C9BBAF] sm:text-sm leading-relaxed">
                Browse India&apos;s most celebrated wedding photographers, bridal makeup artists, royal mandap decorators, luxury planners, and couture designers for your dream celebration.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#B08D45]/40 bg-[#1F0E1D] px-4 py-1.5 text-xs font-bold text-[#E5C583] shadow-md">
                {filteredVendors.length} Verified Vendors Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CATEGORY PILLS BAR (Default: All Vendors)
         ========================================================================= */}
      <section className="border-b border-[#B08D45]/20 bg-[#1F0E1D] px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((cat) => (
              <button suppressHydrationWarning
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] shadow-md shadow-[#B08D45]/20 font-bold scale-[1.02]"
                    : "bg-[#241321] text-[#C9BBAF] border border-[#B08D45]/25 hover:border-[#B08D45] hover:text-[#F8F1E5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SEARCH & CITY FILTER CONTROLS
         ========================================================================= */}
      <section className="bg-[#180C17] border-b border-[#B08D45]/20 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-[#1F0E1D] border border-[#B08D45]/30">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D45]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vendor name, photography, bridal makeup, decorators..."
                className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl py-2 pl-10 pr-4 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875]"
              />
            </div>

            {/* City Selector */}
            <div className="relative w-full sm:w-52">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B08D45] pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-[#140A13] border border-[#B08D45]/30 rounded-xl py-2 pl-9 pr-8 text-xs font-medium text-[#F8F1E5] outline-none focus:border-[#D6B875]"
              >
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-[#1F0E1D] text-[#F8F1E5]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-[#140A13] border border-[#B08D45]/30 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-[#F8F1E5] outline-none focus:border-[#D6B875]"
              >
                <option value="recommended" className="bg-[#1F0E1D]">Sort: Recommended</option>
                <option value="rating-desc" className="bg-[#1F0E1D]">Highest Rated ★</option>
                <option value="price-asc" className="bg-[#1F0E1D]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1F0E1D]">Price: High to Low</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCity !== "All Cities" || selectedCategory !== "All Vendors") && (
              <button suppressHydrationWarning
                onClick={handleClearFilters}
                className="px-3.5 py-2 rounded-xl bg-[#241321] text-xs font-semibold text-[#D6B875] border border-[#B08D45]/40 hover:bg-[#2B1428] flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. VENDORS GRID (3 columns Desktop, 2 Tablet, 1 Mobile)
         ========================================================================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filteredVendors.length === 0 ? (
            <div className="p-16 text-center rounded-3xl bg-[#1F0E1D]/60 border border-[#B08D45]/20 max-w-xl mx-auto space-y-3">
              <Search className="w-12 h-12 text-[#B08D45]/40 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#F8F1E5]">No vendors match your search criteria</h3>
              <p className="text-xs text-[#C9BBAF]">Try resetting your search query or selecting &quot;All Vendors&quot; and &quot;All Cities&quot;.</p>
              <button suppressHydrationWarning
                onClick={handleClearFilters}
                className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold shadow"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredVendors.map((vendor) => {
                const isShortlisted = shortlistedIds.includes(vendor.id);

                return (
                  <div
                    key={vendor.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-[#B08D45]/30 bg-[#1F0E1D] overflow-hidden shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B875] hover:shadow-[0_12px_35px_rgba(176,141,69,0.22)] h-full"
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-56 w-full overflow-hidden bg-[#241321]">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading="lazy"
                      />
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E1D] via-[#1F0E1D]/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Floating Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#1F0E1D]/85 backdrop-blur-md text-[#E5C583] border border-[#B08D45]/40">
                          {vendor.categoryLabel}
                        </span>
                        {vendor.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B08D45] text-[#1F0E1D] shadow-sm">
                            {vendor.badge}
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart Button */}
                      <button suppressHydrationWarning
                        onClick={() => toggleShortlist(vendor.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                          isShortlisted
                            ? "bg-rose-950/80 text-rose-400 border-rose-500/40"
                            : "bg-[#1F0E1D]/70 text-[#C9BBAF] border-[#B08D45]/30 hover:text-rose-400"
                        }`}
                        title="Shortlist Vendor"
                      >
                        <Heart size={14} className={isShortlisted ? "fill-rose-500" : ""} />
                      </button>

                      {/* Rating Banner Bottom-Right of Image */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#1F0E1D]/90 backdrop-blur-md border border-[#B08D45]/30 text-xs font-bold text-[#E5C583]">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span>{vendor.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-[#C9BBAF]">({vendor.reviewCount})</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Title & Location */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F1E5] group-hover:text-[#E5C583] transition-colors line-clamp-1">
                              {vendor.name}
                            </h3>
                            <p className="text-xs text-[#B08D45] flex items-center gap-1 mt-1 font-medium">
                              <MapPin size={13} />
                              <span>{vendor.location}</span>
                            </p>
                          </div>
                          {vendor.verified && (
                            <span className="p-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400" title="Verified ShubhVivah Partner">
                              <ShieldCheck size={14} />
                            </span>
                          )}
                        </div>

                        {/* About snippet */}
                        <p className="mt-2.5 text-xs text-[#C9BBAF] line-clamp-2 leading-relaxed">
                          {vendor.about}
                        </p>

                        {/* Service Chips */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {vendor.services.slice(0, 3).map((srv, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#241321] text-[#E8D9B5] border border-[#B08D45]/20"
                            >
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="pt-4 border-t border-[#B08D45]/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#B08D45] uppercase font-medium block">
                              {vendor.pricingType}
                            </span>
                            <span className="text-base font-bold text-[#E5C583]">
                              {vendor.priceDisplay}
                            </span>
                          </div>

                          <Link
                            href={vendor.categoryRoute}
                            className="text-[11px] font-semibold text-[#D6B875] hover:text-[#F8F1E5] flex items-center gap-1 transition-colors"
                          >
                            <span>Browse Category</span>
                            <ChevronRight size={13} />
                          </Link>
                        </div>

                        {/* Buttons Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button suppressHydrationWarning
                            onClick={() => setProfileModalVendor(vendor)}
                            className="py-2 rounded-xl bg-[#241321] border border-[#B08D45]/40 text-[#E5C583] hover:bg-[#2B1428] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>View Profile</span>
                          </button>

                          <button suppressHydrationWarning
                            onClick={() => setQuoteModalVendor(vendor)}
                            className="py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] hover:brightness-110 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                          >
                            <Send size={13} />
                            <span>Request Quote</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          5. VIEW VENDOR PROFILE & PRICING MODAL
         ========================================================================= */}
      {profileModalVendor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
                  <ShieldCheck size={16} />
                </span>
                <span className="text-xs uppercase tracking-wider text-[#D6B875] font-semibold">
                  Verified ShubhVivah Vendor Profile
                </span>
              </div>
              <button suppressHydrationWarning
                onClick={() => setProfileModalVendor(null)}
                className="text-[#C9BBAF] hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Gallery / Cover Banner */}
            <div className="grid grid-cols-3 gap-2 h-48 rounded-2xl overflow-hidden bg-[#241321]">
              <div className="col-span-2 h-full">
                <img
                  src={profileModalVendor.image}
                  alt={profileModalVendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-2 h-full">
                <img
                  src={profileModalVendor.gallery?.[1] || profileModalVendor.image}
                  alt={profileModalVendor.name}
                  className="w-full h-full object-cover"
                />
                <img
                  src={profileModalVendor.gallery?.[2] || profileModalVendor.image}
                  alt={profileModalVendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#F8F1E5]">
                    {profileModalVendor.name}
                  </h3>
                  <p className="text-xs text-[#B08D45] flex items-center gap-1.5 mt-0.5">
                    <MapPin size={13} />
                    <span>{profileModalVendor.location}</span>
                    <span>•</span>
                    <span>{profileModalVendor.categoryLabel}</span>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#241321] border border-[#B08D45]/30 text-right">
                  <span className="text-[10px] text-[#B08D45] uppercase font-medium block">Starting Package</span>
                  <span className="text-lg font-serif font-bold text-[#E5C583]">
                    {profileModalVendor.priceDisplay}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#241321]/60 border border-[#B08D45]/20 text-xs text-[#C9BBAF] leading-relaxed">
                <h4 className="text-xs font-semibold text-[#E5C583] uppercase mb-1">About the Artist / Studio</h4>
                <p>{profileModalVendor.about}</p>
              </div>

              {/* Deliverables / Services */}
              <div>
                <h4 className="text-xs font-semibold text-[#E5C583] uppercase mb-2">Key Services &amp; Deliverables</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {profileModalVendor.services.map((srv, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#241321] border border-[#B08D45]/15 text-[#F8F1E5]">
                      <Check size={14} className="text-[#D6B875] shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="p-4 rounded-2xl bg-[#140A13] border border-[#B08D45]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <a
                    href={`tel:${profileModalVendor.phone}`}
                    className="flex items-center gap-2 text-[#F8F1E5] hover:text-[#D6B875] transition-colors"
                  >
                    <Phone size={14} className="text-emerald-400" />
                    <span>{profileModalVendor.phone}</span>
                  </a>
                  <a
                    href={`mailto:${profileModalVendor.email}`}
                    className="flex items-center gap-2 text-[#F8F1E5] hover:text-[#D6B875] transition-colors"
                  >
                    <Mail size={14} className="text-blue-400" />
                    <span>{profileModalVendor.email}</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button suppressHydrationWarning
                    onClick={() => {
                      setProfileModalVendor(null);
                      setQuoteModalVendor(profileModalVendor);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold text-xs shadow hover:brightness-110"
                  >
                    Book / Request Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. REQUEST QUOTE MODAL
         ========================================================================= */}
      {quoteModalVendor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1F0E1D] border border-[#B08D45]/40 rounded-3xl w-full max-w-lg p-6 md:p-8 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#B08D45]/20">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#E5C583]">
                  Request Quotation &amp; Availability
                </h3>
                <p className="text-xs text-[#C9BBAF]">
                  Inquiry for <span className="text-[#F8F1E5] font-semibold">{quoteModalVendor.name}</span>
                </p>
              </div>
              <button suppressHydrationWarning
                onClick={() => setQuoteModalVendor(null)}
                className="text-[#C9BBAF] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditi & Aarav"
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="couple@example.com"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Wedding Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={quoteForm.date}
                    onChange={(e) => setQuoteForm({ ...quoteForm, date: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                    Wedding Destination City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Udaipur, Jaipur"
                    value={quoteForm.city}
                    onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C9BBAF] mb-1">
                  Wedding Event Requirements &amp; Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell the vendor about your event dates, ceremonies (Sangeet, Wedding, Reception), and custom package preferences..."
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-4 py-2.5 text-xs text-[#F8F1E5] focus:outline-none focus:border-[#D6B875]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#B08D45]/20">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setQuoteModalVendor(null)}
                  className="px-4 py-2 rounded-xl text-xs text-[#C9BBAF] hover:text-white"
                >
                  Cancel
                </button>
                <button suppressHydrationWarning
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-xs font-bold hover:brightness-110 shadow flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Send Quotation Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AllVendorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#140A13] flex items-center justify-center text-[#D6B875] font-serif">
          Loading Verified Vendors...
        </div>
      }
    >
      <VendorsContent />
    </Suspense>
  );
}
