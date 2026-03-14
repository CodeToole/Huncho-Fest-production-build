"use client";
import { useEffect, useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import CountdownTimer from './CountdownTimer';

export default function Tickets() {
  const FESTIVAL_START_TIME = new Date('2026-03-14T15:00:00-05:00');
  const fallbackUrl = "https://www.eventbrite.com/e/huncho-fest-mardi-gras-park-tickets-1980752329538";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="tickets" className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase tracking-tighter">Tickets</h2>
          <p className="text-lg md:text-xl font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
            Secure your spot at the biggest music festival in Mobile.
          </p>
          <CountdownTimer
            targetDate={FESTIVAL_START_TIME}
            expiredMessage="The festival has started!"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white/5 p-2 sm:p-4 rounded-2xl shadow-2xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-[16/10] md:min-h-[500px]">
            {/* Eventbrite iframe placeholder */}
            <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              {mounted ? (
                <iframe
                  src={`https://www.eventbrite.com/checkout-external?eid=1980752329538&parent=${window.location.href}`}
                  frameBorder="0"
                  height="100%"
                  width="100%"
                  className="w-full h-full"
                  allowTransparency={true}
                  scrolling="auto"
                  title="Eventbrite Ticket Widget"
                  loading="lazy"
                ></iframe>
              ) : (
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gold font-black uppercase tracking-widest text-xs">Initializing Checkout...</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 mb-6 font-bold uppercase text-xs tracking-widest">Problems viewing the ticket widget?</p>
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'ticket_click', value: 'eventbrite_direct' })}
              className="group bg-purple text-white px-8 md:px-12 py-5 text-lg md:text-xl font-black rounded-xl hover:bg-white hover:text-charcoal transition-all duration-300 inline-block uppercase shadow-2xl shadow-purple/20 active:scale-95"
            >
              Buy Directly on Eventbrite
              <svg className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
