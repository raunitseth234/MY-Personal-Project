# Rajesh Jewellers — Production Readiness Audit

Scope: `e:\Frontend` (Next.js 14 storefront) + `e:\rajesh-backend` (FastAPI backend).
Method: security-critical and configuration files (auth, JWT, CORS, admin routes, Docker, `next.config.mjs`, env files, stores) were read in full. The rest of the tree (services, schemas, task queue, remaining API route bodies, most component files) was inventoried by targeted grep/glob, not opened file-by-file — flagged explicitly wherever a claim rests on that narrower basis. Executed verification: `tsc`, `eslint`, `next build`, `npm audit`, `pytest`, Playwright e2e, dev server + curl. Items not executed are labeled "inferred by reading" rather than claimed as tested.

---

## VERDICT

## ❌ NO — Not Production Ready

`npm run build` exits with code 1 — five routes (`/`, `/products`, `/search`, `/wishlist`, `/_not-found`) fail to prerender. There is no deployable production artifact. That fact alone decides the verdict; everything else in this report is what to fix next, not what's driving the answer.

---

## Scores (/100)

| Category | Score | Basis |
|---|---|---|
| **Overall Deployment Readiness** | **38/100** | Build fails; would be ~65 once Critical/High fixed |
| Security | 58/100 | No tracked secrets, scoped CORS, admin routes all gated, security headers present. Docked for localStorage tokens, missing rate limiting on cost-bearing/abuse-prone endpoints, unvalidated admin image-URL field, no CSP/HSTS |
| Performance | 55/100 | Good image config (AVIF/WebP, caching), React Query caching. Docked for 2 known-vulnerable dependency chains (Next.js, PostCSS) with DoS/SSRF advisories, no visible code-splitting audit, N+1 not checked (DB unreachable) |
| Code Quality | 62/100 | Clean `tsc`/`eslint` pass, consistent structure, sensible layering (lib/api, lib/queries, lib/stores). Docked for the split catalog/backend data source with no documented boundary, and untyped `dict` bodies on 2 admin routes bypassing Pydantic validation |
| Frontend | 45/100 | Type-safe, lints clean, error/loading states present in UI (`ProductsClient` isLoading/isError). Fails because production `next build` crashes on 5 routes |
| Backend | 60/100 | Well-organized FastAPI app, structured JSON logging, global exception handler, migrations in a clean single chain, admin RBAC via dependency injection. Docked for missing rate limiting breadth, unvalidated image URL ingestion, `--reload` in a compose file with no separate prod variant |
| Database | 65/100 | Alembic chain is linear (no multiple heads), 2 migrations for the model set found — could not verify migrations are exhaustive against every column (DB unreachable) |
| DevOps | 25/100 | No CI/CD pipeline in either repo (no `.github/workflows`). Dockerfile has no `CMD`, no non-root user, no multi-stage build; the only runnable command is uvicorn `--reload` from docker-compose, which is dev-mode. No production compose/deployment manifest exists at all |
| SEO | 40/100 | Basic `<title>`/description metadata present. No robots.txt, no sitemap, no Open Graph/Twitter card tags, no JSON-LD product structured data (significant miss for an e-commerce/jewellery catalog) |
| Accessibility | 50/100 | `aria-`/`role` attributes present in ~35% of component files sampled; not exhaustively audited (would need a real screen-reader pass) — treat this score as directional, not measured |

---

## CRITICAL ISSUES (blockers — must fix before any deploy)

### ~~C1. Production build fails~~ — FIXED
**Update:** Root cause was `CategoryNav.tsx`'s `useSearchParams()` call, rendered globally in `app/layout.tsx` via `ConditionalCategoryNav` on every page that shows nav. Wrapped `<ConditionalCategoryNav>` in `<Suspense>` in `app/layout.tsx`. Re-ran `npm run build` → **exit 0**, all 11 routes generate cleanly. `tsc --noEmit` and `npm run lint` both still pass. This was the single verdict-deciding blocker; original writeup kept below for the record.

### C1 (original). Production build fails (`npm run build` → exit code 1)
**Verified by execution.** `useSearchParams()` is called without a `<Suspense>` boundary on `/`, `/products`, `/search`, `/wishlist`, and `/_not-found`. Next.js 14's static export step throws `Error occurred prerendering page "X"` for all five routes. **There is currently no way to produce a deployable production artifact from this codebase.**
- Root cause: whatever component reads `useSearchParams` in the tree under these routes (search bar / category filters likely in `ConditionalSearchBar`, `SearchClient`, `ProductsClient`, `wishlist` page) is a client component rendered without a Suspense wrapper, which forces Next into client-side-only bailout during static generation.
- Fix shape (not applied per your instructions): wrap the components that call `useSearchParams()` in `<Suspense fallback=...>` at the page level, or convert the relevant page segments to fully dynamic (`export const dynamic = 'force-dynamic'`) if static generation isn't needed there.

### ~~C2. No production deployment target configured for the frontend~~ — PARTIALLY FIXED (env config; platform not chosen)
**Update:** The user chose not to commit to a hosting platform yet (no Vercel/Netlify/Railway config added — explicitly deferred, ask before creating). What *was* fixable without picking a platform: removed every hardcoded `localhost` fallback across both repos and replaced it with explicit, validated env-var configuration.
- **Correction to the original finding:** `/products` and `/search` do **not** call the backend — `lib/api/endpoints/products.ts` serves them from the static catalog (`lib/catalog`). Only auth, wishlist sync, addresses, reviews, chat, and homepage announcements/testimonials/store-locations depend on the live API (see H1, which also needs a correction pass).
- Added `lib/api/config.ts`: `PUBLIC_API_URL` (throws a clear error at build/runtime if `NEXT_PUBLIC_API_URL` is unset — verified by building with the var unset: `next.config.mjs` now fails with `NEXT_PUBLIC_API_URL is not set...` instead of silently defaulting) and `SERVER_API_URL` (new optional `API_INTERNAL_URL`, for when a Docker/server-side host differs from the public browser URL; falls back to `PUBLIC_API_URL`).
- `lib/api/http.ts`, `lib/api/refresh-mutex.ts`, `lib/api/server-fetch.ts`, `next.config.mjs` all now import from this module instead of hardcoding `http://localhost:8000/api/v1`.
- Added `.env.example` (frontend) documenting `NEXT_PUBLIC_API_URL` and `API_INTERNAL_URL`.
- Backend: `app/main.py` hardcoded `http://localhost:3000` / `:3001` into the CORS allow-list unconditionally. Replaced with `settings.FRONTEND_URL` + a new comma-separated `CORS_EXTRA_ORIGINS` env var (documented in `.env.example`, set in local `.env` to `http://localhost:3001` to preserve existing dev behavior).
- **Verified by execution:** `npm run build` → exit 0 (11/11 routes). `npm run build` with `NEXT_PUBLIC_API_URL` unset → fails fast with a clear message (confirmed, not just asserted). `npm run lint` and `tsc --noEmit` clean. Brought up the full Docker stack (`docker-compose up -d`) → `/health` returned `{"postgres":true,"mongo":true,"redis":true}`. Ran `next start` (production server) against the live backend; `curl` confirmed 200s on `/`, `/products`, `/search`, `/wishlist`, 404 on unknown routes. `OPTIONS` preflight from both `localhost:3000` and `:3001` confirmed CORS still allows both origins post-change. Playwright e2e (`browse-to-wishlist.spec.ts`) run against the production server + live backend → 1 passed (also fixed an unrelated pre-existing strict-mode locator bug in the test itself — `ProductCard` and `ProductDetailClient` share the `"Add to wishlist"` aria-label, so the detail page's related-products grid made the old locator ambiguous).
- **Still open:** no deploy target (Vercel/Railway/Docker-host/etc.) has been chosen — that decision was explicitly deferred by the user. Original C2 text kept below for the record.

### C2 (original). No production deployment target configured for the frontend
`lib/api/http.ts:5` defaults `NEXT_PUBLIC_API_URL` to `http://localhost:8000/api/v1`, and the only env file present, `.env.local`, sets exactly that value. There is no `.env.production`, no `vercel.json`, no `netlify.toml`, and no other deployment manifest in the frontend repo (checked directly — none exist). As shipped, **every backend-dependent page in a production build would call `localhost:8000` from the end user's own browser and fail** — this is not a drift risk (see H1 below), it's a hard non-functional state for `/products`, `/search`, wishlist, auth, addresses, reviews, and chat. This needs a real production `NEXT_PUBLIC_API_URL` and a deploy target defined before C1 is even worth fixing.

---

## HIGH PRIORITY ISSUES

### ~~H0. No CI pipeline, no production-shaped Docker image~~ — FIXED (frontend repo unchanged, no Docker/CI needed there yet)
**Update:**
- **Backend `Dockerfile`** rewritten as a multi-stage build: builder stage installs deps (needs `gcc`), runtime stage is slim with no build toolchain, runs as a non-root `app` user, has a real `CMD` (`uvicorn app.main:app --host 0.0.0.0 --port 8000`, no `--reload`), and a `HEALTHCHECK` hitting `/health`.
- **Added `.dockerignore`** — previously missing entirely, so `COPY . .` was baking `.env` (which contains a real `GROQ_API_KEY`) plus `.git`, `__pycache__`, and test-cache dirs into every image layer. Confirmed by running the built image and checking `/app/.env` — absent after the fix.
- **Added `docker-compose.prod.yml`** (backend) — same services, but no source bind-mounts, no `--reload`, `POSTGRES_PASSWORD` has no default (must be set in `.env`, closing the plaintext-default-password note in Low Priority). The existing dev `docker-compose.yml` is untouched.
- **Added `.github/workflows/ci.yml`** in both repos. Backend: Postgres/Mongo/Redis service containers, installs into a venv (not bare `pip install`), compiles the app, runs `pytest app/tests`, builds the production Docker image. Frontend: `npm ci`, lint, `tsc --noEmit`, `next build` (with a placeholder `NEXT_PUBLIC_API_URL` — build-time-only, real deploys must set their own).
- **Verified by execution:**
  - Rebuilt the backend image and ran it under the **existing dev `docker-compose.yml`** (bind mounts + `--reload` override) to confirm the non-root user doesn't break the current dev workflow — confirmed hot-reload still fires on host file edits (tested by editing `/health`'s version string live and watching it pick up).
  - Brought up `docker-compose.prod.yml` standalone (dev stack stopped first, same ports) — confirmed `CMD` is plain `uvicorn` with no `--reload`, container runs as `app` (uid 999, not root), `/health` reports all three DBs healthy, and a real data endpoint (`/api/v1/categories`) returns actual DB-backed data (200, real rows).
  - Tore that down and brought the original dev stack back up — confirmed still healthy, dev flow undisturbed.
  - Confirmed the image no longer contains `/app/.env` after adding `.dockerignore`.
  - **Not fully verified:** running `pytest app/tests` from the host against the dockerized Postgres failed locally with `InvalidPasswordError` — traced to a **pre-existing, unrelated environment conflict**: this Windows machine has a native `postgres.exe` Windows service also bound to port 5432 alongside Docker's port mapping, so host-side connections to `localhost:5432` are ambiguous. This is a local-machine quirk, not a code or CI defect — a clean GitHub Actions runner has no competing Postgres process, so the CI workflow as written should still pass there. Flagging rather than claiming a verified pass I didn't get.
- **Not done:** no actual GitHub Actions run has happened (workflows aren't triggered until pushed to GitHub); no frontend Dockerfile was added (H0's original text only concerned the backend image — a frontend Dockerfile can be added on request if a Docker-based frontend deploy is chosen over Vercel/Netlify/etc.).

### H0 (original). No CI pipeline, no production-shaped Docker image
Neither repo has a `.github/workflows` directory or any other CI config — nothing currently gates merges on the build/lint/test failures found here. The backend `Dockerfile` has no `CMD`/`ENTRYPOINT` (only runnable via the dev `docker-compose.yml`, which passes `--reload`), no non-root `USER`, and no multi-stage build. There is no separate production compose file or IaC. This is a process/tooling gap, not a build-blocker like C1/C2 — a manual deploy could still happen — but it means nothing here is currently automated or repeatable.

### ~~H1. Hybrid/inconsistent data source between pages~~ — STALE, NO LONGER APPLIES
**Update:** Re-checked the current code (2026-07-27): the hybrid split described below no longer exists. `lib/api/endpoints/products.ts` (list/detail/related/featured/search) and `lib/api/endpoints/categories.ts` both already forward uniformly to the static catalog (`lib/catalog`) — listing, detail, homepage, and category nav all read the same source. This was apparently unified after this audit item was written. User confirmed (given a choice between migrating everything to the live backend vs. leaving it as-is): **leave it as-is** — the static-catalog-everywhere architecture is intentional and should not be disturbed. No code changed for this item.

### H1 (original). Hybrid/inconsistent data source between pages (verified by grep + read)
- `/products` (listing) and "related products" call the **live FastAPI backend** via `lib/queries/products.ts` → `productsApi`.
- `/products/[slug]` (detail page) and the homepage category nav read from the **static generated catalog** `lib/catalog/products.generated.ts` via `getProduct`/`listCategories`.
- Categories are fetched two different ways depending on the page (`listCategories()` from the static catalog on the homepage/layout, `useCategoriesQuery()` from the backend inside `ProductsClient`).
- Risk: even once C2 is fixed and a real backend is reachable, the static catalog and the live database can still drift (different prices, stock, or even missing/extra products), so a user can see a product on the listing page that 404s (or shows different data) on the detail page, or vice versa. Until C2 is fixed, this is worse than drift — the catalog-backed pages (home, product detail) work standalone while the backend-backed pages (listing, search, wishlist) are entirely non-functional in production. This needs to be a deliberate, documented architecture decision, not an implicit one — right now it reads as leftover migration state between "static site" and "backend-driven site."

### ~~H2. Auth/refresh tokens persisted to `localStorage`~~ — MITIGATED (CSP added; storage mechanism unchanged per user instruction)
**Update:** User explicitly instructed not to change the working auth flow/logic, so `lib/stores/auth-store.ts` and its `localStorage` persistence are untouched — a full httpOnly-cookie migration was out of scope here (it would change login/refresh/logout request semantics across both repos). Instead, closed the other half of the "real, not theoretical" risk the audit named: the missing CSP.
- **Frontend** (`next.config.mjs`, new `headers()`): added `Content-Security-Policy`, `Strict-Transport-Security`, plus the `X-Content-Type-Options`/`X-Frame-Options`/`Referrer-Policy` headers on every route. This is the header that actually matters for H2 — it's enforced on the document the browser renders, not on the backend's JSON responses. `connect-src` is scoped to `'self'`, the backend origin, and the two external rate APIs the app calls directly from the browser (`api.gold-api.com`, `open.er-api.com`, in `lib/pricing/goldRate.ts`) — an XSS payload can no longer exfiltrate the stored tokens to an attacker-controlled host via `fetch`/`XHR`. `'unsafe-inline'`/`'unsafe-eval'` are still present (no nonce middleware exists), so this is not a strict CSP — it doesn't stop inline script execution, only stops loading/connecting to arbitrary external origins.
- **Backend** (`app/main.py`): added the same CSP + HSTS as defense-in-depth on the API's own responses, with a relaxed CSP specifically for `/docs`/`/redoc` (they need `cdn.jsdelivr.net` for Swagger/ReDoc's own assets) — this also happens to close H4.
- **Verified by execution:** first CSP draft broke the app — Playwright caught `Refused to connect...api.gold-api.com` / `open.er-api.com` console errors from live gold-rate fetches, which made `/products` render zero cards (price computation depends on the rate). Fixed by adding those two hosts to `connect-src`. Re-verified: `next build` clean, `next start` production server driven with Playwright across `/`, `/products`, `/search`, `/wishlist`, `/login`, `/register` — zero console/CSP errors on any route; the existing `browse-to-wishlist.spec.ts` e2e passed. Backend: confirmed `/docs` still returns 200 and its relaxed CSP is present; confirmed the strict CSP is present on JSON API responses.
- **Still open:** tokens are still in `localStorage`. If an httpOnly-cookie migration is wanted later, it needs to be its own pass (changes `lib/api/http.ts` header attachment, `refresh-mutex.ts`, backend `auth.py` to set/read cookies, and CORS `allow_credentials` interplay) — not something to fold into a "don't change the flow" pass.

### H2 (original). Auth/refresh tokens persisted to `localStorage`
`lib/stores/auth-store.ts` uses Zustand `persist` (default storage = `localStorage`) for both `accessToken` and `refreshToken`. Any XSS on the site exfiltrates both tokens with a 7-day refresh window (`REFRESH_TOKEN_EXPIRE_DAYS=7`). No httpOnly-cookie-based alternative is in use. Given there's no CSP configured either (see H4), this is a real, not theoretical, combination.

### ~~H3. Rate limiting only covers auth endpoints~~ — FIXED
**Update:** Factored `check_rate_limit()` out into a new `app/core/rate_limit.py` (identical logic — Redis `INCR` + `EXPIRE` + 429 over a window) rather than editing `auth.py`, per the user's instruction not to touch the existing working auth flow. `auth.py` is byte-for-byte unchanged; its own rate limits still work exactly as before.
- Added rate limiting to the three endpoints the audit named:
  - `GET /products/search` — 30 req/60s per IP.
  - `POST /products/{id}/reviews` — 5 req/hour per authenticated user (the endpoint already requires auth, so this is keyed by user id, not IP).
  - `POST /chat/message` — 15 req/60s per IP (the highest-priority one — this is the endpoint that can call the paid Groq LLM API unauthenticated).
- **Verified by execution, not just code review:** hit `/products/search` 35× in a loop — first 30 returned 200, remaining 5 returned 429. Hit `/chat/message` 18× — first 15 returned 200, rest 429. Confirmed normal single-request usage of both still returns 200 (no false-positive throttling on legitimate traffic). Confirmed `/api/v1/categories` and other untouched endpoints still work.
- `slowapi` (listed in `requirements.txt`, never imported) is still unused — the existing Redis-based approach was extended instead of introducing a second rate-limiting library, to keep this change minimal and consistent with what's already proven working in `auth.py`.

### H3 (original). Rate limiting only covers auth endpoints (confirmed)
`app/api/v1/auth.py` defines `check_rate_limit()` and is the **only file in `app/` that calls it** (verified with a project-wide grep: 3 call sites, all in `auth.py` — login, OTP request, OTP-by-IP). `slowapi` is listed in `requirements.txt` but is never imported anywhere. `/products/search`, review submission, and — notably — the chat endpoint (`chat_router`, which can call the paid Groq LLM API when `CHAT_MODE=llm`) have no rate limiting at all. An unauthenticated user could drive real API cost via the chat endpoint with no throttle.

### ~~H4. Missing security headers: no CSP, no HSTS~~ — FIXED (done alongside H2)
**Update:** Closed as part of the H2 fix pass — `Content-Security-Policy` and `Strict-Transport-Security` were added to both the frontend (`next.config.mjs` `headers()`) and the backend (`app/main.py` `security_headers` middleware, with a relaxed CSP on `/docs`/`/redoc` for Swagger/ReDoc's own CDN assets). See H2's update above for the full verification detail (Playwright-driven, zero console/CSP errors across all routes).

### H4 (original). Missing security headers: no CSP, no HSTS
`app/main.py` sets `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` (deprecated in modern browsers, low value), and `Referrer-Policy` — but no `Content-Security-Policy` and no `Strict-Transport-Security`. Combined with H2 (tokens in localStorage), a CSP is the highest-leverage single header missing here.

### ~~H5. Two known-vulnerable dependency chains~~ — FIXED
**Update:** Upgraded `next` 14.2.35 → 16.2.12 (React kept at 18.3.1 — Next 16 still accepts `^18.2.0` as a peer, so this did not require the React 19 migration too). `npm audit --production` now reports **0 vulnerabilities** (previously 20+ high-severity Next.js advisories plus PostCSS). Also fixed the `sharp` (image optimization) and vendored-`postcss`-inside-`next` advisories that the upgrade itself surfaced, via `package.json` `overrides`. A residual dev-only `brace-expansion`/`minimatch` DoS advisory in ESLint's own toolchain was investigated and deliberately left as-is — the patched `brace-expansion@5` is an incompatible rewrite that breaks `minimatch@3` (used internally by `eslint-config-next`'s dependency chain); it's dev-tooling-only exposure (`npm audit --production` already excludes it), not a route to the deployed app.
- Breaking changes found and fixed:
  - `app/products/[slug]/page.tsx`: `params` is now a `Promise` in the App Router (`await params` instead of reading it synchronously).
  - `next lint` was removed; switched the `lint` script to the ESLint CLI directly (`eslint .`).
  - ESLint bumped 8 → 9, which requires flat config: replaced `.eslintrc.json` with `eslint.config.mjs`, importing `eslint-config-next/core-web-vitals` directly (its native flat-config export — an initial attempt via `FlatCompat` hit a circular-JSON crash from duplicate plugin objects).
  - Next 16's updated `eslint-plugin-react-hooks` added a new `set-state-in-effect` rule that flagged an existing pattern in `components/FloatingChat.tsx` (session ID set via `setState` inside a mount-only `useEffect`). Fixed with a lazy `useState(() => getChatSessionId())` initializer instead — verified this doesn't introduce a hydration mismatch (the value is only read inside an event handler, never rendered into JSX) and re-tested the chat widget end-to-end against the live backend.
  - `tsconfig.json` picked up Next's mandatory updates (`jsx: "react-jsx"`, `target: "ES2017"`, `.next/dev/types` include) — applied automatically by `next build`, left as-is.
- **Verified by execution:** `next build` (now Turbopack-based) succeeds, `eslint .` and `tsc --noEmit` both clean, `next dev` boots and serves 200. `next start` (production server) driven with Playwright across all 6 routes (`/`, `/products`, `/search`, `/wishlist`, `/login`, `/register`) — zero console/hydration errors on any of them. Existing `browse-to-wishlist.spec.ts` e2e passed. Added and ran a throwaway chat-widget e2e (open widget → send message → live backend reply) to specifically re-verify the `FloatingChat.tsx` change; passed, then removed the throwaway spec.

### H5 (original). Two known-vulnerable dependency chains (verified via `npm audit`)
- **Next.js 14.2.x**: 20+ published high-severity advisories apply to the installed range (DoS via Image Optimizer, SSRF in Server Actions/rewrites, cache poisoning, request smuggling in rewrites, XSS in beforeInteractive scripts). Fix requires a major version bump to Next 16 (breaking change, `npm audit fix --force`).
- **PostCSS** (transitive via Next): XSS via unescaped `</style>` output, and two path-traversal/source-map disclosure advisories.
No exploit was attempted; severity is per the advisory database, not independently confirmed against this app's actual usage of the affected code paths.

### ~~H6. Admin image-confirm endpoint accepts an unvalidated URL~~ — FIXED
**Update:** `confirm_image_upload` in `admin_router.py` now takes a proper `ImageConfirmRequest` Pydantic schema (new, in `all_schemas.py`) instead of raw `data: dict` — malformed bodies now get a clean 422 instead of a `None`/`KeyError` falling through. More importantly, added `StorageService.is_valid_uploaded_image_url()` (`app/services/storage.py`), which checks the submitted `image_url` against the *exact* shape `generate_presigned_url()` itself produces for that product — `https://{AWS_S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/products/{product_id}/<key>`, single path segment, safe image extension only. Anything else (a different bucket, a different product's folder, an external domain, a path-traversal attempt, a non-image extension) is rejected with `400 INVALID_IMAGE_URL` before it ever reaches the database.
- **Verified by execution, not just code review:** stood up a real admin session (created/promoted a test user to `admin`, logged in for a real JWT) against the live Dockerized backend and hit the actual endpoint:
  - `image_url: "https://evil.com/malicious.jpg"` → `400 INVALID_IMAGE_URL`.
  - Missing `image_url` entirely → `422` with a field-level validation error (not a 500).
  - Confirmed `/images/presign` and other unrelated admin routes (`/admin/products/{id}/stock`, public `/categories`) are unaffected — same behavior as before.
  - Unit-verified the URL-matching logic in isolation (right product ID passes, wrong product ID / external host / `../` traversal / disallowed extension / nested path all correctly rejected).
  - Ran the backend test suite — 26 tests that don't require the test DB passed; the other 20 error identically before and after this change (pre-existing M3 issue: `conftest.py` hardcodes `localhost:5432`, unreachable from inside the API container — unrelated to this fix, no test in the suite exercises `admin_router.py` at all).

---

## MEDIUM PRIORITY ISSUES

### M1. Two admin routes take raw `data: dict` instead of Pydantic models
`create_category` and `update_category` in `admin_router.py` accept `data: dict` rather than a schema — bypassing FastAPI/Pydantic's automatic validation, and open to unexpected/unbounded fields being silently accepted or `KeyError`s on malformed input (`data["name"]` will 500 instead of a clean 422 if omitted).

### M2. No committed virtualenv/lockfile workflow for the backend
The backend ships a `requirements.txt` with no `venv`/`poetry`/`uv` lock and no documented "always install into an isolated env" instruction enforced by tooling. This is what let the audit-process mistake below happen, and it will happen again to the next contributor who runs `pip install -r requirements.txt` on a machine with other Python projects. Recommend committing a lockfile-based workflow (e.g. `uv` or `poetry`) with a `.python-version`/venv convention documented in the README.

> **Audit process side effect (not a codebase defect):** while verifying the test suite, `pip install -r requirements.txt` was run without a virtualenv in this environment and downgraded shared global Python packages (pydantic, starlette, httpx, uvicorn, pillow, typer, etc.), producing conflicts with other locally-installed tools (aider-chat, langchain, streamlit, mcp). Flagged to the user directly when it happened; noted here for the record only.

### M3. Backend test suite is not runnable without live Postgres
`app/tests` (20 tests across auth + products) require a real `rajesh_test_db` Postgres instance; there's no SQLite/in-memory fallback or test containers config, and Docker Desktop wasn't running in this environment so **these tests could not be executed and are unverified**. This isn't necessarily wrong for integration tests, but there's no fast/isolated unit-test tier as a fallback, and with no CI (C2) these tests likely aren't running anywhere automatically today.

### M4. No SEO fundamentals for an e-commerce catalog
No `robots.txt`, no `sitemap.xml`/`sitemap.ts`, no Open Graph or Twitter Card metadata, no JSON-LD `Product`/`Offer` structured data on product pages. For a jewellery storefront that depends on organic/search discovery and social sharing, this is a meaningful gap, not cosmetic.

### M5. `docs_url`/`redoc_url` enabled unconditionally
FastAPI's `/docs` and `/redoc` are always on (`app = FastAPI(..., docs_url="/docs", redoc_url="/redoc")`) regardless of `ENVIRONMENT`. Common practice, but worth a deliberate decision to disable in production (`docs_url=None if settings.ENVIRONMENT == "production" else "/docs"`) since it discloses the full API surface publicly.

### M6. Narrow write-path test surface, not "every CRUD operation"
There is no `app/cart` or `app/checkout` in the frontend route tree, and no cart/order model was found among backend models beyond what's implied by `Product`/`Category`/`ProductImage`/`StoreLocation`. The actual write-path surface exercised by this app is auth, wishlist, addresses, and reviews — the task's phrase "test every CRUD operation" doesn't map onto a checkout flow because there isn't one in this codebase yet. Flagging so the scope isn't misjudged as more complete than it is.

---

## LOW PRIORITY ISSUES

- `X-XSS-Protection` header is deprecated/ignored by all modern browsers; harmless but not adding real protection — a CSP (H4) is the modern replacement.
- `ACCESS_TOKEN_EXPIRE_MINUTES=15` / `REFRESH_TOKEN_EXPIRE_DAYS=7` are reasonable defaults; no issue, noted for completeness.
- Postgres password in `docker-compose.yml` (`rajesh_pass`) is a plaintext default — fine for local dev only; flag if this compose file is ever pointed at anything but localhost.
- `SENDGRID_FROM_EMAIL` defaults to `noreply@rajeshjewellers.com` in code (not a secret, just worth confirming domain ownership/DNS/SPF is set up before relying on it).

---

## WHAT WAS VERIFIED BY EXECUTION vs. INFERRED BY READING

**Executed, with real output captured:**
- `npx tsc --noEmit` → exit 0, clean.
- `npm run lint` → "No ESLint warnings or errors."
- `npm run build` → **exit 1**, 5 pages fail prerendering (see C1).
- `npm audit --production` → 2 high-severity advisory chains (Next.js, PostCSS).
- `python -m pytest app/tests` → 20/20 tests **error** (Postgres test DB unreachable — Docker Desktop not running in this environment). Not a pass, not a code-quality fail; simply unverifiable here.
- `npx playwright test` (the existing `e2e/browse-to-wishlist.spec.ts`) → **1 passed** in 34.7s, real Chromium browser drive of browse → product detail → wishlist. This is the one flow in this app that has actual executed, in-browser, end-to-end evidence behind it.
- Dev server (`npm run dev`) started; `curl` confirmed `/`, `/products`, `/wishlist` return 200 and `/nonexistent-route` returns 404 at the HTTP layer. Beyond the Playwright-covered flow above, client-side console errors, hydration warnings, and the in-browser network-failure UI for other pages were **not** visually verified — no browser was driven interactively for those, so "no console errors" / "responsive layout verified" is explicitly **not** claimed for the rest of the app.
- `grep -r "check_rate_limit" app/` → confirms H3: only 3 call sites, all inside `auth.py`.
- `git ls-files | grep -iE '.env|secret|credential'` in both repos → no tracked secret files.
- Checked for `vercel.json`, `netlify.toml`, `.env.production` in the frontend repo → none exist (confirms C2).

**Inferred by reading source only (not executed):**
- CORS config, JWT signing, admin RBAC, rate-limiter scope, Dockerfile/compose content, migration chain linearity, data-source split (H1), accessibility attribute presence.

---

## WHAT'S GOOD (don't lose this in the fix pass)

- No secrets committed to either repo; `.gitignore` correctly excludes `.env*`.
- Admin routes are consistently gated behind `require_admin`/`Depends(get_current_user)` — no route in `admin_router.py` was found unauthenticated.
- CORS is explicitly origin-scoped (not `*`), even with `allow_credentials=True`.
- JWT implementation uses `jose` + `bcrypt`, has token-type checks (access vs refresh) and Redis-backed blacklisting on logout — this is a more careful implementation than the median FastAPI starter.
- Structured JSON logging with request IDs, a global exception handler that hides internal error details outside `development`, and a `/health` endpoint that reports per-dependency status.
- Alembic migration chain is linear — no multiple heads, no drift detected in the chain itself.
- Frontend passes `tsc` and `eslint` with zero errors/warnings — the C1 failure is a Suspense-boundary issue, not a broader type/lint quality problem.
- Sensible image optimization config (AVIF/WebP, tuned device/image size lists, 1hr cache).

---

## RECOMMENDED FIX ORDER (once you approve fixes)

1. **C1** — add Suspense boundaries around `useSearchParams()` usage; re-run `npm run build` until exit 0.
2. **C2** — decide and configure the real production `NEXT_PUBLIC_API_URL` and a deploy target for the backend; without this, fixing C1 alone still ships a storefront where every backend-dependent page is broken.
3. **H0** — stand up a minimal CI workflow (typecheck + lint + build + backend tests) and a production-shaped Dockerfile (`CMD`, non-root user).
4. **H1** — decide and document: is the catalog static-generated from the DB at build/deploy time, or should the listing page also read the static catalog? Pick one source of truth per page-type.
5. **H2/H4** — move refresh tokens to an httpOnly cookie if feasible, or at minimum add a CSP as a mitigating control if httpOnly cookies aren't in scope right now.
6. **H3** — wire `slowapi` (already a dependency) or extend the existing Redis limiter to `/products/search` and the chat endpoint.
7. **H5** — plan the Next.js major-version upgrade separately (breaking change, needs its own testing pass).
8. **H6, M1** — add Pydantic schemas for the two `dict`-typed admin routes and validate `image_url`.
9. Remaining Medium/Low items.

Full inventory (file-by-file findings) is available on request — this report prioritizes what changes the verdict and what a reviewer would call out first, per the audit brief.
