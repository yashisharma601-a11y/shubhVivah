import VenueDetailClient from "./VenueDetailClient";
import { ALL_VENUES, getVenueBySlug } from "@/data/venuesData";

export function generateStaticParams() {
  return [
    { slug: "grand-palace-banquet" },
    { slug: "royal-orchid-banquet-hall" },
    { slug: "the-celebration-garden" },
    { slug: "golden-crown-wedding-hall" },
    { slug: "imperial-grand-banquet" },
    { slug: "royal-heritage-wedding-venue" },
    { slug: "pearl-grand-celebration-hall" },
    { slug: "the-grand-regal-palace-resort" },
    { slug: "neemrana-fort-palace" },
    { slug: "samode-palace-jaipur" },
    { slug: "chomu-palace-jaipur" },
    { slug: "alila-fort-bishangarh" },
    { slug: "jaisalmer-fort-wedding" },
    { slug: "mehrangarh-fort-jodhpur" },
    { slug: "kumbhalgarh-fort-rajasthan" },
    { slug: "umaid-bhawan-palace-resort" },
    { slug: "banquet-halls" },
    { slug: "heritage-palaces" },
    { slug: "destination-weddings" },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);

  return {
    title: `${venue.name} — Luxury Wedding Venue Portfolio | ShubhVivah`,
    description: `Explore the royal wedding portfolio of ${venue.name} in ${venue.location}. Grand crystal ballrooms, wedding stages, guest capacity, pricing, and direct booking inquiries.`,
    openGraph: {
      title: `${venue.name} | ShubhVivah Royal Wedding Venues`,
      description: venue.about,
      images: [
        {
          url: venue.coverImage,
          width: 1200,
          height: 630,
          alt: venue.name,
        },
      ],
    },
  };
}

export default async function VenuePortfolioDetailPage({ params }) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  return <VenueDetailClient venue={venue} slug={slug} />;
}
