import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-charcoal text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple/40 via-charcoal/60 to-charcoal z-10"></div>
        <Image 
          src="/hero-bg.jpg" 
          alt="Huncho Fest Crowd" 
          fill
          priority
          quality={85}
          className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
        />
      </div>
      
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
          HUNCHO FEST
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-bold mb-10 text-white/90 uppercase tracking-widest max-w-2xl mx-auto leading-tight">
          The Biggest Mardi Gras Hip-Hop Festival in Mobile, AL
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
