import axios, { type AxiosInstance } from "axios";
import type { FilingStatus, HistoryMetric, HistoryPoint, TaxCalculation } from "./types";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

function CreateApi(): AxiosInstance {
    return axios.create({
        baseURL: BASE,
        timeout: 10000,
    });
}

const api = CreateApi();

export async function fetchHistory(
    status: FilingStatus,
    metric: HistoryMetric,
    startYear: number,
    endYear: number
): Promise<HistoryPoint[]> {
    const res = await api.get<HistoryPoint[]>("/tax/history", {
        params: { status, metric, startYear, endYear },
    });
    return res.data;
}


export async function fetchCalculation(
    year: number,
    status: FilingStatus,
    income: number
): Promise<TaxCalculation> {
    const res = await api.get<TaxCalculation>("/tax/calc", {
        params: { year, status, income },
    });
    return res.data;
}