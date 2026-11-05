import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import {
  Camera,
  MapPin,
  Sparkles,
  ArrowRight,
  Flower2,
  CalendarDays,
  Shirt,
  Star,
  CheckCircle2,
  Bookmark,
  Clock,
} from "lucide-react";

const weddingServices = [
  {
    title: "Heritage Venues & Palaces",
    description:
      "Explore royal palaces, luxury forts, grand banquet halls, and idyllic beachside wedding destinations.",
    icon: MapPin,
    href: "/venues",
    tag: "3,200+ Venues",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Candid Photography",
    description:
      "Preserve emotional rituals, royal celebrations, and timeless portraits with India&apos;s finest photographers.",
    icon: Camera,
    href: "/wedding-vendors/wedding-photography",
    tag: "Verified Portfolios",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Bridal Makeup & Hair",
    description:
      "Look radiant with top bridal makeup artists, luxury hair stylists, and traditional draping experts.",
    icon: Sparkles,
    href: "/wedding-vendors/bridal-makeup-artist",
    tag: "Celebrity Artists",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Mandap & Floral Decor",
    description:
      "Transform your wedding space into a royal realm with bespoke mandap themes, fairy lights, and florals.",
    icon: Flower2,
    href: "/wedding-vendors/decoration",
    tag: "Custom Themes",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Wedding Planners",
    description:
      "End-to-end luxury wedding coordination, guest hospitality, vendor management, and seamless execution.",
    icon: CalendarDays,
    href: "/wedding-vendors/wedding-planner",
    tag: "Full Coordination",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Bridal & Groom Couture",
    description:
      "Discover bespoke bridal lehengas, royal sherwanis, heritage jewelry, and curated trousseau stylists.",
    icon: Shirt,
    href: "/wedding-vendors/bridal-groom-wear",
    tag: "Designer Trousseau",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
];

const featuredVendors = [
  {
    name: "Taj Lake Palace Heritage",
    category: "Palace Venue",
    location: "Udaipur, Rajasthan",
    rating: 4.9,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    href: "/venues/taj-lake-palace",
  },
  {
    name: "Stories by Joseph & Radhika",
    category: "Candid Photography",
    location: "Mumbai & Destination",
    rating: 5.0,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    href: "/vendors/stories-photography",
  },
  {
    name: "Amara Floral & Set Design",
    category: "Wedding Decorator",
    location: "New Delhi & NCR",
    rating: 4.8,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    href: "/vendors/amara-decor",
  },
];

const blogArticles = [
  {
    title: "10 Heritage Forts in Rajasthan for a Royal Winter Wedding",
    category: "Venues & Destinations",
    readTime: "5 min read",
    date: "October 2026",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    href: "/blog/heritage-forts-rajasthan",
  },
  {
    title: "The Ultimate Bridal Trousseau Checklist for Modern Brides",
    category: "Bridal Style",
    readTime: "7 min read",
    date: "October 2026",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    href: "/blog/bridal-trousseau-checklist",
  },
  {
    title: "Timeless Mandap Decor Trends: Marigold, Brass & Velvet",
    category: "Decor Ideas",
    readTime: "4 min read",
    date: "September 2026",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    href: "/blog/mandap-decor-trends",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#241321] text-[#F8F1E5]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Wedding Services Section (Plum Background + Plum Charcoal Cards) */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Curated Wedding Services
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl md:text-5xl">
              Everything for Your{" "}
              <span className="text-[#D6B875]">Sacred Union</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#C9BBAF] sm:text-base">
              From majestic palaces and grand banquets to renowned wedding photographers
              and bridal stylists, discover trusted partners for every ritual.
            </p>
          </div>

          {/* Service Cards Grid (6 Services) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {weddingServices.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  href={service.href}
                  key={service.title}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#B08D45]/30 bg-[#1F0E1D] overflow-hidden shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6B875] hover:shadow-[0_12px_35px_rgba(176,141,69,0.22)] h-full cursor-pointer"
                >
                  {/* Top Image Banner with Royal Dark Gradient Overlay */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#241321]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Dark Plum Gradient Overlays for optimal readability & royal luxury */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E1D] via-[#1F0E1D]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                      {/* Golden Icon Badge */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B08D45]/60 bg-[#1F0E1D]/85 text-[#E5C583] shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-[#D6B875] group-hover:bg-[#B08D45] group-hover:text-[#1F0E1D] group-hover:scale-105">
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      {/* Category Tag Pill */}
                      <span className="rounded-full border border-[#B08D45]/40 bg-[#1F0E1D]/85 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#E8D9B5] backdrop-blur-md shadow-sm">
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Body & Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F8F1E5] transition-colors duration-200 group-hover:text-[#E5C583]">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#C9BBAF]">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Action Footer with Explore Category button */}
                    <div className="pt-4 border-t border-[#B08D45]/20 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#E5C583] transition-colors group-hover:text-[#F8F1E5] flex items-center gap-1.5">
                        <span>Explore Category</span>
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#B08D45] group-hover:text-[#E5C583]"
                        />
                      </span>

                      <span className="text-[11px] font-medium text-[#C9BBAF]/70 uppercase tracking-widest group-hover:text-[#B08D45] transition-colors">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Real Weddings Showcase (Dark Aubergine Editorial Section) */}
      <section className="border-y border-[#665038]/40 bg-[#321B30] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Content Column */}
          <div>
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Real Love Stories
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#F8F1E5] sm:text-4xl md:text-5xl">
              Inspired by Authentic{" "}
              <span className="text-[#D6B875]">Indian Weddings</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-[#C9BBAF]">
              Explore genuine wedding celebrations, royal palace ceremonies, creative decor
              motifs, bridal couture inspiration, and timeless traditions captured across India.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[#F8F1E5]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-[#B08D45]" />
                <span>Over 1,200+ curated photo stories from real brides &amp; grooms</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-[#B08D45]" />
                <span>Verified vendor tags to directly book the same artists</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-[#B08D45]" />
                <span>Real budgets, vendor reviews, and planning timelines</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/real-weddings"
                className="inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-7 py-3.5 text-sm font-semibold text-[#241321] transition-all hover:bg-[#D6B875]"
              >
                <span>View Real Weddings</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[#665038] bg-transparent px-6 py-3.5 text-sm font-medium text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:bg-[#3A2638]"
              >
                <span>Read Wedding Stories</span>
              </Link>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="relative">
            {/* Ambient Gold Glow */}
            <div className="absolute -right-4 -top-4 h-36 w-36 rounded-full bg-[#B08D45]/15 blur-2xl" />

            {/* Main Showcase Image */}
            <div className="relative overflow-hidden rounded-2xl border border-[#665038] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury Indian Wedding Mandap Decor"
                className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241321] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Luxury Story Badge */}
            <div className="absolute -bottom-6 left-4 right-4 rounded-xl border border-[#665038] bg-[#3A2638] p-5 shadow-2xl sm:left-8 sm:right-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#665038] bg-[#241321] text-[#B08D45]">
                  <Bookmark size={20} />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F8F1E5]">
                    Dev &amp; Ananya&apos;s Royal Wedding
                  </h3>
                  <p className="text-xs text-[#C9BBAF]">
                    City Palace, Udaipur • Photographed by Joseph &amp; Radhika
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Vendors Section (Warm Ivory Light Contrast Section) */}
      <section className="bg-[#F7F1E7] px-4 py-16 text-[#392B31] sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header on Light Ivory */}
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[#B08D45]/40 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#B08D45]">
              Handpicked Excellence
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-[#392B31] sm:text-4xl md:text-5xl">
              Featured Wedding Professionals
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#392B31]/80 sm:text-base">
              Personally vetted artists and luxury venues with exceptional service standards
              and verified couple testimonials.
            </p>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVendors.map((vendor) => (
              <Link
                key={vendor.name}
                href={vendor.href}
                className="group overflow-hidden rounded-2xl border border-[#665038]/20 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[#241321]/80 px-3 py-1 text-xs font-semibold text-[#E8D9B5] backdrop-blur-xs">
                    {vendor.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-[#392B31]/75">
                      <MapPin size={13} className="text-[#B08D45]" />
                      {vendor.location}
                    </span>

                    <span className="flex items-center gap-1 rounded-md bg-[#F7F1E7] px-2 py-0.5 text-xs font-bold text-[#392B31]">
                      <Star size={12} className="fill-[#B08D45] text-[#B08D45]" />
                      {vendor.rating} ({vendor.reviews})
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-xl font-bold text-[#392B31] transition-colors group-hover:text-[#B08D45]">
                    {vendor.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-[#B08D45]">
                    <span>View Profile &amp; Pricing</span>
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 rounded-full border border-[#B08D45] bg-[#321B30] px-7 py-3 text-sm font-semibold text-[#F8F1E5] transition-all hover:bg-[#241321]"
            >
              <span>Explore All Verified Vendors</span>
              <ArrowRight size={15} className="text-[#D6B875]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Wedding Inspiration Blog Section (Deep Plum) */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Inspiration &amp; Advice
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl md:text-5xl">
              The Wedding Editorial
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#C9BBAF] sm:text-base">
              Expert advice, bridal styling trends, venue guides, and insider planning wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {blogArticles.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#665038]/50 bg-[#3A2638]/70 shadow-lg transition-all duration-300 hover:border-[#B08D45] hover:bg-[#3A2638]"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-[#241321]/85 px-3 py-1 text-xs font-semibold text-[#E8D9B5] backdrop-blur-xs">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#C9BBAF]">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#B08D45]" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                      {article.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B08D45] group-hover:text-[#D6B875]">
                    Read Story
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call-to-Action Section (Deep Plum + Subtle Antique Gold Border) */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30] px-6 py-16 text-center shadow-2xl shadow-black/60 sm:px-16 sm:py-20">
          <div className="relative z-10">
            <span className="mx-auto mb-4 inline-flex items-center justify-center rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
              Begin Your Forever Story
            </span>

            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl md:text-5xl">
              Discover the People &amp; Places for an Unforgettable Day
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#C9BBAF] sm:text-base">
              Connect directly with India&apos;s most verified luxury wedding venues,
              bridal designers, makeup artists, and coordinators.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vendors"
                className="inline-flex items-center gap-2 rounded-full bg-[#B08D45] px-8 py-3.5 text-sm font-semibold text-[#241321] shadow-lg transition-all hover:bg-[#D6B875]"
              >
                <span>Explore Wedding Vendors</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/vendors/register"
                className="inline-flex items-center gap-2 rounded-full border border-[#B08D45] bg-[#241321] px-7 py-3.5 text-sm font-medium text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              >
                <span>List Your Business</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
