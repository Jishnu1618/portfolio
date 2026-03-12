import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, ArrowRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../App';

const textStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Hero = () => {
  const introText = "Software Developer & ECE Student".split(" ");

  return (
    <motion.section 
        id="home"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="min-h-[80vh] flex flex-col justify-center items-center text-center relative"
    >
        {/* Glow behind main text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div variants={fadeInUp} className="mb-6 inline-block">
             <span className="badge-neon inline-flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                 Available for Internships
             </span>
        </motion.div>

        <motion.h1 
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4"
        >
            <span className="text-zinc-100">Jishnu</span> <span className="text-gradient-primary">Roy</span>
        </motion.h1>

        <motion.div 
            variants={staggerContainer} 
            className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xl sm:text-2xl md:text-3xl font-medium text-zinc-400 mb-8 max-w-2xl"
        >
            {introText.map((word, index) => (
                <motion.span key={index} variants={textStagger} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>

        <motion.p variants={fadeInUp} className="max-w-xl text-zinc-400 leading-relaxed mb-12">
            A proactive creator bridging the gap between hardware and intelligent software. 
            Currently deploying PyTorch models to IoT edge devices and building robust FastAPI backends.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="mailto:jishnuroy200316@gmail.com" className="btn-glass w-full sm:w-auto h-12">
                <Mail className="w-4 h-4 text-cyan-400" /> Let's Connect <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            
            <div className="flex gap-4">
                <a href="https://github.com/Jishnu1618" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/jishnu-roy-16z" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <Linkedin className="w-5 h-5" />
                </a>
            </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Kolkata, WB</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 8172086902</span>
        </motion.div>

    </motion.section>
  );
};

export default Hero;
