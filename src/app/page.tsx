import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tickets from "@/components/Tickets";
import Media from "@/components/Media";
import ArtistRegistration from "@/components/ArtistRegistration";
import Sponsorships from "@/components/Sponsorships";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Tickets />
      <Media />
      <ArtistRegistration />
      <Sponsorships />
      <Footer />
    </main>
  );
}
