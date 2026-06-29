# KoinX Tax Loss Harvesting Dashboard

Production-grade crypto tax-loss harvesting dashboard built with a real REST backend, PostgreSQL, Prisma and live CoinGecko market data.

## Architecture

This repository is an npm workspace monorepo:

- `apps/web`: React 19, TypeScript, Vite, TailwindCSS, shadcn-style components, TanStack Query, Zustand, React Router, Recharts and Framer Motion.
- `apps/api`: Node.js, Express, TypeScript, Prisma, JWT authentication and CoinGecko integration.
- `apps/api/prisma`: Normalized PostgreSQL schema for users, holdings, transactions, tax lots, harvest sessions, portfolio summaries and historical prices.

The frontend never reads mock JSON files. It talks to the backend through REST APIs. The backend calculates portfolio values, capital gains, chart payloads and harvest previews from database holdings enriched with live CoinGecko prices and metadata.

## Folder Structure

```text
apps/
  api/
    prisma/
      schema.prisma
      seed.ts
    src/
      config/
      controllers/
      lib/
      middleware/
      routes/
      services/
      types/
  web/
    src/
      api/
      charts/
      components/
        common/
        forms/
        layout/
        tables/
        ui/
      constants/
      hooks/
      lib/
      pages/
      providers/
      services/
      store/
      styles/
      types/
      utils/
```

## API Documentation

All application endpoints except auth require `Authorization: Bearer <jwt>`.

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### KoinX Assignment APIs

- `GET /api/holdings`
  Returns `coin`, `coinName`, `logo`, `currentPrice`, `averageBuyPrice`, `totalHolding`, `stcg`, `ltcg`, `marketValue`, `costBasis`, `profitLoss`, `roi`.

- `GET /api/capital-gains`
  Returns STCG profits/losses/net, LTCG profits/losses/net and realised capital gains.

- `GET /api/dashboard`
  Returns portfolio value, total investment, today's gain, total gain, total loss, potential tax savings, harvest opportunities, selected holdings and realised capital gains.

- `POST /api/harvest/calculate`
  ```json
  {
    "selectedAssets": [
      {
        "holdingId": "holding_id",
        "sellQuantity": 0.25
      }
    ]
  }
  ```
  Returns pre-harvest gains, updated gains, realised gains, tax saved and harvest summary.

- `GET /api/charts`
  Returns portfolio allocation, asset distribution, profit/loss distribution, sector allocation, STCG vs LTCG, top gainers, top losers, portfolio trend and tax savings gauge.

### Supporting APIs

- `POST /api/holdings`: imports a holding and creates a buy transaction and tax lot.
- `GET /api/market/search?query=bitcoin`: searches CoinGecko assets.
- `PATCH /api/settings`: updates user currency and decimal precision.

## Database Schema

Core tables:

- `User`: account, currency, precision and auth metadata.
- `Holding`: current user position by CoinGecko asset id.
- `Transaction`: buy/sell/transfer audit history.
- `TaxLot`: acquisition date, cost basis and remaining quantity.
- `HarvestSession`: saved harvest calculation sessions.
- `HarvestSessionItem`: per-asset harvest calculation detail.
- `PortfolioSummary`: calculated dashboard snapshots.
- `HistoricalPrice`: cached live price snapshots from CoinGecko.

## Installation

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

PowerShell users may need `npm.cmd` if local script execution blocks `npm.ps1`.

## Environment Variables

Create `.env` at the repository root:

```env
API_PORT=8080
WEB_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/koinx_tlh?schema=public
JWT_SECRET=replace-with-a-long-random-secret
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=
DEFAULT_CURRENCY=inr
SHORT_TERM_TAX_RATE=0.30
LONG_TERM_TAX_RATE=0.125
VITE_API_URL=http://localhost:8080
```

Optional seed values can be supplied through environment variables. No static seed JSON is included.

```env
SEED_USER_EMAIL=investor@example.com
SEED_USER_PASSWORD=ChangeMe123!
SEED_HOLDINGS=bitcoin:btc:0.25:4200000:2025-03-12,ethereum:eth:2:250000:2024-01-18
```

Then run:

```bash
npm run db:seed
```

## Local Development

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/api/health`

### No-Database Mock Mode

For local review without PostgreSQL, set this in `.env`:

```env
USE_MOCK_DATA=true
JWT_SECRET=mock-mode-development-secret-change-before-production
VITE_API_URL=http://localhost:8080
```

Then run `npm run dev`. The API serves the same REST endpoints with in-memory portfolio data, and holdings you add reset when the API restarts.

## Deployment

### Frontend: Vercel

1. Import the repository.
2. Use `apps/web` through the root `vercel.json`.
3. Set `VITE_API_URL` to the deployed Render API URL.
4. Deploy.

### Backend: Render

1. Create a Render web service from this repository.
2. Use the included `render.yaml`.
3. Set `DATABASE_URL`, `JWT_SECRET`, `WEB_URL` and optional `COINGECKO_API_KEY`.
4. Run Prisma migrations with `npm run db:deploy -w apps/api`.

### Database: Supabase PostgreSQL

1. Create a Supabase project.
2. Copy the pooled PostgreSQL connection string.
3. Set it as `DATABASE_URL` in Render.
4. Run migrations before first production traffic.

## Screenshots Placeholder

Add screenshots after deployment:

- `docs/screenshots/dashboard-light.png`
- `docs/screenshots/dashboard-dark.png`
- `docs/screenshots/tax-harvesting.png`
- `docs/screenshots/analytics.png`

## Quality Checklist

- Real backend REST APIs.
- CoinGecko market data, logos and asset search.
- PostgreSQL Prisma schema with normalized entities.
- JWT auth.
- Responsive premium SaaS layout.
- Loading skeletons, empty states, error states, retry buttons and toast notifications.
- Dark mode, light mode and persisted local preferences.
- Search, sorting, pagination, filters, select all, clear selection and partial sell quantities.
- PDF, CSV and print report actions.
- Lazy routes, code splitting, error boundary and typed API services.

## Future Improvements

- Broker/exchange CSV import templates.
- Executed harvest workflow that reduces tax lots after confirmed sale.
- Multi-portfolio support.
- Country-specific tax rule packs.
- Background historical price sync jobs.
- Server-side report generation with signed archive URLs.
