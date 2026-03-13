import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Cloud, Cpu, BarChart, PieChart, Trophy, Users, Camera, Image } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../App';
import { SpotlightCard } from './Portfolio';

const Education = () => {
  return (
    <>
      <motion.section 
          id="education" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
      >
          <motion.div variants={fadeInUp} className="mb-12">
             <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Academic Foundation</h3>
             <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
                 Formal education and specialized certifications driving my technical growth.
             </p>
          </motion.div>

          <div className="space-y-6">
              <motion.div variants={fadeInUp}>
                  <SpotlightCard className="p-6 md:p-8 relative group cursor-default">
                      {/* Decorative abstract shape */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_70%)] rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-125"></div>
                      
                      <h4 className="font-bold text-2xl text-zinc-100 tracking-tight flex items-center gap-3">
                          <GraduationCap className="w-7 h-7 text-cyan-400" /> Institute of Engineering and Management
                      </h4>
                      <p className="text-zinc-300 font-medium mt-2 text-lg">B.Tech in Electronics and Communication Engineering</p>
                      
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                          <span className="text-sm font-medium text-zinc-400 flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/50">
                              <Calendar className="w-4 h-4 text-cyan-400" /> July 2023 - May 2027 
                          </span>
                          <span className="text-fuchsia-300 font-bold border border-fuchsia-500/30 px-3 py-1.5 rounded-lg bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.15)]">
                              SGPA: 8.68
                          </span>
                      </div>
                  </SpotlightCard>
              </motion.div>

              <motion.div variants={fadeInUp}>
                  <SpotlightCard className="p-6 md:p-8 relative block">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_70%)] rounded-bl-full -z-10 mt-[-10px] mr-[-10px] pointer-events-none"></div>
                       
                       <h4 className="font-bold text-xl text-zinc-100 tracking-tight flex items-center gap-3 mb-6">
                          <Award className="w-6 h-6 text-violet-400" /> Professional Certifications
                       </h4>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <a href="https://coursera.org/share/a7bb33ffaceae13f3ce9512d18816664" target="_blank" rel="noreferrer" className="group/link flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all duration-300">
                              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover/link:bg-violet-500/20 group-hover/link:border-violet-400/50 transition-colors shadow-inner">
                                  <Cloud className="w-6 h-6 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                              </div> 
                              <span className="group-hover/link:text-zinc-100 font-medium text-zinc-400 transition-colors leading-tight">AWS Cloud Practitioner Essentials</span>
                            </a>
                            
                            <div className="group/link flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all duration-300 cursor-default">
                              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover/link:bg-violet-500/20 group-hover/link:border-violet-400/50 transition-colors shadow-inner">
                                  <Cpu className="w-6 h-6 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                              </div> 
                              <span className="group-hover/link:text-zinc-100 font-medium text-zinc-400 transition-colors leading-tight">OCI 2025 Data Science Professional</span>
                            </div>

                            <div className="group/link flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all duration-300 cursor-default">
                              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover/link:bg-violet-500/20 group-hover/link:border-violet-400/50 transition-colors shadow-inner">
                                  <BarChart className="w-6 h-6 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                              </div> 
                              <span className="group-hover/link:text-zinc-100 font-medium text-zinc-400 transition-colors leading-tight">OCI 2025 Generative AI Professional</span>
                            </div>

                            <div className="group/link flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-violet-900/10 transition-all duration-300 cursor-default">
                              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover/link:bg-violet-500/20 group-hover/link:border-violet-400/50 transition-colors shadow-inner">
                                  <PieChart className="w-6 h-6 text-zinc-400 group-hover/link:text-violet-400 transition-colors" />
                              </div> 
                              <span className="group-hover/link:text-zinc-100 font-medium text-zinc-400 transition-colors leading-tight">OCI 2025 AI Foundations Associate</span>
                            </div>
                       </div>
                  </SpotlightCard>
              </motion.div>
          </div>
      </motion.section>

      <motion.section 
          id="extracurricular" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
      >
          <motion.div variants={fadeInUp} className="mb-12">
             <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Achievements & Pursuits</h3>
             <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
                 Hackathons, community leadership, and creative endeavors outside of academia.
             </p>
          </motion.div>

          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp} className="h-full">
                      <SpotlightCard className="p-6 md:p-8 flex flex-col h-full bg-gradient-to-br from-zinc-900/40 to-[#0c0c0e]">
                          <h4 className="font-bold text-xl text-zinc-100 tracking-tight flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20 shrink-0 shadow-[0_0_15px_rgba(217,70,239,0.1)]">
                                  <Trophy className="w-6 h-6 text-fuchsia-400" />
                              </div>
                              Infosys Global Hackathon
                          </h4>
                          <p className="text-zinc-400 mt-5 flex-1 leading-relaxed">Secured <span className="font-bold text-fuchsia-400">6th Rank</span> amongst 30 highly competitive selected teams globally.</p>
                          <div className="mt-6 pt-4 border-t border-zinc-800/80">
                              <span className="text-xs text-zinc-500 flex items-center gap-2 font-medium uppercase tracking-wider">
                                  <Calendar className="w-4 h-4" /> July 2025
                              </span>
                          </div>
                      </SpotlightCard>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="h-full">
                       <SpotlightCard className="p-6 md:p-8 flex flex-col h-full bg-gradient-to-br from-zinc-900/40 to-[#0c0c0e]">
                          <h4 className="font-bold text-xl text-zinc-100 tracking-tight flex items-center gap-3">
                               <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                                  <Users className="w-6 h-6 text-cyan-400" />
                              </div>
                              Smart Makers Festival
                          </h4>
                          <p className="text-zinc-400 mt-5 flex-1 leading-relaxed">
                              Served as a <span className="font-medium text-cyan-400">Volunteer Organizer</span>. Collaborated across teams to ensure smooth event execution and management.
                          </p>
                          <div className="mt-6 pt-4 border-t border-zinc-800/80">
                              <span className="text-xs text-zinc-500 flex items-center gap-2 font-medium uppercase tracking-wider">
                                  <Calendar className="w-4 h-4" /> September 2024
                              </span>
                          </div>
                      </SpotlightCard>
                  </motion.div>
              </div>

              <motion.div variants={fadeInUp}>
                  <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                       <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-fuchsia-500/5 blur-[50px] rounded-full pointer-events-none"></div>
                       
                       <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center border border-zinc-700 shrink-0 shadow-inner z-10">
                            <Camera className="w-8 h-8 text-zinc-400" />
                       </div>
                       <div className="z-10">
                           <h4 className="font-bold text-2xl text-zinc-100 tracking-tight">Creative Pursuits: Photography</h4>
                           <p className="text-zinc-400 mt-3 leading-relaxed max-w-3xl">
                               I have a passion for photography and enjoy capturing moments that tell a story. This skill has helped me develop a keen eye for detail and composition, which I deliberately apply to clean interface design and structured technical architectures.
                           </p>
                           <div className="mt-6 inline-block">
                               <a href="https://drive.google.com/drive/folders/1N8VnL6PErC8v1ZVEwqIytvELZbclinBp?usp=sharing" target="_blank" rel="noreferrer" className="btn-glass border-zinc-700 bg-transparent text-zinc-300">
                                  <Image className="w-4 h-4 text-fuchsia-400" /> View Photography Collection
                               </a>
                           </div>
                       </div>
                  </SpotlightCard>
              </motion.div>
          </div>
      </motion.section>
    </>
  );
};

export default Education;
