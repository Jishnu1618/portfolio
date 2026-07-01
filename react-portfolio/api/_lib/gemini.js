const DEFAULT_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODELS = ['gemini-2.0-flash-lite', 'gemini-2.5-flash-lite'];
const RETRYABLE_STATUSES = new Set([429, 500, 503, 504]);
const MAX_RETRIES = 2;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getModelList() {
  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const extras = (process.env.GEMINI_FALLBACK_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);

  return [...new Set([primary, ...extras, ...FALLBACK_MODELS])];
}

async function callGemini({ apiKey, model, systemPrompt, contents, maxOutputTokens }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: Number(process.env.GEMINI_TEMPERATURE) || 0.35,
        maxOutputTokens,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let message = `Gemini API error (${response.status})`;

    try {
      const parsed = JSON.parse(errorBody);
      message = parsed?.error?.message || message;
    } catch {
      message = errorBody || message;
    }

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    const error = new Error('Gemini API returned an empty response.');
    error.status = 502;
    throw error;
  }

  return text;
}

export async function generateContent({ systemPrompt, contents, maxOutputTokens = 1024 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  const models = getModelList();
  let lastError;

  for (const model of models) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await callGemini({ apiKey, model, systemPrompt, contents, maxOutputTokens });
      } catch (error) {
        lastError = error;
        const canRetry = RETRYABLE_STATUSES.has(error.status) && attempt < MAX_RETRIES;

        if (canRetry) {
          await sleep(600 * (attempt + 1));
          continue;
        }

        break;
      }
    }
  }

  throw lastError;
}

export function formatChatContents(history, newMessage) {
  const contents = [];

  for (const message of history.slice(-10)) {
    if (!message?.type || !message?.text?.trim()) continue;
    contents.push({
      role: message.type === 'user' ? 'user' : 'model',
      parts: [{ text: message.text.trim() }],
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: newMessage }],
  });

  return contents;
}

function mapApiError(error) {
  if (error.message?.includes('GEMINI_API_KEY')) {
    return {
      status: 500,
      message:
        'Server is missing GEMINI_API_KEY. Add it to .env.local (local) or Vercel env vars (production).',
    };
  }

  if (error.status === 429) {
    return {
      status: 429,
      message: 'Gemini API quota exceeded. Check limits in Google AI Studio, or try again later.',
    };
  }

  if (error.status === 503) {
    return {
      status: 503,
      message:
        "Gemini is temporarily overloaded (high demand). Wait 30–60 seconds and try again — this is on Google's side, not your API key.",
    };
  }

  return {
    status: error.status && error.status >= 400 ? error.status : 500,
    message: error.message || 'Unable to generate a response right now. Please try again shortly.',
  };
}

export { mapApiError };
