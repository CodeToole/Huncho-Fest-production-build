import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Hero extends StatelessComponent {
  const Hero({super.key});

  @override
  Component build(BuildContext context) {
    return section(
      id: 'hero',
      classes: 'hero-section',
      [
        // Ambient background video loop
        div(
          classes: 'hero-bg-media',
          [
            video(
              src: '/hero-bg.mov',
              classes: 'hero-bg-video',
              attributes: {
                'autoplay': '',
                'loop': '',
                'muted': '',
                'playsinline': '',
              },
              [],
            ),
            div(classes: 'hero-bg-overlay', []),
          ],
        ),

        // Main Two-Column Hero Container
        div(
          classes: 'hero-container',
          [
            div(
              classes: 'hero-grid',
              [
                // Left Column: Text & Event Details
                div(
                  classes: 'hero-content',
                  [
                    // Kicker: NMBG JAY PRESENTS
                    div(
                      classes: 'hero-kicker',
                      [
                        span(classes: 'kicker-dot', []),
                        span(
                          classes: 'kicker-text',
                          [Component.text('NMBG JAY PRESENTS')],
                        ),
                      ],
                    ),

                    // Main Heading
                    h1(
                      classes: 'hero-title',
                      [Component.text('HUNCHO FEST')],
                    ),

                    // Subtitle
                    p(
                      classes: 'hero-subtitle',
                      [Component.text('THE UNDERGROUND BLOCK PARTY')],
                    ),

                    // Event Details Badges (Date, Time, Price, Location)
                    div(
                      classes: 'hero-details-row',
                      [
                        // Date Badge
                        div(
                          classes: 'detail-badge highlight-acid',
                          [
                            const RawText(
                              '<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
                            ),
                            Component.text('October 10, 2026 (10/10/26)'),
                          ],
                        ),
                        // Time Badge
                        div(
                          classes: 'detail-badge highlight-acid',
                          [
                            const RawText(
                              '<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
                            ),
                            Component.text('3 PM – TIL'),
                          ],
                        ),
                        // Price Badge
                        div(
                          classes: 'detail-badge highlight-gold',
                          [
                            const RawText(
                              '<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
                            ),
                            Component.text('\$10 Entry'),
                          ],
                        ),
                        // Location Link Badge
                        a(
                          href:
                              'https://maps.google.com/?q=350+N+Broad+St,+Mobile,+AL+36603',
                          target: Target.blank,
                          attributes: {'rel': 'noopener noreferrer'},
                          classes: 'detail-badge link-badge',
                          [
                            const RawText(
                              '<svg class="badge-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
                            ),
                            Component.text('350 N Broad St, Mobile, AL 36603'),
                          ],
                        ),
                      ],
                    ),

                    // Feature Highlights
                    div(
                      classes: 'hero-features-label',
                      [Component.text('EVENT HIGHLIGHTS')],
                    ),
                    div(
                      classes: 'hero-features-row',
                      [
                        span(
                          classes: 'feature-tag',
                          [Component.text('Free Performance Giveaways')],
                        ),
                        span(
                          classes: 'feature-tag',
                          [Component.text('Live Music')],
                        ),
                        span(
                          classes: 'feature-tag',
                          [Component.text('Artist Panel')],
                        ),
                        span(
                          classes: 'feature-tag',
                          [Component.text('Local Vendors')],
                        ),
                      ],
                    ),

                    // Action Button
                    div(
                      classes: 'hero-actions',
                      [
                        a(
                          href: 'https://instagram.com/nmbgjay',
                          target: Target.blank,
                          attributes: {'rel': 'noopener noreferrer'},
                          classes: 'cta-btn cta-instagram',
                          [
                            const RawText(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
                            ),
                            Component.text('DM @nmbgjay to Sign Up'),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),

                // Right Column: Promotional Flyer Showcase
                div(
                  classes: 'hero-flyer-col',
                  [
                    div(
                      classes: 'flyer-card',
                      [
                        img(
                          src: '/assets/flyer.jpg',
                          classes: 'flyer-image',
                          attributes: {
                            'alt':
                                'NMBG Jay Presents: Huncho Fest - The Underground Block Party Official Flyer',
                            'loading': 'eager',
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    );
  }
}
