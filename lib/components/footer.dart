import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Footer extends StatelessComponent {
  const Footer({super.key});

  @override
  Component build(BuildContext context) {
    const currentYear = 2026;

    return footer(
      classes:
          'bg-charcoal text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden group',
      [
        div(
          classes:
              'absolute top-0 right-0 w-64 h-64 bg-purple/10 blur-3xl rounded-full -mr-32 -mt-32 group-hover:opacity-40 transition-opacity',
          [],
        ),
        div(
          classes:
              'max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative z-10',
          [
            div(
              classes: 'space-y-8',
              [
                a(
                  href: '/',
                  classes:
                      'text-4xl font-black text-gold uppercase tracking-tighter',
                  [Component.text('HUNCHO FEST')],
                ),
                p(
                  classes:
                      'text-white/60 font-medium max-w-sm leading-relaxed',
                  [
                    Component.text(
                      "Mobile, Alabama's biggest music festival experience. Celebrating culture, music, and the Gulf Coast.",
                    ),
                  ],
                ),
                div(
                  classes: 'flex gap-6',
                  [
                    a(
                      href:
                          'https://youtube.com/@nmbgjay?si=EjSyCyLBAM9cynyA',
                      target: Target.blank,
                      attributes: {
                        'rel': 'noopener noreferrer',
                        'aria-label': 'YouTube',
                      },
                      classes:
                          'p-3 bg-white/5 rounded-full hover:bg-gold hover:text-charcoal transition-all',
                      [
                        const RawText(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>',
                        ),
                      ],
                    ),
                    a(
                      href: 'https://www.instagram.com/nmbgjay/',
                      target: Target.blank,
                      attributes: {
                        'rel': 'noopener noreferrer',
                        'aria-label': 'NMBG Jay Instagram',
                      },
                      classes:
                          'p-3 bg-white/5 rounded-full hover:bg-gold hover:text-charcoal transition-all',
                      [
                        const RawText(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
                        ),
                      ],
                    ),
                    a(
                      href: 'https://www.instagram.com/hunchofest24/',
                      target: Target.blank,
                      attributes: {
                        'rel': 'noopener noreferrer',
                        'aria-label': 'Huncho Fest Instagram',
                      },
                      classes:
                          'p-3 bg-white/5 rounded-full hover:bg-gold hover:text-charcoal transition-all',
                      [
                        const RawText(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            div(
              classes: 'md:col-span-2 grid grid-cols-2 gap-8',
              [
                div(
                  classes: 'space-y-6',
                  [
                    p(
                      classes:
                          'text-sm font-black text-gold uppercase tracking-widest',
                      [Component.text('Navigation')],
                    ),
                    ul(
                      classes:
                          'space-y-4 text-white/60 font-bold uppercase text-xs tracking-wider',
                      [
                        li([
                          a(
                            href: '#media',
                            classes: 'hover:text-white transition-colors',
                            [Component.text('Media')],
                          ),
                        ]),
                        li([
                          a(
                            href: '#sponsorships',
                            classes: 'hover:text-white transition-colors',
                            [Component.text('Sponsors')],
                          ),
                        ]),
                      ],
                    ),
                  ],
                ),
                div(
                  classes: 'space-y-6',
                  [
                    p(
                      classes:
                          'text-sm font-black text-gold uppercase tracking-widest',
                      [Component.text('Location')],
                    ),
                    ul(
                      classes:
                          'space-y-4 text-white/60 font-bold uppercase text-xs tracking-wider',
                      [
                        li([Component.text('Mardi Gras Park')]),
                        li([Component.text('Mobile, AL')]),
                        li([Component.text('United States')]),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
        div(
          classes:
              'max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4',
          [
            p(
              classes:
                  'text-white/40 text-xs font-bold uppercase tracking-widest',
              [
                Component.text(
                  '© $currentYear Huncho Fest. All Rights Reserved.',
                ),
              ],
            ),
            p(
              classes:
                  'text-white/40 text-xs font-bold uppercase tracking-widest',
              [Component.text('Website by Cornelius Bralor Protocol')],
            ),
          ],
        ),
      ],
    );
  }
}
