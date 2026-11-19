"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import UniversalEnquiryModal from "@/components/UniversalEnquiryModal";
import {
  Search,
  MapPin,
  Sparkles,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Eye,
  Flower2,
  ArrowRight,
  Star,
  Send,
} from "lucide-react";

// =========================================================================
// 7 CURATED WEDDING DECORATION VENDOR CARDS
// Inspired by WeddingKalki layout and crafted for ShubhVivah's golden aesthetic.
// Each vendor specifically represents one of the 7 required decoration services:
// 1. Royal wedding stage decoration
// 2. Floral wedding mandap decoration
// 3. Luxury wedding entrance decoration
// 4. Outdoor garden wedding decoration
// 5. Haldi and Mehndi ceremony decoration
// 6. Reception stage decoration
// 7. Destination wedding decoration
// =========================================================================
const DECORATORS_DATA = [
  {
    id: "shahi-darbar-royal-stage",
    name: "Shahi Darbar Stage Scenography",
    company: "Shahi Darbar Royal Decorators Pvt Ltd",
    categoryType: "Royal Wedding Stage Decoration",
    city: "Jaipur",
    location: "Jaipur & Delhi NCR",
    priceStarting: 175000,
    priceDisplay: "₹1,75,000",
    priceRange: "₹1,75,000 – ₹5,50,000",
    experience: "12+ Years Experience",
    rating: 4.9,
    reviewCount: 142,
    badge: "Royal Stage Specialist",
    image: "/images/decoration/royal-wedding-stage.jpg",
    gallery: [
      "/images/decoration/royal-wedding-stage.jpg",
      "/images/decoration/reception-stage-decoration.jpg",
      "/images/decoration/luxury-wedding-entrance.jpg",
    ],
    services: [
      "Royal Wedding Stage",
      "Mughal Arch Framing",
      "Crystal Chandeliers",
      "Velvet Backdrop Draping",
      "Maharaja Throne Setup",
    ],
    highlights: [
      "Carved Jharokha Backdrops",
      "Imported Red & Ivory Roses",
      "Austrian Crystal Chandeliers",
    ],
    about:
      "Specialists in regal Indian wedding stage production featuring monumental 3D Mughal jharokhas, antique gold-carved pillars, handcrafted Rajasthani mirror panels, and rich velvet canopies for magnificent celebrations.",
    packageIncludes: [
      "32ft Royal Architectural Stage Backdrop",
      "Handcrafted Gold Maharaja Throne Pair",
      "Multi-Tier Crystal Chandelier Array",
      "Fresh Rose & Orchid Floral Framing",
      "DMX Computerized Warm Lighting & Focus Spots",
    ],
  },
  {
    id: "amara-floral-mandap-creations",
    name: "Amara Floral Mandap Creators",
    company: "Amara Luxury Mandap & Floral Studio",
    categoryType: "Floral Wedding Mandap Decoration",
    city: "Delhi",
    location: "South Delhi & NCR",
    priceStarting: 150000,
    priceDisplay: "₹1,50,000",
    priceRange: "₹1,50,000 – ₹4,25,000",
    experience: "10+ Years Experience",
    rating: 4.9,
    reviewCount: 168,
    badge: "Master Mandap Artist",
    image: "/images/decoration/floral-wedding-mandap.jpg",
    gallery: [
      "/images/decoration/floral-wedding-mandap.jpg",
      "/images/decoration/destination-wedding-decor.jpg",
      "/images/decoration/outdoor-garden-wedding.jpg",
    ],
    services: [
      "Floral Mandap Decoration",
      "Vedic 4-Pillar Mandap",
      "Tuberose & Mogra Curtains",
      "Aisle Floral Walkways",
      "Hawan Kund Sanctum",
    ],
    highlights: [
      "100% Fresh Exotic Florals",
      "Auspicious Vedic Geometry",
      "Fragrant Rajnigandha Cascades",
    ],
    about:
      "Crafting sacred, divine floral mandaps adorned with fragrant Indian tuberose (rajnigandha), Bangalore mogra tassels, Dutch roses, brass temple bells, and serene holy hawan kund sanctum architecture.",
    packageIncludes: [
      "Full 4-Pillar Vedic Mandap with Floral Dome",
      "Fresh Mogra & Jasmine Hanging Curtains",
      "Brass Urli Floating Rose Petal Basin",
      "Sacred Hawan Kund Platform with Cushions",
      "Aisle Walkway with 8 Floral Pedestals",
    ],
  },
  {
    id: "imperial-grand-entryways",
    name: "Imperial Grand Entry & Walkway Stylists",
    company: "Imperial Gateway Decorators",
    categoryType: "Luxury Wedding Entrance Decoration",
    city: "Jaipur",
    location: "Jaipur & Udaipur",
    priceStarting: 85000,
    priceDisplay: "₹85,000",
    priceRange: "₹85,000 – ₹2,80,000",
    experience: "9+ Years Experience",
    rating: 4.8,
    reviewCount: 114,
    badge: "Grand Entrance Specialist",
    image: "/images/decoration/luxury-wedding-entrance.jpg",
    gallery: [
      "/images/decoration/luxury-wedding-entrance.jpg",
      "/images/decoration/royal-wedding-stage.jpg",
      "/images/decoration/reception-stage-decoration.jpg",
    ],
    services: [
      "Luxury Entrance Decoration",
      "Welcome Gate Archways",
      "Baarat Pathway Lighting",
      "Lantern & Candelabra Tunnels",
      "Cold Pyro Baarat Entry",
    ],
    highlights: [
      "24ft Statement Grand Arch",
      "Moroccan Lantern Pathway",
      "Cold Pyro Welcome Setup",
    ],
    about:
      "Creating breathtaking first impressions with monumental 24-foot fresh floral entrance gateways, illuminated Moroccan lanterns, amber candlelit tunnels, and dramatic baarat procession pathways.",
    packageIncludes: [
      "Monumental 24ft Double-Arch Welcome Gate",
      "60ft Red Carpet Pathway with Candle Lanterns",
      "Side Floral Credenzas & Welcome Easel",
      "Overhead Fairy Light Tunnel Draping",
      "Synchronized Cold Pyro Entry Guns (Pair)",
    ],
  },
  {
    id: "vrindavan-botanical-gardens",
    name: "Vrindavan Garden & Lawn Stylists",
    company: "Vrindavan Botanical Scenography",
    categoryType: "Outdoor Garden Wedding Decoration",
    city: "Noida",
    location: "Noida & Greater Noida",
    priceStarting: 95000,
    priceDisplay: "₹95,000",
    priceRange: "₹95,000 – ₹3,20,000",
    experience: "7+ Years Experience",
    rating: 4.8,
    reviewCount: 96,
    badge: "Garden Scenography",
    image: "/images/decoration/outdoor-garden-wedding.jpg",
    gallery: [
      "/images/decoration/outdoor-garden-wedding.jpg",
      "/images/decoration/haldi-mehndi-decoration.jpg",
      "/images/decoration/destination-wedding-decor.jpg",
    ],
    services: [
      "Outdoor Garden Decoration",
      "Lawn Gazebo Styling",
      "Fairy Light Sky Ceilings",
      "Pastel Floral Pergolas",
      "Boho Wooden Cabanas",
    ],
    highlights: [
      "Overhead Fairy Light Sky",
      "Wisteria Hanging Garlands",
      "Rustic Wooden Gazebos",
    ],
    about:
      "Transforming open-air marriage lawns and botanical gardens into magical wonderlands with wooden pergolas, cascading lilac wisteria, rustic vintage cabanas, and glowing starry fairy-light canopies.",
    packageIncludes: [
      "Centrally Styled Garden Gazebo with Florals",
      "Fairy Light Sky Canopy Across 15,000 sq. ft.",
      "6 Luxury Wooden Lounge Cabanas with Cushions",
      "Illuminated Tree Wraps & Uplighting",
      "Natural Grass Pathway with Floral Urns",
    ],
  },
  {
    id: "genda-phool-haldi-mehndi",
    name: "Genda Phool Haldi & Mehndi Decor",
    company: "Genda Phool Celebrations",
    categoryType: "Haldi & Mehndi Decoration",
    city: "Lucknow",
    location: "Lucknow & Kanpur",
    priceStarting: 45000,
    priceDisplay: "₹45,000",
    priceRange: "₹45,000 – ₹1,60,000",
    experience: "8+ Years Experience",
    rating: 4.9,
    reviewCount: 135,
    badge: "Vibrant Haldi Specialist",
    image: "/images/decoration/haldi-mehndi-decoration.jpg",
    gallery: [
      "/images/decoration/haldi-mehndi-decoration.jpg",
      "/images/decoration/outdoor-garden-wedding.jpg",
      "/images/decoration/floral-wedding-mandap.jpg",
    ],
    services: [
      "Haldi & Mehndi Decoration",
      "Floral Swing (Jhoola)",
      "Brass Urli Ceremony Bath",
      "Marigold Waterfall Backdrops",
      "Color-Pop Tassel Shamiyanas",
    ],
    highlights: [
      "Floral Bridal Jhoola (Swing)",
      "Giant Brass Urli Flower Bath",
      "Vibrant Yellow Marigold Drops",
    ],
    about:
      "Infusing vibrant sunshine hues with thick marigold cascades, traditionally carved floral swings for the bride, vintage brass urlis with floating rose petals, and playful tassel canopies for joyous haldi and mehndi rituals.",
    packageIncludes: [
      "Handcrafted Floral Swing (Jhoola) for Bride",
      "Giant Vintage Brass Urli for Haldi Ceremony",
      "12ft Marigold Waterfall Photo Backdrop",
      "Festive Yellow & Orange Draping Shamiyana",
      "Decorative Colorful Umbrella & Cushion Clusters",
    ],
  },
  {
    id: "botanica-luxury-reception",
    name: "Botanica Luxury Reception Stages",
    company: "Botanica Scenography & Production",
    categoryType: "Reception Stage Decoration",
    city: "Mumbai",
    location: "Mumbai & Bandra",
    priceStarting: 220000,
    priceDisplay: "₹2,20,000",
    priceRange: "₹2,20,000 – ₹6,50,000",
    experience: "11+ Years Experience",
    rating: 5.0,
    reviewCount: 156,
    badge: "High Glamour Reception",
    image: "/images/decoration/reception-stage-decoration.jpg",
    gallery: [
      "/images/decoration/reception-stage-decoration.jpg",
      "/images/decoration/royal-wedding-stage.jpg",
      "/images/decoration/luxury-wedding-entrance.jpg",
    ],
    services: [
      "Reception Stage Decoration",
      "Crystal Chandelier Ceilings",
      "White Hydrangea Floral Wall",
      "Mirror Stage Runways",
      "Architectural Amber Lighting",
    ],
    highlights: [
      "Suspended Crystal Chandelier Sky",
      "High-Gloss Mirror Runway Stage",
      "Opulent White & Blush Florals",
    ],
    about:
      "Ultra-contemporary luxury reception scenography featuring kinetic light fixtures, crystal chandelier ceilings, white hydrangea floral walls, mirror stage floors, and sleek geometric gold accents.",
    packageIncludes: [
      "36ft Modern Geometric Gold & White Stage",
      "Full Gloss Mirror Finish Stage Floor",
      "Hanging Crystal Chandelier Ceiling (12 Pieces)",
      "Imported White Hydrangea & Rose Cluster Walls",
      "Intelligent Moving Head Stage Light Profiling",
    ],
  },
  {
    id: "mewar-palace-destination-decor",
    name: "Mewar Heritage Destination Decor",
    company: "Mewar Destination Wedding Concepts",
    categoryType: "Destination Wedding Decoration",
    city: "Udaipur",
    location: "Udaipur & Lake Pichola",
    priceStarting: 180000,
    priceDisplay: "₹1,80,000",
    priceRange: "₹1,80,000 – ₹5,80,000",
    experience: "10+ Years Experience",
    rating: 4.9,
    reviewCount: 128,
    badge: "Lakeside Destination Specialist",
    image: "/images/decoration/destination-wedding-decor.jpg",
    gallery: [
      "/images/decoration/destination-wedding-decor.jpg",
      "/images/decoration/floral-wedding-mandap.jpg",
      "/images/decoration/outdoor-garden-wedding.jpg",
    ],
    services: [
      "Destination Wedding Decoration",
      "Floating Lakeside Mandap",
      "Heritage Palace Courtyard Decor",
      "Vintage Boat Floral Styling",
      "Multi-Day Event Scenography",
    ],
    highlights: [
      "Floating Mandap on Lake Waters",
      "Fort Courtyard Tikri Mirror Decor",
      "Complete 3-Day Turnkey Logistics",
    ],
    about:
      "Premier destination wedding scenographers specializing in royal Udaipur lake palaces, Rajasthan forts, and luxury coastal venues. Famous for floating mandap setups, courtyard ambient candle-lighting, and heritage royal boat styling.",
    packageIncludes: [
      "Floating Mandap Platform with Lake Panorama",
      "Heritage Courtyard Mashaal & Candle Lighting",
      "Traditional Tikri Mirror-Work Accent Pillars",
      "Vintage Royal Welcome Boat Floral Drapery",
      "Dedicated Destination Project Team & Technicians",
    ],
  },
];

const CITIES = [
  "All Cities",
  "Delhi",
  "New Delhi",
  "Jaipur",
  "Udaipur",
  "Lucknow",
  "Noida",
  "Mumbai",
];

const DECORATION_SERVICES = [
  "All Services",
  "Royal Wedding Stage",
  "Floral Mandap Decoration",
  "Luxury Entrance Decoration",
  "Outdoor Garden Decoration",
  "Haldi & Mehndi Decoration",
  "Reception Stage Decoration",
  "Destination Wedding Decoration",
];

const BUDGET_RANGES = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹50,000", value: "under-50k" },
  { label: "₹50,000 – ₹1,00,000", value: "50k-100k" },
  { label: "₹1,00,000 – ₹2,00,000", value: "100k-200k" },
  { label: "₹2,00,000 and above", value: "above-200k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

const INSPIRATION_GALLERY = [
  {
    title: "Imperial Mughal Royal Stage",
    tag: "Royal Stage",
    image: "/images/decoration/royal-wedding-stage.jpg",
  },
  {
    title: "Vedic Floral Mandap with Tuberose",
    tag: "Floral Mandap",
    image: "/images/decoration/floral-wedding-mandap.jpg",
  },
  {
    title: "Monumental Floral Entrance Arch",
    tag: "Luxury Entrance",
    image: "/images/decoration/luxury-wedding-entrance.jpg",
  },
  {
    title: "Botanical Garden Lawn Gazebo",
    tag: "Outdoor Garden",
    image: "/images/decoration/outdoor-garden-wedding.jpg",
  },
  {
    title: "Marigold Waterfall Haldi Jhoola",
    tag: "Haldi & Mehndi",
    image: "/images/decoration/haldi-mehndi-decoration.jpg",
  },
  {
    title: "Five-Star Crystal Reception Scenography",
    tag: "Reception Stage",
    image: "/images/decoration/reception-stage-decoration.jpg",
  },
];

const DECORATION_FAQS = [
  {
    q: "How much does wedding decoration typically cost in India?",
    a: "Wedding decoration pricing varies based on event scale, fresh florals vs. structural fabrications, venue acreage, and custom thematic elements. Regional ceremonies typically start from ₹45,000 for haldi or intimate setups, while grand royal stages, bespoke floral mandaps, and luxury multi-day palace packages range from ₹1,50,000 to ₹5,50,000+.",
  },
  {
    q: "What is typically included in a complete wedding decoration package?",
    a: "A turnkey wedding package generally covers the main stage backdrop with carved pillars and upholstered furniture, sacred 4-pillar Vedic mandap with fresh floral dome, monumental entrance gateway, illuminated walkway/aisle runner, atmospheric ambient lighting (chandeliers, focus spots, fairy lights), and guest seating table centerpieces.",
  },
  {
    q: "Can decorators customize themes based on our Pinterest mood boards?",
    a: "Yes! All verified decoration studios on ShubhVivah welcome couple mood boards, color palettes, and Pinterest concepts. Decorators will provide 3D CAD renders, floral swatches, and physical fabric mockups during consultation before execution.",
  },
  {
    q: "How early in advance should we book a wedding decorator?",
    a: "For prime winter wedding dates (November to March), booking 3 to 6 months in advance is recommended. This ensures priority reservation for structure frames, exotic floral imports (such as Dutch roses or carnations), and specialty lighting technicians.",
  },
  {
    q: "Do decorators handle setup, maintenance during events, and dismantling?",
    a: "Yes, every professional package includes complete on-site logistics: early morning setup, live standby technicians during the ceremony to ensure lighting and floral freshness, and prompt post-event dismantling with zero hassle to the couple or families.",
  },
];

export default function WeddingDecorationPage() {
  // Dynamic backend registered listings
  const [dynamicVendors, setDynamicVendors] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadVendors() {
      try {
        const res = await fetch("/api/vendors?category=decoration");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.listings)) {
          setDynamicVendors(data.listings);
        }
      } catch (err) {
        console.error("Failed to load registered vendors:", err);
      }
    }
    loadVendors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Mobile Filter Drawer State
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals
  const [detailsModalVendor, setDetailsModalVendor] = useState(null);
  const [enquiryModalVendor, setEnquiryModalVendor] = useState(null);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    location: "",
    budget: "",
    service: "Royal Wedding Stage",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Shortlist Toggle Handler
  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedService("All Services");
    setSelectedBudget("all");
    setSortBy("recommended");
  };

  // Count active filters
  const activeFiltersCount =
    (searchTerm.trim() ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (selectedService !== "All Services" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0);

  // Client-Side Filter & Sort Logic
  const allDecoratorsList = useMemo(() => {
    return [...dynamicVendors, ...DECORATORS_DATA];
  }, [dynamicVendors]);

  const filteredDecorators = useMemo(() => {
    let result = allDecoratorsList.filter((vendor) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = vendor.name.toLowerCase().includes(query);
        const matchesCompany = vendor.company.toLowerCase().includes(query);
        const matchesCity = vendor.city.toLowerCase().includes(query);
        const matchesCategory = vendor.categoryType.toLowerCase().includes(query);
        const matchesService = vendor.services.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesAbout = vendor.about.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesCompany &&
          !matchesCity &&
          !matchesCategory &&
          !matchesService &&
          !matchesAbout
        ) {
          return false;
        }
      }

      // City filter
      if (
        selectedCity !== "All Cities" &&
        !vendor.city?.toLowerCase().includes(selectedCity.toLowerCase()) &&
        !vendor.location?.toLowerCase().includes(selectedCity.toLowerCase())
      ) {
        return false;
      }

      // Service / Category filter
      if (selectedService !== "All Services") {
        const matchesDirect = vendor.categoryType
          .toLowerCase()
          .includes(selectedService.toLowerCase());
        const matchesServiceList = vendor.services.some((s) =>
          s.toLowerCase().includes(selectedService.toLowerCase())
        );
        if (!matchesDirect && !matchesServiceList) {
          return false;
        }
      }

      // Budget filter
      if (selectedBudget === "under-50k" && vendor.priceStarting > 50000) {
        return false;
      }
      if (
        selectedBudget === "50k-100k" &&
        (vendor.priceStarting < 50000 || vendor.priceStarting > 100000)
      ) {
        return false;
      }
      if (
        selectedBudget === "100k-200k" &&
        (vendor.priceStarting < 100000 || vendor.priceStarting > 200000)
      ) {
        return false;
      }
      if (selectedBudget === "above-200k" && vendor.priceStarting < 200000) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.priceStarting - b.priceStarting;
      }
      if (sortBy === "price-desc") {
        return b.priceStarting - a.priceStarting;
      }
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0; // recommended
    });

    return result;
  }, [allDecoratorsList, searchTerm, selectedCity, selectedService, selectedBudget, sortBy]);

  // Form Submit Handler
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.phone.trim() || formData.phone.length < 10)
      errors.phone = "Please enter a valid 10-digit mobile number.";
    if (!formData.date) errors.date = "Please select your wedding date.";
    if (!formData.location.trim())
      errors.location = "Please enter wedding venue or event location.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          location: formData.location,
          budget: formData.budget || enquiryModalVendor?.priceDisplay || "₹1,50,000",
          message: formData.message,
          service: formData.service || enquiryModalVendor?.categoryType || "Wedding Decoration",
          target_id: enquiryModalVendor?.dbId || enquiryModalVendor?.id || null,
          target_type: "vendor",
          target_name: enquiryModalVendor?.company || enquiryModalVendor?.name || "Wedding Decorator",
          service_or_product: enquiryModalVendor?.name || formData.service || "Wedding Decorator",
          source: "Wedding Decoration Page",
          is_booking: true,
        }),
      });
    } catch (err) {
      console.error("Error submitting decoration enquiry:", err);
    }
    setFormSubmitted(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalVendor(null);
    setFormSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      location: "",
      budget: "",
      service: "Royal Wedding Stage",
      message: "",
    });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. HERO SECTION
         ========================================================================= */}
      <section className="relative isolate overflow-hidden border-b border-[#665038] bg-[#241321] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Background Indian Mandap/Stage Decor Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/decoration/royal-wedding-stage.jpg')",
          }}
        />

        {/* Deep Plum Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/90 via-[#241321]/80 to-[#241321]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="hidden lg:flex mb-5 items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link href="/" className="transition-colors hover:text-[#D6B875]">
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="text-[#C9BBAF]">Wedding Vendors</span>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">Wedding Decoration</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Bespoke Wedding Scenography &amp; Sets
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Wedding Decoration Services
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Explore India&apos;s leading wedding decoration studios specializing in
              royal stages, divine floral mandaps, grand entrance gates, fairytale garden lawns,
              vibrant haldi canopies, luxury reception setups, and picturesque destination weddings.
            </p>
          </div>

          {/* Quick Search & Location Bar inside Hero */}
          <div className="mt-8 max-w-3xl rounded-2xl border border-[#665038] bg-[#3A2638]/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              {/* Search decorator name */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search decoration service or studio..."
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-3 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-[#B08D45]"
                />
              </div>

              {/* City selector */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-xs text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#241321]">
                      {c}
                    </option>
                  ))}
                </select>
                <MapPin
                  size={16}
                  className="absolute left-3 top-3 text-[#B08D45]"
                />
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-3.5 text-[#C9BBAF]"
                />
              </div>

              {/* Find Button */}
              <button suppressHydrationWarning
                type="button"
                onClick={() => {}}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-md transition-all hover:brightness-105 sm:text-sm"
              >
                <Sparkles size={15} />
                Find Decorators
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TWO-COLUMN LAYOUT: SIDEBAR FILTERS + VENDOR LISTINGS
         ========================================================================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile Filter Toggle Button */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <button suppressHydrationWarning
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 rounded-xl border border-[#665038] bg-[#321B30] px-4 py-2.5 text-xs font-semibold text-[#F8F1E5]"
            >
              <SlidersHorizontal size={15} className="text-[#B08D45]" />
              <span>Filters ({activeFiltersCount})</span>
            </button>

            {shortlistedIds.length > 0 && (
              <span className="flex items-center gap-1 rounded-full border border-[#B08D45] bg-[#321B30] px-3 py-1.5 text-xs font-medium text-[#D6B875]">
                <Heart size={13} className="fill-[#B08D45] text-[#B08D45]" />
                {shortlistedIds.length} Shortlisted
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[290px_1fr]">
            {/* -------------------------------------------------------------
                A. FILTER SIDEBAR (Desktop Sticky, Mobile Collapsible)
               ------------------------------------------------------------- */}
            <aside
              className={`${
                mobileFilterOpen ? "block" : "hidden"
              } lg:block`}
            >
              <div className="sticky top-24 space-y-6 rounded-2xl border border-[#665038] bg-[#321B30] p-5 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#665038]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#B08D45]" />
                    <h3 className="font-serif text-lg font-bold text-[#F8F1E5]">
                      Filter Decorators
                    </h3>
                  </div>

                  {activeFiltersCount > 0 && (
                    <button suppressHydrationWarning
                      type="button"
                      onClick={handleClearFilters}
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#D6B875] hover:underline"
                    >
                      <RotateCcw size={12} />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Filter 1: City / Location */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    City / Location
                  </label>
                  <div className="space-y-1.5">
                    {CITIES.map((city) => (
                      <label
                        key={city}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="decor-city"
                            checked={selectedCity === city}
                            onChange={() => setSelectedCity(city)}
                            className="accent-[#B08D45]"
                          />
                          {city}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 2: Decoration Services */}
                <div className="border-t border-[#665038]/40 pt-4">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    Decoration Service Type
                  </label>
                  <div className="space-y-1.5">
                    {DECORATION_SERVICES.map((serv) => (
                      <label
                        key={serv}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="decor-service"
                            checked={selectedService === serv}
                            onChange={() => setSelectedService(serv)}
                            className="accent-[#B08D45]"
                          />
                          <span className="truncate">{serv}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 3: Budget Range */}
                <div className="border-t border-[#665038]/40 pt-4">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    Budget per Event
                  </label>
                  <div className="space-y-1.5">
                    {BUDGET_RANGES.map((b) => (
                      <label
                        key={b.value}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="decor-budget"
                            checked={selectedBudget === b.value}
                            onChange={() => setSelectedBudget(b.value)}
                            className="accent-[#B08D45]"
                          />
                          {b.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bottom Clear Button */}
                <div className="pt-2">
                  <button suppressHydrationWarning
                    type="button"
                    onClick={handleClearFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#665038] bg-[#241321] py-2.5 text-xs font-semibold text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:text-[#D6B875]"
                  >
                    <RotateCcw size={13} />
                    Reset All Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* -------------------------------------------------------------
                B. RESULTS & VENDOR CARDS (WeddingKalki Inspired Layout)
               ------------------------------------------------------------- */}
            <div>
              {/* Header Bar */}
              <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-[#665038]/40 bg-[#321B30] p-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                    Available Wedding Decorators
                  </h2>
                  <p className="text-xs text-[#C9BBAF]">
                    Showing {filteredDecorators.length}{" "}
                    {filteredDecorators.length === 1
                      ? "decoration studio"
                      : "decoration studios"}{" "}
                    in{" "}
                    <span className="font-medium text-[#D6B875]">
                      {selectedCity}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {shortlistedIds.length > 0 && (
                    <span className="hidden items-center gap-1 rounded-full border border-[#B08D45] bg-[#241321] px-3 py-1.5 text-xs font-medium text-[#D6B875] sm:flex">
                      <Heart size={13} className="fill-[#B08D45] text-[#B08D45]" />
                      {shortlistedIds.length} Shortlisted
                    </span>
                  )}

                  {/* Sorting */}
                  <div className="flex items-center gap-2 text-xs">
                    <label htmlFor="sort-decor" className="text-[#C9BBAF]">
                      Sort by:
                    </label>
                    <select
                      id="sort-decor"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="cursor-pointer rounded-lg border border-[#665038] bg-[#241321] px-3 py-1.5 text-xs font-medium text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {filteredDecorators.length === 0 ? (
                <div className="rounded-3xl border border-[#665038] bg-[#321B30] px-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#B08D45]">
                    <Flower2 size={28} />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                    No Decorators Found
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#C9BBAF]">
                    We couldn&apos;t find any wedding decorators matching your selected
                    city, service type, or budget. Try resetting your filters.
                  </p>
                  <button suppressHydrationWarning
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:brightness-105"
                  >
                    <RotateCcw size={14} />
                    Reset All Filters
                  </button>
                </div>
              ) : (
                /* Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDecorators.map((vendor) => {
                    const isShortlisted = shortlistedIds.includes(vendor.id);

                    return (
                      <article
                        key={vendor.id}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B875] hover:shadow-2xl hover:shadow-black/70"
                      >
                        <div>
                          {/* Image Thumbnail with Overlay, Badges, and Price Pill */}
                          <div className="relative h-60 w-full overflow-hidden bg-[#241321]">
                            <img
                              src={vendor.image}
                              alt={`${vendor.name} - ${vendor.categoryType}`}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-black/40" />

                            {/* Top Left: Category Service Tag */}
                            <div className="absolute left-3 top-3">
                              <span className="rounded-full border border-[#D6B875]/40 bg-[#241321]/90 px-3 py-1 text-[10px] font-semibold tracking-wide text-[#E8D9B5] backdrop-blur-md">
                                {vendor.categoryType}
                              </span>
                            </div>

                            {/* Top Right: Shortlist Button */}
                            <button suppressHydrationWarning
                              type="button"
                              onClick={() => toggleShortlist(vendor.id)}
                              aria-pressed={isShortlisted}
                              aria-label={
                                isShortlisted
                                  ? `Remove ${vendor.name} from shortlist`
                                  : `Shortlist ${vendor.name}`
                              }
                              className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                                isShortlisted
                                  ? "border-[#D6B875] bg-[#241321] text-[#D6B875] shadow-lg shadow-[#D6B875]/20"
                                  : "border-[#665038] bg-[#241321]/80 text-[#F8F1E5] hover:border-[#D6B875] hover:text-[#D6B875]"
                              }`}
                            >
                              <Heart
                                size={15}
                                className={
                                  isShortlisted
                                    ? "fill-[#D6B875] text-[#D6B875]"
                                    : "text-[#F8F1E5]"
                                }
                              />
                            </button>

                            {/* Bottom: Price Range Banner */}
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                              <span className="rounded-lg border border-[#665038] bg-[#241321]/95 px-2.5 py-1 text-[11px] font-bold text-[#F8F1E5] backdrop-blur-md">
                                Package: <span className="text-[#D6B875]">{vendor.priceRange}</span>
                              </span>
                              <span className="flex items-center gap-1 rounded-lg bg-[#241321]/90 px-2 py-1 text-[11px] font-semibold text-[#D6B875] backdrop-blur-md">
                                <Star size={12} className="fill-[#D6B875] text-[#D6B875]" />
                                {vendor.rating}
                              </span>
                            </div>
                          </div>

                          {/* Card Information Body */}
                          <div className="p-5">
                            {/* Location & Experience Line */}
                            <div className="flex items-center justify-between text-xs text-[#C9BBAF]">
                              <span className="flex items-center gap-1">
                                <MapPin size={13} className="text-[#B08D45]" />
                                {vendor.location}
                              </span>
                              <span className="text-[11px] text-[#D6B875] font-medium">
                                {vendor.experience}
                              </span>
                            </div>

                            {/* Decorator Vendor Name */}
                            <h3 className="mt-2.5 font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                              {vendor.name}
                            </h3>

                            {/* Speciality Badge Line */}
                            <p className="mt-0.5 text-xs text-[#E8D9B5]/80 font-medium truncate">
                              {vendor.badge} • {vendor.company}
                            </p>

                            {/* Short Description */}
                            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                              {vendor.about}
                            </p>

                            {/* Key Service Feature Badges */}
                            <div className="mt-3.5 flex flex-wrap gap-1.5">
                              {vendor.services.slice(0, 3).map((serv) => (
                                <span
                                  key={serv}
                                  className="rounded-md border border-[#665038]/50 bg-[#321B30] px-2 py-0.5 text-[10px] text-[#E8D9B5]"
                                >
                                  {serv}
                                </span>
                              ))}
                              {vendor.services.length > 3 && (
                                <span className="rounded-md bg-[#321B30] px-1.5 py-0.5 text-[10px] text-[#C9BBAF]">
                                  +{vendor.services.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Starting Price Row */}
                            <div className="mt-4 flex items-baseline justify-between border-t border-[#665038]/40 pt-3">
                              <span className="text-xs text-[#C9BBAF]">
                                Starting Price:
                              </span>
                              <span className="font-serif text-base font-bold text-[#D6B875]">
                                {vendor.priceDisplay}{" "}
                                <span className="text-xs font-normal text-[#C9BBAF]">
                                  onwards
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons (View Details + Send Enquiry) */}
                        <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => setDetailsModalVendor(vendor)}
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#B08D45] bg-[#321B30] py-2.5 text-xs font-semibold text-[#F8F1E5] transition-all hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <Eye size={14} className="text-[#D6B875]" />
                            <span>View Details</span>
                          </button>

                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => setEnquiryModalVendor(vendor)}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-2.5 text-xs font-semibold text-[#241321] shadow-md transition-all hover:brightness-105"
                          >
                            <Send size={13} />
                            <span>Send Enquiry</span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. DECORATION INSPIRATION GALLERY
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#321B30] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Visual Moodboard
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5]">
              Wedding Decoration Inspiration
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-[#C9BBAF] sm:text-sm">
              Discover magnificent royal stages, floral mandaps, grand entrance gates,
              garden setups, haldi backdrops, and reception productions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSPIRATION_GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-md transition-all duration-300 hover:border-[#D6B875] hover:-translate-y-1"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#241321]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-md bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#D6B875]">
                    {item.tag}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold text-[#F8F1E5]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FAQ SECTION (Decoration Accordion)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#241321] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Planning Advice
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5]">
              Frequently Asked Questions About Wedding Decoration
            </h2>
            <p className="mt-2 text-xs text-[#C9BBAF] sm:text-sm">
              Helpful insights on package costs, custom theme fabrication, and booking timelines.
            </p>
          </div>

          <div className="space-y-3.5">
            {DECORATION_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#665038]/60 bg-[#321B30] transition-colors"
                >
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[#F8F1E5] transition-colors hover:text-[#D6B875]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={17}
                      className={`shrink-0 text-[#B08D45] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#665038]/40 px-5 pb-5 pt-3 text-xs leading-relaxed text-[#C9BBAF]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CTA BANNER: ARE YOU A WEDDING DECORATOR?
         ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] px-6 py-14 text-center shadow-2xl sm:px-12">
          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
            Decorator Partnership
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
            Are You a Wedding Decorator?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
            Showcase your artistry and connect with couples planning their dream wedding
            on ShubhVivah. Direct customer enquiries, verified vendor badge, zero commission.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-7 py-3 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
            >
              <span>List Your Business</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#665038] bg-[#241321] px-6 py-3 text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#3A2638]"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VENDOR DETAILS MODAL (Opens on "View Details")
         ========================================================================= */}
      {detailsModalVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            <button suppressHydrationWarning
              type="button"
              onClick={() => setDetailsModalVendor(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638]"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#D6B875]/40 bg-[#241321] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#D6B875]">
                  {detailsModalVendor.categoryType}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#D6B875]">
                  <Star size={13} className="fill-[#D6B875]" />
                  {detailsModalVendor.rating} ({detailsModalVendor.reviewCount} Reviews)
                </span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                {detailsModalVendor.name}
              </h3>
              <p className="text-xs text-[#C9BBAF]">
                {detailsModalVendor.location} • {detailsModalVendor.experience} • {detailsModalVendor.company}
              </p>

              {/* Price Range Banner in Modal */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#665038]/60 bg-[#241321] p-3.5">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C9BBAF]">
                    Price Range
                  </span>
                  <p className="font-serif text-lg font-bold text-[#D6B875]">
                    {detailsModalVendor.priceRange}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-[#C9BBAF]">
                    Starting Package
                  </span>
                  <p className="font-serif text-lg font-bold text-[#F8F1E5]">
                    {detailsModalVendor.priceDisplay}{" "}
                    <span className="text-xs font-normal text-[#C9BBAF]">onwards</span>
                  </p>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="mt-5">
                <h4 className="mb-2.5 font-serif text-sm font-bold text-[#F8F1E5]">
                  Portfolio Samples
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {detailsModalVendor.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-[#665038]/50 bg-[#241321]"
                    >
                      <img
                        src={imgUrl}
                        alt={`${detailsModalVendor.name} sample ${i + 1}`}
                        className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* About description */}
              <div className="mt-5 rounded-xl border border-[#665038]/50 bg-[#241321] p-4 text-xs leading-relaxed text-[#C9BBAF]">
                <h4 className="mb-1 font-serif text-sm font-bold text-[#F8F1E5]">
                  About this Decoration Service
                </h4>
                {detailsModalVendor.about}
              </div>

              {/* Highlights & Inclusions */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#665038]/40 bg-[#241321] p-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    Key Highlights:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#C9BBAF]">
                    {detailsModalVendor.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="shrink-0 text-[#D6B875]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#665038]/40 bg-[#241321] p-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    Package Inclusions:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#C9BBAF]">
                    {detailsModalVendor.packageIncludes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="shrink-0 text-[#D6B875]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Services Offered Badges */}
              <div className="mt-5">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                  Services Covered:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {detailsModalVendor.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-[#665038] bg-[#3A2638] px-3 py-1 text-xs text-[#F8F1E5]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom modal actions */}
              <div className="mt-6 flex items-center justify-between border-t border-[#665038]/50 pt-4">
                <div>
                  <span className="text-xs text-[#C9BBAF]">Direct Vendor Booking</span>
                  <p className="text-xs text-[#D6B875]">No commission fees charged</p>
                </div>

                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    const v = detailsModalVendor;
                    setDetailsModalVendor(null);
                    setEnquiryModalVendor(v);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-7 py-2.5 text-xs font-semibold text-[#241321] shadow-md transition-all hover:brightness-105"
                >
                  <Send size={13} />
                  <span>Send Enquiry Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SEND ENQUIRY MODAL (Universal with strict validation)
         ========================================================================= */}
      <UniversalEnquiryModal
        isOpen={!!enquiryModalVendor}
        onClose={() => setEnquiryModalVendor(null)}
        target={enquiryModalVendor}
        targetType="decoration"
        source="Wedding Decoration Page"
      />
    </div>
  );
}
