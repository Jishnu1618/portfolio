import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader2, PenTool, Wand2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../App';
import { SpotlightCard } from './Portfolio';
import { sendChatMessage, analyzeJobFit, SUGGESTED_PROMPTS } from '../lib/aiApi';

const WELCOME_MESSAGE =
  ' I am grounded on Jishnu Roy\'s resume — experience, projects, skills, education, and certifications. Ask anything.';

function formatApiError(error) {
  if (error.retryAfter) {
    return `>> RATE LIMIT: Try again in ${error.retryAfter}s.`;
  }
  return `>> ERROR: ${error.message}`;
}

const AISection = () => {
  const [chatMessages, setChatMessages] = useState([{ type: 'ai', text: WELCOME_MESSAGE }]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const chatContainerRef = useRef(null);

  const [jdInput, setJdInput] = useState('');
  const [fitMessage, setFitMessage] = useState('');
  const [isFitLoading, setIsFitLoading] = useState(false);
  const [fitError, setFitError] = useState('');

  useEffect(() => {
    if (chatMessages.length <= 1 && !isChatLoading) return;

    const container = chatContainerRef.current;
    if (!container) return;

    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const submitChat = async (message) => {
    const trimmed = message.trim();
    if (!trimmed || isChatLoading) return;

    setChatError('');
    setChatMessages((prev) => [...prev, { type: 'user', text: trimmed }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const history = chatMessages
        .slice(1)
        .map(({ type, text }) => ({ type, text }));

      const reply = await sendChatMessage({ message: trimmed, history });
      setChatMessages((prev) => [...prev, { type: 'ai', text: reply }]);
    } catch (error) {
      const fallback = formatApiError(error);
      setChatError(fallback);
      setChatMessages((prev) => [...prev, { type: 'ai', text: fallback }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateFit = async () => {
    if (!jdInput.trim()) {
      setFitError('>> ERROR: Job description buffer empty.');
      return;
    }

    setFitError('');
    setIsFitLoading(true);
    setFitMessage('');

    try {
      const analysis = await analyzeJobFit({ jobDescription: jdInput });
      setFitMessage(analysis);
    } catch (error) {
      setFitError(formatApiError(error));
    } finally {
      setIsFitLoading(false);
    }
  };

  return (
    <motion.section
      id="gemini"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight flex items-center gap-3">
          Generative AI Terminal <SparklesIcon className="w-6 h-6 text-cyan-400" />
        </h3>
        <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
          Interact securely with an LLM grounded on my professional trajectory — powered by Gemini
          via a server-side API proxy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeInUp}>
          <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border-cyan-500/20 bg-cyan-950/5">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
              <div className="relative">
                <Bot className="w-10 h-10 text-cyan-400 p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-zinc-900 animate-ping" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-zinc-900" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-zinc-100 font-mono">sys.agent.chat</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                    Online // Model: Gemini 2.5 Flash
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitChat(prompt)}
                  disabled={isChatLoading}
                  className="badge-neon text-[11px] hover:!text-cyan-300 hover:!border-cyan-500/50 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 h-80 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar font-mono text-sm leading-relaxed"
            >
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`px-4 py-3 rounded-lg max-w-[85%] relative overflow-hidden backdrop-blur-sm whitespace-pre-wrap ${
                      msg.type === 'user'
                        ? 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50'
                        : 'bg-cyan-950/30 text-cyan-50 border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]'
                    }`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-start gap-3">
                  <div className="px-4 py-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 flex items-center gap-3 font-mono text-sm">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                    Processing request...
                  </div>
                </div>
              )}
            </div>

            {chatError && (
              <p className="text-amber-400/90 text-xs font-mono mb-3">{chatError}</p>
            )}

            <div className="flex gap-3 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 font-mono text-lg font-bold">
                »
              </div>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitChat(chatInput)}
                placeholder="Enter query string..."
                className="flex-1 py-3 pr-4 pl-8 rounded-lg bg-zinc-900/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
              />
              <button
                onClick={() => submitChat(chatInput)}
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <SpotlightCard className="p-6 md:p-8 h-full flex flex-col border-fuchsia-500/20 bg-fuchsia-950/5">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-800">
              <PenTool className="w-10 h-10 text-fuchsia-400 p-2 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)] shrink-0" />
              <div>
                <h4 className="font-bold text-xl text-zinc-100 font-mono">sys.eval.job_fit</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                    Awaiting Input
                  </p>
                </div>
              </div>
            </div>

            <textarea
              rows="6"
              value={jdInput}
              onChange={(e) => setJdInput(e.target.value)}
              placeholder="// Paste target Job Description buffer here to initiate analysis..."
              className="w-full p-4 rounded-lg bg-zinc-900/50 border border-zinc-700 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all resize-none shadow-inner font-mono text-sm leading-relaxed"
            />

            <button
              onClick={handleGenerateFit}
              disabled={isFitLoading || !jdInput.trim()}
              className="mt-4 btn-glass border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/50 disabled:opacity-50 flex items-center justify-center gap-2 font-mono text-sm w-full py-3"
            >
              {isFitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {isFitLoading ? 'EXECUTING...' : 'EXECUTE ANALYSIS'}
            </button>

            {fitError && (
              <p className="mt-4 text-amber-400/90 text-xs font-mono">{fitError}</p>
            )}

            {fitMessage && (
              <div className="mt-6 flex-1 p-5 rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/30 text-fuchsia-50 font-mono text-sm leading-relaxed overflow-y-auto whitespace-pre-wrap">
                <span className="text-fuchsia-400 font-bold opacity-50 block mb-2">
                  {'> OUTPUT DATA'}
                </span>
                {fitMessage}
              </div>
            )}
          </SpotlightCard>
        </motion.div>
      </div>
    </motion.section>
  );
};

const SparklesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default AISection;
