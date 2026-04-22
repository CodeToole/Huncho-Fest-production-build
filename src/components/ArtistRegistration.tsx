"use client";

export default function ArtistRegistration() {
  const tiers = [
    {
      name: "1 Track Slot",
      price: "$20",
      description: "Perfect for emerging artists looking to make an impact.",
      url: "https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/V7YKVUMWICIJ5FGYYJUZOIYU?src=sheet"
    },
    {
      name: "2 Track Slot",
      price: "$40",
      description: "Showcase your versatility with a back-to-back performance.",
      url: "https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/KONZMQ5K3W7JOFYQ4VWUHTND?src=sheet"
    },
    {
      name: "3 Track Slot",
      price: "$60",
      description: "The ultimate stage experience. Command the crowd.",
      url: "https://checkout.square.site/merchant/MLBM34ENB7A3Z/checkout/AMOOKDIBJXZVNOCI7WY674ZD?src=sheet"
    }
  ];

  return (
    <section id="artist-registration" className="py-24 bg-charcoal text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-[#FFC107] mb-4 uppercase text-center tracking-tighter italic">Secure Your Slot</h2>
        <p className="text-white/60 font-bold uppercase text-xs tracking-[0.3em] mb-16 text-center">Take the Main Stage</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className="bg-charcoal border-2 border-[#701AFF]/20 hover:border-[#FFC107]/50 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(112,26,255,0.05)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-2xl font-black text-[#FFC107] mb-2 uppercase tracking-tighter">{tier.name}</h3>
                <div className="text-5xl font-black text-white mb-6 tracking-tighter">
                  {tier.price}
                </div>
                <p className="text-white/60 mb-8 font-medium">
                  {tier.description}
                </p>
              </div>

              <a 
                href={tier.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FFC107] text-black text-center py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,193,7,0.2)] active:scale-95"
              >
                Secure Slot
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm font-medium italic">
            * Once payment is confirmed, you will receive an email with technical requirements and performance details.
          </p>
        </div>
      </div>
    </section>
  );
}
