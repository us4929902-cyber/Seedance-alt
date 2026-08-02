// integrations/openai.js
// OpenAI helper with Node 18+ fetch support and node-fetch fallback (CommonJS)

let fetchFn;
if (typeof fetch === 'function') {
  fetchFn = fetch;
} else {
  try {
    // node-fetch v2 is CommonJS
    fetchFn = require('node-fetch');
  } catch (e) {
    throw new Error('No global fetch available and node-fetch is not installed. Run `npm install` or use Node 18+ which has global fetch.');
  }
}

async function chatWithGPT(message) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');

  const res = await fetchFn('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

module.exports = { chatWithGPT };
