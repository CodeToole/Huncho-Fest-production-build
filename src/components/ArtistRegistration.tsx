"use client";

import { useState } from 'react';
import { submitArtist } from '@/actions/artist-submission';

export default function ArtistRegistration() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    trackSelection: '1 Track Slot'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const squareUrls: Record<string, string> = {
    '1 Track Slot': 'https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/V7YKVUMWICIJ5FGYYJUZOIYU?src=sheet',
    '2 Track Slot': 'https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/KONZMQ5K3W7JOFYQ4VWUHTND?src=sheet',
    '3 Track Slot': 'https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/AMOOKDIBJXZVNOCI7WY674ZD?src=sheet'
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Processing... Redirecting to Secure Checkout');

    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('trackSelection', formData.trackSelection);

    // Call server action without blocking the UI
    submitArtist(data).catch(err => console.error("Background sync failed:", err));

    // Forceful redirect after 2000ms
    setTimeout(() => {
      const redirectUrl = squareUrls[formData.trackSelection];
      window.location.assign(redirectUrl);
    }, 2000);
  };

  return (
    <section id="artist-registration" className="py-24 bg-charcoal text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase tracking-tighter italic">Secure Your Slot</h2>
          <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em]">Take the Main Stage</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">First Name</label>
              <input
                required
                type="text"
                placeholder="John"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none transition-all font-medium"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Last Name</label>
              <input
                required
                type="text"
                placeholder="Doe"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none transition-all font-medium"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
            <input
              required
              type="email"
              placeholder="artist@hunchofest.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none transition-all font-medium"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="(123) 456-7890"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none transition-all font-medium"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Select Your Package</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none transition-all font-medium appearance-none"
              value={formData.trackSelection}
              onChange={(e) => setFormData({ ...formData, trackSelection: e.target.value })}
            >
              <option className="bg-charcoal" value="1 Track Slot">1 Track Slot ($20)</option>
              <option className="bg-charcoal" value="2 Track Slot">2 Track Slot ($40)</option>
              <option className="bg-charcoal" value="3 Track Slot">3 Track Slot ($60)</option>
            </select>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-gold text-charcoal py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(255,184,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? message : 'Secure My Slot'}
          </button>

          {isSubmitting && (
            <p className="text-center text-gold/80 text-sm font-bold animate-pulse">
              Preparing your secure checkout session...
            </p>
          )}
        </form>

        <div className="mt-12 text-center">
          <p className="text-white/30 text-xs font-medium italic">
            * By clicking secure my slot, you agree to the festival performance terms.
          </p>
        </div>
      </div>
    </section>
  );
}
