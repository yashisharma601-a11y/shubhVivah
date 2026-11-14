"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Camera,
  Star,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  X,
  CheckCircle2,
  Film,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// =========================================================================
// DEMO VENDOR DATA — Readily replaceable with MySQL / Backend API response
// =========================================================================
const PHOTOGRAPHERS_DATA = [
  {
    id: "stories-joseph-radhika",
    name: "Stories by Joseph & Radhika",
    slug: "stories-joseph-radhika",
    location: "Mumbai",
    city: "Mumbai",
    pricePerDay: 120000,
    priceDisplay: "₹1,20,000",
    experience: "10+ Years Exp",
    rating: 4.9,
    reviewCount: 148,
    badge: "Celebrity Favorite",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Candid Photography",
      "Cinematic Wedding Films",
      "Pre-Wedding Shoots",
      "Drone Photography",
    ],
    about:
      "Pioneers of candid wedding photojournalism in India. Known for capturing raw, intimate emotions with a timeless cinematic palette.",
  },
  {
    id: "golden-frame-studios",
    name: "Golden Frame Studios",
    slug: "golden-frame-studios",
    location: "Delhi",
    city: "Delhi",
    pricePerDay: 75000,
    priceDisplay: "₹75,000",
    experience: "7+ Years Exp",
    rating: 4.8,
    reviewCount: 92,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Photography",
      "Candid Photography",
      "Wedding Albums",
      "Photography and Videography",
    ],
    about:
      "Delhi-based boutique wedding visualizers specializing in vibrant sangeet coverage, traditional rituals, and luxurious velvet finish photo albums.",
  },
  {
    id: "royal-shutter-udaipur",
    name: "The Royal Shutter",
    slug: "royal-shutter-udaipur",
    location: "Udaipur",
    city: "Udaipur",
    pricePerDay: 95000,
    priceDisplay: "₹95,000",
    experience: "8+ Years Exp",
    rating: 4.9,
    reviewCount: 110,
    badge: "Palace Specialist",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Candid Photography",
      "Cinematic Wedding Films",
      "Drone Photography",
      "Pre-Wedding Shoots",
    ],
    about:
      "Specialized in destination weddings at Rajasthan forts and palaces. Capturing royal grandeur with ambient lighting and majestic drone perspectives.",
  },
  {
    id: "lumiere-wedding-films",
    name: "Lumière Wedding Films",
    slug: "lumiere-wedding-films",
    location: "Jaipur",
    city: "Jaipur",
    pricePerDay: 48000,
    priceDisplay: "₹48,000",
    experience: "5+ Years Exp",
    rating: 4.7,
    reviewCount: 64,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Cinematic Wedding Films",
      "Candid Photography",
      "Pre-Wedding Shoots",
    ],
    about:
      "Modern cinematic storytellers crafting teaser trailers, feature-length documentary films, and artistic bridal portraits in Pink City Jaipur.",
  },
  {
    id: "avadh-visual-arts",
    name: "Avadh Visual Arts",
    slug: "avadh-visual-arts",
    location: "Lucknow",
    city: "Lucknow",
    pricePerDay: 35000,
    priceDisplay: "₹35,000",
    experience: "6+ Years Exp",
    rating: 4.8,
    reviewCount: 52,
    badge: "Popular in UP",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Photography",
      "Candid Photography",
      "Wedding Albums",
      "Photography and Videography",
    ],
    about:
      "Graceful Nawabi wedding coverage capturing the intricate nuances of nikah, varmala, and reception ceremonies with authentic warmth.",
  },
  {
    id: "moradabad-candid-studios",
    name: "Moradabad Candid Studios",
    slug: "moradabad-candid-studios",
    location: "Moradabad",
    city: "Moradabad",
    pricePerDay: 22000,
    priceDisplay: "₹22,000",
    experience: "4+ Years Exp",
    rating: 4.7,
    reviewCount: 38,
    badge: "Budget Friendly",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Photography",
      "Pre-Wedding Shoots",
      "Wedding Albums",
    ],
    about:
      "Reliable regional wedding photography crew offering complete photo and video packages for traditional family celebrations in Moradabad and Bareilly.",
  },
  {
    id: "himalayan-wedding-tales",
    name: "Himalayan Wedding Tales",
    slug: "himalayan-wedding-tales",
    location: "Dehradun",
    city: "Dehradun",
    pricePerDay: 42000,
    priceDisplay: "₹42,000",
    experience: "5+ Years Exp",
    rating: 4.9,
    reviewCount: 45,
    badge: "Scenic Shoots",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Candid Photography",
      "Pre-Wedding Shoots",
      "Drone Photography",
      "Cinematic Wedding Films",
    ],
    about:
      "Specialized in picturesque mountain backdrops across Dehradun, Mussoorie, and Rishikesh. Perfect for ethereal outdoor and destination weddings.",
  },
  {
    id: "eternal-moments-delhi",
    name: "Eternal Moments Photography",
    slug: "eternal-moments-delhi",
    location: "Delhi",
    city: "Delhi",
    pricePerDay: 60000,
    priceDisplay: "₹60,000",
    experience: "9+ Years Exp",
    rating: 4.8,
    reviewCount: 84,
    badge: "Verified Artist",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Candid Photography",
      "Wedding Albums",
      "Photography and Videography",
      "Pre-Wedding Shoots",
    ],
    about:
      "Delhi NCR wedding photographers offering bespoke heirloom flush-mount albums, fine art couple sessions, and complete coverage of multi-day festivities.",
  },
];

const CITIES = [
  "All Cities",
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Udaipur",
  "Lucknow",
  "Moradabad",
  "Dehradun",
];

const SERVICES_OPTIONS = [
  "All Services",
  "Candid Photography",
  "Traditional Photography",
  "Cinematic Wedding Films",
  "Pre-Wedding Shoots",
  "Drone Photography",
  "Wedding Albums",
  "Photography and Videography",
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹25,000", value: "under-25k" },
  { label: "₹25,000–₹50,000", value: "25k-50k" },
  { label: "₹50,000–₹1,00,000", value: "50k-100k" },
  { label: "Above ₹1,00,000", value: "above-100k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Name: A–Z", value: "name-asc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
];

export default function WeddingPhotographyPage() {
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Shortlist State
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modal States
  const [enquiryModalVendor, setEnquiryModalVendor] = useState(null);
  const [portfolioModalVendor, setPortfolioModalVendor] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Shortlist toggle handler
  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedService("All Services");
    setSelectedBudget("all");
    setSortBy("recommended");
  };

  // Filter & Sort Logic
  const filteredPhotographers = useMemo(() => {
    let result = PHOTOGRAPHERS_DATA.filter((vendor) => {
      // Search term
      if (
        searchTerm.trim() &&
        !vendor.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) &&
        !vendor.about.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ) {
        return false;
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
      if (selectedBudget === "under-25k" && vendor.pricePerDay >= 25000) {
        return false;
      }
      if (
        selectedBudget === "25k-50k" &&
        (vendor.pricePerDay < 25000 || vendor.pricePerDay > 50000)
      ) {
        return false;
      }
      if (
        selectedBudget === "50k-100k" &&
        (vendor.pricePerDay < 50000 || vendor.pricePerDay > 100000)
      ) {
        return false;
      }
      if (selectedBudget === "above-100k" && vendor.pricePerDay <= 100000) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price-asc") {
        return a.pricePerDay - b.pricePerDay;
      }
      if (sortBy === "price-desc") {
        return b.pricePerDay - a.pricePerDay;
      }
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
      }
      return 0; // recommended
    });

    return result;
  }, [searchTerm, selectedCity, selectedService, selectedBudget, sortBy]);

  // Handle Enquiry Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errors.email = "Please enter a valid email address.";
    if (!formData.phone.trim() || formData.phone.length < 10)
      errors.phone = "Please enter a 10-digit mobile number.";
    if (!formData.date) errors.date = "Please select your wedding date.";

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
      email: "",
      phone: "",
      date: "",
      location: "",
      message: "",
    });
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* 1. Page Header & Breadcrumb */}
      <section className="relative border-b border-[#665038] bg-gradient-to-b from-[#241321] via-[#321B30] to-[#241321] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs text-[#C9BBAF]"
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
              Wedding Photography
            </span>
          </nav>

          {/* Heading with Serif Typography */}
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Verified Visual Artists
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Wedding Photographers
            </h1>

            {/* Antique-Gold Decorative Separator */}
            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Discover talented wedding photographers who capture every emotion,
              every detail, and every unforgettable moment of your special day.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Section */}
      <section className="border-b border-[#665038]/60 bg-[#321B30]/90 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4 shadow-xl sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search by Name */}
              <div className="relative">
                <label
                  htmlFor="search-photographer"
                  className="mb-1 block text-xs font-semibold text-[#E8D9B5]"
                >
                  Search by Name
                </label>
                <div className="relative">
                  <input
                    id="search-photographer"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search photographers or studios..."
                    className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-3 text-sm text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#B08D45]"
                  />
                  <Search
                    size={17}
                    className="absolute left-3 top-3 text-[#B08D45]"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div>
                <label
                  htmlFor="filter-city"
                  className="mb-1 block text-xs font-semibold text-[#E8D9B5]"
                >
                  City / Location
                </label>
                <div className="relative">
                  <select
                    id="filter-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-sm text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45]"
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
                </div>
              </div>

              {/* Service Type Filter */}
              <div>
                <label
                  htmlFor="filter-service"
                  className="mb-1 block text-xs font-semibold text-[#E8D9B5]"
                >
                  Photography Service
                </label>
                <div className="relative">
                  <select
                    id="filter-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-sm text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45]"
                  >
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-[#241321]">
                        {s}
                      </option>
                    ))}
                  </select>
                  <Camera
                    size={16}
                    className="absolute left-3 top-3 text-[#B08D45]"
                  />
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label
                  htmlFor="filter-budget"
                  className="mb-1 block text-xs font-semibold text-[#E8D9B5]"
                >
                  Budget per Day
                </label>
                <div className="relative">
                  <select
                    id="filter-budget"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-sm text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45]"
                  >
                    {BUDGET_OPTIONS.map((b) => (
                      <option
                        key={b.value}
                        value={b.value}
                        className="bg-[#241321]"
                      >
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <Sparkles
                    size={16}
                    className="absolute left-3 top-3 text-[#B08D45]"
                  />
                </div>
              </div>
            </div>

            {/* Filter Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#665038]/50 pt-4">
              <div className="flex items-center gap-2 text-xs text-[#C9BBAF]">
                <SlidersHorizontal size={14} className="text-[#B08D45]" />
                <span>
                  Showing {filteredPhotographers.length} of{" "}
                  {PHOTOGRAPHERS_DATA.length} Photographers
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button suppressHydrationWarning
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 rounded-full border border-[#665038] px-4 py-2 text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#241321] hover:text-[#D6B875]"
                >
                  <RotateCcw size={13} />
                  Reset Filters
                </button>

                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {}}
                  className="rounded-full bg-[#B08D45] px-5 py-2 text-xs font-semibold text-[#241321] transition-colors hover:bg-[#D6B875]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Results Header & Sorting Bar */}
      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-b border-[#665038]/40 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F8F1E5]">
              Find Your Perfect Wedding Photographer
            </h2>
            <p className="text-xs text-[#C9BBAF]">
              {filteredPhotographers.length}{" "}
              {filteredPhotographers.length === 1
                ? "photographer matches"
                : "photographers match"}{" "}
              your criteria
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Shortlisted count pill */}
            {shortlistedIds.length > 0 && (
              <span className="flex items-center gap-1 rounded-full border border-[#B08D45] bg-[#321B30] px-3 py-1.5 text-xs font-medium text-[#D6B875]">
                <Heart size={13} className="fill-[#B08D45] text-[#B08D45]" />
                {shortlistedIds.length} Shortlisted
              </span>
            )}

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-by"
                className="text-xs font-medium text-[#C9BBAF]"
              >
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-lg border border-[#665038] bg-[#321B30] px-3 py-1.5 text-xs font-medium text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Photographer Listing Cards Grid / Empty State */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {filteredPhotographers.length === 0 ? (
            /* Empty State */
            <div className="my-12 rounded-3xl border border-[#665038] bg-[#321B30] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#B08D45]">
                <Camera size={30} />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                No Photographers Found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#C9BBAF]">
                We couldn&apos;t find any photographers matching your current
                filter combination. Try adjusting the city, services, or budget
                range.
              </p>
              <button suppressHydrationWarning
                type="button"
                onClick={handleResetFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
              >
                <RotateCcw size={14} />
                Clear All Filters
              </button>
            </div>
          ) : (
            /* 3-Column Photographer Cards */
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhotographers.map((vendor) => {
                const isShortlisted = shortlistedIds.includes(vendor.id);

                return (
                  <article
                    key={vendor.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-black/60"
                  >
                    <div>
                      {/* Card Image Cover with Badges */}
                      <div className="relative h-60 w-full overflow-hidden">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />

                        {/* Top Badge */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full border border-[#B08D45]/40 bg-[#241321]/85 px-3 py-1 text-[11px] font-semibold text-[#E8D9B5] backdrop-blur-xs">
                            {vendor.badge}
                          </span>
                        </div>

                        {/* Shortlist Heart Button */}
                        <button suppressHydrationWarning
                          type="button"
                          onClick={() => toggleShortlist(vendor.id)}
                          aria-label={
                            isShortlisted
                              ? "Remove from shortlist"
                              : "Add to shortlist"
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

                        {/* Experience Tag bottom right of image */}
                        <div className="absolute bottom-3 right-3 rounded-md bg-[#241321]/90 px-2.5 py-0.5 text-[11px] font-medium text-[#C9BBAF]">
                          {vendor.experience}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        {/* Location & Rating */}
                        <div className="flex items-center justify-between text-xs text-[#C9BBAF]">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#B08D45]" />
                            {vendor.location}
                          </span>

                          <span className="flex items-center gap-1 rounded bg-[#321B30] px-2 py-0.5 font-bold text-[#F8F1E5]">
                            <Star
                              size={12}
                              className="fill-[#B08D45] text-[#B08D45]"
                            />
                            {vendor.rating}{" "}
                            <span className="text-[#C9BBAF] font-normal">
                              ({vendor.reviewCount})
                            </span>
                          </span>
                        </div>

                        {/* Vendor Name */}
                        <h3 className="mt-2.5 font-serif text-xl font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                          {vendor.name}
                        </h3>

                        {/* Short About Description */}
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                          {vendor.about}
                        </p>

                        {/* Service Badges */}
                        <div className="mt-3.5 flex flex-wrap gap-1.5">
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
                              +{vendor.services.length - 3} more
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
                              / day
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                      <button suppressHydrationWarning
                        type="button"
                        onClick={() => setPortfolioModalVendor(vendor)}
                        className="flex items-center justify-center gap-1 rounded-xl border border-[#B08D45] bg-[#321B30] py-2.5 text-xs font-medium text-[#F8F1E5] transition-all hover:bg-[#241321] hover:text-[#D6B875]"
                      >
                        <ExternalLink size={13} />
                        View Portfolio
                      </button>

                      <button suppressHydrationWarning
                        type="button"
                        onClick={() => setEnquiryModalVendor(vendor)}
                        className="flex items-center justify-center gap-1 rounded-xl bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. Trust & Quality Banner */}
      <section className="mt-8 border-t border-[#665038] bg-[#321B30] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3.5 rounded-xl border border-[#665038]/50 bg-[#241321] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3A2638] text-[#B08D45]">
                <Award size={20} />
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-[#F8F1E5]">
                  Verified Portfolio Quality
                </h4>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Every photographer on ShubhVivah undergoes review of raw files
                  and client deliverables.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#665038]/50 bg-[#241321] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3A2638] text-[#B08D45]">
                <Sparkles size={20} />
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-[#F8F1E5]">
                  Zero Commission Markup
                </h4>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Connect directly with the studios without middleman charges or
                  hidden platform fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#665038]/50 bg-[#241321] p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3A2638] text-[#B08D45]">
                <Film size={20} />
              </span>
              <div>
                <h4 className="font-serif text-base font-bold text-[#F8F1E5]">
                  Comprehensive Deliverables
                </h4>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Teasers, 4K wedding films, drone angles, and handcrafted
                  traditional photo albums.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ENQUIRY MODAL
         ========================================================================= */}
      {enquiryModalVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            <button suppressHydrationWarning
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
                    <span className="font-semibold text-[#E8D9B5]">Wedding Date:</span> {formData.date}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#E8D9B5]">Location:</span> {formData.location || "Not specified"}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-[#E8D9B5]">Phone:</span> {formData.phone}
                  </p>
                </div>
                <button suppressHydrationWarning
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
                  Direct Studio Enquiry
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquire with {enquiryModalVendor.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  {enquiryModalVendor.location} • Starting from{" "}
                  <span className="font-semibold text-[#D6B875]">
                    {enquiryModalVendor.priceDisplay}/day
                  </span>
                </p>

                <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Ananya Sharma"
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
                        htmlFor="enquiry-email"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Email Address *
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="ananya@example.com"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-400">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="enquiry-phone"
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
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="enquiry-date"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Wedding / Event Date *
                      </label>
                      <input
                        id="enquiry-date"
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
                        htmlFor="enquiry-location"
                        className="block text-xs font-medium text-[#E8D9B5]"
                      >
                        Event Location / City
                      </label>
                      <input
                        id="enquiry-location"
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g. Udaipur"
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-medium text-[#E8D9B5]"
                    >
                      Message / Special Requirements
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share ceremony details, functions, or questions..."
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div className="pt-2">
                    <button suppressHydrationWarning
                      type="submit"
                      className="w-full rounded-full bg-[#B08D45] py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                    >
                      Send Direct Enquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          PORTFOLIO QUICK-VIEW MODAL
         ========================================================================= */}
      {portfolioModalVendor && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            <button suppressHydrationWarning
              type="button"
              onClick={() => setPortfolioModalVendor(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638]"
              aria-label="Close portfolio"
            >
              <X size={18} />
            </button>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                Studio Portfolio Preview
              </span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                {portfolioModalVendor.name}
              </h3>
              <p className="text-xs text-[#C9BBAF]">
                {portfolioModalVendor.location} • {portfolioModalVendor.experience}
              </p>

              {/* Gallery Grid */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {portfolioModalVendor.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-[#665038]/50"
                  >
                    <img
                      src={imgUrl}
                      alt={`${portfolioModalVendor.name} work sample ${i + 1}`}
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
                {portfolioModalVendor.about}
              </div>

              {/* Services offered */}
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-semibold text-[#E8D9B5]">
                  Services Offered:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioModalVendor.services.map((s) => (
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
                    {portfolioModalVendor.priceDisplay} / day
                  </p>
                </div>

                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    const v = portfolioModalVendor;
                    setPortfolioModalVendor(null);
                    setEnquiryModalVendor(v);
                  }}
                  className="rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
                >
                  Enquire with {portfolioModalVendor.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
