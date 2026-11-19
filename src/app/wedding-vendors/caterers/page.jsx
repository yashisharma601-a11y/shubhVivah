"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Sparkles,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Eye,
  UtensilsCrossed,
  ArrowRight,
  Star,
  Send,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";

// =========================================================================
// CURATED WEDDING CATERING VENDORS FOR SHUBHVIVAH
// =========================================================================
const CURATED_CATERERS = [
  {
    id: "vendor-104-manish-caterer",
    name: "Manish Caterer",
    company: "Manish Caterer (Royal Caterer)",
    categoryType: "Caterer",
    city: "Lucknow",
    location: "Lucknow, Uttar Pradesh",
    priceStarting: 90000,
    priceDisplay: "₹90,000",
    priceRange: "₹90,000 – ₹2,50,000",
    experience: "6+ Years Experience",
    rating: 5.0,
    reviewCount: 18,
    badge: "Verified Caterer",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    ],
    services: [
      "Royal Caterer",
      "Live Food Counters",
      "Authentic Awadhi & North Indian Feast",
      "Special Wedding Dastarkhwan",
      "Dessert & Kulfi Bar",
    ],
    highlights: [
      "Pure Desi Ghee Preparations",
      "Live Tandoor & Chaat Counters",
      "Uniformed Service Staff & Executive Chefs",
    ],
    about:
      "Where Every Bite Becomes a Beautiful Memory. Manish Caterer is a premier Lucknow catering service delivering royal Awadhi, Mughlai, and multi-cuisine wedding feasts with authentic flavors and royal table service.",
    packageIncludes: [
      "Complete Royal Wedding Buffet (Live Starters, Main Course, Desserts)",
      "Uniformed Hospitality Stewards & Service Crew",
      "Designer Chafing Dishes, Cutlery & Buffet Scaping",
      "Dedicated On-Site Event Coordinator",
    ],
    vendorContact: {
      phone: "+91 74174 99974",
      email: "joshiji.02299@gmail.com",
      address: "404, Crystal Court, Malviya Nagar, Lucknow",
    },
  },
  {
    id: "royal-rajputana-caterers",
    name: "Royal Rajputana Dastarkhwan",
    company: "Royal Rajputana Banquets & Catering Co.",
    categoryType: "Royal Rajputana & Mughlai Catering",
    city: "Jaipur",
    location: "Jaipur & Delhi NCR",
    priceStarting: 120000,
    priceDisplay: "₹1,20,000",
    priceRange: "₹1,20,000 – ₹4,50,000",
    experience: "14+ Years Experience",
    rating: 4.9,
    reviewCount: 156,
    badge: "Royal Feast Specialist",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ],
    services: [
      "Royal Rajputana Thali",
      "Live Chaat & Street Counter",
      "Authentic Awadhi Dum Biryani",
      "Custom Dessert Studio",
      "Silverware & Chafing Presentation",
    ],
    highlights: [
      "Live Tandoor & Barbeque Counters",
      "Silver Cutlery & Royal Table Service",
      "Pure Desi Ghee Preparations",
    ],
    about:
      "Renowned across Rajasthan and Delhi NCR for regal grand wedding feasts. Specializing in traditional royal Rajasthani recipes, Awadhi delicacies, and multi-cuisine luxury banquets.",
    packageIncludes: [
      "Multi-Cuisine Buffet (8 Starters, 12 Mains, 6 Desserts)",
      "Uniformed Hospitality Stewards & Chefs",
      "Designer Chafing Dishes & Copper Urns",
      "Live Cooking Theatres & Beverage Bars",
      "HACCP Certified Hygiene & Food Safety",
    ],
  },
  {
    id: "awadh-royal-kitchens",
    name: "Grand Awadh Gourmet Catering",
    company: "Awadh Royal Hospitality",
    categoryType: "Awadhi & North Indian Catering",
    city: "Lucknow",
    location: "Lucknow & Kanpur",
    priceStarting: 95000,
    priceDisplay: "₹95,000",
    priceRange: "₹95,000 – ₹3,20,000",
    experience: "11+ Years Experience",
    rating: 4.9,
    reviewCount: 138,
    badge: "Heritage Gourmet",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80",
    ],
    services: [
      "Dum Pukht Specialists",
      "Galouti & Kakori Counters",
      "Shahi Sheermal & Roomali Roti",
      "Kulfi Falooda Display",
    ],
    highlights: [
      "Authentic Lucknawi Flavors",
      "Vintage Copper Handis",
      "Master Bawarchis of Chowk",
    ],
    about:
      "Bringing the authentic culinary heritage of Nawabs to high-profile Indian weddings. Master Bawarchis using traditional slow-cooking Dum techniques.",
    packageIncludes: [
      "Traditional Dum Pukht Feast Counters",
      "Kabab Theatres with Live Parathas",
      "Signature Shahi Tukda & Phirni Stations",
      "Exquisite Table Scaping & Copper Décor",
    ],
  },
  {
    id: "satvik-delights-catering",
    name: "Satvik Amrit Pure Veg Gourmet",
    company: "Satvik Amrit Hospitality Pvt Ltd",
    categoryType: "Pure Vegetarian & Jain Catering",
    city: "Delhi",
    location: "Delhi NCR & Jaipur",
    priceStarting: 80000,
    priceDisplay: "₹80,000",
    priceRange: "₹80,000 – ₹2,90,000",
    experience: "8+ Years Experience",
    rating: 4.8,
    reviewCount: 95,
    badge: "100% Pure Veg & Jain",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    ],
    services: [
      "Pure Vegetarian Gourmet",
      "Strict Jain Food Counter",
      "Marwari & Gujarati Thali",
      "Organic Salad & Smoothie Bar",
    ],
    highlights: [
      "Separate Dedicated Jain Kitchen Setup",
      "Organic Farm Produce",
      "Artisan Mithai Tasting Lounge",
    ],
    about:
      "Premier pure-vegetarian wedding caterer trusted by Jain, Marwari, and Gujarati families for strictly separated preparation spaces, pure ghee sweets, and international fusion counters.",
    packageIncludes: [
      "Exclusive No-Onion No-Garlic Stations",
      "Live Wood-Fired Neapolitan Pizza & Pasta",
      "Rajasthani Dal Baati Churma Experience",
      "Handcrafted Silver Leaf Sweets",
    ],
  },
];

const CITIES = [
  "All Cities",
  "Lucknow",
  "Delhi",
  "New Delhi",
  "Jaipur",
  "Udaipur",
  "Noida",
  "Mumbai",
];

const CATERING_SERVICES_LIST = [
  "All Services",
  "Royal Rajputana & Mughlai Catering",
  "Awadhi & North Indian Catering",
  "Pure Vegetarian & Jain Catering",
  "Live Food Counters",
  "Dessert & Mithai Counters",
  "Caterer",
];

export default function WeddingCaterersPage() {
  const [dynamicVendors, setDynamicVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadVendors() {
      try {
        const res = await fetch("/api/vendors?category=caterer");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.listings)) {
          setDynamicVendors(data.listings);
        }
      } catch (err) {
        console.error("Failed to load registered caterers:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadVendors();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals
  const [detailsModalVendor, setDetailsModalVendor] = useState(null);
  const [enquiryModalVendor, setEnquiryModalVendor] = useState(null);

  // Enquiry Form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    guests: "250",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Combine dynamic vendors (placed first) + curated caterers (deduplicate by id or company)
  const allCaterersList = useMemo(() => {
    const map = new Map();
    // Dynamic vendors first
    dynamicVendors.forEach((v) => {
      map.set(v.company?.toLowerCase() || v.name?.toLowerCase() || v.id, v);
    });
    // Curated vendors if not already present
    CURATED_CATERERS.forEach((v) => {
      const key = v.company?.toLowerCase() || v.name?.toLowerCase() || v.id;
      if (!map.has(key)) {
        map.set(key, v);
      }
    });
    return Array.from(map.values());
  }, [dynamicVendors]);

  const filteredCaterers = useMemo(() => {
    let result = allCaterersList.filter((vendor) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = vendor.name?.toLowerCase().includes(query);
        const matchesCompany = vendor.company?.toLowerCase().includes(query);
        const matchesCity = vendor.city?.toLowerCase().includes(query);
        const matchesCategory = vendor.categoryType?.toLowerCase().includes(query);
        const matchesService = Array.isArray(vendor.services) && vendor.services.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesCompany && !matchesCity && !matchesCategory && !matchesService) {
          return false;
        }
      }

      // City filter
      if (
        selectedCity !== "All Cities" &&
        !vendor.city?.toLowerCase().includes(selectedCity.toLowerCase()) &&
        !vendor.location?.toLowerCase().includes(selectedCity.toLowerCase())
      ) {
        return false;
      }

      // Service filter
      if (selectedService !== "All Services") {
        const matchesDirect = vendor.categoryType?.toLowerCase().includes(selectedService.toLowerCase());
        const matchesList = Array.isArray(vendor.services) && vendor.services.some((s) =>
          s.toLowerCase().includes(selectedService.toLowerCase())
        );
        if (!matchesDirect && !matchesList) return false;
      }

      // Budget filter
      if (selectedBudget === "under-1lakh" && vendor.priceStarting > 100000) return false;
      if (selectedBudget === "1lakh-2lakh" && (vendor.priceStarting < 100000 || vendor.priceStarting > 200000)) return false;
      if (selectedBudget === "above-2lakh" && vendor.priceStarting < 200000) return false;

      return true;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.priceStarting - b.priceStarting);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.priceStarting - a.priceStarting);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allCaterersList, searchTerm, selectedCity, selectedService, selectedBudget, sortBy]);

  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          guests: formData.guests,
          message: formData.message,
          target_id: enquiryModalVendor?.dbId || enquiryModalVendor?.id || 104,
          target_type: "vendor",
          target_name: enquiryModalVendor?.company || enquiryModalVendor?.name || "Manish Caterer",
          service_or_product: enquiryModalVendor?.name || "Royal caterer",
          budget: enquiryModalVendor?.priceDisplay || "₹90,000",
          location: enquiryModalVendor?.location || enquiryModalVendor?.city || "Lucknow",
          source: "Wedding Caterers Page",
          is_booking: true,
        }),
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setEnquiryModalVendor(null);
      setFormData({ name: "", phone: "", email: "", date: "", guests: "250", message: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#1A0B18] text-[#F8F1E5]">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 border-b border-[#B08D45]/20 bg-gradient-to-b from-[#241321] via-[#1A0B18] to-[#140812]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B08D45]/10 border border-[#B08D45]/30 text-[#D4AF37] text-xs font-medium uppercase tracking-widest mb-6">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Royal Wedding Catering & Dastarkhwan
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-[#F8F1E5] font-normal tracking-wide mb-4">
            Curated Wedding Caterers
          </h1>
          <p className="max-w-2xl mx-auto text-[#D4AF37]/80 text-sm md:text-base leading-relaxed mb-8">
            Treat your guests to unforgettable culinary excellence. From authentic Awadhi Dum feasts to grand Rajputana thalis, explore verified luxury wedding caterers.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-4xl mx-auto bg-[#241321]/90 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-[#B08D45]/30 shadow-2xl flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1A0B18] border border-[#B08D45]/20">
              <Search className="w-4 h-4 text-[#B08D45]" />
              <input
                type="text"
                placeholder="Search caterer name, company, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-[#F8F1E5] placeholder-[#B08D45]/50 focus:outline-none"
              />
            </div>

            <div className="w-full md:w-56 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A0B18] border border-[#B08D45]/20">
              <MapPin className="w-4 h-4 text-[#B08D45]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-sm text-[#F8F1E5] focus:outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1A0B18] text-[#F8F1E5]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {}}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D4AF37] text-[#1A0B18] font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Find Caterers
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR FILTERS */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[#241321]/60 border border-[#B08D45]/25 rounded-2xl p-6 backdrop-blur-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#B08D45]/20 mb-6">
                <span className="font-serif text-lg text-[#F8F1E5] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#B08D45]" />
                  Filter Caterers
                </span>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity("All Cities");
                    setSelectedService("All Services");
                    setSelectedBudget("all");
                    setSortBy("recommended");
                  }}
                  className="text-xs text-[#B08D45] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* City Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  City / Location
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCity === city
                          ? "bg-[#B08D45]/20 text-[#D4AF37] font-semibold border border-[#B08D45]/40"
                          : "text-[#F8F1E5]/70 hover:bg-[#B08D45]/10 hover:text-[#F8F1E5]"
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  Cuisine & Service Type
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {CATERING_SERVICES_LIST.map((srv) => (
                    <button
                      key={srv}
                      onClick={() => setSelectedService(srv)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedService === srv
                          ? "bg-[#B08D45]/20 text-[#D4AF37] font-semibold border border-[#B08D45]/40"
                          : "text-[#F8F1E5]/70 hover:bg-[#B08D45]/10 hover:text-[#F8F1E5]"
                      }`}
                    >
                      <span className="truncate">{srv}</span>
                      {selectedService === srv && <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                  Starting Package Price
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "all", label: "All Budgets" },
                    { id: "under-1lakh", label: "Under ₹1,00,000" },
                    { id: "1lakh-2lakh", label: "₹1,00,000 – ₹2,00,000" },
                    { id: "above-2lakh", label: "Above ₹2,00,000" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBudget(b.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedBudget === b.id
                          ? "bg-[#B08D45]/20 text-[#D4AF37] font-semibold border border-[#B08D45]/40"
                          : "text-[#F8F1E5]/70 hover:bg-[#B08D45]/10 hover:text-[#F8F1E5]"
                      }`}
                    >
                      <span>{b.label}</span>
                      {selectedBudget === b.id && <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* VENDORS LISTING */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#B08D45]/20">
              <div>
                <h2 className="font-serif text-2xl text-[#F8F1E5]">
                  Available Wedding Caterers
                </h2>
                <p className="text-xs text-[#B08D45]">
                  Showing {filteredCaterers.length} catering businesses {selectedCity !== "All Cities" ? `in ${selectedCity}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#F8F1E5]/70">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#241321] border border-[#B08D45]/30 text-xs text-[#D4AF37] rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* List */}
            {filteredCaterers.length === 0 ? (
              <div className="bg-[#241321]/40 border border-[#B08D45]/20 rounded-2xl p-12 text-center">
                <UtensilsCrossed className="w-12 h-12 text-[#B08D45]/40 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-[#F8F1E5] mb-2">No Caterers Found</h3>
                <p className="text-xs text-[#D4AF37]/70 max-w-md mx-auto mb-6">
                  No catering services match your current filters. Try clearing your filters or changing search keywords.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity("All Cities");
                    setSelectedService("All Services");
                    setSelectedBudget("all");
                  }}
                  className="px-5 py-2 rounded-xl bg-[#B08D45]/20 border border-[#B08D45]/40 text-[#D4AF37] text-xs font-semibold hover:bg-[#B08D45]/30 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCaterers.map((caterer) => {
                  const isShortlisted = shortlistedIds.includes(caterer.id);
                  return (
                    <div
                      key={caterer.id}
                      className="group bg-[#241321]/80 border border-[#B08D45]/25 hover:border-[#B08D45] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      {/* Image header */}
                      <div className="relative h-52 w-full overflow-hidden bg-[#1A0B18]">
                        <img
                          src={caterer.image || "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80"}
                          alt={caterer.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B18] via-transparent to-black/40" />

                        {/* Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full bg-[#1A0B18]/80 backdrop-blur-md border border-[#B08D45]/40 text-[#D4AF37] text-[11px] font-medium flex items-center gap-1.5 shadow-md">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            {caterer.badge || "Verified Vendor"}
                          </span>
                        </div>

                        {/* Shortlist button */}
                        <button
                          onClick={() => toggleShortlist(caterer.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1A0B18]/70 backdrop-blur-md border border-[#B08D45]/30 flex items-center justify-center text-white hover:text-rose-400 transition-colors shadow-md"
                          title="Shortlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isShortlisted ? "fill-rose-500 text-rose-500" : ""
                            }`}
                          />
                        </button>

                        {/* Price Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                          <span className="px-2.5 py-1 rounded-lg bg-[#241321]/90 backdrop-blur-md text-[#F8F1E5] font-semibold border border-[#B08D45]/25">
                            Package: {caterer.priceRange || caterer.priceDisplay}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {caterer.rating || 5.0}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#B08D45] mb-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{caterer.location || caterer.city}</span>
                            <span>•</span>
                            <span>{caterer.experience || "5+ Years"}</span>
                          </div>

                          <h3 className="font-serif text-lg text-[#F8F1E5] group-hover:text-[#D4AF37] transition-colors leading-snug">
                            {caterer.name}
                          </h3>
                          <p className="text-xs text-[#D4AF37]/80 mb-3">
                            {caterer.company || caterer.categoryType}
                          </p>

                          <p className="text-xs text-[#F8F1E5]/70 line-clamp-2 leading-relaxed mb-3">
                            {caterer.about || "Premium wedding catering services tailored to your taste and celebrations."}
                          </p>

                          {/* Highlights pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {(caterer.highlights || caterer.services || []).slice(0, 3).map((hl, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-[#B08D45]/10 border border-[#B08D45]/20 text-[10px] text-[#F8F1E5]/80"
                              >
                                {hl}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-4 border-t border-[#B08D45]/20 flex items-center gap-2">
                          <button
                            onClick={() => setDetailsModalVendor(caterer)}
                            className="flex-1 py-2 rounded-xl bg-[#B08D45]/15 hover:bg-[#B08D45]/25 border border-[#B08D45]/30 text-xs text-[#D4AF37] font-medium transition-all flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Menu & Info
                          </button>
                          <button
                            onClick={() => setEnquiryModalVendor(caterer)}
                            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D4AF37] text-xs text-[#1A0B18] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Send className="w-3.5 h-3.5" />
                            Send Enquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {detailsModalVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#241321] border border-[#B08D45]/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-[#F8F1E5] shadow-2xl relative">
            <button
              onClick={() => setDetailsModalVendor(null)}
              className="absolute top-4 right-4 text-[#F8F1E5]/70 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="p-2.5 rounded-xl bg-[#B08D45]/20 text-[#D4AF37] border border-[#B08D45]/30">
                <UtensilsCrossed className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-serif text-2xl text-[#F8F1E5]">{detailsModalVendor.name}</h3>
                <p className="text-xs text-[#B08D45]">
                  {detailsModalVendor.company} • {detailsModalVendor.location || detailsModalVendor.city}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#F8F1E5]/80">
              <div className="p-4 rounded-xl bg-[#1A0B18] border border-[#B08D45]/20">
                <h4 className="font-semibold text-sm text-[#D4AF37] mb-1">About the Caterer</h4>
                <p className="leading-relaxed">{detailsModalVendor.about}</p>
              </div>

              {detailsModalVendor.vendorContact && (
                <div className="p-4 rounded-xl bg-[#1A0B18] border border-[#B08D45]/20 space-y-2">
                  <h4 className="font-semibold text-sm text-[#D4AF37] mb-2">Direct Contact Information</h4>
                  {detailsModalVendor.vendorContact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#B08D45]" />
                      <span>Phone: {detailsModalVendor.vendorContact.phone}</span>
                    </div>
                  )}
                  {detailsModalVendor.vendorContact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#B08D45]" />
                      <span>Email: {detailsModalVendor.vendorContact.email}</span>
                    </div>
                  )}
                  {detailsModalVendor.vendorContact.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B08D45]" />
                      <span>Address: {detailsModalVendor.vendorContact.address}</span>
                    </div>
                  )}
                </div>
              )}

              {detailsModalVendor.packageIncludes && (
                <div className="p-4 rounded-xl bg-[#1A0B18] border border-[#B08D45]/20">
                  <h4 className="font-semibold text-sm text-[#D4AF37] mb-2">Package Highlights & Inclusions</h4>
                  <ul className="space-y-1.5">
                    {detailsModalVendor.packageIncludes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D45] shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDetailsModalVendor(null)}
                className="px-4 py-2 rounded-xl border border-[#B08D45]/30 text-xs text-[#F8F1E5]/80 hover:bg-white/5"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = detailsModalVendor;
                  setDetailsModalVendor(null);
                  setEnquiryModalVendor(target);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D4AF37] text-xs text-[#1A0B18] font-bold hover:brightness-110"
              >
                Book / Enquire Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRY MODAL */}
      {enquiryModalVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#241321] border border-[#B08D45]/40 rounded-2xl max-w-lg w-full p-6 text-[#F8F1E5] shadow-2xl relative">
            <button
              onClick={() => setEnquiryModalVendor(null)}
              className="absolute top-4 right-4 text-[#F8F1E5]/70 hover:text-white p-1 rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#F8F1E5] mb-1">Send Catering Enquiry</h3>
            <p className="text-xs text-[#B08D45] mb-6">
              To: {enquiryModalVendor.name} ({enquiryModalVendor.company})
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg text-emerald-200">Enquiry Sent Successfully!</h4>
                <p className="text-xs text-emerald-300/80">
                  The caterer has received your requirements and will reach out with customized food packages soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-[#F8F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-[#F8F1E5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D4AF37] font-semibold mb-1">Expected Guests</label>
                    <input
                      type="number"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      placeholder="e.g. 300"
                      className="w-full px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-[#F8F1E5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Event Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-[#F8F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[#D4AF37] font-semibold mb-1">Message / Menu Preferences</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention specific menu items, vegetarian/non-vegetarian preferences..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0B18] border border-[#B08D45]/30 text-[#F8F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEnquiryModalVendor(null)}
                    className="px-4 py-2 rounded-xl border border-[#B08D45]/30 text-xs text-[#F8F1E5]/80 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D4AF37] text-xs text-[#1A0B18] font-bold hover:brightness-110 shadow-md"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
