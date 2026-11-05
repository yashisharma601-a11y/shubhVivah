import Link from "next/link";
import Image from "next/image";
import { Carrot, ArrowLeft, Phone, MapPin, Star, Sparkles, Truck } from "lucide-react";

export const metadata = {
  title: "Vegetable Suppliers | ShubhVivah",
  description: "Fresh mandi vegetables, exotic fruits, salad greens, and bulk produce for wedding functions.",
};

const suppliers = [
  {
    name: "Kisan Mandi Fresh Veg & Fruits",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviews: 142,
    details: "Grade-A fresh vegetables, exotic broccoli, bell peppers, baby corn, fresh herbs & seasonal fruits directly from farms",
    price: "Daily Mandi Rates",
    phone: "+91 98290 33412",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tag: "Direct Farm Fresh",
  },
  {
    name: "Green Basket Wedding Produce",
    location: "Udaipur, Rajasthan",
    rating: 4.8,
    reviews: 89,
    details: "Hygienically washed & pre-sorted vegetables, peeled baby potatoes, cut salads & banquet fruit displays",
    price: "Custom Banquet Lots",
    phone: "+91 98292 99182",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
    tag: "Sorted & Washed Produce",
  },
  {
    name: "Shri Mahaveer Sabzi Bhandar",
    location: "Jodhpur, Rajasthan",
    rating: 4.7,
    reviews: 67,
    details: "Bulk sack supplies of onion, potato, tomato, cauliflower, peas & coriander for mega wedding dinners",
    price: "Wholesale Mandi Pricing",
    phone: "+91 98293 44556",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    tag: "Heavy Bulk Mandi Sacks",
  },
];

export default function VegetableSuppliersPage() {
  return (
    <div className="min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#D6B875] hover:text-[#B08D45] mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Hero Banner with Vegetables theme */}
        <div className="relative overflow-hidden rounded-3xl border border-[#665038] bg-[#321B30]/80 p-8 sm:p-10 mb-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B08D45]/40 bg-[#241321]/80 px-3.5 py-1 text-xs font-semibold text-[#D6B875] mb-4">
              <Carrot size={14} className="text-[#D6B875]" /> Farm Fresh Wedding Kitchen Produce
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
              Vegetable Suppliers
            </h1>
            <p className="text-sm sm:text-base text-[#C9BBAF] leading-relaxed mb-6">
              Hand-picked fresh mandi vegetables, exotic salad produce, mushrooms, baby corn, seasonal fruits, and bulk potato/onion crates delivered right into your catering setup before dawn.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#F8F1E5]">
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Sparkles size={14} className="text-[#D6B875]" /> 100% Farm-Fresh & Sorted
              </span>
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Truck size={14} className="text-[#D6B875]" /> Early Morning Venue Delivery
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
                  {s.details}
                </p>

                <a
                  href={`tel:${s.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-2.5 px-4 text-sm font-semibold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] hover:shadow-lg hover:shadow-[#D6B875]/20"
                >
                  <Phone size={15} /> Order Bulk Vegetables
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
