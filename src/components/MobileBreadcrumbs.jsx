"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

/**
 * Route labels map for custom naming and navigation hierarchy
 */
const ROUTE_LABELS = {
  // Main Sections
  venues: "Venues",
  vendors: "Wedding Vendors",
  "wedding-vendors": "Wedding Vendors",
  suppliers: "Suppliers",
  "e-invites": "E-Invitations",
  blog: "Wedding Inspiration",
  "real-weddings": "Real Weddings",
  contact: "Contact Us",

  // Venues subpages
  "banquet-halls": "Banquet Halls",
  "destination-weddings": "Destination Weddings",
  "heritage-palaces": "Heritage Palaces",

  // Wedding vendors subpages
  caterers: "Caterers",
  "wedding-photography": "Wedding Photography",
  "bridal-makeup-artist": "Bridal Makeup",
  decoration: "Decoration",
  "wedding-planner": "Wedding Planners",
  "bridal-groom-wear": "Bridal & Groom Wear",
  "mehndi-artist": "Mehndi Artists",

  // Vendor Registration / List business
  register: "List Your Business",

  // Suppliers subpages
  "cylinder-suppliers": "Cylinder Suppliers",
  "dairy-products": "Dairy Products",
  "vegetable-supplier": "Vegetable Suppliers",
  "water-camper": "Water Camper",

  // E-invites subpages
  "e-invitation-card-design": "E-Invitation Cards",
  "invitation-video-template": "Video Templates",
  "wedding-card-designer": "Card Designer",
};

/**
 * Routes where breadcrumbs should NOT appear
 */
const EXCLUDED_ROUTES = [
  "/",
  "/login",
  "/forgot-password",
  "/admin",
];

const EXCLUDED_PREFIXES = [
  "/dashboard",
  "/api",
];

export default function MobileBreadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  // Check if current route should be excluded
  if (EXCLUDED_ROUTES.includes(pathname)) return null;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  // Split paths into non-empty segments
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Build breadcrumbs array
  const breadcrumbItems = [];

  // 1. Root Home
  breadcrumbItems.push({
    label: "Home",
    href: "/",
    isCurrent: false,
  });

  // 2. Build cumulative breadcrumbs
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;
    const isLast = i === segments.length - 1;

    // Determine human-readable label
    let label = ROUTE_LABELS[segment];

    if (!label) {
      // If segment is inside vendors or venues (e.g. vendor registration under /vendors/register)
      if (segments[0] === "vendors" && segment === "register") {
        label = "List Your Business";
      } else if (segments[0] === "venues" && isLast && !ROUTE_LABELS[segment]) {
        // Dynamic venue slug e.g. /venues/grand-palace-banquet
        label = segment
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      } else {
        // Fallback title formatting
        label = segment
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      }
    }

    breadcrumbItems.push({
      label,
      href: currentPath,
      isCurrent: isLast,
    });
  }

  return (
    <nav
      aria-label="Mobile Breadcrumb"
      className="block lg:hidden w-full border-b border-[#665038]/30 bg-[#2B1527]/95 px-4 py-2.5 backdrop-blur-sm shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs no-scrollbar">
        {breadcrumbItems.map((item, index) => {
          const isFirst = index === 0;

          return (
            <div key={item.href || index} className="flex items-center gap-1.5 shrink-0">
              {!isFirst && (
                <ChevronRight size={13} className="text-[#B08D45]/70 shrink-0 select-none" />
              )}

              {item.isCurrent ? (
                <span
                  aria-current="page"
                  className="font-medium text-[#F8F1E5] truncate max-w-[190px] sm:max-w-[280px]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-[#C9BBAF] transition-colors hover:text-[#D6B875] hover:underline"
                >
                  {isFirst && <Home size={12} className="text-[#B08D45]/90 mb-0.5" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
