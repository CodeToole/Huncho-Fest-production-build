"use client";
import { sendGAEvent } from '@next/third-parties/google';
import { submitArtist } from '@/actions/artist-submission';

export default function ArtistRegistration() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const numberOfTracks = formData.get("numberOfTracks") as string;

    const result = await submitArtist(formData);

    if (result.success) {
      sendGAEvent({ event: 'artist_registration_submit', value: 'square_checkout_start' });

      if (numberOfTracks === "1 Track") {
        window.location.assign("https://square.link/u/hy2YzQ0o?src=sheet");
      } else if (numberOfTracks === "2 Tracks") {
        window.location.assign("https://square.link/u/FmIxZoXc?src=sheet");
      }
    } else {
      alert("Please check your form for errors.");
      console.error(result.errors);
    }
  };

  return (
    <section id="artist-registration" className="py-24 bg-charcoal text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter italic">Artist Registration</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Take the Main Stage</p>

        <div className="bg-charcoal border-2 border-purple p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(112,26,255,0.1)] backdrop-blur-xl">
          <p className="text-center text-lg md:text-xl mb-12 text-white/90 font-medium leading-relaxed">
            Join the biggest hip-hop event in the city. Secure your spot on the main stage at Mardi Gras Park, Mobile, AL.
          </p>

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Artist/Group Name</label>
              <input
                type="text"
                name="artist_name"
                required
                placeholder="The Huncho"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="artist@example.com"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Number of Tracks to Perform</label>
              <select
                name="numberOfTracks"
                required
                defaultValue=""
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-charcoal bg-white/90">Select number of tracks</option>
                <option value="1 Track" className="text-charcoal bg-white">1 Track - $60</option>
                <option value="2 Tracks" className="text-charcoal bg-white">2 Tracks - $100</option>
              </select>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Google Drive Link to Track (Optional)</label>
              <input
                type="url"
                name="drive_link"
                placeholder="https://drive.google.com/..."
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20"
              />
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest ml-1 mb-2">
                *Ensure access is set to &quot;Anyone with the link&quot;
              </p>
              <div className="bg-charcoal/50 border border-gold/30 p-4 rounded-xl mt-2">
                <p className="text-sm font-bold text-white/90">
                  If you do not have a Google Drive link, complete this form to pay your registration fee, then immediately email your track to <span className="text-gold font-black">Hunchofest@gmail.com</span> with the subject line <span className="text-purple font-black">HUNCHO FEST TRACK SUBMISSION - [Your Artist Name]</span>.
                </p>
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Music Links (Spotify/YouTube)</label>
              <input
                type="url"
                name="music_links"
                required
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Hometown City</label>
              <input
                type="text"
                name="city"
                required
                placeholder="Mobile, AL"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20"
              />
            </div>

            <div className="md:col-span-2 bg-purple/5 border border-purple/20 p-6 rounded-2xl mt-4">
              <p className="text-xs md:text-sm text-white/70 leading-relaxed font-bold uppercase tracking-wider text-center">
                Email alternative: <span className="text-gold">Hunchofest@gmail.com</span><br />
                Subject: <span className="text-purple">HUNCHO FEST SUBMISSION - [Name]</span>
              </p>
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-gold text-charcoal px-10 py-6 text-xl font-black rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,184,0,0.15)] uppercase mt-8 active:scale-[0.98]"
            >
              Secure Performance Spot
            </button>
            <p className="md:col-span-2 text-center text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-6">
              * Non-refundable registration fee processed via Square Secure
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
