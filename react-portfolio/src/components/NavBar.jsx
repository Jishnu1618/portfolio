import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart2, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'skills', icon: BarChart2, label: 'Skills' },
  { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'gemini', icon: Sparkles, label: 'AI Tools' },
];

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full px-4 sm:w-auto"
    >
        <nav className="mx-auto pointer-events-auto flex items-center gap-2 p-2 rounded-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_15px_rgba(34,211,238,0.1)] w-max max-w-full overflow-x-auto hide-scrollbar">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setActiveTab(item.id)}
                        className={`relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="active-pill"
                                className="absolute inset-0 bg-white/10 rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <Icon className="w-5 h-5 relative z-10" />
                        <span className="sr-only">{item.label}</span>
                    </a>
                )
            })}
        </nav>
    </motion.div>
  );
};

export default NavBar;
