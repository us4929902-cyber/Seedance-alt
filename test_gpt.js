// test_gpt.js
// Quick local test for integrations/openai.js

const { chatWithGPT } = require('./integrations/openai');

(async () => {
  try {
    const prompt = process.argv.slice(2).join(' ') || 'Hello from local test';
    const res = await chatWithGPT(prompt);
    console.log('GPT response:\n', res);
  } catch (err) {
    console.error('Error calling chatWithGPT:', err.message || err);
    process.exit(1);
  }
})();
