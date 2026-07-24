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

```bash
# Run all tests
docker-compose exec api pytest app/tests/ -v

# Run specific test file
docker-compose exec api pytest app/tests/test_auth.py -v

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
