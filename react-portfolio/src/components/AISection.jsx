import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader2, PenTool, Wand2, User } from 'lucide-react';
import { resumeText } from '../data/data';
import { fadeInUp, staggerContainer } from '../App';
import { SpotlightCard } from './Portfolio';

const AISection = () => {
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: "SYSTEM INITIATED. I am an AI trained on the professional history of Jishnu Roy. Awaiting query..." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const [jdInput, setJdInput] = useState('');
  const [fitMessage, setFitMessage] = useState('');
  const [isFitLoading, setIsFitLoading] = useState(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const fetchGeminiResponse = async (prompt) => {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=';
    const apiKey = ''; // Omitted for security
    
    if (!apiKey) {
        return ">> API KEY NOT DETECTED. This interface is running in demonstration mode. Please configure the Gemini API key in the source to enable remote connectivity.";
    }

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await fetch(apiUrl + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result?.candidates?.[0]?.content?.parts?.[0]?.text || ">> NO RESPONSE GENERATED.";
    } catch (error) {
        console.error('API call failed:', error);
        return '>> CONNECTION REFUSED. Cannot reach language model server.';
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    const fullPrompt = `You are a helpful UI assistant integrated into Jishnu Roy's tech portfolio. Your style is concise and slightly robotic but helpful. Answer based ONLY on this resume:
    
    ${resumeText}

    User Question: "${userMsg}"`;

    const aiResponse = await fetchGeminiResponse(fullPrompt);
    
    setChatMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    setIsChatLoading(false);
  };

  const handleGenerateFit = async () => {
    if (!jdInput.trim()) {
        setFitMessage('>> ERROR: Job description buffer empty.');
        return;
    }

    setIsFitLoading(true);
    setFitMessage('');

    const fitPrompt = `Based on the following resume, write a highly technical, single-paragraph summary explaining why this candidate is a strong fit for the job described below.
    Resume:
    ${resumeText}
    Job Description:
    ${jdInput}`;

    const generatedMessage = await fetchGeminiResponse(fitPrompt);
    
    setFitMessage(generatedMessage);
    setIsFitLoading(false);
  };

  return (
    <motion.section 
        id="gemini" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
    >
        <motion.div variants={fadeInUp} className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight flex items-center gap-3">
                Generative AI Terminal <SparklesIcon className="w-6 h-6 text-cyan-400" />
            </h3>
            <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
                Interact securely with an LLM tuned on my professional trajectory.
            </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Terminal */}
            <motion.div variants={fadeInUp}>
                <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border-cyan-500/20 bg-cyan-950/5">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
                        <div className="relative">
                            <Bot className="w-10 h-10 text-cyan-400 p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
                            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-zinc-900 animate-ping"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-zinc-900"></div>
                        </div>
                        <div>
                           <h4 className="font-bold text-xl text-zinc-100 font-mono">sys.agent.chat</h4>
                           <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Online // Model: Gemini-1.5</p>
                           </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 h-80 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar font-mono text-sm leading-relaxed">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`px-4 py-3 rounded-lg max-w-[85%] relative overflow-hidden backdrop-blur-sm ${
                                    msg.type === 'user' 
                                    ? 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50' 
                                    : 'bg-cyan-950/30 text-cyan-50 border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]'
                                }`}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isChatLoading && (
                            <div className="flex items-start gap-3">
                                <div className="px-4 py-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 flex items-center gap-3 font-mono text-sm">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                    Processing request...
                                </div>
                            </div>
                        )}
                        <div ref={chatBottomRef} />
                    </div>

                    <div className="flex gap-3 relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 font-mono text-lg font-bold">»</div>
                        <input 
                            type="text" 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                            placeholder="Enter query string..." 
                            className="flex-1 py-3 pr-4 pl-8 rounded-lg bg-zinc-900/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
                        />
                        <button 
                            onClick={handleChat}
                            disabled={isChatLoading || !chatInput.trim()}
                            className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* Fit Generator Tool */}
            <motion.div variants={fadeInUp}>
                <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border-fuchsia-500/20 bg-fuchsia-950/5">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
                        <PenTool className="w-10 h-10 text-fuchsia-400 p-2 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)] shrink-0" />
                        <div>
                           <h4 className="font-bold text-xl text-zinc-100 font-mono">sys.eval.job_fit</h4>
                           <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">Awaiting Input</p>
                           </div>
                        </div>
                    </div>
                    
                    <textarea 
                        rows="6" 
                        value={jdInput}
                        onChange={(e) => setJdInput(e.target.value)}
                        placeholder="// Paste target Job Description buffer here to initiate analysis..." 
                        className="w-full p-4 rounded-lg bg-zinc-900/50 border border-zinc-700 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none shadow-inner font-mono text-sm leading-relaxed"
                    ></textarea>
                    
                    <button 
                        onClick={handleGenerateFit}
                        disabled={isFitLoading || !jdInput.trim()}
                        className="mt-4 btn-glass border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/50 disabled:opacity-50 flex items-center justify-center gap-2 font-mono text-sm w-full py-3"
                    >
                        {isFitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        {isFitLoading ? 'EXECUTING...' : 'EXECUTE ANALYSIS'}
                    </button>
                    
                    {fitMessage && (
                        <div className="mt-6 flex-1 p-5 rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/30 text-fuchsia-50 font-mono text-sm leading-relaxed overflow-y-auto">
                            <span className="text-fuchsia-400 font-bold opacity-50 block mb-2">{'> OUTPUT DATA'}</span>
                            {fitMessage}
                        </div>
                    )}
                </SpotlightCard>
            </motion.div>
        </div>
    </motion.section>
  );
};

// Extracted SparklesIcon
const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);

export default AISection;
