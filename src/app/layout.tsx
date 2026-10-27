import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NMBG Jay Presents: Huncho Fest | Alabama Music Box",
  description:
    "NMBG Jay Presents: Huncho Fest at Alabama Music Box on Saturday, November 28, 2026 at 659 Conti St, Mobile, AL 36602. $15 tickets, featuring DJ Oktoba, live music, vendor market, and panel.",
  openGraph: {
    title: "NMBG Jay Presents: Huncho Fest | Alabama Music Box",
    description:
      "Saturday, November 28, 2026 • 6 PM at Alabama Music Box (659 Conti St, Mobile, AL 36602). $15 Tickets.",
    url: "https://hunchofest.com",
    siteName: "Huncho Fest",
    images: [
      {
        url: "https://hunchofest.com/flyer.jpg",
        width: 791,
        height: 1024,
        alt: "Huncho Fest Official Flyer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NMBG Jay Presents: Huncho Fest | Alabama Music Box",
    description:
      "Saturday, November 28, 2026 • 6 PM at Alabama Music Box (659 Conti St, Mobile, AL 36602). $15 Tickets.",
    images: ["https://hunchofest.com/flyer.jpg"],
  },
  metadataBase: new URL("https://hunchofest.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: "NMBG Jay Presents: Huncho Fest",
  description:
    "NMBG Jay Presents: Huncho Fest featuring DJ Oktoba, live music, artist panel, and local vendors.",
  startDate: "2026-11-28T18:00:00-06:00",
  endDate: "2026-11-29T00:00:00-06:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Alabama Music Box",
    address: {
      "@type": "PostalAddress",
      streetAddress: "659 Conti St",
      addressLocality: "Mobile",
      addressRegion: "AL",
      postalCode: "36602",
      addressCountry: "US",
    },
  },
  offers: {
    "@type": "Offer",
    price: "15",
    priceCurrency: "USD",
    url: "https://www.ticketweb.com/event/hunchofest-presented-by-nmbg-jay-alabama-music-box-tickets/14372824",
    availability: "https://schema.org/InStock",
  },
  image: ["https://hunchofest.com/flyer.jpg"],
  organizer: {
    "@type": "Organization",
    name: "NMBG Jay",
    url: "https://instagram.com/nmbgjay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
