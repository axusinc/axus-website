import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProductsSection from "../components/ProductsSection";
import EcosystemArchitecture from "../components/EcosystemArchitecture";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white overflow-x-hidden">
      {/* Floating navigation header */}
      <Navbar />

      {/* Hero section: strictly AXUS logo centered with dynamic blurred red contrails */}
      <HeroSection />

      {/* AXUS Products umbrella showcase */}
      <ProductsSection />

      {/* Architecture & integration fabric */}
      <EcosystemArchitecture />

      {/* Footer */}
      <Footer />
    </main>
  );
}
