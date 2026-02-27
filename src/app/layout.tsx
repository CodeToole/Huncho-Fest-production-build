import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huncho Fest | Mobile, AL Mardi Gras Hip-Hop Festival",
  description: "Experience the biggest hip-hop event of the Mardi Gras season in Mobile, AL. Tickets, artist registration, and live media for Huncho Fest at Mardi Gras Park.",
  keywords: ["Huncho Fest", "Mobile Alabama", "Mardi Gras", "Hip-Hop Festival", "AL Hip-Hop", "Mardi Gras Park", "Live Music Mobile AL"],
  metadataBase: new URL("https://hunchofest.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Huncho Fest | Mobile, AL Mardi Gras Hip-Hop Festival",
    description: "The premier hip-hop festival in the heart of Mobile, AL during Mardi Gras.",
    url: "https://hunchofest.com",
    siteName: "Huncho Fest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Huncho Fest Mobile AL",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huncho Fest | Mobile, AL Mardi Gras Hip-Hop Festival",
    description: "The premier hip-hop festival in the heart of Mobile, AL during Mardi Gras.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-charcoal text-white`}
      >
        {children}
        <GoogleAnalytics gaId="G-RF7EWSK3GW" />
      </body>
    </html>
  );
}
