import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import StarField from './components/StarField';
import Hero from './components/Hero';
import SkillsDashboard from './components/SkillsDashboard';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import AISection from './components/AISection';

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
        <Education />
        <AISection />
      </main>

    </div>
  );
}

export default App;
