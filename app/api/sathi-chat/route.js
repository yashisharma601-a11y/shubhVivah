import { NextResponse } from "next/server";

// Rate limiting map (in-memory, IP/Session based)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30; // 30 messages per minute

  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count += 1;
  }
  rateLimitMap.set(ip, record);

  // Periodic cleanup
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  return record.count <= maxRequests;
}

// -----------------------------------------------------------------------------
// SATHI'S COMPREHENSIVE MATRIMONIAL & PLATFORM KNOWLEDGE BASE
// -----------------------------------------------------------------------------
const KNOWLEDGE_RESPONSES = [
  // 1. GREETINGS & INTRODUCTIONS
  {
    triggers: [
      "namaste", "namaskar", "pranam", "hello", "hi", "hey", "hola", "kese ho",
      "kaise ho", "how are you", "who are you", "tum kaun ho", "aap kaun ho",
      "sathi", "good morning", "good evening", "good afternoon"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `नमस्ते! 🙏 शुभविवाह में आपका हार्दिक स्वागत है।\n\nमैं **साथी (Sathi)** हूँ, आपका व्यक्तिगत वैवाहिक एवं मैचमेकिंग सहायक।\n\nक्या मैं आज आपके लिए एक सुयोग्य जीवनसाथी (वर/वधु) की तलाश में मदद करूँ, या प्रोफ़ाइल रजिस्ट्रेशन और वेडिंग सर्विसेज के बारे में बताऊँ?`,
          actions: ["Find My Perfect Match", "How to Create a Profile?", "Search Matrimonial Profiles"],
          navLinks: [{ label: "Register as Couple / Partner", href: "/register?type=couple" }]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Namaste! 🙏 Shubvivah par aapka swagat hai.\n\nMain **Sathi** hoon, aapka personal matchmaking assistant.\n\nAapko apne ya apne parivar ke liye suitable life partner (Bride/Groom) dhoondhne me, profile register karne me, ya wedding services explore karne me main kaise madad kar sakti hoon?`,
          actions: ["Find My Perfect Match", "How to Create a Profile?", "Search Matrimonial Profiles"],
          navLinks: [{ label: "Create Profile", href: "/register?type=couple" }]
        };
      }
      return {
        text: `Namaste! 🙏 Welcome to **Shubvivah**.\n\nI'm **Sathi**, your personal matchmaking and wedding companion.\n\nHow can I assist you today? You can search for matrimonial profiles, learn how to register, explore verified vendors and venues, or request dedicated matchmaking support.`,
        actions: ["Find My Perfect Match", "How to Create a Profile?", "Search Matrimonial Profiles"],
        navLinks: [{ label: "Create Matrimonial Profile", href: "/register?type=couple" }]
      };
    }
  },

  // 2. FIND MY PERFECT MATCH / MATCHMAKING ASSISTANCE
  {
    triggers: [
      "find my perfect match", "find match", "perfect match", "matchmaking", "rishta",
      "dulha", "dulhan", "bride", "groom", "life partner", "jeevansathi", "match chahiye",
      "shaadi karni hai", "shadi", "vivah", "ladki chahiye", "ladka chahiye", "kanya",
      "var chahiye", "marriage proposal", "suitable partner"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह पर सुयोग्य जीवनसाथी खोजना बेहद सरल, सुरक्षित और प्रामाणिक है! 💖\n\nयहाँ आप इन मुख्य फ़िल्टरों के आधार पर प्रोफ़ाइल देख सकते हैं:\n• **उम्र एवं कद (Age & Height)**\n• **स्थान / शहर (Delhi NCR, Mumbai, Jaipur, Udaipur आदि)**\n• **शिक्षा एवं पेशा (Education & Profession - IT, Medical, Business, Govt.)**\n• **समुदाय एवं वैवाहिक स्थिति (Marital Status & Background)**\n\nयदि आप चाहते हैं कि हमारी **शुभविवाह मैचमेकिंग टीम** व्यक्तिगत रूप से आपके लिए उपयुक्त वर/वधु के रिश्ते ढूंढे, तो कृपया नीचे दिए गए फॉर्म में अपनी प्राथमिकताएं साझा करें।`,
          showInquiryForm: true,
          actions: ["How to Create a Profile?", "Search Matrimonial Profiles", "Contact Support"],
          navLinks: [
            { label: "Create Your Matrimonial Profile", href: "/register?type=couple" },
            { label: "Explore Verified Profiles & Vendors", href: "/vendors" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Shubvivah par perfect life partner dhoondhna bahut aasan aur safe hai! 💖\n\nAap in key filters ke through profiles explore kar sakte hain:\n• **Age & Height criteria**\n• **Location / Preferred City (Delhi NCR, Mumbai, Jaipur, Udaipur pan-India)**\n• **Education & Profession (Engineers, Doctors, CA, Business owners, Govt. Services)**\n• **Marital Status & Family values**\n\nAgar aap chahte hain ki hamari **Shubvivah Matchmaking Team** personally aapse connect karke best matching profiles suggest kare, toh kripya neeche diye gaye quick inquiry form me apni details share karein.`,
          showInquiryForm: true,
          actions: ["How to Create a Profile?", "Search Matrimonial Profiles", "Contact Support"],
          navLinks: [
            { label: "Create Free Profile", href: "/register?type=couple" },
            { label: "Explore Platform", href: "/vendors" }
          ]
        };
      }
      return {
        text: `Finding your perfect life partner on Shubvivah is secure, elegant, and personalized! 💖\n\nYou can discover profiles tailored to your preferences:\n• **Age & Height criteria**\n• **Location / City (Delhi NCR, Mumbai, Jaipur, Udaipur, etc.)**\n• **Educational & Professional Background (IT, Medical, Finance, Business)**\n• **Family Values & Marital Status**\n\nWould you like our personalized matchmaking concierge to assist you directly? Please share your requirements in the inquiry form below so our team can reach out!`,
        showInquiryForm: true,
        actions: ["How to Create a Profile?", "Search Matrimonial Profiles", "Contact Support"],
        navLinks: [
          { label: "Create Matrimonial Profile", href: "/register?type=couple" },
          { label: "Explore Directory", href: "/vendors" }
        ]
      };
    }
  },

  // 3. SEARCH MATRIMONIAL PROFILES & FILTERS
  {
    triggers: [
      "search matrimonial profiles", "search profiles", "profile search", "khojna",
      "profiles kaise dekhein", "filter", "search filter", "browse profiles",
      "view profiles", "directory"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `प्रोफ़ाइल खोजने के लिए:\n\n1. शुभविवाह पर मुफ़्त प्रोफ़ाइल बनाएँ या लॉगिन करें।\n2. अपनी प्राथमिकताओं (उम्र, पेशा, शहर) के अनुसार फ़िल्टर सेट करें।\n3. सत्यापित प्रोफ़ाइलों की तस्वीरें, पारिवारिक पृष्ठभूमि और बायो देखें।\n4. अपनी रुचि (Express Interest) भेजकर सुरक्षित बातचीत शुरू करें।\n\nसाथ ही, आप अपने विवाह समारोह के लिए **सत्यापित वेडिंग वेंडर्स** और **हेरिटेज पैलेस** भी सीधे देख सकते हैं।`,
          actions: ["Find My Perfect Match", "How to Create a Profile?", "Explore All Verified Vendors"],
          navLinks: [
            { label: "Open Registration Page", href: "/register?type=couple" },
            { label: "Browse Verified Directory", href: "/vendors" },
            { label: "Heritage Venues", href: "/venues/heritage-palaces" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Profiles search karne ke liye:\n\n1. Shubvivah par apna free profile register ya login karein.\n2. Apni preference ke hisaab se filters (Age, Profession, City, Community) apply karein.\n3. Verified profiles ki photos, education aur family background check karein.\n4. Express Interest bhej kar aage baat shuru karein.\n\nSath hi aap royal wedding ke liye verified photographers, makeup artists aur heritage venues bhi explore kar sakte hain!`,
          actions: ["Find My Perfect Match", "How to Create a Profile?", "Explore All Verified Vendors"],
          navLinks: [
            { label: "Register Profile", href: "/register?type=couple" },
            { label: "Browse Vendors & Profiles", href: "/vendors" }
          ]
        };
      }
      return {
        text: `To search profiles on Shubvivah:\n\n1. Sign up for a free profile or log in to your account.\n2. Apply search filters based on Age, City/Location, Profession, and Marital Status.\n3. Browse verified member profiles with authentic photographs, education, and bio details.\n4. Express Interest to initiate secure, respectful communication.\n\nYou can also explore our verified directory of top wedding professionals and venues!`,
        actions: ["Find My Perfect Match", "How to Create a Profile?", "Explore All Verified Vendors"],
        navLinks: [
          { label: "Sign Up as Couple", href: "/register?type=couple" },
          { label: "Explore Verified Vendors", href: "/vendors" }
        ]
      };
    }
  },

  // 4. HOW TO CREATE A PROFILE / REGISTRATION HELP
  {
    triggers: [
      "how to create a profile", "create profile", "registration", "register",
      "sign up", "account banana", "profile kaise banaye", "registration help",
      "new user", "join", "sign-up", "account create"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह पर प्रोफ़ाइल बनाना बेहद सरल और 100% सुरक्षित है:\n\n1. वेबसाइट पर **'Register'** बटन पर क्लिक करें।\n2. **Couple / Matchmaking** विकल्प चुनें।\n3. अपना नाम, मोबाइल नंबर, ईमेल और पासवर्ड दर्ज करें।\n4. अकाउंट बनने के बाद अपने **Couple Dashboard** में जाएँ और व्यक्तिगत विवरण, शिक्षा, पेशा एवं फ़ोटो अपलोड करें।\n\nयदि आप एक वेडिंग वेंडर या सप्लायर हैं, तो क्रमशः **Vendor** या **Seller** विकल्प चुनकर रजिस्टर कर सकते हैं।`,
          actions: ["Registration & Login Help", "Find My Perfect Match", "Membership Plans"],
          navLinks: [
            { label: "Click here to Register Now", href: "/register?type=couple" },
            { label: "Already have an account? Login", href: "/login" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Shubvivah par profile create karna bahut simple aur safe hai:\n\n1. Website par **'Register'** par click karein.\n2. Apna role select karein: **Couple** (life partner search ke liye).\n3. Name, Mobile Number, Email aur Password enter karein.\n4. Registration complete hone par apne **Couple Dashboard** me jakar photos, education, profession aur partner preferences update karein.\n\nAgar aap wedding professional ya supplier hain, toh **Vendor** ya **Seller** select karke bhi register kar sakte hain.`,
          actions: ["Registration & Login Help", "Find My Perfect Match", "Membership Plans"],
          navLinks: [
            { label: "Direct Register Link", href: "/register?type=couple" },
            { label: "Login Page", href: "/login" }
          ]
        };
      }
      return {
        text: `Creating your profile on Shubvivah takes only a few minutes:\n\n1. Navigate to the **Register** page.\n2. Choose your role: Select **Couple** if you are looking for a life partner or planning your wedding.\n3. Enter your Name, Mobile Number, Email, and Password.\n4. Once registered, log in to your **Couple Dashboard** to add your photographs, career background, and partner preferences.\n\nWedding vendors and bulk suppliers can also join via Vendor or Seller registration tabs!`,
        actions: ["Registration & Login Help", "Find My Perfect Match", "Membership Plans"],
        navLinks: [
          { label: "Register on Shubvivah", href: "/register?type=couple" },
          { label: "Go to Login", href: "/login" }
        ]
      };
    }
  },

  // 5. REGISTRATION & LOGIN HELP / FORGOT PASSWORD
  {
    triggers: [
      "registration & login help", "login help", "forgot password", "password bhul gaya",
      "password reset", "otp", "cannot login", "login issue", "sign in problem",
      "password yaad nahi", "login kaise karein"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `लॉगिन एवं पासवर्ड सहायता:\n\n• **लॉगिन करने के लिए:** अपना पंजीकृत ईमेल या मोबाइल नंबर और पासवर्ड दर्ज करें।\n• **पासवर्ड भूल गए हैं?** 'Forgot Password' लिंक पर क्लिक करें, अपना ईमेल/फ़ोन दर्ज करें, और OTP के माध्यम से तुरंत नया पासवर्ड सेट करें।\n• **सुपर एडमिन:** एडमिन पैनल के लिए सीधे \`/admin\` रूट का उपयोग करें।\n\nयदि आपको कोई तकनीकी समस्या आ रही है, तो हमारी सपोर्ट टीम आपकी तुरंत सहायता करेगी।`,
          actions: ["Contact Support", "How to Create a Profile?", "Find My Perfect Match"],
          navLinks: [
            { label: "Open Login Page", href: "/login" },
            { label: "Reset Password (Forgot Password)", href: "/forgot-password" },
            { label: "Contact Support Team", href: "/contact" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Login aur Password help:\n\n• **Login:** Apna registered Email ya Mobile number aur password enter karein.\n• **Password bhul gaye?** 'Forgot Password' link par click karein, registered email/phone daalein, aur OTP ke zariye turant naya password create karein.\n• **Super Admin:** Dedicated admin dashboard ke liye seedhe \`/admin\` route use karein.\n\nKisi bhi issue me aap hamari support team se seedha sampark kar sakte hain.`,
          actions: ["Contact Support", "How to Create a Profile?", "Find My Perfect Match"],
          navLinks: [
            { label: "Login Page", href: "/login" },
            { label: "Reset Password Link", href: "/forgot-password" },
            { label: "Contact Support", href: "/contact" }
          ]
        };
      }
      return {
        text: `Here is quick help for registration and login:\n\n• **Login:** Use your registered Email or Mobile Number along with your password.\n• **Forgot Password?** Click on the 'Forgot Password' link, enter your registered identifier, and reset your password securely via OTP.\n• **Super Admin:** Admin panel is accessible exclusively at \`/admin\`.\n\nIf you need personal assistance, please connect with our support team!`,
        actions: ["Contact Support", "How to Create a Profile?", "Find My Perfect Match"],
        navLinks: [
          { label: "Login to Shubvivah", href: "/login" },
          { label: "Reset Password", href: "/forgot-password" },
          { label: "Contact Support", href: "/contact" }
        ]
      };
    }
  },

  // 6. MEMBERSHIP PLANS & PRICING
  {
    triggers: [
      "membership plans", "membership", "plans", "pricing", "charges", "fees",
      "kitna kharcha", "subscription", "package", "cost", "free hai kya",
      "premium", "paid"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह पर सदस्यता (Membership) की जानकारी:\n\n• **मुफ़्त प्रोफ़ाइल निर्माण:** वर और वधु के लिए बेसिक रजिस्ट्रेशन, प्रोफ़ाइल बनाना और वेंडर्स एक्सप्लोर करना पूर्णतः मुफ़्त है।\n• **प्रीमियम मैचमेकिंग सेवाएं:** व्यक्तिगत मैचमेकर, गोपनीय कुंडली मिलान और विशेष वेंडर कोटेशन के लिए हमारी टीम अनुकूलित सहायता प्रदान करती है।\n• **पारदर्शिता:** शुभविवाह कभी भी बिना आपकी सहमति के कोई छिपा हुआ शुल्क नहीं लेता।\n\nविस्तृत प्लान्स व विशेष सहायता के लिए आप हमारी टीम से संपर्क कर सकते हैं।`,
          actions: ["Find My Perfect Match", "Contact Support", "How to Create a Profile?"],
          navLinks: [
            { label: "Register for Free", href: "/register?type=couple" },
            { label: "Contact Team for Concierge Plans", href: "/contact" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Shubvivah membership aur plans ki jankari:\n\n• **Free Registration:** Couples aur life partner searchers ke liye account create karna, profile details daalna aur listings explore karna bilkul free hai.\n• **Dedicated Matchmaking Concierge:** Agar aap customized match suggestions, background verification aur wedding vendor coordination chahte hain, toh hamari team dedicated support provide karti hai.\n• **No Hidden Fees:** Shubvivah par koi bina bataye charges nahi hote.\n\nCustom plans aur packages ke liye aap humse seedha sampark kar sakte hain.`,
          actions: ["Find My Perfect Match", "Contact Support", "How to Create a Profile?"],
          navLinks: [
            { label: "Create Free Account", href: "/register?type=couple" },
            { label: "Contact Support for Custom Plans", href: "/contact" }
          ]
        };
      }
      return {
        text: `Shubvivah Membership Information:\n\n• **Free Registration:** Creating a profile, browsing verified vendor listings, and accessing basic planning tools is completely free for couples.\n• **Personalized Matchmaking Support:** We offer bespoke concierge matchmaking and verified vendor negotiations tailored to your family's needs.\n• **100% Transparency:** Shubvivah never charges hidden fees or promotes fabricated pricing.\n\nWould you like personalized matchmaking guidance? Please reach out through our inquiry form or contact page.`,
        actions: ["Find My Perfect Match", "Contact Support", "How to Create a Profile?"],
        navLinks: [
          { label: "Register for Free", href: "/register?type=couple" },
          { label: "Contact Shubvivah Team", href: "/contact" }
        ]
      };
    }
  },

  // 7. PROFILE MANAGEMENT & PRIVACY
  {
    triggers: [
      "profile management", "upload photo", "photo", "privacy", "hide profile",
      "delete profile", "verification", "verified badge", "photo upload",
      "details update", "profile update"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `प्रोफ़ाइल प्रबंधन एवं गोपनीयता (Privacy):\n\n• **फ़ोटो अपलोड:** अपने Couple Dashboard में जाएँ और उच्च गुणवत्ता वाली तस्वीरें अपलोड करें।\n• **गोपनीयता सेटिंग्स:** आप तय कर सकते हैं कि आपका संपर्क नंबर और विवरण कौन देख सकता है। अनधिकृत उपयोगकर्ताओं को निजी जानकारी कभी नहीं दिखाई जाती।\n• **सत्यापन (Verification):** हमारी टीम आईडी और विवरण सत्यापित करके प्रोफ़ाइल पर प्रामाणिक 'Verified Partner' बैज प्रदान करती है।\n• **अपडेट करना:** आप कभी भी अपना बायो, शिक्षा, पेशा और बजट अपडेट कर सकते हैं।`,
          actions: ["How to Create a Profile?", "Registration & Login Help", "Find My Perfect Match"],
          navLinks: [
            { label: "Go to Couple Dashboard", href: "/dashboard/couple" },
            { label: "Account Settings", href: "/login" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Profile management aur privacy:\n\n• **Photo Upload:** Login karke apne Couple Dashboard me jaayein aur clear photos upload karein.\n• **Privacy Settings:** Aap decide kar sakte hain ki aapka contact details kaun dekh sakta hai. Security aur privacy Shubvivah par primary priority hai.\n• **Verified Badge:** Genuine members ko verification ke baad verified badge diya jata hai jisse authenticity aur trust badhta hai.\n• **Edit Profile:** Dashboard me 'Edit Profile' button se kabhi bhi details update karein.`,
          actions: ["How to Create a Profile?", "Registration & Login Help", "Find My Perfect Match"],
          navLinks: [
            { label: "Open Couple Dashboard", href: "/dashboard/couple" }
          ]
        };
      }
      return {
        text: `Profile Management & Privacy Guidelines:\n\n• **Photo Uploads:** Easily upload your high-resolution portrait photographs from your Couple Dashboard.\n• **Privacy Protection:** You retain full control over who views your contact information. Private contact data is strictly shielded from unverified visitors.\n• **Profile Verification:** Our moderation team verifies documents to award genuine trust badges.\n• **Editing Details:** You can modify your education, location, and wedding dates anytime from your dashboard.`,
        actions: ["How to Create a Profile?", "Registration & Login Help", "Find My Perfect Match"],
        navLinks: [
          { label: "Access Couple Dashboard", href: "/dashboard/couple" }
        ]
      };
    }
  },

  // 8. CONTACT & SUPPORT / HUMAN ASSISTANCE
  {
    triggers: [
      "contact support", "contact us", "contact", "support", "help", "customer care",
      "phone number", "email id", "team se baat", "call me", "helpline", "office",
      "address", "human", "real person", "agent"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह सहायता टीम सदैव आपकी सेवा में तत्पर है! 📞\n\n• **हेल्पलाइन:** +91 99999 99999\n• **ईमेल:** support@shubhvivah.com\n• **कार्यालय:** New Delhi & Pan-India\n\nयदि आप चाहते हैं कि हमारी टीम आपसे सीधे संपर्क करे, तो कृपया नीचे दिए गए **क्विक इन्क्वायरी फॉर्म** में अपना नाम और मोबाइल नंबर दर्ज करें। हमारी टीम 24 घंटों में आपसे संपर्क करेगी।`,
          showInquiryForm: true,
          actions: ["Find My Perfect Match", "Registration & Login Help", "Membership Plans"],
          navLinks: [
            { label: "Open Contact Us Page", href: "/contact" }
          ]
        };
      }
      if (lang === "hinglish") {
        return {
          text: `Shubvivah Support Team se judne ke liye: 📞\n\n• **Helpline:** +91 99999 99999\n• **Email:** support@shubhvivah.com\n• **Office:** New Delhi & Pan-India hubs\n\nAgar aap chahte hain ki hamari customer support ya matchmaking team seedhe aapse baat kare, toh please neeche diye gaye quick inquiry form me apni details fill kar dein.`,
          showInquiryForm: true,
          actions: ["Find My Perfect Match", "Registration & Login Help", "Membership Plans"],
          navLinks: [
            { label: "Contact Us Page", href: "/contact" }
          ]
        };
      }
      return {
        text: `We're always here to assist you! 📞\n\n• **Helpline:** +91 99999 99999\n• **Email:** support@shubhvivah.com\n• **Location:** New Delhi & Pan-India\n\nWould you like our support team to call you back? Please share your details through the quick inquiry form below and we will contact you shortly!`,
        showInquiryForm: true,
        actions: ["Find My Perfect Match", "Registration & Login Help", "Membership Plans"],
        navLinks: [
          { label: "Visit Contact Page", href: "/contact" }
        ]
      };
    }
  },

  // 9. VENUES & DESTINATION WEDDINGS
  {
    triggers: [
      "venue", "palace", "fort", "heritage", "resort", "banquet", "destination wedding",
      "marriage hall", "lawn", "udaipur", "jaipur", "hotel"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह पर भारत के सबसे भव्य एवं ऐतिहासिक वेडिंग वेन्यूज उपलब्ध हैं! 🏰\n\n• **हेरिटेज पैलेस एवं किले:** उदयपुर, जयपुर, जोधपुर के शाही महल\n• **लक्जरी बैंक्वेट हॉल्स:** दिल्ली NCR एवं मुंबई के 5-स्टार बैंक्वेट\n• **डेस्टिनेशन वेडिंग रिसॉर्ट्स:** गोवा, ऋषिकेश एवं राजस्थान में लेकसाइड रिसॉर्ट्स\n\nआप सीधे वेन्यूज की क्षमता, मूल्य और उपलब्धता देख सकते हैं।`,
          actions: ["Explore All Verified Vendors", "Find My Perfect Match", "Contact Support"],
          navLinks: [
            { label: "Heritage Palaces & Forts", href: "/venues/heritage-palaces" },
            { label: "Luxury Banquet Halls", href: "/venues/banquet-halls" },
            { label: "Destination Weddings", href: "/venues/destination-weddings" }
          ]
        };
      }
      return {
        text: `Shubvivah brings you royal & premier wedding venues across India! 🏰\n\n• **Heritage Palaces & Forts:** Royal venues in Udaipur, Jaipur, and Jodhpur\n• **Luxury Banquet Halls:** Premium 5-star banquet spaces across Delhi NCR & Mumbai\n• **Destination Wedding Resorts:** Romantic beachside and lakeside venues\n\nYou can browse verified capacities, photos, and request direct quotes!`,
        actions: ["Explore All Verified Vendors", "Find My Perfect Match", "Contact Support"],
        navLinks: [
          { label: "Heritage Palaces & Forts", href: "/venues/heritage-palaces" },
          { label: "Luxury Banquet Halls", href: "/venues/banquet-halls" },
          { label: "Destination Weddings", href: "/venues/destination-weddings" }
        ]
      };
    }
  },

  // 10. WEDDING VENDORS (Photography, Makeup, Planners, Decorators)
  {
    triggers: [
      "vendor", "photographer", "photography", "candid", "cinematography",
      "makeup", "bridal makeup", "mehndi", "henna", "decorator", "mandap",
      "planner", "sherwani", "lehenga", "wear"
    ],
    getReply: (lang) => {
      if (lang === "hindi") {
        return {
          text: `शुभविवाह पर भारत के शीर्ष सत्यापित वेडिंग प्रोफेशनल्स उपलब्ध हैं:\n\n📸 **कैंडिड फ़ोटोग्राफ़ी एवं सिनेमा:** रॉयल पैलेस व डेस्टिनेशन स्पेशलिस्ट्स\n💄 **ब्राइडल मेकअप आर्टिस्ट्स:** एचडी एवं एयरब्रश मेकअप स्टाइलिस्ट्स\n🌺 **डेकोरेशन एवं मंडप:** लक्जरी फ्लोरल व थीम वेडिंग डेकोरेटर्स\n📋 **वेडिंग प्लानर्स:** संपूर्ण शादी प्रबंधन टीम\n👗 **ब्राइडल एवं ग्रूम वियर:** डिज़ाइनर लहंगे व हाथ से सिला राजपूती शेरवानी`,
          actions: ["Explore All Verified Vendors", "Find My Perfect Match", "Contact Support"],
          navLinks: [
            { label: "All Verified Vendors Directory", href: "/vendors" },
            { label: "Wedding Photographers", href: "/wedding-vendors/wedding-photography" },
            { label: "Bridal Makeup Artists", href: "/wedding-vendors/bridal-makeup-artist" },
            { label: "Mandap Decorators", href: "/wedding-vendors/decoration" }
          ]
        };
      }
      return {
        text: `Discover India's top verified wedding professionals on Shubvivah:\n\n📸 **Candid Photography & Cinema:** Award-winning royal documentary teams\n💄 **Bridal Makeup Artists:** HD, Airbrush, and celebrity glam artists\n🌺 **Floral Decor & Mandap:** Luxury bespoke stage and royal floral setups\n📋 **Wedding Planners:** Turnkey event coordinators\n👗 **Bridal & Groom Wear:** Bespoke lehengas and royal silk sherwanis`,
        actions: ["Explore All Verified Vendors", "Find My Perfect Match", "Contact Support"],
        navLinks: [
          { label: "Explore All Verified Vendors", href: "/vendors" },
          { label: "Candid Photography", href: "/wedding-vendors/wedding-photography" },
          { label: "Bridal Makeup", href: "/wedding-vendors/bridal-makeup-artist" },
          { label: "Decorators", href: "/wedding-vendors/decoration" }
        ]
      };
    }
  }
];

// Helper to detect language
function detectLanguage(text) {
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) return "hindi";

  const lower = text.toLowerCase();
  const hinglishKeywords = [
    "kese", "kaise", "kya", "kyu", "kyun", "kripya", "mujhe", "chahiye",
    "batao", "bataiye", "karna", "karein", "hai", "hain", "shadi", "shaadi",
    "rishta", "dulha", "dulhan", "ladki", "ladka", "dhundhna", "nahi", "par",
    "aao", "baat", "karo", "dhanyawad", "shukriya"
  ];

  const words = lower.split(/\s+/);
  const isHinglish = words.some((w) => hinglishKeywords.includes(w));
  return isHinglish ? "hinglish" : "english";
}

// Fallback response for unknown query
function getFallbackResponse(lang) {
  if (lang === "hindi") {
    return {
      text: `माफ़ कीजिये, मुझे आपके प्रश्न की सटीक जानकारी नहीं मिली।\n\nक्या आप चाहेंगे कि हमारी **शुभविवाह सहायता एवं मैचमेकिंग टीम** आपसे सीधे संपर्क करे? कृपया नीचे दिए गए फ़ॉर्म में अपना विवरण साझा करें।`,
      showInquiryForm: true,
      actions: ["Find My Perfect Match", "Search Matrimonial Profiles", "Contact Support"],
      navLinks: [{ label: "Contact Shubvivah Team", href: "/contact" }]
    };
  }
  if (lang === "hinglish") {
    return {
      text: `I'm sorry, mujhe aapke sawaal ki exact jankari nahi mili.\n\nKya aap chahenge ki hamari **Shubvivah Support & Matchmaking Team** seedhe aapse connect kare? Please neeche quick inquiry form me apni details share kar dein.`,
      showInquiryForm: true,
      actions: ["Find My Perfect Match", "Search Matrimonial Profiles", "Contact Support"],
      navLinks: [{ label: "Open Contact Support", href: "/contact" }]
    };
  }
  return {
    text: `I'm sorry, I couldn't find the exact information regarding your question.\n\nWould you like me to connect you with the **Shubvivah Support & Matchmaking Team**? Please share your details through the quick inquiry form below.`,
    showInquiryForm: true,
    actions: ["Find My Perfect Match", "Search Matrimonial Profiles", "Contact Support"],
    navLinks: [{ label: "Contact Shubvivah Support", href: "/contact" }]
  };
}

// -----------------------------------------------------------------------------
// POST /api/sathi-chat
// -----------------------------------------------------------------------------
export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          reply: "You have sent messages too quickly. Please pause for a moment and try again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, reply: "Please enter a message." },
        { status: 400 }
      );
    }

    const cleanMessage = message.trim();
    const lowerMessage = cleanMessage.toLowerCase();
    const lang = detectLanguage(cleanMessage);

    // 1. Check for genuine external LLM API (Gemini API) if configured
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const systemInstruction = `You are "Sathi", an intelligent, polite, respectful, and trustworthy matrimonial and luxury wedding assistant for the website "Shubvivah" (Tagline: "Your Companion in Finding the Perfect Life Partner").
Key Rules:
1. Always communicate respectfully like a warm, cultured relationship and wedding matchmaking companion.
2. Understand English, Hindi, and Hinglish. Automatically reply in the user's language (${lang}).
3. Explain profile searching, partner preferences (age, city, education, profession, marital status), free couple registration at /register?type=couple, login at /login, password reset at /forgot-password, and vendor directory at /vendors.
4. If a user asks for personal assistance, match suggestions, or to speak with the team, encourage them to fill the inquiry form.
5. NEVER invent false prices, discounts, or fake phone numbers. Always use /contact for support.
6. If you do not know an exact answer, politely apologize and suggest connecting with the support team.
Keep responses concise, formatted with clear bullet points, and friendly.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: systemInstruction },
                  ...conversationHistory.slice(-4).map((h) => ({ text: `${h.sender}: ${h.text}` })),
                  { text: `User query: ${cleanMessage}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 500,
            }
          }),
        });

        if (response.ok) {
          const aiData = await response.json();
          const candidateText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const needsInquiry = lowerMessage.includes("match") || lowerMessage.includes("contact") || lowerMessage.includes("help") || lowerMessage.includes("call");
            return NextResponse.json({
              success: true,
              reply: candidateText,
              showInquiryForm: needsInquiry,
              actions: ["Find My Perfect Match", "Search Matrimonial Profiles", "How to Create a Profile?"],
              navLinks: [
                { label: "Create Profile", href: "/register?type=couple" },
                { label: "Verified Vendors", href: "/vendors" }
              ]
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to built-in knowledge engine:", geminiError.message);
      }
    }

    // 2. Built-in High-Accuracy Matrimonial & Wedding Knowledge Reasoning Engine
    for (const item of KNOWLEDGE_RESPONSES) {
      const isMatch = item.triggers.some((trigger) => {
        // exact word or phrase boundary match
        const regex = new RegExp(`(^|\\b|\\s)${trigger}(\\b|\\s|$)`, "i");
        return regex.test(lowerMessage) || lowerMessage.includes(trigger);
      });

      if (isMatch) {
        const result = item.getReply(lang);
        return NextResponse.json({
          success: true,
          reply: result.text,
          showInquiryForm: Boolean(result.showInquiryForm),
          actions: result.actions || ["Find My Perfect Match", "Search Matrimonial Profiles"],
          navLinks: result.navLinks || []
        });
      }
    }

    // 3. Fallback response for unmapped questions
    const fallback = getFallbackResponse(lang);
    return NextResponse.json({
      success: true,
      reply: fallback.text,
      showInquiryForm: true,
      actions: fallback.actions,
      navLinks: fallback.navLinks
    });

  } catch (error) {
    console.error("Sathi Chat API Error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "I encountered a brief connection issue. Please feel free to ask again or share your inquiry below.",
        showInquiryForm: true,
      },
      { status: 500 }
    );
  }
}

