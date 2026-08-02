# Integrations & Env vars

This starter contains optional integration examples for connecting the app to AI and identity providers.

Environment variables used by the examples in `/integrations`:

- OPENAI_API_KEY - API key for OpenAI / ChatGPT
- GITHUB_ID - GitHub OAuth App client ID
- GITHUB_SECRET - GitHub OAuth App client secret
- NEXTAUTH_SECRET - Secret for NextAuth (if used)
- CLOUDAI_API_KEY - Generic Cloud AI provider key (example)

How to enable:
1. Add env vars to your deployment environment (Vercel, Render, Heroku) or a local `.env` for development.
2. Do NOT put secret keys in the browser. Always call provider APIs from server-side code (apps/api).

Quick example: add this to `.env.local` for local development

```
OPENAI_API_KEY=sk_...your key...
GITHUB_ID=...
GITHUB_SECRET=...
NEXTAUTH_SECRET=some_long_random_string
CLOUDAI_API_KEY=...
```
