"use client";

import { useState, useMemo } from "react";
import UniversalEnquiryModal from "@/components/ui/UniversalEnquiryModal";
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
  Landmark,
  Crown,
} from "lucide-react";
import { ALL_VENUES } from "@/data/venuesData";

// Strictly the 7 Premier Heritage Palaces & Forts for Royal Weddings
const HERITAGE_PALACES_DATA = [
  ALL_VENUES[14], // Taj Umaid Bhawan Palace Resort
  ALL_VENUES[8],  // Samode Palace
  ALL_VENUES[9],  // Chomu Palace
  ALL_VENUES[7],  // Neemrana Fort Palace
  ALL_VENUES[5],  // Royal Heritage Wedding Venue
  ALL_VENUES[10], // Alila Fort Bishangarh
  ALL_VENUES[12], // Mehrangarh Fort
].filter(Boolean);

export default function HeritagePalacesPage() {
  const [selectedCity, setSelectedCity] = useState("All Locations");
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
    guests: "300-800",
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
    setSelectedCity("All Locations");
    setSortBy("recommended");
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) + (selectedCity !== "All Locations" ? 1 : 0);

  // Filter & Sort Logic for the 7 Heritage Palaces
  const filteredVenues = useMemo(() => {
    let result = HERITAGE_PALACES_DATA.filter((venue) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = venue.name.toLowerCase().includes(query);
        const matchesCity = venue.city.toLowerCase().includes(query);
        const matchesLocation = venue.location.toLowerCase().includes(query);
        const matchesTag = venue.tagline.toLowerCase().includes(query);
        const matchesAbout = venue.about.toLowerCase().includes(query);
        if (!matchesName && !matchesCity && !matchesLocation && !matchesTag && !matchesAbout) {
          return false;
        }
      }

      // Location / City Filter
      if (selectedCity !== "All Locations" && venue.city !== selectedCity) {
        return false;
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
  }, [searchQuery, selectedCity, sortBy]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          date: formData.date,
          guests: formData.guests,
          message: formData.message,
          target_id: enquiryModalVenue?.id || null,
          target_type: "venue",
          target_name: enquiryModalVenue?.name || "Heritage Palace",
          service_or_product: "Heritage Palace & Fort Venue",
          budget: enquiryModalVenue?.pricing?.veg || "₹4,500 / plate",
          location: enquiryModalVenue?.city || "Rajasthan",
          source: "Heritage Palaces Page",
          is_booking: true,
        }),
      });
    } catch {}
    setFormSubmitted(true);
  };

  const closeEnquiryModal = () => {
    setEnquiryModalVenue(null);
    setFormSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      date: "",
      guests: "300-800",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. BREADCRUMBS & SECTION HEADER (Follows WeddingKalki reference layout)
         ========================================================================= */}
      <section className="border-b border-[#665038]/40 bg-gradient-to-b from-[#321B30] to-[#241321] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs matching reference structure */}
          <nav
            aria-label="Breadcrumb"
            className="hidden lg:flex items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#D6B875]"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <Link
              href="/venues"
              className="transition-colors hover:text-[#D6B875]"
            >
              Venues
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">
              Heritage Palaces & Forts
            </span>
          </nav>

          {/* Page Heading & Tagline */}
          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
                <Crown size={12} className="text-[#B08D45]" />
                Royal Rajputana Heritage Venues
              </div>
              <h1 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
                Heritage Palaces & Forts
              </h1>
              <p className="mt-2 max-w-2xl text-xs text-[#C9BBAF] sm:text-sm">
                Explore handpicked royal heritage palaces, historic fortresses, and aristocratic courtyards in Rajasthan for grand destination weddings steeped in timeless Indian royalty.
              </p>
            </div>

            {/* Quick Share / Count */}
            <div className="flex items-center gap-3">
              <button suppressHydrationWarning
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1.5 text-xs font-medium text-[#C9BBAF] transition-colors hover:border-[#B08D45] hover:text-[#D6B875]"
              >
                <Share2 size={13} />
                <span>{copiedLink ? "Link Copied!" : "Share Listing"}</span>
              </button>

              <span className="rounded-full border border-[#B08D45] bg-[#321B30] px-3.5 py-1.5 text-xs font-semibold text-[#D6B875]">
                {filteredVenues.length} Heritage Palaces Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. FILTER & SEARCH BAR (Location, Search, Sorting)
         ========================================================================= */}
      <section className="border-b border-[#665038]/30 bg-[#241321] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 rounded-2xl border border-[#665038] bg-[#321B30]/80 p-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-3.5">
            {/* Search by palace name or location */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-3 text-[#B08D45]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search royal palace, heritage fort, or city..."
                className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 pl-10 pr-3 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none transition-colors focus:border-[#B08D45] sm:text-sm"
              />
            </div>

            {/* Destination Location Selector */}
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
                <option value="All Locations">All Locations</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Neemrana">Neemrana</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Bishangarh">Bishangarh</option>
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
              <button suppressHydrationWarning
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
          3. 7 HERITAGE PALACE CARDS (Responsive Grid, WeddingKalki Style)
         ========================================================================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Subtitle Bar */}
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B08D45]" />
              <h2 className="font-serif text-xl font-bold tracking-wide text-[#F8F1E5] sm:text-2xl">
                Featured Heritage Palaces & Forts
              </h2>
            </div>
            <p className="text-xs text-[#C9BBAF]">
              Showing <span className="font-semibold text-[#D6B875]">{filteredVenues.length}</span> verified royal heritage palaces
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
                            alt={`${venue.name} — Royal Heritage Palace & Fort Wedding Venue`}
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
                        <button suppressHydrationWarning
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
                            {venue.gallery?.length || 3}+ Photos
                          </span>
                        </div>
                      </div>

                      {/* -------------------------------------------------------------
                          Card Content & Palace Information
                          (Inspired by reference website: Name with verified tick,
                          rating, location, capacity, starting price, description)
                         ------------------------------------------------------------- */}
                      <div className="p-5">
                        {/* Palace Name & Verified Partner Badge */}
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

                        {/* Guest Capacity & Palace Area Badges */}
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
                              Starting Buyout / Event
                            </span>
                            <div className="flex items-baseline gap-1">
                              <span className="font-serif text-xl font-bold text-[#D6B875]">
                                {venue.startingPrice}
                              </span>
                              <span className="text-[11px] text-[#C9BBAF]">
                                / day onwards
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
                      <button suppressHydrationWarning
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
                <Landmark size={28} />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                No Heritage Palaces Found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs text-[#C9BBAF]">
                Try adjusting your search criteria or resetting filters to browse all available royal heritage palaces.
              </p>
              <button suppressHydrationWarning
                type="button"
                onClick={handleClearFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#B08D45] px-5 py-2.5 text-xs font-bold text-[#241321] transition-all hover:bg-[#D6B875]"
              >
                <RotateCcw size={14} />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          4. QUICK ENQUIRY POPUP MODAL (Universal with strict validation)
         ========================================================================= */}
      <UniversalEnquiryModal
        isOpen={!!enquiryModalVenue}
        onClose={() => setEnquiryModalVenue(null)}
        target={enquiryModalVenue}
        targetType="venue"
        source="Heritage Palaces Page"
      />
    </div>
  );
}
