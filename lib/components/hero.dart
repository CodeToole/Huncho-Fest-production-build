import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Hero extends StatelessComponent {
  const Hero({super.key});

  @override
  Component build(BuildContext context) {
    return section(
      classes:
          'relative h-screen min-h-[600px] flex items-center justify-center bg-charcoal text-white overflow-hidden',
      [
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
        div(classes: 'absolute inset-0 bg-black/60 z-0', []),
        div(
          classes: 'relative z-10 text-center px-6 max-w-4xl mx-auto',
          [
            h1(
              classes:
                  'text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-gold animate-hero-text',
              [Component.text('HUNCHO FEST: MAY MADNESS')],
            ),
            p(
              classes:
                  'text-lg sm:text-xl md:text-2xl font-bold mb-10 text-white/90 uppercase tracking-widest max-w-2xl mx-auto leading-tight',
              [Component.text("Mobile's biggest music festival returns.")],
            ),
            div(
              classes:
                  'flex flex-col sm:flex-row gap-4 justify-center items-center',
              [
                div(
                  classes:
                      'inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-gold/30 rounded-2xl text-gold text-lg md:text-xl font-black tracking-widest uppercase shadow-2xl',
                  [
                    span(
                      classes: 'w-3 h-3 rounded-full bg-gold animate-pulse',
                      [],
                    ),
                    Component.text('Huncho Fest 2026 • Mobile, AL'),
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
