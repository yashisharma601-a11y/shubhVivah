// =========================================================================
// SHUBHVIVAH WEDDING VENUES DATA
// 7 distinct, luxury banquet halls and wedding venues.
// Each has unique, high-resolution banquet hall and wedding venue photography.
// Strictly venue spaces only (banquet ballrooms, wedding stages, marriage lawns).
// =========================================================================

export const ALL_VENUES = [
  {
    id: "grand-palace-banquet",
    slug: "grand-palace-banquet",
    name: "Grand Palace Banquet",
    tagline: "Ultra-Luxury Crystal Chandelier Ballroom & Grand Reception Hall",
    city: "Delhi NCR",
    state: "Delhi",
    location: "Delhi NCR",
    address: "Main Ring Road, Near Subhash Place, Delhi NCR 110034",
    venueType: "Banquet Hall / Luxury Wedding Hall",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.9,
    reviewsCount: 168,
    badge: "Top Rated in NCR",
    verified: true,
    since: "2018",

    // Pricing
    startingPrice: "₹2,50,000",
    startingPriceNumeric: 250000,
    priceRange: "₹2,50,000 - ₹6,00,000 / event",
    pricePerPlateVeg: "₹2,100",
    pricePerPlateNonVeg: "₹2,600",
    rentalCharge: "₹2,50,000 / day",

    // Capacity & Specifications
    guestCapacity: "500 - 1,800 Guests",
    minGuests: 500,
    maxGuests: 1800,
    seatingCapacity: "850 Seating",
    floatingCapacity: "1,800 Floating",
    totalArea: "55,000 sq. ft.",
    indoorArea: "32,000 sq. ft. (Pillarless Ballroom)",
    lawnArea: "23,000 sq. ft. (Ambient Paved Garden)",
    rooms: "28 Luxury AC Rooms",
    toilets: "24 Modern Restrooms",
    parkingCapacity: "350+ Cars with Valet Service",

    // Unique Cover Image: Grand ballroom with glowing chandeliers & banquet dining
    coverImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "gp-1",
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
        caption: "The Grand Crystal Ballroom & Chandelier Dining Hall",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "gp-2",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
        caption: "Illuminated Royal Wedding Stage & Floral Backdrop",
        category: "stage",
        tag: "Wedding Stage & Decor",
      },
      {
        id: "gp-3",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
        caption: "Formal Crystal Glassware & Gold Banquet Table Setting",
        category: "indoor",
        tag: "Banquet Dining Setup",
      },
      {
        id: "gp-4",
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
        caption: "Cocktail Evening Paved Garden with Overhead Fairy Lighting",
        category: "outdoor",
        tag: "Outdoor Garden Lawn",
      },
      {
        id: "gp-5",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Private Bridal Dressing Villa & Preparation Suite",
        category: "indoor",
        tag: "Bridal Suite",
      },
    ],

    spaces: [
      {
        name: "Grand Kohinoor Ballroom",
        type: "Indoor AC Banquet Hall",
        seating: "850 Seating",
        floating: "1,800 Floating",
        area: "32,000 sq. ft.",
        description: "Pillarless grand hall with 22-foot high ceilings, Austrian crystal chandeliers, and acoustic concert sound systems.",
        badge: "Pillarless Ballroom",
      },
      {
        name: "Emerald Cocktail Lawn",
        type: "Paved Open Lawn",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "23,000 sq. ft.",
        description: "Open sky garden tailored for welcome drinks, chaat stalls, and vibrant sangeet cocktail receptions.",
        badge: "Cocktail Garden",
      },
    ],

    facilities: [
      { title: "Centralized Climate Control", desc: "High-tonnage HVAC ensuring refreshing temperature year-round" },
      { title: "Twin Silent Power Generators", desc: "100% uninterrupted power backup for all lighting & sound" },
      { title: "350+ Cars Valet Parking", desc: "Dedicated multi-lane entry with professional valet drivers" },
      { title: "Bridal Dressing Suite", desc: "Spacious AC suite with full vanity mirror and private washroom" },
      { title: "In-House & Outside Catering", desc: "Master banquet chefs providing gourmet multi-cuisine menus" },
      { title: "Baarat & Fireworks Friendly", desc: "Wide reception driveway accommodating brass band & baarat procession" },
    ],

    about:
      "Grand Palace Banquet stands as Delhi NCR's hallmark of celebratory luxury. Situated with seamless arterial connectivity, the venue offers a stunning 32,000 sq. ft. pillarless ballroom adorned with authentic crystal chandeliers and velvet drapery. From royal sangeet nights to grand wedding receptions, every celebration is orchestrated with flawless banquet hospitality.",

    contactPhone: "+91 98111 22334",
    contactWhatsapp: "+919811122334",
    contactEmail: "grandpalace@shubhvivah.com",
  },

  {
    id: "royal-orchid-banquet-hall",
    slug: "royal-orchid-banquet-hall",
    name: "Royal Orchid Banquet Hall",
    tagline: "Opulent Indoor Wedding Hall with Floral Canopies & Royal Aisle",
    city: "Mumbai",
    state: "Maharashtra",
    location: "Mumbai, Maharashtra",
    address: "Near Western Express Highway, Goregaon East, Mumbai 400063",
    venueType: "Banquet Hall / Luxury Wedding Hall",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Celebrity Favorite",
    verified: true,
    since: "2019",

    // Pricing
    startingPrice: "₹3,20,000",
    startingPriceNumeric: 320000,
    priceRange: "₹3,20,000 - ₹7,50,000 / event",
    pricePerPlateVeg: "₹2,400",
    pricePerPlateNonVeg: "₹2,900",
    rentalCharge: "₹3,20,000 / day",

    // Capacity & Specifications
    guestCapacity: "400 - 1,400 Guests",
    minGuests: 400,
    maxGuests: 1400,
    seatingCapacity: "650 Seating",
    floatingCapacity: "1,400 Floating",
    totalArea: "42,000 sq. ft.",
    indoorArea: "28,000 sq. ft. (Luxury AC Hall)",
    lawnArea: "14,000 sq. ft. (Poolside Terrace)",
    rooms: "22 Deluxe AC Rooms",
    toilets: "20 Restrooms",
    parkingCapacity: "280+ Cars with Valet",

    // Unique Cover Image: Indoor wedding hall with floral ceiling canopy & ambient lilac-gold lighting
    coverImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "ro-1",
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
        caption: "The Royal Orchid Grand Hall with Overhead Floral Canopy",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "ro-2",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Mandap with Gold Carved Pillars & Floral Drapery",
        category: "stage",
        tag: "Wedding Mandap",
      },
      {
        id: "ro-3",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
        caption: "Poolside Cocktail Terrace with Illuminated Gazebos",
        category: "outdoor",
        tag: "Poolside Terrace",
      },
      {
        id: "ro-4",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Luxury Bridal Changing Room with Dressing Mirror",
        category: "indoor",
        tag: "Bridal Suite",
      },
    ],

    spaces: [
      {
        name: "Orchid Grand Ballroom",
        type: "Indoor Banquet Hall",
        seating: "650 Seating",
        floating: "1,400 Floating",
        area: "28,000 sq. ft.",
        description: "Opulent climate-controlled banquet hall featuring signature floral chandeliers and plush carpeting.",
        badge: "Grand Hall",
      },
      {
        name: "Azure Poolside Terrace",
        type: "Outdoor Terrace Deck",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "14,000 sq. ft.",
        description: "Open-air breeze deck overlooking Mumbai skyline, perfect for sunset pheras or sangeet afterparties.",
        badge: "Open Terrace",
      },
    ],

    facilities: [
      { title: "Centralized AC System", desc: "Full climate control with high air exchange rates" },
      { title: "State-of-Art JBL Sound", desc: "Acoustically treated halls allowing crisp music without reverberation" },
      { title: "Valet Parking for 280+ Cars", desc: "Spacious underground & surface valet parking" },
      { title: "2 Exclusive Bridal Suites", desc: "Ensuite dressing vanity with security lockers" },
      { title: "Licensed Liquor Bar Counter", desc: "Dedicated cocktail lounge counter with bar setup" },
      { title: "Power Backup", desc: "Automatic generator switchover in milliseconds" },
    ],

    about:
      "Royal Orchid Banquet Hall in Mumbai is synonymous with sophistication and upscale glamour. Designed with contemporary floral ceiling canopies and lavish ambient illumination, this venue provides an extraordinary setting for high-profile weddings and gala receptions in Western Mumbai.",

    contactPhone: "+91 98200 33445",
    contactWhatsapp: "+919820033445",
    contactEmail: "royalorchid@shubhvivah.com",
  },

  {
    id: "the-celebration-garden",
    slug: "the-celebration-garden",
    name: "The Celebration Garden",
    tagline: "Grand Chandelier Crystal Banquet Hall & Open-Air Wedding Lawn",
    city: "Jaipur",
    state: "Rajasthan",
    location: "Jaipur, Rajasthan",
    address: "Tonk Road, Near Chokhi Dhani, Jaipur, Rajasthan 302022",
    venueType: "Luxury Banquet Hall / Wedding Ballroom",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.9,
    reviewsCount: 156,
    badge: "Trending in Rajasthan",
    verified: true,
    since: "2017",

    // Pricing
    startingPrice: "₹1,80,000",
    startingPriceNumeric: 180000,
    priceRange: "₹1,80,000 - ₹4,80,000 / event",
    pricePerPlateVeg: "₹1,600",
    pricePerPlateNonVeg: "₹2,100",
    rentalCharge: "₹1,80,000 / day",

    // Capacity & Specifications
    guestCapacity: "600 - 2,500 Guests",
    minGuests: 600,
    maxGuests: 2500,
    seatingCapacity: "1,100 Seating",
    floatingCapacity: "2,500 Floating",
    totalArea: "75,000 sq. ft.",
    indoorArea: "35,000 sq. ft. (Grand Indoor AC Banquet Ballroom)",
    lawnArea: "40,000 sq. ft. (Lush Green Royal Lawn)",
    rooms: "32 Heritage AC Guest Rooms",
    toilets: "30 Washrooms",
    parkingCapacity: "500+ Cars Valet Parking",

    // Unique Cover Image: Grand illuminated luxury banquet ballroom with chandeliers & decorated tables
    coverImage:
      "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "cg-1",
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
        caption: "The Celebration Garden Marriage Lawn at Twilight with Fairy Lights",
        category: "outdoor",
        tag: "Marriage Garden & Lawn",
      },
      {
        id: "cg-2",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
        caption: "Extravagant Royal Mandap with Fresh Floral Archways",
        category: "stage",
        tag: "Stage & Mandap Decor",
      },
      {
        id: "cg-3",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
        caption: "Banquet Dining Setup with Royal Rajputana Place Settings",
        category: "indoor",
        tag: "Indoor Dining Pavilion",
      },
      {
        id: "cg-4",
        url: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=1400&q=85",
        caption: "Grand Rajasthani Entrance Gate & Baarat Pathway",
        category: "outdoor",
        tag: "Entrance & Facade",
      },
    ],

    spaces: [
      {
        name: "Maharani Royal Lawn",
        type: "Natural Grass Marriage Garden",
        seating: "1,100 Seating",
        floating: "2,500 Floating",
        area: "60,000 sq. ft.",
        description: "Expansive green lawn framed by royal jharokhas, water fountains, and towering palm trees.",
        badge: "Open-Air Lawn",
      },
      {
        name: "Sheesh Mahal Pavilion",
        type: "Covered AC Dining Hall",
        seating: "400 Seating",
        floating: "800 Floating",
        area: "15,000 sq. ft.",
        description: "Climate-controlled royal dining pavilion for serving authentic Rajasthani and global feasts.",
        badge: "Covered Pavilion",
      },
    ],

    facilities: [
      { title: "60,000 sq.ft Natural Lawn", desc: "Manicured Bermuda grass with underground drainage" },
      { title: "500+ Vehicles Parking", desc: "Dedicated paved parking field with security guards & valet" },
      { title: "Baarat Welcome Gate", desc: "Wide royal procession gate suitable for horse carriage & dhol" },
      { title: "32 Heritage AC Rooms", desc: "Comfortable guest accommodations for outstation families" },
      { title: "Fireworks & Hawan Allowed", desc: "Designated safe zones for phera fire rituals & fireworks" },
      { title: "Full Diesel Generator Backup", desc: "Continuous dual-generator power backup guarantee" },
    ],

    about:
      "The Celebration Garden in Jaipur embodies the magic of royal open-air weddings. Spanning 75,000 sq. ft. of verdant lawns and royal heritage pavilions, the venue provides a picturesque starlit ambiance for grand pheras, varmala entries, and lavish reception banquets.",

    contactPhone: "+91 94140 77889",
    contactWhatsapp: "+919414077889",
    contactEmail: "celebrationgarden@shubhvivah.com",
  },

  {
    id: "golden-crown-wedding-hall",
    slug: "golden-crown-wedding-hall",
    name: "Golden Crown Wedding Hall",
    tagline: "Aristocratic Gold-Trimmed Banquet Hall with Awadhi Royal Grandeur",
    city: "Lucknow",
    state: "Uttar Pradesh",
    location: "Lucknow, Uttar Pradesh",
    address: "Vipin Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    venueType: "Banquet Hall / Luxury Wedding Hall",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.8,
    reviewsCount: 118,
    badge: "Top Rated in UP",
    verified: true,
    since: "2020",

    // Pricing
    startingPrice: "₹1,95,000",
    startingPriceNumeric: 195000,
    priceRange: "₹1,95,000 - ₹4,50,000 / event",
    pricePerPlateVeg: "₹1,750",
    pricePerPlateNonVeg: "₹2,250",
    rentalCharge: "₹1,95,000 / day",

    // Capacity & Specifications
    guestCapacity: "450 - 1,500 Guests",
    minGuests: 450,
    maxGuests: 1500,
    seatingCapacity: "700 Seating",
    floatingCapacity: "1,500 Floating",
    totalArea: "45,000 sq. ft.",
    indoorArea: "30,000 sq. ft. (Two Adjoining Halls)",
    lawnArea: "15,000 sq. ft. (Front Courtyard)",
    rooms: "20 Luxury AC Rooms",
    toilets: "18 Restrooms",
    parkingCapacity: "300+ Cars with Valet",

    // Unique Cover Image: Gold-trimmed banquet hall with Chiavari chairs & crystal centerpieces
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "gc-1",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
        caption: "Golden Crown Imperial Dining Hall with Gold Chiavari Chairs",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "gc-2",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
        caption: "Awadhi Royal Wedding Stage with Crystal Backdrops",
        category: "stage",
        tag: "Wedding Stage & Decor",
      },
      {
        id: "gc-3",
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
        caption: "Floral Grand Entrance Foyer & Pre-Function Area",
        category: "indoor",
        tag: "Reception Foyer",
      },
      {
        id: "gc-4",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Bridal Preparation Lounge with Dressing Station",
        category: "indoor",
        tag: "Bridal Suite",
      },
    ],

    spaces: [
      {
        name: "Nawab Grand Ballroom",
        type: "Indoor AC Banquet Hall",
        seating: "700 Seating",
        floating: "1,500 Floating",
        area: "30,000 sq. ft.",
        description: "Opulent banquet space reflecting Nawabi archways, gold leaf wall accents, and warm ambient chandeliers.",
        badge: "Grand Ballroom",
      },
      {
        name: "Courtyard Foyer",
        type: "Paved Courtyard",
        seating: "150 Seating",
        floating: "350 Floating",
        area: "15,000 sq. ft.",
        description: "Elegantly paved entrance garden for welcoming the baarat with traditional shehnai and refreshments.",
        badge: "Entrance Foyer",
      },
    ],

    facilities: [
      { title: "Nawabi Gold Interiors", desc: "Handcrafted architectural cornices with gold gilding" },
      { title: "Centralized Air Conditioning", desc: "VRF air-conditioning system ensuring uniform cool airflow" },
      { title: "Awadhi Dastarkhwan Catering", desc: "Renowned specialty royal chefs for Dum Pukht & Awadhi banquets" },
      { title: "Valet Parking for 300+ Cars", desc: "Dedicated paved parking bay right off Gomti Nagar main road" },
      { title: "Power Backup", desc: "Dual Caterpillar generators guaranteeing uninterrupted power" },
      { title: "20 Guest Rooms", desc: "Modern hotel-style rooms for out-of-town wedding attendees" },
    ],

    about:
      "Golden Crown Wedding Hall in Lucknow brings the regal heritage of Awadh to modern wedding celebrations. Located centrally in Gomti Nagar, the venue features aristocratic gold detailing, high-capacity banquet ballrooms, and an unmatched culinary legacy for royal Lucknowi weddings.",

    contactPhone: "+91 95599 11223",
    contactWhatsapp: "+919559911223",
    contactEmail: "goldencrown@shubhvivah.com",
  },

  {
    id: "imperial-grand-banquet",
    slug: "imperial-grand-banquet",
    name: "Imperial Grand Banquet",
    tagline: "Contemporary High-Ceiling Luxury Banquet with Layered Floral Mandap",
    city: "Noida",
    state: "Uttar Pradesh",
    location: "Noida, Uttar Pradesh",
    address: "Sector 62, Near Electronic City Metro, Noida, UP 201309",
    venueType: "Banquet Hall / Luxury Wedding Hall",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.8,
    reviewsCount: 136,
    badge: "Most Popular in Noida",
    verified: true,
    since: "2019",

    // Pricing
    startingPrice: "₹2,80,000",
    startingPriceNumeric: 280000,
    priceRange: "₹2,80,000 - ₹6,50,000 / event",
    pricePerPlateVeg: "₹2,200",
    pricePerPlateNonVeg: "₹2,700",
    rentalCharge: "₹2,80,000 / day",

    // Capacity & Specifications
    guestCapacity: "500 - 1,600 Guests",
    minGuests: 500,
    maxGuests: 1600,
    seatingCapacity: "750 Seating",
    floatingCapacity: "1,600 Floating",
    totalArea: "48,000 sq. ft.",
    indoorArea: "35,000 sq. ft. (Two Interconnected Halls)",
    lawnArea: "13,000 sq. ft. (Pre-Function Deck)",
    rooms: "25 Modern AC Rooms",
    toilets: "22 Restrooms",
    parkingCapacity: "400+ Cars with Valet",

    // Unique Cover Image: Breathtaking illuminated wedding stage with floral mandap arch & stage lighting
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "ig-1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
        caption: "The Imperial Stage with Layered Floral Arch & Dynamic Lighting",
        category: "stage",
        tag: "Wedding Stage & Decor",
      },
      {
        id: "ig-2",
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
        caption: "Imperial Grand Banquet Ballroom with Crystal Chandeliers",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "ig-3",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
        caption: "Gourmet Buffet Dining & Elegant Banquet Table Setup",
        category: "indoor",
        tag: "Buffet Dining Hall",
      },
      {
        id: "ig-4",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Imperial Bridal Suite & Luxury Dressing Room",
        category: "indoor",
        tag: "Bridal Suite",
      },
    ],

    spaces: [
      {
        name: "Imperial Grand Hall",
        type: "Indoor Banquet Hall",
        seating: "750 Seating",
        floating: "1,600 Floating",
        area: "35,000 sq. ft.",
        description: "Versatile high-ceiling hall equipped with modular stage partitions and programmable RGB atmospheric lighting.",
        badge: "High-Ceiling Hall",
      },
      {
        name: "Terrace Deck",
        type: "Open-Air Deck",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "13,000 sq. ft.",
        description: "Modern pre-function cocktail deck offering open city views and live food counter stations.",
        badge: "Open Deck",
      },
    ],

    facilities: [
      { title: "Intelligent Stage Lighting", desc: "Motorized trussing with moving heads & warm pin spots" },
      { title: "Direct Metro Connectivity", desc: "Walking distance from Sector 62 metro station with easy access" },
      { title: "Multi-Cuisine Banquet Chefs", desc: "Signature North Indian, Pan-Asian, and Italian live counters" },
      { title: "400+ Cars Valet Parking", desc: "Multi-level safe parking with dedicated valet drivers" },
      { title: "100% Power Backup", desc: "Automatic generator backup for zero-interruption celebrations" },
      { title: "25 Luxury Rooms", desc: "Fully furnished AC rooms for bride, groom, and close family" },
    ],

    about:
      "Imperial Grand Banquet in Sector 62 Noida is the preferred destination for couples desiring contemporary luxury and cutting-edge stage production. Boasting expansive pillar-free halls, intelligent wedding stage illumination, and gourmet banquet dining, it delivers a five-star experience.",

    contactPhone: "+91 98188 44556",
    contactWhatsapp: "+919818844556",
    contactEmail: "imperialgrand@shubhvivah.com",
  },

  {
    id: "royal-heritage-wedding-venue",
    slug: "royal-heritage-wedding-venue",
    name: "Royal Heritage Wedding Venue",
    tagline: "Royal Palace Ballroom & Crystal Chandelier Banquet Hall",
    city: "Udaipur",
    state: "Rajasthan",
    location: "Udaipur, Rajasthan",
    address: "Rani Road, Near Fateh Sagar Lake, Ambavgarh, Udaipur, Rajasthan 313001",
    venueType: "Luxury Banquet Hall / Royal Palace Hall",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.9,
    reviewsCount: 184,
    badge: "Featured Royal Venue",
    verified: true,
    since: "2018",

    // Pricing
    startingPrice: "₹4,50,000",
    startingPriceNumeric: 450000,
    priceRange: "₹4,50,000 - ₹9,50,000 / event",
    pricePerPlateVeg: "₹2,500",
    pricePerPlateNonVeg: "₹3,200",
    rentalCharge: "₹4,50,000 / day",

    // Capacity & Specifications
    guestCapacity: "500 - 2,500 Guests",
    minGuests: 500,
    maxGuests: 2500,
    seatingCapacity: "1,200 Seating",
    floatingCapacity: "2,500 Floating",
    totalArea: "85,000 sq. ft.",
    indoorArea: "25,000 sq. ft. (Pillarless Ballroom)",
    lawnArea: "60,000 sq. ft. (Royal Manicured Garden)",
    rooms: "48 Royal AC Heritage Suites",
    toilets: "36 Modern Luxury Restrooms",
    parkingCapacity: "400+ Cars with Valet Service",

    // Unique Cover Image: Opulent royal palace banquet hall with grand chandeliers & luxury seating
    coverImage:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "rh-1",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Heritage Palace Courtyard & Illuminated Facade",
        category: "outdoor",
        tag: "Palace Exterior & Courtyard",
      },
      {
        id: "rh-2",
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
        caption: "The Grand Crystal Ballroom & Royal Dining Setup",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "rh-3",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Traditional Indian Royal Wedding Mandap Under Golden Canopy",
        category: "stage",
        tag: "Mandap & Stage",
      },
      {
        id: "rh-4",
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
        caption: "Mewar Royal Marriage Lawn Under Fairy Lights at Twilight",
        category: "outdoor",
        tag: "Marriage Garden & Lawn",
      },
      {
        id: "rh-5",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
        caption: "Poolside Sangeet & Cocktail Lawn with Heritage Arches",
        category: "outdoor",
        tag: "Resort Poolside Lawn",
      },
      {
        id: "rh-6",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Bridal Dressing Villa & Preparation Suite",
        category: "indoor",
        tag: "Bridal Suite & Rooms",
      },
    ],

    spaces: [
      {
        name: "The Kohinoor Grand Ballroom",
        type: "Indoor AC Banquet Hall",
        seating: "800 Seating",
        floating: "1,500 Floating",
        area: "25,000 sq. ft.",
        description: "Pillarless architectural masterpiece with imported Austrian crystal chandeliers and central climate control.",
        badge: "Pillarless Ballroom",
      },
      {
        name: "Mewar Royal Marriage Garden",
        type: "Outdoor Manicured Lawn",
        seating: "1,200 Seating",
        floating: "2,500 Floating",
        area: "60,000 sq. ft.",
        description: "Expansive natural grass lawn flanked by heritage royal jharokhas, illuminated palms, and mountain views.",
        badge: "Open-Air Lawn",
      },
    ],

    facilities: [
      { title: "Heritage Rajputana Architecture", desc: "Authentic stone jharokhas, carved pillars, and courtyards" },
      { title: "48 Royal Heritage AC Suites", desc: "Opulent suites for hosting destination wedding guests" },
      { title: "100% Generator Power Backup", desc: "Twin silent generators with automated load management" },
      { title: "Valet Parking for 400+ Cars", desc: "Secured parking with paved driveway and valet drivers" },
      { title: "Baarat & Horse Carriage Entry", desc: "Royal arrival path accommodating fireworks, elephants, and dhol" },
      { title: "Dedicated Bridal Villa", desc: "Spacious private villa with vanity mirrors and makeup lounge" },
    ],

    about:
      "Royal Heritage Wedding Venue in Udaipur is the epitome of royal destination weddings in Rajasthan. Situated near the picturesque Fateh Sagar Lake, the property spans over 85,000 sq. ft. of curated celebratory spaces combining majestic palace courtyards with a modern crystal banquet hall.",

    contactPhone: "+91 98765 43210",
    contactWhatsapp: "+919876543210",
    contactEmail: "royalheritage@shubhvivah.com",
  },

  {
    id: "pearl-grand-celebration-hall",
    slug: "pearl-grand-celebration-hall",
    name: "Pearl Grand Celebration Hall",
    tagline: "Elegantly Crafted Banquet Ballroom with Golden Stage & Velvet Accents",
    city: "Moradabad",
    state: "Uttar Pradesh",
    location: "Moradabad, Uttar Pradesh",
    address: "Delhi Road, Near Majhola, Moradabad, Uttar Pradesh 244001",
    venueType: "Banquet Hall / Marriage Garden",
    primaryType: "Banquet Hall",
    category: "Banquet Halls",
    rating: 4.7,
    reviewsCount: 94,
    badge: "Budget Friendly Luxury",
    verified: true,
    since: "2021",

    // Pricing
    startingPrice: "₹1,25,000",
    startingPriceNumeric: 125000,
    priceRange: "₹1,25,000 - ₹3,50,000 / event",
    pricePerPlateVeg: "₹1,400",
    pricePerPlateNonVeg: "₹1,850",
    rentalCharge: "₹1,25,000 / day",

    // Capacity & Specifications
    guestCapacity: "400 - 1,200 Guests",
    minGuests: 400,
    maxGuests: 1200,
    seatingCapacity: "550 Seating",
    floatingCapacity: "1,200 Floating",
    totalArea: "38,000 sq. ft.",
    indoorArea: "22,000 sq. ft. (Grand Banquet Hall)",
    lawnArea: "16,000 sq. ft. (Front Marriage Lawn)",
    rooms: "16 AC Guest Rooms",
    toilets: "16 Restrooms",
    parkingCapacity: "250+ Cars with Valet",

    // Unique Cover Image: Opulent ceremonial wedding stage with carved golden pillars & velvet drapery
    coverImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "pg-1",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "The Pearl Stage with Golden Carved Pillars & Velvet Canopy",
        category: "stage",
        tag: "Wedding Stage & Decor",
      },
      {
        id: "pg-2",
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
        caption: "Pearl Grand Indoor Ballroom with Crystal Centerpieces",
        category: "indoor",
        tag: "Indoor Banquet Hall",
      },
      {
        id: "pg-3",
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85",
        caption: "Open Marriage Lawn with Evening Lighting",
        category: "outdoor",
        tag: "Marriage Garden",
      },
      {
        id: "pg-4",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
        caption: "Bridal Preparation Room with Vanity Lights",
        category: "indoor",
        tag: "Bridal Room",
      },
    ],

    spaces: [
      {
        name: "Pearl Grand Ballroom",
        type: "Indoor Banquet Hall",
        seating: "550 Seating",
        floating: "1,200 Floating",
        area: "22,000 sq. ft.",
        description: "Elegantly finished banquet hall with brass accents, crystal chandeliers, and centralized air conditioning.",
        badge: "Banquet Hall",
      },
      {
        name: "Pearl Lawn",
        type: "Marriage Garden",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "16,000 sq. ft.",
        description: "Front marriage lawn ideal for varmala stages, live food counters, and welcoming the baarat.",
        badge: "Front Lawn",
      },
    ],

    facilities: [
      { title: "Centralized Climate Control", desc: "Consistent indoor air conditioning throughout summer & winter" },
      { title: "Full Generator Power Backup", desc: "Reliable generator power ensuring flawless ceremonies" },
      { title: "Valet Parking for 250+ Cars", desc: "Convenient parking along Delhi Road with valet attendants" },
      { title: "Bridal Green Room", desc: "Air-conditioned bridal room with private vanity & attached bathroom" },
      { title: "In-House Master Caterers", desc: "Traditional Moradabadi Mughlai and Pure Veg banquet menus" },
      { title: "Stage Customization", desc: "Pre-equipped with golden carved pillars and velvet backdrops" },
    ],

    about:
      "Pearl Grand Celebration Hall is Moradabad's premier banquet destination, offering high-end decor and royal hospitality at accessible package rates. Featuring a 22,000 sq. ft. banquet hall, front lawn, and dedicated bridal rooms, it accommodates sangeet, wedding, and reception ceremonies with charm and elegance.",

    contactPhone: "+91 97190 55667",
    contactWhatsapp: "+919719055667",
    contactEmail: "pearlgrand@shubhvivah.com",
  },

  // =========================================================================
  // HERITAGE FORT WEDDING VENUES — 7 Royal Rajasthani Forts & Palaces
  // =========================================================================

  {
    id: "neemrana-fort-palace",
    slug: "neemrana-fort-palace",
    name: "Neemrana Fort Palace",
    tagline: "15th-Century Tiered Fort Palace Perched Atop the Aravalli Hills",
    city: "Neemrana",
    state: "Rajasthan",
    location: "Neemrana, Rajasthan",
    address: "Village Neemrana, Dist. Alwar, NH-48, Neemrana, Rajasthan 301705",
    venueType: "Heritage Fort / Palace Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 4.9,
    reviewsCount: 276,
    badge: "Heritage Icon of Rajasthan",
    verified: true,
    since: "1986",

    startingPrice: "₹8,00,000",
    startingPriceNumeric: 800000,
    priceRange: "₹8,00,000 - ₹18,00,000 / event",
    pricePerPlateVeg: "₹3,800",
    pricePerPlateNonVeg: "₹4,500",
    rentalCharge: "₹8,00,000 / day",

    guestCapacity: "300 - 1,200 Guests",
    minGuests: 300,
    maxGuests: 1200,
    seatingCapacity: "600 Seating",
    floatingCapacity: "1,200 Floating",
    totalArea: "1,20,000 sq. ft.",
    indoorArea: "20,000 sq. ft. (Royal Durbar Hall & Chambers)",
    lawnArea: "1,00,000 sq. ft. (Stepped Terraces & Courtyards)",
    rooms: "73 Heritage Palace Rooms & Suites",
    toilets: "40 Luxury Restrooms",
    parkingCapacity: "300+ Cars with Valet Service",

    coverImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "nfp-1",
        url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
        caption: "Neemrana Fort Palace — Majestic Tiered Facade at Twilight",
        category: "outdoor",
        tag: "Fort Exterior",
      },
      {
        id: "nfp-2",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Stepwell Courtyard with Jharokha Balconies",
        category: "outdoor",
        tag: "Palace Courtyard",
      },
      {
        id: "nfp-3",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Grand Mandap Setup in the Historic Durbar Hall",
        category: "stage",
        tag: "Wedding Mandap",
      },
      {
        id: "nfp-4",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
        caption: "Illuminated Fort Palace Gardens at Night",
        category: "outdoor",
        tag: "Palace Gardens",
      },
    ],

    spaces: [
      {
        name: "The Durbar Mahal",
        type: "Terrace Courtyard",
        seating: "600 Seating",
        floating: "1,200 Floating",
        area: "25,000 sq. ft.",
        description: "Dramatic open-air stepped terrace overlooking the Aravalli range — perfect for a royal baraat procession and pheras.",
        badge: "Iconic Terrace",
      },
      {
        name: "Raj Mahal Chambers",
        type: "Indoor Heritage Hall",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "8,000 sq. ft.",
        description: "Intimate heritage halls adorned with hand-painted murals and original Rajputana antiques for mehendi and sangeet.",
        badge: "Heritage Hall",
      },
    ],

    facilities: [
      { title: "15th-Century Rajputana Architecture", desc: "Tiered fort with 73 uniquely decorated heritage rooms" },
      { title: "Hilltop Panoramic Views", desc: "360° sweeping views of Aravalli hills and NH-48 corridor" },
      { title: "Horse & Elephant Baraat", desc: "Special royal procession paths for elephant, camel & horse entry" },
      { title: "73 Heritage Palace Rooms", desc: "Opulent suites for destination wedding guests across multiple floors" },
      { title: "Heritage Pool & Spa", desc: "Infinity pool and ayurvedic spa for pre-wedding relaxation" },
      { title: "Zip-Lining & Activities", desc: "Adventure experiences for destination wedding guests" },
    ],

    about:
      "Neemrana Fort Palace, a stunning 15th-century stepwell fort perched 122 metres above the Aravalli plains, is one of India's most celebrated heritage hotels for destination weddings. Its dramatic tiered architecture, 73 heritage suites, and sweeping hilltop terraces create an unmatched royal wedding backdrop just 122 km from Delhi.",

    contactPhone: "+91 94602 11222",
    contactWhatsapp: "+919460211222",
    contactEmail: "weddings@neemranafort.shubhvivah.com",
  },

  {
    id: "samode-palace-jaipur",
    slug: "samode-palace-jaipur",
    name: "Samode Palace",
    tagline: "18th-Century Royal Sheesh Mahal Palace with Mirror-Mosaic Interiors",
    city: "Jaipur",
    state: "Rajasthan",
    location: "Samode, Jaipur, Rajasthan",
    address: "Samode Village, Dist. Jaipur, Rajasthan 303806",
    venueType: "Heritage Palace / Royal Fort Wedding Venue",
    primaryType: "Heritage Palace",
    category: "Heritage Palaces & Forts",
    rating: 4.9,
    reviewsCount: 312,
    badge: "Bollywood's Favourite Palace",
    verified: true,
    since: "1987",

    startingPrice: "₹10,00,000",
    startingPriceNumeric: 1000000,
    priceRange: "₹10,00,000 - ₹22,00,000 / event",
    pricePerPlateVeg: "₹4,200",
    pricePerPlateNonVeg: "₹5,000",
    rentalCharge: "₹10,00,000 / day",

    guestCapacity: "200 - 900 Guests",
    minGuests: 200,
    maxGuests: 900,
    seatingCapacity: "450 Seating",
    floatingCapacity: "900 Floating",
    totalArea: "90,000 sq. ft.",
    indoorArea: "15,000 sq. ft. (Sheesh Mahal & Durbar Hall)",
    lawnArea: "75,000 sq. ft. (Palace Gardens & Courtyards)",
    rooms: "44 Heritage Palace Suites",
    toilets: "32 Luxury Restrooms",
    parkingCapacity: "200+ Cars with Royal Valet",

    coverImage:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "sp-1",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
        caption: "Samode Palace — Grand Rajputana Facade & Courtyard",
        category: "outdoor",
        tag: "Palace Exterior",
      },
      {
        id: "sp-2",
        url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
        caption: "Sheesh Mahal — Thousand Mirror Hall for Weddings",
        category: "indoor",
        tag: "Sheesh Mahal",
      },
      {
        id: "sp-3",
        url: "https://images.unsplash.com/photo-1609948543911-a9e68d2c8dce?auto=format&fit=crop&w=1400&q=85",
        caption: "Palace Swimming Pool with Heritage Architecture",
        category: "outdoor",
        tag: "Palace Pool",
      },
      {
        id: "sp-4",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
        caption: "Open-Air Haveli Courtyard for Evening Sangeet",
        category: "outdoor",
        tag: "Palace Courtyard",
      },
    ],

    spaces: [
      {
        name: "Sheesh Mahal",
        type: "Indoor Mirror Palace Hall",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "8,000 sq. ft.",
        description: "The legendary Thousand Mirror Hall — hand-crafted in the 18th century — offering an ethereal backdrop for intimate pheras and cocktails.",
        badge: "Mirror Palace",
      },
      {
        name: "Durbar Mahal Gardens",
        type: "Open Courtyard & Gardens",
        seating: "450 Seating",
        floating: "900 Floating",
        area: "30,000 sq. ft.",
        description: "Tiered palace gardens with sculpted hedges and fountain courtyards — perfect for grand receptions under open skies.",
        badge: "Palace Gardens",
      },
    ],

    facilities: [
      { title: "Sheesh Mahal — Mirror Art Hall", desc: "18th-century hand-crafted mosaic mirror interiors" },
      { title: "44 Royal Heritage Suites", desc: "Individually appointed royal suites with period furniture" },
      { title: "Private Palace Helipad", desc: "Fly-in destination wedding arrival by helicopter" },
      { title: "Royal Spa & Wellness", desc: "Traditional Ayurvedic treatments for bridal parties" },
      { title: "Bespoke Rajasthani Cuisine", desc: "Authentic Laal Maas, Dal Baati & royal Thali banquets" },
      { title: "Celebrity-Approved Venue", desc: "Featured in Vogue, Harper's Bazaar, and Filmfare Weddings" },
    ],

    about:
      "Samode Palace near Jaipur is a jewel of Rajputana architecture — a 475-year-old palace renowned for its breathtaking Sheesh Mahal (Hall of Mirrors), sculpted courtyards, and lush gardens. A favourite for Bollywood weddings and international destination couples, it offers an intimate yet utterly majestic wedding canvas.",

    contactPhone: "+91 94141 22334",
    contactWhatsapp: "+919414122334",
    contactEmail: "weddings@samodepalace.shubhvivah.com",
  },

  {
    id: "chomu-palace-jaipur",
    slug: "chomu-palace-jaipur",
    name: "Chomu Palace",
    tagline: "250-Year-Old Grand Haveli Palace with Peacock Courtyards & Elephant Gates",
    city: "Jaipur",
    state: "Rajasthan",
    location: "Chomu, Jaipur, Rajasthan",
    address: "Chomu Town, Dist. Jaipur, Rajasthan 303702",
    venueType: "Heritage Fort / Haveli Palace Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 4.8,
    reviewsCount: 198,
    badge: "Royal Destination Wedding",
    verified: true,
    since: "1994",

    startingPrice: "₹7,50,000",
    startingPriceNumeric: 750000,
    priceRange: "₹7,50,000 - ₹16,00,000 / event",
    pricePerPlateVeg: "₹3,500",
    pricePerPlateNonVeg: "₹4,200",
    rentalCharge: "₹7,50,000 / day",

    guestCapacity: "300 - 1,500 Guests",
    minGuests: 300,
    maxGuests: 1500,
    seatingCapacity: "700 Seating",
    floatingCapacity: "1,500 Floating",
    totalArea: "1,10,000 sq. ft.",
    indoorArea: "20,000 sq. ft. (Darbar Hall & Banquet Rooms)",
    lawnArea: "90,000 sq. ft. (Palace Lawns & Courtyards)",
    rooms: "52 Royal Palace Suites",
    toilets: "38 Restrooms",
    parkingCapacity: "400+ Cars with Valet",

    coverImage:
      "https://images.unsplash.com/photo-1625744536176-ade3b68d3f1d?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "cp-1",
        url: "https://images.unsplash.com/photo-1625744536176-ade3b68d3f1d?auto=format&fit=crop&w=1400&q=85",
        caption: "Chomu Palace — Grand Elephant Gateway & Fort Entrance",
        category: "outdoor",
        tag: "Fort Gateway",
      },
      {
        id: "cp-2",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
        caption: "Peacock Courtyard with Heritage Arches & Fountains",
        category: "outdoor",
        tag: "Palace Courtyard",
      },
      {
        id: "cp-3",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Wedding Mandap Under Palace Arches",
        category: "stage",
        tag: "Wedding Mandap",
      },
      {
        id: "cp-4",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
        caption: "Illuminated Palace Lawns for Grand Reception",
        category: "outdoor",
        tag: "Palace Lawn",
      },
    ],

    spaces: [
      {
        name: "Darbar-E-Khas",
        type: "Royal Audience Hall",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "12,000 sq. ft.",
        description: "The historic royal audience chamber featuring hand-carved sandstone pillars and painted fresco ceilings.",
        badge: "Darbar Hall",
      },
      {
        name: "Peacock Gardens",
        type: "Outdoor Palace Lawn",
        seating: "700 Seating",
        floating: "1,500 Floating",
        area: "45,000 sq. ft.",
        description: "Sprawling lawn grounds framed by palace ramparts and lit by antique lanterns — ideal for grand evening receptions.",
        badge: "Palace Gardens",
      },
    ],

    facilities: [
      { title: "250-Year Palace Heritage", desc: "Authentic Rajputana fort with ornate frescoes & carved arches" },
      { title: "52 Royal Heritage Suites", desc: "Expansive palace suites with private balconies & courtyard views" },
      { title: "Elephant & Camel Baraat", desc: "Royal procession paths for traditional royal baraat arrivals" },
      { title: "Palace Helipad", desc: "Exclusive helicopter arrival facility for destination weddings" },
      { title: "Rajasthani Folk Performances", desc: "Live Kalbelia, Ghoomar & fire dancers for cultural entertainment" },
      { title: "In-House Catering by Royal Chefs", desc: "Authentic Rajasthani and Mughal cuisine banquet experiences" },
    ],

    about:
      "Chomu Palace near Jaipur is a magnificent 250-year-old fortified palace offering one of Rajasthan's grandest wedding settings. With its dramatic elephant gateway, peacock courtyards, frescoed Darbar halls, and expansive palace lawns spanning over 1.1 lakh sq. ft., it provides a truly royal canvas for destination weddings.",

    contactPhone: "+91 94147 33445",
    contactWhatsapp: "+919414733445",
    contactEmail: "weddings@chomupalace.shubhvivah.com",
  },

  {
    id: "alila-fort-bishangarh",
    slug: "alila-fort-bishangarh",
    name: "Alila Fort Bishangarh",
    tagline: "230-Year-Old Hilltop Fort Transformed into a Luxury Destination Resort",
    city: "Bishangarh",
    state: "Rajasthan",
    location: "Bishangarh, Rajasthan",
    address: "Bishangarh Village, Dist. Jaipur, Rajasthan 303113",
    venueType: "Heritage Fort / Luxury Resort Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 5.0,
    reviewsCount: 224,
    badge: "5-Star Heritage Luxury",
    verified: true,
    since: "2015",

    startingPrice: "₹15,00,000",
    startingPriceNumeric: 1500000,
    priceRange: "₹15,00,000 - ₹35,00,000 / event",
    pricePerPlateVeg: "₹5,500",
    pricePerPlateNonVeg: "₹6,500",
    rentalCharge: "₹15,00,000 / day",

    guestCapacity: "100 - 600 Guests",
    minGuests: 100,
    maxGuests: 600,
    seatingCapacity: "300 Seating",
    floatingCapacity: "600 Floating",
    totalArea: "75,000 sq. ft.",
    indoorArea: "10,000 sq. ft. (Luxury Ballroom & Chambers)",
    lawnArea: "65,000 sq. ft. (Rampart Terraces & Infinity Pool Lawn)",
    rooms: "59 Luxury Heritage Suites",
    toilets: "35 Luxury Restrooms",
    parkingCapacity: "200+ Cars with Valet Service",

    coverImage:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "afb-1",
        url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=85",
        caption: "Alila Fort Bishangarh — Dramatic Hilltop Fort at Dusk",
        category: "outdoor",
        tag: "Fort Exterior",
      },
      {
        id: "afb-2",
        url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85",
        caption: "Rampart Terrace Wedding Setup with Panoramic Valley Views",
        category: "outdoor",
        tag: "Rampart Terrace",
      },
      {
        id: "afb-3",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
        caption: "Infinity Pool Wedding Reception — Fort Silhouette at Sunset",
        category: "outdoor",
        tag: "Pool Terrace",
      },
      {
        id: "afb-4",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Intimate Phera Ceremony in Candlelit Fort Courtyard",
        category: "stage",
        tag: "Wedding Ceremony",
      },
    ],

    spaces: [
      {
        name: "The Rampart Terrace",
        type: "Open-Air Hilltop Terrace",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "15,000 sq. ft.",
        description: "Dramatic open-air terrace atop the historic ramparts offering unobstructed 360° views of the Rajasthan countryside.",
        badge: "Hilltop Terrace",
      },
      {
        name: "Fort Courtyards",
        type: "Outdoor Heritage Courtyard",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "20,000 sq. ft.",
        description: "Multiple intimate stone courtyards within the fort walls — ideal for mehendi, haldi, and sangeet under the stars.",
        badge: "Fort Courtyard",
      },
    ],

    facilities: [
      { title: "World-Class 5-Star Luxury", desc: "Alila Hotels & Resorts — one of Asia's finest luxury hotel brands" },
      { title: "59 Bespoke Heritage Suites", desc: "Ultra-luxury suites blending 230-year heritage with modern comforts" },
      { title: "Private Dining on Ramparts", desc: "Exclusive candlelit dinner setups on the ancient fort ramparts" },
      { title: "Helicopter Arrival Helipad", desc: "Dedicated helipad for dramatic aerial wedding arrivals" },
      { title: "Outdoor Infinity Pool", desc: "Dramatic infinity pool overlooking the entire Aravalli range" },
      { title: "Alila Spa & Wellness", desc: "Award-winning Alila Living Spa for bridal pampering" },
    ],

    about:
      "Alila Fort Bishangarh is a breathtaking 230-year-old hilltop fort reimagined as a world-class luxury resort by Alila Hotels. Perched dramatically above the Rajasthan landscape near Jaipur, it offers intimate destination weddings of unparalleled elegance — with rampart terraces, stone courtyards, infinity pools, and 59 bespoke heritage suites ensuring every celebration is legendary.",

    contactPhone: "+91 96498 77889",
    contactWhatsapp: "+919649877889",
    contactEmail: "weddings@alilafortbishangarh.shubhvivah.com",
  },

  {
    id: "jaisalmer-fort-wedding",
    slug: "jaisalmer-fort-wedding",
    name: "Jaisalmer Fort Palace",
    tagline: "The Golden Fort — UNESCO Heritage Desert Wedding Venue of Rajasthan",
    city: "Jaisalmer",
    state: "Rajasthan",
    location: "Jaisalmer, Rajasthan",
    address: "Fort Palace Road, Inside Jaisalmer Fort, Jaisalmer, Rajasthan 345001",
    venueType: "Heritage Fort / Desert Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 4.9,
    reviewsCount: 188,
    badge: "UNESCO World Heritage Venue",
    verified: true,
    since: "2008",

    startingPrice: "₹6,00,000",
    startingPriceNumeric: 600000,
    priceRange: "₹6,00,000 - ₹14,00,000 / event",
    pricePerPlateVeg: "₹3,200",
    pricePerPlateNonVeg: "₹4,000",
    rentalCharge: "₹6,00,000 / day",

    guestCapacity: "200 - 800 Guests",
    minGuests: 200,
    maxGuests: 800,
    seatingCapacity: "400 Seating",
    floatingCapacity: "800 Floating",
    totalArea: "80,000 sq. ft.",
    indoorArea: "12,000 sq. ft. (Darbar Hall & Palace Rooms)",
    lawnArea: "68,000 sq. ft. (Fort Courtyards & Desert Terraces)",
    rooms: "38 Heritage Fort Rooms & Suites",
    toilets: "28 Restrooms",
    parkingCapacity: "200+ Cars with Valet Service",

    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "jfp-1",
        url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
        caption: "Jaisalmer Golden Fort — Sonar Quila at Sunset",
        category: "outdoor",
        tag: "Golden Fort",
      },
      {
        id: "jfp-2",
        url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1400&q=85",
        caption: "Desert Courtyard with Caparisoned Camel Baraat",
        category: "outdoor",
        tag: "Fort Courtyard",
      },
      {
        id: "jfp-3",
        url: "https://images.unsplash.com/photo-1625744536176-ade3b68d3f1d?auto=format&fit=crop&w=1400&q=85",
        caption: "Fort Darbar Hall Mandap with Antique Rajasthani Decor",
        category: "stage",
        tag: "Darbar Mandap",
      },
      {
        id: "jfp-4",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
        caption: "Rooftop Fort Terrace Wedding Under the Desert Stars",
        category: "outdoor",
        tag: "Rooftop Terrace",
      },
    ],

    spaces: [
      {
        name: "Sonar Mahal Darbar",
        type: "Indoor Heritage Hall",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "10,000 sq. ft.",
        description: "Magnificent Darbar hall with intricate golden sandstone carvings and original 12th-century jharokha windows.",
        badge: "Darbar Hall",
      },
      {
        name: "Desert Rooftop Terrace",
        type: "Open-Air Fort Terrace",
        seating: "300 Seating",
        floating: "700 Floating",
        area: "22,000 sq. ft.",
        description: "Dramatic rooftop terrace offering 360° views of the Thar Desert — an unforgettable star-lit wedding reception venue.",
        badge: "Desert Rooftop",
      },
    ],

    facilities: [
      { title: "UNESCO World Heritage Site", desc: "Marry inside India's only living UNESCO-listed desert fort" },
      { title: "900-Year-Old Golden Fort", desc: "Iconic Sonar Quila — the Golden Fort of the Thar Desert" },
      { title: "Camel & Horse Royal Baraat", desc: "Authentic desert baraat with camel caravan & dhol procession" },
      { title: "Star-Lit Desert Pheras", desc: "Midnight desert ceremony under India's clearest night skies" },
      { title: "Rajasthani Folk Artists", desc: "Kalbeliya, Manganiyar & Langa folk musicians for ceremonies" },
      { title: "Desert Safari Experience", desc: "Sand dune sunset experience for destination wedding guests" },
    ],

    about:
      "The Jaisalmer Fort Palace, known as 'Sonar Quila' (The Golden Fort), is a UNESCO World Heritage Site and India's only living desert fort. Rising 76 metres above the golden sands of the Thar, this 12th-century sandstone marvel offers an otherworldly setting for destination weddings — with star-lit desert terraces, intricately carved Darbar halls, and authentic Rajasthani royal ceremonies.",

    contactPhone: "+91 94141 44556",
    contactWhatsapp: "+919414144556",
    contactEmail: "weddings@jaisalmerfort.shubhvivah.com",
  },

  {
    id: "mehrangarh-fort-jodhpur",
    slug: "mehrangarh-fort-jodhpur",
    name: "Mehrangarh Fort",
    tagline: "The Majestic Blue City Fort — Grandest Royal Wedding Venue in Jodhpur",
    city: "Jodhpur",
    state: "Rajasthan",
    location: "Jodhpur, Rajasthan",
    address: "Mehrangarh Fort Road, Fort Complex, Jodhpur, Rajasthan 342001",
    venueType: "Heritage Fort / Royal Palace Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 5.0,
    reviewsCount: 342,
    badge: "India's Grandest Fort Wedding",
    verified: true,
    since: "2002",

    startingPrice: "₹12,00,000",
    startingPriceNumeric: 1200000,
    priceRange: "₹12,00,000 - ₹30,00,000 / event",
    pricePerPlateVeg: "₹4,800",
    pricePerPlateNonVeg: "₹5,800",
    rentalCharge: "₹12,00,000 / day",

    guestCapacity: "300 - 1,500 Guests",
    minGuests: 300,
    maxGuests: 1500,
    seatingCapacity: "800 Seating",
    floatingCapacity: "1,500 Floating",
    totalArea: "2,00,000 sq. ft.",
    indoorArea: "30,000 sq. ft. (Zenana Deodhi & Daulat Khana Halls)",
    lawnArea: "1,70,000 sq. ft. (Fort Courtyards & Chowks)",
    rooms: "Exclusive Event Buyout Available",
    toilets: "50 Luxury Restrooms",
    parkingCapacity: "500+ Cars with Valet Service",

    coverImage:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "mf-1",
        url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1400&q=85",
        caption: "Mehrangarh Fort — The Mighty Blue City Fortress at Dawn",
        category: "outdoor",
        tag: "Fort Exterior",
      },
      {
        id: "mf-2",
        url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
        caption: "Sheesh Mahal Palace Hall with Intricate Mirror Work",
        category: "indoor",
        tag: "Palace Hall",
      },
      {
        id: "mf-3",
        url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=85",
        caption: "Grand Fort Courtyard Decorated for a Royal Wedding",
        category: "outdoor",
        tag: "Fort Courtyard",
      },
      {
        id: "mf-4",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Mandap Under Fort Ramparts with Blue City Backdrop",
        category: "stage",
        tag: "Wedding Mandap",
      },
      {
        id: "mf-5",
        url: "https://images.unsplash.com/photo-1609948543911-a9e68d2c8dce?auto=format&fit=crop&w=1400&q=85",
        caption: "Panoramic Blue City View from the Fort Battlements",
        category: "outdoor",
        tag: "Blue City View",
      },
    ],

    spaces: [
      {
        name: "Zenana Deodhi Chowk",
        type: "Grand Fort Courtyard",
        seating: "600 Seating",
        floating: "1,200 Floating",
        area: "40,000 sq. ft.",
        description: "The majestic zenana courtyard — the most photographed wedding venue in Rajasthan — framed by 500-year-old sandstone carvings.",
        badge: "Grand Chowk",
      },
      {
        name: "Daulat Khana Palace",
        type: "Indoor Royal Chamber",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "15,000 sq. ft.",
        description: "Historic throne room and reception chamber featuring priceless Mughal-era artefacts and embossed silver doors.",
        badge: "Royal Chamber",
      },
    ],

    facilities: [
      { title: "560-Year-Old Living Heritage Fort", desc: "One of India's largest & most intact medieval forts" },
      { title: "UNESCO-Nominated Heritage Site", desc: "Protecting centuries of Rathore Rajput dynastic legacy" },
      { title: "Blue City Panoramic Views", desc: "Sweeping views of Jodhpur's iconic blue cityscape at every turn" },
      { title: "Full Exclusive Fort Buyout", desc: "Entire fort grounds available for exclusive wedding buyout" },
      { title: "Museum Integration", desc: "Guided royal museum experience for destination wedding guests" },
      { title: "Star-Lit Fort Rampart Dining", desc: "Exclusive dinner on ancient ramparts with city light views" },
    ],

    about:
      "Mehrangarh Fort in Jodhpur, rising 122 metres above the Blue City, is arguably India's most awe-inspiring royal wedding venue. This 560-year-old Rathore dynasty fortress features vast sandstone courtyards, elaborately carved palaces, and unmatched panoramic views of the cobalt-blue cityscape below — creating the ultimate backdrop for legendary weddings.",

    contactPhone: "+91 94142 55667",
    contactWhatsapp: "+919414255667",
    contactEmail: "weddings@mehrangarh.shubhvivah.com",
  },

  {
    id: "kumbhalgarh-fort-rajasthan",
    slug: "kumbhalgarh-fort-rajasthan",
    name: "Kumbhalgarh Fort",
    tagline: "The Great Wall of India — UNESCO Heritage Fort Wedding in the Aravalli Highlands",
    city: "Kumbhalgarh",
    state: "Rajasthan",
    location: "Kumbhalgarh, Rajasthan",
    address: "Kumbhalgarh Fort, Rajsamand District, Rajasthan 313325",
    venueType: "Heritage Fort / Mountain Wedding Venue",
    primaryType: "Heritage Fort",
    category: "Heritage Palaces & Forts",
    rating: 4.9,
    reviewsCount: 156,
    badge: "The Great Wall Fort Wedding",
    verified: true,
    since: "2010",

    startingPrice: "₹9,00,000",
    startingPriceNumeric: 900000,
    priceRange: "₹9,00,000 - ₹20,00,000 / event",
    pricePerPlateVeg: "₹4,000",
    pricePerPlateNonVeg: "₹4,800",
    rentalCharge: "₹9,00,000 / day",

    guestCapacity: "200 - 1,000 Guests",
    minGuests: 200,
    maxGuests: 1000,
    seatingCapacity: "500 Seating",
    floatingCapacity: "1,000 Floating",
    totalArea: "1,50,000 sq. ft.",
    indoorArea: "15,000 sq. ft. (Badal Mahal & Palace Chambers)",
    lawnArea: "1,35,000 sq. ft. (Fort Grounds & Rampart Terraces)",
    rooms: "Exclusive Heritage Resort Nearby",
    toilets: "36 Luxury Restrooms",
    parkingCapacity: "300+ Cars with Valet Service",

    coverImage:
      "https://images.unsplash.com/photo-1609948543911-a9e68d2c8dce?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "kf-1",
        url: "https://images.unsplash.com/photo-1609948543911-a9e68d2c8dce?auto=format&fit=crop&w=1400&q=85",
        caption: "Kumbhalgarh Fort — The Great Wall Ramparts at Golden Hour",
        category: "outdoor",
        tag: "Fort Ramparts",
      },
      {
        id: "kf-2",
        url: "https://images.unsplash.com/photo-1625744536176-ade3b68d3f1d?auto=format&fit=crop&w=1400&q=85",
        caption: "Majestic Fort Gateway & Barbican Entrance",
        category: "outdoor",
        tag: "Fort Gateway",
      },
      {
        id: "kf-3",
        url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1400&q=85",
        caption: "Badal Mahal — Cloud Palace with Forest & Valley Views",
        category: "indoor",
        tag: "Badal Mahal",
      },
      {
        id: "kf-4",
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85",
        caption: "Mandap Ceremony Setup with Ancient Fort Walls as Backdrop",
        category: "stage",
        tag: "Wedding Ceremony",
      },
      {
        id: "kf-5",
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
        caption: "Evening Dinner Reception on the Fort Rampart Walk",
        category: "outdoor",
        tag: "Rampart Dining",
      },
    ],

    spaces: [
      {
        name: "Badal Mahal — Cloud Palace",
        type: "Indoor Heritage Palace",
        seating: "200 Seating",
        floating: "400 Floating",
        area: "8,000 sq. ft.",
        description: "The 'Cloud Palace' at the summit offers ethereal forest and valley views — a one-of-a-kind indoor wedding space.",
        badge: "Cloud Palace",
      },
      {
        name: "Fort Rampart Grounds",
        type: "Open-Air Fort Courtyard",
        seating: "500 Seating",
        floating: "1,000 Floating",
        area: "50,000 sq. ft.",
        description: "Dramatic event grounds along the 36 km rampart walls — the world's second longest wall — with misty mountain views.",
        badge: "Rampart Grounds",
      },
    ],

    facilities: [
      { title: "UNESCO World Heritage Fort", desc: "560-year-old Kumbha dynasty fort with the world's 2nd longest wall" },
      { title: "Badal Mahal — Cloud Palace", desc: "Iconic two-storied palace perched at the highest point of the fort" },
      { title: "36km Great Wall of Rajasthan", desc: "Iconic ancient rampart — India's answer to the Great Wall of China" },
      { title: "Mountain & Forest Ambiance", desc: "Set amid the wildlife sanctuary — a unique nature-immersive venue" },
      { title: "Rajasthan Forest Safaris", desc: "Exclusive wildlife sanctuary jeep safaris for wedding guests" },
      { title: "Sunset Ceremony at the Summit", desc: "Golden hour phera ceremonies at the 1,914m summit Badal Mahal" },
    ],

    about:
      "Kumbhalgarh Fort, a UNESCO World Heritage Site in the Aravalli highlands of Rajasthan, houses the world's second-longest wall (36 km) and India's most dramatically situated wedding venue. Its summit Badal Mahal ('Cloud Palace') offers ethereal misty mountain views, while its vast fort grounds and ramparts provide an epic canvas for destination weddings of extraordinary grandeur.",

    contactPhone: "+91 94141 66778",
    contactWhatsapp: "+919414166778",
    contactEmail: "weddings@kumbhalgarh.shubhvivah.com",
  },

  {
    id: "umaid-bhawan-palace-resort",
    slug: "umaid-bhawan-palace-resort",
    name: "Taj Umaid Bhawan Palace Resort",
    tagline: "Iconic Art Deco Golden Sandstone Palace & Luxury Wedding Resort",
    city: "Jodhpur",
    state: "Rajasthan",
    location: "Jodhpur, Rajasthan",
    address: "Circuit House Road, Cantt Area, Jodhpur, Rajasthan 342006",
    venueType: "Heritage Palace Resort / Luxury Destination Wedding",
    primaryType: "Heritage Resort",
    category: "Heritage Palaces & Forts",
    rating: 5.0,
    reviewsCount: 246,
    badge: "World Best Palace Resort",
    verified: true,
    since: "1943",

    // Pricing
    startingPrice: "₹20,00,000",
    startingPriceNumeric: 2000000,
    priceRange: "₹20,00,000 - ₹50,00,000 / event",
    pricePerPlateVeg: "₹5,500",
    pricePerPlateNonVeg: "₹7,000",
    rentalCharge: "₹20,00,000 / day",

    // Capacity & Specifications
    guestCapacity: "300 - 1,500 Guests",
    minGuests: 300,
    maxGuests: 1500,
    seatingCapacity: "750 Seating",
    floatingCapacity: "1,500 Floating",
    totalArea: "26 Acres (Private Royal Palace Gardens)",
    indoorArea: "18,000 sq. ft. (Marwar Hall & Art Deco Ballroom)",
    lawnArea: "80,000 sq. ft. (Baradari Royal Lawns)",
    rooms: "70 Opulent Heritage Palace Suites",
    toilets: "45 Royal Washrooms",
    parkingCapacity: "300+ Cars with Royal Valet",

    // Unique Cover Image: Golden sandstone palace resort with landscaped royal lawns
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",

    gallery: [
      {
        id: "ub-1",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
        caption: "Taj Umaid Bhawan Palace Golden Facade & Baradari Lawns",
        category: "outdoor",
        tag: "Heritage Palace Resort",
      },
      {
        id: "ub-2",
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
        caption: "Royal Marwar Banquet Ballroom with Crystal Chandeliers",
        category: "indoor",
        tag: "Indoor Palace Ballroom",
      },
      {
        id: "ub-3",
        url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1400&q=85",
        caption: "Grand Royal Wedding Mandap Under Illuminated Palace Cupola",
        category: "stage",
        tag: "Stage & Mandap Decor",
      },
    ],

    spaces: [
      {
        name: "Baradari Royal Lawns",
        type: "Landscaped Heritage Garden",
        seating: "750 Seating",
        floating: "1,500 Floating",
        area: "80,000 sq. ft.",
        description: "Manicured gardens facing the majestic Chittar sandstone dome, perfect for high-profile varmala & reception galas.",
        badge: "Royal Lawn",
      },
      {
        name: "Marwar Hall & Rathore Ballroom",
        type: "Art Deco Palace Ballroom",
        seating: "300 Seating",
        floating: "600 Floating",
        area: "18,000 sq. ft.",
        description: "Air-conditioned palace ballroom showcasing authentic European crystal chandeliers and Burma teak woodwork.",
        badge: "Art Deco Ballroom",
      },
    ],

    facilities: [
      { title: "26 Acres Royal Palace Grounds", desc: "Immense private palace estate with peacocks and fountains" },
      { title: "70 Taj Heritage Suites", desc: "World-class royal hospitality suites for wedding family and VIP guests" },
      { title: "Royal Baarat Elephant Procession", desc: "Private royal entrance path for regal elephants, horses, and bagpipers" },
      { title: "Michelin-Standard Royal Chefs", desc: "Bespoke royal Marwari feasts, Rajasthani royal dining, and global cuisines" },
      { title: "Subterranean Zodiac Pool", desc: "Heated indoor pool adorned with gold leaf zodiac mosaic tiles" },
      { title: "Helipad Facility", desc: "Private certified on-site helipad for VIP arrival and departures" },
    ],

    about:
      "Perched high above the desert city of Jodhpur, Taj Umaid Bhawan Palace Resort is one of the world's largest private residences and an unmatched dream venue for royal destination weddings. Built of golden-yellow sandstone and set across 26 acres of lush gardens, it combines majestic Rajputana heritage with legendary Taj hospitality.",

    contactPhone: "+91 291 251 0101",
    contactWhatsapp: "+912912510101",
    contactEmail: "weddings.umaidbhawan@shubhvivah.com",
  },
];

// Helper to look up a venue by slug or ID (with fallback to first venue)
export function getVenueBySlug(slug) {
  if (!slug) return ALL_VENUES[0];
  const found = ALL_VENUES.find(
    (v) =>
      v.slug === slug ||
      v.id === slug ||
      (slug === "the-grand-regal-palace-resort" && v.slug === "royal-heritage-wedding-venue")
  );
  return found || ALL_VENUES[0];
}

// Backward-compatible export
export const FEATURED_VENUE = ALL_VENUES[0];

export const VENUE_CATEGORIES = [
  "All Venues",
  "Banquet Halls",
  "Wedding Resorts",
  "Marriage Gardens",
  "Heritage Palaces & Forts",
];

export const VENUE_CITIES = [
  "All Cities",
  "Delhi NCR",
  "Mumbai",
  "Jaipur",
  "Lucknow",
  "Noida",
  "Udaipur",
  "Moradabad",
  "Neemrana",
  "Bishangarh",
  "Jaisalmer",
  "Jodhpur",
  "Kumbhalgarh",
];
