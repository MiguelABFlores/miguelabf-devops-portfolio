import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import OceanBackground from '@/components/ocean/OceanBackground';
import IntroGate from '@/components/intro/IntroGate';

export default function Home() {
  return (
    <>
      {/* Splash overlay — shows once per session, dives down on click,
          revealing the portfolio underneath (which is always rendered). */}
      <IntroGate />

      <OceanBackground />
      <Navbar />
      {/* relative + z-10 explicitly stacks content above the fixed ocean
          (z-0). Without this, the static footer would render BELOW the
          fixed ocean layer in normal painting order. */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
