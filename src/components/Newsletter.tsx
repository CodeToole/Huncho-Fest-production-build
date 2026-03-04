"use client";

import { useState, useRef, useTransition } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter-submission";

export default function Newsletter() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    async function action(formData: FormData) {
        setError(null);
        startTransition(async () => {
            const result = await subscribeToNewsletter(formData);

            if (result.success) {
                setIsSubmitted(true);
            } else {
                setError(result.message || "Failed to subscribe.");
                console.error(result.message);
            }
        });
    }

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
                            <form ref={formRef} action={action} className="space-y-8 max-w-md mx-auto">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium text-center">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <label className="block text-xs font-black uppercase text-gold tracking-widest ml-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        disabled={isPending}
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-purple focus:ring-1 focus:ring-purple outline-none text-white transition-all placeholder:text-white/20 disabled:opacity-50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-purple text-white px-10 py-6 text-xl font-black rounded-2xl hover:bg-white hover:text-purple transition-all duration-300 shadow-2xl shadow-purple/20 uppercase active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? "Subscribing..." : "Subscribe"}
                                </button>
                            </form>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
}
