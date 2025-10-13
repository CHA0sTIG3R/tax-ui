import React from "react";
import type { HistoryPoint } from "../types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
    Legend,
} from "recharts";


interface TrendCardProps {
    title: string;
    data: HistoryPoint[];
    kind: "line" | "bar";
    yTickFormatter?: (v: number) => string;
    seriesName: string;
}


const TrendCard: React.FC<TrendCardProps> = ({ title, data, kind, yTickFormatter, seriesName }) => {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold">{title}</h2>
            <div className="h-72" style={{width: '100%', height: 300}}>
                <ResponsiveContainer width="100%" height="100%">
                    {kind === "line" ? (
                        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={yTickFormatter} />
                            <Tooltip
                                formatter={(v: number) => [yTickFormatter ? yTickFormatter(v) : String(v), seriesName]}
                                labelFormatter={(l) => `Year ${l}`}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="value" name={seriesName} dot={false} />
                        </LineChart>
                    ) : (
                        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(v: number) => [String(v), seriesName]} labelFormatter={(l) => `Year ${l}`} />
                            <Legend />
                            <Bar dataKey="value" name={seriesName} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export default TrendCard;