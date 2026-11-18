"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Send,
  Eye,
  Check,
  Palette,
  Home,
  Car,
  Feather,
} from "lucide-react";

// =========================================================================
// SAMPLE MEHNDI ARTISTS DATA — Ready for MySQL / API Integration
// All artist names, studios, and prices are realistic sample content.
// No verified badges or invented customer reviews are claimed.
// =========================================================================
const MEHNDI_ARTISTS_DATA = [
  {
    id: "aarohi-henna-couture-delhi",
    name: "Aarohi Henna Couture",
    studio: "Aarohi Bridal Henna Studio",
    city: "Delhi",
    location: "South Extension & Mehrauli, Delhi",
    priceStarting: 15000,
    priceDisplay: "₹15,000",
    experience: "11+ Years Artistry",
    speciality: "Intricate Bridal & Portrait Henna",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 30 Family Guests",
    image: "/images/mehndi/vendor-aarohi-delhi.jpg",
    gallery: [
      "/images/mehndi/vendor-aarohi-delhi.jpg",
      "/images/mehndi/bridal-mehndi.jpg",
      "https://images.unsplash.com/photo-1730003873829-09b4b16444c1?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Bridal Mehndi",
      "Customized Mehndi Designs",
      "Feet Mehndi",
      "Traditional Indian Mehndi",
      "Family Mehndi",
    ],
    about:
      "Specializing in heirloom bridal storytelling, incorporating miniature couple portraits, Radha-Krishna motifs, royal palanquin figures, and dark organic Sojat henna.",
    packageDetails:
      "Full bridal elbows-to-fingertips and mid-calf feet coverage, including 100% natural chemical-free henna cones, nilgiri eucalyptus seal, and dedicated after-care balm.",
  },
  {
    id: "royal-marwar-mehndi-jaipur",
    name: "Royal Marwar Henna Art",
    studio: "Marwar Heritage Mehndi",
    city: "Jaipur",
    location: "Johari Bazar, Jaipur",
    priceStarting: 12000,
    priceDisplay: "₹12,000",
    experience: "14+ Years Artistry",
    speciality: "Authentic Rajasthani & Marodi Patterns",
    homeService: true,
    studioService: false,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 50 Palace Guests",
    image: "/images/mehndi/vendor-royal-marwar.jpg",
    gallery: [
      "/images/mehndi/vendor-royal-marwar.jpg",
      "/images/mehndi/rajasthani-mehndi.jpg",
      "https://images.unsplash.com/photo-1775495786474-3bf8c7e031d5?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Rajasthani Mehndi",
      "Bridal Mehndi",
      "Traditional Indian Mehndi",
      "Feet Mehndi",
      "Guest Mehndi",
    ],
    about:
      "Masters of authentic Mewari and Marwari heritage designs with intricate jaali, peacock feathers, dholak bells, and symmetrical floral architecture.",
    packageDetails:
      "Complete royal bridal package with both palms, reverse cuffs, feet up to ankles, plus 4 assistant artists for family and wedding guests.",
  },
  {
    id: "zoya-arabic-henna-mumbai",
    name: "Zoya Arabic & Floral Mehndi",
    studio: "Zoya Henna Atelier",
    city: "Mumbai",
    location: "Bandra & Juhu, Mumbai",
    priceStarting: 4500,
    priceDisplay: "₹4,500",
    experience: "7+ Years Artistry",
    speciality: "Contemporary Gulf Arabic & Freehand Flora",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 20 Guests",
    image: "/images/mehndi/vendor-zoya-arabic.jpg",
    gallery: [
      "/images/mehndi/vendor-zoya-arabic.jpg",
      "/images/mehndi/arabic-mehndi.jpg",
      "https://images.unsplash.com/photo-1770346279037-89853a3e8c60?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Arabic Mehndi",
      "Engagement Mehndi",
      "Minimal Mehndi",
      "Bridal Mehndi",
    ],
    about:
      "Renowned for flowing Indo-Arabic floral trails, bold shaded leaves, negative-space grid lines, and modern lightweight bridal compositions.",
    packageDetails:
      "Modern bridal Arabic package covering both hand sides with breathing negative spaces, fingertips shading, and matching feet bands.",
  },
  {
    id: "avadh-shringaar-lucknow",
    name: "Avadh Shringaar Mehndi",
    studio: "Nawab Henna Arts",
    city: "Lucknow",
    location: "Hazratganj, Lucknow",
    priceStarting: 7500,
    priceDisplay: "₹7,500",
    experience: "9+ Years Artistry",
    speciality: "Awadhi Chikankari-Inspired Henna",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 25 Guests",
    image: "/images/mehndi/vendor-avadh-shringaar.jpg",
    gallery: [
      "/images/mehndi/vendor-avadh-shringaar.jpg",
      "/images/mehndi/traditional-indian-mehndi.jpg",
      "https://images.unsplash.com/photo-1719468452346-20bbb785de2e?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Indian Mehndi",
      "Bridal Mehndi",
      "Engagement Mehndi",
      "Feet Mehndi",
    ],
    about:
      "Drawing inspiration from traditional Awadhi shadow-work and delicate paisleys. Known for ultra-fine lines, paisley bootis, and velvety dark stains.",
    packageDetails:
      "Covers bride full hands front and back, fine lace cuffs, traditional feet bootis, and organic clove oil aftercare treatment.",
  },
  {
    id: "minimalist-knot-noida",
    name: "The Minimalist Henna Studio",
    studio: "Minimal Knot Henna",
    city: "Noida",
    location: "Sector 50 & Greater Noida",
    priceStarting: 1800,
    priceDisplay: "₹1,800",
    experience: "5+ Years Artistry",
    speciality: "Mandala & Minimal Modern Patterns",
    homeService: true,
    studioService: true,
    travelToVenue: false,
    bridalPackageAvailable: false,
    guestCapacity: "Bride & Intimate Family",
    image: "/images/mehndi/vendor-minimalist-knot.jpg",
    gallery: [
      "/images/mehndi/vendor-minimalist-knot.jpg",
      "/images/mehndi/minimal-mehndi.jpg",
      "https://images.unsplash.com/photo-1770823916285-f918f2107a08?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Minimal Mehndi",
      "Engagement Mehndi",
      "Arabic Mehndi",
      "Customized Mehndi Designs",
    ],
    about:
      "Perfect for modern brides and bridesmaid parties seeking delicate concentric mandalas, glove-style finger bands, and chic geometric wristlets.",
    packageDetails:
      "Simple center mandala, lace finger rings, and minimalist wrist cuffs. Fast application under 45 minutes with fresh organic henna.",
  },
  {
    id: "moradabad-utsav-henna",
    name: "Moradabad Utsav Mehndi Artists",
    studio: "Utsav Mehndi Parivar",
    city: "Moradabad",
    location: "Civil Lines, Moradabad",
    priceStarting: 3500,
    priceDisplay: "₹3,500",
    experience: "8+ Years Artistry",
    speciality: "Family Sangeet & Traditional Henna",
    homeService: true,
    studioService: false,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 40 Guests",
    image: "/images/mehndi/family-guest-mehndi.jpg",
    gallery: [
      "/images/mehndi/family-guest-mehndi.jpg",
      "/images/mehndi/haldi-prewedding-mehndi.jpg",
      "https://images.unsplash.com/photo-1780326761884-04dedf3778f8?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Family Mehndi",
      "Guest Mehndi",
      "Traditional Indian Mehndi",
      "Bridal Mehndi",
    ],
    about:
      "Energetic and punctual team of artists adept at handling heavy guest queues during Sangeet nights while keeping high design elegance.",
    packageDetails:
      "Covers bride medium bridal application, plus speed henna for up to 25 female family members and friends on the wedding eve.",
  },
  {
    id: "taj-royal-henna-agra",
    name: "Taj Heritage Henna Studio",
    studio: "Taj Henna Designers",
    city: "Agra",
    location: "Fatehabad Road, Agra",
    priceStarting: 8500,
    priceDisplay: "₹8,500",
    experience: "10+ Years Artistry",
    speciality: "Mughal Jaali & Monument Motifs",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 25 Guests",
    image:
      "https://images.unsplash.com/photo-1730003873829-09b4b16444c1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1730003873829-09b4b16444c1?auto=format&fit=crop&w=800&q=80",
      "/images/mehndi/traditional-indian-mehndi.jpg",
      "/images/mehndi/vendor-royal-marwar.jpg",
    ],
    services: [
      "Bridal Mehndi",
      "Customized Mehndi Designs",
      "Traditional Indian Mehndi",
      "Feet Mehndi",
    ],
    about:
      "Intricately captures Mughal archways, lotus jaalis, and personalized bride-groom initials hidden within symmetrical floral vines.",
    packageDetails:
      "Comprehensive bridal elbows-to-fingers henna, ankle-high feet motifs, special eucalyptus-lemon spray, and couple monogram personalization.",
  },
  {
    id: "glam-couture-henna-mumbai",
    name: "Glam Couture Mehndi by Priya",
    studio: "Priya Henna Lounge",
    city: "Mumbai",
    location: "Khar & Santacruz, Mumbai",
    priceStarting: 22000,
    priceDisplay: "₹22,000",
    experience: "12+ Years Artistry",
    speciality: "Celebrity Bridal & Multi-Day Packages",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 50 Guests (Team of 4)",
    image:
      "https://images.unsplash.com/photo-1775495786474-3bf8c7e031d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1775495786474-3bf8c7e031d5?auto=format&fit=crop&w=800&q=80",
      "/images/mehndi/bridal-mehndi.jpg",
      "/images/mehndi/vendor-aarohi-delhi.jpg",
    ],
    services: [
      "Bridal Mehndi",
      "Customized Mehndi Designs",
      "Feet Mehndi",
      "Family Mehndi",
      "Engagement Mehndi",
    ],
    about:
      "Favorite amongst destination brides across Mumbai, Goa, and Udaipur. Known for bespoke love story depiction, city skyline skylights, and deep mahogany tone guaranteed.",
    packageDetails:
      "VIP bridal package with master artist Priya personally applying bride henna, plus 3 senior assistants covering mother, sisters, and 30 guests.",
  },
  {
    id: "delhi-shagun-henna-art",
    name: "Shagun Henna Creations",
    studio: "Shagun Mehndi Studio",
    city: "Delhi",
    location: "Lajpat Nagar & Rohini, Delhi",
    priceStarting: 5500,
    priceDisplay: "₹5,500",
    experience: "6+ Years Artistry",
    speciality: "Vibrant Haldi & Sangeet Group Henna",
    homeService: true,
    studioService: false,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 35 Guests",
    image: "/images/mehndi/haldi-prewedding-mehndi.jpg",
    gallery: [
      "/images/mehndi/haldi-prewedding-mehndi.jpg",
      "/images/mehndi/family-guest-mehndi.jpg",
      "https://images.unsplash.com/photo-1780326761884-04dedf3778f8?auto=format&fit=crop&w=800&q=80",
    ],
    services: [
      "Traditional Indian Mehndi",
      "Arabic Mehndi",
      "Family Mehndi",
      "Guest Mehndi",
    ],
    about:
      "Specialized in pre-wedding ceremony coordination, Haldi palm bands, guest fast-henna, and traditional Indian dholak celebration aesthetics.",
    packageDetails:
      "Includes 2 experienced artists for 4 hours of non-stop application for female guests, plus simple palm designs for groom and male relatives.",
  },
  {
    id: "udaipur-raj-darbar-henna",
    name: "Raj Darbar Bridal Henna",
    studio: "Darbar Henna Palace",
    city: "Jaipur",
    location: "C-Scheme, Jaipur",
    priceStarting: 18000,
    priceDisplay: "₹18,000",
    experience: "13+ Years Artistry",
    speciality: "Heritage Mandap & Royal Procession Motifs",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 40 Guests",
    image:
      "https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?auto=format&fit=crop&w=800&q=80",
      "/images/mehndi/rajasthani-mehndi.jpg",
      "/images/mehndi/vendor-royal-marwar.jpg",
    ],
    services: [
      "Rajasthani Mehndi",
      "Bridal Mehndi",
      "Feet Mehndi",
      "Customized Mehndi Designs",
    ],
    about:
      "Orchestrates grand palace wedding henna rituals with live shehnai background. Incorporates caparisoned elephants, royal peacocks, and bridal doli details.",
    packageDetails:
      "Full knees-to-toes feet henna, elbow-high intricate arm patterns, personalized story panels, and specialized overnight clove-smoke aftercare.",
  },
  {
    id: "noida-elite-henna-lounge",
    name: "Elite Henna by Kavita",
    studio: "Kavita Mehndi Lounge",
    city: "Noida",
    location: "Sector 18, Noida",
    priceStarting: 9000,
    priceDisplay: "₹9,000",
    experience: "8+ Years Artistry",
    speciality: "Engagement & Sangeet Party Henna",
    homeService: true,
    studioService: true,
    travelToVenue: true,
    bridalPackageAvailable: true,
    guestCapacity: "Up to 20 Guests",
    image: "/images/mehndi/engagement-mehndi.jpg",
    gallery: [
      "/images/mehndi/engagement-mehndi.jpg",
      "https://images.unsplash.com/photo-1770823916285-f918f2107a08?auto=format&fit=crop&w=800&q=80",
      "/images/mehndi/vendor-zoya-arabic.jpg",
    ],
    services: [
      "Engagement Mehndi",
      "Arabic Mehndi",
      "Bridal Mehndi",
      "Minimal Mehndi",
    ],
    about:
      "Specializes in chic ring-ceremony engagement henna, leafy wrist bracelets, floral vine fingers, and dark stain chemical-free herbal preparations.",
    packageDetails:
      "Forearm engagement design with delicate lace mesh, matching back-hand trails, and quick 2-hour completion.",
  },
  {
    id: "lucknow-zeenat-henna",
    name: "Zeenat Bridal Henna Art",
    studio: "Zeenat Mehndi Studio",
    city: "Lucknow",
    location: "Aminabad & Chowk, Lucknow",
    priceStarting: 2500,
    priceDisplay: "₹2,500",
    experience: "6+ Years Artistry",
    speciality: "Traditional Chandni Chowk & Awadhi Floral",
    homeService: true,
    studioService: false,
    travelToVenue: false,
    bridalPackageAvailable: true,
    guestCapacity: "Bride & 10 Guests",
    image:
      "https://images.unsplash.com/photo-1719468452346-20bbb785de2e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1719468452346-20bbb785de2e?auto=format&fit=crop&w=800&q=80",
      "/images/mehndi/arabic-mehndi.jpg",
      "/images/mehndi/vendor-avadh-shringaar.jpg",
    ],
    services: [
      "Arabic Mehndi",
      "Traditional Indian Mehndi",
      "Minimal Mehndi",
      "Engagement Mehndi",
    ],
    about:
      "Budget-friendly traditional henna artist serving home visits in Lucknow. Known for reliable attendance, sweet floral aroma henna, and clean execution.",
    packageDetails:
      "Both hands palm and back wrists, simple feet borders, and complimentary henna for mother and mother-in-law.",
  },
];

// =========================================================================
// TAXONOMY & FILTERS
// =========================================================================
const CITIES = [
  "All Cities",
  "Delhi",
  "Jaipur",
  "Lucknow",
  "Noida",
  "Moradabad",
  "Agra",
  "Mumbai",
];

const MEHNDI_SERVICES = [
  "All Services",
  "Bridal Mehndi",
  "Arabic Mehndi",
  "Traditional Indian Mehndi",
  "Rajasthani Mehndi",
  "Minimal Mehndi",
  "Engagement Mehndi",
  "Family Mehndi",
  "Guest Mehndi",
  "Feet Mehndi",
  "Customized Mehndi Designs",
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹2,000", value: "under-2k" },
  { label: "₹2,000–₹5,000", value: "2k-5k" },
  { label: "₹5,000–₹10,000", value: "5k-10k" },
  { label: "₹10,000–₹20,000", value: "10k-20k" },
  { label: "Above ₹20,000", value: "above-20k" },
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Artist Name: A to Z", value: "name-asc" },
];

// =========================================================================
// CATEGORY CARDS DATA (SECTION 4)
// =========================================================================
const CATEGORY_CARDS = [
  {
    title: "Bridal Mehndi",
    filterService: "Bridal Mehndi",
    description: "Elbows-to-fingertips storytelling henna with portrait & ritual motifs.",
    image: "/images/mehndi/bridal-mehndi.jpg",
  },
  {
    title: "Arabic Mehndi",
    filterService: "Arabic Mehndi",
    description: "Flowing freehand floral vines, bold leaf shading, and modern negative space.",
    image: "/images/mehndi/arabic-mehndi.jpg",
  },
  {
    title: "Traditional Indian Mehndi",
    filterService: "Traditional Indian Mehndi",
    description: "Classic paisleys, sacred peacocks, dholak bells, and symmetrical jaali work.",
    image: "/images/mehndi/traditional-indian-mehndi.jpg",
  },
  {
    title: "Minimal Mehndi Designs",
    filterService: "Minimal Mehndi",
    description: "Delicate central mandalas, lace finger bands, and chic modern wrist cuffs.",
    image: "/images/mehndi/minimal-mehndi.jpg",
  },
  {
    title: "Engagement Mehndi",
    filterService: "Engagement Mehndi",
    description: "Chic and lightweight wristlet and finger trails designed for ring ceremonies.",
    image: "/images/mehndi/engagement-mehndi.jpg",
  },
  {
    title: "Family & Guest Mehndi",
    filterService: "Family Mehndi",
    description: "Fast, energetic group artists for Sangeet nights and large wedding parties.",
    image: "/images/mehndi/family-guest-mehndi.jpg",
  },
  {
    title: "Rajasthani Mehndi",
    filterService: "Rajasthani Mehndi",
    description: "Dense, intricate Mewari marodi lines, elephant figures, and royal palanquins.",
    image: "/images/mehndi/rajasthani-mehndi.jpg",
  },
  {
    title: "Haldi & Pre-Wedding Mehndi",
    filterService: "Guest Mehndi",
    description: "Fresh floral palm bands, festive yellow haldi patterns, and groom shagun.",
    image: "/images/mehndi/haldi-prewedding-mehndi.jpg",
  },
];

// =========================================================================
// INSPIRATION GALLERY (SECTION 11)
// =========================================================================
const INSPIRATION_GALLERY = [
  {
    title: "Intricate Bridal Hand Mehndi",
    filterService: "Bridal Mehndi",
    caption: "Full palm and forearm coverage showcasing royal Indian wedding rituals.",
    image: "/images/mehndi/bridal-mehndi.jpg",
  },
  {
    title: "Full Bridal Arm Designs",
    filterService: "Bridal Mehndi",
    caption: "Graceful continuous wrist-to-elbow sleeves with temple jaali borders.",
    image: "/images/mehndi/rajasthani-mehndi.jpg",
  },
  {
    title: "Traditional Indian Patterns",
    filterService: "Traditional Indian Mehndi",
    caption: "Auspicious peacocks, blooming lotus florets, and concentric circular mandalas.",
    image: "/images/mehndi/traditional-indian-mehndi.jpg",
  },
  {
    title: "Arabic Floral Mehndi",
    filterService: "Arabic Mehndi",
    caption: "Bold shaded leaves, diagonal wrist trails, and breathable modern spacing.",
    image: "/images/mehndi/arabic-mehndi.jpg",
  },
  {
    title: "Minimal Modern Mehndi",
    filterService: "Minimal Mehndi",
    caption: "Understated geometric rings and micro-mandala art for contemporary brides.",
    image: "/images/mehndi/minimal-mehndi.jpg",
  },
  {
    title: "Bridal Feet Mehndi",
    filterService: "Feet Mehndi",
    caption: "Symmetrical ankle anklet bands, toe florets, and intricate archway arches.",
    image: "/images/mehndi/traditional-indian-mehndi.jpg",
  },
  {
    title: "Groom Mehndi Designs",
    filterService: "Customized Mehndi Designs",
    caption: "Refined minimalist initials, auspicious Om/Swastik, and subtle wrist accents.",
    image: "/images/mehndi/engagement-mehndi.jpg",
  },
  {
    title: "Mehndi Ceremony Inspiration",
    filterService: "Family Mehndi",
    caption: "Festive sangeet and mehndi celebration setups with music, colors, and joy.",
    image: "/images/mehndi/haldi-prewedding-mehndi.jpg",
  },
];

// =========================================================================
// FAQS (SECTION 13)
// =========================================================================
const FAQS = [
  {
    q: "How much does bridal mehndi cost?",
    a: "Bridal mehndi rates typically range between ₹5,000 to ₹15,000 for standard elbow and feet coverage. High-end bespoke bridal packages with detailed couple portraits and custom story panels generally range from ₹15,000 to ₹30,000+. Minimalist engagement mehndi starts around ₹1,800 to ₹4,500.",
  },
  {
    q: "How early should bridal mehndi be booked?",
    a: "During peak Indian wedding season (October to March) and auspicious dates (saaya dates), experienced mehndi artists get booked 3 to 6 months in advance. Booking early ensures you reserve your preferred artist and can arrange an in-person or digital design consultation.",
  },
  {
    q: "How long does bridal mehndi application take?",
    a: "Intricate bridal mehndi covering full arms (front and back) and feet up to mid-calf usually takes 4 to 6 hours. Minimalist or modern Arabic designs can be finished in 1.5 to 3 hours. It is recommended to schedule the application 24 to 48 hours before the main wedding ceremony so the stain develops its deepest mahogany color.",
  },
  {
    q: "Do mehndi artists provide home service?",
    a: "Yes, the majority of professional mehndi artists featured on ShubhVivah offer home and destination venue service. They travel with their own organic henna cones, essential oils, and aftercare supplies. For destination weddings outside their city, travel and stay expenses are arranged by the client.",
  },
  {
    q: "Can the bride request customized designs?",
    a: "Absolutely. Professional artists can customize your bridal henna with couple portraits, wedding dates, proposal city skylines, personal hashtags, devotional shlokas, or meaningful secret initials hidden within the intricate jaali patterns.",
  },
  {
    q: "Is mehndi available for family members and wedding guests?",
    a: "Yes, most bridal artists lead teams with junior and assistant artists who specialize in fast guest application (often 5 to 10 minutes per person) for Sangeet nights and Mehendi parties. You can book group packages based on your estimated guest count.",
  },
];

export default function MehndiArtistPage() {
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Additional Filter Checkboxes
  const [homeServiceOnly, setHomeServiceOnly] = useState(false);
  const [travelVenueOnly, setTravelVenueOnly] = useState(false);
  const [bridalPackageOnly, setBridalPackageOnly] = useState(false);
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);

  // Mobile drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Shortlist state
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals state
  const [portfolioArtist, setPortfolioArtist] = useState(null);
  const [enquiryArtist, setEnquiryArtist] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(0);

  // Enquiry Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    weddingDate: "",
    city: "",
    service: "Bridal Mehndi",
    peopleCount: "Bride Only",
    style: "Intricate Bridal Storytelling",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Shortlist toggle
  const toggleShortlist = (id) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedService("All Services");
    setSelectedBudget("all");
    setHomeServiceOnly(false);
    setTravelVenueOnly(false);
    setBridalPackageOnly(false);
    setSortBy("recommended");
    setOnlyShortlisted(false);
  };

  // Active filters count
  const activeFiltersCount =
    (searchTerm.trim() ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (selectedService !== "All Services" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0) +
    (homeServiceOnly ? 1 : 0) +
    (travelVenueOnly ? 1 : 0) +
    (bridalPackageOnly ? 1 : 0) +
    (onlyShortlisted ? 1 : 0);

  // Filter & Sort Logic
  const filteredArtists = useMemo(() => {
    let result = MEHNDI_ARTISTS_DATA.filter((artist) => {
      // Shortlist filter
      if (onlyShortlisted && !shortlistedIds.includes(artist.id)) {
        return false;
      }

      // Search term (artist name, studio, city, service)
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesStudio = artist.studio.toLowerCase().includes(q);
        const matchesCity = artist.city.toLowerCase().includes(q);
        const matchesLocation = artist.location.toLowerCase().includes(q);
        const matchesSpeciality = artist.speciality.toLowerCase().includes(q);
        const matchesService = artist.services.some((s) =>
          s.toLowerCase().includes(q)
        );

        if (
          !matchesName &&
          !matchesStudio &&
          !matchesCity &&
          !matchesLocation &&
          !matchesSpeciality &&
          !matchesService
        ) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "All Cities" && artist.city !== selectedCity) {
        return false;
      }

      // Service filter
      if (
        selectedService !== "All Services" &&
        !artist.services.includes(selectedService)
      ) {
        return false;
      }

      // Budget filter
      if (selectedBudget === "under-2k" && artist.priceStarting >= 2000)
        return false;
      if (
        selectedBudget === "2k-5k" &&
        (artist.priceStarting < 2000 || artist.priceStarting > 5000)
      )
        return false;
      if (
        selectedBudget === "5k-10k" &&
        (artist.priceStarting < 5000 || artist.priceStarting > 10000)
      )
        return false;
      if (
        selectedBudget === "10k-20k" &&
        (artist.priceStarting < 10000 || artist.priceStarting > 20000)
      )
        return false;
      if (selectedBudget === "above-20k" && artist.priceStarting <= 20000)
        return false;

      // Additional Filters
      if (homeServiceOnly && !artist.homeService) return false;
      if (travelVenueOnly && !artist.travelToVenue) return false;
      if (bridalPackageOnly && !artist.bridalPackageAvailable) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") return artistPrice(a) - artistPrice(b);
      if (sortBy === "price-desc") return artistPrice(b) - artistPrice(a);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0; // recommended
    });

    return result;
  }, [
    searchTerm,
    selectedCity,
    selectedService,
    selectedBudget,
    homeServiceOnly,
    travelVenueOnly,
    bridalPackageOnly,
    sortBy,
    onlyShortlisted,
    shortlistedIds,
  ]);

  function artistPrice(artist) {
    return artist.priceStarting;
  }

  // Handle Category click from Section 4 or Inspiration Gallery
  const handleApplyCategoryFilter = (serviceName) => {
    setSelectedService(serviceName);
    const directoryEl = document.getElementById("mehndi-artists-directory");
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open Portfolio Modal
  const openPortfolioModal = (artist) => {
    setPortfolioArtist(artist);
    setModalActiveImage(0);
  };

  // Close Portfolio Modal
  const closePortfolioModal = () => {
    setPortfolioArtist(null);
  };

  // Open Enquiry Modal
  const openEnquiryModal = (artist) => {
    setEnquiryArtist(artist);
    setFormData((prev) => ({
      ...prev,
      city: artist.city || "",
    }));
    setFormSubmitted(false);
    setFormErrors({});
  };

  // Close Enquiry Modal
  const closeEnquiryModal = () => {
    setEnquiryArtist(null);
    setFormSubmitted(false);
    setFormErrors({});
  };

  // Handle Enquiry Submit
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your full name.";
    }

    const cleanedPhone = formData.phone.replace(/[\s\-\+]/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errors.phone = "Please enter your mobile number.";
    } else if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 10) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.weddingDate) {
      errors.weddingDate = "Please select your wedding/mehndi date.";
    }

    if (!formData.city.trim()) {
      errors.city = "Please enter your event location or city.";
    }

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
          date: formData.weddingDate,
          location: formData.city,
          message: formData.message,
          service: formData.packageSelected || enquiryArtist?.name || "Mehndi Artist",
          target_id: enquiryArtist?.id || null,
          target_type: "vendor",
          target_name: enquiryArtist?.studio || enquiryArtist?.name || "Mehndi Artist",
          service_or_product: enquiryArtist?.name || "Bridal Mehndi",
          budget: enquiryArtist?.priceStarting ? `₹${Number(enquiryArtist.priceStarting).toLocaleString("en-IN")}` : "₹25,000",
          source: "Mehndi Artist Page",
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
        {/* Background Bridal Mehndi Photography with Dark Overlay */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('/images/mehndi/bridal-mehndi.jpg')",
          }}
        />

        {/* Deep Plum Dark Luxury Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/94 via-[#241321]/88 to-[#241321]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb: Home → Wedding Vendors → Mehndi Artist */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link href="/" className="transition-colors hover:text-[#D6B875]">
              Home
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <Link
              href="/wedding-vendors/bridal-makeup-artist"
              className="transition-colors hover:text-[#D6B875]"
            >
              Wedding Vendors
            </Link>
            <ChevronRight size={13} className="text-[#665038]" />
            <span className="font-semibold text-[#D6B875]">Mehndi Artist</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#321B30]/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875] backdrop-blur-sm">
              <Sparkles size={12} className="text-[#B08D45]" />
              Sacred Henna Artistry
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Find Your Perfect Mehndi Artist
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Discover talented mehndi artists for intricate bridal henna,
              traditional Indian designs, elegant Arabic patterns, and beautiful
              mehndi celebrations.
            </p>
          </div>

          {/* Search & Location Bar */}
          <div className="mt-8 max-w-4xl rounded-2xl border border-[#665038] bg-[#3A2638]/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1fr_auto]">
              {/* Search by artist or studio name */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search artist name, studio, or mehndi style..."
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/70 transition-colors focus:border-[#B08D45] focus:outline-none sm:text-sm"
                  aria-label="Search mehndi artists"
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
                    aria-label="Clear search"
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
                  aria-label="Select city"
                >
                  {CITIES.map((city) => (
                    <option
                      key={city}
                      value={city}
                      className="bg-[#241321] text-[#F8F1E5]"
                    >
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

              {/* Find Mehndi Artists button */}
              <a
                href="#mehndi-artists-directory"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-md transition-all duration-200 hover:brightness-105 active:scale-[0.98] sm:text-sm"
              >
                <span>Find Mehndi Artists</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Quick Filter Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#665038]/50 pt-3 text-[11px] text-[#C9BBAF]">
              <span className="font-medium text-[#D6B875]">Quick Filter:</span>
              {[
                "Bridal Mehndi",
                "Arabic Mehndi",
                "Rajasthani Mehndi",
                "Minimal Mehndi",
                "Home Service",
                "Delhi",
                "Jaipur",
              ].map((chip) => (
                <button suppressHydrationWarning
                  key={chip}
                  type="button"
                  onClick={() => {
                    if (chip === "Home Service") {
                      setHomeServiceOnly((prev) => !prev);
                    } else if (CITIES.includes(chip)) {
                      setSelectedCity(chip);
                    } else {
                      setSelectedService(chip);
                    }
                  }}
                  className={`rounded-full border px-2.5 py-0.5 transition-all ${
                    selectedService === chip ||
                    selectedCity === chip ||
                    (chip === "Home Service" && homeServiceOnly)
                      ? "border-[#D6B875] bg-[#B08D45]/30 text-[#D6B875]"
                      : "border-[#665038] bg-[#241321] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                  }`}
                >
                  {chip}
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
          2. MEHNDI CATEGORY CARDS (SECTION 4)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
            Explore Henna Styles
          </span>
          <h2 className="mt-2 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
            Popular Mehndi Categories
          </h2>
          <p className="mt-1 text-xs text-[#C9BBAF] sm:text-sm">
            Select a style to instantly browse dedicated artists specializing in that aesthetic.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.title}
              onClick={() => handleApplyCategoryFilter(cat.filterService)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-[#665038] bg-[#321B30] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl"
            >
              <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#241321]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241321]/90 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 rounded-full border border-[#665038] bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875]">
                  {cat.filterService}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="font-serif text-base font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#C9BBAF] line-clamp-2">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#D6B875] group-hover:translate-x-1 transition-transform">
                  <span>Browse Artists</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. VENDOR LISTING LAYOUT (SECTION 5)
         ========================================================================= */}
      <section
        id="mehndi-artists-directory"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-t border-[#665038]/60"
      >
        {/* Directory Controls Header */}
        <div className="flex flex-col gap-4 border-b border-[#665038] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                Mehndi Artists
              </h2>
              <span className="rounded-full border border-[#B08D45]/50 bg-[#321B30] px-3 py-0.5 text-xs font-semibold text-[#D6B875]">
                {filteredArtists.length}{" "}
                {filteredArtists.length === 1 ? "Artist" : "Artists"}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#C9BBAF] sm:text-sm">
              Verified bridal henna designers, Arabic specialists, and family event teams.
            </p>
          </div>

          {/* Controls: Shortlist, Mobile Filters, and Sorting */}
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
                className={
                  onlyShortlisted
                    ? "fill-[#D6B875] text-[#D6B875]"
                    : "text-[#B08D45]"
                }
              />
              <span>Shortlist ({shortlistedIds.length})</span>
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
                aria-label="Sort artists by"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-[#321B30] text-[#F8F1E5]"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C9BBAF]"
              />
            </div>

            {/* Clear All Filters */}
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

        {/* Listing Layout: Sidebar on Desktop + 3 Cards/row on Large Screen */}
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
                    Refine Artists
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
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  City / Location
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-9 pr-8 text-xs text-[#F8F1E5] transition-colors focus:border-[#B08D45] focus:outline-none"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#241321]">
                        {c === "All Cities" ? "All Locations" : c}
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

              {/* Mehndi Services Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Mehndi Services
                </label>
                <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1 text-xs">
                  {MEHNDI_SERVICES.map((srv) => {
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
                  Starting Package Price
                </label>
                <div className="space-y-1.5">
                  {BUDGET_OPTIONS.map((b) => (
                    <label
                      key={b.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                    >
                      <input
                        type="radio"
                        name="desktop-henna-budget"
                        value={b.value}
                        checked={selectedBudget === b.value}
                        onChange={() => setSelectedBudget(b.value)}
                        className="accent-[#B08D45]"
                      />
                      <span
                        className={
                          selectedBudget === b.value
                            ? "font-semibold text-[#D6B875]"
                            : ""
                        }
                      >
                        {b.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Service Capabilities */}
              <div className="border-t border-[#665038]/60 pt-4 space-y-2.5 text-xs">
                <label className="mb-1 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Service Preferences
                </label>

                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span className="flex items-center gap-1.5">
                    <Home size={13} className="text-[#B08D45]" />
                    <span>Home Service Available</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={homeServiceOnly}
                    onChange={(e) => setHomeServiceOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span className="flex items-center gap-1.5">
                    <Car size={13} className="text-[#B08D45]" />
                    <span>Travel to Wedding Venue</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={travelVenueOnly}
                    onChange={(e) => setTravelVenueOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span className="flex items-center gap-1.5">
                    <Feather size={13} className="text-[#B08D45]" />
                    <span>Bridal Package Available</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={bridalPackageOnly}
                    onChange={(e) => setBridalPackageOnly(e.target.checked)}
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
              RESPONSIVE ARTIST CARDS GRID
              3 cards per row on large desktop (lg:grid-cols-3)
              2 cards per row on tablets (sm:grid-cols-2)
              1 card per row on mobile (grid-cols-1)
             ========================================================================= */}
          <div className="lg:col-span-3">
            {filteredArtists.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center rounded-3xl border border-[#665038] bg-[#321B30] p-12 text-center shadow-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#D6B875]">
                  <Palette size={28} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  No Matching Mehndi Artists Found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
                  We couldn&apos;t find any mehndi artists matching your selected filters or search
                  criteria. Try adjusting your city, budget, or service options.
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
                {filteredArtists.map((artist) => {
                  const isShortlisted = shortlistedIds.includes(artist.id);

                  return (
                    <article
                      key={artist.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-[#B08D45]/10"
                    >
                      {/* Card Image Container */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#241321]">
                        <Image
                          src={artist.image}
                          alt={`${artist.name} bridal mehndi design in ${artist.city}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />

                        {/* City Badge */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full border border-[#665038] bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                            {artist.city}
                          </span>
                        </div>

                        {/* Shortlist Heart Button */}
                        <button suppressHydrationWarning
                          type="button"
                          onClick={() => toggleShortlist(artist.id)}
                          aria-label={
                            isShortlisted
                              ? `Remove ${artist.name} from shortlist`
                              : `Add ${artist.name} to shortlist`
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

                        {/* Starting Price Tag */}
                        <div className="absolute bottom-2.5 left-3">
                          <span className="rounded-md border border-[#665038] bg-[#241321]/95 px-2.5 py-1 text-xs font-bold text-[#F8F1E5] backdrop-blur-sm">
                            Starts <span className="text-[#D6B875]">{artist.priceDisplay}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-1 flex-col p-4">
                        {/* Experience & Studio */}
                        <div className="flex items-center justify-between text-[11px] text-[#C9BBAF]">
                          <span className="text-[#D6B875] font-medium truncate">
                            {artist.experience}
                          </span>
                          <span className="shrink-0 flex items-center gap-1 text-[10px]">
                            <MapPin size={11} className="text-[#B08D45]" />
                            {artist.city}
                          </span>
                        </div>

                        {/* Artist Name */}
                        <h3 className="mt-1 font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                          {artist.name}
                        </h3>

                        {/* Studio Name & Location */}
                        <p className="text-xs text-[#C9BBAF] truncate">
                          {artist.studio}
                        </p>

                        {/* Short Description */}
                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                          {artist.about}
                        </p>

                        {/* Service Badges */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {artist.services.slice(0, 3).map((srv) => (
                            <span
                              key={srv}
                              className="rounded border border-[#665038]/60 bg-[#241321] px-2 py-0.5 text-[10px] text-[#C9BBAF]"
                            >
                              {srv}
                            </span>
                          ))}
                          {artist.services.length > 3 && (
                            <span className="rounded border border-[#665038]/60 bg-[#241321] px-1.5 py-0.5 text-[10px] text-[#D6B875]">
                              +{artist.services.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Logistics Capability Pills */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-[#C9BBAF]/80">
                          {artist.homeService && (
                            <span className="flex items-center gap-1 text-[#D6B875]">
                              <Home size={10} /> Home Service
                            </span>
                          )}
                          {artist.travelToVenue && (
                            <span className="flex items-center gap-1">
                              <Car size={10} /> Venue Travel
                            </span>
                          )}
                        </div>

                        {/* Action Buttons: View Portfolio & Send Enquiry */}
                        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#665038]/60 pt-3">
                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => openPortfolioModal(artist)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#665038] bg-[#321B30] px-2.5 py-2 text-xs font-semibold text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <Eye size={12} />
                            <span>Portfolio</span>
                          </button>

                          <button suppressHydrationWarning
                            type="button"
                            onClick={() => openEnquiryModal(artist)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-2.5 py-2 text-xs font-semibold text-[#241321] shadow-md transition-all hover:brightness-105 active:scale-95"
                          >
                            <Send size={12} />
                            <span>Enquire</span>
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
          4. MOBILE FILTER DRAWER
         ========================================================================= */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm lg:hidden"
        >
          <div className="flex h-full w-full max-w-xs flex-col border-l border-[#665038] bg-[#321B30] p-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#665038] pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#D6B875]" />
                <span className="font-serif text-lg font-bold text-[#F8F1E5]">
                  Filter Mehndi Artists
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

            {/* Body */}
            <div className="flex-1 space-y-5 overflow-y-auto py-4 text-xs">
              {/* City */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  City / Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-xs text-[#F8F1E5]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#241321]">
                      {c === "All Cities" ? "All Locations" : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Mehndi Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-xs text-[#F8F1E5]"
                >
                  {MEHNDI_SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[#241321]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Budget Range
                </label>
                <div className="space-y-1.5">
                  {BUDGET_OPTIONS.map((b) => (
                    <label
                      key={b.value}
                      className="flex cursor-pointer items-center gap-2 text-[#C9BBAF]"
                    >
                      <input
                        type="radio"
                        name="mobile-henna-budget"
                        value={b.value}
                        checked={selectedBudget === b.value}
                        onChange={() => setSelectedBudget(b.value)}
                        className="accent-[#B08D45]"
                      />
                      <span
                        className={
                          selectedBudget === b.value
                            ? "font-semibold text-[#D6B875]"
                            : ""
                        }
                      >
                        {b.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Toggles */}
              <div className="border-t border-[#665038]/60 pt-3 space-y-2">
                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span>Home Service Available</span>
                  <input
                    type="checkbox"
                    checked={homeServiceOnly}
                    onChange={(e) => setHomeServiceOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span>Travel to Wedding Venue</span>
                  <input
                    type="checkbox"
                    checked={travelVenueOnly}
                    onChange={(e) => setTravelVenueOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>

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

            {/* Actions */}
            <div className="border-t border-[#665038] pt-4 space-y-2">
              <button suppressHydrationWarning
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-2.5 text-center text-xs font-semibold text-[#241321]"
              >
                Apply Filters ({filteredArtists.length})
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
          5. ARTIST PORTFOLIO MODAL (SECTION 8)
         ========================================================================= */}
      {portfolioArtist && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button suppressHydrationWarning
              type="button"
              onClick={closePortfolioModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              aria-label="Close portfolio modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#665038] bg-[#241321] px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  {portfolioArtist.city}
                </span>
                <span className="text-xs text-[#C9BBAF]">
                  • {portfolioArtist.experience}
                </span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                {portfolioArtist.name}
              </h3>
              <p className="text-xs text-[#C9BBAF]">{portfolioArtist.studio}</p>

              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="font-serif text-xl font-bold text-[#D6B875]">
                  Starting at {portfolioArtist.priceDisplay}
                </span>
                <span className="text-[#665038]">•</span>
                <span className="text-[#F8F1E5]">{portfolioArtist.speciality}</span>
              </div>
            </div>

            {/* Gallery Image Display */}
            <div className="mt-5 space-y-3">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-[#665038] bg-[#241321] sm:h-80">
                <Image
                  src={
                    portfolioArtist.gallery[modalActiveImage] ||
                    portfolioArtist.image
                  }
                  alt={`${portfolioArtist.name} mehndi portfolio angle`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails */}
              {portfolioArtist.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {portfolioArtist.gallery.map((img, idx) => (
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
                        alt={`Portfolio thumbnail ${idx + 1}`}
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
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 text-xs">
              {/* Artistry Style & Description */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4 space-y-2">
                <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-[#D6B875]">
                  <Palette size={15} />
                  Artistry Philosophy
                </h4>
                <p className="leading-relaxed text-[#C9BBAF]">
                  {portfolioArtist.about}
                </p>
                <div className="pt-2 text-[#F8F1E5] flex items-center gap-1">
                  <MapPin size={12} className="text-[#B08D45]" />
                  <span>{portfolioArtist.location}</span>
                </div>
              </div>

              {/* Bridal Package Details */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4 space-y-2">
                <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-[#D6B875]">
                  <Sparkles size={15} />
                  Bridal Package Inclusions
                </h4>
                <p className="leading-relaxed text-[#C9BBAF]">
                  {portfolioArtist.packageDetails}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#F8F1E5]">
                  <span className="rounded bg-[#241321] px-2 py-0.5 border border-[#665038]">
                    {portfolioArtist.guestCapacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Available Mehndi Styles */}
            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                Specialized Mehndi Services:
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {portfolioArtist.services.map((srv) => (
                  <span
                    key={srv}
                    className="inline-flex items-center gap-1 rounded-full border border-[#665038] bg-[#241321] px-3 py-1 text-xs text-[#C9BBAF]"
                  >
                    <CheckCircle2 size={12} className="text-[#B08D45]" />
                    <span>{srv}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#665038] pt-5">
              <button suppressHydrationWarning
                type="button"
                onClick={() => toggleShortlist(portfolioArtist.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                  shortlistedIds.includes(portfolioArtist.id)
                    ? "border-[#D6B875] bg-[#241321] text-[#D6B875]"
                    : "border-[#665038] bg-[#241321] text-[#F8F1E5] hover:border-[#B08D45]"
                }`}
              >
                <Heart
                  size={15}
                  className={
                    shortlistedIds.includes(portfolioArtist.id)
                      ? "fill-[#D6B875] text-[#D6B875]"
                      : "text-[#B08D45]"
                  }
                />
                <span>
                  {shortlistedIds.includes(portfolioArtist.id)
                    ? "Shortlisted"
                    : "Add to Shortlist"}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button suppressHydrationWarning
                  type="button"
                  onClick={closePortfolioModal}
                  className="rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-xs font-medium text-[#F8F1E5] hover:bg-[#3A2638]"
                >
                  Close
                </button>
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    const sel = portfolioArtist;
                    closePortfolioModal();
                    openEnquiryModal(sel);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                >
                  <Send size={14} />
                  <span>Check Availability &amp; Rates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. ENQUIRY MODAL (SECTION 9)
         ========================================================================= */}
      {enquiryArtist && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button suppressHydrationWarning
              type="button"
              onClick={closeEnquiryModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              aria-label="Close enquiry modal"
            >
              <X size={18} />
            </button>

            {formSubmitted ? (
              // Success State
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B08D45] bg-[#241321] text-[#D6B875]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquiry Form Completed!
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                  Thank you, <span className="font-semibold text-[#D6B875]">{formData.name}</span>.
                  Your request details for{" "}
                  <span className="font-semibold text-[#F8F1E5]">{enquiryArtist.name}</span> have
                  been validated on this frontend preview.
                </p>

                {/* Recap */}
                <div className="mt-5 rounded-2xl border border-[#665038] bg-[#3A2638] p-4 text-left text-xs space-y-1.5 text-[#C9BBAF]">
                  <p>
                    <span className="text-[#D6B875] font-medium">Artist:</span>{" "}
                    {enquiryArtist.name} ({formData.city})
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Wedding Date:</span>{" "}
                    {formData.weddingDate}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Required Service:</span>{" "}
                    {formData.service}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">People Requiring Henna:</span>{" "}
                    {formData.peopleCount}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Contact Phone:</span>{" "}
                    {formData.phone}
                  </p>
                </div>

                {/* Integration Notice */}
                <div className="mt-4 rounded-xl border border-[#B08D45]/40 bg-[#241321] p-3 text-left text-[11px] text-[#D6B875]">
                  <p className="font-semibold uppercase tracking-wider">Frontend Notice:</p>
                  <p className="mt-0.5 text-[#C9BBAF]">
                    This is a frontend demonstration. In production, this form will connect to the
                    ShubhVivah backend API to dispatch live WhatsApp &amp; Email booking inquiries
                    directly to the artist.
                  </p>
                </div>

                <button suppressHydrationWarning
                  type="button"
                  onClick={closeEnquiryModal}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-8 py-2.5 text-xs font-semibold text-[#241321] shadow-lg hover:brightness-105"
                >
                  Done
                </button>
              </div>
            ) : (
              // Form
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Bridal &amp; Event Henna Booking
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquire with {enquiryArtist.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Check slot availability for your wedding date and request personalized package quotes.
                </p>

                <form onSubmit={handleEnquirySubmit} className="mt-6 space-y-4 text-xs">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Full Name <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Ananya Sen"
                        className={`w-full rounded-xl border bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none ${
                          formErrors.name
                            ? "border-red-400"
                            : "border-[#665038] focus:border-[#B08D45]"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-[11px] text-red-400">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Mobile Number <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="e.g. 9876543210"
                        className={`w-full rounded-xl border bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none ${
                          formErrors.phone
                            ? "border-red-400"
                            : "border-[#665038] focus:border-[#B08D45]"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-[11px] text-red-400">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Wedding Date */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Email Address <span className="text-[10px] text-[#C9BBAF]">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="e.g. ananya@example.com"
                        className={`w-full rounded-xl border bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none ${
                          formErrors.email
                            ? "border-red-400"
                            : "border-[#665038] focus:border-[#B08D45]"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-[11px] text-red-400">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Wedding / Mehndi Date <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            weddingDate: e.target.value,
                          }))
                        }
                        className={`w-full rounded-xl border bg-[#241321] p-2.5 text-[#F8F1E5] focus:outline-none ${
                          formErrors.weddingDate
                            ? "border-red-400"
                            : "border-[#665038] focus:border-[#B08D45]"
                        }`}
                      />
                      {formErrors.weddingDate && (
                        <p className="mt-1 text-[11px] text-red-400">
                          {formErrors.weddingDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* City & Required Service */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Event Location / City <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="e.g. South Delhi, Jaipur Palace, etc."
                        className={`w-full rounded-xl border bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:outline-none ${
                          formErrors.city
                            ? "border-red-400"
                            : "border-[#665038] focus:border-[#B08D45]"
                        }`}
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-[11px] text-red-400">
                          {formErrors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Required Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, service: e.target.value }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        {MEHNDI_SERVICES.filter((s) => s !== "All Services").map((s) => (
                          <option key={s} value={s} className="bg-[#241321]">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* People Count & Preferred Mehndi Style */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Number of People Requiring Henna
                      </label>
                      <select
                        value={formData.peopleCount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            peopleCount: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        <option value="Bride Only (Full Arms & Feet)">
                          Bride Only (Full Arms &amp; Feet)
                        </option>
                        <option value="Bride + Close Family (3–5 Persons)">
                          Bride + Close Family (3–5 Persons)
                        </option>
                        <option value="Bride + Sangeet Party (10–20 Guests)">
                          Bride + Sangeet Party (10–20 Guests)
                        </option>
                        <option value="Large Wedding Celebration (20–50+ Guests)">
                          Large Wedding Celebration (20–50+ Guests)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Preferred Mehndi Style
                      </label>
                      <select
                        value={formData.style}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, style: e.target.value }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        <option value="Intricate Bridal Storytelling">Intricate Bridal Storytelling</option>
                        <option value="Arabic Freehand Floral">Arabic Freehand Floral</option>
                        <option value="Traditional Rajasthani Marodi">Traditional Rajasthani Marodi</option>
                        <option value="Minimalist Mandalas">Minimalist Mandalas</option>
                        <option value="Awadhi Delicate Jaali">Awadhi Delicate Jaali</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1 block font-medium text-[#F8F1E5]">
                      Additional Customization Details or Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Mention custom portrait requirements, venue timing, organic cone preferences, or specific motif requests..."
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:border-[#B08D45] focus:outline-none"
                    />
                  </div>

                  {/* Disclaimer */}
                  <p className="text-[11px] leading-relaxed text-[#C9BBAF]">
                    By submitting, your request will be matched with{" "}
                    <span className="text-[#D6B875] font-medium">
                      {enquiryArtist.name}
                    </span>. Note: Actual enquiry delivery requires backend API connection.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button suppressHydrationWarning
                      type="button"
                      onClick={closeEnquiryModal}
                      className="rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 font-medium text-[#F8F1E5] hover:bg-[#3A2638]"
                    >
                      Cancel
                    </button>
                    <button suppressHydrationWarning
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                    >
                      <Send size={14} />
                      <span>Submit Free Enquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          7. MEHNDI INSPIRATION GALLERY (SECTION 11)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#321B30] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Henna Artistry Lookbook
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Mehndi Inspiration Gallery
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
              Discover breathtaking henna compositions across traditional, Arabic,
              and contemporary bridal aesthetics. Click any style to filter artists.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INSPIRATION_GALLERY.map((story) => (
              <div
                key={story.title}
                onClick={() => handleApplyCategoryFilter(story.filterService)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-md transition-all duration-300 hover:border-[#B08D45] hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#241321]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#665038] bg-[#241321]/90 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                    {story.filterService}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                    {story.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#C9BBAF]">
                    {story.caption}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D6B875] group-hover:underline">
                    <span>View artists for this style</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CTA SECTION: ARE YOU A MEHNDI ARTIST? (SECTION 12)
         ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] px-6 py-14 text-center shadow-2xl sm:px-12">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#D6B875]/10 blur-3xl" />

          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
            Artist Partnership Network
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
            Are You a Mehndi Artist?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
            Showcase your mehndi artistry and connect with couples planning their special day on
            ShubhVivah.
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
            Artist onboarding portal active. Complete integration with vendor authentication and slot
            management in progress.
          </p>
        </div>
      </section>

      {/* =========================================================================
          9. FAQ SECTION (SECTION 13)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#241321] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Mehndi Queries &amp; Guidance
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="text-xs text-[#C9BBAF] sm:text-sm">
              Everything you need to know about bridal mehndi pricing, booking timelines, and aftercare.
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
