import Link from "next/link";
import Image from "next/image";
import { Droplets, ArrowLeft, Phone, MapPin, Star, ShieldCheck, Truck } from "lucide-react";

export const metadata = {
  title: "Water Camper Suppliers | ShubhVivah",
  description: "Reliable and hygienic cold drinking water camper suppliers for weddings and events.",
};

const suppliers = [
  {
    name: "Ganga Jal Chilled Water Services",
    location: "Jaipur, Rajasthan",
    rating: 4.8,
    reviews: 64,
    capacity: "20L RO Chilled Campers & Dispenser Setups",
    price: "From ₹40 / camper",
    phone: "+91 98290 12345",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    tag: "Most Popular",
  },
  {
    name: "Neer Fresh Event Water Supply",
    location: "Udaipur, Rajasthan",
    rating: 4.9,
    reviews: 92,
    capacity: "Bulk Campers, Ice Cubes & Mineral Bottles",
    price: "From ₹45 / camper",
    phone: "+91 98291 54321",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
    tag: "High Purity RO",
  },
  {
    name: "Shree Ram Purified Water Supply",
    location: "Jodhpur, Rajasthan",
    rating: 4.7,
    reviews: 53,
    capacity: "20L Campers & On-site Dispensing Stalls",
    price: "From ₹38 / camper",
    phone: "+91 98293 67890",
    image: "https://images.unsplash.com/photo-1559839914-1b34645a3803?auto=format&fit=crop&w=800&q=80",
    tag: "Fast Venue Delivery",
  },
];

export default function WaterCamperSuppliersPage() {
  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Banner with Water Camper theme */}
        <div className="relative overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30]/80 p-8 sm:p-10 mb-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#241321]/80 px-3.5 py-1 text-xs font-semibold text-[#D6B875] mb-4">
              <Droplets size={14} className="text-[#D6B875]" /> Wedding Catering Essentials
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
              Water Camper Suppliers
            </h1>
            <p className="text-sm sm:text-base text-[#C9BBAF] leading-relaxed mb-6">
              Hygienic, 100% RO-purified chilled drinking water campers, dispensers, and bulk ice delivery directly to wedding venues & marriage gardens.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#F8F1E5]">
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <ShieldCheck size={14} className="text-[#D6B875]" /> Sealed & Sanitized Campers
              </span>
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Truck size={14} className="text-[#D6B875]" /> On-Time Venue Delivery
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl pointer-events-none" />
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((s, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D6B875] hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#241321]">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#321B30] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 rounded-full bg-[#241321]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D6B875] border border-[#665038]">
                  {s.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-[#F8F1E5] bg-[#B08D45] px-2.5 py-1 rounded-md">
                  {s.price}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#241321] px-2.5 py-1 text-xs font-semibold text-[#D6B875]">
                    <Star size={12} className="fill-[#D6B875]" /> {s.rating} ({s.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#C9BBAF]">
                    <MapPin size={13} className="text-[#B08D45]" /> {s.location}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F8F1E5] mb-2 group-hover:text-[#D6B875] transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BBAF] mb-5 line-clamp-2">
                  {s.capacity}
                </p>

                <a
                  href={`tel:${s.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-2.5 px-4 text-sm font-semibold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] hover:shadow-lg hover:shadow-[#D6B875]/20"
                >
                  <Phone size={15} /> Call & Order Campers
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
