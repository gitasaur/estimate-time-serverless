# Estimate Time Serverless
Serverless function to estimate the time it takes to complete a task from a text description using GPT.

## Getting Started (local)

Create a `.env.local` file in the root directory:
```
OPENAI_API_KEY=xxxxxxxxx
APP_API_KEY
```
Use your OpenAPI key, and for APP_API_KEY generate via OpenSSL: `openssl rand -base64 64`

Then, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
