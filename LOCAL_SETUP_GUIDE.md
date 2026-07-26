# Rajesh Jewellers — Local Development Setup Guide

> Complete step-by-step guide to run **Backend (FastAPI)** and **Frontend (Next.js)** locally on your machine.

---

## 📋 Prerequisites

### Required Software
| Tool | Version | Install Link |
|------|---------|--------------|
| **Docker Desktop** | Latest | https://www.docker.com/products/docker-desktop/ |
| **Git** | Latest | https://git-scm.com/ |
| **Node.js** | 18+ (LTS) | https://nodejs.org/ |
| **Python** | 3.11+ | https://www.python.org/downloads/ |
| **VS Code** (recommended) | Latest | https://code.visualstudio.com/ |

### Optional (for local DB without Docker)
| Tool | Version |
|------|---------|
| PostgreSQL | 16 |
| MongoDB | 7 |
| Redis | 7 |

---

## 🐳 Method 1: Full Docker Setup (Easiest — Recommended)

> **Best for:** First-time setup, consistent environment, no local DB installation needed.

### Step 1: Clone Repository

```bash
# Open terminal (PowerShell / Command Prompt / Git Bash)
git clone <your-repository-url>
cd rajesh-backend
```

### Step 2: Configure Environment

```bash
# Copy example env file (already configured for Docker)
cp .env.example .env
```

**Verify `.env` has these Docker values:**
```env
DATABASE_URL=postgresql+asyncpg://rajesh_user:rajesh_pass@postgres:5432/rajesh_db
MONGO_URL=mongodb://mongo:27017
MONGO_DB=rajesh_jewellers
REDIS_URL=redis://redis:6379/0
JWT_SECRET=change-this-to-a-very-long-random-secret-key-minimum-32-chars
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start All Services

```bash
# Build and start all containers in background
docker-compose up -d

# Wait 10-15 seconds for databases to be healthy
# Check status
docker-compose ps
```

**Expected output:**
```
NAME             IMAGE                 STATUS                          PORTS
rajesh_api       rajesh-backend-api    Up (healthy)                    0.0.0.0:8000->8000/tcp
rajesh_celery    rajesh-backend-api    Up                              8000/tcp
rajesh_postgres  postgres:16-alpine    Up (healthy)                    0.0.0.0:5432->5432/tcp
rajesh_mongo     mongo:7               Up (healthy)                    0.0.0.0:27017->27017/tcp
rajesh_redis     redis:7-alpine        Up (healthy)                    0.0.0.0:6379->6379/tcp
```

> **If any service shows "unhealthy"**: Wait 30 more seconds, then run `docker-compose restart <service-name>`

### Step 4: Run Database Migrations

```bash
# Run inside the API container
docker-compose exec api alembic upgrade head
```

**Success output:**
```
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade ... -> f65fb39eca4f, initial_schema
INFO  [alembic.runtime.migration] Running upgrade f65fb39eca4f -> 74770827d103, metal_rates_making_charges_variant_
```

### Step 5: Seed Sample Data

```bash
# Seed 30 products, categories, banners, testimonials
docker-compose exec api python scripts/seed.py
```

**Expected output:**
```
✅ Categories created
✅ Products created (30)
✅ Banners created
✅ Testimonials created
✅ Trust stats created
✅ Store locations created
✅ Announcements created
🎉 Seeding completed successfully!
```

### Step 6: Create Admin User

```bash
docker-compose exec api python scripts/create_admin.py
```

**Expected output:**
```
✅ Admin user created:
   Email: admin@rajeshjewellers.com
   Password: admin123
   ⚠️  CHANGE PASSWORD AFTER FIRST LOGIN!
```

### Step 7: Verify Backend is Running

```bash
# Health check
curl http://localhost:8000/health
```

**Expected JSON response:**
```json
{
  "status": "healthy",
  "service": "Rajesh Jewellers API",
  "version": "1.0.0",
  "databases": {
    "postgres": true,
    "mongo": true,
    "redis": true
  }
}
```

### Step 8: Open API Documentation

| Interface | URL |
|-----------|-----|
| **Swagger UI** (Interactive) | http://localhost:8000/docs |
| **ReDoc** (Read-only) | http://localhost:8000/redoc |

---

## 💻 Method 2: Hybrid Setup (Docker DBs + Local API)

> **Best for:** Active development with hot reload, debugging in VS Code.

### Step 1: Start Only Databases with Docker

```bash
# In rajesh-backend folder
docker-compose up -d postgres mongo redis

# Verify DBs are healthy
docker-compose ps
```

### Step 2: Create Python Virtual Environment

```bash
# Windows PowerShell
python -m venv venv
venv\Scripts\Activate.ps1

# Linux/macOS/Git Bash
python -m venv venv
source venv/bin/activate
```

### Step 3: Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Configure Local Environment

```bash
cp .env.example .env
```

**Edit `.env` — Change DB URLs to `localhost`:**
```env
# LOCAL DEVELOPMENT URLS (not Docker hostnames)
DATABASE_URL=postgresql+asyncpg://rajesh_user:rajesh_pass@localhost:5432/rajesh_db
MONGO_URL=mongodb://localhost:27017
MONGO_DB=rajesh_jewellers
REDIS_URL=redis://localhost:6379/0

# Keep these as-is
JWT_SECRET=change-this-to-a-very-long-random-secret-key-minimum-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000
```

### Step 5: Run Migrations & Seed Data

```bash
# Run migrations locally
alembic upgrade head

# Seed data
python scripts/seed.py

# Create admin
python scripts/create_admin.py
```

### Step 6: Start API Server (Hot Reload)

```bash
# Terminal 1 - API Server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> Server: **http://localhost:8000**  
> Docs: **http://localhost:8000/docs**  
> Auto-reloads on code changes ✨

### Step 7: Start Celery Worker (Separate Terminal)

```bash
# Terminal 2 - Activate venv first!
# Windows: venv\Scripts\Activate.ps1
# Linux/Mac: source venv/bin/activate

celery -A app.core.celery_app worker --loglevel=info
```

> Processes background tasks: emails, abandoned cart reminders, etc.

---

## 🌐 Frontend Setup (Next.js — Existing Project at `E:\Frontend`)

> **Your frontend already exists at `E:\Frontend`** with a complete API client structure. No need to create a new project.

### Frontend Tech Stack (Already Installed)
| Library | Purpose |
|---------|---------|
| **Next.js 14** (App Router) | React framework |
| **TanStack Query v5** | Server state, caching, mutations |
| **Zustand** | Client state (auth, cart, UI) |
| **React Hook Form + Zod** | Forms & validation |
| **Tailwind CSS** | Styling |
| **TypeScript** | Type safety |

### API Client Structure (Already in `E:\Frontend\lib\api\`)
```
lib/api/
├── http.ts              # Base fetch wrapper with auth, auto-refresh, error parsing
├── types.ts             # ApiError type
├── refresh-mutex.ts     # Token refresh mutex (prevents duplicate refresh calls)
├── server-fetch.ts      # Server-side fetch helpers (for SSR/RSC)
└── endpoints/
    ├── auth.ts          # login, register, refresh, me, logout, OTP
    ├── products.ts      # list, featured, detail, search, related, recently-viewed
    ├── categories.ts    # category tree
    ├── cart.ts          # get, add, update, remove, clear, count
    ├── wishlist.ts      # get, toggle, move-to-cart
    ├── homepage.ts      # announcements, hero-banners, trust-stats, testimonials, store-locations
    ├── chat.ts          # send, history
    ├── addresses.ts     # CRUD
    └── reviews.ts       # product reviews
```

### Step 1: Open Frontend in Terminal

```bash
# Open NEW terminal window/tab
# Navigate to frontend folder
cd E:\Frontend
```

### Step 2: Install Dependencies (if node_modules missing)

```bash
# Only needed if node_modules doesn't exist or after pulling changes
npm install
```

### Step 3: Verify Environment Config

```bash
# Check .env.local exists and has correct API URL
type .env.local
```

**Expected content:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

> **Already configured!** Your `.env.local` points to the local backend.

### Step 4: Start Frontend Development Server

```bash
# Terminal 2 (Frontend) - Keep backend running in Terminal 1
npm run dev
```

**Expected output:**
```
▲ Next.js 14.2.18
- Local:        http://localhost:3000
- Network:      http://xxx.xxx.xxx.xxx:3000
```

### Step 5: Verify Full Stack Connection

| Check | Command / Action | Expected |
|-------|------------------|----------|
| Backend health | `curl http://localhost:8000/health` | `{"status":"healthy",...}` |
| Frontend loads | Open http://localhost:3000 | Homepage renders |
| API calls work | Open browser DevTools → Network tab | Requests to `localhost:8000/api/v1/*` return 200 |
| Auth flow | Try register/login on frontend | JWT tokens stored in Zustand store |

---

### Frontend URLs

| Service | URL |
|---------|-----|
| **Frontend App** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Docs (Swagger)** | http://localhost:8000/docs |

> **CORS is pre-configured** in backend (`app/main.py`) for `http://localhost:3000` and `http://localhost:3001`

---

### Frontend Development Workflow

```bash
# Terminal 1: Backend (Docker or Local)
# Docker: docker-compose up -d
# Local:  uvicorn app.main:app --reload

# Terminal 2: Frontend
cd E:\Frontend
npm run dev

# Terminal 3 (optional): Celery worker for background tasks
# Docker: docker-compose up -d celery_worker
# Local:  celery -A app.core.celery_app worker --loglevel=info
```

### Common Frontend Commands

```bash
# Development server with Turbopack (faster)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

### How Frontend Calls Backend (Example)

```tsx
// In a React component (Client Component)
'use client';

import { useProducts } from '@/lib/queries/use-products';

export default function ProductGrid() {
  const { data, isLoading } = useProducts({ featured: true, limit: 8 });
  
  if (isLoading) return <Skeleton />;
  
  return (
    <div className="grid gap-4 md:grid-2 lg:grid-4">
      {data?.items.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**The query hook** (`lib/queries/use-products.ts`) uses the API client:
```ts
import { productsApi } from '@/lib/api/endpoints/products';

export function useProducts(params) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.list(params),
  });
}
```

---

### No Changes Needed in Frontend Code

✅ **Already configured:**
- API base URL via `NEXT_PUBLIC_API_URL`
- Auth token management (access + refresh) in `lib/stores/auth-store.ts`
- Auto token refresh on 401 in `lib/api/http.ts`
- Error normalization matching backend error formats
- TanStack Query providers set up in `app/providers.tsx`
- Zustand stores for auth, cart, UI state

Just run `npm run dev` and it connects to your local backend!

---

## 🔧 Complete Command Reference

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Stop + DELETE all data (fresh start)
docker-compose down -v

# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api
docker-compose logs -f celery_worker
docker-compose logs -f postgres

# Restart single service
docker-compose restart api

# Rebuild after code/dependency changes
docker-compose up -d --build

# Run command in API container
docker-compose exec api python scripts/seed.py

# Shell access
docker-compose exec api bash
docker-compose exec postgres psql -U rajesh_user -d rajesh_db
docker-compose exec mongo mongosh
docker-compose exec redis redis-cli
```

### Database Commands

```bash
# Run migrations (Docker)
docker-compose exec api alembic upgrade head

# Run migrations (Local)
alembic upgrade head

# Create new migration (after model changes)
docker-compose exec api alembic revision --autogenerate -m "description"

# Check migration status
docker-compose exec api alembic current
docker-compose exec api alembic history
```

### Seed/Utility Scripts

```bash
# Main seed (products, categories, banners, testimonials)
docker-compose exec api python scripts/seed.py
# or locally: python scripts/seed.py

# Create admin user
docker-compose exec api python scripts/create_admin.py

# Seed pricing/metal rates
docker-compose exec api python scripts/seed_pricing.py

# Process product images
docker-compose exec api python scripts/process_images.py

# Verify images
docker-compose exec api python scripts/verify_images.py
```

### Testing

```bash
# Fast unit tier — no Postgres/Redis/Docker needed
pytest app/tests/unit -v

# Run all tests (Docker) — integration tier needs live Postgres + Redis
docker-compose exec api pytest app/tests/ -v

# Run specific integration test
docker-compose exec api pytest app/tests/integration/test_auth.py -v
docker-compose exec api pytest app/tests/integration/test_products.py -v

# With coverage
docker-compose exec api pytest app/tests/ --cov=app --cov-report=term-missing
```

### Quick API Smoke Tests

```bash
# Health
curl http://localhost:8000/health

# Categories
curl http://localhost:8000/api/v1/categories

# Products
curl http://localhost:8000/api/v1/products
curl http://localhost:8000/api/v1/products/featured

# Homepage
curl http://localhost:8000/api/v1/announcements
curl http://localhost:8000/api/v1/testimonials
curl http://localhost:8000/api/v1/store-locations
```

---

## 🐛 Troubleshooting

### Problem: Port Already in Use

```bash
# Windows - Find process on port 8000
netstat -ano | findstr :8000
# Kill: taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Or change port in docker-compose.yml:
# ports:
#   - "8001:8000"  # Use 8001 instead
```

### Problem: Database Connection Failed

```bash
# Check container health
docker-compose ps

# Check logs
docker-compose logs postgres
docker-compose logs mongo
docker-compose logs redis

# Restart DBs
docker-compose restart postgres mongo redis

# Verify connectivity from API container
docker-compose exec api python -c "
import asyncpg, motor.motor_asyncio, redis.asyncio as redis
print('Testing connections...')
"
```

### Problem: Migration Errors

```bash
# Check current migration
docker-compose exec api alembic current

# See history
docker-compose exec api alembic history

# If stuck, force stamp (CAREFUL - only if DB matches)
docker-compose exec api alembic stamp head

# Nuclear option: reset DB completely
docker-compose down -v
docker-compose up -d postgres mongo redis
# Wait for healthy, then:
docker-compose exec api alembic upgrade head
```

### Problem: Celery Worker Not Processing Tasks

```bash
# Check worker logs
docker-compose logs -f celery_worker

# Verify Redis connection
docker-compose exec redis redis-cli ping
# Should return: PONG

# Restart worker
docker-compose restart celery_worker

# Check Celery broker URL in .env
# CELERY_BROKER_URL=redis://redis:6379/0 (Docker)
# CELERY_BROKER_URL=redis://localhost:6379/0 (Local)
```

### Problem: Frontend Can't Connect to Backend

```bash
# 1. Check backend is running
curl http://localhost:8000/health

# 2. Check CORS in backend (app/main.py) allows your frontend URL
# allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"]

# 3. Check frontend .env.local
cat .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# 4. Restart frontend after env change
npm run dev
```

### Problem: Module Import Errors (Local Dev)

```bash
# Ensure venv is activated
# Windows: venv\Scripts\Activate.ps1
# Linux/Mac: source venv/bin/activate

# Reinstall deps
pip install -r requirements.txt

# Check Python path
python -c "import app; print('OK')"
```

---

## 📁 Project Structure Overview

```
rajesh-backend/                    # BACKEND (this repo)
├── app/
│   ├── api/v1/           # API routes (auth, products, cart, orders, admin...)
│   ├── core/             # Config, security, Celery, exceptions
│   ├── db/               # PostgreSQL, MongoDB, Redis connections
│   ├── models/           # SQLAlchemy & MongoDB models
│   ├── schemas/          # Pydantic validation schemas
│   ├── services/         # Business logic (pricing, chat, email, SMS, storage)
│   └── tests/            # Pytest test suite
├── alembic/              # Database migrations
├── scripts/              # Seed & utility scripts
├── static/               # Product images
├── frontend-integration/ # Next.js API client + integration guide (reference)
├── docker-compose.yml    # Docker services config
├── Dockerfile            # API container image
├── requirements.txt      # Python dependencies
├── .env.example          # Environment template
└── LOCAL_SETUP_GUIDE.md  # This file

E:\Frontend/               # FRONTEND (separate folder)
├── app/                   # Next.js App Router pages
├── components/            # React components
├── lib/
│   ├── api/               # API client (http.ts + endpoints/)
│   │   ├── endpoints/     # auth, products, categories, cart, wishlist...
│   │   ├── http.ts        # Fetch wrapper with auth/refresh
│   │   └── types.ts       # ApiError types
│   ├── hooks/             # Custom React hooks
│   ├── queries/           # TanStack Query hooks
│   ├── stores/            # Zustand stores (auth, cart, UI)
│   └── utils/             # Helpers
├── .env.local             # NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## ✅ Quick Verification Checklist

After setup, verify all these work:

- [ ] `docker-compose ps` shows all 5 containers **healthy**
- [ ] `curl http://localhost:8000/health` returns `"status": "healthy"`
- [ ] http://localhost:8000/docs opens Swagger UI
- [ ] `docker-compose exec api python scripts/create_admin.py` creates admin
- [ ] Admin login works at `/api/v1/auth/login` (email: `admin@rajeshjewellers.com`, pass: `admin123`)
- [ ] Frontend at http://localhost:3000 loads (if frontend running)
- [ ] Frontend can call API (check browser Network tab)

---

## 🚀 Next Steps

1. **Explore API**: Use Swagger UI at http://localhost:8000/docs
2. **Read Integration Guide**: `frontend-integration/INTEGRATION.md`
3. **Customize**: Add your own products via Admin API or seed scripts
4. **Develop**: Modify code in `app/` — hot reload works in hybrid mode
5. **Test**: Run `pytest app/tests/ -v`

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Docker not starting | Restart Docker Desktop, check WSL2 on Windows |
| DB connection timeout | Increase `healthcheck` retries in `docker-compose.yml` |
| Migration conflicts | `docker-compose down -v` and restart fresh |
| Port conflicts | Change host ports in `docker-compose.yml` |
| Frontend CORS errors | Verify `FRONTEND_URL` in `.env` matches frontend origin |

---

**Happy Coding! 🎉**  
*Rajesh Jewellers Backend — Built with FastAPI, Docker, and ❤️*


# Terminal 1 - Backend
cd E:\rajesh-backend
docker-compose up -d
docker-compose exec api alembic upgrade head
docker-compose exec api python scripts/seed.py
docker-compose exec api python scripts/create_admin.py

# Terminal 2 - Frontend
cd E:\Frontend
npm run dev
Then open http://localhost:3000 (frontend) and http://localhost:8000/docs (API docs).

