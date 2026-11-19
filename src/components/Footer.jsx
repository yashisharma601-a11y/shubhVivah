import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Heart,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#665038] bg-[#241321] text-[#F8F1E5]">
      {/* Antique Gold Top Accent Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/shubhvivah-logo.png"
                alt="ShubhVivah"
                width={220}
                height={80}
                className="h-auto w-[180px] object-contain sm:w-[210px]"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#C9BBAF]">
              ShubhVivah is India&apos;s premier luxury wedding marketplace, bringing together
              extraordinary heritage venues, renowned bridal artists, and master planners
              to craft your eternal celebration.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#321B30] text-[#D6B875] transition-all hover:border-[#B08D45] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#321B30] text-[#D6B875] transition-all hover:border-[#B08D45] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#321B30] text-[#D6B875] transition-all hover:border-[#B08D45] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F8F1E5]">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Wedding Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/real-weddings"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Real Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Member Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Wedding Inspiration Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Wedding Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F8F1E5]">
              Top Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/wedding-vendors/wedding-photography"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Wedding Photographers
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-vendors/bridal-makeup-artist"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Bridal Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-vendors/decoration"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Mandap &amp; Theme Decor
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-vendors/wedding-planner"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Wedding Planners
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-vendors/bridal-groom-wear"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Bridal &amp; Groom Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-vendors/mehndi-artist"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Mehndi Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/venues/heritage-palaces"
                  className="text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  Heritage Palaces &amp; Forts
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors/register"
                  className="inline-flex items-center gap-1 text-[#C9BBAF] transition-colors hover:text-[#D6B875]"
                >
                  <Sparkles size={14} className="text-[#C9BBAF]" />
                  <span>Join as a Vendor</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F8F1E5]">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#C9BBAF]">
              <li className="flex items-start gap-2.5">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#C9BBAF]" />
                <span>Connaught Place, New Delhi &amp; BKC, Mumbai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={17} className="shrink-0 text-[#C9BBAF]" />
                <span>+91 00000 0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={17} className="shrink-0 text-[#C9BBAF]" />
                <span>shubhvivah171@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>  

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#665038]/40 pt-8 text-center text-xs text-[#C9BBAF]/80 sm:flex-row">
          <p>© 2026 ShubhVivah. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={13} className="text-[#B08D45]" fill="#B08D45" /> for your perfect wedding journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
