import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Hero extends StatelessComponent {
  const Hero({super.key});

  @override
  Component build(BuildContext context) {
    return section(
      classes:
          'relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-charcoal text-white overflow-hidden',
      [
        // Ambient background video loop
        video(
          src: '/hero-bg.mov',
          classes: 'absolute inset-0 w-full h-full object-cover z-0',
          attributes: {
            'autoplay': '',
            'loop': '',
            'muted': '',
            'playsinline': '',
          },
          [],
        ),
        // Darkened overlay for contrast
        div(classes: 'absolute inset-0 bg-black/75 backdrop-blur-sm z-0', []),

        // Main Two-Column Hero Container
        div(
          classes: 'relative z-10 w-full max-w-7xl mx-auto px-6',
          [
            div(
              classes:
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center',
              [
                // Left Column: Copy, Badges, Features & CTAs
                div(
                  classes:
                      'text-center md:text-left flex flex-col items-center md:items-start animate-hero-text',
                  [
                    // Presenter & Subtitle Tag
                    div(
                      classes:
                          'inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-gold/30 mb-4',
                      [
                        span(
                          classes:
                              'w-2 h-2 rounded-full bg-gold animate-pulse',
                          [],
                        ),
                        p(
                          classes:
                              'text-xs font-black text-gold uppercase tracking-[0.2em]',
                          [Component.text('NMBG Jay Presents')],
                        ),
                      ],
                    ),

                    // Main Headline
                    h1(
                      classes:
                          'text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tighter text-white uppercase leading-none',
                      [
                        Component.text('HUNCHO '),
                        span(classes: 'text-gold', [Component.text('FEST')]),
                      ],
                    ),

                    // Tagline / Subtitle
                    p(
                      classes:
                          'text-xl sm:text-2xl md:text-2xl font-black mb-6 text-acid uppercase tracking-wider',
                      [Component.text('The Underground Block Party')],
                    ),

                    // Date & Admission Badges Row
                    div(
                      classes:
                          'flex flex-wrap gap-3 justify-center md:justify-start items-center mb-6',
                      [
                        div(
                          classes:
                              'pill-badge bg-black/80 border border-acid/50 text-acid shadow-acid',
                          [
                            span(
                              classes:
                                  'w-2 h-2 rounded-full bg-acid animate-pulse-acid',
                              [],
                            ),
                            Component.text('OCTOBER 10, 2026 • 3 PM TIL'),
                          ],
                        ),
                        div(
                          classes:
                              'pill-badge bg-gold/15 border border-gold/50 text-gold font-black',
                          [Component.text('\$10 Entry')],
                        ),
                      ],
                    ),

                    // Location Link
                    a(
                      href:
                          'https://maps.google.com/?q=350+N+Broad+St,+Mobile,+AL+36603',
                      target: Target.blank,
                      attributes: {'rel': 'noopener noreferrer'},
                      classes:
                          'inline-flex items-center gap-2 text-sm sm:text-base font-bold text-white/90 hover:text-acid transition-colors mb-6 group',
                      [
                        const RawText(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-acid group-hover:scale-110 transition-transform"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
                        ),
                        span(
                          classes: 'underline underline-offset-4 decoration-acid/50',
                          [
                            Component.text(
                              '350 N Broad St, Mobile, AL 36603',
                            ),
                          ],
                        ),
                      ],
                    ),

                    // Event Highlights / Feature Pills
                    div(
                      classes:
                          'flex flex-wrap gap-2 justify-center md:justify-start mb-8 max-w-xl',
                      [
                        div(
                          classes: 'feature-pill',
                          [Component.text('Free Performance Giveaways')],
                        ),
                        div(
                          classes: 'feature-pill',
                          [Component.text('Live Music')],
                        ),
                        div(
                          classes: 'feature-pill',
                          [Component.text('Artist Panel')],
                        ),
                        div(
                          classes: 'feature-pill',
                          [Component.text('Local Vendors')],
                        ),
                        div(
                          classes: 'feature-pill',
                          [Component.text('Block Party Vibes')],
                        ),
                      ],
                    ),

                    // Dual CTA Buttons
                    div(
                      classes:
                          'flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start',
                      [
                        a(
                          href: 'https://instagram.com/nmbgjay',
                          target: Target.blank,
                          attributes: {'rel': 'noopener noreferrer'},
                          classes: 'btn-primary-cta active:scale-95',
                          [
                            const RawText(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
                            ),
                            Component.text('DM @nmbgjay to Sign Up'),
                          ],
                        ),
                        a(
                          href: 'sms:12056029688',
                          classes: 'btn-secondary-cta active:scale-95',
                          [
                            const RawText(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
                            ),
                            Component.text('Text (205) 602-9688'),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),

                // Right Column: Official Promotional Flyer Spotlight Card
                div(
                  classes: 'flex justify-center items-center',
                  [
                    div(
                      classes: 'flyer-spotlight-card',
                      [
                        div(
                          classes: 'flyer-spotlight-inner',
                          [
                            img(
                              src: '/assets/flyer.jpg',
                              classes: 'flyer-img',
                              attributes: {
                                'alt':
                                    'Huncho Fest: The Underground Block Party Official Flyer',
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
        ),
      ],
    );
  }
}
