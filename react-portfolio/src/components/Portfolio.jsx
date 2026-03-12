import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FileText, Download, Eye, Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../data/data';
import { fadeInUp, staggerContainer } from '../App';
import { useCallback } from 'react';

// Reusable Spotlight Card Component
const SpotlightCard = ({ children, className = '' }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }) => {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }, [mouseX, mouseY]);

    return (
        <div 
            className={`group relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl transition-all duration-500 hover:border-zinc-700/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      500px circle at ${mouseX}px ${mouseY}px,
                      rgba(34, 211, 238, 0.15),
                      transparent 80%
                    )
                  `,
                }}
            />
            {children}
        </div>
    );
};

const Portfolio = ({ activeFilter, setActiveFilter }) => {
  return (
    <motion.section 
        id="portfolio" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
    >
        <motion.div variants={fadeInUp} className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Project Portfolio</h3>
            <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
                Selected works showcasing my ability to build intelligent, scalable solutions.
            </p>
            {activeFilter && (
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-500 items-center">
                    Filtered view for projects utilizing <span className="badge-neon !text-fuchsia-300">{activeFilter}</span>
                </div>
            )}
        </motion.div>

        {/* Resume Hero Link */}
        <motion.div variants={fadeInUp} className="mb-12">
            <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-cyan-500/20 bg-cyan-950/10">
                <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 shrink-0 flex items-center justify-center border border-cyan-500/20">
                        <FileText className="w-7 h-7" />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl md:text-2xl text-zinc-100 tracking-tight">Curriculum Vitae</h4>
                        <p className="text-zinc-400 text-sm mt-1">Download the official PDF resume.</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <a href="/01_02_26_Software_Resume.pdf" download className="btn-glass w-full sm:w-auto">
                        <Download className="w-4 h-4 text-cyan-400" /> Download PDF
                    </a>
                    <a href="/01_02_26_Software_Resume.pdf" target="_blank" rel="noreferrer" className="btn-glass bg-transparent border-zinc-700 w-full sm:w-auto">
                        <Eye className="w-4 h-4" /> View Online
                    </a>
                </div>
            </SpotlightCard>
        </motion.div>

        {/* Dynamic Matrix of Cards */}
        <div className="space-y-8 relative">
            {/* Glow line connecting cards */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/0 via-violet-500/20 to-fuchsia-500/0 hidden sm:block"></div>

            {portfolioData.map((item, index) => {
                const isFilteredOut = activeFilter && !item.tags.includes(activeFilter);
                
                return (
                    <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className={`relative sm:pl-16 ${isFilteredOut ? 'opacity-20 scale-[0.98] blur-[2px] pointer-events-none' : ''}`}
                    >
                        {/* Timeline node */}
                        <div className="absolute left-[20px] top-8 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)] hidden sm:block"></div>

                        <SpotlightCard className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs font-bold uppercase tracking-wider mb-4">
                                        {item.type}
                                    </span>
                                    <h4 className="font-bold text-2xl md:text-3xl text-zinc-100 tracking-tight">{item.title}</h4>
                                    <p className="text-zinc-400 text-sm mt-3 flex flex-wrap items-center gap-3">
                                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {item.company}</span>
                                        <span className="text-zinc-600 hidden sm:inline">•</span> 
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-3 text-zinc-300 list-disc list-inside marker:text-cyan-500">
                                {item.description.map((desc, i) => (
                                    <li key={i} className="pl-2 leading-relaxed whitespace-normal text-sm md:text-base">{desc}</li>
                                ))}
                            </ul>

                            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-zinc-800">
                                {item.tags.map(tag => (
                                    <button 
                                        key={tag} 
                                        onClick={() => setActiveFilter(prev => prev === tag ? null : tag)}
                                        className={`badge-neon text-[11px] ${activeFilter === tag ? '!text-cyan-300 !border-cyan-500/50 !bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : ''}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>
                );
            })}
        </div>
    </motion.section>
  );
};

export { SpotlightCard };
export default Portfolio;
