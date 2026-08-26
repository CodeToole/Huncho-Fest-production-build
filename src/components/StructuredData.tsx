export default function StructuredData() {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": "Huncho Fest",
    "description": "The biggest music festival in the heart of Mobile, AL at Mardi Gras Park.",
    "startDate": "2026-03-15T18:00:00-05:00",
    "endDate": "2026-03-16T00:00:00-05:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Mardi Gras Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "104-148 S Royal St",
        "addressLocality": "Mobile",
        "addressRegion": "AL",
        "postalCode": "36602",
        "addressCountry": "US"
      }
    },
    "image": [
      "https://hunchofest.com/og-image.jpg"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "Huncho Fest",
      "url": "https://hunchofest.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
    />
  );
}
