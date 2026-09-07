# Cloudflare Deployment Runbook

This project is Phase 6 ready. Use this runbook to deploy and verify.

## 1) Pre-deploy checks

Run locally:

```bash
npm install
npm run check
```

## 2) Cloudflare Pages setup

1. In Cloudflare dashboard, open Workers & Pages and create a Pages project from this repo.
2. Do not use the static Next.js export preset (it expects `out`).
3. Build command: `npm run build:pages`.
4. Root directory: repository root.
5. Build output directory: `.vercel/output/static`.
6. Add environment variables in both Preview and Production environments:

- `NEXT_PUBLIC_SITE_URL`
- `R2_PUBLIC_BASE_URL`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_RATE_LIMIT_PER_HOUR`

`NEXT_PUBLIC_SITE_URL` format notes:

- Preferred: full origin with scheme, for example `https://www.bitpuddle.com`.
- Bare domains like `www.bitpuddle.com` are normalized automatically at build time.
- Do not include a path.

7. Trigger initial preview deployment.

Why this matters:

- This app has dynamic routes (`/api/contact`, `/api/random-image`).
- The static export path (`out`) only works for fully static exports and will fail for this app.

## 3) Verify preview deployment

After deploy, run:

```bash
npm run verify:deploy -- https://<preview-url>
```

What this verifies:

- Home page is reachable.
- `/api/random-image` responds with expected payload shape.
- `/api/contact` rejects malformed payload with HTTP 400.

Optional live contact send verification:

```bash
VERIFY_CONTACT_SEND=1 CONTACT_TEST_PAYLOAD_JSON='{"name":"Test User","email":"you@example.com","message":"Testing contact pipeline from preview.","company":""}' npm run verify:deploy -- https://<preview-url>
```

## 4) Promote to production

1. Merge to production branch.
2. Confirm production deployment succeeds.
3. Run verification against production URL:

```bash
npm run verify:deploy -- https://<your-domain>
```

4. Confirm a real contact submission arrives in `CONTACT_TO_EMAIL`.

## 5) Notes

- If Cloudflare Pages framework support for full-stack Next.js changes, migrate to the Cloudflare Workers Next.js path while keeping the same environment variables and verification script.
- Current contact rate limiting is in-memory per runtime instance. For stricter global limits, migrate to KV or Durable Objects.
