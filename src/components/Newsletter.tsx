"use client";

import { useState, useRef } from "react";
import { submitNewsletter } from "@/actions/newsletter-submission";

export default function Newsletter() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);

        const formData = new FormData(e.currentTarget);
        submitNewsletter(formData).catch(console.error);
    };

    return (
        <section id="newsletter" className="py-24 bg-charcoal text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-gold mb-4 uppercase text-center tracking-tighter">Join the Huncho Fest Mailing List</h2>
                <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-12 text-center">Stay Updated</p>

                <div className="bg-white/[0.03] border border-white/10 p-6 md:p-12 rounded-[2rem] shadow-2xl relative group backdrop-blur-sm">
                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-black text-gold mb-4 uppercase">You are on the list!</h3>
                        </div>
                    ) : (
                        <>
                            <p className="text-center text-lg md:text-xl mb-12 text-white/80 font-medium leading-relaxed">
                                Be the first to know about artist announcements, ticket drops, and exclusive festival updates.
                            </p>
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
                                <div className="space-y-3">
                                    <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all placeholder:text-white/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-purple text-white px-10 py-6 text-xl font-black rounded-2xl hover:bg-white hover:text-purple transition-all duration-300 shadow-2xl shadow-purple/20 uppercase active:scale-[0.98]"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
}
