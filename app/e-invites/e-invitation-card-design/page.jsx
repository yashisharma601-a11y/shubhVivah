import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft, Phone, MapPin, Star, Smartphone, Download, Share2 } from "lucide-react";

export const metadata = {
  title: "E-Invitation Card Design | ShubhVivah",
  description: "Digital wedding invitation cards, WhatsApp PDF/JPEG invites, animated interactive wedding websites.",
};

const templates = [
  {
    name: "Royal Mughal Caricature E-Card",
    location: "Online / Pan India",
    rating: 4.9,
    reviews: 182,
    details: "Illustrated couple portraits, multi-page WhatsApp cards, clickable Google Maps venue links & RSVP buttons",
    price: "From ₹999 / set",
    phone: "+91 98290 88771",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    tag: "Couple Caricature",
  },
  {
    name: "Golden Flora Digital Invites",
    location: "Online / Pan India",
    rating: 4.8,
    reviews: 145,
    details: "Elegant gold mandala, royal botanical motifs, PDF & PNG formats tailored for instant WhatsApp sharing",
    price: "From ₹699 / set",
    phone: "+91 98292 23344",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    tag: "Instant Delivery",
  },
  {
    name: "Vivah Interactive Web Invites",
    location: "Online / Pan India",
    rating: 4.9,
    reviews: 110,
    details: "Exclusive single-page mobile wedding website with music, photo gallery, love story & interactive RSVP",
    price: "From ₹1,999 / website",
    phone: "+91 98294 55667",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    tag: "Interactive Webpage",
  },
];

export default function EInvitationCardDesignPage() {
  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30]/80 p-8 sm:p-10 mb-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#241321]/80 px-3.5 py-1 text-xs font-semibold text-[#D6B875] mb-4">
              <Smartphone size={14} className="text-[#D6B875]" /> Digital Wedding Cards
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
              E-Invitation Card Design
            </h1>
            <p className="text-sm sm:text-base text-[#C9BBAF] leading-relaxed mb-6">
              Create stunning digital wedding invitation cards ready for WhatsApp, Instagram, and email. Includes clickable Google Maps venue links, music, and customized couple caricatures.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#F8F1E5]">
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Share2 size={14} className="text-[#D6B875]" /> WhatsApp & PDF Ready
              </span>
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Download size={14} className="text-[#D6B875]" /> 24-Hour Fast Delivery
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl pointer-events-none" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D6B875] hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#241321]">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#321B30] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 rounded-full bg-[#241321]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D6B875] border border-[#665038]">
                  {t.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-[#F8F1E5] bg-[#B08D45] px-2.5 py-1 rounded-md">
                  {t.price}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#241321] px-2.5 py-1 text-xs font-semibold text-[#D6B875]">
                    <Star size={12} className="fill-[#D6B875]" /> {t.rating} ({t.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#C9BBAF]">
                    <MapPin size={13} className="text-[#B08D45]" /> {t.location}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F8F1E5] mb-2 group-hover:text-[#D6B875] transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BBAF] mb-5 line-clamp-2">
                  {t.details}
                </p>

                <a
                  href={`tel:${t.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-2.5 px-4 text-sm font-semibold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] hover:shadow-lg hover:shadow-[#D6B875]/20"
                >
                  <Phone size={15} /> Customize This E-Card
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

