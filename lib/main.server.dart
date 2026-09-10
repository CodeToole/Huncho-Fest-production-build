/// The entrypoint for the **server** environment.
///
/// The [main] method will only be executed on the server during pre-rendering.
library;

import 'package:jaspr/dom.dart';
import 'package:jaspr/server.dart';

import 'app.dart';
import 'main.server.options.dart';

void main() {
  Jaspr.initializeApp(
    options: defaultServerOptions,
  );

  runApp(Document(
    title: 'Huncho Fest | Largest Music Festival in Mobile, AL',
    meta: {
      'description':
          'Experience the biggest music festival in Mobile, AL. Tickets, artist registration, and live media for Huncho Fest at Mardi Gras Park.',
      'viewport': 'width=device-width, initial-scale=1.0',
      'og:title': 'Huncho Fest | Largest Music Festival in Mobile, AL',
      'og:description':
          'The biggest music festival in the heart of Mobile, AL.',
      'og:url': 'https://hunchofest.com',
      'og:image': '/og-image.jpg',
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
    },
    head: [
      link(rel: 'stylesheet', href: 'styles.css'),
      link(rel: 'preconnect', href: 'https://fonts.googleapis.com'),
      link(
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        attributes: {'crossorigin': ''},
      ),
      link(
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap',
      ),
      const RawText('''
<script type="application/ld+json">
{
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
}
</script>
'''),
    ],
    body: const App(),
  ));
}
