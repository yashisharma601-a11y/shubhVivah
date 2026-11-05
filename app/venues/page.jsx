"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  Heart,
  Users,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Landmark,
  Check,
  Search,
  SlidersHorizontal,
  X,
  Phone,
  Mail,
  Share2,
  ArrowRight,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";
import { ALL_VENUES, VENUE_CATEGORIES, VENUE_CITIES } from "@/data/venuesData";

export default function AllVenuesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Venues");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const [enquiryModalVenue, setEnquiryModalVenue] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Quick Enquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "500-1000",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCity("All Cities");
    setSelectedCategory("All Venues");
    setSortBy("recommended");
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (selectedCategory !== "All Venues" ? 1 : 0);

  // Filter & Sort Logic for the 7 Banquet Halls
  const filteredVenues = useMemo(() => {
    let result = ALL_VENUES.filter((venue) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesCity = venue.city.toLowerCase().includes(query);
        const matchesType = venue.venueType.toLowerCase().includes(query);
        const matchesTag = venue.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesCity && !matchesType && !matchesTag) {
          return false;
        }
      }

      // City Filter
      if (selectedCity !== "All Cities" && venue.city !== selectedCity) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== "All Venues") {
        if (
          selectedCategory === "Banquet Halls" &&
          !venue.venueType.toLowerCase().includes("banquet")
        ) {
          return false;
        }
        if (
          selectedCategory === "Marriage Gardens" &&
          !venue.venueType.toLowerCase().includes("garden") &&
          !venue.venueType.toLowerCase().includes("lawn")
        ) {
          return false;
        }
        if (
          selectedCategory === "Wedding Resorts" &&
          !venue.venueType.toLowerCase().includes("resort")
        ) {
          return false;
        }
        if (
          selectedCategory === "Heritage Palaces & Forts" &&
          !venue.venueType.toLowerCase().includes("palace") &&
          !venue.venueType.toLowerCase().includes("fort") &&
          !venue.venueType.toLowerCase().includes("heritage")
        ) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.startingPriceNumeric - b.startingPriceNumeric;
      }
      if (sortBy === "price-desc") {
        return b.startingPriceNumeric - a.startingPriceNumeric;
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
  }, [searchQuery, selectedCity, selectedCategory, sortBy]);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalVenue(null);
    setFormSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      date: "",
      guests: "500-1000",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. BREADCRUMBS & SECTION HEADER (Follows reference website's layout)
         ========================================================================= */}
      <section className="border-b border-[#665038]/40 bg-gradient-to-b from-[#321B30] to-[#241321] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs matching reference website structure */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#D6B875]"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="text-[#C9BBAF]">Venues / Marriage Hall</span>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">
              All Wedding Venues
            </span>
          </nav>

          {/* Page Heading & Tagline */}
          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
                <Sparkles size={12} className="text-[#B08D45]" />
                Curated Banquet Halls & Marriage Venues
              </div>
              <h1 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
                Venues / Marriage Halls & Banquet Halls
              </h1>
              <p className="mt-2 max-w-2xl text-xs text-[#C9BBAF] sm:text-sm">
                Explore hand-picked luxury banquet halls, wedding stages, palace resorts, and
                open-air marriage gardens designed for royal weddings and celebrations.
              </p>
            </div>

            {/* Quick Share / Count */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1.5 text-xs font-medium text-[#C9BBAF] transition-colors hover:border-[#B08D45] hover:text-[#D6B875]"
              >
                <Share2 size={13} />
                <span>{copiedLink ? "Link Copied!" : "Share Listing"}</span>
              </button>

              <span className="rounded-full border border-[#B08D45] bg-[#321B30] px-3.5 py-1.5 text-xs font-semibold text-[#D6B875]">
                {filteredVenues.length} Banquet Halls Available
              </span>
            </div>
          </div>

          {/* Category Filter Pills (Inspired by reference website layout) */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#665038]/30 pt-4">
            {VENUE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#B08D45] text-[#241321] font-semibold shadow-md shadow-[#B08D45]/20"
                      : "border border-[#665038]/60 bg-[#321B30] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FILTER & SEARCH BAR (City, Search, Sorting)
         ========================================================================= */}
      <section className="border-b border-[#665038]/30 bg-[#241321] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-[#665038] bg-[#321B30]/80 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
            {/* Search by venue name or keyword */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-3 text-[#B08D45]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search banquet hall name, palace, or city..."
                className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 pl-10 pr-3 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
              />
            </div>

            {/* City Selector */}
            <div className="relative sm:w-56">
              <MapPin
                size={15}
                className="pointer-events-none absolute left-3.5 top-3 text-[#B08D45]"
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2 pl-9 pr-8 text-xs font-medium text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
              >
                {VENUE_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#241321]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2 pl-3 pr-8 text-xs font-medium text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#665038] bg-[#241321] px-4 py-2 text-xs font-semibold text-[#D6B875] transition-colors hover:border-[#B08D45]"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BANQUET HALLS GRID (6-7 Responsive Cards, Reference UI Structure)
         ========================================================================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Subtitle Bar */}
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B08D45]" />
              <h2 className="font-serif text-xl font-bold tracking-wide text-[#F8F1E5] sm:text-2xl">
                Featured Wedding Banquet Halls
              </h2>
            </div>
            <p className="text-xs text-[#C9BBAF]">
              Showing <span className="font-semibold text-[#D6B875]">{filteredVenues.length}</span> verified wedding venues
            </p>
          </div>

          {/* Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredVenues.map((venue) => {
                const isShortlisted = shortlistedIds.includes(venue.id);

                return (
                  <article
                    key={venue.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-black/70"
                  >
                    <div>
                      {/* -------------------------------------------------------------
                          Card Cover Image with Hover Zoom & Badges
                         ------------------------------------------------------------- */}
                      <div className="relative h-60 w-full overflow-hidden bg-[#241321]">
                        <Link
                          href={`/venues/${venue.slug}`}
                          className="block h-full w-full"
                          aria-label={`View details of ${venue.name}`}
                        >
                          <img
                            src={venue.coverImage}
                            alt={`${venue.name} — Luxury Wedding Venue`}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            loading="lazy"
                          />
                          {/* Ambient Dark Luxury Gradient Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />
                        </Link>

                        {/* Top Badges */}
                        <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5">
                          <span className="rounded-full border border-[#B08D45]/60 bg-[#241321]/90 px-3 py-0.5 text-[10px] font-semibold text-[#D6B875] backdrop-blur-md">
                            {venue.badge}
                          </span>
                        </div>

                        {/* Shortlist Heart Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleShortlist(venue.id);
                          }}
                          aria-label={
                            isShortlisted
                              ? `Remove ${venue.name} from shortlist`
                              : `Shortlist ${venue.name}`
                          }
                          className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321]/80 text-[#F8F1E5] backdrop-blur-md transition-colors hover:border-[#B08D45]"
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

                        {/* Venue Type Tag at bottom-left */}
                        <div className="absolute bottom-3 left-3.5">
                          <span className="rounded-md border border-[#665038]/50 bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-medium text-[#E8D9B5] backdrop-blur-sm">
                            {venue.primaryType}
                          </span>
                        </div>

                        {/* Photos count at bottom-right */}
                        <div className="absolute bottom-3 right-3.5">
                          <span className="rounded-md bg-[#241321]/90 px-2 py-0.5 text-[10px] font-medium text-[#C9BBAF] backdrop-blur-sm">
                            {venue.gallery.length} Photos
                          </span>
                        </div>
                      </div>

                      {/* -------------------------------------------------------------
                          Card Content & Venue Information
                          (Inspired by reference website layout: Name with verified tick,
                          rating, location, capacity, starting price)
                         ------------------------------------------------------------- */}
                      <div className="p-5">
                        {/* Venue Name & Blue/Gold Verified Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/venues/${venue.slug}`}
                            className="group/title block flex-1"
                          >
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-serif text-xl font-bold text-[#F8F1E5] transition-colors group-hover/title:text-[#D6B875]">
                                {venue.name}
                              </h3>
                              {/* Reference Blue Verified Tick */}
                              <span
                                title="Verified Partner"
                                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm"
                              >
                                <Check size={10} strokeWidth={3} />
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-1 text-xs text-[#C9BBAF]">
                              {venue.tagline}
                            </p>
                          </Link>

                          {/* Rating Pill */}
                          <div className="flex shrink-0 items-center gap-1 rounded-md bg-[#241321] px-2 py-1 text-xs">
                            <Star
                              size={12}
                              className="fill-[#B08D45] text-[#B08D45]"
                            />
                            <span className="font-bold text-[#F8F1E5]">
                              {venue.rating}
                            </span>
                            <span className="text-[10px] text-[#C9BBAF]">
                              ({venue.reviewsCount})
                            </span>
                          </div>
                        </div>

                        {/* Location with Map Pin */}
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#C9BBAF]">
                          <MapPin size={13} className="shrink-0 text-[#B08D45]" />
                          <span className="font-medium text-[#E8D9B5]">
                            {venue.location}
                          </span>
                        </div>

                        {/* Short Description */}
                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                          {venue.about}
                        </p>

                        {/* Guest Capacity & Banquet Area Badges */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[#665038]/30 pt-3 text-xs">
                          <div className="flex items-center gap-1.5 text-[#F8F1E5]">
                            <Users size={14} className="text-[#B08D45]" />
                            <span className="font-semibold">{venue.guestCapacity}</span>
                          </div>
                          <span className="text-[#665038]">•</span>
                          <span className="text-xs text-[#C9BBAF]">
                            {venue.totalArea}
                          </span>
                        </div>

                        {/* Starting Price Block (Matching reference website style) */}
                        <div className="mt-4 flex items-baseline justify-between border-t border-[#665038]/40 pt-3">
                          <div>
                            <span className="block text-[10px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                              Starting Price per Event
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-serif text-xl font-bold text-[#D6B875]">
                                {venue.startingPrice}
                              </span>
                              <span className="text-[11px] text-[#C9BBAF]">
                                / event onwards
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="block text-[10px] text-[#C9BBAF]">
                              Veg per plate:
                            </span>
                            <span className="text-xs font-semibold text-[#E8D9B5]">
                              {venue.pricePerPlateVeg}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------------------
                        Card Action Buttons: View Details & Enquire Now
                       ------------------------------------------------------------- */}
                    <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => setEnquiryModalVenue(venue)}
                        className="flex items-center justify-center rounded-xl border border-[#B08D45] bg-[#241321] py-2.5 text-xs font-semibold text-[#F8F1E5] transition-all hover:bg-[#3A2638] hover:text-[#D6B875]"
                      >
                        Enquire Now
                      </button>

                      {/* View Details Button */}
                      <Link
                        href={`/venues/${venue.slug}`}
                        className="group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-2.5 text-xs font-bold text-[#241321] shadow-md shadow-[#B08D45]/20 transition-all hover:brightness-110"
                      >
                        <span>View Details</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover/btn:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl border border-[#665038] bg-[#321B30] p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#241321] text-[#B08D45]">
                <Building2 size={28} />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                No Banquet Halls Found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs text-[#C9BBAF]">
                We couldn&apos;t find any venues matching your current city or search criteria.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          3.5 HERITAGE FORTS & ROYAL PALACES SHOWCASE SECTION
               Always-visible premium section for 7 Heritage Fort Venues
         ========================================================================= */}
      <section className="border-t border-[#B08D45]/20 bg-gradient-to-b from-[#2A1728] via-[#241321] to-[#1E1019] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header with premium fort styling */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/60 bg-[#321B30] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D6B875]">
              <Landmark size={13} className="text-[#B08D45]" />
              Heritage Forts &amp; Royal Palaces
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl">
              Marry Inside a Royal Fort
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#C9BBAF]">
              Step into the grandeur of Rajasthan&apos;s most iconic forts and palaces — UNESCO heritage sites, 15th-century hilltop fortresses,
              and 5-star luxury heritage resorts transformed into legendary destination wedding venues.
            </p>
            {/* Gold divider line */}
            <div className="mx-auto mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#B08D45]" />
              <Sparkles size={14} className="text-[#B08D45]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#B08D45]" />
            </div>
          </div>

          {/* Heritage Fort Cards Grid: 3 cols desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {ALL_VENUES.filter((v) =>
              v.venueType.toLowerCase().includes("fort") ||
              v.venueType.toLowerCase().includes("heritage") ||
              (v.venueType.toLowerCase().includes("palace") && v.category === "Heritage Palaces & Forts")
            ).map((venue) => {
              const isShortlisted = shortlistedIds.includes(venue.id);
              return (
                <article
                  key={venue.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#B08D45]/30 bg-gradient-to-b from-[#321B30] to-[#241321] shadow-xl shadow-black/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B875]/70 hover:shadow-2xl hover:shadow-[#B08D45]/20"
                >
                  {/* Ambient top glow line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B08D45]/60 to-transparent" />

                  <div>
                    {/* Cover Image */}
                    <div className="relative h-64 w-full overflow-hidden bg-[#241321]">
                      <Link
                        href={`/venues/${venue.slug}`}
                        className="block h-full w-full"
                        aria-label={`View ${venue.name} heritage fort wedding venue`}
                      >
                        <img
                          src={venue.coverImage}
                          alt={`${venue.name} — Heritage Fort Wedding Venue in ${venue.location}`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Multi-layer gradient overlays for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1019] via-[#241321]/40 to-transparent opacity-85" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B08D45]/5 via-transparent to-transparent" />
                      </Link>

                      {/* Top Badge */}
                      <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5">
                        <span className="rounded-full border border-[#D6B875]/70 bg-[#1E1019]/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D6B875] backdrop-blur-md">
                          {venue.badge}
                        </span>
                      </div>

                      {/* Shortlist Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleShortlist(venue.id);
                        }}
                        aria-label={isShortlisted ? `Remove ${venue.name} from shortlist` : `Shortlist ${venue.name}`}
                        className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-[#B08D45]/50 bg-[#1E1019]/80 text-[#F8F1E5] backdrop-blur-md transition-all hover:border-[#D6B875] hover:scale-110"
                      >
                        <Heart
                          size={16}
                          className={isShortlisted ? "fill-[#D6B875] text-[#D6B875]" : "text-[#F8F1E5]"}
                        />
                      </button>

                      {/* Fort type tag bottom-left */}
                      <div className="absolute bottom-3 left-3.5">
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#B08D45]/40 bg-[#1E1019]/90 px-2.5 py-0.5 text-[10px] font-semibold text-[#D6B875] backdrop-blur-sm">
                          <Landmark size={9} className="shrink-0" />
                          {venue.primaryType}
                        </span>
                      </div>

                      {/* Photos count bottom-right */}
                      <div className="absolute bottom-3 right-3.5">
                        <span className="rounded-md bg-[#1E1019]/90 px-2 py-0.5 text-[10px] font-medium text-[#C9BBAF] backdrop-blur-sm">
                          {venue.gallery.length} Photos
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      {/* Venue Name & Verified Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/venues/${venue.slug}`} className="group/title block flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-serif text-xl font-bold text-[#F8F1E5] transition-colors group-hover/title:text-[#D6B875]">
                              {venue.name}
                            </h3>
                            <span
                              title="Verified Heritage Partner"
                              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm"
                            >
                              <Check size={10} strokeWidth={3} />
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                            {venue.tagline}
                          </p>
                        </Link>

                        {/* Rating Pill */}
                        <div className="flex shrink-0 items-center gap-1 rounded-md bg-[#1E1019] px-2 py-1 text-xs">
                          <Star size={12} className="fill-[#D6B875] text-[#D6B875]" />
                          <span className="font-bold text-[#F8F1E5]">{venue.rating}</span>
                          <span className="text-[10px] text-[#C9BBAF]">({venue.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-[#C9BBAF]">
                        <MapPin size={13} className="shrink-0 text-[#B08D45]" />
                        <span className="font-medium text-[#E8D9B5]">{venue.location}</span>
                      </div>

                      {/* Capacity & Area */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[#B08D45]/20 pt-3 text-xs">
                        <div className="flex items-center gap-1.5 text-[#F8F1E5]">
                          <Users size={14} className="text-[#B08D45]" />
                          <span className="font-semibold">{venue.guestCapacity}</span>
                        </div>
                        <span className="text-[#665038]">•</span>
                        <span className="text-xs text-[#C9BBAF]">{venue.totalArea}</span>
                      </div>

                      {/* Starting Price */}
                      <div className="mt-4 flex items-baseline justify-between border-t border-[#B08D45]/20 pt-3">
                        <div>
                          <span className="block text-[10px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                            Starting Price per Event
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-xl font-bold text-[#D6B875]">
                              {venue.startingPrice}
                            </span>
                            <span className="text-[11px] text-[#C9BBAF]">/ event onwards</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-[#C9BBAF]">Veg per plate:</span>
                          <span className="text-xs font-semibold text-[#E8D9B5]">{venue.pricePerPlateVeg}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setEnquiryModalVenue(venue)}
                      className="flex items-center justify-center rounded-xl border border-[#B08D45]/60 bg-[#1E1019] py-2.5 text-xs font-semibold text-[#E8D9B5] transition-all hover:border-[#D6B875] hover:text-[#D6B875]"
                    >
                      Enquire Now
                    </button>
                    <Link
                      href={`/venues/${venue.slug}`}
                      className="group/btn flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9A7535] via-[#B08D45] to-[#D6B875] py-2.5 text-xs font-bold text-[#1E1019] shadow-md shadow-[#B08D45]/30 transition-all hover:brightness-110"
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA for Heritage category */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setSelectedCategory("Heritage Palaces & Forts")}
              className="inline-flex items-center gap-2 rounded-full border border-[#B08D45] bg-[#321B30] px-6 py-2.5 text-xs font-semibold text-[#D6B875] transition-all hover:bg-[#B08D45] hover:text-[#1E1019]"
            >
              <Landmark size={14} />
              Browse All Heritage Forts & Palaces
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY BOOK BANQUET HALLS ON SHUBHVIVAH (Value Proposition)
         ========================================================================= */}
      <section className="border-t border-[#665038]/50 bg-[#321B30] px-4 py-14 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              ShubhVivah Assurance
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
              Why Book Your Wedding Banquet Hall With Us?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-[#C9BBAF]">
              Direct management pricing, verified seating capacity, and dedicated wedding concierge coordination.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#665038]/50 bg-[#241321] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#321B30] text-[#B08D45]">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-3 font-serif text-base font-bold text-[#F8F1E5]">
                100% Verified Venues
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#C9BBAF]">
                Every banquet hall and lawn is physically inspected for fire clearance, air conditioning, and acoustics.
              </p>
            </div>

            <div className="rounded-2xl border border-[#665038]/50 bg-[#241321] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#321B30] text-[#B08D45]">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="mt-3 font-serif text-base font-bold text-[#F8F1E5]">
                Direct Pricing & No Commission
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#C9BBAF]">
                Get authentic per-plate and hall rental quotes directly from senior banquet managers with zero platform markup.
              </p>
            </div>

            <div className="rounded-2xl border border-[#665038]/50 bg-[#241321] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#321B30] text-[#B08D45]">
                <Calendar size={20} />
              </div>
              <h3 className="mt-3 font-serif text-base font-bold text-[#F8F1E5]">
                Muhurat Date Slot Hold
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#C9BBAF]">
                Reserve auspicious wedding dates and peak wedding season weekend slots without losing your date.
              </p>
            </div>

            <div className="rounded-2xl border border-[#665038]/50 bg-[#241321] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#321B30] text-[#B08D45]">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-3 font-serif text-base font-bold text-[#F8F1E5]">
                Complimentary Bridal Villa
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#C9BBAF]">
                Exclusive ShubhVivah tie-ups providing complimentary air-conditioned bridal preparation suites with bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CTA BANNER FOR VENUE OWNERS
         ========================================================================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] p-8 text-center shadow-2xl sm:p-12">
          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#D6B875]">
            Venue Partnership
          </span>
          <h2 className="mt-3 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
            Do You Own a Wedding Venue or Banquet Hall?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-[#C9BBAF] sm:text-sm">
            Showcase your banquet ballroom, marriage garden, or heritage resort to over 50,000+ couples planning their dream weddings.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/vendors/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
            >
              List Your Venue Free
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#665038] bg-[#241321] px-5 py-2.5 text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#321B30]"
            >
              Contact Venue Support
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK ENQUIRY MODAL (Matching reference website's modal form)
         ========================================================================= */}
      {enquiryModalVenue && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="absolute right-4 top-4 text-[#C9BBAF] hover:text-[#F8F1E5]"
            >
              <X size={18} />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#241321] text-[#B08D45]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquiry Received!
                </h3>
                <p className="mt-2 text-xs text-[#C9BBAF]">
                  Our royal venue concierge has sent your details to the senior banquet manager of{" "}
                  <span className="font-semibold text-[#D6B875]">{enquiryModalVenue.name}</span>. You will receive an official quotation and slot availability within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="mt-6 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321]"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D6B875]">
                  Direct Venue Inquiry
                </span>
                <h3 className="mt-1 font-serif text-xl font-bold text-[#F8F1E5]">
                  Enquire at {enquiryModalVenue.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Get official per-plate pricing, available wedding dates, and custom decor estimates.
                </p>

                <form onSubmit={handleEnquirySubmit} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aditi Sharma"
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#E8D9B5]">
                        Wedding Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#E8D9B5]">
                        Estimated Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      >
                        <option value="400-800">400 - 800 Guests</option>
                        <option value="800-1500">800 - 1,500 Guests</option>
                        <option value="1500-2500">1,500 - 2,500 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Requirements / Message
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention preferred catering, mandap style, or room requirements..."
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#B08D45] py-2.5 text-xs font-bold text-[#241321] transition-all hover:bg-[#D6B875]"
                    >
                      Submit Booking Inquiry
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
