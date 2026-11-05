import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SathiChatbot from "@/components/SathiChatbot";

export const metadata = {
  title: {
    default: "ShubhVivah | Luxury Indian Wedding Marketplace",
    template: "%s | ShubhVivah",
  },
  description:
    "Discover extraordinary heritage wedding venues, renowned bridal artists, celebrity photographers, and premier wedding planners with ShubhVivah.",
  keywords: [
    "luxury wedding planning",
    "Indian wedding marketplace",
    "royal wedding venues",
    "wedding photographers",
    "bridal makeup artists",
    "palace weddings",
    "ShubhVivah",
  ],
  applicationName: "ShubhVivah",
  icons: {
    icon: "/shubhvivah-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#241321] font-sans text-[#F8F1E5] antialiased selection:bg-[#B08D45] selection:text-[#241321]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SathiChatbot />
      </body>
    </html>
  );
}
