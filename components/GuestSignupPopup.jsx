"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Heart, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function GuestSignupPopup() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking, true/false = known
  const timerRef = useRef(null);

  // Do not show popup on login, register, or forgot-password pages
  const isAuthPage =
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/register" ||
    pathname.startsWith("/register/") ||
    pathname === "/forgot-password";

  // 1. Verify actual server session directly with backend API
  useEffect(() => {
    let isMounted = true;

    async function checkAuthStatus() {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        const data = await res.json();
        if (isMounted) {
          if (data.authenticated && data.user) {
            setIsAuthenticated(true);
            setIsOpen(false);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    }

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Schedule recurring 10s popup timer for unauthenticated visitors
  useEffect(() => {
    // If on auth pages (/login, /register, etc.), do not show popup or run timer
    if (isAuthPage) {
      setIsOpen(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    // If user is authenticated or status is still verifying, clear timers
    if (isAuthenticated !== false) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    // If popup is currently open, do not schedule another timeout
    if (isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    // Schedule appearance 10 seconds after load or 10 seconds after closing
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isAuthenticated, isOpen, isAuthPage]);

  // 3. Escape key keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // If authenticated, on an auth page, or still verifying, do not render popup DOM
  if (isAuthenticated !== false || isAuthPage || !isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
    >
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Royal Cream/Ivory Popup Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#665038] bg-[#F7F1E7] text-[#241321] p-6 sm:p-8 shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-200">
        {/* Decorative Top Accent Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-[#B08D45]" />

        {/* Close Button */}
        <button suppressHydrationWarning
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-[#392B31] hover:text-[#B08D45] hover:bg-[#321B30]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B08D45]"
        >
          <X size={20} />
        </button>

        {/* Header Icon Pill */}
        <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D45]/40 bg-[#321B30] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
            <Sparkles size={13} className="text-[#D6B875]" />
            <span>Welcome to ShubhVivah</span>
          </div>
        </div>

        {/* Heading */}
        <h2
          id="guest-popup-title"
          className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-[#241321]"
        >
          Find Your Perfect Wedding Match! ❤️
        </h2>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#392B31]/80">
          Join ShubhVivah today to explore wedding vendors, venues, and exclusive services. Register now to unlock your complete wedding experience!
        </p>

        {/* Feature Highlights */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#321B30]">
          <div className="flex items-center gap-1.5">
            <Heart size={14} className="text-[#B08D45] fill-[#B08D45]/20" />
            <span>3,200+ Heritage Venues</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#B08D45]" />
            <span>100% Verified Vendors</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:gap-3">
          {/* Primary Gold Button */}
          <Link
            href="/register"
            onClick={handleClose}
            className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#B08D45] px-6 text-sm font-bold text-[#241321] shadow-lg shadow-[#B08D45]/25 transition-all duration-200 hover:bg-[#D6B875] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Register Now</span>
            <ArrowRight size={16} />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/login"
            onClick={handleClose}
            className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#665038] bg-[#321B30] px-6 text-sm font-semibold text-[#E8D9B5] transition-all duration-200 hover:bg-[#3A2638] hover:border-[#D6B875] hover:text-[#FFE29A]"
          >
            <span>Login Now</span>
          </Link>

          {/* Maybe Later */}
          <button suppressHydrationWarning
            type="button"
            onClick={handleClose}
            className="mt-1 text-center text-xs font-medium text-[#392B31]/70 hover:text-[#241321] hover:underline transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

