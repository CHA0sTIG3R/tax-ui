import React from "react";
import type { TaxBracket } from "../types";


interface BracketTableProps {
    brackets: TaxBracket[];
}


const BracketTable: React.FC<BracketTableProps> = ({ brackets }) => {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">Bracket Breakdown</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-2">Lower</th>
                            <th className="p-2">Upper</th>
                            <th className="p-2">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brackets.map((b) => (
                            <tr key={`${b.lower}-${b.upper ?? "inf"}-${b.rate}`} className="border-b last:border-none">
                                <td className="p-2">${Number(b.lower).toLocaleString()}</td>
                                <td className="p-2">{b.upper === null ? "∞" : `$${Number(b.upper).toLocaleString()}`}</td>
                                <td className="p-2">{b.rate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default BracketTable;