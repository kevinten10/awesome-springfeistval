# Repository Guidelines

## Project Shape

This repository combines an awesome-list style Spring Festival project catalog with a deployable React/Vite AI assistant in `cny-ai-web/`.

## Commands

- `cd cny-ai-web && npm run dev` starts the assistant app.
- `cd cny-ai-web && npm run lint` runs ESLint.
- `cd cny-ai-web && npm test` runs the TypeScript smoke check.
- `cd cny-ai-web && npm run build` creates the Vercel build artifact.

## Environment

- The AI assistant calls the server-side `/api/chat` function, which reads
  `ARK_API_KEY`, `ARK_BASE_URL`, and `ARK_CHAT_MODEL`.
- Do not expose model provider keys through `VITE_*` variables.

## Editing Rules

- Keep the root README curated as an awesome list; app implementation changes belong under `cny-ai-web/`.
- Avoid committing real Ark or other model provider keys.
