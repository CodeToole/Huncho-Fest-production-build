import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

class Navbar extends StatelessComponent {
  const Navbar({super.key});

  @override
  Component build(BuildContext context) {
    return nav(
      classes:
          'fixed top-0 w-full z-50 bg-charcoal/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center',
      [
        a(
          href: '/',
          classes:
              'text-2xl md:text-3xl font-black text-gold uppercase tracking-tighter',
          [Component.text('HUNCHO FEST')],
        ),
        div(
          classes: 'hidden md:flex gap-10 items-center',
          [
            a(
              href: '#media',
              classes:
                  'text-sm font-black text-white/80 hover:text-gold uppercase tracking-widest transition-colors',
              [Component.text('Media')],
            ),
          ],
        ),
        button(
          classes:
              'md:hidden text-gold hover:text-white transition-colors p-2 rounded-xl bg-white/5',
          attributes: {'aria-label': 'Toggle mobile menu'},
          [
            const RawText(
              '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>',
            ),
          ],
        ),
      ],
    );
  }
}
