"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import UniversalEnquiryModal from "@/components/ui/UniversalEnquiryModal";
import {
  Search,
  MapPin,
  Sparkles,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  Phone,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Briefcase,
  IndianRupee,
  Compass,
  Send,
  Eye,
  Check,
} from "lucide-react";

// =========================================================================
// WEDDING PLANNERS DATA — Ready for MySQL / Backend API Integration
// Note: As specified, no invented ratings or verified badges are claimed.
// =========================================================================
const WEDDING_PLANNERS_DATA = [
  {
    id: "royal-conclave-weddings-jaipur",
    name: "The Royal Conclave Weddings",
    company: "Royal Conclave Events Pvt. Ltd.",
    city: "Jaipur",
    location: "Jaipur & Udaipur, Rajasthan",
    priceStarting: 280000,
    priceDisplay: "₹2,80,000",
    experience: "12+ Years Planning",
    speciality: "Royal Heritage & Palace Celebrations",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Destination Wedding Planning",
      "Vendor Selection and Management",
      "Guest Hospitality",
      "Multi-Day Wedding Planning",
    ],
    about:
      "Renowned for orchestrating opulent royal nuptials across Rajasthan's historic palaces and forts. Masterful hospitality logistics, heritage decor curation, and seamless multi-day royal protocol management.",
    packageDetails:
      "Full Royal Package includes end-to-end venue contracting, royal welcome hospitality, artist & entertainment management, culinary supervision, and dedicated round-the-clock shadow teams for the couple and immediate family.",
  },
  {
    id: "aura-wedding-artistry-delhi",
    name: "Aura Wedding Artistry & Management",
    company: "Aura Events & Wedding Curators",
    city: "Delhi",
    location: "South Delhi & NCR",
    priceStarting: 175000,
    priceDisplay: "₹1,75,000",
    experience: "9+ Years Planning",
    speciality: "Contemporary Luxury & Grand Banquets",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Wedding Budget Management",
      "Vendor Selection and Management",
      "Wedding Timeline and Logistics",
    ],
    about:
      "Delivering polished urban celebrations and farm weddings across Delhi NCR. Specialists in rigorous budget tracking, transparent contracts, and minute-by-minute execution timelines.",
    packageDetails:
      "Covers comprehensive vendor negotiation, financial milestone trackers, production design alignment, and complete day-of stage choreography with computerized call-sheets.",
  },
  {
    id: "seabreeze-destination-mumbai",
    name: "SeaBreeze Destination Planners",
    company: "SeaBreeze Celebrations LLP",
    city: "Mumbai",
    location: "Mumbai & Goa",
    priceStarting: 220000,
    priceDisplay: "₹2,20,000",
    experience: "10+ Years Planning",
    speciality: "Coastal & Resort Destination Nuptials",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Destination Wedding Planning",
      "Guest Hospitality",
      "Multi-Day Wedding Planning",
      "Day-of Coordination",
    ],
    about:
      "Pioneers in high-energy destination beach ceremonies, sunset cocktail soirees, and airport-to-resort luxury guest concierge services in Goa and Mumbai waterfronts.",
    packageDetails:
      "Features dedicated guest welcome desks at airports/stations, bespoke luggage tagging, resort room hamper distribution, pool-party logistics, and acoustic evening concert coordination.",
  },
  {
    id: "avadh-vivah-sutra-lucknow",
    name: "Avadh Vivah Sutra Planners",
    company: "Vivah Sutra Management",
    city: "Lucknow",
    location: "Lucknow & Kanpur",
    priceStarting: 85000,
    priceDisplay: "₹85,000",
    experience: "7+ Years Planning",
    speciality: "Awadhi Traditions & Nawabi Etiquette",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Partial Wedding Planning",
      "Vendor Selection and Management",
      "Guest Hospitality",
      "Day-of Coordination",
    ],
    about:
      "Deeply versed in Awadhi culinary curations, traditional dastarkhwan setups, and authentic ritual management with warmth, dignity, and budget-conscious planning.",
    packageDetails:
      "Includes ritual item procurement, pandit & qazi coordination, traditional shehnai welcome curation, guest seating protocol, and seamless coordination between caterer and venue.",
  },
  {
    id: "udaipur-lakeview-directors",
    name: "Udaipur Lakeview Wedding Directors",
    company: "Lakeview Wedding Directors",
    city: "Udaipur",
    location: "Udaipur & Mount Abu",
    priceStarting: 320000,
    priceDisplay: "₹3,20,000",
    experience: "14+ Years Planning",
    speciality: "Lakefront Island & Heritage Fortresses",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Destination Wedding Planning",
      "Guest Hospitality",
      "Multi-Day Wedding Planning",
      "Wedding Timeline and Logistics",
    ],
    about:
      "Celebrated architects of lakeside royal weddings along Lake Pichola. Specialists in barge transfers, vintage car entries, palace fireworks permissions, and royal musical ensembles.",
    packageDetails:
      "Complete destination wedding leadership spanning boat flotilla logistics, lake palace clearance permits, luxury coach charters, 3-day multi-venue decor oversight, and executive family shadows.",
  },
  {
    id: "elysian-knot-noida",
    name: "Elysian Knot Wedding Coordinators",
    company: "Elysian Knot Planners",
    city: "Noida",
    location: "Noida & Greater Noida",
    priceStarting: 65000,
    priceDisplay: "₹65,000",
    experience: "6+ Years Planning",
    speciality: "Modern Coordination & Budget Systems",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Partial Wedding Planning",
      "Day-of Coordination",
      "Wedding Budget Management",
      "Wedding Timeline and Logistics",
    ],
    about:
      "Structured, tech-enabled wedding planners providing shared cloud budget dashboards, crystal-clear vendor milestones, and stress-free wedding day choreography.",
    packageDetails:
      "Ideal for couples who have booked key vendors and need professional handover 45 days prior to streamline payments, final technical soundchecks, and reception run-orders.",
  },
  {
    id: "taj-vista-agra",
    name: "The Taj Vista Wedding Planners",
    company: "Taj Vista Event Curations",
    city: "Agra",
    location: "Agra & Mathura",
    priceStarting: 125000,
    priceDisplay: "₹1,25,000",
    experience: "8+ Years Planning",
    speciality: "Mughal Grandeur & Heritage Hospitality",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Destination Wedding Planning",
      "Guest Hospitality",
      "Vendor Selection and Management",
    ],
    about:
      "Specialists in monument-view ceremonies and aristocratic gatherings in Agra. Renowned for curated heritage menus, pethawala sweet favors, and personalized guest shuttles.",
    packageDetails:
      "Delivers end-to-end design, hotel room allotment coordination, artisanal wedding favors sourcing, sound/light clearances, and dedicated ceremony floor management.",
  },
  {
    id: "moradabad-brass-blooms",
    name: "Moradabad Brass & Blooms Planners",
    company: "Brass & Blooms Wedding Concepts",
    city: "Moradabad",
    location: "Moradabad & Bareilly",
    priceStarting: 45000,
    priceDisplay: "₹45,000",
    experience: "5+ Years Planning",
    speciality: "Artisanal Brassware & Intimate Celebrations",
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Day-of Coordination",
      "Intimate Wedding Planning",
      "Vendor Selection and Management",
      "Wedding Budget Management",
    ],
    about:
      "Affordable and dedicated wedding coordination team incorporating handcrafted Moradabadi brass lanterns, authentic floral scents, and warm family coordination.",
    packageDetails:
      "Tailored for budget-conscious families seeking smooth event day coordination, local vendor supervision, gift hamper assembly, and precise ceremonial timing.",
  },
  {
    id: "sanskriti-heritage-delhi",
    name: "Sanskriti Heritage Wedding Planners",
    company: "Sanskriti Vivah Parivar",
    city: "Delhi",
    location: "Delhi NCR & Neemrana",
    priceStarting: 210000,
    priceDisplay: "₹2,10,000",
    experience: "11+ Years Planning",
    speciality: "Vedic Ritual Coordination & Palace Nuptials",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Destination Wedding Planning",
      "Wedding Timeline and Logistics",
      "Multi-Day Wedding Planning",
    ],
    about:
      "Celebrated for preserving sacred Vedic traditions alongside world-class contemporary event production, artist management, and multi-venue logistical execution.",
    packageDetails:
      "Comprehensive multi-event planning including Haldi, Mehendi, Sangeet, and Varmala grand entries, ritual samagri arrangement, live classical musicians, and backstage management.",
  },
  {
    id: "bohemian-knot-jaipur",
    name: "The Bohemian Knot Intimate Weddings",
    company: "The Bohemian Knot Studio",
    city: "Jaipur",
    location: "Jaipur & Pushkar",
    priceStarting: 48000,
    priceDisplay: "₹48,000",
    experience: "4+ Years Planning",
    speciality: "Boutique Intimate & Eco-Friendly Nuptials",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Intimate Wedding Planning",
      "Day-of Coordination",
      "Partial Wedding Planning",
      "Wedding Budget Management",
    ],
    about:
      "Passionate creators of intimate 50–120 guest micro-weddings, desert camp sangeets in Pushkar, zero-waste decor, and heartfelt personalized vows.",
    packageDetails:
      "Covers eco-conscious vendor sourcing, sustainable decor guidelines, bespoke digital invitations, guest RSVP tracking, and on-site day coordinator assistance.",
  },
  {
    id: "opulence-luxe-mumbai",
    name: "Opulence Luxe Weddings Mumbai",
    company: "Opulence Events & Entertainment",
    city: "Mumbai",
    location: "South Mumbai & Bandra",
    priceStarting: 380000,
    priceDisplay: "₹3,80,000",
    experience: "15+ Years Planning",
    speciality: "Celebrity Galas & High-Fashion Production",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Full Wedding Planning",
      "Multi-Day Wedding Planning",
      "Vendor Selection and Management",
      "Guest Hospitality",
      "Destination Wedding Planning",
    ],
    about:
      "Premier luxury wedding atelier behind some of the country's most glamorous socialite nuptials. Unrivaled entertainment booking, technical staging, and 24/7 VIP concierge.",
    packageDetails:
      "Elite concierge service including five-star hotel buyout negotiations, private jet & luxury car coordination, celebrity performer contracts, red-carpet paparazzi security, and couture styling support.",
  },
  {
    id: "utsav-day-of-lucknow",
    name: "Utsav Day-Of Wedding Managers",
    company: "Utsav Coordination Team",
    city: "Lucknow",
    location: "Lucknow & Varanasi",
    priceStarting: 38000,
    priceDisplay: "₹38,000",
    experience: "5+ Years Planning",
    speciality: "Dedicated Day-of Shadowing & Stage Logistics",
    image:
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Day-of Coordination",
      "Wedding Timeline and Logistics",
      "Wedding Budget Management",
    ],
    about:
      "Designed for couples who have planned everything themselves and need an eagle-eyed management team on the ground to oversee vendors, manage run sheets, and ensure a flaw-free wedding day.",
    packageDetails:
      "Includes handover meeting 2 weeks prior, master vendor coordination call, bridal suite coordinator, stage queue management, and final vendor payment checklist execution.",
  },
];

// =========================================================================
// FILTER TAXONOMY
// =========================================================================
const CITIES = [
  "All Cities",
  "Delhi",
  "Jaipur",
  "Mumbai",
  "Lucknow",
  "Noida",
  "Moradabad",
  "Agra",
  "Udaipur",
];

const PLANNING_SERVICES = [
  "All Services",
  "Full Wedding Planning",
  "Partial Wedding Planning",
  "Day-of Coordination",
  "Destination Wedding Planning",
  "Wedding Budget Management",
  "Vendor Selection and Management",
  "Guest Hospitality",
  "Wedding Timeline and Logistics",
  "Intimate Wedding Planning",
  "Multi-Day Wedding Planning",
];

const BUDGET_RANGES = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹50,000", value: "under-50k" },
  { label: "₹50,000–₹1,00,000", value: "50k-100k" },
  { label: "₹1,00,000–₹2,50,000", value: "100k-250k" },
  { label: "₹2,50,000 and above", value: "above-250k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

// =========================================================================
// INSPIRATION DATA
// =========================================================================
const INSPIRATION_STORIES = [
  {
    title: "Luxury Destination Weddings",
    category: "Palace & Island Venues",
    description:
      "Curating fairy-tale destination nuptials across regal palaces in Rajasthan and turquoise coastal resorts in Goa.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Intimate & Minimalist Nuptials",
    category: "Boutique Micro-Weddings",
    description:
      "Crafting deeply personal celebrations with 50–100 guests, artisanal touches, heartfelt rituals, and zero waste.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Royal Indian Heritage Celebrations",
    category: "Aristocratic Splendor",
    description:
      "Orchestrating majestic processions, traditional shehnai greetings, elephant arrivals, and authentic ceremonial protocols.",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Beach & Outdoor Open-Air Soirees",
    category: "Sundowner Celebrations",
    description:
      "Seamlessly blending coastal breezes, fairy light canopies, acoustic entertainment, and barefoot mandap vows.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Multi-Day Wedding Celebrations",
    category: "Grand 3 to 5 Day Itineraries",
    description:
      "Flawlessly synchronized schedules for Mehendi carnivals, high-energy Sangeet nights, Vedic pheras, and gala receptions.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Elegant Timelines & Guest Experiences",
    category: "Hospitality & Logistics",
    description:
      "Airport VIP concierge, curated welcome hampers, interactive digital itineraries, and five-star shadow service.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
];

// =========================================================================
// FAQS
// =========================================================================
const FAQS = [
  {
    q: "What does a wedding planner do?",
    a: "A professional wedding planner guides couples through the complete planning journey. They assist with budget allocation, venue scouting, contract negotiations with vendors (photographers, decorators, caterers), event design, production schedules, legal permits, and day-of coordination to ensure the wedding runs smoothly without stress for the couple and their families.",
  },
  {
    q: "What is included in a full wedding planning package?",
    a: "A full wedding planning package typically covers end-to-end management from concept to completion. This includes venue selection, comprehensive vendor curation, theme & decor design, budget monitoring, invitation and guest RSVP tracking, hospitality & room allotment, wedding day timeline management, and dedicated coordinators on-site for every ceremonial function.",
  },
  {
    q: "How much does a wedding planner cost?",
    a: "Wedding planning fees vary depending on the scope of the wedding, location, and guest count. In India, planning fees generally start from ₹35,000 to ₹75,000 for day-of coordination and partial planning, ₹1,00,000 to ₹2,50,000 for full city weddings, and ₹2,50,000 to ₹5,00,000+ for grand multi-day destination or palace celebrations. Some planners charge a flat fee, while others charge a percentage (typically 10%–15%) of the total wedding budget.",
  },
  {
    q: "When should we book a wedding planner?",
    a: "It is strongly recommended to book your wedding planner 6 to 12 months in advance, especially for popular auspicious dates (saaya/muhurat days) and peak destination wedding months (October through March). Engaging a planner early allows them to negotiate the best hotel room blocks, palace venues, and top-tier vendors before they get fully booked.",
  },
  {
    q: "What is the difference between full planning and day-of coordination?",
    a: "Full planning involves the planner from the very beginning—helping you choose venues, conceptualize themes, manage your budget, and hire every vendor. Day-of coordination (often beginning 2 to 4 weeks before the wedding) is for couples who have planned everything themselves but need an experienced team on-site on the wedding day to manage vendor arrivals, maintain stage timelines, and troubleshoot issues so the family can celebrate.",
  },
  {
    q: "Can a wedding planner organize destination weddings?",
    a: "Yes, many of the luxury planners featured on ShubhVivah specialize in destination celebrations across Rajasthan (Udaipur, Jaipur, Jodhpur), Goa, Kerala, and Jim Corbett. They manage flights, airport logistics, resort buyouts, municipal permissions, and bring trusted regional decor and catering teams to execute a flawless celebration.",
  },
];

export default function WeddingPlannerPage() {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);

  // Mobile drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Shortlist state
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals state
  const [detailsPlanner, setDetailsPlanner] = useState(null);
  const [enquiryPlanner, setEnquiryPlanner] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(0);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    city: "",
    budget: "₹15 Lakhs – ₹30 Lakhs",
    guests: "100–250 Guests",
    service: "Full Wedding Planning",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Toggle Shortlist
  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset Filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedService("All Services");
    setSelectedBudget("all");
    setSortBy("recommended");
    setOnlyShortlisted(false);
  };

  // Active filters count
  const activeFiltersCount =
    (searchTerm.trim() ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (selectedService !== "All Services" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0) +
    (onlyShortlisted ? 1 : 0);

  // Filter & Sort Logic
  const filteredPlanners = useMemo(() => {
    let result = WEDDING_PLANNERS_DATA.filter((planner) => {
      // Shortlist filter
      if (onlyShortlisted && !shortlistedIds.includes(planner.id)) {
        return false;
      }

      // Search term: planner name, company, city, location, or services
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = planner.name.toLowerCase().includes(query);
        const matchesCompany = planner.company.toLowerCase().includes(query);
        const matchesCity = planner.city.toLowerCase().includes(query);
        const matchesLocation = planner.location.toLowerCase().includes(query);
        const matchesSpeciality = planner.speciality.toLowerCase().includes(query);
        const matchesService = planner.services.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesCompany &&
          !matchesCity &&
          !matchesLocation &&
          !matchesSpeciality &&
          !matchesService
        ) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "All Cities" && planner.city !== selectedCity) {
        return false;
      }

      // Service filter
      if (
        selectedService !== "All Services" &&
        !planner.services.includes(selectedService)
      ) {
        return false;
      }

      // Budget filter
      if (selectedBudget === "under-50k" && planner.priceStarting >= 50000) {
        return false;
      }
      if (
        selectedBudget === "50k-100k" &&
        (planner.priceStarting < 50000 || planner.priceStarting > 100000)
      ) {
        return false;
      }
      if (
        selectedBudget === "100k-250k" &&
        (planner.priceStarting < 100000 || planner.priceStarting > 250000)
      ) {
        return false;
      }
      if (selectedBudget === "above-250k" && planner.priceStarting < 250000) {
        return false;
      }

      return true;
    });

    // Sort logic
    result.sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.priceStarting - b.priceStarting;
      }
      if (sortBy === "price-desc") {
        return b.priceStarting - a.priceStarting;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0; // recommended
    });

    return result;
  }, [
    searchTerm,
    selectedCity,
    selectedService,
    selectedBudget,
    sortBy,
    onlyShortlisted,
    shortlistedIds,
  ]);

  // Open Details Modal
  const openDetailsModal = (planner) => {
    setDetailsPlanner(planner);
    setModalActiveImage(0);
  };

  // Close Details Modal
  const closeDetailsModal = () => {
    setDetailsPlanner(null);
  };

  // Open Enquiry Modal
  const openEnquiryModal = (planner) => {
    setEnquiryPlanner(planner);
    setFormData((prev) => ({
      ...prev,
      city: planner.city || "",
    }));
    setFormSubmitted(false);
    setFormErrors({});
  };

  // Close Enquiry Modal
  const closeEnquiryModal = () => {
    setEnquiryPlanner(null);
    setFormSubmitted(false);
    setFormErrors({});
  };

  // Handle Enquiry Form Submit
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your full name.";
    }

    // Indian 10-digit mobile number validation
    const cleanedPhone = formData.phone.replace(/[\s\-\+]/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errors.phone = "Please enter your mobile number.";
    } else if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 10) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.date) {
      errors.date = "Please select your anticipated wedding date.";
    }

    if (!formData.city.trim()) {
      errors.city = "Please enter your wedding city or destination.";
    }

    // Optional email validation if entered
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    try {
      fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          location: formData.city,
          message: formData.message,
          service: formData.packageSelected || enquiryPlanner?.name || "Wedding Planner",
          target_id: enquiryPlanner?.id || null,
          target_type: "vendor",
          target_name: enquiryPlanner?.company || enquiryPlanner?.name || "Wedding Planner",
          service_or_product: enquiryPlanner?.name || "Wedding Planning & Coordination",
          budget: formData.budget || enquiryPlanner?.priceStarting ? `₹${Number(enquiryPlanner.priceStarting).toLocaleString("en-IN")}` : "₹2,50,000",
          source: "Wedding Planner Page",
          is_booking: true,
        }),
      }).catch((e) => console.error(e));
    } catch {}
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. HERO SECTION
         ========================================================================= */}
      <section className="relative isolate overflow-hidden border-b border-[#665038] bg-[#241321] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Background Wedding Planning/Ceremony Image with Subtle Dark Overlay */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Deep Plum Dark Luxury Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/92 via-[#241321]/85 to-[#241321]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb: Home → Wedding Vendors → Wedding Planner */}
          <nav
            aria-label="Breadcrumb"
            className="hidden lg:flex mb-5 items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#D6B875]"
            >
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <Link
              href="/wedding-vendors/wedding-photography"
              className="transition-colors hover:text-[#D6B875]"
            >
              Wedding Vendors
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">Wedding Planner</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#321B30]/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875] backdrop-blur-sm">
              <Sparkles size={12} className="text-[#B08D45]" />
              Premier Wedding Planners
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Find Your Perfect Wedding Planner
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              From your first planning meeting to the final wedding celebration, discover
              professionals who bring your vision to life with thoughtful planning and seamless
              coordination.
            </p>
          </div>

          {/* Hero Search & Filter Bar */}
          <div className="mt-8 max-w-4xl rounded-2xl border border-[#665038] bg-[#3A2638]/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1fr_auto]">
              {/* Search by planner or company name */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search planner name, company, or service..."
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/70 transition-colors focus:border-[#B08D45] focus:outline-none sm:text-sm"
                  aria-label="Search wedding planners"
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B875]"
                />
                {searchTerm && (
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9BBAF] hover:text-[#F8F1E5]"
                    aria-label="Clear search text"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* City selector */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-8 text-xs text-[#F8F1E5] transition-colors focus:border-[#B08D45] focus:outline-none sm:text-sm"
                  aria-label="Select destination city"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="bg-[#241321] text-[#F8F1E5]">
                      {city === "All Cities" ? "All Locations" : city}
                    </option>
                  ))}
                </select>
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B875]"
                />
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C9BBAF]"
                />
              </div>

              {/* Gold "Find Wedding Planners" button */}
              <a
                href="#planners-directory"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-md transition-all duration-200 hover:brightness-105 active:scale-[0.98] sm:text-sm"
              >
                <span>Find Planners</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Quick Filter Badges in Hero */}
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#665038]/50 pt-3 text-[11px] text-[#C9BBAF]">
              <span className="font-medium text-[#D6B875]">Quick Filter:</span>
              {[
                "Full Wedding Planning",
                "Destination Wedding Planning",
                "Day-of Coordination",
                "Jaipur",
                "Delhi",
                "Udaipur",
              ].map((pill) => (
                <button suppressHydrationWarning
                  key={pill}
                  type="button"
                  onClick={() => {
                    if (CITIES.includes(pill)) {
                      setSelectedCity(pill);
                    } else {
                      setSelectedService(pill);
                    }
                  }}
                  className={`rounded-full border px-2.5 py-0.5 transition-all ${
                    selectedCity === pill || selectedService === pill
                      ? "border-[#D6B875] bg-[#B08D45]/30 text-[#D6B875]"
                      : "border-[#665038] bg-[#241321] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                  }`}
                >
                  {pill}
                </button>
              ))}
              {activeFiltersCount > 0 && (
                <button suppressHydrationWarning
                  type="button"
                  onClick={handleClearFilters}
                  className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#D6B875] underline underline-offset-2 hover:text-[#E8D9B5]"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WEDDING PLANNER LISTING LAYOUT
         ========================================================================= */}
      <section
        id="planners-directory"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        {/* Header Bar: Heading, Dynamic Count, Sorting & Mobile Filter Toggle */}
        <div className="flex flex-col gap-4 border-b border-[#665038] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                Wedding Planners
              </h2>
              <span className="rounded-full border border-[#B08D45]/50 bg-[#321B30] px-3 py-0.5 text-xs font-semibold text-[#D6B875]">
                {filteredPlanners.length} {filteredPlanners.length === 1 ? "Planner" : "Planners"}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#C9BBAF] sm:text-sm">
              Discover verified wedding directors, destination curators, and bespoke coordination teams.
            </p>
          </div>

          {/* Controls: Shortlist Toggle, Sort & Mobile Filters */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Shortlist Filter Toggle */}
            <button suppressHydrationWarning
              type="button"
              onClick={() => setOnlyShortlisted((prev) => !prev)}
              aria-pressed={onlyShortlisted}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                onlyShortlisted
                  ? "border-[#D6B875] bg-[#3A2638] text-[#D6B875]"
                  : "border-[#665038] bg-[#321B30] text-[#F8F1E5] hover:border-[#B08D45]"
              }`}
            >
              <Heart
                size={14}
                className={onlyShortlisted ? "fill-[#D6B875] text-[#D6B875]" : "text-[#B08D45]"}
              />
              <span>Shortlisted ({shortlistedIds.length})</span>
            </button>

            {/* Mobile Filter Button */}
            <button suppressHydrationWarning
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="relative inline-flex items-center gap-1.5 rounded-xl border border-[#665038] bg-[#321B30] px-3.5 py-2 text-xs font-medium text-[#F8F1E5] transition-colors hover:border-[#B08D45] lg:hidden"
              aria-label="Open filter panel"
            >
              <SlidersHorizontal size={14} className="text-[#D6B875]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B08D45] text-[10px] font-bold text-[#241321]">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-[#665038] bg-[#321B30] py-2 pl-3.5 pr-8 text-xs font-medium text-[#F8F1E5] transition-colors focus:border-[#B08D45] focus:outline-none"
                aria-label="Sort listings by"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#321B30] text-[#F8F1E5]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C9BBAF]"
              />
            </div>

            {/* Clear Filters (if active) */}
            {activeFiltersCount > 0 && (
              <button suppressHydrationWarning
                type="button"
                onClick={handleClearFilters}
                className="hidden items-center gap-1 rounded-xl border border-[#665038] bg-[#241321] px-3 py-2 text-xs text-[#D6B875] transition-colors hover:bg-[#321B30] sm:inline-flex"
                title="Clear all active filters"
              >
                <RotateCcw size={12} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* =========================================================================
              DESKTOP FILTER SIDEBAR
             ========================================================================= */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-28 space-y-6 rounded-2xl border border-[#665038] bg-[#321B30] p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#665038]/60 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#D6B875]" />
                  <span className="font-serif text-lg font-semibold text-[#F8F1E5]">
                    Refine Planners
                  </span>
                </div>
                {activeFiltersCount > 0 && (
                  <button suppressHydrationWarning
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs text-[#D6B875] hover:text-[#E8D9B5]"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
              </div>

              {/* Location Filter */}
              <div>
                <label
                  htmlFor="desktop-city-select"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]"
                >
                  City / Location
                </label>
                <div className="relative">
                  <select
                    id="desktop-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-xs text-[#F8F1E5] transition-colors focus:border-[#B08D45] focus:outline-none"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city} className="bg-[#241321] text-[#F8F1E5]">
                        {city === "All Cities" ? "All Locations" : city}
                      </option>
                    ))}
                  </select>
                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D6B875]"
                  />
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C9BBAF]"
                  />
                </div>
              </div>

              {/* Planning Services Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Planning Services
                </label>
                <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1 text-xs">
                  {PLANNING_SERVICES.map((srv) => {
                    const isSelected = selectedService === srv;
                    return (
                      <button suppressHydrationWarning
                        key={srv}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                          isSelected
                            ? "bg-[#B08D45] font-semibold text-[#241321]"
                            : "text-[#C9BBAF] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                        }`}
                      >
                        <span className="truncate">{srv}</span>
                        {isSelected && <Check size={13} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Starting Package Budget
                </label>
                <div className="space-y-1.5">
                  {BUDGET_RANGES.map((b) => (
                    <label
                      key={b.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                    >
                      <input
                        type="radio"
                        name="desktop-budget"
                        value={b.value}
                        checked={selectedBudget === b.value}
                        onChange={() => setSelectedBudget(b.value)}
                        className="accent-[#B08D45]"
                      />
                      <span className={selectedBudget === b.value ? "font-semibold text-[#D6B875]" : ""}>
                        {b.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shortlist Quick Filter */}
              <div className="border-t border-[#665038]/60 pt-4">
                <label className="flex cursor-pointer items-center justify-between text-xs text-[#F8F1E5]">
                  <span className="flex items-center gap-1.5">
                    <Heart
                      size={14}
                      className={
                        onlyShortlisted
                          ? "fill-[#D6B875] text-[#D6B875]"
                          : "text-[#B08D45]"
                      }
                    />
                    <span>Shortlisted Planners Only</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyShortlisted}
                    onChange={(e) => setOnlyShortlisted(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>
              </div>

              {/* Clear All Filters Button */}
              <button suppressHydrationWarning
                type="button"
                onClick={handleClearFilters}
                className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 text-center text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* =========================================================================
              RESPONSIVE WEDDING PLANNER CARDS GRID
              Desktop: 3 cards per row (lg:grid-cols-3)
              Tablet: 2 cards per row (sm:grid-cols-2)
              Mobile: 1 card per row (grid-cols-1)
             ========================================================================= */}
          <div className="lg:col-span-3">
            {filteredPlanners.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center rounded-3xl border border-[#665038] bg-[#321B30] p-12 text-center shadow-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#D6B875]">
                  <Search size={28} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  No Wedding Planners Found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
                  We couldn&apos;t find any wedding planners matching your selected filters or search
                  criteria. Try adjusting your city, budget, or planning services.
                </p>
                <button suppressHydrationWarning
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlanners.map((planner) => {
                  const isShortlisted = shortlistedIds.includes(planner.id);

                  return (
                    <article
                      key={planner.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-[#B08D45]/10"
                    >
                      {/* Card Image Container with Fixed Height & Heart Button */}
                      <div className="relative h-52 w-full overflow-hidden bg-[#241321]">
                        <Image
                          src={planner.image}
                          alt={`${planner.name} wedding portfolio showcase in ${planner.city}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />

                        {/* Top Badges */}
                        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full border border-[#665038] bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                            {planner.city}
                          </span>
                        </div>

                        {/* Shortlist Heart Button */}
                        <button suppressHydrationWarning
                          type="button"
                          onClick={() => toggleShortlist(planner.id)}
                          aria-label={
                            isShortlisted
                              ? `Remove ${planner.name} from shortlist`
                              : `Add ${planner.name} to shortlist`
                          }
                          aria-pressed={isShortlisted}
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ${
                            isShortlisted
                              ? "border-[#D6B875] bg-[#241321] text-[#D6B875] shadow-lg shadow-[#D6B875]/20"
                              : "border-[#665038] bg-[#241321]/80 text-[#F8F1E5] hover:border-[#B08D45] hover:text-[#D6B875]"
                          }`}
                        >
                          <Heart
                            size={16}
                            className={
                              isShortlisted
                                ? "fill-[#D6B875] text-[#D6B875]"
                                : "transition-transform group-hover:scale-110"
                            }
                          />
                        </button>

                        {/* Starting Package Price Tag */}
                        <div className="absolute bottom-2.5 left-3">
                          <span className="rounded-md border border-[#665038] bg-[#241321]/95 px-2.5 py-1 text-[11px] font-semibold text-[#F8F1E5] backdrop-blur-sm">
                            Starts <span className="text-[#D6B875]">{planner.priceDisplay}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-1 flex-col p-4">
                        {/* Experience Pill */}
                        <div className="flex items-center gap-1.5 text-[11px] text-[#C9BBAF]">
                          <Briefcase size={12} className="text-[#B08D45]" />
                          <span>{planner.experience}</span>
                          <span className="text-[#665038]">•</span>
                          <span className="truncate text-[#D6B875]">{planner.speciality}</span>
                        </div>

                        {/* Planner / Company Name */}
                        <h3 className="mt-1.5 font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                          {planner.name}
                        </h3>

                        {/* Location */}
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-[#C9BBAF]">
                          <MapPin size={12} className="shrink-0 text-[#B08D45]" />
                          <span className="truncate">{planner.location}</span>
                        </p>

                        {/* Short Description */}
                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                          {planner.about}
                        </p>

                        {/* Service Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {planner.services.slice(0, 3).map((srv) => (
                            <span
                              key={srv}
                              className="rounded-md border border-[#665038]/70 bg-[#241321] px-2 py-0.5 text-[10px] text-[#C9BBAF]"
                            >
                              {srv}
                            </span>
                          ))}
                          {planner.services.length > 3 && (
                            <span className="rounded-md border border-[#665038]/70 bg-[#241321] px-1.5 py-0.5 text-[10px] text-[#D6B875]">
                              +{planner.services.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons: View Details & Send Enquiry */}
                        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#665038]/60 pt-3">
                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => openDetailsModal(planner)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#665038] bg-[#321B30] px-3 py-2 text-xs font-semibold text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <Eye size={13} />
                            <span>View Details</span>
                          </button>

                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => openEnquiryModal(planner)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-3 py-2 text-xs font-semibold text-[#241321] shadow-md transition-all hover:brightness-105 active:scale-95"
                          >
                            <Send size={13} />
                            <span>Send Enquiry</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MOBILE FILTER DRAWER
         ========================================================================= */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm lg:hidden"
        >
          <div className="flex h-full w-full max-w-xs flex-col border-l border-[#665038] bg-[#321B30] p-5 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#665038] pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#D6B875]" />
                <span className="font-serif text-lg font-bold text-[#F8F1E5]">
                  Filter Planners
                </span>
              </div>
              <button suppressHydrationWarning
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] hover:bg-[#3A2638]"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 space-y-6 overflow-y-auto py-4 text-xs">
              {/* City Selection */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  City / Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 px-3 text-xs text-[#F8F1E5]"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="bg-[#241321]">
                      {city === "All Cities" ? "All Locations" : city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services Selection */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Planning Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 px-3 text-xs text-[#F8F1E5]"
                >
                  {PLANNING_SERVICES.map((srv) => (
                    <option key={srv} value={srv} className="bg-[#241321]">
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Selection */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Starting Package Budget
                </label>
                <div className="space-y-2">
                  {BUDGET_RANGES.map((b) => (
                    <label
                      key={b.value}
                      className="flex cursor-pointer items-center gap-2.5 text-[#C9BBAF]"
                    >
                      <input
                        type="radio"
                        name="mobile-budget"
                        value={b.value}
                        checked={selectedBudget === b.value}
                        onChange={() => setSelectedBudget(b.value)}
                        className="accent-[#B08D45]"
                      />
                      <span className={selectedBudget === b.value ? "font-semibold text-[#D6B875]" : ""}>
                        {b.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shortlist Checkbox */}
              <div className="border-t border-[#665038]/60 pt-4">
                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span>Show Shortlisted Only</span>
                  <input
                    type="checkbox"
                    checked={onlyShortlisted}
                    onChange={(e) => setOnlyShortlisted(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-[#665038] pt-4 space-y-2">
              <button suppressHydrationWarning
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-2.5 text-center text-xs font-semibold text-[#241321]"
              >
                Apply Filters ({filteredPlanners.length})
              </button>
              <button suppressHydrationWarning
                type="button"
                onClick={handleClearFilters}
                className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 text-center text-xs text-[#C9BBAF] hover:text-[#D6B875]"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. WEDDING PLANNER DETAILS MODAL
         ========================================================================= */}
      {detailsPlanner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button suppressHydrationWarning
              type="button"
              onClick={closeDetailsModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              aria-label="Close details modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#665038] bg-[#241321] px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  {detailsPlanner.city}
                </span>
                <span className="text-xs text-[#C9BBAF]">
                  • {detailsPlanner.experience}
                </span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                {detailsPlanner.name}
              </h3>
              <p className="text-xs text-[#C9BBAF] sm:text-sm">{detailsPlanner.company}</p>
            </div>

            {/* Interactive Image Gallery */}
            <div className="mt-5 space-y-3">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-[#665038] bg-[#241321] sm:h-80">
                <Image
                  src={detailsPlanner.gallery[modalActiveImage] || detailsPlanner.image}
                  alt={`${detailsPlanner.name} portfolio photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails */}
              {detailsPlanner.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {detailsPlanner.gallery.map((img, idx) => (
                    <button suppressHydrationWarning
                      key={img}
                      type="button"
                      onClick={() => setModalActiveImage(idx)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        modalActiveImage === idx
                          ? "border-[#D6B875] ring-2 ring-[#B08D45]/40"
                          : "border-[#665038] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* About & Philosophy */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4">
                <h4 className="flex items-center gap-2 font-serif text-base font-semibold text-[#D6B875]">
                  <Compass size={16} />
                  Planning Philosophy
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                  {detailsPlanner.about}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#F8F1E5]">
                  <MapPin size={13} className="text-[#B08D45]" />
                  <span>{detailsPlanner.location}</span>
                </div>
              </div>

              {/* Package Information */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4">
                <h4 className="flex items-center gap-2 font-serif text-base font-semibold text-[#D6B875]">
                  <IndianRupee size={16} />
                  Planning Package Details
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                  {detailsPlanner.packageDetails}
                </p>
                <p className="mt-3 text-xs font-semibold text-[#F8F1E5]">
                  Starting Package Price:{" "}
                  <span className="text-[#D6B875]">{detailsPlanner.priceDisplay}</span>
                </p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="mt-6">
              <h4 className="font-serif text-base font-semibold text-[#F8F1E5]">
                Services Offered
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {detailsPlanner.services.map((srv) => (
                  <span
                    key={srv}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#241321] px-3 py-1 text-xs text-[#C9BBAF]"
                  >
                    <CheckCircle2 size={13} className="text-[#B08D45]" />
                    <span>{srv}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#665038] pt-5">
              <button suppressHydrationWarning
                type="button"
                onClick={() => toggleShortlist(detailsPlanner.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                  shortlistedIds.includes(detailsPlanner.id)
                    ? "border-[#D6B875] bg-[#241321] text-[#D6B875]"
                    : "border-[#665038] bg-[#241321] text-[#F8F1E5] hover:border-[#B08D45]"
                }`}
              >
                <Heart
                  size={15}
                  className={
                    shortlistedIds.includes(detailsPlanner.id)
                      ? "fill-[#D6B875] text-[#D6B875]"
                      : "text-[#B08D45]"
                  }
                />
                <span>
                  {shortlistedIds.includes(detailsPlanner.id)
                    ? "Remove from Shortlist"
                    : "Save to Shortlist"}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button suppressHydrationWarning
                  type="button"
                  onClick={closeDetailsModal}
                  className="rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-xs font-medium text-[#F8F1E5] hover:bg-[#3A2638]"
                >
                  Close
                </button>
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    const selected = detailsPlanner;
                    closeDetailsModal();
                    openEnquiryModal(selected);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                >
                  <Send size={14} />
                  <span>Send Enquiry to {detailsPlanner.name.split(" ")[0]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. ENQUIRY MODAL (Universal with strict validation)
         ========================================================================= */}
      <UniversalEnquiryModal
        isOpen={!!enquiryPlanner}
        onClose={closeEnquiryModal}
        target={enquiryPlanner}
        targetType="wedding-planner"
        source="Wedding Planner Page"
      />

      {/* =========================================================================
          6. WEDDING PLANNING INSPIRATION SECTION
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#321B30] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Curated Nuptials &amp; Aesthetics
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Wedding Planning Inspiration
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
              Explore magnificent wedding concepts brought to life by master planners—from royal
              fortress nuptials to chic coastal soirees.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSPIRATION_STORIES.map((story) => (
              <div
                key={story.title}
                className="group overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-md transition-all duration-300 hover:border-[#B08D45] hover:shadow-xl"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#241321]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#665038] bg-[#241321]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                    {story.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                    {story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CTA SECTION: ARE YOU A WEDDING PLANNER?
         ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] px-6 py-14 text-center shadow-2xl sm:px-12">
          {/* Subtle Accent Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#D6B875]/10 blur-3xl" />

          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
            Planner Partnership Network
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
            Are You a Wedding Planner?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
            Showcase your expertise, connect with couples, and grow your wedding planning business
            with ShubhVivah.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vendors/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-lg transition-all hover:brightness-105 active:scale-95"
            >
              <span>List Your Business</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#665038] bg-[#241321] px-6 py-3 text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
            >
              <Phone size={14} className="text-[#B08D45]" />
              <span>Contact Partnership Team</span>
            </Link>
          </div>

          <p className="mt-4 text-[11px] text-[#C9BBAF]/70">
            Self-service onboarding portal active. Complete integration with vendor authentication in
            progress.
          </p>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION (ACCORDION)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#241321] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Planning Insights &amp; Guidance
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="text-xs text-[#C9BBAF] sm:text-sm">
              Answers to essential questions couples ask before hiring their wedding planner.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30] transition-colors"
                >
                  <button suppressHydrationWarning
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-medium text-[#F8F1E5] transition-colors hover:text-[#D6B875] sm:text-base"
                  >
                    <span className="font-serif font-semibold">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#D6B875] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#665038]/50 bg-[#3A2638]/50 p-5 pt-3">
                      <p className="text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
