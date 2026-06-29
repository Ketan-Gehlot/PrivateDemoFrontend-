# KoinX Tax Loss Harvesting Dashboard (Frontend Demo)

A stunning, responsive, frontend-only crypto tax-loss harvesting dashboard built with React, TypeScript, Vite, TailwindCSS, and shadcn-style components.

This project is a high-fidelity prototype that simulates real-time tax harvesting computations and portfolio management entirely in the browser using interactive mock data.

## Features

- **Professional "Glassmorphism" UI**: Enjoy a premium, dynamic interface with animated gradients, frosted glass cards, and micro-animations on hover.
- **Responsive Layout**: Designed to look great on desktop, tablet, and mobile devices.
- **Client-Side Reactivity**: 
  - Select up to 8 mock crypto holdings (BTC, ETH, SOL, ADA, XRP, DOT, AVAX, LINK).
  - Modify the sell quantities to instantly recalculate realised gains, total losses, and potential tax savings.
  - Watch the dashboard summaries and "Pre/After Harvest" impact cards update instantly based on your selections.
- **Dark Mode Support**: Toggle between light and dark themes with fully customized tailwind colors.
- **Dynamic Charts**: Powered by Recharts for portfolio allocation and performance visualizing.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS, Framer Motion, Vanilla CSS (Glassmorphism)
- **State Management**: Zustand (local storage persistence for selections), TanStack Query
- **Routing**: React Router DOM
- **Components**: shadcn/ui base

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **View the app**
   Open your browser and navigate to `http://localhost:5173`.

> **Note:** The `apps/api` backend folder has been completely removed. All API calls are simulated via `apps/web/src/services/api.ts` which returns data from `apps/web/src/services/mockData.ts`.

## Deployment to Vercel

This project is configured for one-click deployment to Vercel without requiring any root directory modifications in the dashboard.

1. Push your code to a GitHub repository.
2. Go to Vercel and create a new project by importing your repository.
3. Vercel will automatically read the `vercel.json` file in the root directory.
4. Keep the Framework Preset as default, or if it auto-detects Vite, that's fine too.
5. Click **Deploy**.

The `vercel.json` file overrides the build output to correctly point to `apps/web/dist` and handles single-page app routing. No environment variables are required!

## Quality Checklist

- Fully responsive premium SaaS layout.
- Search, filters, select all, clear selection, and partial sell quantities.
- Real-time client-side computations (no backend latency).
- Loading skeletons, empty states, and toast notifications.
- Dark mode, light mode, and persisted local preferences.

## Future Improvements

- Re-integrate a live REST backend and PostgreSQL database.
- Add real-time CoinGecko market data integrations.
- Add broker/exchange CSV import templates.
