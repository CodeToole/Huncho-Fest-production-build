import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NMBG Jay Presents: Huncho Fest | The Underground Block Party",
  description:
    "NMBG Jay Presents: Huncho Fest - The Underground Block Party on Saturday, October 10, 2026 at 350 N Broad St, Mobile, AL. $10 entry, live music, vendor market, artist panel, and performance giveaways.",
  openGraph: {
    title: "NMBG Jay Presents: Huncho Fest | The Underground Block Party",
    description:
      "Saturday, October 10, 2026 • 3 PM TIL at 350 N Broad St, Mobile, AL. $10 Entry.",
    url: "https://hunchofest.com",
    siteName: "Huncho Fest",
    images: [
      {
        url: "https://hunchofest.com/flyer.jpg",
        width: 1200,
        height: 630,
        alt: "Huncho Fest Official Flyer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NMBG Jay Presents: Huncho Fest | The Underground Block Party",
    description:
      "Saturday, October 10, 2026 • 3 PM TIL at 350 N Broad St, Mobile, AL. $10 Entry.",
    images: ["https://hunchofest.com/flyer.jpg"],
  },
  metadataBase: new URL("https://hunchofest.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: "NMBG Jay Presents: Huncho Fest",
  description:
    "The Underground Block Party featuring live music, artist panel, local vendors, and free performance giveaways.",
  startDate: "2026-10-10T15:00:00-05:00",
  endDate: "2026-10-11T00:00:00-05:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Huncho Fest Block Party Grounds",
    address: {
      "@type": "PostalAddress",
      streetAddress: "350 N Broad St",
      addressLocality: "Mobile",
      addressRegion: "AL",
      postalCode: "36603",
      addressCountry: "US",
    },
  },
  offers: {
    "@type": "Offer",
    price: "10",
    priceCurrency: "USD",
    url: "https://hunchofest.com",
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
