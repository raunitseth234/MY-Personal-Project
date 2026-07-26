# Rajesh Jewellers — Backend API

FastAPI backend for **Rajesh Jewellers** (A unit of Shree Vishwanath Prasad Seth).

```
Stack: FastAPI · PostgreSQL · MongoDB · Redis · Celery · Docker
```

---

## First Run (5 minutes)

```bash
# 1. Clone and setup
cp .env.example .env          # no changes needed for local dev

# 2. Start all services
docker-compose up -d

# 3. Run DB migrations
docker-compose exec api alembic upgrade head

# 4. Seed sample data (30 products, categories, banners, testimonials)
docker-compose exec api python scripts/seed.py

# 5. Create admin user
docker-compose exec api python scripts/create_admin.py

# 6. Verify everything works
curl http://localhost:8000/health
```

Open Swagger docs: **http://localhost:8000/docs**

---

## Local Development Without Docker

> ⚠️ **Always install into an isolated virtualenv.** Running
> `pip install -r requirements.txt` against your global/system Python will
> downgrade shared packages and break other Python tools on your machine. The
> project targets the Python version in `.python-version` (**3.11**).

```bash
# 1. Create and activate an isolated environment (once)
python -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\Scripts\Activate.ps1     # Windows PowerShell
# source .venv/Scripts/activate  # Windows Git Bash

# 2. Install dependencies
pip install -r requirements.txt          # direct deps (top-level pinned)
# — or, for the exact pinned resolution (direct + transitive):
pip install -r requirements.lock         # see note below: lock is platform-specific

# 3. Run the fast unit tests (no services needed)
pytest app/tests/unit -v
```

`.venv/` is gitignored. Postgres/MongoDB/Redis are still needed for running the
app itself and the integration test tier — use `docker-compose up -d` for those.

### Dependency files

| File | Purpose |
|------|---------|
| `requirements.txt` | Human-maintained **direct** dependencies (edit this to add/upgrade). |
| `requirements.lock` | Exact resolution (direct + transitive). **Platform-specific** — the committed copy was generated on Windows, so Linux-only deps like `uvloop` are absent; regenerate on the Linux deploy target for a reproducible prod install. Regenerate with `pip freeze --exclude-editable > requirements.lock` inside a clean `.venv`. |
| `.python-version` | Pins the interpreter version (3.11) for pyenv / tooling. |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Frontend                     │
│                  (localhost:3000)                       │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP REST API
┌─────────────────▼───────────────────────────────────────┐
│              FastAPI (localhost:8000)                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Auth   │ │ Products │ │  Cart/   │ │  Admin   │  │
│  │  + OTP   │ │  Search  │ │  Orders  │ │Analytics │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└───────┬───────────────┬────────────────┬────────────────┘
        │               │                │
┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│  PostgreSQL  │ │   MongoDB   │ │    Redis    │
│  (products   │ │  (search    │ │  (cache,    │
│   orders     │ │   logs,     │ │   sessions, │
│   users)     │ │   chat)     │ │   OTP)      │
└──────────────┘ └─────────────┘ └─────────────┘
        │
┌───────▼──────────────────────────────────────┐
│           Celery Worker (background)         │
│   - Order confirmation emails                │
│   - Abandoned cart reminders (daily)         │
└──────────────────────────────────────────────┘
```

---

## API Endpoints Summary

| Group       | Endpoints                                              |
|-------------|--------------------------------------------------------|
| Auth        | register, login, refresh, logout, OTP, /me             |
| Addresses   | CRUD                                                   |
| Products    | list, featured, search, detail, related, recently-viewed |
| Categories  | tree                                                   |
| Cart        | get, add, update, remove, clear, count                 |
| Wishlist    | get, toggle, move-to-cart                              |
| Orders      | checkout, webhook, list, detail, cancel                |
| Coupons     | validate                                               |
| Homepage    | announcements, hero-banners, testimonials, trust-stats |
| Chat        | message, history                                       |
| Store       | locations                                              |
| Admin       | product CRUD, order mgmt, analytics, coupons           |

---

## WHAT YOU MUST DO MANUALLY

These require external accounts — code stubs are ready, just add keys to `.env`:

| Feature       | What to do                                        | .env key                     |
|---------------|---------------------------------------------------|------------------------------|
| Payments      | Create Razorpay account + KYC                     | `RAZORPAY_KEY_ID` etc.       |
| OTP SMS       | Register MSG91 + DLT (mandatory in India)         | `MSG91_AUTH_KEY` etc.        |
| Email         | Create SendGrid account + verify sender domain    | `SENDGRID_API_KEY`           |
| Product Images| Create AWS S3 bucket + IAM user with S3 access    | `AWS_ACCESS_KEY_ID` etc.     |
| AI Chat       | Get a Groq API key (console.groq.com), set `CHAT_MODE=llm` | `GROQ_API_KEY`         |
| Deployment    | Buy domain, setup EC2/Railway, configure SSL       | `FRONTEND_URL`               |

---

## Test Commands

Tests come in two tiers:

| Tier | Path | Needs services? | Use for |
|------|------|-----------------|---------|
| **Unit** | `app/tests/unit` | No — pure logic (pricing, JWT, hashing) | Fast local feedback, pre-commit |
| **Integration** | `app/tests/integration` | Yes — live Postgres + Redis | End-to-end API behaviour |

```bash
# Fast tier — no Docker/Postgres/Redis required, runs in ~seconds.
# Only needs the app installed in your venv (see "Local Development Without Docker").
pytest app/tests/unit -v

# Integration tier — requires a live Postgres (and Redis for auth flows).
# Point at a different DB with TEST_DATABASE_URL if needed.
docker-compose exec api pytest app/tests/integration -v

# Everything (integration tier still needs Postgres/Redis)
docker-compose exec api pytest app/tests -v

# Full smoke test
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/categories
curl http://localhost:8000/api/v1/products
curl http://localhost:8000/api/v1/products/featured
curl http://localhost:8000/api/v1/announcements
curl http://localhost:8000/api/v1/testimonials
curl http://localhost:8000/api/v1/store-locations
```

---

## Deployment Checklist

- [ ] `docker-compose.prod.yml` created (no `--reload`, gunicorn workers)
- [ ] `.env` updated with production DB URLs and secrets
- [ ] Razorpay webhook URL registered: `https://yourdomain.com/api/v1/orders/payment-webhook`
- [ ] SSL certificate configured (Let's Encrypt / Nginx)
- [ ] `FRONTEND_URL` updated to production domain
- [ ] `ENVIRONMENT=production` in `.env` (disables OTP in response)
- [ ] `alembic upgrade head` run on production DB
- [ ] `python scripts/seed.py` run on production (or add real products via admin API)
- [ ] `python scripts/create_admin.py` run to create admin account
