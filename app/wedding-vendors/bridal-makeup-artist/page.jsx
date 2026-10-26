"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Sparkles,
  Star,
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
  Brush,
  Palette,
  ShieldCheck,
  HelpCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

// =========================================================================
// DEMO BRIDAL MAKEUP ARTIST DATA — Ready for MySQL / Backend API integration
// =========================================================================
const MAKEUP_ARTISTS_DATA = [
  {
    id: "glam-by-shweta-delhi",
    name: "Shweta Gaur Makeup Studio",
    location: "Delhi",
    city: "Delhi",
    pricePerFunction: 28000,
    priceDisplay: "₹28,000",
    experience: "8+ Years Exp",
    rating: 4.9,
    reviews: 136,
    badge: "Celebrity Artist",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "HD Makeup",
      "Airbrush Makeup",
      "Hair Styling",
      "Draping",
    ],
    about:
      "Renowned celebrity bridal artist known for dewy skin aesthetics, royal jewelry coordination, and flawless high-definition bridal transformations.",
    travelsToVenue: true,
  },
  {
    id: "meera-sakhrani-mumbai",
    name: "Meera & Co. Bridal Artistry",
    location: "Mumbai",
    city: "Mumbai",
    pricePerFunction: 45000,
    priceDisplay: "₹45,000",
    experience: "11+ Years Exp",
    rating: 5.0,
    reviews: 182,
    badge: "Luxury Specialist",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Airbrush Makeup",
      "HD Makeup",
      "Hair Styling",
      "Party Makeup",
      "Draping",
    ],
    about:
      "Pioneer in bespoke bridal couture makeup. Focuses on accentuating natural bone structure with radiant textures and waterproof bridal formulations.",
    travelsToVenue: true,
  },
  {
    id: "royal-blush-jaipur",
    name: "Royal Blush by Tanvi",
    location: "Jaipur",
    city: "Jaipur",
    pricePerFunction: 22000,
    priceDisplay: "₹22,000",
    experience: "6+ Years Exp",
    rating: 4.8,
    reviews: 74,
    badge: "Trending in Rajasthan",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "HD Makeup",
      "Traditional Bridal Makeup",
      "Hair Styling",
      "Draping",
    ],
    about:
      "Specialized in Rajasthani royal bridal looks with authentic kundan mathapatti draping, kohled eyes, and glass-skin complexion finish.",
    travelsToVenue: true,
  },
  {
    id: "lucknow-nawab-makeovers",
    name: "Zeenat Makeovers & Spa",
    location: "Lucknow",
    city: "Lucknow",
    pricePerFunction: 16000,
    priceDisplay: "₹16,000",
    experience: "7+ Years Exp",
    rating: 4.8,
    reviews: 62,
    badge: "Top Rated in UP",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Bridal Makeup",
      "HD Makeup",
      "Party Makeup",
      "Draping",
    ],
    about:
      "Expertise in graceful Awadhi bridal styling, traditional paasa & dupatta setting, soft smokey eyes, and long-lasting reception looks.",
    travelsToVenue: true,
  },
  {
    id: "noida-diva-makeovers",
    name: "Studio 9 Glow by Preeti",
    location: "Noida",
    city: "Noida",
    pricePerFunction: 18500,
    priceDisplay: "₹18,500",
    experience: "5+ Years Exp",
    rating: 4.7,
    reviews: 58,
    badge: "Verified Artist",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "HD Makeup",
      "Natural Makeup",
      "Hair Styling",
      "Party Makeup",
    ],
    about:
      "Modern minimal bridal looks with high emphasis on skin prep, luxury international cosmetic brands, and modern textured updos.",
    travelsToVenue: true,
  },
  {
    id: "moradabad-elegance-studio",
    name: "Elegance Bridal Studio",
    location: "Moradabad",
    city: "Moradabad",
    pricePerFunction: 9500,
    priceDisplay: "₹9,500",
    experience: "4+ Years Exp",
    rating: 4.6,
    reviews: 41,
    badge: "Budget Friendly",
    image:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Bridal Makeup",
      "Natural Makeup",
      "Hair Styling",
      "Draping",
    ],
    about:
      "Trusted local bridal salon offering complete head-to-toe wedding packages, mehndi draping, and professional bridal grooming in Moradabad.",
    travelsToVenue: false,
  },
  {
    id: "aurum-bridal-mumbai",
    name: "Aurum Makeup Lounge",
    location: "Mumbai",
    city: "Mumbai",
    pricePerFunction: 38000,
    priceDisplay: "₹38,000",
    experience: "9+ Years Exp",
    rating: 4.9,
    reviews: 118,
    badge: "Celebrity Favorite",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Airbrush Makeup",
      "HD Makeup",
      "Hair Styling",
      "Natural Makeup",
      "Draping",
    ],
    about:
      "Luxury bridal studio serving high-profile weddings in Mumbai and destination resorts with premium international products like Charlotte Tilbury and Huda Beauty.",
    travelsToVenue: true,
  },
  {
    id: "udaipur-heritage-bride",
    name: "Heritage Glow by Ananya",
    location: "Udaipur",
    city: "Udaipur",
    pricePerFunction: 32000,
    priceDisplay: "₹32,000",
    experience: "6+ Years Exp",
    rating: 4.9,
    reviews: 86,
    badge: "Destination Artist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "HD Makeup",
      "Airbrush Makeup",
      "Traditional Bridal Makeup",
      "Hair Styling",
    ],
    about:
      "Specializing in destination palace weddings at Udaipur. Known for long-lasting sweat-proof formulas that withstand royal ceremonies.",
    travelsToVenue: true,
  },
];

const CITIES = [
  "All Cities",
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Udaipur",
  "Lucknow",
  "Noida",
  "Moradabad",
];

const SERVICES_LIST = [
  "All Services",
  "HD Makeup",
  "Airbrush Makeup",
  "Traditional Bridal Makeup",
  "Natural Makeup",
  "Party Makeup",
  "Hair Styling",
  "Draping",
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹10,000", value: "under-10k" },
  { label: "₹10,000–₹20,000", value: "10k-20k" },
  { label: "₹20,000–₹35,000", value: "20k-35k" },
  { label: "Above ₹35,000", value: "above-35k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A–Z", value: "name-asc" },
  { label: "Rating: High to Low", value: "rating-desc" },
];

const FAQS = [
  {
    q: "What is the difference between HD Makeup and Airbrush Makeup?",
    a: "HD (High Definition) makeup uses specialized micro-fine pigments that reflect light naturally to look seamless under high-resolution cameras without looking cakey. Airbrush makeup uses a mini compressor gun to spray a fine mist of silicone/water-based foundation onto the skin, creating an ultra-light, waterproof, 16+ hour long-wearing finish that is ideal for humid weather and tear-resistant bridal ceremonies.",
  },
  {
    q: "How far in advance should I book my bridal makeup artist?",
    a: "For peak Indian wedding season (October to March), it is strongly recommended to book your bridal artist 3 to 6 months in advance. Popular celebrity and destination artists often get booked up to a year ahead on auspicious wedding dates (muhurats).",
  },
  {
    q: "Do bridal makeup artists travel to the venue or destination?",
    a: "Yes, most luxury and professional bridal makeup artists on ShubhVivah travel to your wedding venue, hotel, or destination palace. Travel and stay expenses are typically arranged or reimbursed by the client for outstation weddings.",
  },
  {
    q: "What is typically included in a bridal makeup package?",
    a: "A standard bridal package generally covers bridal makeup (HD or Airbrush), professional hair styling, jewelry setting, dupatta draping, false eyelashes, and nail paint application. Pre-bridal skincare (facials, polishing) and trials are often booked as add-ons.",
  },
];

export default function BridalMakeupPage() {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals
  const [enquiryModalVendor, setEnquiryModalVendor] = useState(null);
  const [detailsModalVendor, setDetailsModalVendor] = useState(null);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    service: "HD Makeup",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion Toggle
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Shortlist handler
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

  // Active filters count
  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (selectedService !== "All Services" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0);

  // Filter & Sort Logic
  const filteredArtists = useMemo(() => {
    let result = MAKEUP_ARTISTS_DATA.filter((artist) => {
      // Search by artist name or about
      if (
        searchTerm.trim() &&
        !artist.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
        !artist.about.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ) {
        return false;
      }

      // City filter
      if (selectedCity !== "All Cities" && artist.city !== selectedCity) {
        return false;
      }

      // Service filter
      if (
        selectedService !== "All Services" &&
        !artist.services.includes(selectedService)
      ) {
        return false;
      }

      // Budget filter
      if (
        selectedBudget === "under-10k" &&
        artist.pricePerFunction >= 10000
      ) {
        return false;
      }
      if (
        selectedBudget === "10k-20k" &&
        (artist.pricePerFunction < 10000 || artist.pricePerFunction > 20000)
      ) {
        return false;
      }
      if (
        selectedBudget === "20k-35k" &&
        (artist.pricePerFunction < 20000 || artist.pricePerFunction > 35000)
      ) {
        return false;
      }
      if (
        selectedBudget === "above-35k" &&
        artist.pricePerFunction <= 35000
      ) {
        return false;
      }

      return true;
    });

    // Sort logic
    result.sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.pricePerFunction - b.pricePerFunction;
      }
      if (sortBy === "price-desc") {
        return b.pricePerFunction - a.pricePerFunction;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
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
    if (!formData.location.trim()) errors.location = "Please enter event city/location.";

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
      date: "",
      location: "",
      service: "HD Makeup",
      message: "",
    });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. HERO SECTION WITH SEARCH & BREADCRUMBS
         ========================================================================= */}
      <section className="relative isolate overflow-hidden border-b border-[#665038] bg-[#241321] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Background Ambient Indian Bridal Makeup Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85')",
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
            <span className="font-semibold text-[#D6B875]">
              Bridal Makeup Artist
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Flawless Bridal Artistry
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Find Your Perfect Bridal Makeup Artist
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Discover verified bridal makeup artists, celebrity stylists, and salon masters
              for your wedding functions, sangeet, reception, and traditional rituals.
            </p>
          </div>

          {/* Quick Search & Location Bar inside Hero */}
          <div className="mt-8 max-w-3xl rounded-2xl border border-[#665038] bg-[#3A2638]/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              {/* Search artist name */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search artist or studio..."
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
                Find Makeup Artists
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TWO-COLUMN LAYOUT: FILTERS SIDEBAR + VENDOR RESULTS
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

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            {/* -------------------------------------------------------------
                A. LEFT SIDEBAR: WORKING FILTERS PANEL
               ------------------------------------------------------------- */}
            <aside
              className={`${
                mobileFilterOpen ? "block" : "hidden"
              } lg:block`}
            >
              <div className="sticky top-24 space-y-6 rounded-2xl border border-[#665038] bg-[#321B30] p-5 shadow-xl">
                {/* Header of Sidebar */}
                <div className="flex items-center justify-between border-b border-[#665038]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#B08D45]" />
                    <h3 className="font-serif text-lg font-bold text-[#F8F1E5]">
                      Refine Search
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

                {/* Filter 1: Location / City */}
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
                            name="city-radio"
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

                {/* Filter 2: Makeup Services */}
                <div className="border-t border-[#665038]/40 pt-4">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#E8D9B5]">
                    Makeup Services
                  </label>
                  <div className="space-y-1.5">
                    {SERVICES_LIST.map((service) => (
                      <label
                        key={service}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="service-radio"
                            checked={selectedService === service}
                            onChange={() => setSelectedService(service)}
                            className="accent-[#B08D45]"
                          />
                          {service}
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
                    {BUDGET_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="budget-radio"
                            checked={selectedBudget === opt.value}
                            onChange={() => setSelectedBudget(opt.value)}
                            className="accent-[#B08D45]"
                          />
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button at bottom */}
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
                B. RIGHT MAIN AREA: RESULTS HEADER + MAKEUP ARTIST CARDS
               ------------------------------------------------------------- */}
            <div>
              {/* Results Bar */}
              <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-[#665038]/40 bg-[#321B30] p-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                    Bridal Makeup Artists
                  </h2>
                  <p className="text-xs text-[#C9BBAF]">
                    Showing {filteredArtists.length}{" "}
                    {filteredArtists.length === 1 ? "artist" : "artists"} in{" "}
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

                  {/* Sorting dropdown */}
                  <div className="flex items-center gap-2 text-xs">
                    <label
                      htmlFor="sort-artists"
                      className="text-[#C9BBAF]"
                    >
                      Sort:
                    </label>
                    <select
                      id="sort-artists"
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
              {filteredArtists.length === 0 ? (
                <div className="rounded-3xl border border-[#665038] bg-[#321B30] px-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#B08D45]">
                    <Brush size={28} />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                    No Makeup Artists Found
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#C9BBAF]">
                    We couldn&apos;t find any bridal makeup artists matching your selected city,
                    services, or budget range.
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
                  {filteredArtists.map((artist) => {
                    const isShortlisted = shortlistedIds.includes(artist.id);

                    return (
                      <article
                        key={artist.id}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-black/60"
                      >
                        <div>
                          {/* Image Thumbnail with Overlay & Badges */}
                          <div className="relative h-56 w-full overflow-hidden">
                            <img
                              src={artist.image}
                              alt={`Bridal makeup by ${artist.name}`}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />

                            {/* Top Badge */}
                            <div className="absolute left-3 top-3">
                              <span className="rounded-full border border-[#B08D45]/40 bg-[#241321]/85 px-3 py-1 text-[10px] font-semibold text-[#E8D9B5] backdrop-blur-xs">
                                {artist.badge}
                              </span>
                            </div>

                            {/* Heart Shortlist Toggle */}
                            <button
                              type="button"
                              onClick={() => toggleShortlist(artist.id)}
                              aria-label={
                                isShortlisted
                                  ? `Remove ${artist.name} from shortlist`
                                  : `Shortlist ${artist.name}`
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
                              {artist.experience}
                            </div>
                          </div>

                          {/* Card Information */}
                          <div className="p-5">
                            {/* Location & Rating */}
                            <div className="flex items-center justify-between text-xs text-[#C9BBAF]">
                              <span className="flex items-center gap-1">
                                <MapPin size={13} className="text-[#B08D45]" />
                                {artist.location}
                              </span>

                              <span className="flex items-center gap-1 rounded bg-[#321B30] px-2 py-0.5 font-bold text-[#F8F1E5]">
                                <Star
                                  size={12}
                                  className="fill-[#B08D45] text-[#B08D45]"
                                />
                                {artist.rating}{" "}
                                <span className="font-normal text-[#C9BBAF]">
                                  ({artist.reviews})
                                </span>
                              </span>
                            </div>

                            {/* Artist Name */}
                            <h3 className="mt-2.5 font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                              {artist.name}
                            </h3>

                            {/* Short Description */}
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                              {artist.about}
                            </p>

                            {/* Service Badges */}
                            <div className="mt-3.5 flex flex-wrap gap-1">
                              {artist.services.slice(0, 3).map((serv) => (
                                <span
                                  key={serv}
                                  className="rounded-md border border-[#665038]/40 bg-[#321B30] px-2 py-0.5 text-[10px] text-[#E8D9B5]"
                                >
                                  {serv}
                                </span>
                              ))}
                              {artist.services.length > 3 && (
                                <span className="rounded-md bg-[#321B30] px-1.5 py-0.5 text-[10px] text-[#C9BBAF]">
                                  +{artist.services.length - 3}
                                </span>
                              )}
                            </div>

                            {/* Pricing */}
                            <div className="mt-5 flex items-baseline justify-between border-t border-[#665038]/40 pt-3">
                              <span className="text-xs text-[#C9BBAF]">
                                Bridal Package:
                              </span>
                              <span className="font-serif text-lg font-bold text-[#D6B875]">
                                {artist.priceDisplay}{" "}
                                <span className="text-xs font-normal text-[#C9BBAF]">
                                  / function
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                          <button
                            type="button"
                            onClick={() => setDetailsModalVendor(artist)}
                            className="flex items-center justify-center gap-1 rounded-xl border border-[#B08D45] bg-[#321B30] py-2.5 text-xs font-medium text-[#F8F1E5] transition-all hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <ExternalLink size={13} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => setEnquiryModalVendor(artist)}
                            className="flex items-center justify-center gap-1 rounded-xl bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                          >
                            Check Availability
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
          3. FAQ SECTION (Bridal Makeup Questions)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#321B30] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Planning Advice
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5]">
              Frequently Asked Questions About Bridal Makeup
            </h2>
            <p className="mt-2 text-xs text-[#C9BBAF] sm:text-sm">
              Everything you need to know before booking your bridal makeup artist on ShubhVivah.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#665038]/60 bg-[#241321] transition-colors"
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
          4. CTA BANNER: ARE YOU A BRIDAL MAKEUP ARTIST?
         ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] px-6 py-14 text-center shadow-2xl sm:px-12">
          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
            Artist Partnership
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
            Are You a Bridal Makeup Artist? Join ShubhVivah
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
            Showcase your bridal portfolio to thousands of brides-to-be looking for
            verified makeup artists for their wedding functions. Direct leads, zero platform commission.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vendors/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-7 py-3 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:bg-[#D6B875]"
            >
              <span>List Your Makeup Studio</span>
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
          ENQUIRY / AVAILABILITY MODAL
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
                  Availability Enquiry Prepared
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
                    <span className="font-semibold text-[#E8D9B5]">Phone:</span> {formData.phone}
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
                  Check Date &amp; Package Availability
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  {enquiryModalVendor.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  {enquiryModalVendor.location} • Starting from{" "}
                  <span className="font-semibold text-[#D6B875]">
                    {enquiryModalVendor.priceDisplay}/function
                  </span>
                </p>

                <form onSubmit={handleEnquirySubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label
                      htmlFor="makeup-enquiry-name"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="makeup-enquiry-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Meera Kapoor"
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
                        htmlFor="makeup-enquiry-phone"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="makeup-enquiry-phone"
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
                        htmlFor="makeup-enquiry-service"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Required Service
                      </label>
                      <select
                        id="makeup-enquiry-service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="mt-1 w-full cursor-pointer rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      >
                        <option value="HD Makeup">HD Bridal Makeup</option>
                        <option value="Airbrush Makeup">Airbrush Bridal Makeup</option>
                        <option value="Traditional Bridal Makeup">Traditional Bridal Look</option>
                        <option value="Party Makeup">Sangeet / Party Makeup</option>
                        <option value="Hair Styling & Draping">Hair Styling & Draping</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="makeup-enquiry-date"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Wedding / Function Date *
                      </label>
                      <input
                        id="makeup-enquiry-date"
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
                        htmlFor="makeup-enquiry-location"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Event Location / City *
                      </label>
                      <input
                        id="makeup-enquiry-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. Delhi NCR"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                      {formErrors.location && (
                        <p className="mt-1 text-[11px] text-rose-400">
                          {formErrors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="makeup-enquiry-message"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Additional Notes or Questions
                    </label>
                    <textarea
                      id="makeup-enquiry-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Specify function time (morning/evening pheras), number of family makeups, etc..."
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                    >
                      Submit Availability Enquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILS & PORTFOLIO MODAL
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
                Makeup Studio Profile
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
                      alt={`${detailsModalVendor.name} bridal look ${i + 1}`}
                      className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* About description */}
              <div className="mt-5 rounded-xl border border-[#665038]/50 bg-[#241321] p-4 text-xs leading-relaxed text-[#C9BBAF]">
                <h4 className="mb-1 font-serif text-sm font-bold text-[#F8F1E5]">
                  About the Artist
                </h4>
                {detailsModalVendor.about}
              </div>

              {/* Service Badges */}
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-semibold text-[#E8D9B5]">
                  Specializations:
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
                  <span className="text-xs text-[#C9BBAF]">Bridal Package:</span>
                  <p className="font-serif text-lg font-bold text-[#D6B875]">
                    {detailsModalVendor.priceDisplay} / function
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
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
