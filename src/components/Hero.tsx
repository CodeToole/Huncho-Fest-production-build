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
          HUNCHO FEST: MAY MADNESS
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-bold mb-10 text-white/90 uppercase tracking-widest max-w-2xl mx-auto leading-tight">
          Mobile&apos;s biggest music festival returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-gold/30 rounded-2xl text-gold text-lg md:text-xl font-black tracking-widest uppercase shadow-2xl">
            <span className="w-3 h-3 rounded-full bg-gold animate-pulse"></span>
            Huncho Fest 2026 • Mobile, AL
          </div>
        </div>
      </div>
    </section>
  );
}
