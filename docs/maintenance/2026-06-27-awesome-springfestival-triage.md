# Awesome Spring Festival Triage - 2026-06-27

## Repository

- GitHub: `kevinten10/awesome-springfeistval`
- Public app: `https://spring.rxcloud.group`
- Category: awesome list plus Vite AI assistant

## Actions Taken

- Fast-forwarded local `main` from the pre-migration app state to the remote Ark
  runtime and root README migration commit `f0b9992`.
- Added `AGENTS.md` to separate root catalog maintenance from the `cny-ai-web/` app.
- Added a `test` script to `cny-ai-web/package.json`.
- Added an ESLint 9 flat config for the Vite app so `npm run lint` works with
  the current dependency set.
- Updated local machine-readable maintenance notes to require server-side Ark
  variables instead of public client model keys.

## Validation

- Passed: `cd cny-ai-web && npm test`
- Passed: `cd cny-ai-web && npm run lint`
- Passed: `cd cny-ai-web && npm run build`
- Passed: `scan_project.sh .` with no old provider markers, no public-client key
  risk, and no Ark-looking secrets.
- Passed: local Vercel handler real Ark smoke returned `statusCode: 200`,
  `hasChoices: true`, and `hasError: false` without printing the secret.

## Follow-Up

- Runtime, Vercel env, production deployment, and browser LLM verification were
  completed in the earlier Ark migration record for `cny-ai-web`.
