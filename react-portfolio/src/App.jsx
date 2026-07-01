import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import StarField from './components/StarField';
import Hero from './components/Hero';
import SkillsDashboard from './components/SkillsDashboard';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import AISection from './components/AISection';
import PhotoGallery from './components/PhotoGallery';

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

function App() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView();
      });
      return;
    }

    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    fetch('/drive-photos.json')
      .then((res) => res.json())
      .then(setPhotoUrls)
      .catch(() => setPhotoUrls([]));
  }, []);

  return (
    <div className="text-zinc-300 relative min-h-screen selection:bg-cyan-500/30">
      
      {/* Deep Tech Animated Background */}
      <div className="fixed inset-0 z-[-1] bg-dark-bg bg-grid-white/[0.04]">
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/40 blur-[120px] animate-float pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/30 blur-[120px] animate-float-delayed pointer-events-none" />
          <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-violet-900/20 blur-[100px] animate-pulse pointer-events-none" />
      </div>

      {/* Interactive Shooting Star Particle Field */}
      <StarField />

      {/* Floating Dock Navigation */}
      <NavBar />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 md:py-32 space-y-32">
        <Hero />
        
        <SkillsDashboard activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <Portfolio activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <motion.section
          id="photography"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-[2rem] border border-white/10 bg-slate-950/50 shadow-2xl shadow-black/30 backdrop-blur-xl p-8 md:p-10"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
              Photography
            </h3>
            <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
              Curated photography work that highlights composition, color, and visual storytelling.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="btn-glass"
              >
                Open Gallery
              </button>
              <a
                href="https://drive.google.com/drive/folders/1N8VnL6PErC8v1ZVEwqIytvELZbclinBp?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-glass"
              >
                View Full Photography Portfolio
              </a>
            </div>
          </motion.div>
        </motion.section>

        <Education />
        <AISection />
      </main>
      <PhotoGallery images={photoUrls} open={galleryOpen} onClose={() => setGalleryOpen(false)} />

    </div>
  );
}

export default App;
