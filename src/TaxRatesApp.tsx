import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TrendCard from "./components/TrendCard";
import BracketTable from "./components/BracketTable";
import { fetchCalculation, fetchHistory } from "./api";
import {
  CURRENT_YEAR,
  DEFAULT_START,
  FILING_STATUSES,
  type FilingStatus,
  type HistoryPoint,
  type TaxCalculation,
} from "./types";

export default function TaxRatesApp() {
  const [status, setStatus] = useState<FilingStatus>("SINGLE");
  const [startYear, setStartYear] = useState<number>(DEFAULT_START);
  const [endYear, setEndYear] = useState<number>(CURRENT_YEAR);
  const [income, setIncome] = useState<number>(85000);
  const [yearForCalc, setYearForCalc] = useState<number>(CURRENT_YEAR);

  const [topRateSeries, setTopRateSeries] = useState<HistoryPoint[]>([]);
  const [bracketCountSeries, setBracketCountSeries] = useState<HistoryPoint[]>([]);
  const [calc, setCalc] = useState<TaxCalculation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const years: number[] = useMemo(() => {
    const s = Math.min(startYear, endYear);
    const e = Math.max(startYear, endYear);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }, [startYear, endYear]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setError("");
        setLoading(true);
        const [top, brackets] = await Promise.all([
          fetchHistory(status, "TOP_RATE", startYear, endYear),
          fetchHistory(status, "BRACKET_COUNT", startYear, endYear),
        ]);
        if (!cancelled) {
          setTopRateSeries(top);
          setBracketCountSeries(brackets);
        }
      } catch (e) {
        console.error("Error loading trends:", e);
        if (!cancelled) setError("Failed to load trends. Verify API URL & CORS.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, startYear, endYear]);

  async function runCalc() {
    try {
      setError("");
      setLoading(true);
      const result = await fetchCalculation(yearForCalc, status, income);
      setCalc(result);
    } catch (e) {
      console.error("Calculation error:", e);
      setError("Calculation failed. Check endpoint and query params.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <header className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-bold tracking-tight">Marginal Tax Rate — React + TypeScript (Vite)</h1>
        <p className="mt-1 text-sm text-gray-600">
          Visualize historical trends and compute marginal/effective rates by year & filing status.
        </p>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 space-y-8">
        <section className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="filing-status" className="text-sm font-medium">Filing Status</label>
            <select
              id="filing-status"
              className="rounded-xl border px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as FilingStatus)}
            >
              {FILING_STATUSES.map((fs) => (
                <option key={fs.value} value={fs.value}>
                  {fs.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="start-year" className="text-sm font-medium">Start Year</label>
            <input
              id="start-year"
              type="number"
              className="rounded-xl border px-3 py-2"
              min={1862}
              max={CURRENT_YEAR}
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="end-year" className="text-sm font-medium">End Year</label>
            <input
              id="end-year"
              type="number"
              className="rounded-xl border px-3 py-2"
              min={1862}
              max={CURRENT_YEAR}
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="year-calculator" className="text-sm font-medium">Year (Calculator)</label>
            <select
              id="year-calculator"
              className="rounded-xl border px-3 py-2"
              value={yearForCalc}
              onChange={(e) => setYearForCalc(Number(e.target.value))}
            >
              {years
                .slice()
                .reverse()
                .map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1">
            <label htmlFor="income" className="text-sm font-medium">Income ($)</label>
            <input
              id="income"
              type="number"
              className="rounded-xl border px-3 py-2"
              min={0}
              step={100}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>

          <div className="flex items-end md:col-span-2 lg:col-span-1">
            <button
              className="w-full rounded-2xl border bg-black px-4 py-2 text-white shadow-sm disabled:opacity-50"
              onClick={runCalc}
              disabled={loading}
            >
              {loading ? "Loading…" : "Run Calculator"}
            </button>
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          <TrendCard
            title="Top Marginal Rate Over Time"
            data={topRateSeries}
            kind="line"
            yTickFormatter={(v) => `${v}%`}
            seriesName="Top Rate"
          />

          <TrendCard
            title="Number of Brackets Over Time"
            data={bracketCountSeries}
            kind="bar"
            seriesName="Bracket Count"
          />
        </section>

        {calc && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">Results</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="font-medium">Year:</span> {calc.year}
                </li>
                <li>
                  <span className="font-medium">Status:</span> {calc.status}
                </li>
                <li>
                  <span className="font-medium">Income:</span> ${Number(calc.income).toLocaleString()}
                </li>
                <li>
                  <span className="font-medium">Marginal Rate:</span> {calc.marginalRate}%
                </li>
                <li>
                  <span className="font-medium">Effective Rate:</span> {calc.effectiveRate}%
                </li>
              </ul>
            </div>

            <BracketTable brackets={calc.brackets} />
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-gray-500">
        Built with React + TypeScript + Axios + Recharts (Vite).
      </footer>
    </div>
  );
}
