"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Store,
  ShoppingBag,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  User,
  Building,
  Camera,
  Upload,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Tag,
  Calendar,
  MapPin,
  Mail,
  Phone,
  FileText,
  Clock,
  CheckSquare,
  Square,
  Package,
  Layers,
  Globe,
  Trash2,
} from "lucide-react";

// Indian States and Cities List
const INDIAN_STATES_CITIES = {
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Kota", "Bikaner"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Goa Borders"],
  Delhi: ["New Delhi", "South Delhi", "Central Delhi", "West Delhi", "North Delhi", "Dwarka"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  "Uttar Pradesh": ["Lucknow", "Varanasi", "Agra", "Noida", "Greater Noida", "Kanpur", "Prayagraj"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  Punjab: ["Amritsar", "Ludhiana", "Chandigarh", "Jalandhar", "Patiala"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Calangute"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
  "West Bengal": ["Kolkata", "Siliguri", "Howrah", "Durgapur", "Darjeeling"],
};

const WEDDING_FUNCTIONS = [
  "Engagement",
  "Haldi",
  "Mehndi",
  "Sangeet",
  "Wedding Ceremony",
  "Reception",
  "Cocktail Party",
  "Other",
];

const WEDDING_SERVICES_OPTIONS = [
  "Wedding Venue",
  "Photography",
  "Videography",
  "Makeup Artist",
  "Wedding Planner",
  "Decoration",
  "Catering",
  "Mehndi Artist",
  "Bridal Wear",
  "Groom Wear",
  "Jewellery",
  "Invitations",
  "DJ & Entertainment",
  "Choreography",
  "Florist",
  "Transportation",
  "Wedding Cake",
  "Other",
];

const SELLER_CATEGORIES = [
  "Bridal Lehengas",
  "Wedding Sarees",
  "Groom Sherwanis",
  "Bridal Jewellery",
  "Wedding Accessories",
  "Footwear",
  "Wedding Invitations",
  "Wedding Gifts",
  "Return Gifts",
  "Wedding Decorations",
  "Wedding Cosmetics",
  "Customized Products",
  "Other",
];

const VENDOR_CATEGORIES = [
  "Wedding Photographer",
  "Wedding Videographer",
  "Pre-Wedding Photographer",
  "Makeup Artist",
  "Bridal Makeup Artist",
  "Groom Styling",
  "Mehndi Artist",
  "Wedding Planner",
  "Event Management",
  "Wedding Decorator",
  "Wedding Venue / Banquet Hall",
  "Caterer",
  "Wedding Cake Designer",
  "Florist",
  "DJ & Entertainment",
  "Wedding Choreographer",
  "Bridal Wear Designer",
  "Groom Wear Designer",
  "Jewellery Designer",
  "Invitation Designer",
  "Transportation",
  "Pandit / Wedding Priest",
  "Bridal Salon",
  "Other",
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Multi-step: 1 = Role, 2 = Account, 3 = Personal/Business/Wedding, 4 = Products/Services/Reqs, 5 = Location & Documents, 6 = Review
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(searchParams.get("role") || null);

  // Common UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadingField, setUploadingField] = useState(null);

  // -------------------------------------------------------------
  // Role: COUPLE State
  // -------------------------------------------------------------
  const [coupleData, setCoupleData] = useState({
    // Step 2: Account Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",

    // Step 3: Wedding Details
    userRole: "Bride", // Bride / Groom / Parent / Family Member / Other
    brideName: "",
    groomName: "",
    weddingDate: "",
    dateNotFinalized: false,
    isDateFlexible: "No", // Yes / No / Not Decided
    weddingLocation: "",
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    guestCount: "300 - 500 Guests",
    weddingBudget: "₹15 Lakhs - ₹30 Lakhs",
    weddingFunctions: ["Haldi", "Mehndi", "Sangeet", "Wedding Ceremony", "Reception"],

    // Step 4: Services Required & Preferences
    servicesRequired: ["Wedding Venue", "Photography", "Makeup Artist", "Decoration", "Catering"],
    preferredVendorCity: "Jaipur",
    estimatedBudgetPerService: "₹50,000 - ₹2,00,000 per vendor category",
    preferredContactMethod: "WhatsApp", // Call / WhatsApp / Email
    additionalRequirements: "Looking for royal traditional setup with bespoke candid photography.",

    // Step 5: Address
    fullAddress: "",
    pincode: "",

    termsAccepted: false,
  });

  // -------------------------------------------------------------
  // Role: SELLER State
  // -------------------------------------------------------------
  const [sellerData, setSellerData] = useState({
    // Step 2: Account Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternateContact: "",
    password: "",
    confirmPassword: "",

    // Step 3: Business Details
    businessName: "",
    sellerType: "Individual", // Individual / Proprietorship / Partnership / LLP / Private Limited / Other
    businessCategory: "Bridal Lehengas",
    businessDescription: "Designer bridal wear couture and handcrafted heritage wedding ensembles.",
    yearOfEstablishment: "2018",
    gstNumber: "",
    panNumber: "",
    websiteUrl: "",
    instagramUrl: "",
    facebookUrl: "",

    // Step 4: Product Categories & Initial Product
    productCategories: ["Bridal Lehengas", "Wedding Sarees", "Customized Products"],
    productName: "Heritage Zardozi Royal Velvet Bridal Lehenga",
    productCategory: "Bridal Lehengas",
    productDescription: "Hand-embroidered pure velvet bridal lehenga with dual dupattas and antique gold work.",
    productPrice: "85000",
    discountPrice: "72000",
    stockAvailability: "5 in stock",
    productVariants: "Small, Medium, Large, Custom Stitching",
    customizationAvailable: true,
    madeToOrder: true,
    deliveryAvailable: true,
    deliveryLocations: "Pan India & Worldwide Express Shipping",
    returnPolicy: "7 Days exchange for size alterations or defect",
    productImages: [],

    // Step 5: Business Address & Verification
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    fullAddress: "Plot 42, Johari Bazar, Heritage Craft Complex",
    pincode: "302003",
    storeAddress: "Store #12, First Floor, Johari Bazar, Jaipur",
    businessLogoUrl: "",
    idProofUrl: "",
    businessProofUrl: "",
    gstCertificateUrl: "",

    termsAccepted: false,
  });

  // -------------------------------------------------------------
  // Role: VENDOR State
  // -------------------------------------------------------------
  const [vendorData, setVendorData] = useState({
    // Step 2: Account Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternateContact: "",
    password: "",
    confirmPassword: "",

    // Step 3: Professional / Business Details
    businessName: "",
    vendorType: "Individual", // Individual / Freelancer / Company / Agency
    vendorCategory: "Wedding Photographer",
    vendorCategories: ["Wedding Photographer", "Wedding Videographer", "Pre-Wedding Photographer"],
    businessDescription: "Capturing timeless love stories and royal celebrations with candid artistry across India.",
    experienceYears: "6",
    yearOfEstablishment: "2018",
    teamSize: "4 - 8 professionals",
    gstNumber: "",
    panNumber: "",
    websiteUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    youtubeUrl: "",

    // Step 4: Services & Pricing
    serviceName: "Royal Candid & Cinematic Wedding Film Package",
    serviceDescription: "Comprehensive wedding coverage including pre-wedding teaser, drone shots, traditional rituals and candid moments.",
    servicesOffered: "Full Wedding Day Shoot, Cinematic Video, Candid Photography, Drone Film, Album",
    startingPrice: "65000",
    maxPrice: "250000",
    pricingType: "Per Event", // Per Event / Per Day / Per Person / Per Hour / Custom
    packagesAvailable: true,
    packageName: "Royal Gold Complete Coverage",
    packageDescription: "2 Days (Haldi, Sangeet, Wedding & Reception) with 2 Candid + 2 Traditional + 1 Drone operator.",
    packagePrice: "180000",
    packageInclusions: "Printed Luxury Album (40 sheets), 5-min 4K Cinematic Teaser, Full 45-min Film, Raw footage on hard disk.",
    customizationAvailable: true,
    advanceBookingAmount: "25% at booking confirmation",
    cancellationPolicy: "Full refund if cancelled 45+ days prior; 50% refund if cancelled 20+ days prior.",

    // Step 5: Location, Availability & Portfolio
    country: "India",
    state: "Rajasthan",
    city: "Jaipur",
    businessAddress: "404, Crystal Court, Malviya Nagar",
    pincode: "302017",
    serviceAreas: "Jaipur, Udaipur, Delhi NCR, Goa, Mumbai & Destination Weddings Worldwide",
    destinationWeddingServices: "Yes",
    outstationWeddingAvailability: "Yes",
    travelCharges: "Client provides flights/transport and stay arrangements",
    bookingAvailability: "Open for 2026-2027 Wedding Season",
    advanceBookingRequired: "Yes (Minimum 30 days recommended)",
    vendorEventDate: "", // Event / Booking availability date

    // Portfolio & Verification
    businessLogoUrl: "",
    portfolioImages: [],
    previousWorkUrl: "https://vimeo.com/example-wedding-film",
    portfolioWebsiteUrl: "",
    idProofUrl: "",
    businessProofUrl: "",
    gstCertificateUrl: "",
    addressProofUrl: "",

    termsAccepted: false,
  });

  // State / City Helper
  const currentStates = Object.keys(INDIAN_STATES_CITIES);

  // File Upload Helper
  const handleFileUpload = async (file, fieldKey, targetRole) => {
    if (!file) return;
    setUploadingField(fieldKey);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "File upload failed. Ensure the image is under 8MB.");
      }

      const fileUrl = data.url;

      if (targetRole === "couple") {
        setCoupleData((prev) => ({ ...prev, [fieldKey]: fileUrl }));
      } else if (targetRole === "seller") {
        if (fieldKey === "productImages") {
          setSellerData((prev) => ({
            ...prev,
            productImages: [...prev.productImages, fileUrl],
          }));
        } else {
          setSellerData((prev) => ({ ...prev, [fieldKey]: fileUrl }));
        }
      } else if (targetRole === "vendor") {
        if (fieldKey === "portfolioImages") {
          setVendorData((prev) => ({
            ...prev,
            portfolioImages: [...prev.portfolioImages, fileUrl],
          }));
        } else {
          setVendorData((prev) => ({ ...prev, [fieldKey]: fileUrl }));
        }
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to upload file.");
    } finally {
      setUploadingField(null);
    }
  };

  // Step Validation
  const validateStep = (stepNumber) => {
    setErrorMsg("");

    if (stepNumber === 1) {
      if (!selectedRole) {
        setErrorMsg("Please select an account type (Couple, Seller, or Vendor) to continue.");
        return false;
      }
      return true;
    }

    if (stepNumber === 2) {
      if (selectedRole === "couple") {
        if (!coupleData.groomName.trim()) {
          setErrorMsg("Groom's Name is required.");
          return false;
        }
        if (!coupleData.brideName.trim()) {
          setErrorMsg("Bride's Name is required.");
          return false;
        }
      } else {
        const data = selectedRole === "seller" ? sellerData : vendorData;
        if (!data.firstName.trim()) {
          setErrorMsg("First name is required.");
          return false;
        }
        if (!data.lastName.trim()) {
          setErrorMsg("Last name is required.");
          return false;
        }
      }

      const data = selectedRole === "couple" ? coupleData : selectedRole === "seller" ? sellerData : vendorData;
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
      const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");
      if (cleanPhone.length < 10) {
        setErrorMsg("Please enter a valid 10-digit mobile number.");
        return false;
      }
      if (!data.password || data.password.length < 8) {
        setErrorMsg("Password must contain at least 8 characters.");
        return false;
      }
      if (data.password !== data.confirmPassword) {
        setErrorMsg("Password and Confirm Password do not match.");
        return false;
      }
      return true;
    }

    if (stepNumber === 3) {
      if (selectedRole === "couple") {
        if (!coupleData.brideName.trim() && !coupleData.groomName.trim()) {
          setErrorMsg("Please enter at least Bride's or Groom's Name.");
          return false;
        }
        // Wedding Date check (mandatory unless "dateNotFinalized" is checked)
        if (!coupleData.dateNotFinalized && !coupleData.weddingDate) {
          setErrorMsg("Please select your Wedding Date / Event Date, or check 'My wedding/event date is not finalized yet'.");
          return false;
        }
      } else if (selectedRole === "seller") {
        if (!sellerData.businessName.trim()) {
          setErrorMsg("Business / Brand Name is required.");
          return false;
        }
        if (!sellerData.businessCategory.trim()) {
          setErrorMsg("Business Category is required.");
          return false;
        }
        if (!sellerData.businessDescription.trim()) {
          setErrorMsg("Business Description is required.");
          return false;
        }
      } else if (selectedRole === "vendor") {
        if (!vendorData.businessName.trim()) {
          setErrorMsg("Business / Brand Name is required.");
          return false;
        }
        if (!vendorData.vendorCategory.trim()) {
          setErrorMsg("Primary Vendor Category is required.");
          return false;
        }
        if (!vendorData.businessDescription.trim()) {
          setErrorMsg("Business Description is required.");
          return false;
        }
      }
      return true;
    }

    if (stepNumber === 4) {
      if (selectedRole === "couple") {
        if (!coupleData.servicesRequired || coupleData.servicesRequired.length === 0) {
          setErrorMsg("Please select at least one wedding service you require.");
          return false;
        }
      } else if (selectedRole === "seller") {
        if (!sellerData.productName.trim()) {
          setErrorMsg("Initial product name is required.");
          return false;
        }
      } else if (selectedRole === "vendor") {
        if (!vendorData.serviceName.trim() && !vendorData.servicesOffered.trim()) {
          setErrorMsg("Service Name / Services Offered is required.");
          return false;
        }
        if (!vendorData.startingPrice.toString().trim()) {
          setErrorMsg("Starting price is required.");
          return false;
        }
      }
      return true;
    }

    if (stepNumber === 5) {
      if (selectedRole === "couple") {
        if (!coupleData.city.trim() || !coupleData.state.trim()) {
          setErrorMsg("Please select your State and City.");
          return false;
        }
      } else if (selectedRole === "seller") {
        if (!sellerData.fullAddress.trim() || !sellerData.pincode.trim()) {
          setErrorMsg("Business address and PIN Code are required.");
          return false;
        }
      } else if (selectedRole === "vendor") {
        if (!vendorData.businessAddress.trim() || !vendorData.pincode.trim()) {
          setErrorMsg("Business address and PIN Code are required.");
          return false;
        }
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const termsAccepted =
      selectedRole === "couple"
        ? coupleData.termsAccepted
        : selectedRole === "seller"
        ? sellerData.termsAccepted
        : vendorData.termsAccepted;

    if (!termsAccepted) {
      setErrorMsg("Please accept the Terms & Conditions and Privacy Policy to complete registration.");
      return;
    }

    setLoading(true);

    try {
      let payload = {
        user_type: selectedRole,
        terms_accepted: true,
      };

      if (selectedRole === "couple") {
        payload = {
          ...payload,
          firstName: coupleData.firstName.trim(),
          lastName: coupleData.lastName.trim(),
          email: coupleData.email.trim(),
          phone: coupleData.phone.trim(),
          alternatePhone: coupleData.alternatePhone.trim(),
          password: coupleData.password,
          avatar_url: coupleData.avatarUrl,
          userRole: coupleData.userRole,
          brideName: coupleData.brideName.trim(),
          groomName: coupleData.groomName.trim(),
          weddingDate: coupleData.weddingDate,
          dateNotFinalized: coupleData.dateNotFinalized,
          isDateFlexible: coupleData.isDateFlexible,
          weddingLocation: coupleData.weddingLocation,
          guestCount: coupleData.guestCount,
          weddingBudget: coupleData.weddingBudget,
          weddingFunctions: coupleData.weddingFunctions,
          servicesRequired: coupleData.servicesRequired,
          preferredVendorCity: coupleData.preferredVendorCity,
          estimatedBudgetPerService: coupleData.estimatedBudgetPerService,
          preferredContactMethod: coupleData.preferredContactMethod,
          additionalRequirements: coupleData.additionalRequirements,
          country: coupleData.country,
          state: coupleData.state,
          city: coupleData.city,
          fullAddress: coupleData.fullAddress,
          pincode: coupleData.pincode,
        };
      } else if (selectedRole === "seller") {
        payload = {
          ...payload,
          firstName: sellerData.firstName.trim(),
          lastName: sellerData.lastName.trim(),
          email: sellerData.email.trim(),
          phone: sellerData.phone.trim(),
          alternatePhone: sellerData.alternateContact.trim(),
          password: sellerData.password,
          businessName: sellerData.businessName.trim(),
          sellerType: sellerData.sellerType,
          businessCategory: sellerData.businessCategory,
          businessDescription: sellerData.businessDescription,
          yearOfEstablishment: sellerData.yearOfEstablishment,
          gstNumber: sellerData.gstNumber,
          panNumber: sellerData.panNumber,
          websiteUrl: sellerData.websiteUrl,
          instagramUrl: sellerData.instagramUrl,
          facebookUrl: sellerData.facebookUrl,
          productCategories: sellerData.productCategories,
          country: sellerData.country,
          state: sellerData.state,
          city: sellerData.city,
          fullAddress: sellerData.fullAddress,
          pincode: sellerData.pincode,
          storeAddress: sellerData.storeAddress,
          businessLogoUrl: sellerData.businessLogoUrl,
          idProofUrl: sellerData.idProofUrl,
          businessProofUrl: sellerData.businessProofUrl,
          gstCertificateUrl: sellerData.gstCertificateUrl,
          initialProduct: {
            name: sellerData.productName,
            category: sellerData.productCategory,
            description: sellerData.productDescription,
            price: Number(sellerData.productPrice) || 0,
            discountPrice: Number(sellerData.discountPrice) || 0,
            stock: 10,
            variants: sellerData.productVariants,
            customizationAvailable: sellerData.customizationAvailable,
            madeToOrder: sellerData.madeToOrder,
            deliveryAvailable: sellerData.deliveryAvailable,
            deliveryLocations: sellerData.deliveryLocations,
            returnPolicy: sellerData.returnPolicy,
            images: sellerData.productImages,
          },
        };
      } else if (selectedRole === "vendor") {
        payload = {
          ...payload,
          firstName: vendorData.firstName.trim(),
          lastName: vendorData.lastName.trim(),
          email: vendorData.email.trim(),
          phone: vendorData.phone.trim(),
          alternatePhone: vendorData.alternateContact.trim(),
          password: vendorData.password,
          businessName: vendorData.businessName.trim(),
          vendorType: vendorData.vendorType,
          vendorCategory: vendorData.vendorCategory,
          vendorCategories: vendorData.vendorCategories,
          businessDescription: vendorData.businessDescription,
          experienceYears: vendorData.experienceYears,
          yearOfEstablishment: vendorData.yearOfEstablishment,
          teamSize: vendorData.teamSize,
          gstNumber: vendorData.gstNumber,
          panNumber: vendorData.panNumber,
          websiteUrl: vendorData.websiteUrl,
          instagramUrl: vendorData.instagramUrl,
          facebookUrl: vendorData.facebookUrl,
          youtubeUrl: vendorData.youtubeUrl,
          serviceName: vendorData.serviceName,
          serviceDescription: vendorData.serviceDescription,
          servicesOffered: vendorData.servicesOffered,
          startingPrice: vendorData.startingPrice,
          maxPrice: vendorData.maxPrice,
          pricingType: vendorData.pricingType,
          packagesAvailable: vendorData.packagesAvailable,
          initialPackage: {
            name: vendorData.packageName,
            description: vendorData.packageDescription,
            price: vendorData.packagePrice,
            inclusions: vendorData.packageInclusions,
          },
          customizationAvailable: vendorData.customizationAvailable,
          advanceBookingAmount: vendorData.advanceBookingAmount,
          cancellationPolicy: vendorData.cancellationPolicy,
          country: vendorData.country,
          state: vendorData.state,
          city: vendorData.city,
          businessAddress: vendorData.businessAddress,
          pincode: vendorData.pincode,
          serviceAreas: vendorData.serviceAreas,
          destinationWeddingServices: vendorData.destinationWeddingServices,
          outstationWeddingAvailability: vendorData.outstationWeddingAvailability,
          travelCharges: vendorData.travelCharges,
          bookingAvailability: vendorData.bookingAvailability,
          advanceBookingRequired: vendorData.advanceBookingRequired,
          vendorEventDate: vendorData.vendorEventDate,
          businessLogoUrl: vendorData.businessLogoUrl,
          portfolioImages: vendorData.portfolioImages,
          previousWorkUrl: vendorData.previousWorkUrl,
          portfolioWebsiteUrl: vendorData.portfolioWebsiteUrl,
          idProofUrl: vendorData.idProofUrl,
          businessProofUrl: vendorData.businessProofUrl,
          gstCertificateUrl: vendorData.gstCertificateUrl,
          addressProofUrl: vendorData.addressProofUrl,
        };
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed. Please check your information.");
      }

      setSuccessMsg(
        "Registration Successful! Your ShubhVivah account has been created. Please log in to explore wedding services."
      );

      const targetLoginRoute =
        data.redirectUrl ||
        `/login?type=${encodeURIComponent(selectedRole)}&registered=true&email=${encodeURIComponent(
          (payload.email || "").trim()
        )}`;

      // Redirect to the existing Login route after 2.5 seconds (2–3 seconds)
      setTimeout(() => {
        router.push(targetLoginRoute);
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit registration. Please try again.");
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, title: "Role" },
    { num: 2, title: "Account" },
    { num: 3, title: selectedRole === "couple" ? "Wedding" : "Business" },
    { num: 4, title: selectedRole === "couple" ? "Services" : selectedRole === "seller" ? "Products" : "Pricing" },
    { num: 5, title: "Location" },
    { num: 6, title: "Review" },
  ];

  return (
    <div className="relative min-h-screen bg-[#1F0E1D] text-[#F8F1E5] py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Royal Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#B08D45]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D6B875]/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Top Left Back Navigation (Visible when a role is selected / beyond Step 1) */}
        {currentStep > 1 && (
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#321B30]/80 border border-[#665038] text-xs font-semibold text-[#D6B875] hover:text-[#FFE29A] hover:bg-[#321B30] hover:border-[#D6B875] transition-all shadow-md backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Category Selection</span>
            </button>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#C9BBAF]">
              Selected: <strong className="text-[#FFE29A]">{selectedRole}</strong>
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group mb-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-[#D6B875] group-hover:text-[#FFE29A] transition-colors">
              ShubhVivah
            </span>
            <span className="block text-xs uppercase tracking-[0.3em] text-[#C9BBAF]">
              Royal Wedding Marketplace
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F1E5]">
            {selectedRole
              ? `${selectedRole.toUpperCase()} REGISTRATION`
              : "Begin Your ShubhVivah Journey"}
          </h1>
          <p className="mt-2 text-sm text-[#C9BBAF]">
            Discover, book, or offer elite royal wedding venues, services, and bridal collections.
          </p>
        </div>

        {/* Multi-Step Progress Bar (Visible when in steps 2-6) */}
        {currentStep > 1 && (
          <div className="mb-8 bg-[#321B30]/80 border border-[#665038] rounded-2xl p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#3A2638] -z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#B08D45] to-[#D6B875] transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
              />
              {stepsList.map((step) => {
                const isPassed = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div key={step.num} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      disabled={step.num > currentStep}
                      onClick={() => {
                        if (step.num < currentStep) setCurrentStep(step.num);
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all shadow-md ${
                        isCurrent
                          ? "bg-[#D6B875] text-[#241321] ring-4 ring-[#D6B875]/30 font-bold"
                          : isPassed
                          ? "bg-[#B08D45] text-[#241321]"
                          : "bg-[#241321] border border-[#665038] text-[#C9BBAF]"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : step.num}
                    </button>
                    <span
                      className={`mt-1.5 text-[11px] sm:text-xs font-medium tracking-wide hidden sm:block ${
                        isCurrent ? "text-[#D6B875] font-semibold" : "text-[#C9BBAF]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Global Error & Success Alerts */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <div className="text-sm font-medium">{errorMsg}</div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-200 flex items-start gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
            <div className="text-sm font-medium">{successMsg}</div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 1: USER TYPE SELECTION                               */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 1 of 6
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                Select Your Account Category
              </h2>
              <p className="text-sm text-[#C9BBAF] mt-1">
                Choose the role that fits your goals. You will only see fields relevant to your chosen role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Couple */}
              <div
                onClick={() => setSelectedRole("couple")}
                className={`group cursor-pointer rounded-2xl p-6 transition-all border flex flex-col justify-between ${
                  selectedRole === "couple"
                    ? "bg-[#321B30] border-[#D6B875] shadow-xl ring-2 ring-[#D6B875]/40"
                    : "bg-[#241321] border-[#665038] hover:border-[#D6B875]/70 hover:bg-[#321B30]/60"
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#D6B875]/10 border border-[#D6B875]/30 flex items-center justify-center text-[#D6B875] mb-5 group-hover:scale-105 transition-transform">
                    <Heart className="w-7 h-7 fill-[#D6B875]/20" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F8F1E5] mb-2">
                    Couple / Customer
                  </h3>
                  <p className="text-xs leading-relaxed text-[#C9BBAF]">
                    For people planning a wedding who want to discover and book wedding-related products and services.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#665038]/40">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRole("couple");
                      setCurrentStep(2);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      selectedRole === "couple"
                        ? "bg-[#D6B875] text-[#241321] shadow-md font-bold"
                        : "bg-[#3A2638] text-[#F8F1E5] hover:bg-[#D6B875] hover:text-[#241321]"
                    }`}
                  >
                    Select Couple <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Seller */}
              <div
                onClick={() => setSelectedRole("seller")}
                className={`group cursor-pointer rounded-2xl p-6 transition-all border flex flex-col justify-between ${
                  selectedRole === "seller"
                    ? "bg-[#321B30] border-[#D6B875] shadow-xl ring-2 ring-[#D6B875]/40"
                    : "bg-[#241321] border-[#665038] hover:border-[#D6B875]/70 hover:bg-[#321B30]/60"
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#D6B875]/10 border border-[#D6B875]/30 flex items-center justify-center text-[#D6B875] mb-5 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F8F1E5] mb-2">
                    Seller
                  </h3>
                  <p className="text-xs leading-relaxed text-[#C9BBAF]">
                    For individuals and businesses who want to sell wedding-related products like bridal lehengas, jewellery, accessories, and gifts.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#665038]/40">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRole("seller");
                      setCurrentStep(2);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      selectedRole === "seller"
                        ? "bg-[#D6B875] text-[#241321] shadow-md font-bold"
                        : "bg-[#3A2638] text-[#F8F1E5] hover:bg-[#D6B875] hover:text-[#241321]"
                    }`}
                  >
                    Select Seller <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3: Vendor */}
              <div
                onClick={() => setSelectedRole("vendor")}
                className={`group cursor-pointer rounded-2xl p-6 transition-all border flex flex-col justify-between ${
                  selectedRole === "vendor"
                    ? "bg-[#321B30] border-[#D6B875] shadow-xl ring-2 ring-[#D6B875]/40"
                    : "bg-[#241321] border-[#665038] hover:border-[#D6B875]/70 hover:bg-[#321B30]/60"
                }`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#D6B875]/10 border border-[#D6B875]/30 flex items-center justify-center text-[#D6B875] mb-5 group-hover:scale-105 transition-transform">
                    <Store className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#F8F1E5] mb-2">
                    Vendor
                  </h3>
                  <p className="text-xs leading-relaxed text-[#C9BBAF]">
                    For wedding professionals who want to list and offer their wedding-related services such as photography, makeup, decor, and planning.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#665038]/40">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRole("vendor");
                      setCurrentStep(2);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      selectedRole === "vendor"
                        ? "bg-[#D6B875] text-[#241321] shadow-md font-bold"
                        : "bg-[#3A2638] text-[#F8F1E5] hover:bg-[#D6B875] hover:text-[#241321]"
                    }`}
                  >
                    Select Vendor <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-[#665038]/30">
              <p className="text-sm text-[#C9BBAF]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#D6B875] hover:underline font-semibold">
                  Sign In Here
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: ACCOUNT DETAILS (ROLE-SPECIFIC)                   */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="bg-[#321B30]/90 border border-[#665038] rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 2 of 6 • {selectedRole?.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                Account & Security Details
              </h2>
              <p className="text-xs text-[#C9BBAF] mt-1">
                Provide your primary contact and login credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {selectedRole === "couple" ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Groom&apos;s Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={coupleData.groomName}
                      onChange={(e) =>
                        setCoupleData((p) => ({
                          ...p,
                          groomName: e.target.value,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Bride&apos;s Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera Patel"
                      value={coupleData.brideName}
                      onChange={(e) =>
                        setCoupleData((p) => ({
                          ...p,
                          brideName: e.target.value,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      {selectedRole === "seller" ? "Owner First Name *" : "First Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav"
                      value={selectedRole === "seller" ? sellerData.firstName : vendorData.firstName}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (selectedRole === "seller") setSellerData((p) => ({ ...p, firstName: val }));
                        else setVendorData((p) => ({ ...p, firstName: val }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      {selectedRole === "seller" ? "Owner Last Name *" : "Last Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={selectedRole === "seller" ? sellerData.lastName : vendorData.lastName}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (selectedRole === "seller") setSellerData((p) => ({ ...p, lastName: val }));
                        else setVendorData((p) => ({ ...p, lastName: val }));
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={
                    selectedRole === "couple"
                      ? coupleData.email
                      : selectedRole === "seller"
                      ? sellerData.email
                      : vendorData.email
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (selectedRole === "couple") setCoupleData((p) => ({ ...p, email: val }));
                    else if (selectedRole === "seller") setSellerData((p) => ({ ...p, email: val }));
                    else setVendorData((p) => ({ ...p, email: val }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                  Mobile Number (India +91) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={
                    selectedRole === "couple"
                      ? coupleData.phone
                      : selectedRole === "seller"
                      ? sellerData.phone
                      : vendorData.phone
                  }
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    if (selectedRole === "couple") setCoupleData((p) => ({ ...p, phone: val }));
                    else if (selectedRole === "seller") setSellerData((p) => ({ ...p, phone: val }));
                    else setVendorData((p) => ({ ...p, phone: val }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                Alternate Contact / WhatsApp Number (Optional)
              </label>
              <input
                type="tel"
                maxLength={10}
                placeholder="Optional second number"
                value={
                  selectedRole === "couple"
                    ? coupleData.alternatePhone
                    : selectedRole === "seller"
                    ? sellerData.alternateContact
                    : vendorData.alternateContact
                }
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  if (selectedRole === "couple") setCoupleData((p) => ({ ...p, alternatePhone: val }));
                  else if (selectedRole === "seller") setSellerData((p) => ({ ...p, alternateContact: val }));
                  else setVendorData((p) => ({ ...p, alternateContact: val }));
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                  Password * (Min 8 characters)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Create secure password"
                    value={
                      selectedRole === "couple"
                        ? coupleData.password
                        : selectedRole === "seller"
                        ? sellerData.password
                        : vendorData.password
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (selectedRole === "couple") setCoupleData((p) => ({ ...p, password: val }));
                      else if (selectedRole === "seller") setSellerData((p) => ({ ...p, password: val }));
                      else setVendorData((p) => ({ ...p, password: val }));
                    }}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9BBAF] hover:text-[#D6B875]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Re-type password"
                    value={
                      selectedRole === "couple"
                        ? coupleData.confirmPassword
                        : selectedRole === "seller"
                        ? sellerData.confirmPassword
                        : vendorData.confirmPassword
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (selectedRole === "couple") setCoupleData((p) => ({ ...p, confirmPassword: val }));
                      else if (selectedRole === "seller") setSellerData((p) => ({ ...p, confirmPassword: val }));
                      else setVendorData((p) => ({ ...p, confirmPassword: val }));
                    }}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9BBAF] hover:text-[#D6B875]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#665038]/40">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-[#665038] text-xs font-semibold text-[#F8F1E5] hover:bg-[#3A2638] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Role Selection
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#241321] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                Continue to Step 3 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: PERSONAL / BUSINESS / WEDDING INFORMATION        */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <div className="bg-[#321B30]/90 border border-[#665038] rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 3 of 6 • {selectedRole?.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                {selectedRole === "couple"
                  ? "Wedding Details & Event Calendar"
                  : selectedRole === "seller"
                  ? "Business & Brand Details"
                  : "Professional & Vendor Credentials"}
              </h2>
            </div>

            {/* ----------------- COUPLE STEP 3 ----------------- */}
            {selectedRole === "couple" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Your Role in the Wedding *
                  </label>
                  <select
                    value={coupleData.userRole}
                    onChange={(e) => setCoupleData({ ...coupleData, userRole: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                  >
                    <option value="Bride">Bride</option>
                    <option value="Groom">Groom</option>
                    <option value="Parent">Parent</option>
                    <option value="Family Member">Family Member</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Bride&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Merchant"
                      value={coupleData.brideName}
                      onChange={(e) => setCoupleData({ ...coupleData, brideName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Groom&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anant Ambani"
                      value={coupleData.groomName}
                      onChange={(e) => setCoupleData({ ...coupleData, groomName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Wedding Date / Event Date Picker */}
                <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider">
                      Wedding Date / Event Date {!coupleData.dateNotFinalized && "*"}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#C9BBAF]">
                      <input
                        type="checkbox"
                        checked={coupleData.dateNotFinalized}
                        onChange={(e) =>
                          setCoupleData({
                            ...coupleData,
                            dateNotFinalized: e.target.checked,
                            weddingDate: e.target.checked ? "" : coupleData.weddingDate,
                          })
                        }
                        className="w-4 h-4 rounded text-[#D6B875] accent-[#D6B875]"
                      />
                      <span>My wedding/event date is not finalized yet</span>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      disabled={coupleData.dateNotFinalized}
                      value={coupleData.weddingDate}
                      onChange={(e) => setCoupleData({ ...coupleData, weddingDate: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-[#1F0E1D] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm ${
                        coupleData.dateNotFinalized ? "opacity-40 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="block text-[11px] text-[#C9BBAF] mb-1">
                        Is the Date Flexible?
                      </span>
                      <select
                        value={coupleData.isDateFlexible}
                        onChange={(e) =>
                          setCoupleData({ ...coupleData, isDateFlexible: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      >
                        <option value="No">No (Strict Date)</option>
                        <option value="Yes">Yes (+/- few days)</option>
                        <option value="Not Decided">Not Decided</option>
                      </select>
                    </div>

                    <div>
                      <span className="block text-[11px] text-[#C9BBAF] mb-1">
                        Expected Guest Count
                      </span>
                      <select
                        value={coupleData.guestCount}
                        onChange={(e) => setCoupleData({ ...coupleData, guestCount: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      >
                        <option value="Under 100 Guests">Under 100 Guests (Intimate)</option>
                        <option value="100 - 300 Guests">100 - 300 Guests</option>
                        <option value="300 - 500 Guests">300 - 500 Guests</option>
                        <option value="500 - 1000 Guests">500 - 1000 Guests (Grand)</option>
                        <option value="1000+ Guests">1000+ Guests (Royal)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Wedding Destination / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Udaipur / Jaipur / Goa"
                      value={coupleData.weddingLocation}
                      onChange={(e) =>
                        setCoupleData({ ...coupleData, weddingLocation: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Approximate Wedding Budget
                    </label>
                    <select
                      value={coupleData.weddingBudget}
                      onChange={(e) =>
                        setCoupleData({ ...coupleData, weddingBudget: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                    >
                      <option value="Under ₹10 Lakhs">Under ₹10 Lakhs</option>
                      <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
                      <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                      <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                      <option value="₹1 Crore+">₹1 Crore+ (Luxury / Royal)</option>
                    </select>
                  </div>
                </div>

                {/* Wedding Functions (Multi-Select) */}
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Wedding Functions Planned
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {WEDDING_FUNCTIONS.map((fn) => {
                      const isSelected = coupleData.weddingFunctions.includes(fn);
                      return (
                        <button
                          type="button"
                          key={fn}
                          onClick={() => {
                            setCoupleData((prev) => ({
                              ...prev,
                              weddingFunctions: isSelected
                                ? prev.weddingFunctions.filter((f) => f !== fn)
                                : [...prev.weddingFunctions, fn],
                            }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-[#D6B875]/20 border-[#D6B875] text-[#FFE29A]"
                              : "bg-[#241321] border-[#665038] text-[#C9BBAF] hover:border-[#D6B875]/60"
                          }`}
                        >
                          <span>{fn}</span>
                          {isSelected ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#D6B875]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- SELLER STEP 3 ----------------- */}
            {selectedRole === "seller" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Heritage Couture"
                      value={sellerData.businessName}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, businessName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Seller Entity Type *
                    </label>
                    <select
                      value={sellerData.sellerType}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, sellerType: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                    >
                      <option value="Individual">Individual / Boutique</option>
                      <option value="Proprietorship">Sole Proprietorship</option>
                      <option value="Partnership">Partnership Firm</option>
                      <option value="LLP">Limited Liability Partnership (LLP)</option>
                      <option value="Private Limited">Private Limited Company</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Primary Business Category *
                    </label>
                    <select
                      value={sellerData.businessCategory}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, businessCategory: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                    >
                      {SELLER_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Year of Establishment
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2016"
                      value={sellerData.yearOfEstablishment}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, yearOfEstablishment: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Business Description *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your brand, heritage crafts, fabrics, and uniqueness..."
                    value={sellerData.businessDescription}
                    onChange={(e) =>
                      setSellerData({ ...sellerData, businessDescription: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      value={sellerData.gstNumber}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, gstNumber: e.target.value.toUpperCase() })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      PAN Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={sellerData.panNumber}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, panNumber: e.target.value.toUpperCase() })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={sellerData.websiteUrl}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, websiteUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Instagram Profile
                    </label>
                    <input
                      type="text"
                      placeholder="@brandname"
                      value={sellerData.instagramUrl}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, instagramUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Facebook Page
                    </label>
                    <input
                      type="text"
                      placeholder="facebook.com/..."
                      value={sellerData.facebookUrl}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, facebookUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- VENDOR STEP 3 ----------------- */}
            {selectedRole === "vendor" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Brand / Studio Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Heritage Captures"
                      value={vendorData.businessName}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, businessName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Vendor Structure *
                    </label>
                    <select
                      value={vendorData.vendorType}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, vendorType: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                    >
                      <option value="Individual">Individual Artist</option>
                      <option value="Freelancer">Freelance Professional</option>
                      <option value="Studio / Agency">Studio / Agency</option>
                      <option value="Company">Private Ltd / Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Primary Service Category *
                    </label>
                    <select
                      value={vendorData.vendorCategory}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, vendorCategory: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                    >
                      {VENDOR_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 5"
                      value={vendorData.experienceYears}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, experienceYears: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Team Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 - 8 members"
                      value={vendorData.teamSize}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, teamSize: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Professional Bio & Artistic Approach *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your style, equipment, awards, and wedding philosophy..."
                    value={vendorData.businessDescription}
                    onChange={(e) =>
                      setVendorData({ ...vendorData, businessDescription: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] placeholder-[#665038] focus:border-[#D6B875] focus:outline-none text-sm"
                  />
                </div>

                {/* Event Availability Date (Dedicated for Vendor booking availability) */}
                <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] space-y-2">
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider">
                    Event Date / Next Availability Date (Optional)
                  </label>
                  <p className="text-[11px] text-[#C9BBAF]">
                    If you want to advertise availability for a specific wedding slot or high-demand auspicious date.
                  </p>
                  <input
                    type="date"
                    value={vendorData.vendorEventDate}
                    onChange={(e) =>
                      setVendorData({ ...vendorData, vendorEventDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1F0E1D] border border-[#665038] text-[#F8F1E5] focus:border-[#D6B875] focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={vendorData.websiteUrl}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, websiteUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Instagram Profile
                    </label>
                    <input
                      type="text"
                      placeholder="@artist"
                      value={vendorData.instagramUrl}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, instagramUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      YouTube Reel / Channel
                    </label>
                    <input
                      type="text"
                      placeholder="youtube.com/..."
                      value={vendorData.youtubeUrl}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, youtubeUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      placeholder="facebook.com/..."
                      value={vendorData.facebookUrl}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, facebookUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#665038]/40">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-[#665038] text-xs font-semibold text-[#F8F1E5] hover:bg-[#3A2638] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#241321] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                Continue to Step 4 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 4: PRODUCTS / SERVICES / REQUIREMENTS               */}
        {/* ========================================================= */}
        {currentStep === 4 && (
          <div className="bg-[#321B30]/90 border border-[#665038] rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 4 of 6 • {selectedRole?.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                {selectedRole === "couple"
                  ? "Wedding Services Required & Preferences"
                  : selectedRole === "seller"
                  ? "Product Catalog & Featured Listing"
                  : "Services, Packages & Pricing Model"}
              </h2>
            </div>

            {/* ----------------- COUPLE STEP 4 ----------------- */}
            {selectedRole === "couple" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Wedding Services Required (Select All That Apply) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {WEDDING_SERVICES_OPTIONS.map((srv) => {
                      const isSelected = coupleData.servicesRequired.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => {
                            setCoupleData((prev) => ({
                              ...prev,
                              servicesRequired: isSelected
                                ? prev.servicesRequired.filter((s) => s !== srv)
                                : [...prev.servicesRequired, srv],
                            }));
                          }}
                          className={`p-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-[#D6B875]/20 border-[#D6B875] text-[#FFE29A]"
                              : "bg-[#241321] border-[#665038] text-[#C9BBAF] hover:border-[#D6B875]/60"
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#D6B875]" />
                          ) : (
                            <Square className="w-4 h-4 opacity-40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Preferred Vendor City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Udaipur / Jaipur / Any"
                      value={coupleData.preferredVendorCity}
                      onChange={(e) =>
                        setCoupleData({ ...coupleData, preferredVendorCity: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Budget Per Service
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹50k - ₹1.5L"
                      value={coupleData.estimatedBudgetPerService}
                      onChange={(e) =>
                        setCoupleData({
                          ...coupleData,
                          estimatedBudgetPerService: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      value={coupleData.preferredContactMethod}
                      onChange={(e) =>
                        setCoupleData({ ...coupleData, preferredContactMethod: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    >
                      <option value="WhatsApp">WhatsApp (Recommended)</option>
                      <option value="Call">Phone Call</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Additional Wedding Requirements & Vision
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about your desired wedding themes, dates flexibility, specific ceremonies..."
                    value={coupleData.additionalRequirements}
                    onChange={(e) =>
                      setCoupleData({ ...coupleData, additionalRequirements: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  />
                </div>
              </div>
            )}

            {/* ----------------- SELLER STEP 4 ----------------- */}
            {selectedRole === "seller" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Product Categories Offered (Multi-Select)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SELLER_CATEGORIES.map((cat) => {
                      const isSelected = sellerData.productCategories.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => {
                            setSellerData((prev) => ({
                              ...prev,
                              productCategories: isSelected
                                ? prev.productCategories.filter((c) => c !== cat)
                                : [...prev.productCategories, cat],
                            }));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-[#D6B875]/20 border-[#D6B875] text-[#FFE29A]"
                              : "bg-[#241321] border-[#665038] text-[#C9BBAF] hover:border-[#D6B875]/60"
                          }`}
                        >
                          <span>{cat}</span>
                          {isSelected ? (
                            <CheckSquare className="w-3.5 h-3.5 text-[#D6B875]" />
                          ) : (
                            <Square className="w-3.5 h-3.5 opacity-40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#241321] border border-[#665038] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#665038]/40 pb-3">
                    <Package className="w-5 h-5 text-[#D6B875]" />
                    <h3 className="text-sm font-semibold text-[#F8F1E5]">
                      Add Your First Featured Wedding Product
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zardozi Velvet Bridal Lehenga"
                        value={sellerData.productName}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, productName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Product Category
                      </label>
                      <select
                        value={sellerData.productCategory}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, productCategory: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      >
                        {SELLER_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="85000"
                        value={sellerData.productPrice}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, productPrice: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Discounted Price (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="72000"
                        value={sellerData.discountPrice}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, discountPrice: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Stock / Availability
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5 units in stock"
                        value={sellerData.stockAvailability}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, stockAvailability: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                      Product Variants (Size / Colour / Fabric)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Red, Maroon, Pink | S, M, L, XL, Made-to-measure"
                      value={sellerData.productVariants}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, productVariants: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                      Product Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Details regarding embroidery, fabric, can-can, blouse padding..."
                      value={sellerData.productDescription}
                      onChange={(e) =>
                        setSellerData({ ...sellerData, productDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                    />
                  </div>

                  {/* Multi Product Image Upload */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-2">
                      Product Images (Upload High-Resolution Photos)
                    </label>
                    <div className="flex flex-wrap gap-3 items-center">
                      {sellerData.productImages.map((imgUrl, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#D6B875] group"
                        >
                          <Image src={imgUrl} alt={`Product ${i}`} fill className="object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setSellerData((prev) => ({
                                ...prev,
                                productImages: prev.productImages.filter((_, idx) => idx !== i),
                              }))
                            }
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      <label className="cursor-pointer w-16 h-16 rounded-xl bg-[#1F0E1D] border border-dashed border-[#665038] hover:border-[#D6B875] flex flex-col items-center justify-center text-[#C9BBAF]">
                        <Upload className="w-5 h-5 text-[#D6B875]" />
                        <span className="text-[9px] mt-1">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e.target.files[0], "productImages", "seller")
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#C9BBAF]">
                      <input
                        type="checkbox"
                        checked={sellerData.customizationAvailable}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, customizationAvailable: e.target.checked })
                        }
                        className="w-4 h-4 rounded accent-[#D6B875]"
                      />
                      <span>Customization</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#C9BBAF]">
                      <input
                        type="checkbox"
                        checked={sellerData.madeToOrder}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, madeToOrder: e.target.checked })
                        }
                        className="w-4 h-4 rounded accent-[#D6B875]"
                      />
                      <span>Made to Order</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#C9BBAF]">
                      <input
                        type="checkbox"
                        checked={sellerData.deliveryAvailable}
                        onChange={(e) =>
                          setSellerData({ ...sellerData, deliveryAvailable: e.target.checked })
                        }
                        className="w-4 h-4 rounded accent-[#D6B875]"
                      />
                      <span>Pan-India Delivery</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- VENDOR STEP 4 ----------------- */}
            {selectedRole === "vendor" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Primary Service Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Candid Wedding Cinematography"
                      value={vendorData.serviceName}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, serviceName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Pricing Type *
                    </label>
                    <select
                      value={vendorData.pricingType}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, pricingType: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    >
                      <option value="Per Event">Per Event / Wedding Function</option>
                      <option value="Per Day">Per Day</option>
                      <option value="Per Person">Per Person / Plate</option>
                      <option value="Per Hour">Per Hour</option>
                      <option value="Custom">Custom Quote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Starting Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="50000"
                      value={vendorData.startingPrice}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, startingPrice: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                      Maximum Price / Luxury Tier (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="250000"
                      value={vendorData.maxPrice}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, maxPrice: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Services Offered Breakdown *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Candid Photographers, 1 Traditional, 1 Drone, 4K Teaser, Album"
                    value={vendorData.servicesOffered}
                    onChange={(e) =>
                      setVendorData({ ...vendorData, servicesOffered: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  />
                </div>

                {/* Featured Package */}
                <div className="p-5 rounded-2xl bg-[#241321] border border-[#665038] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#665038]/40 pb-3">
                    <Sparkles className="w-5 h-5 text-[#D6B875]" />
                    <h3 className="text-sm font-semibold text-[#F8F1E5]">
                      Featured Package (Royal Signature Package)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Package Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Royal 2-Day Complete Coverage"
                        value={vendorData.packageName}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, packageName: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Package Price (₹)
                      </label>
                      <input
                        type="text"
                        placeholder="180000"
                        value={vendorData.packagePrice}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, packagePrice: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                      Package Inclusions & Deliverables
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 40-sheet leather photobook, 4K highlights film, full raw footage on SSD..."
                      value={vendorData.packageInclusions}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, packageInclusions: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Advance Booking Amount
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 25% at booking"
                        value={vendorData.advanceBookingAmount}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, advanceBookingAmount: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#D6B875] uppercase mb-1">
                        Cancellation Policy
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Flexible refund up to 30 days prior"
                        value={vendorData.cancellationPolicy}
                        onChange={(e) =>
                          setVendorData({ ...vendorData, cancellationPolicy: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#1F0E1D] border border-[#665038] text-xs text-[#F8F1E5]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#665038]/40">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-[#665038] text-xs font-semibold text-[#F8F1E5] hover:bg-[#3A2638] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#241321] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                Continue to Step 5 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 5: LOCATION, PORTFOLIO & DOCUMENTS                  */}
        {/* ========================================================= */}
        {currentStep === 5 && (
          <div className="bg-[#321B30]/90 border border-[#665038] rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 5 of 6 • {selectedRole?.toUpperCase()}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                {selectedRole === "couple"
                  ? "Location & Communication Address"
                  : selectedRole === "seller"
                  ? "Business Address & Verification Documents"
                  : "Operating Locations, Portfolio & Verification"}
              </h2>
            </div>

            {/* Location Section (Shared with dependent Country / State / City) */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="India"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm opacity-80 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    State *
                  </label>
                  <select
                    value={
                      selectedRole === "couple"
                        ? coupleData.state
                        : selectedRole === "seller"
                        ? sellerData.state
                        : vendorData.state
                    }
                    onChange={(e) => {
                      const st = e.target.value;
                      const defaultCity = INDIAN_STATES_CITIES[st]?.[0] || "";
                      if (selectedRole === "couple")
                        setCoupleData((p) => ({ ...p, state: st, city: defaultCity }));
                      else if (selectedRole === "seller")
                        setSellerData((p) => ({ ...p, state: st, city: defaultCity }));
                      else setVendorData((p) => ({ ...p, state: st, city: defaultCity }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  >
                    {currentStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    City *
                  </label>
                  <select
                    value={
                      selectedRole === "couple"
                        ? coupleData.city
                        : selectedRole === "seller"
                        ? sellerData.city
                        : vendorData.city
                    }
                    onChange={(e) => {
                      const ct = e.target.value;
                      if (selectedRole === "couple") setCoupleData((p) => ({ ...p, city: ct }));
                      else if (selectedRole === "seller") setSellerData((p) => ({ ...p, city: ct }));
                      else setVendorData((p) => ({ ...p, city: ct }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  >
                    {(
                      INDIAN_STATES_CITIES[
                        selectedRole === "couple"
                          ? coupleData.state
                          : selectedRole === "seller"
                          ? sellerData.state
                          : vendorData.state
                      ] || ["Jaipur", "Udaipur", "Delhi"]
                    ).map((ct) => (
                      <option key={ct} value={ct}>
                        {ct}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Full Address / Landmark *
                  </label>
                  <input
                    type="text"
                    placeholder="Street, area, office or home address..."
                    value={
                      selectedRole === "couple"
                        ? coupleData.fullAddress
                        : selectedRole === "seller"
                        ? sellerData.fullAddress
                        : vendorData.businessAddress
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (selectedRole === "couple")
                        setCoupleData((p) => ({ ...p, fullAddress: val }));
                      else if (selectedRole === "seller")
                        setSellerData((p) => ({ ...p, fullAddress: val }));
                      else setVendorData((p) => ({ ...p, businessAddress: val }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="302001"
                    value={
                      selectedRole === "couple"
                        ? coupleData.pincode
                        : selectedRole === "seller"
                        ? sellerData.pincode
                        : vendorData.pincode
                    }
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      if (selectedRole === "couple") setCoupleData((p) => ({ ...p, pincode: val }));
                      else if (selectedRole === "seller")
                        setSellerData((p) => ({ ...p, pincode: val }));
                      else setVendorData((p) => ({ ...p, pincode: val }));
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vendor Availability Areas */}
            {selectedRole === "vendor" && (
              <div className="space-y-4 pt-4 border-t border-[#665038]/40">
                <div>
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Service Areas & Destination Wedding Coverage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pan India, Jaipur, Udaipur, Goa, Delhi NCR, Thailand, UAE"
                    value={vendorData.serviceAreas}
                    onChange={(e) =>
                      setVendorData({ ...vendorData, serviceAreas: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#241321] border border-[#665038] text-[#F8F1E5] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Destination Weddings
                    </label>
                    <select
                      value={vendorData.destinationWeddingServices}
                      onChange={(e) =>
                        setVendorData({
                          ...vendorData,
                          destinationWeddingServices: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-xs text-[#F8F1E5]"
                    >
                      <option value="Yes">Yes (Available)</option>
                      <option value="No">No (Local Only)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Travel & Stay Charges
                    </label>
                    <input
                      type="text"
                      placeholder="Client pays / Included in package"
                      value={vendorData.travelCharges}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, travelCharges: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-xs text-[#F8F1E5]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#C9BBAF] mb-1">
                      Advance Booking Notice
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15-30 days advance"
                      value={vendorData.advanceBookingRequired}
                      onChange={(e) =>
                        setVendorData({ ...vendorData, advanceBookingRequired: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#241321] border border-[#665038] text-xs text-[#F8F1E5]"
                    />
                  </div>
                </div>

                {/* Portfolio Multiple Image Uploads */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#D6B875] uppercase tracking-wider mb-2">
                    Portfolio Images (Upload 3-6 Best Wedding Work Samples)
                  </label>
                  <div className="flex flex-wrap gap-3 items-center">
                    {vendorData.portfolioImages.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#D6B875] group"
                      >
                        <Image src={imgUrl} alt={`Portfolio ${i}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setVendorData((prev) => ({
                              ...prev,
                              portfolioImages: prev.portfolioImages.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <label className="cursor-pointer w-20 h-20 rounded-xl bg-[#241321] border border-dashed border-[#665038] hover:border-[#D6B875] flex flex-col items-center justify-center text-[#C9BBAF]">
                      <Upload className="w-6 h-6 text-[#D6B875]" />
                      <span className="text-[10px] mt-1">
                        {uploadingField === "portfolioImages" ? "Uploading..." : "Add Work"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e.target.files[0], "portfolioImages", "vendor")
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Documents Uploads (Seller & Vendor) */}
            {(selectedRole === "seller" || selectedRole === "vendor") && (
              <div className="space-y-4 pt-4 border-t border-[#665038]/40">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D6B875]" />
                  <h3 className="text-sm font-semibold text-[#F8F1E5]">
                    Trust & Verification Documents (Optional for fast approval)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ID Proof */}
                  <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#F8F1E5]">
                        Identity Proof (Aadhaar / PAN)
                      </div>
                      <div className="text-[10px] text-[#C9BBAF]">
                        {selectedRole === "seller"
                          ? sellerData.idProofUrl
                            ? "Uploaded Successfully"
                            : "PNG, JPG or PDF under 8MB"
                          : vendorData.idProofUrl
                          ? "Uploaded Successfully"
                          : "PNG, JPG or PDF under 8MB"}
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#321B30] border border-[#665038] hover:border-[#D6B875] text-[11px] font-semibold text-[#D6B875]">
                      Upload
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e.target.files[0], "idProofUrl", selectedRole)
                        }
                      />
                    </label>
                  </div>

                  {/* Business Proof */}
                  <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#F8F1E5]">
                        Business Registration / GST
                      </div>
                      <div className="text-[10px] text-[#C9BBAF]">
                        {selectedRole === "seller"
                          ? sellerData.businessProofUrl
                            ? "Uploaded Successfully"
                            : "Business certificate / Letterhead"
                          : vendorData.businessProofUrl
                          ? "Uploaded Successfully"
                          : "Business certificate / Letterhead"}
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#321B30] border border-[#665038] hover:border-[#D6B875] text-[11px] font-semibold text-[#D6B875]">
                      Upload
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e.target.files[0], "businessProofUrl", selectedRole)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#665038]/40">
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-[#665038] text-xs font-semibold text-[#F8F1E5] hover:bg-[#3A2638] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#241321] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
              >
                Review & Confirm <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 6: REVIEW ALL DETAILS AND SUBMIT                    */}
        {/* ========================================================= */}
        {currentStep === 6 && (
          <div className="bg-[#321B30]/90 border border-[#665038] rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="border-b border-[#665038]/40 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D6B875] font-semibold">
                Step 6 of 6 • Final Verification
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F8F1E5] mt-1">
                Review Your {selectedRole?.toUpperCase()} Profile
              </h2>
              <p className="text-xs text-[#C9BBAF] mt-1">
                Please verify all entered details before finalizing your ShubhVivah registration.
              </p>
            </div>

            {/* Review Card 1: Account Information */}
            <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                  1. Account & Contact
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#D6B875] hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-[#C9BBAF]">Name:</span>
                  <p className="font-semibold text-[#F8F1E5]">
                    {selectedRole === "couple"
                      ? `${coupleData.firstName} ${coupleData.lastName}`
                      : selectedRole === "seller"
                      ? `${sellerData.firstName} ${sellerData.lastName}`
                      : `${vendorData.firstName} ${vendorData.lastName}`}
                  </p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Email:</span>
                  <p className="font-semibold text-[#F8F1E5]">
                    {selectedRole === "couple"
                      ? coupleData.email
                      : selectedRole === "seller"
                      ? sellerData.email
                      : vendorData.email}
                  </p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Phone:</span>
                  <p className="font-semibold text-[#F8F1E5]">
                    {selectedRole === "couple"
                      ? coupleData.phone
                      : selectedRole === "seller"
                      ? sellerData.phone
                      : vendorData.phone}
                  </p>
                </div>
                <div>
                  <span className="text-[#C9BBAF]">Role:</span>
                  <p className="font-semibold text-[#FFE29A] uppercase">{selectedRole}</p>
                </div>
              </div>
            </div>

            {/* Review Card 2: Role Details */}
            <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                  2. {selectedRole === "couple" ? "Wedding Specifics" : "Business Profile"}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-[#D6B875] hover:underline"
                >
                  Edit
                </button>
              </div>

              {selectedRole === "couple" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#C9BBAF]">Bride & Groom:</span>
                    <p className="font-semibold text-[#F8F1E5]">
                      {coupleData.brideName || "N/A"} & {coupleData.groomName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Wedding Date / Event Date:</span>
                    <p className="font-semibold text-[#FFE29A]">
                      {coupleData.dateNotFinalized
                        ? "Not Finalized Yet"
                        : coupleData.weddingDate || "Not Set"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Guest Count & Budget:</span>
                    <p className="font-semibold text-[#F8F1E5]">
                      {coupleData.guestCount} • {coupleData.weddingBudget}
                    </p>
                  </div>
                </div>
              )}

              {selectedRole === "seller" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#C9BBAF]">Brand Name:</span>
                    <p className="font-semibold text-[#F8F1E5]">{sellerData.businessName}</p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Category:</span>
                    <p className="font-semibold text-[#F8F1E5]">{sellerData.businessCategory}</p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Product Name:</span>
                    <p className="font-semibold text-[#FFE29A]">{sellerData.productName}</p>
                  </div>
                </div>
              )}

              {selectedRole === "vendor" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#C9BBAF]">Studio / Brand:</span>
                    <p className="font-semibold text-[#F8F1E5]">{vendorData.businessName}</p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Service Category:</span>
                    <p className="font-semibold text-[#F8F1E5]">{vendorData.vendorCategory}</p>
                  </div>
                  <div>
                    <span className="text-[#C9BBAF]">Starting Price:</span>
                    <p className="font-semibold text-[#FFE29A]">
                      ₹{vendorData.startingPrice} ({vendorData.pricingType})
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Review Card 3: Location */}
            <div className="p-4 rounded-xl bg-[#241321] border border-[#665038] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6B875]">
                  3. Location & Coverage
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-xs text-[#D6B875] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#F8F1E5]">
                {selectedRole === "couple"
                  ? `${coupleData.fullAddress ? coupleData.fullAddress + ", " : ""}${
                      coupleData.city
                    }, ${coupleData.state}, India - ${coupleData.pincode}`
                  : selectedRole === "seller"
                  ? `${sellerData.fullAddress}, ${sellerData.city}, ${sellerData.state}, India - ${sellerData.pincode}`
                  : `${vendorData.businessAddress}, ${vendorData.city}, ${vendorData.state}, India - ${vendorData.pincode}`}
              </p>
            </div>

            {/* Terms and Conditions Acceptance */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={
                    selectedRole === "couple"
                      ? coupleData.termsAccepted
                      : selectedRole === "seller"
                      ? sellerData.termsAccepted
                      : vendorData.termsAccepted
                  }
                  onChange={(e) => {
                    const val = e.target.checked;
                    if (selectedRole === "couple")
                      setCoupleData((p) => ({ ...p, termsAccepted: val }));
                    else if (selectedRole === "seller")
                      setSellerData((p) => ({ ...p, termsAccepted: val }));
                    else setVendorData((p) => ({ ...p, termsAccepted: val }));
                  }}
                  className="mt-0.5 w-5 h-5 rounded border-[#665038] text-[#D6B875] accent-[#D6B875]"
                />
                <span className="text-xs text-[#C9BBAF] leading-relaxed">
                  I confirm that all details provided are true and accurate. I agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-[#D6B875] underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-[#D6B875] underline">
                    Privacy Policy
                  </Link>{" "}
                  of ShubhVivah.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t border-[#665038]/40">
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-[#665038] text-xs font-semibold text-[#F8F1E5] hover:bg-[#3A2638] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Edit Details
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#B08D45] via-[#D6B875] to-[#B08D45] text-[#241321] font-bold text-sm uppercase tracking-wider hover:opacity-95 shadow-xl flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#241321] border-t-transparent rounded-full animate-spin" />
                    Registering Account...
                  </>
                ) : (
                  <>
                    Complete Registration <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1F0E1D] flex items-center justify-center text-[#D6B875]">
          Loading ShubhVivah Registration...
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
