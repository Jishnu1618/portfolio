import { resumeText } from '../src/data/data.js';
import { generateContent, mapApiError } from './_lib/gemini.js';
import { buildJobFitSystemPrompt, buildJobFitUserPrompt } from './_lib/prompts.js';
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

  const { jobDescription } = req.body ?? {};

  if (typeof jobDescription !== 'string' || !jobDescription.trim()) {
    return sendJson(res, 400, { error: 'Job description is required.' });
  }

  if (jobDescription.length > 8000) {
    return sendJson(res, 400, { error: 'Job description is too long (max 8000 characters).' });
  }

  try {
    const systemPrompt = buildJobFitSystemPrompt(resumeText);
    const userPrompt = buildJobFitUserPrompt(jobDescription.trim());
    const reply = await generateContent({
      systemPrompt,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      maxOutputTokens: 1024,
    });

    return sendJson(res, 200, { analysis: reply });
  } catch (error) {
    console.error('[api/job-fit]', error);
    const { status, message } = mapApiError(error);
    return sendJson(res, status, { error: message });
  }
}
