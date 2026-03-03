import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tickets from "@/components/Tickets";
import Media from "@/components/Media";
import ArtistRegistration from "@/components/ArtistRegistration";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Tickets />
      <Media />
      <ArtistRegistration />
      <Newsletter />
      <Footer />
    </main>
  );
}
