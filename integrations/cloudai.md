# Cloud AI (Generic guidance)

"Cloud AI" can mean different providers (Google Cloud Vertex AI, Azure OpenAI, Anthropic, etc.). Use this document to integrate a hosted model provider other than OpenAI.

1) Pick provider and create API key or service account.
2) Add env var(s) for credentials (e.g., CLOUDAI_API_KEY or GOOGLE_APPLICATION_CREDENTIALS for Vertex AI file path).
3) Use provider SDK or REST API to send prompts and receive model output. Example for a REST-based provider is similar to integrations/openai.js but with the provider's endpoint and request format.
4) Add provider selection in your app settings so you can swap between OpenAI and Cloud AI without changing code.

Notes:
- Respect each provider's rate limits and billing.
- Implement request queuing and caching if model calls are expensive.
