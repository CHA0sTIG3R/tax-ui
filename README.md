# Marginal Tax Rate Calculator — React Frontend

This repository is the **frontend outline** for the Marginal Tax Rate Calculator ecosystem. It complements the backend services:

- **Spring Boot API** (`Marginal-tax-rate-calculator`)
- **Python ingestion microservice** (`tax-bracket-ingest`)

## 🚀 Overview

This frontend is built with **React + TypeScript (via Vite)** and provides:

- **Interactive Dashboard** — visualize U.S. tax trends over 160+ years
- **Tax Calculator** — input year, filing status, and income to compute marginal & effective tax rates
- **Data Visualization** — charts built with [Recharts](https://recharts.org/) for trends and bracket breakdowns

## 🛠 Tech Stack

- **React 18 + TypeScript**
- **Vite** (fast dev server & build) (in progress)
- **Axios** (API client) (in progress)
- **Recharts** (data visualization) (in progress)
- **Tailwind CSS** (undetermined, for utility-first styling)

## 📂 Project Structure

```txt
src/
 ├─ types.ts              # Strongly typed DTOs matching backend API
 ├─ api.ts                # Typed Axios client for /tax/history & /tax/calc
 ├─ components/
 │   ├─ TrendCard.tsx     # Line/Bar chart card (reusable)
 │   └─ BracketTable.tsx  # Bracket breakdown table
 ├─ TaxRatesApp.tsx       # Main dashboard + calculator
 └─ main.tsx              # Entry point
```

## 🔧 Local Development

1. Create a new project:

   ```bash
   npm create vite@latest tax-ui -- --template react-ts
   cd tax-ui
   npm i axios recharts
   ```

2. Add the files from this repo into `src/`.
3. Start your backend on **<http://localhost:8080>**.
4. Start the frontend:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173).

### Proxy Configuration

During development, Vite can proxy API calls:

```ts
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### Environment Variables

For production builds:

```sh
VITE_API_BASE_URL=https://your-backend.example.com/api
```

## 📊 Features

- Explore historical **top marginal rates** and **bracket counts**
- Filter by **filing status** and **year range**
- Run tax calculations for a given year + income
- View detailed **bracket breakdown tables**

## 🔗 Related Repos

- [Marginal-tax-rate-calculator (Spring Boot backend)](https://github.com/CHA0sTIG3R/Marginal-tax-rate-calculator)
- [tax-bracket-ingest (Python ingestion microservice)](https://github.com/CHA0sTIG3R/tax-bracket-ingest)

## 📜 License

[Unlicensed coming soon]
