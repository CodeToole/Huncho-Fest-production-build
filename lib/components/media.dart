import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Media extends StatelessComponent {
  const Media({super.key});

  @override
  Component build(BuildContext context) {
    return section(
      id: 'media',
      classes: 'py-24 bg-charcoal text-white relative',
      [
        div(
          classes: 'absolute inset-0 bg-purple/5 pointer-events-none',
          [],
        ),
        div(
          classes: 'max-w-7xl mx-auto px-6 relative z-10',
          [
            h2(
              classes:
                  'text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter',
              [Component.text('Media')],
            ),
            p(
              classes:
                  'text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center',
              [Component.text('Experience the Vibes')],
            ),
            div(
              classes: 'grid grid-cols-1 md:grid-cols-2 gap-10 mb-20',
              [
                iframe(
                  src:
                      'https://www.youtube.com/embed/Bs6K408y_38?si=bGuqADA3YdxnSjps',
                  classes: 'w-full aspect-video rounded-xl',
                  attributes: {
                    'title': 'YouTube video player',
                    'frameborder': '0',
                    'allow':
                        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    'referrerpolicy': 'strict-origin-when-cross-origin',
                    'allowfullscreen': '',
                  },
                  [],
                ),
                iframe(
                  src:
                      'https://www.youtube.com/embed/YYTiVtlXGlU?si=xktl88nNj9eYLm1H',
                  classes: 'w-full aspect-video rounded-xl',
                  attributes: {
                    'title': 'YouTube video player',
                    'frameborder': '0',
                    'allow':
                        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    'referrerpolicy': 'strict-origin-when-cross-origin',
                    'allowfullscreen': '',
                  },
                  [],
                ),
              ],
            ),
            div(
              classes:
                  'flex flex-col md:flex-row gap-8 justify-center items-center text-center py-12 border-t border-white/5',
              [
                p(
                  classes:
                      'text-2xl font-black text-white mr-4 uppercase tracking-tighter italic',
                  [Component.text('Stream the Vibe')],
                ),
                div(
                  classes: 'flex flex-wrap gap-4 justify-center',
                  [
                    a(
                      href:
                          'https://music.apple.com/us/artist/nmbg-jay/1430845721',
                      target: Target.blank,
                      classes:
                          'bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-white hover:text-charcoal transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95',
                      attributes: {'rel': 'noopener noreferrer'},
                      [Component.text('Apple Music')],
                    ),
                    a(
                      href:
                          'https://open.spotify.com/artist/5mvakgJiNf0mfcditZDT1z?si=p4QxIhlVRUuW6PvtNcNwxA',
                      target: Target.blank,
                      classes:
                          'bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-green-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95',
                      attributes: {'rel': 'noopener noreferrer'},
                      [Component.text('Spotify')],
                    ),
                    a(
                      href: 'https://www.youtube.com/@nmbgjay',
                      target: Target.blank,
                      classes:
                          'bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95',
                      attributes: {'rel': 'noopener noreferrer'},
                      [Component.text('YouTube')],
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
