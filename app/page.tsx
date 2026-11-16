import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import FloatingQuickOrder from '@/components/FloatingQuickOrder';
import FloatingScrollDecorations from '@/components/FloatingScrollDecorations';
import FullPage3DExperience from '@/components/FullPage3DExperience';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* PERSISTENT 3D SCROLLABLE ANIMATED WORLD BACKDROP */}
      <FullPage3DExperience />

      {/* FLOATING BOTANICAL MOTION ACCENTS */}
      <FloatingScrollDecorations />

      {/* FOREGROUND CONTENT SECTIONS */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <LocationSection />
        <Footer />
        <FloatingQuickOrder />
      </div>
    </main>
  );
}
