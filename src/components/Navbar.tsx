import Link from 'next/link';

export default function Navbar() {
  const links = [
    { name: 'Tickets', href: '#tickets' },
    { name: 'Media', href: '#media' },
    { name: 'Artists', href: '#artist-registration' },
    { name: 'Sponsors', href: '#sponsorships' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-charcoal/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
      <Link href="/" className="text-2xl md:text-3xl font-black text-gold uppercase tracking-tighter">
        HUNCHO FEST
      </Link>
      
      <div className="hidden md:flex gap-10 items-center">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-sm font-black text-white/80 hover:text-gold uppercase tracking-widest transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="#tickets"
          className="bg-gold text-charcoal px-6 py-3 text-xs font-black rounded-full hover:bg-white transition-colors uppercase tracking-widest shadow-lg shadow-gold/20"
        >
          Buy Tickets
        </Link>
      </div>
      
      {/* Mobile Menu Button (Icon placeholder) */}
      <button className="md:hidden text-gold hover:text-white transition-colors p-2 rounded-xl bg-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </nav>
  );
}
