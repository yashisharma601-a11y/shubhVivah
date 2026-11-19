"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Sparkles, Search } from "lucide-react";

export default function HeroSection() {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (service) params.set("service", service);

    window.location.href = `/vendors?${params.toString()}`;
  };

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#241321] sm:min-h-[680px]">
      {/* Background Indian Palace / Wedding Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=88')",
        }}
      />

      {/* Royal Deep Plum / Dark Luxury Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/85 via-[#241321]/65 to-[#241321]/95" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[620px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[680px] sm:px-8">
        {/* Editorial Subheading Pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#321B30]/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8D9B5] backdrop-blur-md sm:text-sm">
          <Sparkles size={14} className="text-[#B08D45]" />
          <span>Curated Indian Wedding Marketplace</span>
        </div>

        {/* Editorial Royal Serif Heading */}
        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.18] text-[#F8F1E5] sm:text-5xl md:text-6xl lg:text-7xl">
          Your Dream Wedding,{" "}
          <span className="block mt-2 font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#D6B875] via-[#E8D9B5] to-[#B08D45]">
            Beautifully Planned
          </span>
        </h1>

        {/* Supporting Editorial Text */}
        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#C9BBAF] sm:text-base md:text-lg">
          Discover extraordinary wedding venues, talented professionals, and everything
          you need to create your perfect celebration.
        </p>

        {/* Search Bar Container with Warm Ivory Background & Antique Gold Accents */}
        <form
          suppressHydrationWarning
          onSubmit={handleSearch}
          className="mt-10 w-full max-w-5xl rounded-2xl border border-[#665038] bg-[#F7F1E7] p-2.5 sm:p-3 shadow-2xl shadow-black/60 lg:rounded-full lg:py-2 lg:px-3"
        >
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-2">
            {/* 1. Destination / City Input with Location Icon */}
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-[#665038]/20 bg-white/70 px-3.5 py-2.5 text-left lg:border-0 lg:bg-transparent lg:py-1.5 lg:px-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#321B30] text-[#B08D45]">
                <MapPin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="city"
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#392B31]"
                >
                  Destination / City
                </label>
                <input
                  id="city"
                  type="text"
                  suppressHydrationWarning
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Udaipur, Jaipur, Delhi"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#392B31] outline-none placeholder:text-[#392B31]/50"
                />
              </div>
            </div>

            {/* Subtle Divider for Desktop */}
            <div className="hidden lg:block h-8 w-[1px] bg-[#665038]/30 shrink-0" />

            {/* 2. Wedding Service Dropdown with Sparkle Icon */}
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-[#665038]/20 bg-white/70 px-3.5 py-2.5 text-left lg:border-0 lg:bg-transparent lg:py-1.5 lg:px-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#321B30] text-[#B08D45]">
                <Sparkles size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="service"
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#392B31]"
                >
                  Wedding Service
                </label>
                <select
                  id="service"
                  suppressHydrationWarning
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-xs sm:text-sm font-medium text-[#392B31] outline-none"
                >
                  <option value="">All Services</option>
                  <option value="venues">Wedding Venues</option>
                  <option value="photographers">Photographers</option>
                  <option value="makeup">Bridal Makeup</option>
                  <option value="decoration">Wedding Decorators</option>
                  <option value="wedding-planners">Wedding Planners</option>
                  <option value="bridal-wear">Bridal Wear</option>
                  <option value="catering">Catering</option>
                </select>
              </div>
            </div>

            {/* 3, 4, 5. Action Buttons Row on Mobile / Direct Inline on Desktop */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:flex-nowrap lg:shrink-0">
              {/* 3. Browse Venues Button */}
              <Link
                href="/venues"
                className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-1.5 rounded-xl lg:rounded-full bg-[#321B30] px-4 text-xs font-bold text-[#E8D9B5] border border-[#B08D45]/40 transition-all duration-200 hover:bg-[#3A2638] hover:border-[#D6B875] hover:text-[#FFE29A] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <MapPin size={14} className="text-[#B08D45] shrink-0" />
                <span>Browse Venues</span>
              </Link>

              {/* 4. Browse Vendors Button */}
              <Link
                href="/vendors"
                className="flex-1 sm:flex-initial inline-flex h-11 items-center justify-center gap-1.5 rounded-xl lg:rounded-full bg-[#321B30] px-4 text-xs font-bold text-[#E8D9B5] border border-[#B08D45]/40 transition-all duration-200 hover:bg-[#3A2638] hover:border-[#D6B875] hover:text-[#FFE29A] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <Sparkles size={14} className="text-[#D6B875] shrink-0" />
                <span>Browse Vendors</span>
              </Link>

              {/* 5. Find Vendors Button */}
              <button
                type="submit"
                suppressHydrationWarning
                className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-1.5 rounded-xl lg:rounded-full bg-[#B08D45] px-5 text-xs sm:text-sm font-bold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] shadow-md shadow-[#B08D45]/20 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <Search size={15} className="shrink-0" />
                <span>Find Vendors</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick Category Searches */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:gap-3 sm:text-sm">
          <span className="mr-1 font-medium text-[#C9BBAF]">Popular Searches:</span>

          {[
            {
              label: "Palace Venues",
              href: "/venues/heritage-palaces",
            },
            {
              label: "Candid Photography",
              href: "/wedding-vendors/wedding-photography",
            },
            {
              label: "Bridal Makeup",
              href: "/wedding-vendors/bridal-makeup-artist",
            },
            {
              label: "Mandap Decorators",
              href: "/wedding-vendors/decoration",
            },
            {
              label: "Destination Weddings",
              href: "/venues/destination-weddings",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center cursor-pointer rounded-full border border-[#665038] bg-[#321B30]/60 px-3.5 py-1.5 text-[#E8D9B5] transition-all duration-200 hover:border-[#B08D45] hover:bg-[#3A2638] hover:text-[#F8F1E5] hover:shadow-[0_2px_10px_rgba(176,141,69,0.25)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Thin Antique Gold Separator */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
    </section>
  );
}
