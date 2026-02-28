"use client";

import { useState, useRef } from "react";
import { submitSponsorship } from "@/actions/sponsorship-submission";

export default function Sponsorships() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      formRef.current?.reset();
    }, 4000);

    const formData = new FormData(e.currentTarget);
    submitSponsorship(formData).catch(console.error);
  };

  return (
    <section id="sponsorships" className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter">Sponsorships</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Partner with the Movement</p>

        <div className="bg-white/[0.03] border border-white/10 p-6 md:p-12 rounded-[2rem] shadow-2xl relative group backdrop-blur-sm">
          <p className="text-center text-lg md:text-xl mb-12 text-white/80 font-medium leading-relaxed">
            Join the movement. Connect your brand with the Mobile, AL hip-hop community.
            Send us an inquiry.
          </p>

          {isSubmitted ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-black text-gold mb-4 uppercase">Inquiry Received!</h3>
              <p className="text-white/80">We will contact you shortly.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Business Name</label>
                  <input
                    name="businessName"
                    type="text"
                    required
                    placeholder="Local Business"
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Contact Email</label>
                  <input
                    name="contactEmail"
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
                  name="howCanWeHelp"
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
          )}

        </div>
      </div>
    </section>
  );
}