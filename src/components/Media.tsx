export default function Media() {
  const youtubeVideos = [
    { id: 'placeholder-1', title: 'Interview 1' },
    { id: 'placeholder-2', title: 'Live Performance' },
  ];

  return (
    <section id="media" className="py-24 bg-charcoal text-white relative">
      <div className="absolute inset-0 bg-purple/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter">Media</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Experience the Vibes</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {youtubeVideos.map((video) => (
            <div key={video.id} className="group relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/5 hover:border-purple transition-all duration-500">
              <iframe
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-center py-12 border-t border-white/5">
          <p className="text-2xl font-black text-white mr-4 uppercase tracking-tighter italic">Stream the Vibe</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://music.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-white hover:text-charcoal transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              Apple Music
            </a>
            <a 
              href="https://spotify.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black hover:bg-green-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
