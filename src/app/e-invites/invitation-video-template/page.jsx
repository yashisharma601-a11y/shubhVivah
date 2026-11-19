import Link from "next/link";
import Image from "next/image";
import { Video, ArrowLeft, Phone, MapPin, Star, PlayCircle, Film, Music } from "lucide-react";

export const metadata = {
  title: "Invitation Video Templates | ShubhVivah",
  description: "Cinematic wedding invitation video templates, Save the Date animations, royal 3D motion graphics.",
};

const videoTemplates = [
  {
    name: "Royal Palace 3D Animated Video Invite",
    location: "Online / Pan India",
    rating: 4.9,
    reviews: 215,
    details: "Grand Rajasthan palace entry animation, Shehnai background score, couple photo reveals & ceremony schedule",
    price: "From ₹1,499 / video",
    phone: "+91 98290 99443",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tag: "3D Royal Palace",
  },
  {
    name: "Modern Minimalist Save The Date Reel",
    location: "Online / Pan India",
    rating: 4.8,
    reviews: 160,
    details: "Vertical 9:16 Instagram reel format, typography animation, pre-wedding photoshoot integration & song sync",
    price: "From ₹999 / video",
    phone: "+91 98291 33221",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    tag: "Instagram Reel 9:16",
  },
  {
    name: "Traditional Vedic Mantra Motion Invite",
    location: "Online / Pan India",
    rating: 4.9,
    reviews: 130,
    details: "Ganpati Vandana, sacred Sanskrit shlokas, traditional Kalash animations & ceremony event cards",
    price: "From ₹1,299 / video",
    phone: "+91 98294 66778",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    tag: "Traditional & Mantra",
  },
];

export default function InvitationVideoTemplatePage() {
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
              <Video size={14} className="text-[#D6B875]" /> Cinematic Invitations
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F1E5] mb-3">
              Invitation Video Templates
            </h1>
            <p className="text-sm sm:text-base text-[#C9BBAF] leading-relaxed mb-6">
              Browse cinematic wedding video templates, 3D palace walkthroughs, Save-the-Date video teasers, and Instagram reels personalized with your photos, music, and wedding schedule.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#F8F1E5]">
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Film size={14} className="text-[#D6B875]" /> Full HD 1080p & 4K Quality
              </span>
              <span className="flex items-center gap-1.5 bg-[#241321] px-3 py-1.5 rounded-lg border border-[#665038]">
                <Music size={14} className="text-[#D6B875]" /> Custom Bollywood & Folk Audio
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl pointer-events-none" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTemplates.map((v, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30]/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D6B875] hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#241321]">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#321B30] via-transparent to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B08D45]/90 text-[#241321] shadow-lg shadow-black/50 transition-transform duration-200 group-hover:scale-110">
                    <PlayCircle size={24} className="fill-[#241321] text-[#D6B875]" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 rounded-full bg-[#241321]/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#D6B875] border border-[#665038]">
                  {v.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-[#F8F1E5] bg-[#B08D45] px-2.5 py-1 rounded-md">
                  {v.price}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#241321] px-2.5 py-1 text-xs font-semibold text-[#D6B875]">
                    <Star size={12} className="fill-[#D6B875]" /> {v.rating} ({v.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#C9BBAF]">
                    <MapPin size={13} className="text-[#B08D45]" /> {v.location}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-[#F8F1E5] mb-2 group-hover:text-[#D6B875] transition-colors">
                  {v.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BBAF] mb-5 line-clamp-2">
                  {v.details}
                </p>

                <a
                  href={`tel:${v.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#B08D45] py-2.5 px-4 text-sm font-semibold text-[#241321] transition-all duration-200 hover:bg-[#D6B875] hover:shadow-lg hover:shadow-[#D6B875]/20"
                >
                  <Phone size={15} /> Order Video Template
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

