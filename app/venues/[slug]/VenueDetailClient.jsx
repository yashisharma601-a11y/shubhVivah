"use client";

import { useState } from "react";
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
  Share2,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Maximize2,
  SlidersHorizontal,
  Info,
  DollarSign,
  Camera,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";
import { ALL_VENUES, getVenueBySlug } from "@/data/venuesData";

export default function VenueDetailClient({ venue: propVenue, slug }) {
  const venue = propVenue || getVenueBySlug(slug);

  // Active Main Photo in Gallery
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  const [copiedLink, setCopiedLink] = useState(false);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "500-1000",
    eventType: "Wedding Reception & Pheras",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter photos based on category
  const filteredPhotos =
    activeCategory === "all"
      ? venue.gallery
      : venue.gallery.filter((item) => item.category === activeCategory);

  const activePhoto = venue.gallery[selectedPhotoIndex] || venue.gallery[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. BREADCRUMBS & TOP HEADER (Inspired by reference overview page)
         ========================================================================= */}
      <section className="border-b border-[#665038]/40 bg-[#321B30] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#C9BBAF]"
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
              Venues / Marriage Hall
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="text-[#C9BBAF]">Palace & Banquet Halls</span>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875] truncate max-w-xs">
              {venue.name}
            </span>
          </nav>

          {/* Title Header with Verified Badge and Action Buttons */}
          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#B08D45]/50 bg-[#241321] px-3 py-0.5 text-[11px] font-semibold text-[#D6B875]">
                  <Sparkles size={11} className="text-[#B08D45]" />
                  {venue.badge}
                </span>
                <span className="rounded-full bg-[#3A2638] px-3 py-0.5 text-[11px] font-medium text-[#E8D9B5]">
                  {venue.venueType}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2.5">
                <h1 className="font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
                  {venue.name}
                </h1>
                {/* Reference Website Blue Verified Badge */}
                <span
                  title="Verified ShubhVivah Partner"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
                >
                  <Check size={14} strokeWidth={3} />
                </span>
              </div>

              {/* Location, Rating & Reviews */}
              <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-[#C9BBAF]">
                <div className="flex items-center gap-1 text-[#F8F1E5]">
                  <MapPin size={14} className="text-[#B08D45]" />
                  <span>{venue.location}</span>
                </div>
                <span className="text-[#665038]">•</span>
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-[#B08D45] text-[#B08D45]" />
                  <span className="font-bold text-[#F8F1E5]">{venue.rating}</span>
                  <span>({venue.reviewsCount} verified reviews)</span>
                </div>
                <span className="text-[#665038]">•</span>
                <span className="text-[#D6B875]">Since {venue.since}</span>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-[#665038] bg-[#241321] px-3.5 py-2 text-xs font-medium text-[#C9BBAF] transition-colors hover:border-[#B08D45] hover:text-[#D6B875]"
              >
                <Share2 size={14} />
                <span>{copiedLink ? "Copied!" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsShortlisted(!isShortlisted)}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${
                  isShortlisted
                    ? "border-[#B08D45] bg-[#3A2638] text-[#D6B875]"
                    : "border-[#665038] bg-[#241321] text-[#C9BBAF] hover:border-[#B08D45]"
                }`}
              >
                <Heart
                  size={14}
                  className={isShortlisted ? "fill-[#B08D45] text-[#B08D45]" : ""}
                />
                <span>{isShortlisted ? "Shortlisted" : "Shortlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => setEnquiryModalOpen(true)}
                className="rounded-xl bg-[#B08D45] px-5 py-2 text-xs font-bold text-[#241321] transition-all hover:bg-[#D6B875]"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE VENUE PHOTO GALLERY SHOWCASE
          (Multiple high quality photos, wedding stage & decor, indoors & outdoors)
         ========================================================================= */}
      <section className="border-b border-[#665038]/40 bg-[#241321] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Gallery Category Filter Tabs */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9BBAF]">
                Photo Category:
              </span>
              {[
                { id: "all", label: "All Photos (9)" },
                { id: "stage", label: "Stage & Mandap Decor" },
                { id: "indoor", label: "Indoor Banquet Halls" },
                { id: "outdoor", label: "Outdoor Lawns & Facade" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(tab.id);
                    // Find first photo matching this category or reset to 0
                    if (tab.id !== "all") {
                      const firstIdx = venue.gallery.findIndex((p) => p.category === tab.id);
                      if (firstIdx !== -1) setSelectedPhotoIndex(firstIdx);
                    }
                  }}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    activeCategory === tab.id
                      ? "bg-[#B08D45] font-semibold text-[#241321]"
                      : "border border-[#665038]/60 bg-[#321B30] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B875] hover:underline"
            >
              <Maximize2 size={13} />
              <span>View Fullscreen</span>
            </button>
          </div>

          {/* Main Showcase: Hero Image with Thumbnail Selector (inspired by reference website's #largeImage & #thumbs) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Primary Large Image View */}
            <div className="relative overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30] lg:col-span-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/10]">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="h-full w-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-70" />

                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="max-w-xl">
                    <span className="rounded-md border border-[#B08D45]/50 bg-[#241321]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                      {activePhoto.tag}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-[#F8F1E5] sm:text-xl">
                      {activePhoto.caption}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#241321]/80 text-[#F8F1E5] backdrop-blur-md transition-colors hover:bg-[#B08D45] hover:text-[#241321]"
                    aria-label="Expand image"
                  >
                    <Maximize2 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip (Right 4 cols on desktop, matches reference website's thumbs layout) */}
            <div className="flex flex-col justify-between gap-3 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-[#665038]/40 pb-2">
                <span className="text-xs font-semibold text-[#E8D9B5]">
                  Venue Gallery ({venue.gallery.length} Images)
                </span>
                <span className="text-[11px] text-[#C9BBAF]">Click to preview</span>
              </div>

              {/* Scrollable Thumbnails Grid */}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-2 lg:gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {venue.gallery.map((photo, idx) => {
                  const isSelected = selectedPhotoIndex === idx;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-[#D6B875] ring-2 ring-[#B08D45]"
                          : "border-[#665038]/60 opacity-75 hover:opacity-100 hover:border-[#B08D45]"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-1 left-1.5 right-1.5 truncate text-[10px] font-medium text-white">
                        {photo.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Gallery helper note */}
              <div className="rounded-xl border border-[#665038]/40 bg-[#321B30] p-3 text-center text-xs text-[#C9BBAF]">
                <span>Stage Decor, Mandap, Indoor Ballroom & Outdoor Lawns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: SPECS, TABS, FACILITIES & STICKY BOOKING CARD
          (Inspired by reference website overview structure)
         ========================================================================= */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* -------------------------------------------------------------
                LEFT CONTENT COLUMN (8 Cols on desktop)
               ------------------------------------------------------------- */}
            <div className="space-y-8 lg:col-span-8">
              {/* Quick Specs Table (Matching reference website table style) */}
              <div className="overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-xl">
                <div className="flex items-center gap-2 border-b border-[#665038]/50 pb-3">
                  <Landmark size={18} className="text-[#B08D45]" />
                  <h2 className="font-serif text-xl font-bold text-[#F8F1E5]">
                    Key Venue Specifications
                  </h2>
                </div>

                <div className="mt-4 divide-y divide-[#665038]/30">
                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Established Since
                    </span>
                    <span className="text-xs text-[#F8F1E5] sm:col-span-2">
                      {venue.since} (Modernized 2024)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Guest Capacity
                    </span>
                    <span className="text-xs font-bold text-[#F8F1E5] sm:col-span-2">
                      {venue.guestCapacity} ({venue.seatingCapacity} • {venue.floatingCapacity})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Total Area of Venue
                    </span>
                    <span className="text-xs text-[#F8F1E5] sm:col-span-2">
                      {venue.totalArea} ({venue.indoorArea} + {venue.lawnArea})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Rooms & Accommodations
                    </span>
                    <span className="text-xs text-[#F8F1E5] sm:col-span-2">
                      {venue.rooms} with attached luxury baths
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Parking Capacity
                    </span>
                    <span className="text-xs text-[#F8F1E5] sm:col-span-2">
                      {venue.parkingCapacity}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Restrooms / Washrooms
                    </span>
                    <span className="text-xs text-[#F8F1E5] sm:col-span-2">
                      {venue.toilets} modern hygiene-certified units
                    </span>
                  </div>

                  <div className="grid grid-cols-1 py-2.5 sm:grid-cols-3">
                    <span className="text-xs font-semibold text-[#D6B875]">
                      Starting Price per Event
                    </span>
                    <span className="font-serif text-sm font-bold text-[#D6B875] sm:col-span-2">
                      {venue.startingPrice} onwards ({venue.priceRange})
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs (Inspired by reference website tab_section_vdr_dt) */}
              <div className="rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-xl">
                {/* Tab Pill Headers */}
                <div className="flex flex-wrap gap-2 border-b border-[#665038]/50 pb-4">
                  {[
                    { id: "services", label: "Services & Amenities" },
                    { id: "description", label: "Description & Spaces" },
                    { id: "pricing", label: "Pricing & Packages" },
                    { id: "reviews", label: `Reviews (${venue.reviewsCount})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                        activeTab === tab.id
                          ? "bg-[#B08D45] text-[#241321] shadow-md shadow-[#B08D45]/30"
                          : "border border-[#665038]/50 bg-[#241321] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content 1: Services & Amenities */}
                {activeTab === "services" && (
                  <div className="pt-6">
                    <h3 className="font-serif text-xl font-bold text-[#F8F1E5]">
                      Venue Facilities & Service Inclusions
                    </h3>
                    <p className="mt-1 text-xs text-[#C9BBAF]">
                      Everything included when booking The Grand Regal Palace & Resort for your wedding functions.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {venue.facilities.map((fac) => (
                        <div
                          key={fac.title}
                          className="flex items-start gap-3 rounded-xl border border-[#665038]/40 bg-[#241321] p-3.5"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B08D45]/20 text-[#D6B875]">
                            <Check size={14} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#F8F1E5]">
                              {fac.title}
                            </h4>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-[#C9BBAF]">
                              {fac.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Description & Venue Spaces */}
                {activeTab === "description" && (
                  <div className="space-y-6 pt-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F8F1E5]">
                        About The Venue
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
                        {venue.about}
                      </p>
                    </div>

                    <div className="border-t border-[#665038]/40 pt-5">
                      <h4 className="font-serif text-lg font-bold text-[#D6B875]">
                        Event Spaces & Hall Breakdown
                      </h4>
                      <p className="mt-1 text-xs text-[#C9BBAF]">
                        Multiple versatile spaces allowing simultaneous wedding rituals, dinner buffets, and sangeet stages.
                      </p>

                      <div className="mt-4 space-y-4">
                        {venue.spaces.map((space) => (
                          <div
                            key={space.name}
                            className="rounded-xl border border-[#665038]/50 bg-[#241321] p-4.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h5 className="font-serif text-base font-bold text-[#F8F1E5]">
                                {space.name}
                              </h5>
                              <span className="rounded-full border border-[#B08D45]/50 bg-[#321B30] px-2.5 py-0.5 text-[10px] font-semibold text-[#D6B875]">
                                {space.badge}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#C9BBAF]">
                              <span className="text-[#D6B875] font-medium">{space.type}</span>
                              <span>•</span>
                              <span>{space.area}</span>
                              <span>•</span>
                              <span className="font-semibold text-[#F8F1E5]">
                                {space.seating} | {space.floating}
                              </span>
                            </div>

                            <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                              {space.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content 3: Pricing & Packages */}
                {activeTab === "pricing" && (
                  <div className="space-y-6 pt-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F8F1E5]">
                        Transparent Pricing Structure
                      </h3>
                      <p className="mt-1 text-xs text-[#C9BBAF]">
                        Standard baseline estimates. Exact pricing varies based on wedding date and guest headcount.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-xl border border-[#665038] bg-[#241321] p-4 text-center">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                          Venue Rental Package
                        </span>
                        <div className="mt-2 font-serif text-2xl font-bold text-[#D6B875]">
                          {venue.startingPrice}
                        </div>
                        <span className="text-[11px] text-[#C9BBAF]">
                          Per day rental including electricity & backup
                        </span>
                      </div>

                      <div className="rounded-xl border border-[#665038] bg-[#241321] p-4 text-center">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                          Royal Vegetarian Plate
                        </span>
                        <div className="mt-2 font-serif text-2xl font-bold text-[#D6B875]">
                          {venue.pricePerPlateVeg}
                        </div>
                        <span className="text-[11px] text-[#C9BBAF]">
                          Per plate + taxes (60+ item menu)
                        </span>
                      </div>

                      <div className="rounded-xl border border-[#665038] bg-[#241321] p-4 text-center">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                          Royal Non-Veg Plate
                        </span>
                        <div className="mt-2 font-serif text-2xl font-bold text-[#D6B875]">
                          {venue.pricePerPlateNonVeg}
                        </div>
                        <span className="text-[11px] text-[#C9BBAF]">
                          Per plate + taxes (Mughlai & Continental)
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#B08D45]/40 bg-[#241321]/60 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                        Booking & Cancellation Terms
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-xs text-[#C9BBAF]">
                        <li>• 25% advance required at the time of confirming auspicious wedding date.</li>
                        <li>• 50% payment 30 days prior to the wedding event date.</li>
                        <li>• Remaining 25% settled upon check-in and stage handover.</li>
                        <li>• Outside decorators and outside catering panels permitted with nominal NOC.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab Content 4: Reviews & Ratings */}
                {activeTab === "reviews" && (
                  <div className="pt-6">
                    <div className="flex flex-col justify-between gap-4 border-b border-[#665038]/40 pb-5 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#F8F1E5]">
                          Client Reviews & Experiences
                        </h3>
                        <p className="mt-1 text-xs text-[#C9BBAF]">
                          Verified feedback from families who hosted wedding celebrations here.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-[#241321] px-4 py-2">
                        <Star size={18} className="fill-[#B08D45] text-[#B08D45]" />
                        <span className="font-serif text-2xl font-bold text-[#F8F1E5]">
                          {venue.rating}
                        </span>
                        <span className="text-xs text-[#C9BBAF]">
                          / 5.0 Rating
                        </span>
                      </div>
                    </div>

                    {/* Review Snippets */}
                    <div className="mt-5 space-y-4">
                      <div className="rounded-xl border border-[#665038]/40 bg-[#241321] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-[#F8F1E5]">
                              Rohit & Meenakshi Singhania
                            </h5>
                            <span className="text-[11px] text-[#C9BBAF]">
                              Wedding & Reception (January 2025)
                            </span>
                          </div>
                          <div className="flex items-center text-[#B08D45]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="fill-[#B08D45]" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                          &ldquo;We hosted our 3-day destination wedding here. The Kohinoor ballroom chandeliers took everyone&apos;s breath away. The lawn easily accommodated our 1,400 guests without feeling crowded. The banquet team handled catering and stage coordination with absolute perfection!&rdquo;
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#665038]/40 bg-[#241321] p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-[#F8F1E5]">
                              Sanjay & Kavita Rathore
                            </h5>
                            <span className="text-[11px] text-[#C9BBAF]">
                              Royal Sangeet & Pheras (November 2024)
                            </span>
                          </div>
                          <div className="flex items-center text-[#B08D45]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className="fill-[#B08D45]" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                          &ldquo;Exceptional palace ambiance. The bridal dressing suite was spacious and royal. Valet parking for 300+ cars was smooth with zero traffic congestion outside the gate. Highly recommended for luxury weddings!&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* -------------------------------------------------------------
                RIGHT SIDEBAR: STICKY BOOKING & AVAILABILITY CARD
                (Inspired by reference website date selector & enquiry format)
               ------------------------------------------------------------- */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                {/* Booking Price & Enquiry Card */}
                <div className="rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl">
                  <div className="border-b border-[#665038]/40 pb-4">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-[#C9BBAF]">
                      Starting Booking Price
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-[#D6B875]">
                        {venue.startingPrice}
                      </span>
                      <span className="text-xs text-[#C9BBAF]">
                        / event
                      </span>
                    </div>
                    <span className="mt-1 block text-xs text-[#C9BBAF]">
                      {venue.priceRange} (Customized to rituals)
                    </span>
                  </div>

                  {/* Date Availability Picker (like reference site #checkbookingdate) */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-[#E8D9B5]">
                      Check Auspicious Date Availability:
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-3 pr-3 text-xs text-[#F8F1E5] outline-none transition-colors focus:border-[#B08D45]"
                      />
                    </div>
                    {selectedDate && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle2 size={13} />
                        <span>Slot checking available for {selectedDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Primary Contact / Enquire Button */}
                  <div className="mt-5 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setEnquiryModalOpen(true)}
                      className="w-full rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-3 text-xs font-bold text-[#241321] shadow-lg shadow-[#B08D45]/20 transition-all hover:brightness-110"
                    >
                      Enquire Now / Get Official Quote
                    </button>

                    {/* Reference Website Direct Contact Buttons */}
                    <a
                      href={`https://wa.me/${venue.contactWhatsapp}?text=Hi%20ShubhVivah,%20I%20am%20interested%20in%20booking%20${encodeURIComponent(venue.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/60 bg-[#241321] py-2.5 text-xs font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                    >
                      <MessageSquare size={14} />
                      WhatsApp Senior Banquet Manager
                    </a>

                    <a
                      href={`tel:${venue.contactPhone}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#665038] bg-[#241321] py-2.5 text-xs font-semibold text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:text-[#D6B875]"
                    >
                      <Phone size={14} className="text-[#B08D45]" />
                      Call Venue Concierge
                    </a>
                  </div>

                  {/* Address Box (matches reference layout) */}
                  <div className="mt-5 rounded-xl border border-[#665038]/40 bg-[#241321] p-3.5 text-xs text-[#C9BBAF]">
                    <div className="flex items-center gap-1.5 font-bold text-[#D6B875]">
                      <MapPin size={13} />
                      <span>Physical Address:</span>
                    </div>
                    <p className="mt-1 leading-relaxed text-[#F8F1E5]">
                      {venue.address}
                    </p>
                  </div>
                </div>

                {/* Back to All Venues Link */}
                <div className="text-center">
                  <Link
                    href="/venues"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6B875] hover:underline"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to All Wedding Venues</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FULLSCREEN LIGHTBOX MODAL
         ========================================================================= */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
            aria-label="Close fullscreen"
          >
            <X size={22} />
          </button>

          <div className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl">
            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <div className="bg-[#241321] p-4 text-center">
              <span className="text-xs font-bold text-[#D6B875] uppercase tracking-wider">
                {activePhoto.tag}
              </span>
              <p className="mt-1 text-sm font-serif font-bold text-[#F8F1E5]">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. ENQUIRY NOW POPUP MODAL
         ========================================================================= */}
      {enquiryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setEnquiryModalOpen(false);
                setFormSubmitted(false);
              }}
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
                  Inquiry Dispatched!
                </h3>
                <p className="mt-2 text-xs text-[#C9BBAF]">
                  Thank you, <span className="font-semibold text-[#D6B875]">{formData.name || "Valued Guest"}</span>.
                  The banquet reservation desk at {venue.name} has been notified. You will receive an official date hold confirmation and detailed quote shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEnquiryModalOpen(false);
                    setFormSubmitted(false);
                  }}
                  className="mt-6 rounded-full bg-[#B08D45] px-6 py-2.5 text-xs font-semibold text-[#241321]"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D6B875]">
                  Dedicated Booking Desk
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Reserve {venue.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Direct wedding coordination with Senior General Manager. Zero platform fee.
                </p>

                <form onSubmit={handleEnquirySubmit} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Phone Number / WhatsApp *
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
                        Preferred Wedding Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date || selectedDate}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#E8D9B5]">
                        Expected Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#F8F1E5] outline-none focus:border-[#B08D45]"
                      >
                        <option value="500-1000">500 - 1,000 Guests</option>
                        <option value="1000-1500">1,000 - 1,500 Guests</option>
                        <option value="1500-2500">1,500 - 2,500 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D9B5]">
                      Wedding Functions & Special Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention sangeet timing, lawn vs ballroom preferences, room count..."
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
