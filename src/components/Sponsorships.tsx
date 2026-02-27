export default function Sponsorships() {
  return (
    <section id="sponsorships" className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter">Sponsorships</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Partner with the Movement</p>
        
        <div className="bg-white/[0.03] border border-white/10 p-6 md:p-12 rounded-[2rem] shadow-2xl relative group backdrop-blur-sm">
          <p className="text-center text-lg md:text-xl mb-12 text-white/80 font-medium leading-relaxed">
            Join the movement. Connect your brand with the Mobile, AL hip-hop community. 
            Download our sponsor deck below or send us an inquiry.
          </p>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Business Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Local Business"
                  className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all placeholder:text-white/20"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Contact Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="marketing@business.com"
                  className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all placeholder:text-white/20"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">How can we help?</label>
              <textarea 
                rows={4}
                required
                placeholder="Tell us about your sponsorship goals..."
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all resize-none placeholder:text-white/20"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-purple text-white px-10 py-6 text-xl font-black rounded-2xl hover:bg-white hover:text-purple transition-all duration-300 shadow-2xl shadow-purple/20 uppercase active:scale-[0.98]"
            >
              Submit Inquiry
            </button>
          </form>
          
          <div className="mt-16 pt-10 border-t border-white/5 text-center">
            <a 
              href="#" 
              className="group inline-flex items-center gap-3 text-gold font-black hover:text-white transition-colors uppercase tracking-[0.2em] text-sm"
            >
              <span>Download Sponsorship Deck</span>
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
