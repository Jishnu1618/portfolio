import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { skillsData } from '../data/data';
import { fadeInUp, staggerContainer } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SkillsDashboard = ({ activeFilter, setActiveFilter }) => {
  const allSkillsForChart = [
    ...skillsData.languages, 
    ...skillsData.frameworks, 
    ...skillsData.tools
  ].sort((a, b) => b.level - a.level);

  // Chart config matching deep tech aesthetics
  const chartData = {
    labels: allSkillsForChart.map(s => s.name),
    datasets: [{
      label: 'Skill Proficiency',
      data: allSkillsForChart.map(s => s.level),
      backgroundColor: 'rgba(34, 211, 238, 0.4)', // cyan-400
      borderColor: 'rgba(34, 211, 238, 0.8)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(139, 92, 246, 0.8)', // violet-500
      hoverBorderColor: 'rgba(217, 70, 239, 1)', // fuchsia
    }]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(255,255,255,0.02)' },
        ticks: { color: '#71717a' } // zinc-500
      },
      y: {
        grid: { display: false },
        ticks: { color: '#a1a1aa' } // zinc-400
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#18181b', // zinc-900
        titleColor: '#f4f4f5',
        bodyColor: '#d4d4d8',
        borderColor: '#27272a',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.parsed.x}% Proficiency`
        }
      }
    },
    onClick: (event, elements, chart) => {
        if (elements.length > 0) {
            const chartElement = elements[0];
            const skillName = chart.data.labels[chartElement.index];
            setActiveFilter(prev => prev === skillName ? null : skillName);
        }
    }
  };

  const renderBadgeList = (list, title) => (
    <div className="flex-1 min-w-[200px]">
        <h4 className="font-semibold text-zinc-200 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
            {title}
        </h4>
        <div className="flex flex-wrap gap-2 text-sm">
            {list.map(s => (
                <button 
                    key={s.name}
                    onClick={() => setActiveFilter(prev => prev === s.name ? null : s.name)}
                    className={`badge-neon ${activeFilter === s.name ? '!text-fuchsia-300 !border-fuchsia-500/50 !bg-fuchsia-500/10 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : ''}`}
                >
                    {s.name}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <motion.section 
        id="skills" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
    >
        <motion.div variants={fadeInUp} className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">Technical Arsenal</h3>
            <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
                Click any node in the matrix below to filter my project portfolio by technology.
            </p>
            {activeFilter && (
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-zinc-500 text-sm">Active Filter:</span>
                    <span className="badge-neon !text-fuchsia-300 animate-pulse">{activeFilter}</span>
                    <button onClick={() => setActiveFilter(null)} className="text-sm text-zinc-500 hover:text-cyan-400 underline underline-offset-4">Reset</button>
                </div>
            )}
        </motion.div>

        <motion.div variants={fadeInUp} className="spotlight-card p-4 sm:p-2 mb-8">
            <div className="chart-container relative w-full h-[400px] md:h-[500px]">
                <Bar data={chartData} options={options} />
            </div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="spotlight-card p-6 md:p-8 flex flex-col md:flex-row flex-wrap gap-10">
            {renderBadgeList(skillsData.languages, 'Languages')}
            {renderBadgeList(skillsData.frameworks, 'Frameworks & Libraries')}
            {renderBadgeList(skillsData.tools, 'Development Tools')}
        </motion.div>
    </motion.section>
  );
};

export default SkillsDashboard;
