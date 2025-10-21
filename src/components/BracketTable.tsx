import type { TaxBracket } from "../types";

interface BracketTableProps {
  brackets: TaxBracket[];
}

export default function BracketTable({ brackets }: Readonly<BracketTableProps>) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-card backdrop-blur">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">Bracket Breakdown</h2>
        <p className="text-xs uppercase tracking-wide text-slate-500">Marginal structure by adjusted income</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/80">
        <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                Range
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Tax Rate
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Tax Paid
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 bg-white/95">
            {brackets.map((b) => (
              <tr key={`${b.year}-${b.status}-${b.rangeStart}`} className="transition hover:bg-brand-500/5">
                <td className="px-4 py-3 font-mono text-xs uppercase tracking-wide text-slate-600">
                  {b.rangeEnd ? `${b.rangeStart} - ${b.rangeEnd}` : `${b.rangeStart}+`}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-brand-700">{b.taxRate}</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">{b.taxPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
