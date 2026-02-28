export default function Media() {
  return (
    <section id="media" className="py-24 bg-charcoal text-white relative">
      <div className="absolute inset-0 bg-purple/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter">Media</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Experience the Vibes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/Bs6K408y_38?si=bGuqADA3YdxnSjps" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/YYTiVtlXGlU?si=xktl88nNj9eYLm1H" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-center py-12 border-t border-white/5">
          <p className="text-2xl font-black text-white mr-4 uppercase tracking-tighter italic">Stream the Vibe</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://music.apple.com/us/artist/nmbg-jay/1430845721"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-white hover:text-charcoal transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              Apple Music
            </a>
            <a
              href="https://open.spotify.com/artist/5mvakgJiNf0mfcditZDT1z?si=p4QxIhlVRUuW6PvtNcNwxA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-green-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/@nmbgjay"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
