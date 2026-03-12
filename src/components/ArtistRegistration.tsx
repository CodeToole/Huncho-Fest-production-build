"use client";
import { useState } from 'react';
import { submitArtist } from '@/actions/artist-submission';
import CountdownTimer from './CountdownTimer';

export default function ArtistRegistration() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const FESTIVAL_START_TIME = new Date('2026-03-15T15:00:00-05:00');
  const REGISTRATION_CLOSE_TIME = new Date('2026-03-15T17:00:00-05:00');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLocked) return;
    const formData = new FormData(e.currentTarget);
    const numberOfTracks = formData.get("numberOfTracks") as string;

    // Failsafe: Tell the user if they forgot the dropdown
    if (!numberOfTracks) {
      alert("Please select 1 Track or 2 Tracks from the dropdown menu.");
      return;
    }

    // 1. Show the success message immediately
    setIsSubmitted(true);

    try {
      // 2. Fire to database but await to ensure no race conditions before redirect
      await submitArtist(formData);
    } catch (err) {
      console.error("Database sync skipped or failed:", err);
    } finally {
      // Save pending artist data for post-checkout welcome email
      const artistName = formData.get("artist_name") as string;
      const email = formData.get("email") as string;
      if (artistName) localStorage.setItem("hf_pending_artist_name", artistName);
      if (email) localStorage.setItem("hf_pending_artist_email", email);

      // 3. The Unstoppable Square Redirect - Now in finally block
    // Save pending artist data for post-checkout welcome email
    const artistName = formData.get("artist_name") as string;
    const email = formData.get("email") as string;
    if (artistName) localStorage.setItem("hf_pending_artist_name", artistName);
    if (email) localStorage.setItem("hf_pending_artist_email", email);

    try {
      // 2. Fire to database in the background but race against a 1.5s timeout
      // This ensures we attempt to capture the lead on the server before redirecting,
      // but "absolutely cannot be blocked or delayed by a slow response"
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 1500));
      timeoutPromise.catch(() => {}); // Prevent UnhandledPromiseRejection if submitArtist finishes first
      await Promise.race([submitArtist(formData), timeoutPromise]);
    } catch (err) {
      console.error("Database sync skipped or timed out:", err);
    } finally {
      // 3. The Unstoppable Square Redirect
      if (numberOfTracks === "1 Track") {
        window.location.assign("https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/V7YKVUMWICIJ5FGYYJUZOIYU?src=sheet");
      } else {
        window.location.assign("https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/KONZMQ5K3W7JOFYQ4VWUHTND?src=sheet");
      }
    }
  };

  return (
    <section id="artist-registration" className="py-24 bg-charcoal text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter italic">Artist Registration</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Take the Main Stage</p>

        <div className="bg-charcoal border-2 border-purple p-6 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(112,26,255,0.1)] backdrop-blur-xl">
          <div className="mb-8">
            <CountdownTimer
              targetDate={REGISTRATION_CLOSE_TIME}
              expiredMessage="Registration Closed"
              onExpire={() => setIsLocked(true)}
            />
          </div>
          <p className="text-center text-lg md:text-xl mb-12 text-white/90 font-medium leading-relaxed">
            Join the biggest hip-hop event in the city. Secure your spot on the main stage at Mardi Gras Park, Mobile, AL.
          </p>

          {isSubmitted ? (
            <div className="text-center py-12">
              <h3 className="text-2xl md:text-3xl font-black text-gold mb-4 uppercase tracking-tighter">Thank you for registering!</h3>
              <p className="text-white/80 text-lg md:text-xl font-bold uppercase tracking-widest animate-pulse">Redirecting to secure checkout...</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <fieldset disabled={isLocked} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden p-1 rounded-2xl">
                {isLocked && (
                  <div className="absolute inset-0 z-20 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-2xl font-black text-white/50 uppercase tracking-widest border-2 border-white/10 p-4 bg-charcoal shadow-2xl rounded-xl">Registration Closed</p>
                  </div>
                )}
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Artist/Group Name</label>
                  <input type="text" name="artist_name" required placeholder="The Huncho" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Email Address</label>
                  <input type="email" name="email" required placeholder="artist@example.com" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Number of Tracks to Perform</label>
                  <select name="numberOfTracks" required defaultValue="" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="" disabled className="text-charcoal bg-white/90">Select number of tracks</option>
                    <option value="1 Track" className="text-charcoal bg-white">1 Track - $60</option>
                    <option value="2 Tracks" className="text-charcoal bg-white">2 Tracks - $100</option>
                  </select>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Google Drive Link to Track (Optional)</label>
                  <input type="url" name="drive_link" placeholder="https://drive.google.com/..." className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed" />
                  <span className="block text-xs text-white/70 mt-2 px-2 italic font-medium">
                    If you do not have a Google Drive link, please email your track directly to noreply@hunchofest.com.
                  </span>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Music Links (Spotify/YouTube) (Optional)</label>
                  <input type="url" name="music_links" placeholder="https://... (Optional)" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Hometown City</label>
                  <input type="text" name="city" required placeholder="Mobile, AL" className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-gold focus:ring-1 focus:ring-gold outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>

                <button type="submit" disabled={isLocked} className="md:col-span-2 bg-gold text-charcoal px-10 py-6 text-xl font-black rounded-2xl hover:bg-white disabled:hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_30px_rgba(255,184,0,0.15)] disabled:shadow-none uppercase mt-8 active:scale-[0.98] disabled:active:scale-100">
                  Secure Performance Spot
                </button>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
