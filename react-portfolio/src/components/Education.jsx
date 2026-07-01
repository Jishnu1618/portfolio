import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Cloud, Cpu, BarChart, Trophy } from 'lucide-react';
import { educationData, certificationsData } from '../data/data';
import { fadeInUp, staggerContainer } from '../App';
import { SpotlightCard } from './Portfolio';

const certIcons = {
  cloud: Cloud,
  cpu: Cpu,
  chart: BarChart,
  trophy: Trophy,
};

const Education = () => {
  return (
    <motion.section
      id="education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Education</h3>
        <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
          Academic foundation in Electronics and Communication Engineering, with strong secondary
          school performance in science and mathematics.
        </p>
      </motion.div>

      <div className="space-y-6 mb-20">
        {educationData.map((edu) => (
          <motion.div key={edu.institution} variants={fadeInUp}>
            <SpotlightCard
              className={`p-6 md:p-8 relative group cursor-default ${edu.primary ? '' : 'opacity-95'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_70%)] rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-125" />

              <h4 className="font-bold text-xl md:text-2xl text-zinc-100 tracking-tight flex items-center gap-3">
                <GraduationCap
                  className={`w-7 h-7 shrink-0 ${edu.primary ? 'text-cyan-400' : 'text-zinc-500'}`}
                />
                {edu.institution}
              </h4>
              <p className="text-zinc-300 font-medium mt-2 text-base md:text-lg">{edu.degree}</p>
              <p className="text-zinc-500 text-sm mt-1">{edu.location}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-sm font-medium text-zinc-400 flex items-center gap-2 bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-700/50">
                  <Calendar className="w-4 h-4 text-cyan-400" /> {edu.period}
                </span>
                <span
                  className={`font-bold border px-3 py-1.5 rounded-lg ${
                    edu.primary
                      ? 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.15)]'
                      : 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10'
                  }`}
                >
                  {edu.highlight}
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeInUp} className="mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
          Certifications & Awards
        </h3>
        <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
          Oracle Cloud professional credentials, AWS platform competency, and competitive hackathon
          recognition.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <SpotlightCard className="p-6 md:p-8 relative block">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_70%)] rounded-bl-full -z-10 mt-[-10px] mr-[-10px] pointer-events-none" />

          <h4 className="font-bold text-xl text-zinc-100 tracking-tight flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-violet-400" /> Credentials
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map((cert) => {
              const Icon = certIcons[cert.icon] || Award;
              const content = (
                <>
                  <div
                    className={`w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 group-hover/link:bg-violet-500/20 group-hover/link:border-violet-400/50 transition-colors shadow-inner ${
                      cert.highlight ? 'group-hover/link:bg-fuchsia-500/20 group-hover/link:border-fuchsia-400/50' : ''
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 text-zinc-400 transition-colors ${
                        cert.highlight
                          ? 'group-hover/link:text-fuchsia-400'
                          : 'group-hover/link:text-violet-400'
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="group-hover/link:text-zinc-100 font-medium text-zinc-300 transition-colors leading-tight block">
                      {cert.title}
                    </span>
                    <span className="text-zinc-500 text-xs mt-1 block">{cert.subtitle}</span>
                    <span className="text-zinc-600 text-xs mt-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {cert.date}
                    </span>
                  </div>
                </>
              );

              const className = `group/link flex items-start gap-4 p-4 rounded-xl border bg-zinc-900/50 transition-all duration-300 ${
                cert.highlight
                  ? 'border-fuchsia-500/20 hover:border-fuchsia-500/40 hover:bg-fuchsia-900/10'
                  : 'border-zinc-800/50 hover:border-violet-500/50 hover:bg-violet-900/10'
              }`;

              return cert.link ? (
                <a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div key={cert.title} className={`${className} cursor-default`}>
                  {content}
                </div>
              );
            })}
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.section>
  );
};

export default Education;
