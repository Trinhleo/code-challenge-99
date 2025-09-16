
# Plan CRUD API

A backend server built with **Express + TypeScript + Prisma (SQLite)**.  
Implements full CRUD operations for a `Plan` resource, including filters and pagination.  
Bundled with Swagger docs, unit tests, and a Postman collection for smoke testing.

---

## ✨ Features

- **CRUD Endpoints**
  - Create a Plan
  - List Plans with filters & pagination
  - Get Plan by ID
  - Update Plan details (name, budget, status)
  - Delete Plan
- **Swagger UI** at `/docs` for API exploration
- **Unit tests** (Vitest) for the service layer
- **Postman collection** for smoke testing
- Built with **TypeScript** and **pnpm** as package manager
- **SQLite + Prisma ORM** for persistence

---

## 🛠️ Tech Stack

- **Node.js** (ESM)
- **Express 5**
- **TypeScript**
- **pnpm** (package manager)
- **Prisma** ORM + SQLite
- **Vitest** for testing
- **Swagger (swagger-ui-express + swagger-jsdoc)**
- **Postman / Newman** for smoke tests

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Trinhleo/code-challenge-99.git
cd problem-5
pnpm install
```

### 2. Database Setup

Prisma is configured with SQLite (`prisma/schema.prisma`).

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

This creates `dev.db` (SQLite file) in `prisma/`.

### 3. Run in Development

```bash
pnpm dev
```

Server will run at: [http://localhost:3000](http://localhost:3000)

### 4. Build & Start (Production)

```bash
pnpm build
pnpm start
```

---

## 📚 API Endpoints

### Healthcheck

`GET /health` → `{ "ok": true }`

### CRUD

* `POST /plans` → Create plan
* `GET /plans?status=DRAFT&name=foo&page=1&pageSize=10` → List plans
* `GET /plans/:id` → Get plan details
* `PUT /plans/:id` → Update plan
* `DELETE /plans/:id` → Delete plan

### Example Request

```bash
curl -X POST http://localhost:3000/plans \
  -H "Content-Type: application/json" \
  -d '{"name":"Q4 Growth","budget":50000}'
```

---

## 📖 Swagger Docs

Swagger UI is available at:

👉 [http://localhost:3000/docs](http://localhost:3000/docs)

It includes schemas for:

```yaml
Plan:
  type: object
  properties:
    id: { type: integer }
    name: { type: string }
    budget: { type: number }
    status: { type: string, enum: [DRAFT, RUNNING, STOPPED] }
    createdAt: { type: string, format: date-time }
    updatedAt: { type: string, format: date-time }
```

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
pnpm test
```

* Service layer tests: `src/services/planService.test.ts`
* Prisma is mocked (`tests/__mocks__/prismaMock.ts`).

### Smoke Tests (Postman/Newman)

#### Postman

* Import `smoke-tests/PlanAPI.postman_collection.json` into Postman
* Run the collection: it will create, fetch, update, and delete a plan with assertions

#### Newman (CLI)

```bash
pnpm dlx newman run smoke-tests/PlanAPI.postman_collection.json
```

---

## 📂 Project Structure

```
src/
  controllers/
    planController.ts
  services/
    planService.ts
    planService.test.ts
  routes/
    planRoutes.ts
    index.ts
  lib/
    prisma.ts
    swagger.ts
  tests/
  __mocks__/
    prismaMock.ts
  types/
    plan.ts
  app.ts
  index.ts
prisma/
  schema.prisma

smoke-tests/
  PlanAPI.postman_collection.json
README.md
```

---

## 💡 Notes

* By default, SQLite is used for simplicity.
  Replace the datasource in `schema.prisma` for Postgres/MySQL if needed.
* When running in CI/CD, run smoke tests with Newman after deploying the server.
* Use `pnpm prisma migrate dev` whenever we want to change the schema.
