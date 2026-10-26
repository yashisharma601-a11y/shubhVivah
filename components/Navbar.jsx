"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Store,
  Camera,
  MapPin,
  Flower2,
  Heart,
  Palette,
  Users,
  Shirt,
  CalendarDays,
} from "lucide-react";

const vendorLinks = [
  { name: "Wedding Photographers", href: "/wedding-vendors/wedding-photography", icon: Camera },
  { name: "Bridal Makeup Artists", href: "/wedding-vendors/bridal-makeup-artist", icon: Sparkles },
  { name: "Wedding Decorators", href: "/wedding-vendors/decoration", icon: Flower2 },
  { name: "Wedding Planners", href: "/vendors/wedding-planners", icon: CalendarDays },
  { name: "Bridal & Groom Wear", href: "/vendors/bridal-wear", icon: Shirt },
  { name: "Mehndi Artists", href: "/vendors/mehndi", icon: Palette },
];

const venueLinks = [
  { name: "All Wedding Venues", href: "/venues", icon: MapPin },
  { name: "Heritage Palaces & Forts", href: "/venues/heritage-palaces", icon: Sparkles },
  { name: "Luxury Banquet Halls", href: "/venues/banquet-halls", icon: Users },
  { name: "Destination Wedding Resorts", href: "/venues/destination-weddings", icon: Heart },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const closeMenu = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const renderDropdown = (label, items, id) => {
    const isOpen = activeDropdown === id;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown(id)}
          aria-expanded={isOpen}
          className={`flex w-full items-center justify-between gap-1.5 py-2 text-sm font-medium transition-colors ${
            isOpen ? "text-[#D6B875]" : "text-[#F8F1E5] hover:text-[#B08D45]"
          }`}
        >
          <span>{label}</span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#B08D45]" : "text-[#C9BBAF]"
            }`}
          />
        </button>

        {isOpen && (
          <div className="mt-1 rounded-xl border border-[#665038] bg-[#321B30] p-2 shadow-2xl shadow-black/50 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:mt-2.5 lg:w-72">
            <div className="space-y-1">
              {items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#F8F1E5] transition-all duration-200 hover:bg-[#3A2638] hover:text-[#D6B875]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#241321] text-[#B08D45]">
                      <ItemIcon size={16} />
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#665038] bg-[#241321]/95 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ShubhVivah Official Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center transition-opacity hover:opacity-95"
          aria-label="ShubhVivah home"
        >
          <Image
            src="/shubhvivah-logo.png"
            alt="ShubhVivah — Your Perfect Wedding Journey"
            width={240}
            height={80}
            priority
            className="h-14 sm:h-16 lg:h-[70px] w-auto object-contain drop-shadow-[0_2px_12px_rgba(214,184,117,0.4)] brightness-110 contrast-105 transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <Link
            href="/"
            className="text-sm font-medium text-[#D6B875] transition-colors hover:text-[#B08D45]"
          >
            Home
          </Link>

          {renderDropdown("Wedding Vendors", vendorLinks, "desktop-vendors")}

          {renderDropdown("Venues", venueLinks, "desktop-venues")}

          <Link
            href="/real-weddings"
            className="text-sm font-medium text-[#F8F1E5] transition-colors hover:text-[#D6B875]"
          >
            Real Weddings
          </Link>

          <Link
            href="/blog"
            className="text-sm font-medium text-[#F8F1E5] transition-colors hover:text-[#D6B875]"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-[#F8F1E5] transition-colors hover:text-[#D6B875]"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/vendors/register"
            className="flex items-center gap-2 rounded-full border border-[#B08D45] bg-transparent px-4 py-2 text-sm font-medium text-[#F8F1E5] transition-all duration-200 hover:border-[#D6B875] hover:bg-[#3A2638] hover:text-[#D6B875]"
          >
            <Store size={15} className="text-[#B08D45]" />
            List Your Business
          </Link>

          <Link
            href="/vendors"
            className="flex items-center gap-1.5 rounded-full bg-[#B08D45] px-5 py-2 text-sm font-semibold text-[#241321] shadow-sm transition-all duration-200 hover:bg-[#D6B875]"
          >
            <Sparkles size={15} />
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#665038] bg-[#321B30] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} className="text-[#D6B875]" /> : <Menu size={22} className="text-[#D6B875]" />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="max-h-[85vh] overflow-y-auto border-t border-[#665038] bg-[#241321] px-5 pb-7 pt-3 shadow-2xl lg:hidden">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="border-b border-[#665038]/40 py-3 text-sm font-medium text-[#D6B875]"
            >
              Home
            </Link>

            <div className="border-b border-[#665038]/40 py-1">
              {renderDropdown("Wedding Vendors", vendorLinks, "mobile-vendors")}
            </div>

            <div className="border-b border-[#665038]/40 py-1">
              {renderDropdown("Venues", venueLinks, "mobile-venues")}
            </div>

            <Link
              href="/real-weddings"
              onClick={closeMenu}
              className="border-b border-[#665038]/40 py-3 text-sm font-medium text-[#F8F1E5] hover:text-[#D6B875]"
            >
              Real Weddings
            </Link>

            <Link
              href="/blog"
              onClick={closeMenu}
              className="border-b border-[#665038]/40 py-3 text-sm font-medium text-[#F8F1E5] hover:text-[#D6B875]"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="border-b border-[#665038]/40 py-3 text-sm font-medium text-[#F8F1E5] hover:text-[#D6B875]"
            >
              Contact Us
            </Link>

            <div className="pt-4 space-y-2.5">
              <Link
                href="/vendors/register"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B08D45] bg-[#321B30] py-3 text-sm font-medium text-[#F8F1E5]"
              >
                <Store size={16} className="text-[#B08D45]" />
                List Your Business
              </Link>

              <Link
                href="/vendors"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B08D45] py-3 text-sm font-semibold text-[#241321]"
              >
                <Sparkles size={16} />
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
