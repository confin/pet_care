import Navbar from "@/components/Navbar";
import AOSProvider from "@/components/AOSProvider";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import MapSection from "@/components/MapSection";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsApp from "@/components/WhatsApp";

export default function Home() {
  return (
    <AOSProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <MapSection />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <WhatsApp />
    </AOSProvider>
  );
}
