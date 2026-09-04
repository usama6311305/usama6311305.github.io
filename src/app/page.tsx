// app/page.tsx
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <ScrollToTop />
    </main>
  );
}