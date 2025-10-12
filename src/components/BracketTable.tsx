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
                            <th className="px-3 py-2 font-medium text-gray-700">Range</th>
                            <th className="px-3 py-2 font-medium text-gray-700">Tax Rate</th>
                            <th className="px-3 py-2 font-medium text-gray-700">Tax Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brackets.map((b) => (
                            <tr key={`${b.year}-${b.status}-${b.rangeStart}`} className="border-b last:border-0">
                                <td className="px-3 py-2">
                                    {b.rangeEnd
                                        ? `${b.rangeStart} - ${b.rangeEnd}`
                                        : `${b.rangeStart}+`}
                                </td>
                                <td className="px-3 py-2">{b.taxRate}</td>
                                <td className="px-3 py-2">{b.taxPaid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default BracketTable;