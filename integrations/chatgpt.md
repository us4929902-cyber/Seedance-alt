# ChatGPT Integration (notes)

This document explains how to wire the app to OpenAI / ChatGPT-style chat completions.

1) Add environment variable:
- OPENAI_API_KEY=sk_...

2) Example (Node): use integrations/openai.js helper. It posts to OpenAI's Chat Completions endpoint and returns assistant text.

3) UI: create a small endpoint in apps/api to forward user messages to `chatWithGPT` and return the response. Protect rate limits and avoid exposing your key to the browser.

4) Safety: sanitize user inputs, enforce rate-limits, and monitor usage. Implement server-side caching if needed for repeated prompts.
