import { resumeText } from '../src/data/data.js';
import { generateContent, formatChatContents, mapApiError } from './_lib/gemini.js';
import { buildChatSystemPrompt } from './_lib/prompts.js';
import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { applyCors, sendJson } from './_lib/http.js';

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const rate = checkRateLimit(getClientIp(req));
  if (!rate.allowed) {
    return sendJson(
      res,
      429,
      { error: 'Rate limit exceeded. Please try again later.', retryAfter: rate.retryAfter },
      { 'Retry-After': String(rate.retryAfter) }
    );
  }

  const { message, history = [] } = req.body ?? {};

  if (typeof message !== 'string' || !message.trim()) {
    return sendJson(res, 400, { error: 'Message is required.' });
  }

  if (message.length > 2000) {
    return sendJson(res, 400, { error: 'Message is too long (max 2000 characters).' });
  }

  if (!Array.isArray(history) || history.length > 20) {
    return sendJson(res, 400, { error: 'Invalid conversation history.' });
  }

  const hasInvalidHistory = history.some(
    (entry) =>
      !entry ||
      typeof entry.text !== 'string' ||
      !['user', 'ai'].includes(entry.type)
  );

  if (hasInvalidHistory) {
    return sendJson(res, 400, { error: 'Invalid conversation history format.' });
  }

  try {
    const systemPrompt = buildChatSystemPrompt(resumeText);
    const contents = formatChatContents(history, message.trim());
    const reply = await generateContent({ systemPrompt, contents });

    return sendJson(res, 200, { reply });
  } catch (error) {
    console.error('[api/chat]', error);
    const { status, message } = mapApiError(error);
    return sendJson(res, status, { error: message });
  }
}
