import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Phone, MapPin, Star, Sparkles, Palette, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Wedding Card Designers | ShubhVivah",
  description: "Bespoke royal wedding invitation card designers, luxury box invites, and customized wedding stationery.",
};

const designers = [
  {
    name: "Royal Heritage Invitation Studio",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviews: 128,
    specialty: "Handcrafted velvet box cards, gold foil embossing & Rajputana royal scrolls",
    price: "From ₹150 / card",
    phone: "+91 98290 11223",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    tag: "Royal Box Invites",
  },
  {
    name: "Kankupatri & Luxe Wedding Cards",
    location: "Udaipur, Rajasthan",
    rating: 4.8,
    reviews: 94,
    specialty: "Traditional Sanskrit Shloka Kankupatri, laser-cut acrylic cards & sweet boxes",
    price: "From ₹90 / card",
    phone: "+91 98291 44556",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    tag: "Traditional & Laser Cut",
  },
  {
    name: "Shree Arts Bespoke Stationery",
    location: "Jodhpur, Rajasthan",
    rating: 4.7,
    reviews: 73,
    specialty: "Handmade seed paper eco-friendly invites, wax seals & calligraphy envelopes",
    price: "From ₹120 / card",
    phone: "+91 98293 77889",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    tag: "Eco & Wax Seal",
  },
];

export default function WeddingCardDesignerPage() {
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
              <Mail size={14} className="text-[#D6B875]" /> Luxury Invitation Suite
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
              Wedding Card Designers
            </h1>
            <p className="text-sm sm:text-base text-[#C9BBAF] leading-relaxed mb-6">
              Discover top wedding card designers for traditional royal Kankupatri, gold foiled luxury boxed invitations, laser-cut acrylic invites, and bespoke calligraphed stationery.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#F8F1E5]">
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Palette size={14} className="text-[#D6B875]" /> Custom Monograms & Wax Seals
              </span>
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <CheckCircle2 size={14} className="text-[#D6B875]" /> Premium Card Stock & Box Packaging
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl pointer-events-none" />
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designers.map((d, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D6B875] hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#241321]">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#321B30] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 rounded-full bg-[#241321]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D6B875] border border-[#665038]">
                  {d.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-[#F8F1E5] bg-[#B08D45] px-2.5 py-1 rounded-md">
                  {d.price}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#241321] px-2.5 py-1 text-xs font-semibold text-[#D6B875]">
                    <Star size={12} className="fill-[#D6B875]" /> {d.rating} ({d.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#C9BBAF]">
                    <MapPin size={13} className="text-[#B08D45]" /> {d.location}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F8F1E5] mb-2 group-hover:text-[#D6B875] transition-colors">
                  {d.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BBAF] mb-5 line-clamp-2">
                  {d.specialty}
                </p>

                <a
                  href={`tel:${d.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-2.5 px-4 text-sm font-semibold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] hover:shadow-lg hover:shadow-[#D6B875]/20"
                >
                  <Phone size={15} /> Contact Designer
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

