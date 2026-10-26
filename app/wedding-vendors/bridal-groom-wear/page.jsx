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
  Shirt,
  Sparkle,
  Send,
  Eye,
  Check,
  Tag,
  Scissors,
} from "lucide-react";

// =========================================================================
// SAMPLE BRIDAL & GROOM WEAR DATA
// Ready for MySQL / Backend API Integration
// All product names, boutiques, and prices are sample demo data.
// =========================================================================
const OUTFITS_DATA = [
  {
    id: "royal-crimson-zardozi-lehenga",
    name: "Royal Crimson Zardozi Heritage Lehenga",
    category: "Bridal Wear",
    outfitType: "Lehenga",
    boutique: "Virasat Bridal Couture",
    city: "Delhi",
    location: "Chandni Chowk & Mehrauli, Delhi",
    price: 185000,
    priceDisplay: "₹1,85,000",
    availabilityType: "Made to Order",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Raw Silk with Handcrafted Zardozi & Marodi Work",
    occasions: ["Wedding Ceremony", "Reception"],
    sizes: ["XS", "S", "M", "L", "Custom Measurements"],
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "An heirloom masterpiece crafted in deep vermillion raw silk, intricately hand-embroidered with antique gold zardozi, semi-precious beadwork, and a double dupatta in sheer scalloped organza.",
    customizationDetails:
      "Blouse neckline, sleeve length, can-can flare volume, latkan personalization, and veil monogramming.",
  },
  {
    id: "ivory-raw-silk-sherwani",
    name: "Imperial Ivory & Gold Embroidered Sherwani",
    category: "Groom Wear",
    outfitType: "Sherwani",
    boutique: "Maharaja Bespoke Menswear",
    city: "Jaipur",
    location: "Johari Bazar, Jaipur",
    price: 88000,
    priceDisplay: "₹88,000",
    availabilityType: "Made to Order",
    isRentalAvailable: true,
    customTailoring: true,
    fabric: "Matka Silk with Kashida & French Knot Threadwork",
    occasions: ["Wedding Ceremony", "Reception"],
    sizes: ["38", "40", "42", "44", "Bespoke Cut"],
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Regal ivory textured silk sherwani paired with a pale gold churidar, handcrafted safa (turban), embroidered doshala stole, and handcrafted jeweled buttons.",
    customizationDetails:
      "Shoulder slope adjustment, chest taper, collar height, matching safa fabric, and stole embroidery motifs.",
  },
  {
    id: "rose-gold-organza-lehenga",
    name: "Blush Rose Gold Crystal Organza Lehenga",
    category: "Bridal Wear",
    outfitType: "Lehenga",
    boutique: "Aura Bridal Atelier",
    city: "Mumbai",
    location: "Kala Ghoda & Juhu, Mumbai",
    price: 78000,
    priceDisplay: "₹78,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Tissue Organza with Swarovski Crystals & Cut-Dana",
    occasions: ["Engagement", "Sangeet", "Reception"],
    sizes: ["XS", "S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Modern ethereal bridal ensemble featuring 24-kali flared skirt in metallic tissue organza, shimmering tone-on-tone crystal florets, and an illusion sweetheart neckline blouse.",
    customizationDetails:
      "Waistband adjustments, dupatta border trims, cup padding, and optional matching hair accessories.",
  },
  {
    id: "pure-kanjeevaram-bridal-saree",
    name: "Pure Kanjeevaram Gold Zari Silk Saree",
    category: "Bridal Wear",
    outfitType: "Saree",
    boutique: "Dakshin Silk Emporium",
    city: "Kolkata",
    location: "Park Street, Kolkata",
    price: 48000,
    priceDisplay: "₹48,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "100% Pure Mulberry Silk & Handwoven Real Gold Zari",
    occasions: ["Wedding Ceremony", "Reception"],
    sizes: ["Unstitched Saree with Blouse Piece", "Custom Stitched Blouse"],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Traditional crimson red and temple gold woven Kanjeevaram bridal saree featuring sacred peacock and rudraksha border motifs, accompanied by a heavy brocade pallu.",
    customizationDetails:
      "Pre-pleated stitching option, matching maggam handwork blouse design, and fall-pico edging.",
  },
  {
    id: "classic-black-velvet-tuxedo",
    name: "Royal Black Velvet Shawl Lapel Tuxedo",
    category: "Groom Wear",
    outfitType: "Tuxedo",
    boutique: "Sartorial Gentlemen Studio",
    city: "Delhi",
    location: "South Extension, Delhi",
    price: 42000,
    priceDisplay: "₹42,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: true,
    customTailoring: true,
    fabric: "Imported Italian Velvet & Silk Satin Lapel",
    occasions: ["Reception", "Cocktail Party", "Sangeet"],
    sizes: ["38", "40", "42", "44", "46"],
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Sleek dinner jacket crafted in plush midnight black velvet, featuring a satin shawl lapel, matching tuxedo trousers with satin side piping, and a crisp pleated dress shirt.",
    customizationDetails:
      "Waist suppression, sleeve length adjustment, trouser break styling, and monogrammed inner lining.",
  },
  {
    id: "emerald-asymmetric-indo-western",
    name: "Emerald Green Draped Indo-Western Set",
    category: "Groom Wear",
    outfitType: "Indo-Western",
    boutique: "Rivayat Men's Studio",
    city: "Mumbai",
    location: "Santacruz West, Mumbai",
    price: 36000,
    priceDisplay: "₹36,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Raw Silk & Georgette Drape",
    occasions: ["Sangeet", "Cocktail Party", "Engagement"],
    sizes: ["38", "40", "42", "44"],
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Contemporary cocktail and sangeet attire featuring an asymmetric overlap jacket with metallic highlights, paired with a pre-draped cowl kurta and tailored trousers.",
    customizationDetails:
      "Color customisation (navy, wine, emerald), chest fit, drape length, and metallic button choice.",
  },
  {
    id: "champagne-crystal-bridal-gown",
    name: "Champagne Trailing Crystal Bridal Gown",
    category: "Bridal Wear",
    outfitType: "Bridal Gown",
    boutique: "Celestial Bridal Gowns",
    city: "Mumbai",
    location: "Bandra West, Mumbai",
    price: 95000,
    priceDisplay: "₹95,000",
    availabilityType: "Made to Order",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Tulle with Glass Bead Embroidery & Satin Lining",
    occasions: ["Reception", "Cocktail Party", "Engagement"],
    sizes: ["XS", "S", "M", "L", "Custom Measurements"],
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Showstopping western-bridal gown with an ethereal 2-meter court train, handcrafted corseted bodice adorned with fine champagne pearls and shimmering crystal clusters.",
    customizationDetails:
      "Train length, corset boning structure, detachable sheer cape sleeves, and back closure style (lace-up or zipper).",
  },
  {
    id: "heritage-jodhpuri-bandhgala",
    name: "Imperial Navy Heritage Jodhpuri Bandhgala",
    category: "Groom Wear",
    outfitType: "Bandhgala",
    boutique: "Rajputana Royal Clothiers",
    city: "Jaipur",
    location: "MI Road, Jaipur",
    price: 45000,
    priceDisplay: "₹45,000",
    availabilityType: "Made to Order",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Fine Merino Wool & Brocade Inner Detailing",
    occasions: ["Engagement", "Wedding Ceremony", "Reception"],
    sizes: ["38", "40", "42", "44", "Bespoke Cut"],
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Timeless structured Jodhpuri coat with a regal mandarin collar, authentic brass crest buttons, hand-finished breast pocket for pocket square, and slim-fit matching trousers.",
    customizationDetails:
      "Collar embroidery accent, button finish, custom pocket square monogram, and customized trouser rise.",
  },
  {
    id: "mustard-silk-haldi-kurta-set",
    name: "Sunburst Mustard Silk Bundi & Kurta Set",
    category: "Groom Wear",
    outfitType: "Kurta Set",
    boutique: "Rang Mahal Utsav Wear",
    city: "Lucknow",
    location: "Hazratganj, Lucknow",
    price: 16500,
    priceDisplay: "₹16,500",
    availabilityType: "Ready to Wear",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Chanderi Silk & Mirror Work Nehru Jacket",
    occasions: ["Haldi", "Mehendi"],
    sizes: ["38", "40", "42", "44"],
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Vibrant mustard silk knee-length kurta paired with white churidar and a contrasting mirror-worked bundi jacket, perfect for daytime Haldi ceremonies and Mehendi celebrations.",
    customizationDetails:
      "Sleeve length, jacket button closure, kurta hem cut, and waist adjustment.",
  },
  {
    id: "pastel-mint-embroidered-sharara",
    name: "Pastel Mint Green Gotapatti Sharara Set",
    category: "Bridal Wear",
    outfitType: "Sharara",
    boutique: "Noor Bridal Atelier",
    city: "Lucknow",
    location: "Chowk & Hazratganj, Lucknow",
    price: 32000,
    priceDisplay: "₹32,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: true,
    customTailoring: true,
    fabric: "Pure Georgette with Authentic Lucknowi Chikankari & Mukaish",
    occasions: ["Mehendi", "Sangeet", "Engagement"],
    sizes: ["XS", "S", "M", "L"],
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Delicate mint georgette peplum kurta and multi-tiered flare sharara enriched with delicate Awadhi chikankari, mukaish shimmer, and gotapatti borders.",
    customizationDetails:
      "Kurta length, sharara flare volume, sleeve lining, and back neck dori styling.",
  },
  {
    id: "ivory-mughal-kalidar-anarkali",
    name: "Ivory Mughal Kalidar Bridal Anarkali",
    category: "Bridal Wear",
    outfitType: "Anarkali",
    boutique: "Shehnai Couture",
    city: "Delhi",
    location: "Defence Colony, Delhi",
    price: 52000,
    priceDisplay: "₹52,000",
    availabilityType: "Made to Order",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Mulberry Silk & Resham Thread Embroidery",
    occasions: ["Engagement", "Wedding Ceremony", "Reception"],
    sizes: ["S", "M", "L", "XL", "Custom Size"],
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "A 32-kali voluminous flared anarkali in ivory silk accented with delicate sage green resham botanical vines, paired with a pearl-fringed organza dupatta.",
    customizationDetails:
      "Anarkali length, neckline modesty panel, flare circumference, and sleeve embroidery.",
  },
  {
    id: "rental-velvet-heritage-sherwani",
    name: "Royal Maroon Velvet Heritage Sherwani (Rental)",
    category: "Groom Wear",
    outfitType: "Rental Outfit",
    boutique: "Groom Luxe Rentals",
    city: "Delhi",
    location: "Karol Bagh, Delhi",
    price: 9500,
    priceDisplay: "₹9,500 / 3 Days",
    availabilityType: "Ready to Wear",
    isRentalAvailable: true,
    customTailoring: false,
    fabric: "Plush Micro Velvet with Antique Zari Handwork",
    occasions: ["Wedding Ceremony", "Reception"],
    sizes: ["38", "40", "42"],
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Premium 3-day wedding rental outfit complete with matching safa, maroon velvet jutti shoes, pocket brooch, and dry-cleaning assurance.",
    customizationDetails:
      "Temporary cuff and waist adjustments; security deposit terms apply.",
  },
  {
    id: "rental-designer-bridal-lehenga",
    name: "Sabyasachi-Inspired Floral Bridal Lehenga (Rental)",
    category: "Bridal Wear",
    outfitType: "Rental Outfit",
    boutique: "Bride Closet Rental Co.",
    city: "Delhi",
    location: "Lajpat Nagar, Delhi",
    price: 14500,
    priceDisplay: "₹14,500 / 3 Days",
    availabilityType: "Ready to Wear",
    isRentalAvailable: true,
    customTailoring: false,
    fabric: "Matte Silk with Multi-Hued Floral Threadwork",
    occasions: ["Wedding Ceremony", "Reception"],
    sizes: ["S (Waist 28-30)", "M (Waist 32-34)"],
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Designer floral bridal lehenga available for rent. Includes can-can underskirt, matching heavily embroidered blouse, and dual net dupattas.",
    customizationDetails:
      "Basic waist and blouse hook alteration available upon fitting appointment.",
  },
  {
    id: "blush-pink-handloom-trousseau",
    name: "Blush Pink Handloom Silk Trousseau Suit",
    category: "Bridal Wear",
    outfitType: "Trousseau",
    boutique: "Shringaar Trousseau Studio",
    city: "Jaipur",
    location: "C-Scheme, Jaipur",
    price: 24000,
    priceDisplay: "₹24,000",
    availabilityType: "Ready to Wear",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Handwoven Chanderi Silk with Zari Tissue Borders",
    occasions: ["Mehendi", "Cocktail Party", "Engagement"],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Essential trousseau ensemble featuring a long straight kurta with dabka collar work, flared silk palazzo, and an ornate tissue jacquard dupatta.",
    customizationDetails:
      "Pant hem length, sleeve lining options, and customized potli bag.",
  },
  {
    id: "italian-wool-charcoal-wedding-suit",
    name: "Charcoal 3-Piece Italian Wool Wedding Suit",
    category: "Groom Wear",
    outfitType: "Wedding Suit",
    boutique: "Vogue Tailors & Clothiers",
    city: "Mumbai",
    location: "Lower Parel, Mumbai",
    price: 49000,
    priceDisplay: "₹49,000",
    availabilityType: "Made to Order",
    isRentalAvailable: false,
    customTailoring: true,
    fabric: "Super 140s Italian Wool with Silk Viscose Lining",
    occasions: ["Reception", "Cocktail Party", "Engagement"],
    sizes: ["38", "40", "42", "44", "Bespoke Cut"],
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Sharp three-piece wedding lounge suit comprising a single-breasted two-button jacket, horseshoe waistcoat, flat-front trousers, and pure silk tie.",
    customizationDetails:
      "Lapel pick-stitching, horn buttons, waistcoat style, and personalized inner monogram.",
  },
];

// =========================================================================
// FILTER TAXONOMY
// =========================================================================
const CATEGORIES = ["All Wedding Wear", "Bridal Wear", "Groom Wear"];

const BRIDAL_OUTFIT_TYPES = [
  "All Types",
  "Lehenga",
  "Saree",
  "Bridal Gown",
  "Anarkali",
  "Sharara",
  "Trousseau",
  "Rental Outfit",
];

const GROOM_OUTFIT_TYPES = [
  "All Types",
  "Sherwani",
  "Indo-Western",
  "Bandhgala",
  "Wedding Suit",
  "Tuxedo",
  "Kurta Set",
  "Rental Outfit",
];

const OCCASIONS = [
  "All Occasions",
  "Wedding Ceremony",
  "Engagement",
  "Mehendi",
  "Haldi",
  "Sangeet",
  "Reception",
  "Cocktail Party",
];

const BUDGET_OPTIONS = [
  { label: "Any Budget", value: "all" },
  { label: "Under ₹10,000", value: "under-10k" },
  { label: "₹10,000–₹25,000", value: "10k-25k" },
  { label: "₹25,000–₹50,000", value: "25k-50k" },
  { label: "₹50,000–₹1,00,000", value: "50k-100k" },
  { label: "Above ₹1,00,000", value: "above-100k" },
];

const CITIES = [
  "All Cities",
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Lucknow",
  "Kolkata",
];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

// =========================================================================
// WEDDING FASHION INSPIRATION STORIES
// =========================================================================
const INSPIRATION_GALLERY = [
  {
    title: "Royal Crimson Bridal Lehengas",
    category: "Bridal Wear",
    outfitType: "Lehenga",
    subtitle: "Heritage Zardozi & Velvet Craftsmanship",
    description:
      "Opulent scarlet and carmine silks embellished with centuries-old Rajasthani marodi threadwork and majestic kalis.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Elegant Ivory & Pearl Bridal Looks",
    category: "Bridal Wear",
    outfitType: "Lehenga",
    subtitle: "Modern Minimalist Royalty",
    description:
      "Understated opulence blending ivory tissue georgette, tone-on-tone seed pearls, and shimmering crystal highlights.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Traditional Red Bridal Outfits",
    category: "Bridal Wear",
    outfitType: "Saree",
    subtitle: "Sacred Auspicious Textiles",
    description:
      "Handloom Kanjeevarams and Banarasi brocades celebrating eternal vows with zari borders and sacred peacock motifs.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pastel Engagement & Sangeet Outfits",
    category: "Bridal Wear",
    outfitType: "Sharara",
    subtitle: "Ethereal Mint & Blush Hues",
    description:
      "Breezy, romantic pastel palettes with fine Chikankari, gotapatti, and lightweight sequined drapes.",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Classic Royal Groom Sherwanis",
    category: "Groom Wear",
    outfitType: "Sherwani",
    subtitle: "Aristocratic Tailoring & Safas",
    description:
      "Impeccably tailored ivory and raw silk sherwanis complete with coordinated safas, stole draping, and antique buttons.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Modern Indo-Western Groom Attire",
    category: "Groom Wear",
    outfitType: "Indo-Western",
    subtitle: "Contemporary Cocktail Silhouettes",
    description:
      "Asymmetric overlap jackets, structured bandhgalas, and draped kurtas designed for modern high-energy sangeets.",
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
  },
];

// =========================================================================
// FAQS
// =========================================================================
const FAQS = [
  {
    q: "How early should bridal and groom outfits be booked?",
    a: "Custom made-to-order bridal lehengas, bespoke wedding sherwanis, and couture gowns typically require 2 to 4 months for intricate hand embroidery, fittings, and final adjustments. We strongly advise finalizing your wedding day outfits at least 3 to 6 months before the wedding, especially for peak wedding dates.",
  },
  {
    q: "What is the difference between made-to-order and ready-to-wear?",
    a: "Ready-to-wear outfits are pre-stitched in standard sizing (XS, S, M, L, XL) and only require minor length and fit alterations before delivery within 3 to 7 days. Made-to-order outfits are crafted from scratch to your exact body measurements, allowing custom choices for fabric color, blouse neckline, sleeve length, and embroidery density.",
  },
  {
    q: "Can wedding outfits be customized?",
    a: "Yes! Most luxury boutiques and designers featured on ShubhVivah provide bespoke customization. Brides can customize blouse necklines, sleeve lengths, can-can volume, and dupatta borders. Grooms can customize safa colors, stole embroideries, collar height, button styles, and monograms.",
  },
  {
    q: "Are rental wedding outfits available?",
    a: "Yes, ShubhVivah showcases premium rental collections for both bridal lehengas and groom sherwanis or tuxedos. Rentals generally cover a 3-day booking period, include basic alterations and professional dry cleaning, offering an economical and sustainable option for pre-wedding functions and ceremonies.",
  },
  {
    q: "How should couples choose coordinated bridal and groom outfits?",
    a: "Rather than an exact match, the most sophisticated look is achieved through tonal harmony or complementary accents. For example, if the bride wears crimson and antique gold, the groom can wear an ivory or champagne sherwani accented with a crimson safa, pocket square, or stole.",
  },
  {
    q: "What should couples consider when choosing their outfit budget?",
    a: "Consider the number of functions (Mehendi, Haldi, Sangeet, Pheras, Reception), fabric quality, and handwork intensity. Allocate the largest portion of your wardrobe budget to your main wedding ceremony attire, and explore rental or ready-to-wear options for daytime pre-wedding events.",
  },
];

export default function BridalGroomWearPage() {
  // Main Category state: "All Wedding Wear" | "Bridal Wear" | "Groom Wear"
  const [selectedCategory, setSelectedCategory] = useState("All Wedding Wear");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOutfitType, setSelectedOutfitType] = useState("All Types");
  const [selectedOccasion, setSelectedOccasion] = useState("All Occasions");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [availabilityFilter, setAvailabilityFilter] = useState("all"); // "all" | "ready" | "made-to-order"
  const [rentalOnly, setRentalOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [onlyShortlisted, setOnlyShortlisted] = useState(false);

  // Mobile drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Shortlist state
  const [shortlistedIds, setShortlistedIds] = useState([]);

  // Modals state
  const [detailsOutfit, setDetailsOutfit] = useState(null);
  const [enquiryOutfit, setEnquiryOutfit] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(0);

  // Enquiry Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    outfitPreference: "Bridal Wear",
    preferredSize: "Custom Measurements",
    weddingDate: "",
    city: "",
    requirementType: "Purchase / Made to Order",
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
    setSelectedCategory("All Wedding Wear");
    setSearchTerm("");
    setSelectedOutfitType("All Types");
    setSelectedOccasion("All Occasions");
    setSelectedBudget("all");
    setSelectedCity("All Cities");
    setAvailabilityFilter("all");
    setRentalOnly(false);
    setSortBy("recommended");
    setOnlyShortlisted(false);
  };

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== "All Wedding Wear" ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0) +
    (selectedOutfitType !== "All Types" ? 1 : 0) +
    (selectedOccasion !== "All Occasions" ? 1 : 0) +
    (selectedBudget !== "all" ? 1 : 0) +
    (selectedCity !== "All Cities" ? 1 : 0) +
    (availabilityFilter !== "all" ? 1 : 0) +
    (rentalOnly ? 1 : 0) +
    (onlyShortlisted ? 1 : 0);

  // Dynamically switch outfit types based on category
  const activeOutfitTypes = useMemo(() => {
    if (selectedCategory === "Bridal Wear") return BRIDAL_OUTFIT_TYPES;
    if (selectedCategory === "Groom Wear") return GROOM_OUTFIT_TYPES;
    return [
      "All Types",
      "Lehenga",
      "Sherwani",
      "Saree",
      "Indo-Western",
      "Bridal Gown",
      "Bandhgala",
      "Sharara",
      "Tuxedo",
      "Rental Outfit",
    ];
  }, [selectedCategory]);

  // Dynamic result heading
  const dynamicHeading = useMemo(() => {
    if (selectedCategory === "Bridal Wear")
      return "Bridal Couture, Lehengas & Sarees";
    if (selectedCategory === "Groom Wear")
      return "Royal Groom Wear, Sherwanis & Suits";
    return "All Bridal & Groom Wedding Collections";
  }, [selectedCategory]);

  // Filter & Sort Logic
  const filteredOutfits = useMemo(() => {
    let result = OUTFITS_DATA.filter((outfit) => {
      // Shortlist filter
      if (onlyShortlisted && !shortlistedIds.includes(outfit.id)) {
        return false;
      }

      // Main Category
      if (
        selectedCategory !== "All Wedding Wear" &&
        outfit.category !== selectedCategory
      ) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchesName = outfit.name.toLowerCase().includes(q);
        const matchesBoutique = outfit.boutique.toLowerCase().includes(q);
        const matchesType = outfit.outfitType.toLowerCase().includes(q);
        const matchesCity = outfit.city.toLowerCase().includes(q);
        const matchesFabric = outfit.fabric.toLowerCase().includes(q);
        const matchesOccasion = outfit.occasions.some((occ) =>
          occ.toLowerCase().includes(q)
        );

        if (
          !matchesName &&
          !matchesBoutique &&
          !matchesType &&
          !matchesCity &&
          !matchesFabric &&
          !matchesOccasion
        ) {
          return false;
        }
      }

      // Outfit type filter
      if (
        selectedOutfitType !== "All Types" &&
        outfit.outfitType !== selectedOutfitType
      ) {
        return false;
      }

      // Occasion filter
      if (
        selectedOccasion !== "All Occasions" &&
        !outfit.occasions.includes(selectedOccasion)
      ) {
        return false;
      }

      // City filter
      if (selectedCity !== "All Cities" && outfit.city !== selectedCity) {
        return false;
      }

      // Budget filter
      if (selectedBudget === "under-10k" && outfit.price >= 10000) return false;
      if (
        selectedBudget === "10k-25k" &&
        (outfit.price < 10000 || outfit.price > 25000)
      )
        return false;
      if (
        selectedBudget === "25k-50k" &&
        (outfit.price < 25000 || outfit.price > 50000)
      )
        return false;
      if (
        selectedBudget === "50k-100k" &&
        (outfit.price < 50000 || outfit.price > 100000)
      )
        return false;
      if (selectedBudget === "above-100k" && outfit.price <= 100000)
        return false;

      // Availability (Ready-to-wear vs Made-to-order)
      if (
        availabilityFilter === "ready" &&
        outfit.availabilityType !== "Ready to Wear"
      ) {
        return false;
      }
      if (
        availabilityFilter === "made-to-order" &&
        outfit.availabilityType !== "Made to Order"
      ) {
        return false;
      }

      // Rental Only
      if (rentalOnly && !outfit.isRentalAvailable) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0; // recommended
    });

    return result;
  }, [
    selectedCategory,
    searchTerm,
    selectedOutfitType,
    selectedOccasion,
    selectedCity,
    selectedBudget,
    availabilityFilter,
    rentalOnly,
    sortBy,
    onlyShortlisted,
    shortlistedIds,
  ]);

  // Open Details Modal
  const openDetailsModal = (outfit) => {
    setDetailsOutfit(outfit);
    setModalActiveImage(0);
  };

  // Close Details Modal
  const closeDetailsModal = () => {
    setDetailsOutfit(null);
  };

  // Open Enquiry Modal
  const openEnquiryModal = (outfit) => {
    setEnquiryOutfit(outfit);
    setFormData((prev) => ({
      ...prev,
      outfitPreference: outfit.category,
      city: outfit.city || "",
      requirementType: outfit.isRentalAvailable
        ? "Rental Requirement"
        : "Purchase / Made to Order",
    }));
    setFormSubmitted(false);
    setFormErrors({});
  };

  // Close Enquiry Modal
  const closeEnquiryModal = () => {
    setEnquiryOutfit(null);
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

    const cleanedPhone = formData.phone.replace(/[\s\-\+]/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errors.phone = "Please enter your mobile number.";
    } else if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 10) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.weddingDate) {
      errors.weddingDate = "Please select your wedding/function date.";
    }

    if (!formData.city.trim()) {
      errors.city = "Please enter your city.";
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
    setFormSubmitted(true);
  };

  // Handle Category click from Category Cards or Inspiration
  const handleCategorySwitch = (cat, type = "All Types") => {
    setSelectedCategory(cat);
    if (type !== "All Types") {
      setSelectedOutfitType(type);
    } else {
      setSelectedOutfitType("All Types");
    }
    // Scroll smoothly to listing area
    const listingEl = document.getElementById("outfits-marketplace");
    if (listingEl) {
      listingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#241321] text-[#F8F1E5]">
      {/* =========================================================================
          1. HERO SECTION
         ========================================================================= */}
      <section className="relative isolate overflow-hidden border-b border-[#665038] bg-[#241321] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Background Bridal & Groom Wedding Fashion Image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Deep Plum Dark Luxury Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#241321]/94 via-[#241321]/88 to-[#241321]" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb: Home → Wedding Vendors → Bridal & Groom Wear */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-xs text-[#C9BBAF]"
          >
            <Link href="/" className="transition-colors hover:text-[#D6B875]">
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
            <span className="font-semibold text-[#D6B875]">
              Bridal &amp; Groom Wear
            </span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#665038] bg-[#321B30]/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875] backdrop-blur-sm">
              <Sparkles size={12} className="text-[#B08D45]" />
              Haute Bridal &amp; Groom Couture
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#F8F1E5] sm:text-4xl lg:text-5xl">
              Discover Your Perfect Wedding Look
            </h1>

            <div className="my-4 h-[2px] w-24 bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-transparent" />

            <p className="text-sm leading-relaxed text-[#C9BBAF] sm:text-base">
              Explore beautiful bridal lehengas, elegant sarees, designer gowns,
              royal sherwanis, and groom outfits for every wedding celebration.
            </p>
          </div>

          {/* Hero Search & Location Bar */}
          <div className="mt-8 max-w-4xl rounded-2xl border border-[#665038] bg-[#3A2638]/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1fr_auto]">
              {/* Search by outfit, designer, boutique */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search lehengas, sherwanis, sarees, designers..."
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 pl-10 pr-4 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/70 transition-colors focus:border-[#B08D45] focus:outline-none sm:text-sm"
                  aria-label="Search wedding fashion"
                />
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B875]"
                />
                {searchTerm && (
                  <button
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
                  aria-label="Select boutique city"
                >
                  {CITIES.map((city) => (
                    <option
                      key={city}
                      value={city}
                      className="bg-[#241321] text-[#F8F1E5]"
                    >
                      {city === "All Cities" ? "All Boutiques" : city}
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

              {/* Explore Button */}
              <a
                href="#outfits-marketplace"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-md transition-all duration-200 hover:brightness-105 active:scale-[0.98] sm:text-sm"
              >
                <span>Explore Wedding Wear</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Quick Filter Tags in Hero */}
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#665038]/50 pt-3 text-[11px] text-[#C9BBAF]">
              <span className="font-medium text-[#D6B875]">Popular Styles:</span>
              {[
                { label: "Bridal Lehengas", cat: "Bridal Wear", type: "Lehenga" },
                { label: "Royal Sherwanis", cat: "Groom Wear", type: "Sherwani" },
                { label: "Kanjeevaram Sarees", cat: "Bridal Wear", type: "Saree" },
                { label: "Velvet Tuxedos", cat: "Groom Wear", type: "Tuxedo" },
                { label: "Rental Outfits", cat: "All Wedding Wear", type: "Rental Outfit" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleCategorySwitch(item.cat, item.type)}
                  className="rounded-full border border-[#665038] bg-[#241321] px-2.5 py-0.5 text-[#C9BBAF] transition-all hover:border-[#B08D45] hover:text-[#F8F1E5]"
                >
                  {item.label}
                </button>
              ))}
              {activeFiltersCount > 0 && (
                <button
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
          2. BRIDAL AND GROOM CATEGORY SELECTOR CARDS
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Bridal Wear Category Card */}
          <div
            onClick={() => handleCategorySwitch("Bridal Wear")}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-300 shadow-2xl hover:-translate-y-1 ${
              selectedCategory === "Bridal Wear"
                ? "border-[#D6B875] bg-gradient-to-br from-[#3A2638] via-[#321B30] to-[#241321] ring-2 ring-[#B08D45]/40"
                : "border-[#665038] bg-gradient-to-br from-[#321B30] to-[#241321] hover:border-[#B08D45]"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Category Image */}
              <div className="relative h-48 w-full sm:h-56 sm:w-48 shrink-0 overflow-hidden rounded-2xl border border-[#665038] bg-[#241321]">
                <Image
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                  alt="Bridal lehengas, sarees, and couture gowns"
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241321]/80 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 rounded-full border border-[#665038] bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875]">
                  Bridal Edition
                </span>
              </div>

              {/* Text & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#D6B875]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                      The Bridal Wardrobe
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                    Bridal Wear
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                    Heirloom bridal lehengas, pure Kanjeevaram sarees, trailing
                    reception gowns, anarkalis, and pre-wedding trousseau.
                  </p>

                  {/* Key items list */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {[
                      "Bridal Lehengas",
                      "Wedding Sarees",
                      "Bridal Gowns",
                      "Anarkali & Sharara",
                      "Trousseau Sets",
                      "Outfits on Rent",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[#665038]/60 bg-[#241321] px-2 py-0.5 text-[10px] text-[#C9BBAF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-md transition-all hover:brightness-105"
                  >
                    <span>Browse Bridal Wear</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Groom Wear Category Card */}
          <div
            onClick={() => handleCategorySwitch("Groom Wear")}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border p-6 sm:p-8 transition-all duration-300 shadow-2xl hover:-translate-y-1 ${
              selectedCategory === "Groom Wear"
                ? "border-[#D6B875] bg-gradient-to-br from-[#3A2638] via-[#321B30] to-[#241321] ring-2 ring-[#B08D45]/40"
                : "border-[#665038] bg-gradient-to-br from-[#321B30] to-[#241321] hover:border-[#B08D45]"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Category Image */}
              <div className="relative h-48 w-full sm:h-56 sm:w-48 shrink-0 overflow-hidden rounded-2xl border border-[#665038] bg-[#241321]">
                <Image
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
                  alt="Groom sherwanis, tuxedos, and Jodhpuri suits"
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241321]/80 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 rounded-full border border-[#665038] bg-[#241321]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875]">
                  Groom Edition
                </span>
              </div>

              {/* Text & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Shirt size={16} className="text-[#D6B875]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                      The Groom Collection
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                    Groom Wear
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                    Handcrafted imperial sherwanis, Jodhpuri bandhgalas, draped
                    Indo-westerns, Italian velvet tuxedos, and festive kurta sets.
                  </p>

                  {/* Key items list */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {[
                      "Wedding Sherwanis",
                      "Indo-Western Sets",
                      "Bandhgala Suits",
                      "Wedding Tuxedos",
                      "Kurta Bundi Sets",
                      "Groom Outfits on Rent",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[#665038]/60 bg-[#241321] px-2 py-0.5 text-[10px] text-[#C9BBAF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#241321] shadow-md transition-all hover:brightness-105"
                  >
                    <span>Browse Groom Wear</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRODUCT AND VENDOR LISTING AREA
         ========================================================================= */}
      <section
        id="outfits-marketplace"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Marketplace Header: Dynamic Title, Category Tabs & Sort */}
        <div className="flex flex-col gap-5 border-b border-[#665038] pb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                  {dynamicHeading}
                </h2>
                <span className="rounded-full border border-[#B08D45]/50 bg-[#321B30] px-3 py-0.5 text-xs font-semibold text-[#D6B875]">
                  {filteredOutfits.length}{" "}
                  {filteredOutfits.length === 1 ? "Outfit" : "Outfits"}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#C9BBAF] sm:text-sm">
                Sample wedding collections from premier boutiques, master tailors,
                and rental ateliers.
              </p>
            </div>

            {/* Controls: Category Pills, Shortlist, and Sort */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Shortlist Filter Toggle */}
              <button
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
              <button
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
                  aria-label="Sort collections by"
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

              {/* Clear Filters (if active) */}
              {activeFiltersCount > 0 && (
                <button
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

          {/* Category Tabs Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedOutfitType("All Types");
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#B08D45] text-[#241321] font-semibold shadow-md"
                    : "border border-[#665038] bg-[#321B30] text-[#C9BBAF] hover:border-[#B08D45] hover:text-[#F8F1E5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout: Left Filter Sidebar + Responsive Cards Grid */}
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
                    Refine Collection
                  </span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs text-[#D6B875] hover:text-[#E8D9B5]"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
              </div>

              {/* Outfit Type Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Outfit Type
                </label>
                <div className="max-h-52 space-y-1 overflow-y-auto pr-1 text-xs">
                  {activeOutfitTypes.map((type) => {
                    const isSelected = selectedOutfitType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedOutfitType(type)}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                          isSelected
                            ? "bg-[#B08D45] font-semibold text-[#241321]"
                            : "text-[#C9BBAF] hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                        }`}
                      >
                        <span className="truncate">{type}</span>
                        {isSelected && <Check size={13} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Occasion Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Wedding Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 px-3 text-xs text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ} className="bg-[#241321]">
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Price Range
                </label>
                <div className="space-y-1.5">
                  {BUDGET_OPTIONS.map((b) => (
                    <label
                      key={b.value}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#C9BBAF] transition-colors hover:bg-[#3A2638] hover:text-[#F8F1E5]"
                    >
                      <input
                        type="radio"
                        name="desktop-fashion-budget"
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

              {/* City / Store Location Filter */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Boutique Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 px-3 text-xs text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#241321]">
                      {c === "All Cities" ? "All Cities & Boutiques" : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability & Rental Options */}
              <div className="border-t border-[#665038]/60 pt-4 space-y-3">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Tailoring &amp; Availability
                </label>

                {/* Ready to wear vs Made to order */}
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2 px-3 text-xs text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                >
                  <option value="all">All (Ready &amp; Made to Order)</option>
                  <option value="ready">Ready to Wear Only</option>
                  <option value="made-to-order">Made to Order (Custom)</option>
                </select>

                {/* Rental Outfit toggle */}
                <label className="flex cursor-pointer items-center justify-between text-xs text-[#F8F1E5]">
                  <span className="flex items-center gap-1.5">
                    <Tag size={13} className="text-[#B08D45]" />
                    <span>Rental Available Only</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={rentalOnly}
                    onChange={(e) => setRentalOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>
              </div>

              {/* Clear All Filters Button */}
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-full rounded-xl border border-[#665038] bg-[#241321] py-2.5 text-center text-xs font-medium text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* =========================================================================
              RESPONSIVE PRODUCT GRID
              4 cards/row on large desktop (xl:grid-cols-4)
              3 cards/row on standard desktop (lg:grid-cols-3)
              2 cards/row on tablets (sm:grid-cols-2)
              1 or 2 cards on mobile
             ========================================================================= */}
          <div className="lg:col-span-3">
            {filteredOutfits.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center rounded-3xl border border-[#665038] bg-[#321B30] p-12 text-center shadow-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#D6B875]">
                  <Search size={28} />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[#F8F1E5]">
                  No Matching Wedding Outfits Found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
                  We couldn&apos;t find any outfits matching your selected category,
                  occasion, budget, or filters. Try resetting your search or choosing
                  a broader price range.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredOutfits.map((outfit) => {
                  const isShortlisted = shortlistedIds.includes(outfit.id);

                  return (
                    <article
                      key={outfit.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#B08D45] hover:shadow-2xl hover:shadow-[#B08D45]/10"
                    >
                      {/* Outfit Image Container */}
                      <div className="relative h-64 w-full overflow-hidden bg-[#241321]">
                        <Image
                          src={outfit.image}
                          alt={`${outfit.name} - ${outfit.category} wedding outfit`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />

                        {/* Top Category Badge */}
                        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm ${
                              outfit.category === "Bridal Wear"
                                ? "border-[#D6B875]/70 bg-[#241321]/90 text-[#D6B875]"
                                : "border-[#B08D45]/70 bg-[#321B30]/90 text-[#F8F1E5]"
                            }`}
                          >
                            {outfit.category}
                          </span>
                        </div>

                        {/* Shortlist Heart Button */}
                        <button
                          type="button"
                          onClick={() => toggleShortlist(outfit.id)}
                          aria-label={
                            isShortlisted
                              ? `Remove ${outfit.name} from shortlist`
                              : `Add ${outfit.name} to shortlist`
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

                        {/* Price Badge */}
                        <div className="absolute bottom-2.5 left-3">
                          <span className="rounded-md border border-[#665038] bg-[#241321]/95 px-2.5 py-1 text-xs font-bold text-[#D6B875] backdrop-blur-sm">
                            {outfit.priceDisplay}
                          </span>
                        </div>

                        {/* Availability Pill */}
                        <div className="absolute bottom-2.5 right-3">
                          <span className="rounded-md border border-[#665038]/80 bg-[#321B30]/90 px-2 py-0.5 text-[10px] text-[#C9BBAF]">
                            {outfit.availabilityType}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-4">
                        {/* Boutique & Location */}
                        <div className="flex items-center justify-between text-[11px] text-[#C9BBAF]">
                          <span className="truncate text-[#D6B875] font-medium">
                            {outfit.boutique}
                          </span>
                          <span className="shrink-0 flex items-center gap-0.5 text-[10px]">
                            <MapPin size={10} className="text-[#B08D45]" />
                            {outfit.city}
                          </span>
                        </div>

                        {/* Outfit Name */}
                        <h3 className="mt-1 font-serif text-base font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875] line-clamp-1">
                          {outfit.name}
                        </h3>

                        {/* Outfit Type & Occasions */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="rounded border border-[#665038]/60 bg-[#241321] px-1.5 py-0.5 text-[10px] font-semibold text-[#D6B875]">
                            {outfit.outfitType}
                          </span>
                          {outfit.occasions.slice(0, 2).map((occ) => (
                            <span
                              key={occ}
                              className="rounded border border-[#665038]/40 bg-[#241321]/60 px-1.5 py-0.5 text-[10px] text-[#C9BBAF]"
                            >
                              {occ}
                            </span>
                          ))}
                        </div>

                        {/* Short Description */}
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#C9BBAF]">
                          {outfit.description}
                        </p>

                        {/* Card Actions */}
                        <div className="mt-auto pt-4 grid grid-cols-2 gap-2 border-t border-[#665038]/60">
                          <button
                            type="button"
                            onClick={() => openDetailsModal(outfit)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#665038] bg-[#321B30] px-2.5 py-2 text-[11px] font-semibold text-[#F8F1E5] transition-colors hover:border-[#B08D45] hover:bg-[#241321] hover:text-[#D6B875]"
                          >
                            <Eye size={12} />
                            <span>Details</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => openEnquiryModal(outfit)}
                            className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-2.5 py-2 text-[11px] font-semibold text-[#241321] shadow-md transition-all hover:brightness-105 active:scale-95"
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
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#665038] pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#D6B875]" />
                <span className="font-serif text-lg font-bold text-[#F8F1E5]">
                  Filter Wedding Wear
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] hover:bg-[#3A2638]"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 space-y-5 overflow-y-auto py-4 text-xs">
              {/* Category */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Wardrobe Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedOutfitType("All Types");
                  }}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-xs text-[#F8F1E5]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#241321]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Outfit Type */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Outfit Type
                </label>
                <select
                  value={selectedOutfitType}
                  onChange={(e) => setSelectedOutfitType(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-xs text-[#F8F1E5]"
                >
                  {activeOutfitTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#241321]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion */}
              <div>
                <label className="mb-2 block font-semibold uppercase tracking-wider text-[#D6B875]">
                  Occasion
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-xs text-[#F8F1E5]"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ} className="bg-[#241321]">
                      {occ}
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
                        name="mobile-fashion-budget"
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

              {/* Location */}
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

              {/* Rental toggle */}
              <div className="border-t border-[#665038]/60 pt-3">
                <label className="flex cursor-pointer items-center justify-between text-[#F8F1E5]">
                  <span>Rental Available Only</span>
                  <input
                    type="checkbox"
                    checked={rentalOnly}
                    onChange={(e) => setRentalOnly(e.target.checked)}
                    className="accent-[#B08D45]"
                  />
                </label>
              </div>

              {/* Shortlist toggle */}
              <div>
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

            {/* Drawer Actions */}
            <div className="border-t border-[#665038] pt-4 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] py-2.5 text-center text-xs font-semibold text-[#241321]"
              >
                Apply Filters ({filteredOutfits.length})
              </button>
              <button
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
          5. OUTFIT DETAILS MODAL
         ========================================================================= */}
      {detailsOutfit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeDetailsModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              aria-label="Close outfit details"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#665038] bg-[#241321] px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  {detailsOutfit.category}
                </span>
                <span className="text-xs text-[#C9BBAF]">
                  • {detailsOutfit.outfitType}
                </span>
                <span className="text-xs text-[#C9BBAF]">
                  • {detailsOutfit.boutique} ({detailsOutfit.city})
                </span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#F8F1E5] sm:text-3xl">
                {detailsOutfit.name}
              </h3>

              <div className="mt-2 flex items-center gap-3">
                <span className="font-serif text-2xl font-bold text-[#D6B875]">
                  {detailsOutfit.priceDisplay}
                </span>
                <span className="rounded-md border border-[#665038] bg-[#241321] px-2.5 py-0.5 text-xs text-[#C9BBAF]">
                  {detailsOutfit.availabilityType}
                </span>
                {detailsOutfit.isRentalAvailable && (
                  <span className="rounded-md border border-[#B08D45]/60 bg-[#B08D45]/20 px-2.5 py-0.5 text-xs text-[#D6B875]">
                    Rental Available
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Image Display */}
            <div className="mt-5 space-y-3">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-[#665038] bg-[#241321] sm:h-96">
                <Image
                  src={
                    detailsOutfit.gallery[modalActiveImage] ||
                    detailsOutfit.image
                  }
                  alt={`${detailsOutfit.name} detailed view`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover transition-opacity duration-300"
                />
              </div>

              {/* Thumbnails */}
              {detailsOutfit.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {detailsOutfit.gallery.map((img, idx) => (
                    <button
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
                        alt={`Outfit angle ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Cards Grid */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 text-xs">
              {/* Fabric & Description */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4 space-y-2">
                <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-[#D6B875]">
                  <Scissors size={15} />
                  Fabric &amp; Craftsmanship
                </h4>
                <p className="leading-relaxed text-[#F8F1E5]">
                  {detailsOutfit.fabric}
                </p>
                <p className="leading-relaxed text-[#C9BBAF]">
                  {detailsOutfit.description}
                </p>
              </div>

              {/* Customization & Tailoring */}
              <div className="rounded-2xl border border-[#665038] bg-[#3A2638] p-4 space-y-2">
                <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-[#D6B875]">
                  <Sparkle size={15} />
                  Customization Options
                </h4>
                <p className="leading-relaxed text-[#C9BBAF]">
                  {detailsOutfit.customizationDetails}
                </p>
                <div className="pt-2">
                  <span className="font-semibold text-[#F8F1E5]">
                    Available Sample Sizes:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {detailsOutfit.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-[#665038] bg-[#241321] px-2 py-0.5 text-[11px] text-[#D6B875]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Suitable Occasions */}
            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                Ideal For Occasions:
              </span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {detailsOutfit.occasions.map((occ) => (
                  <span
                    key={occ}
                    className="inline-flex items-center gap-1 rounded-full border border-[#665038] bg-[#241321] px-3 py-1 text-xs text-[#C9BBAF]"
                  >
                    <CheckCircle2 size={12} className="text-[#B08D45]" />
                    <span>{occ}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#665038] pt-5">
              <button
                type="button"
                onClick={() => toggleShortlist(detailsOutfit.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                  shortlistedIds.includes(detailsOutfit.id)
                    ? "border-[#D6B875] bg-[#241321] text-[#D6B875]"
                    : "border-[#665038] bg-[#241321] text-[#F8F1E5] hover:border-[#B08D45]"
                }`}
              >
                <Heart
                  size={15}
                  className={
                    shortlistedIds.includes(detailsOutfit.id)
                      ? "fill-[#D6B875] text-[#D6B875]"
                      : "text-[#B08D45]"
                  }
                />
                <span>
                  {shortlistedIds.includes(detailsOutfit.id)
                    ? "Shortlisted"
                    : "Add to Shortlist"}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeDetailsModal}
                  className="rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 text-xs font-medium text-[#F8F1E5] hover:bg-[#3A2638]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sel = detailsOutfit;
                    closeDetailsModal();
                    openEnquiryModal(sel);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 text-xs font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                >
                  <Send size={14} />
                  <span>Enquire About Outfit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. OUTFIT ENQUIRY MODAL (WITH FRONTEND VALIDATION & REALISTIC DISCLAIMER)
         ========================================================================= */}
      {enquiryOutfit && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#665038] bg-[#321B30] p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#665038] bg-[#241321] text-[#F8F1E5] transition-colors hover:bg-[#3A2638] hover:text-[#D6B875]"
              aria-label="Close enquiry modal"
            >
              <X size={18} />
            </button>

            {formSubmitted ? (
              // Success Confirmation State
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
                  <span className="font-semibold text-[#F8F1E5]">{enquiryOutfit.name}</span> have
                  been validated on this frontend preview.
                </p>

                {/* Recap Box */}
                <div className="mt-5 rounded-2xl border border-[#665038] bg-[#3A2638] p-4 text-left text-xs space-y-1.5 text-[#C9BBAF]">
                  <p>
                    <span className="text-[#D6B875] font-medium">Boutique:</span>{" "}
                    {enquiryOutfit.boutique} ({formData.city})
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Wardrobe Category:</span>{" "}
                    {formData.outfitPreference}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Preferred Size:</span>{" "}
                    {formData.preferredSize}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Wedding Date:</span>{" "}
                    {formData.weddingDate}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Requirement:</span>{" "}
                    {formData.requirementType}
                  </p>
                  <p>
                    <span className="text-[#D6B875] font-medium">Contact Phone:</span>{" "}
                    {formData.phone}
                  </p>
                </div>

                {/* Technical Disclaimer Notice */}
                <div className="mt-4 rounded-xl border border-[#B08D45]/40 bg-[#241321] p-3 text-left text-[11px] text-[#D6B875]">
                  <p className="font-semibold uppercase tracking-wider">Frontend Notice:</p>
                  <p className="mt-0.5 text-[#C9BBAF]">
                    This is a frontend demonstration. In production, this form will connect to the
                    ShubhVivah backend API to dispatch live WhatsApp &amp; Email leads directly to
                    the boutique or designer.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-8 py-2.5 text-xs font-semibold text-[#241321] shadow-lg hover:brightness-105"
                >
                  Done
                </button>
              </div>
            ) : (
              // Enquiry Form
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D6B875]">
                  Boutique Consultation &amp; Fitting
                </span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#F8F1E5]">
                  Enquire About {enquiryOutfit.name}
                </h3>
                <p className="mt-1 text-xs text-[#C9BBAF]">
                  Check custom tailoring timeline, rental dates, or schedule a boutique fitting.
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
                        placeholder="e.g. Radhika Sharma"
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
                        placeholder="e.g. radhika@example.com"
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
                        Wedding / Event Date <span className="text-[#D6B875]">*</span>
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

                  {/* Category Selection & Preferred Size */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Bridal or Groom Selection
                      </label>
                      <select
                        value={formData.outfitPreference}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            outfitPreference: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        <option value="Bridal Wear">Bridal Wear</option>
                        <option value="Groom Wear">Groom Wear</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        Preferred Size / Measurement
                      </label>
                      <select
                        value={formData.preferredSize}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredSize: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        <option value="Custom Measurements">Custom Measurements (Bespoke)</option>
                        <option value="XS (Chest 34 / Waist 26)">XS (Chest 34 / Waist 26)</option>
                        <option value="S (Chest 36 / Waist 28)">S (Chest 36 / Waist 28)</option>
                        <option value="M (Chest 38 / Waist 30)">M (Chest 38 / Waist 30)</option>
                        <option value="L (Chest 40 / Waist 32)">L (Chest 40 / Waist 32)</option>
                        <option value="XL (Chest 42 / Waist 34)">XL (Chest 42 / Waist 34)</option>
                      </select>
                    </div>
                  </div>

                  {/* City & Requirement Type */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-medium text-[#F8F1E5]">
                        City / Location <span className="text-[#D6B875]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="e.g. Delhi NCR, Jaipur, Mumbai"
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
                        Requirement Type
                      </label>
                      <select
                        value={formData.requirementType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            requirementType: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] focus:border-[#B08D45] focus:outline-none"
                      >
                        <option value="Purchase / Made to Order">Purchase / Made to Order</option>
                        <option value="Rental Requirement">Rental Requirement (3–5 Days)</option>
                        <option value="Custom Tailoring Consultation">Custom Tailoring Consultation</option>
                        <option value="Boutique Trial Appointment">Boutique Trial Appointment</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label className="mb-1 block font-medium text-[#F8F1E5]">
                      Additional Fitting Details or Styling Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Mention any custom color preferences, blouse cut requirements, trial date preferences, or budget considerations..."
                      className="w-full rounded-xl border border-[#665038] bg-[#241321] p-2.5 text-[#F8F1E5] placeholder-[#C9BBAF]/50 focus:border-[#B08D45] focus:outline-none"
                    />
                  </div>

                  {/* Disclaimer notice */}
                  <p className="text-[11px] leading-relaxed text-[#C9BBAF]">
                    By submitting, your request will be matched with{" "}
                    <span className="text-[#D6B875] font-medium">
                      {enquiryOutfit.boutique}
                    </span>. Note: Actual enquiry delivery requires backend API connection.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeEnquiryModal}
                      className="rounded-xl border border-[#665038] bg-[#241321] px-4 py-2.5 font-medium text-[#F8F1E5] hover:bg-[#3A2638]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] px-6 py-2.5 font-semibold text-[#241321] shadow-lg transition-all hover:brightness-105"
                    >
                      <Send size={14} />
                      <span>Submit Outfit Enquiry</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          7. WEDDING FASHION INSPIRATION SECTION
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#321B30] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#241321] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Couture Lookbook &amp; Styling
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Wedding Fashion Inspiration
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
              Discover timeless aesthetics, regal silhouettes, and runway-inspired
              wedding looks curated for discerning Indian brides and grooms. Click
              any look to explore related collections.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INSPIRATION_GALLERY.map((story) => (
              <div
                key={story.title}
                onClick={() => handleCategorySwitch(story.category, story.outfitType)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-[#665038] bg-[#3A2638] shadow-md transition-all duration-300 hover:border-[#B08D45] hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#241321]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2638] via-transparent to-black/30" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#665038] bg-[#241321]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D6B875] backdrop-blur-sm">
                    {story.subtitle}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#F8F1E5] transition-colors group-hover:text-[#D6B875]">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#C9BBAF]">
                    {story.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#D6B875] group-hover:underline">
                    <span>Explore this style</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CTA SECTION: ARE YOU A BRIDAL OR GROOM WEAR DESIGNER?
         ========================================================================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#665038] bg-gradient-to-r from-[#321B30] via-[#3A2638] to-[#321B30] px-6 py-14 text-center shadow-2xl sm:px-12">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B08D45]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#D6B875]/10 blur-3xl" />

          <span className="inline-block rounded-full border border-[#B08D45]/40 bg-[#241321] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#D6B875]">
            Designer &amp; Boutique Partnership
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
            Are You a Bridal or Groom Wear Designer?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#C9BBAF] sm:text-sm">
            Showcase your wedding collections and help couples discover their perfect
            wedding outfits on ShubhVivah.
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
            Partner boutique portal active. Vendor verification and inventory API
            integration scheduled for next release.
          </p>
        </div>
      </section>

      {/* =========================================================================
          9. FAQ SECTION (ACCORDION)
         ========================================================================= */}
      <section className="border-t border-[#665038] bg-[#241321] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#665038] bg-[#321B30] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D6B875]">
              Wedding Fashion Queries
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#F8F1E5] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto my-3 h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B08D45] to-transparent" />
            <p className="text-xs text-[#C9BBAF] sm:text-sm">
              Expert advice on wedding wardrobe timelines, custom tailoring, rental
              options, and couple coordination.
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
                  <button
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
