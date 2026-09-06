# Vanity Site Blueprint

This repository will host a mostly static personal site on Cloudflare Pages with:

- A minimal home page gallery that shows one random image from Cloudflare R2.
- An About page.
- A Contact page backed by Resend.

R2 strategy selected: public bucket with CDN URL (option 1).

## 1) Goals

### Product goals

- Clean, minimal, modern visual design.
- Index page as the primary visual experience.
- Fast page loads, especially on mobile.

### Technical goals

- Deploy on Cloudflare Pages.
- Source images from Cloudflare R2 public bucket.
- Keep the site mostly static and progressively enhanced.
- Keep markup standards-adherent and accessible.

## 2) Architecture

### Stack

- Framework: Next.js (App Router).
- Hosting: Cloudflare Pages.
- Dynamic endpoints: Cloudflare Functions via Next API routes.
- Image storage: Cloudflare R2 public bucket.
- Email: Resend API.

### Rendering approach

- Home page server-renders one random image so content works without JavaScript.
- JavaScript progressively enhances the page with a smooth "show another" action.
- About page is fully static.
- Contact page is static form UI that posts to a server endpoint.

## 3) Proposed File Map

```
.
├── README.md
├── assets/                         # local source images (optional local fallback)
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # home/gallery
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── api/random-image/route.ts   # returns one random image object
│   └── api/contact/route.ts        # validates and forwards to Resend
├── components/
│   ├── SiteHeader.tsx
│   ├── GalleryFrame.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── image-manifest.ts           # image list and helpers
│   ├── validation.ts               # zod schemas for contact payload
│   └── rate-limit.ts               # simple anti-abuse guard
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── next.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.toml                   # optional, if using direct wrangler config
```

## 4) Data Contracts

### Random image response

`GET /api/random-image`

```json
{
	"id": "news",
	"url": "https://images.example.com/news.jpg",
	"alt": "Street scene with newspaper stands",
	"width": 1800,
	"height": 1200
}
```

Notes:

- `alt` should be curated, not inferred.
- Width and height are optional at first, then filled in later for layout stability.

### Contact form payload

`POST /api/contact`

```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Hello",
	"company": ""
}
```

Rules:

- `company` is a honeypot field and must stay empty.
- Validate email format and message length on server side.

## 5) Environment Variables

Set these in Cloudflare Pages project settings.

- `R2_PUBLIC_BASE_URL` = public domain for the bucket, for example `https://images.yourdomain.com`
- `RESEND_API_KEY` = Resend API key
- `CONTACT_TO_EMAIL` = destination inbox
- `CONTACT_FROM_EMAIL` = verified sender, for example `site@yourdomain.com`
- `CONTACT_RATE_LIMIT_PER_HOUR` = for example `10`

## 6) Home Page Experience Spec

### Baseline (no JS)

- Display one server-rendered image in a semantic `figure`.
- Include meaningful alt text.
- Show page title, small nav, and a minimal caption area.

### Progressive enhancement

- Add "Show another" button that fetches `/api/random-image`.
- Fade transition between current and next image.
- Prefetch one additional image after each render.
- Respect `prefers-reduced-motion` by disabling animation.

### Performance targets

- LCP under 2.5s on broadband mobile profile.
- Serve responsive images with `sizes`.
- Cache image assets strongly on CDN.

## 7) Contact Feature Spec (Resend)

### Server behavior

- Parse and validate JSON payload.
- Reject obvious spam and invalid input.
- Apply lightweight rate limiting per IP.
- Send email through Resend.
- Return clear success/error states.

### Client behavior

- Inline validation and disabled submit while sending.
- Success message after send.
- Retry-friendly error message for failures.

## 8) Accessibility and Standards Checklist

- Semantic landmarks (`header`, `main`, `footer`).
- Keyboard-accessible controls and visible focus states.
- Color contrast at WCAG AA minimum.
- Proper form labels and `aria-live` status for submit result.
- Valid HTML and no console errors.
- Motion disabled for reduced-motion users.

## 9) Cloudflare Setup Plan

### R2

1. Create bucket (for example `vanity-images`).
2. Upload images from `assets/`.
3. Enable public access and attach custom domain (for example `images.yourdomain.com`).
4. Confirm a sample object URL resolves publicly.

### Pages

1. Create Pages project connected to this repository.
2. Build command: `npm run build`.
3. Output directory: framework default for Next on Pages adapter.
4. Add environment variables listed above.
5. Deploy preview and production.

### Resend

1. Verify sender domain in Resend.
2. Create API key with least privileges.
3. Set `RESEND_API_KEY` and sender/recipient env vars in Pages.
4. Test with a known inbox.

## 10) Build Sequence (Execution Checklist)

### Phase 1: scaffold and base styles

1. Initialize Next.js with TypeScript and App Router.
2. Build global design tokens for spacing, typography, color.
3. Add base layout and navigation.

### Phase 2: gallery foundation

1. Create `lib/image-manifest.ts` with image ids and alt text.
2. Implement `/api/random-image`.
3. Render first random image on `app/page.tsx`.
4. Add progressive enhancement button and transition.

### Phase 3: about and contact pages

1. Implement `app/about/page.tsx` with short personal profile.
2. Implement `app/contact/page.tsx` and form component.

### Phase 4: resend integration

1. Add validation schema and anti-spam checks.
2. Implement `/api/contact` route to call Resend.
3. Add success/error UX states.

### Phase 5: hardening

1. Accessibility pass.
2. Metadata and Open Graph tags.
3. Performance pass (image sizing, caching headers, preload).

### Phase 6: deploy and verify

1. Deploy to Cloudflare Pages preview.
2. Verify random image endpoint and contact delivery.
3. Promote to production.

## 11) Testing Plan

### Manual checks

- Home loads with image when JS is disabled.
- "Show another" works repeatedly without layout shift.
- About and Contact pages are responsive and keyboard-friendly.
- Contact submits and email is received.

### Automated checks

- Add basic endpoint tests for validation behavior.
- Add linting and typecheck in CI.

## 12) Definition of Done

- Home page shows random R2 image with curated alt text.
- Progressive enhancement works while preserving no-JS baseline.
- About and Contact pages are complete and consistent with design.
- Contact form sends successfully through Resend.
- Site is deployed to Cloudflare Pages with production env vars.
- Accessibility and standards checklist items are satisfied.

## 13) Immediate Next Tasks

1. Scaffold Next.js app in this repository.
2. Create initial image manifest from the current `assets/` filenames.
3. Build and ship home page MVP first, then add contact pipeline.

## Current Status

- Phase 1 complete: scaffold, layout, base styles.
- Phase 2 complete: image manifest, random-image endpoint, progressive gallery.
- Phase 3 complete: full About page and Contact form UI.
- Phase 4 complete: Resend-backed `/api/contact` with validation and rate limiting.
- Phase 5 complete: metadata/OG, robots/sitemap, accessibility pass, and gallery prefetch hardening.
- Phase 6 complete: deployment runbook, predeploy check script, and URL verification script.

### Local env quickstart

Copy `.env.example` to `.env.local` and fill in:

- `R2_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_RATE_LIMIT_PER_HOUR`

## Deployment Runbook

See `DEPLOY.md` for:

- Cloudflare Pages setup steps
- preview and production verification commands
- optional live contact send verification
