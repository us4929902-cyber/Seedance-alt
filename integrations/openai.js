// integrations/openai.js
// Simple Node helper that calls the OpenAI Chat Completions REST API using fetch.
// Usage: set OPENAI_API_KEY in environment, then call chatWithGPT("Hello")

const fetch = require('node-fetch');

async function chatWithGPT(message) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
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
