"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  Minus,
  Trash2,
  Sparkles,
  Send,
  Heart,
  User,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

// Helper ID & timestamp generators (declared outside component)
let messageCounter = 0;
const generateMsgId = (prefix = "msg") => {
  messageCounter += 1;
  return `${prefix}-${Date.now()}-${messageCounter}`;
};

const getTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Sathi Avatar SVG / Image Component
function SathiAvatar({ size = "md", isOnline = true }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg",
  };

  return (
    <div className="relative shrink-0">
      {/* Subtle Golden Glow Halo behind Avatar */}
      <span className="absolute -inset-1 rounded-full bg-[#FFE29A]/40 blur-sm animate-pulse pointer-events-none" />
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full bg-gradient-to-br from-[#FFE29A] via-[#D6B875] to-[#7A5B28] p-[2px] shadow-[0_0_14px_rgba(214,184,117,0.6)] relative z-10`}
      >
        <div className="w-full h-full rounded-full bg-[#1F0E1D] flex items-center justify-center font-serif font-bold text-[#F8F1E5] relative overflow-hidden">
          {/* Golden background light beam */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,226,154,0.35)_0%,transparent_75%)]" />
          <span className="relative flex items-center gap-0.5 tracking-wider">
            <span className="text-[#FFE29A] drop-shadow-[0_0_4px_rgba(255,226,154,0.9)]">सा</span>थी
          </span>
        </div>
      </div>
      {isOnline && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1F0E1D] shadow-[0_0_6px_#10b981] animate-pulse z-20"
          title="Sathi is Active & Ready"
        />
      )}
    </div>
  );
}

// Quick action chips
const QUICK_ACTIONS = [
  { id: "match", label: "Find My Perfect Match", icon: Heart },
  { id: "search", label: "Search Matrimonial Profiles", icon: Sparkles },
  { id: "create", label: "How to Create a Profile?", icon: User },
  { id: "auth", label: "Registration & Login Help", icon: ShieldCheck },
  { id: "plans", label: "Membership Plans", icon: Calendar },
  { id: "support", label: "Contact Support", icon: Phone },
];

export default function SathiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "sathi",
      text: "Namaste! 🙏 Welcome to Shubvivah.\n\nI'm **Sathi**, your personal matchmaking assistant.\n\nHow can I help you find your perfect life partner today?",
      timestamp: "Just now",
      actions: [
        "Find My Perfect Match",
        "Search Matrimonial Profiles",
        "How to Create a Profile?",
        "Membership Plans",
      ],
      navLinks: [
        { label: "Create Free Matrimonial Profile", href: "/register?type=couple" },
      ],
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Inquiry form fields
  const [inquiryForm, setInquiryForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    lookingFor: "Bride",
    age: "",
    preferredLocation: "",
    query: "",
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, showInquiryForm, isOpen, isMinimized]);

  // Load chat history from localStorage on mount and trigger teaser
  useEffect(() => {
    const historyTimer = setTimeout(() => {
      try {
        const savedHistory = localStorage.getItem("shubhvivah_sathi_chat_history");
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            setHasInteracted(true);
          }
        }
      } catch {}
    }, 0);

    const teaserTimer = setTimeout(() => {
      try {
        const alreadyOpened = sessionStorage.getItem("shubhvivah_sathi_opened");
        if (!alreadyOpened) {
          setShowTeaser(true);
        }
      } catch {}
    }, 3000);

    return () => {
      clearTimeout(historyTimer);
      clearTimeout(teaserTimer);
    };
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (hasInteracted && messages.length > 1) {
      try {
        localStorage.setItem(
          "shubhvivah_sathi_chat_history",
          JSON.stringify(messages.slice(-25))
        );
      } catch {}
    }
  }, [messages, hasInteracted]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      try {
        sessionStorage.setItem("shubhvivah_sathi_opened", "true");
      } catch {}
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  // Handle User Message Submission
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    setHasInteracted(true);
    setInputText("");

    const userMessage = {
      id: generateMsgId("user"),
      sender: "user",
      text: text,
      timestamp: getTimestamp(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/sathi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: newHistory.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.success) {
        const sathiMessage = {
          id: generateMsgId("sathi"),
          sender: "sathi",
          text: data.reply,
          timestamp: getTimestamp(),
          actions: data.actions || [],
          navLinks: data.navLinks || [],
        };
        setMessages((prev) => [...prev, sathiMessage]);

        if (data.showInquiryForm) {
          setShowInquiryForm(true);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: generateMsgId("sathi"),
            sender: "sathi",
            text: data.reply || "I'm having trouble connecting right now. Would you like our support team to contact you?",
            timestamp: getTimestamp(),
            navLinks: [{ label: "Contact Support Team", href: "/contact" }],
          },
        ]);
        if (data.showInquiryForm) {
          setShowInquiryForm(true);
        }
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId("sathi"),
          sender: "sathi",
          text: "I'm experiencing a brief network hiccup. You can directly connect with our support team or try asking again.",
          timestamp: getTimestamp(),
          navLinks: [{ label: "Visit Support Page", href: "/contact" }],
        },
      ]);
    }
  };

  // Handle Quick Action Click
  const handleQuickAction = (label) => {
    handleSendMessage(label);
  };

  // Clear Chat History
  const handleClearChat = () => {
    if (window.confirm("Do you want to reset your conversation with Sathi?")) {
      const initialWelcome = [
        {
          id: generateMsgId("welcome"),
          sender: "sathi",
          text: "Namaste! 🙏 Welcome back to Shubvivah.\n\nI'm **Sathi**, your personal matchmaking assistant.\n\nHow can I help you find your perfect life partner today?",
          timestamp: getTimestamp(),
          actions: [
            "Find My Perfect Match",
            "Search Matrimonial Profiles",
            "How to Create a Profile?",
            "Membership Plans",
          ],
          navLinks: [
            { label: "Create Free Matrimonial Profile", href: "/register?type=couple" },
          ],
        },
      ];
      setMessages(initialWelcome);
      setShowInquiryForm(false);
      try {
        localStorage.removeItem("shubhvivah_sathi_chat_history");
      } catch {}
    }
  };

  // Handle Lead Inquiry Form Submission
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryError("");

    if (!inquiryForm.fullName.trim() || inquiryForm.fullName.trim().length < 2) {
      setInquiryError("Please enter your full name.");
      return;
    }

    const cleanPhone = inquiryForm.mobileNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setInquiryError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!inquiryForm.query.trim()) {
      setInquiryError("Please provide your partner preferences or query.");
      return;
    }

    setInquirySubmitting(true);

    try {
      const summary = messages
        .slice(-4)
        .map((m) => `${m.sender}: ${m.text}`)
        .join(" | ");

      const res = await fetch("/api/sathi-chat/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiryForm,
          mobileNumber: cleanPhone,
          conversationSummary: summary,
        }),
      });

      const data = await res.json();
      setInquirySubmitting(false);

      if (data.success) {
        setShowInquiryForm(false);
        setInquiryForm({
          fullName: "",
          mobileNumber: "",
          email: "",
          lookingFor: "Bride",
          age: "",
          preferredLocation: "",
          query: "",
        });

        // Add confirmation message from Sathi to the chat
        const confirmationMessage = {
          id: generateMsgId("sathi-confirm"),
          sender: "sathi",
          text: `${data.message}\n\nOur matchmaking advisor has received your request. In the meantime, you can also explore our verified vendor directory or create your free profile.`,
          timestamp: getTimestamp(),
          navLinks: [
            { label: "Create Matrimonial Profile", href: "/register?type=couple" },
            { label: "Explore Verified Vendors", href: "/vendors" },
          ],
        };
        setMessages((prev) => [...prev, confirmationMessage]);
      } else {
        setInquiryError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setInquirySubmitting(false);
      setInquiryError("Network error. Please try again or reach us at +91 99999 99999.");
    }
  };

  // Helper to render formatted markdown-like text
  const renderMessageContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      // Bold handling: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <p key={idx} className={`${idx > 0 && line.trim() === "" ? "h-2" : "leading-relaxed"}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-[#D6B875]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* --------------------------------------------------------------------- */}
      {/* 1. FLOATING CHATBOT ICON (EXTREME BOTTOM-RIGHT CORNER)                 */}
      {/* --------------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Teaser Greeting Popup Bubble */}
          {showTeaser && (
            <div className="mb-3 max-w-[280px] p-4 rounded-2xl bg-[#1F0E1D] border border-[#B08D45]/60 text-xs shadow-2xl backdrop-blur-md animate-bounce-subtle relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="absolute top-2 right-2 text-[#C9BBAF] hover:text-[#F8F1E5] p-1"
                title="Dismiss"
              >
                <X size={12} />
              </button>
              <div className="flex items-start gap-2.5">
                <SathiAvatar size="sm" />
                <div>
                  <p className="font-bold text-[#D6B875] text-[11px] uppercase tracking-wide">
                    Sathi • Matchmaking AI
                  </p>
                  <p className="text-[#F8F1E5] text-xs mt-0.5 leading-snug">
                    Namaste! Looking for a life partner or wedding vendor? Tap to chat with me! 🙏
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex justify-end">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setShowTeaser(false);
                  }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] text-[11px] font-bold hover:brightness-110 flex items-center gap-1 shadow"
                >
                  <span>Chat Now</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {/* Circular Chat Trigger Button with Golden Light Glow */}
          <div className="relative flex items-center justify-center">
            {/* Layer 1: Expanding Outer Golden Aura Rings */}
            <span
              className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#B08D45] via-[#FFE29A] to-[#D6B875] blur-xl sathi-golden-aura-ring pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -inset-2.5 rounded-full bg-[#FFE29A] blur-lg sathi-golden-aura-ring-delayed pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#B08D45] via-[#FFF5D0] to-[#B08D45] blur-md opacity-90 animate-pulse pointer-events-none"
              aria-hidden="true"
            />

            {/* Layer 2: Rotating Golden Shimmer Halo Ring */}
            <span
              className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,#B08D45,#FFF2C2,#D6B875,#7A5B28,#FFE29A,#B08D45)] sathi-golden-shimmer-spin opacity-95 pointer-events-none"
              aria-hidden="true"
            />

            {/* Layer 3: Main Glowing Floating Button */}
            <button
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
                setShowTeaser(false);
              }}
              className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full sathi-golden-glow-btn transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="Open Sathi Matrimonial Assistant"
              title="Chat with Sathi - Matrimonial AI Assistant"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2B1327] to-[#160814] border border-[#FFE29A]/70 flex items-center justify-center relative overflow-hidden group-hover:from-[#351831] group-hover:to-[#1F0E1D] transition-colors">
                {/* Radial golden light burst from center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,226,154,0.45)_0%,rgba(176,141,69,0.25)_45%,transparent_75%)] animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#B08D45]/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Sparkling Icon with golden glowing drop-shadow */}
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <MessageCircle
                      size={24}
                      className="text-[#FFE29A] drop-shadow-[0_0_8px_rgba(255,226,154,0.95)] group-hover:scale-110 transition-transform"
                    />
                    <Sparkles
                      size={11}
                      className="absolute -top-1.5 -right-2 text-[#FFF5D0] animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.95)]"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#FFF5D0] tracking-wider mt-0.5 drop-shadow-[0_0_5px_rgba(214,184,117,0.85)] font-serif">
                    Sathi
                  </span>
                </div>

                {/* Active Green Dot with glowing indicator */}
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#160814] shadow-[0_0_8px_#34d399] animate-pulse" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. CHAT WINDOW (MODAL ON DESKTOP & RESPONSIVE DRAWER ON MOBILE)        */}
      {/* --------------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[410px] md:w-[430px] rounded-3xl border border-[#B08D45]/40 bg-[#1F0E1D] shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-xl ${
            isMinimized ? "h-16" : "h-[610px] max-h-[88vh]"
          }`}
          role="dialog"
          aria-label="Sathi AI Chat Window"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#241321] via-[#1F0E1D] to-[#2B1428] border-b border-[#B08D45]/30 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <SathiAvatar size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-base text-[#F8F1E5] tracking-wide">
                    Sathi
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#B08D45]/20 text-[#D6B875] border border-[#B08D45]/30">
                    AI Matrimonial Companion
                  </span>
                </div>
                <p className="text-[10px] text-[#C9BBAF] truncate max-w-[210px] sm:max-w-[240px]">
                  Your Companion in Finding the Perfect Life Partner
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              {/* Reset / Clear Chat */}
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-[#C9BBAF] hover:text-[#D6B875] hover:bg-[#321B30] transition-colors"
                title="Clear Chat History"
              >
                <Trash2 size={15} />
              </button>

              {/* Minimize / Expand */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[#C9BBAF] hover:text-[#D6B875] hover:bg-[#321B30] transition-colors"
                title={isMinimized ? "Expand Chat" : "Minimize Chat"}
              >
                <Minus size={15} />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#C9BBAF] hover:text-rose-400 hover:bg-[#321B30] transition-colors"
                title="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body (Hidden if Minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#140A13]/60 scroll-smooth">
                {messages.map((msg) => {
                  const isSathi = msg.sender === "sathi";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isSathi ? "items-start" : "items-end"}`}
                    >
                      <div className={`flex gap-2.5 max-w-[88%] ${isSathi ? "flex-row" : "flex-row-reverse"}`}>
                        {isSathi && <SathiAvatar size="sm" />}

                        <div>
                          {/* Message Bubble */}
                          <div
                            className={`p-3.5 rounded-2xl text-xs ${
                              isSathi
                                ? "bg-[#241321] text-[#F8F1E5] border border-[#B08D45]/30 rounded-tl-sm shadow-md shadow-black/30"
                                : "bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-medium rounded-tr-sm shadow-md shadow-[#B08D45]/20"
                            }`}
                          >
                            {renderMessageContent(msg.text)}
                          </div>

                          {/* Navigation Action Links (if returned by Sathi) */}
                          {isSathi && msg.navLinks && msg.navLinks.length > 0 && (
                            <div className="mt-2 space-y-1.5">
                              {msg.navLinks.map((link, lIdx) => (
                                <Link
                                  key={lIdx}
                                  href={link.href}
                                  onClick={() => {
                                    // Keep chat intact, let user navigate
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2B1428] border border-[#B08D45]/40 text-[11px] font-semibold text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] transition-all shadow-sm group"
                                >
                                  <span>{link.label}</span>
                                  <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Timestamp */}
                          <span className="text-[9px] text-[#C9BBAF]/70 mt-1 block px-1">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Sathi Typing Animation */}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <SathiAvatar size="sm" />
                    <div className="px-4 py-3 rounded-2xl bg-[#241321] border border-[#B08D45]/30 text-xs text-[#D6B875] flex items-center gap-1.5 shadow">
                      <span className="text-[11px] text-[#C9BBAF] mr-1">Sathi is thinking</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B875] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* 3. INTERACTIVE INQUIRY & LEAD GENERATION FORM CARD                */}
                {/* ----------------------------------------------------------------- */}
                {showInquiryForm && (
                  <div className="p-4 rounded-2xl bg-gradient-to-b from-[#241321] to-[#1A0B18] border border-[#B08D45]/60 shadow-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-[#B08D45]/20">
                      <div className="flex items-center gap-1.5">
                        <Heart size={14} className="text-[#D6B875] fill-[#D6B875]/30" />
                        <h4 className="text-xs font-serif font-bold text-[#F8F1E5]">
                          Shubvivah Personal Matchmaking Request
                        </h4>
                      </div>
                      <button
                        onClick={() => setShowInquiryForm(false)}
                        className="text-[#C9BBAF] hover:text-[#F8F1E5]"
                        title="Close Form"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#C9BBAF] leading-relaxed">
                      Please share your details. Our verified relationship advisor will personally reach out with handpicked profiles.
                    </p>

                    {inquiryError && (
                      <div className="p-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-[11px] flex items-center gap-1.5">
                        <AlertCircle size={13} className="shrink-0 text-red-400" />
                        <span>{inquiryError}</span>
                      </div>
                    )}

                    <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryForm.fullName}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma / Ananya Verma"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      {/* Mobile & Email in 2 columns */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                            Mobile No. *
                          </label>
                          <input
                            type="tel"
                            required
                            value={inquiryForm.mobileNumber}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, mobileNumber: e.target.value })}
                            placeholder="10-digit number"
                            className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
                            value={inquiryForm.email}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                          />
                        </div>
                      </div>

                      {/* Looking For & Age */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                            Looking For *
                          </label>
                          <div className="grid grid-cols-2 gap-1">
                            <button
                              type="button"
                              onClick={() => setInquiryForm({ ...inquiryForm, lookingFor: "Bride" })}
                              className={`py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                inquiryForm.lookingFor === "Bride"
                                  ? "bg-[#B08D45] text-[#1F0E1D] border-[#B08D45]"
                                  : "bg-[#140A13] text-[#C9BBAF] border-[#B08D45]/30 hover:text-white"
                              }`}
                            >
                              Bride (वधु)
                            </button>
                            <button
                              type="button"
                              onClick={() => setInquiryForm({ ...inquiryForm, lookingFor: "Groom" })}
                              className={`py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                inquiryForm.lookingFor === "Groom"
                                  ? "bg-[#B08D45] text-[#1F0E1D] border-[#B08D45]"
                                  : "bg-[#140A13] text-[#C9BBAF] border-[#B08D45]/30 hover:text-white"
                              }`}
                            >
                              Groom (वर)
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                            Preferred Age / Range
                          </label>
                          <input
                            type="text"
                            value={inquiryForm.age}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, age: e.target.value })}
                            placeholder="e.g. 25-28 Yrs"
                            className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                          />
                        </div>
                      </div>

                      {/* Preferred Location */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                          Preferred Location / City
                        </label>
                        <input
                          type="text"
                          value={inquiryForm.preferredLocation}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, preferredLocation: e.target.value })}
                          placeholder="e.g. Delhi NCR, Jaipur, Mumbai, NRI, Pan-India"
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      {/* Query / Requirements */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6B875] mb-1">
                          Match Requirements / Preferences *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={inquiryForm.query}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, query: e.target.value })}
                          placeholder="e.g. Looking for a vegetarian software engineer in Delhi NCR with good family values..."
                          className="w-full bg-[#140A13] border border-[#B08D45]/30 rounded-xl px-3 py-1.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/40 outline-none focus:border-[#D6B875]"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={inquirySubmitting}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] font-bold text-xs shadow-md hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {inquirySubmitting ? (
                          <span>Submitting Inquiry...</span>
                        ) : (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Request Matchmaking Assistance</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Action Suggestion Chips */}
              <div className="px-3 pt-2 pb-1 bg-[#1A0B18] border-t border-[#B08D45]/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.label)}
                      className="px-2.5 py-1 rounded-full bg-[#241321] border border-[#B08D45]/30 text-[10px] font-medium text-[#D6B875] hover:bg-[#B08D45] hover:text-[#1F0E1D] whitespace-nowrap transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <Icon size={11} />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#1F0E1D] border-t border-[#B08D45]/30 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask in English or हिंदी / Hinglish..."
                  className="flex-1 bg-[#140A13] border border-[#B08D45]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#F8F1E5] placeholder-[#C9BBAF]/50 outline-none focus:border-[#D6B875]"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#B08D45] to-[#D6B875] text-[#1F0E1D] flex items-center justify-center hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer shrink-0"
                  title="Send message"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>

              {/* Footer status text */}
              <div className="px-3 py-1 bg-[#140A13] text-[9px] text-center text-[#C9BBAF]/60 border-t border-[#B08D45]/10">
                Sathi AI • Supports English, हिंदी & Hinglish • 100% Privacy Protected
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
