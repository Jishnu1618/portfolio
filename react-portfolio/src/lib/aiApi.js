const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function parseApiResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.error || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.retryAfter = data.retryAfter;
    throw error;
  }

  return data;
}

export async function sendChatMessage({ message, history }) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const data = await parseApiResponse(response);
  return data.reply;
}

export async function analyzeJobFit({ jobDescription }) {
  const response = await fetch(`${API_BASE}/api/job-fit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription }),
  });

  const data = await parseApiResponse(response);
  return data.analysis;
}

export const SUGGESTED_PROMPTS = [
  'Summarize Jishnu for a DevOps / cloud engineering role.',
  'Explain the EduAi multi-agent architecture.',
  'What GenAI and cloud certifications does he hold?',
  'List the main strengths of Jishnu in a bulleted list',
];
