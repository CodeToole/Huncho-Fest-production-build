import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Media from "@/components/Media";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Media />
      <Footer />
    </main>
  );
}
