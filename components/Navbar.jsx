"use client";

import { useState, useRef, useEffect } from "react";
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
  Droplets,
  Milk,
  Flame,
  Carrot,
  Mail,
  Video,
  User,
} from "lucide-react";

const vendorLinks = [
  { name: "Wedding Photographers", href: "/wedding-vendors/wedding-photography", icon: Camera },
  { name: "Bridal Makeup Artists", href: "/wedding-vendors/bridal-makeup-artist", icon: Sparkles },
  { name: "Wedding Decorators", href: "/wedding-vendors/decoration", icon: Flower2 },
  { name: "Wedding Planners", href: "/wedding-vendors/wedding-planner", icon: CalendarDays },
  { name: "Bridal & Groom Wear", href: "/wedding-vendors/bridal-groom-wear", icon: Shirt },
  { name: "Mehndi Artists", href: "/wedding-vendors/mehndi-artist", icon: Palette },
];

const venueLinks = [
  { name: "All Wedding Venues", href: "/venues", icon: MapPin },
  { name: "Heritage Palaces & Forts", href: "/venues/heritage-palaces", icon: Sparkles },
  { name: "Luxury Banquet Halls", href: "/venues/banquet-halls", icon: Users },
  { name: "Destination Wedding Resorts", href: "/venues/destination-weddings", icon: Heart },
];

const supplierLinks = [
  { name: "Water Camper Supplier", href: "/suppliers/water-camper", icon: Droplets },
  { name: "Dairy Products", href: "/suppliers/dairy-products", icon: Milk },
  { name: "Cylinder Suppliers", href: "/suppliers/cylinder-suppliers", icon: Flame },
  { name: "Vegetable Supplier", href: "/suppliers/vegetable-supplier", icon: Carrot },
];

const eInviteLinks = [
  { name: "Wedding Card Designer", href: "/e-invites/wedding-card-designer", icon: Mail },
  { name: "E-Invitation Card Design", href: "/e-invites/e-invitation-card-design", icon: Sparkles },
  { name: "Invitation Video Template", href: "/e-invites/invitation-video-template", icon: Video },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setCurrentUser(null);
    closeMenu();
    window.location.href = "/login";
  };

  const closeMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleDropdown = (id) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const renderDropdown = (label, items, id, isMobile = false) => {
    const isOpen = activeDropdown === id;

    return (
      <div
        className="relative"
        onMouseEnter={() => {
          if (!isMobile) handleMouseEnter(id);
        }}
        onMouseLeave={() => {
          if (!isMobile) handleMouseLeave();
        }}
      >
        <button
          type="button"
          onClick={() => toggleDropdown(id)}
          aria-expanded={isOpen}
          className={`flex w-full items-center justify-between gap-1.5 py-2 text-sm font-medium transition-colors ${isOpen ? "text-[#D6B875]" : "text-[#F8F1E5] hover:text-[#B08D45]"
            }`}
        >
          <span>{label}</span>
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#B08D45]" : "text-[#C9BBAF]"
              }`}
          />
        </button>

        {isOpen && (
          <div
            className="mt-1 rounded-xl border border-[#665038] bg-[#321B30] p-2 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:mt-0 lg:w-72 lg:before:absolute lg:before:-top-3 lg:before:left-0 lg:before:h-3 lg:before:w-full lg:before:content-['']"
            onMouseEnter={() => {
              if (!isMobile) handleMouseEnter(id);
            }}
            onMouseLeave={() => {
              if (!isMobile) handleMouseLeave();
            }}
          >
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

          {renderDropdown("Suppliers", supplierLinks, "desktop-suppliers")}

          {renderDropdown("E-invites", eInviteLinks, "desktop-e-invites")}

          <Link
            href="/contact"
            className="text-sm font-medium text-[#F8F1E5] transition-colors hover:text-[#D6B875]"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Action Buttons & Far-Right Login */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          <Link
            href="/vendors/register"
            className="flex items-center gap-2 rounded-full border border-[#B08D45] bg-transparent px-4 py-2 text-sm font-medium text-[#F8F1E5] transition-all duration-200 hover:border-[#D6B875] hover:bg-[#3A2638] hover:text-[#D6B875]"
          >
            <Store size={15} className="text-[#B08D45]" />
            List Your Business
          </Link>

          {currentUser && currentUser.user_type !== "admin" ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/${currentUser.user_type}`}
                className="flex items-center gap-1.5 rounded-full border border-[#B08D45]/60 bg-[#321B30] px-4 py-1.5 text-xs font-semibold text-[#D6B875] hover:bg-[#3A2638] hover:text-[#FFE29A] transition-all shadow-sm"
              >
                <User size={13} />
                <span>Account</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold text-[#C9BBAF] hover:text-red-400 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="rounded-full border border-[#B08D45] bg-[#B08D45] px-4 py-1.5 text-sm font-semibold text-[#241321] shadow-md shadow-[#B08D45]/20 transition-all duration-200 hover:bg-[#D6B875] hover:border-[#D6B875] hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[#665038] bg-[#321B30]/70 px-4 py-1.5 text-sm font-medium text-[#E8D9B5] transition-all duration-200 hover:border-[#B08D45] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
              >
                Register
              </Link>
            </div>
          )}
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
              {renderDropdown("Wedding Vendors", vendorLinks, "mobile-vendors", true)}
            </div>

            <div className="border-b border-[#665038]/40 py-1">
              {renderDropdown("Venues", venueLinks, "mobile-venues", true)}
            </div>

            <div className="border-b border-[#665038]/40 py-1">
              {renderDropdown("Suppliers", supplierLinks, "mobile-suppliers", true)}
            </div>

            <div className="border-b border-[#665038]/40 py-1">
              {renderDropdown("E-invites", eInviteLinks, "mobile-e-invites", true)}
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

            {currentUser && currentUser.user_type !== "admin" ? (
              <>
                <Link
                  href={`/dashboard/${currentUser.user_type}`}
                  onClick={closeMenu}
                  className="border-b border-[#665038]/40 py-3 text-sm font-semibold text-[#D6B875] hover:text-[#FFE29A] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User size={15} />
                    <span>Account ({currentUser.name?.split(" ")[0] || currentUser.user_type})</span>
                  </span>
                  <span className="text-xs rounded-full bg-[#B08D45] text-[#241321] px-2.5 py-0.5 font-bold capitalize">
                    {currentUser.user_type}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left border-b border-[#665038]/40 py-3 text-sm font-medium text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 border-b border-[#665038]/40 py-3">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-between rounded-xl bg-[#B08D45] px-4 py-2.5 text-sm font-semibold text-[#241321]"
                >
                  <span>Login to Your Account</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center rounded-xl border border-[#665038] bg-[#321B30] px-4 py-2 text-xs font-medium text-[#E8D9B5]"
                >
                  Create New Account (Register)
                </Link>
              </div>
            )}

            <div className="pt-4 space-y-2.5">
              <Link
                href="/vendors/register"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B08D45] bg-[#321B30] py-3 text-sm font-medium text-[#F8F1E5]"
              >
                <Store size={16} className="text-[#B08D45]" />
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
