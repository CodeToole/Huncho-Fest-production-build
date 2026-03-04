import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-charcoal text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/hero-bg.mov"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
          HUNCHO FEST
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-bold mb-10 text-white/90 uppercase tracking-widest max-w-2xl mx-auto leading-tight">
          The Biggest Hip-Hop Festival in Mobile, AL
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          <Link
            href="#tickets"
            className="bg-gold text-charcoal px-8 py-4 text-lg md:text-xl font-black hover:bg-white transition-colors duration-300 uppercase shadow-xl shadow-gold/20"
          >
            Get Tickets Now
          </Link>
          <Link
            href="#artist-registration"
            className="bg-purple border-2 border-purple text-white px-8 py-4 text-lg md:text-xl font-black hover:bg-transparent transition-colors duration-300 uppercase"
          >
            Artist Registration
          </Link>
        </div>
      </div>
    </section>
  );
}
