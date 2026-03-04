'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sendWelcomeEmail } from '@/actions/welcome-artist';
export default function SuccessPage() {
    const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    useEffect(() => {
        const artistName = localStorage.getItem('hf_pending_artist_name');
        const email = localStorage.getItem('hf_pending_artist_email');

        if (artistName && email) {
            setEmailStatus('sending');
            // Remove immediately to prevent double sending
            localStorage.removeItem('hf_pending_artist_name');
            localStorage.removeItem('hf_pending_artist_email');

            sendWelcomeEmail(email, artistName)
                .then(() => setEmailStatus('sent'))
                .catch(err => {
                    console.error('Error sending welcome email:', err);
                    setEmailStatus('idle');
                });
        }
    }, []);

    return (
        <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl w-full bg-charcoal/80 border border-white/10 p-10 md:p-14 rounded-3xl shadow-2xl backdrop-blur-md">
                <div className="mb-8 flex justify-center">
                    <div className="bg-green-500/10 p-5 rounded-full border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)] animate-in zoom-in duration-500 duration-1000">
                        <svg
                            className="w-20 h-20 md:w-28 md:h-28 text-green-500 drop-shadow-md"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white uppercase leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    PAYMENT SUCCESSFUL<br />
                    <span className="text-gold block mt-2 text-3xl md:text-4xl">- YOU ARE LOCKED IN! -</span>
                </h1>

                {emailStatus !== 'idle' && (
                    <p className={`text-sm md:text-base font-medium mb-4 italic ${emailStatus === 'sending' ? 'text-white/60 animate-pulse' : 'text-green-400'}`}>
                        {emailStatus === 'sending' ? 'Sending welcome package...' : 'Welcome package sent!'}
                    </p>
                )}

                <p className="text-lg md:text-xl font-bold mb-10 text-white/80 uppercase tracking-widest max-w-lg mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Check your email for your official Welcome Package and next steps.
                </p>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <Link
                        href="/"
                        className="inline-block bg-gold text-charcoal px-10 py-5 text-lg md:text-xl font-black hover:bg-white transition-all duration-300 uppercase shadow-xl shadow-gold/20 hover:shadow-white/20 hover:-translate-y-1"
                    >
                        RETURN TO HOME
                    </Link>
                </div>
            </div>
        </div>
    );
}
