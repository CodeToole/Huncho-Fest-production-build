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
    title: 'NMBG Jay Presents: Huncho Fest | The Underground Block Party',
    meta: {
      'description':
          'NMBG Jay Presents: Huncho Fest - The Underground Block Party on Saturday, October 10, 2026 at 350 N Broad St, Mobile, AL. \$10 entry, live music, vendor market, artist panel, and performance giveaways.',
      'viewport': 'width=device-width, initial-scale=1.0',
      'og:title':
          'NMBG Jay Presents: Huncho Fest | The Underground Block Party',
      'og:description':
          'Saturday, October 10, 2026 • 3 PM TIL at 350 N Broad St, Mobile, AL. \$10 Entry.',
      'og:url': 'https://hunchofest.com',
      'og:image': '/assets/flyer.jpg',
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
    },
    head: [
      link(rel: 'stylesheet', href: '/styles.css'),
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
  "name": "NMBG Jay Presents: Huncho Fest",
  "description": "The Underground Block Party featuring live music, artist panel, local vendors, and free performance giveaways.",
  "startDate": "2026-10-10T15:00:00-05:00",
  "endDate": "2026-10-11T00:00:00-05:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Huncho Fest Block Party Grounds",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "350 N Broad St",
      "addressLocality": "Mobile",
      "addressRegion": "AL",
      "postalCode": "36603",
      "addressCountry": "US"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "USD",
    "url": "https://hunchofest.com",
    "availability": "https://schema.org/InStock"
  },
  "image": [
    "https://hunchofest.com/assets/flyer.jpg"
  ],
  "organizer": {
    "@type": "Organization",
    "name": "NMBG Jay",
    "url": "https://instagram.com/nmbgjay"
  }
}
</script>
'''),
    ],
    body: const App(),
  ));
}
