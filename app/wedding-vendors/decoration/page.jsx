"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Sparkles,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  Phone,
  Mail,
  Calendar,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Flower2,
  Palette,
  Lightbulb,
  Building2,
  Compass,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

// =========================================================================
// DEMO DECORATION VENDOR DATA — Readily replaceable with MySQL / Backend API
// =========================================================================
const DECORATORS_DATA = [
  {
    id: "amara-floral-sets",
    name: "Amara Floral & Set Designers",
    company: "Amara Luxury Events Pvt Ltd",
    city: "Delhi",
    location: "South Delhi & NCR",
    priceStarting: 150000,
    priceDisplay: "₹1,50,000",
    experience: "9+ Years Experience",
    badge: "Celebrity Mandap Artist",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Mandap Decoration",
      "Floral Decoration",
      "Wedding Stage Decoration",
      "Reception Decoration",
      "Theme Decoration",
    ],
    about:
      "Specializing in royal Indian mandaps adorned with exotic tuberose, Dutch roses, brass bells, and architectural Mughal arches for high-profile weddings in Delhi NCR and luxury destinations.",
  },
  {
    id: "royal-rajputana-decor",
    name: "Royal Rajputana Decorators",
    company: "Rajputana Wedding Concepts",
    city: "Jaipur",
    location: "Jaipur & Udaipur",
    priceStarting: 85000,
    priceDisplay: "₹85,000",
    experience: "12+ Years Experience",
    badge: "Palace Specialist",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Mandap Decoration",
      "Entrance and Welcome Gate Decoration",
      "Wedding Lighting",
      "Complete Wedding Decoration Packages",
    ],
    about:
      "Bespoke heritage palace decor experts bringing Rajasthan's royal grandeur alive with mirror-work canopies, marigold cascading waterfalls, traditional tikri glass art, and courtyard illumination.",
  },
  {
    id: "awadh-floral-craft",
    name: "Avadh Floral & Stage Craft",
    company: "Avadh Celebrations",
    city: "Lucknow",
    location: "Lucknow & Kanpur",
    priceStarting: 45000,
    priceDisplay: "₹45,000",
    experience: "7+ Years Experience",
    badge: "Top Rated in UP",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Wedding Stage Decoration",
      "Reception Decoration",
      "Haldi and Mehendi Decoration",
      "Floral Decoration",
    ],
    about:
      "Graceful Nawabi wedding decor with delicate jasmine drapery, velvet bolsters, candle-lit shamiyanas, and pastel floral backdrops tailored for nikah, reception, and sangeet stages.",
  },
  {
    id: "noida-modern-bloom",
    name: "Bloom & Brass Event Stylists",
    company: "Bloom & Brass Studio",
    city: "Noida",
    location: "Noida & Greater Noida",
    priceStarting: 35000,
    priceDisplay: "₹35,000",
    experience: "5+ Years Experience",
    badge: "Minimalist Trends",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Wedding Stage Decoration",
      "Haldi and Mehendi Decoration",
      "Entrance and Welcome Gate Decoration",
      "Theme Decoration",
    ],
    about:
      "Contemporary bohemian and modern Indian wedding decor featuring pampas grass, warm fairy light tunnels, wooden cabanas, and sunburst floral installations for lively sundowner ceremonies.",
  },
  {
    id: "moradabad-brass-weddings",
    name: "Moradabad Shahi Mandap & Light",
    company: "Shahi Decorators",
    city: "Moradabad",
    location: "Moradabad & Bareilly",
    priceStarting: 22000,
    priceDisplay: "₹22,000",
    experience: "8+ Years Experience",
    badge: "Budget Friendly",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Mandap Decoration",
      "Wedding Lighting",
      "Bridal Entry Decoration",
      "Entrance and Welcome Gate Decoration",
    ],
    about:
      "Famous for authentic handcrafted Moradabadi brass candelabras, traditional red & gold velvet mandaps, crystal chandeliers, and grand floral entryway setups with cold pyro effects.",
  },
  {
    id: "taj-city-wedding-decor",
    name: "Taj Heritage Decorators",
    company: "Taj City Events",
    city: "Agra",
    location: "Agra & Mathura",
    priceStarting: 65000,
    priceDisplay: "₹65,000",
    experience: "10+ Years Experience",
    badge: "Mughal Architecture Decor",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Wedding Stage Decoration",
      "Mandap Decoration",
      "Reception Decoration",
      "Wedding Lighting",
    ],
    about:
      "Creating iconic romantic wedding atmospheres in Agra with ivory marble-inspired stages, lotus pond centerpieces, and luminous amber ambient lighting designed for timeless celebrations.",
  },
  {
    id: "mumbai-luxury-botanica",
    name: "Botanica Wedding Production",
    company: "Botanica Luxury Concepts",
    city: "Mumbai",
    location: "South Mumbai & Bandra",
    priceStarting: 220000,
    priceDisplay: "₹2,20,000",
    experience: "11+ Years Experience",
    badge: "Celebrity Production House",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Complete Wedding Decoration Packages",
      "Theme Decoration",
      "Floral Decoration",
      "Wedding Stage Decoration",
      "Bridal Entry Decoration",
    ],
    about:
      "Full-scale wedding production and scenography firm building colossal floral glasshouses, mirror aisle walkways, and interactive kinetic light ceilings for five-star luxury ballrooms.",
  },
  {
    id: "udaipur-lake-palace-decor",
    name: "Udaipur Lakeview Decor",
    company: "Mewar Royal Decorators",
    city: "Udaipur",
    location: "Lake Pichola & Fateh Sagar",
    priceStarting: 110000,
    priceDisplay: "₹1,10,000",
    experience: "8+ Years Experience",
    badge: "Lakeside Destination",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Mandap Decoration",
      "Entrance and Welcome Gate Decoration",
      "Floral Decoration",
      "Haldi and Mehendi Decoration",
    ],
    about:
      "Specialized in floating lakeside mandaps, boat floral decor, and vintage Rajput gazebos designed to harmoniously blend with Udaipur's royal lake panoramas.",
  },
];

const CITIES = [
  "All Cities",
  "Delhi",
  "Jaipur",
  "Lucknow",
  "Noida",
  "Moradabad",
  "Agra",
  "Mumbai",
  "Udaipur",
];

const DECORATION_SERVICES = [
  "All Services",
  "Wedding Stage Decoration",
  "Mandap Decoration",
  "Floral Decoration",
  "Reception Decoration",
  "Entrance and Welcome Gate Decoration",
  "Wedding Lighting",
  "Theme Decoration",
  "Haldi and Mehendi Decoration",
  "Bridal Entry Decoration",
  "Complete Wedding Decoration Packages",
];

const BUDGET_RANGES = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹25,000", value: "under-25k" },
  { label: "₹25,000–₹50,000", value: "25k-50k" },
  { label: "₹50,000–₹1,00,000", value: "50k-100k" },
  { label: "₹1,00,000 and above", value: "above-100k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

const INSPIRATION_GALLERY = [
  {
    title: "Luxury Floral Mandap",
    tag: "Mandap Decor",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Elegant Royal Stage",
    tag: "Stage Decor",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Grand Palace Entrance",
    tag: "Welcome Gate",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Outdoor Garden Gazebo",
    tag: "Garden Decor",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Minimal Ivory & Gold Mandap",
    tag: "Ivory & Gold",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Vibrant Haldi & Mehendi Setup",
    tag: "Haldi Decor",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
  },
];

const DECORATION_FAQS = [
  {
    q: "How much does wedding decoration typically cost in India?",
    a: "Wedding decoration pricing varies based on venue scale, fresh vs. artificial florals, lighting sophistication, and custom fabrication. Basic regional venue decor can range from ₹20,000 to ₹50,000, while bespoke luxury themes, imported flower mandaps, and comprehensive multi-day palace packages typically range from ₹1,00,000 to ₹5,00,000+.",
  },
  {
    q: "What is typically included in a complete wedding decoration package?",
    a: "A full wedding package usually covers the main wedding stage with customized backdrop, sacred 4-pillar or dome mandap, floral aisle/walkway, entrance archway/welcome gate, ambient venue illumination (fairy lights, up-lights, chandeliers), table centerpieces, and seating upholstery covers.",
  },
  {
    q: "Can decorators create custom wedding themes based on our mood board?",
    a: "Yes! Most professional decorators on ShubhVivah welcome couple mood boards, Pinterest boards, and personal color palettes. They will generate 2D/3D sketches or physical mockups illustrating floral choices, fabric draping textures, and prop placement prior to execution.",
  },
  {
    q: "How early should we book a wedding decorator?",
    a: "For prime auspicious winter dates (November to February), booking 4 to 6 months in advance is recommended. This allows adequate time to source exotic seasonal flowers, build bespoke structure frames, and secure specialty lighting equipment.",
  },
  {
    q: "Do decorators provide floral, mandap, lighting, and stage decoration together?",
    a: "Yes, verified decoration studios on ShubhVivah generally provide all-inclusive turnkey services covering floral artistry, carpenter-built stage sets, electric lighting, sound trussing, and floral bridal entry canopies (phoolon ki chadar).",
  },
];

export default function WeddingDecorationPage() {
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
    service: "Mandap Decoration",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Shortlist Toggle Handler with accessible state
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
  const filteredDecorators = useMemo(() => {
    let result = DECORATORS_DATA.filter((vendor) => {
      // Search by decorator name, company, city, or service
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = vendor.name.toLowerCase().includes(query);
        const matchesCompany = vendor.company.toLowerCase().includes(query);
        const matchesCity = vendor.city.toLowerCase().includes(query);
        const matchesService = vendor.services.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesAbout = vendor.about.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesCompany &&
          !matchesCity &&
          !matchesService &&
          !matchesAbout
        ) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "All Cities" && vendor.city !== selectedCity) {
        return false;
      }

      // Service filter
      if (
        selectedService !== "All Services" &&
        !vendor.services.includes(selectedService)
      ) {
        return false;
      }

      // Budget filter
      if (
        selectedBudget === "under-25k" &&
        vendor.priceStarting >= 25000
      ) {
        return false;
      }
      if (
        selectedBudget === "25k-50k" &&
        (vendor.priceStarting < 25000 || vendor.priceStarting > 50000)
      ) {
        return false;
      }
      if (
        selectedBudget === "50k-100k" &&
        (vendor.priceStarting < 50000 || vendor.priceStarting > 100000)
      ) {
        return false;
      }
      if (
        selectedBudget === "above-100k" &&
        vendor.priceStarting < 100000
      ) {
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
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0; // recommended
    });

    return result;
  }, [searchTerm, selectedCity, selectedService, selectedBudget, sortBy]);

  // Form Submit Handler
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.phone.trim() || formData.phone.length < 10)
      errors.phone = "Please enter a valid 10-digit mobile number.";
    if (!formData.date) errors.date = "Please select your wedding date.";
    if (!formData.location.trim())
      errors.location = "Please enter venue or event location.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
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
      service: "Mandap Decoration",
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
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Dark Luxury Deep Plum Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/90 via-[#241321]/80 to-[#241321]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#D6B875]"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <Link
              href="/vendors"
              className="transition-colors hover:text-[#D6B875]"
            >
              Wedding Vendors
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">Decoration</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Royal Wedding Scenography
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Find the Perfect Wedding Decorators
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Discover talented wedding decorators who bring your dream celebration
              to life with beautiful floral arrangements, stunning mandaps, elegant stages,
              and personalized themes.
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
                  placeholder="Search decorator or company..."
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
              <button
                type="button"
                onClick={() => {}}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875] sm:text-sm"
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
            <button
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
                    <button
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
                    Decoration Services
                  </label>
                  <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
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
                    Budget per Function
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
                  <button
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
                B. RESULTS & VENDOR CARDS
               ------------------------------------------------------------- */}
            <div>
              {/* Header Bar */}
              <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-[#665038]/40 bg-[#321B30] p-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                    Wedding Decoration Services
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
                      Sort:
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
                    city, service, or budget range.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                  >
                    <RotateCcw size={14} />
                    Clear All Filters
                  </button>
                </div>
              ) : (
                /* Cards Grid (3 Columns on Large Screens) */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDecorators.map((vendor) => {
                    const isShortlisted = shortlistedIds.includes(vendor.id);

                    return (
                      <article
                        key={vendor.id}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-black/60"
                      >
                        <div>
                          {/* Image Thumbnail with Overlay & Badges */}
                          <div className="relative h-56 w-full overflow-hidden">
                            <img
                              src={vendor.image}
                              alt={`${vendor.name} wedding decoration`}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />

                            {/* Badge */}
                            <div className="absolute left-3 top-3">
                              <span className="rounded-full border border-[#B08D45]/40 bg-[#241321]/85 px-3 py-1 text-[10px] font-semibold text-[#E8D9B5] backdrop-blur-xs">
                                {vendor.badge}
                              </span>
                            </div>

                            {/* Shortlist Heart Button */}
                            <button
                              type="button"
                              onClick={() => toggleShortlist(vendor.id)}
                              aria-pressed={isShortlisted}
                              aria-label={
                                isShortlisted
                                  ? `Remove ${vendor.name} from shortlist`
                                  : `Shortlist ${vendor.name}`
                              }
                              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321]/80 text-[#F8F1E5] backdrop-blur-xs transition-colors hover:border-[#B08D45]"
                            >
                              <Heart
                                size={16}
                                className={
                                  isShortlisted
                                    ? "fill-[#B08D45] text-[#B08D45]"
                                    : "text-[#F8F1E5]"
                                }
                              />
                            </button>

                            {/* Experience Tag bottom right */}
                            <div className="absolute bottom-3 right-3 rounded-md bg-[#241321]/90 px-2 py-0.5 text-[10px] font-medium text-[#C9BBAF]">
                              {vendor.experience}
                            </div>
                          </div>

                          {/* Card Information */}
                          <div className="p-5">
                            {/* Location */}
                            <div className="flex items-center justify-between text-xs text-[#C9BBAF]">
                              <span className="flex items-center gap-1">
                                <MapPin size={13} className="text-[#B08D45]" />
                                {vendor.location}
                              </span>
                            </div>

                            {/* Decorator Name */}
                            <h3 className="mt-2.5 font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                              {vendor.name}
                            </h3>

                            {/* Short Description */}
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                              {vendor.about}
                            </p>

                            {/* Service Badges */}
                            <div className="mt-3.5 flex flex-wrap gap-1">
                              {vendor.services.slice(0, 3).map((serv) => (
                                <span
                                  key={serv}
                                  className="rounded-md border border-[#665038]/40 bg-[#321B30] px-2 py-0.5 text-[10px] text-[#E8D9B5]"
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

                            {/* Pricing */}
                            <div className="mt-5 flex items-baseline justify-between border-t border-[#665038]/40 pt-3">
                              <span className="text-xs text-[#C9BBAF]">
                                Starting Package:
                              </span>
                              <span className="font-serif text-lg font-bold text-[#D6B875]">
                                {vendor.priceDisplay}{" "}
                                <span className="text-xs font-normal text-[#C9BBAF]">
                                  onwards
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                          <button
                            type="button"
                            onClick={() => setDetailsModalVendor(vendor)}
                            className="flex items-center justify-center gap-1 rounded-xl border border-[#B08D45] bg-[#321B30] py-2.5 text-xs font-medium text-[#F8F1E5] transition-all hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <ExternalLink size={13} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => setEnquiryModalVendor(vendor)}
                            className="flex items-center justify-center gap-1 rounded-xl bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                          >
                            Send Enquiry
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
              Explore magnificent wedding mandaps, entrance walkways, haldi canopies,
              and reception stages crafted by master scenographers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSPIRATION_GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-md"
              >
                <div className="relative h-64 w-full overflow-hidden">
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
              Helpful insights on budgets, custom theme fabrication, and booking timelines.
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
                  <button
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
            Showcase your creativity and connect with couples planning their dream wedding
            on ShubhVivah. Direct customer leads, zero platform commission.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vendors/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-7 py-3 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:bg-[#D6B875]"
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
          VENDOR DETAILS MODAL
         ========================================================================= */}
      {detailsModalVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setDetailsModalVendor(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638]"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                Decoration Studio Profile
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                {detailsModalVendor.name}
              </h3>
              <p className="text-xs text-[#C9BBAF]">
                {detailsModalVendor.location} • {detailsModalVendor.experience}
              </p>

              {/* Gallery Grid */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {detailsModalVendor.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-[#665038]/50"
                  >
                    <img
                      src={imgUrl}
                      alt={`${detailsModalVendor.name} decor sample ${i + 1}`}
                      className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* About description */}
              <div className="mt-5 rounded-xl border border-[#665038]/50 bg-[#241321] p-4 text-xs leading-relaxed text-[#C9BBAF]">
                <h4 className="mb-1 font-serif text-sm font-bold text-[#F8F1E5]">
                  About the Studio
                </h4>
                {detailsModalVendor.about}
              </div>

              {/* Service Badges */}
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-semibold text-[#E8D9B5]">
                  Decoration Services Offered:
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
                  <span className="text-xs text-[#C9BBAF]">Package starts at:</span>
                  <p className="font-serif text-lg font-bold text-[#D6B875]">
                    {detailsModalVendor.priceDisplay} onwards
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const v = detailsModalVendor;
                    setDetailsModalVendor(null);
                    setEnquiryModalVendor(v);
                  }}
                  className="rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SEND ENQUIRY MODAL
         ========================================================================= */}
      {enquiryModalVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638]"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#B08D45] text-[#241321]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquiry Prepared
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[#C9BBAF]">
                  Thank you, <strong className="text-[#F8F1E5]">{formData.name}</strong>. Your enquiry details for{" "}
                  <strong className="text-[#D6B875]">{enquiryModalVendor.name}</strong> have been recorded in this demo UI.
                </p>
                <div className="mt-4 rounded-xl border border-[#665038]/60 bg-[#241321] p-3 text-left text-xs text-[#C9BBAF]">
                  <p>
                    <span className="font-semibold text-[#E8D9B5]">Date:</span> {formData.date}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#E8D9B5]">Location:</span> {formData.location}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#E8D9B5]">Service:</span> {formData.service}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#E8D9B5]">Budget:</span> {formData.budget || "Flexible"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="mt-6 rounded-full bg-[#B08D45] px-6 py-2 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Direct Decorator Enquiry
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  {enquiryModalVendor.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  {enquiryModalVendor.location} • Starting from{" "}
                  <span className="font-semibold text-[#D6B875]">
                    {enquiryModalVendor.priceDisplay}
                  </span>
                </p>

                <form onSubmit={handleEnquirySubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label
                      htmlFor="decor-enquiry-name"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="decor-enquiry-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Rohan Mehra"
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-[11px] text-rose-400">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="decor-enquiry-phone"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="decor-enquiry-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="9876543210"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-[11px] text-rose-400">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="decor-enquiry-email"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="decor-enquiry-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="rohan@example.com"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="decor-enquiry-date"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Wedding / Event Date *
                      </label>
                      <input
                        id="decor-enquiry-date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      />
                      {formErrors.date && (
                        <p className="mt-1 text-[11px] text-rose-400">
                          {formErrors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="decor-enquiry-location"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Venue or Event Location *
                      </label>
                      <input
                        id="decor-enquiry-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. Radisson Blu, Jaipur"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                      {formErrors.location && (
                        <p className="mt-1 text-[11px] text-rose-400">
                          {formErrors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="decor-enquiry-service"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Decoration Service Required
                      </label>
                      <select
                        id="decor-enquiry-service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="mt-1 w-full cursor-pointer rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      >
                        <option value="Mandap Decoration">Mandap Decoration</option>
                        <option value="Wedding Stage Decoration">Wedding Stage</option>
                        <option value="Floral Decoration">Floral Decoration</option>
                        <option value="Haldi and Mehendi Decoration">Haldi &amp; Mehendi</option>
                        <option value="Complete Wedding Decoration Packages">Complete Package</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="decor-enquiry-budget"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Expected Budget
                      </label>
                      <select
                        id="decor-enquiry-budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="mt-1 w-full cursor-pointer rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      >
                        <option value="">Select Range</option>
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000–₹1,00,000">₹50,000–₹1,00,000</option>
                        <option value="₹1,00,000–₹2,50,000">₹1,00,000–₹2,50,000</option>
                        <option value="Above ₹2,50,000">Above ₹2,50,000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="decor-enquiry-message"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Additional Notes or Ideas
                    </label>
                    <textarea
                      id="decor-enquiry-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share your color palette, indoor/outdoor preferences, or specific ideas..."
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                    >
                      Submit Decoration Enquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
