import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'components/footer.dart';
import 'components/hero.dart';
import 'components/media.dart';
import 'components/navbar.dart';

class App extends StatelessComponent {
  const App({super.key});

  @override
  Component build(BuildContext context) {
    return main_(
      classes: 'min-h-screen relative',
      const [
        Navbar(),
        Hero(),
        Media(),
        Footer(),
      ],
    );
  }
}
