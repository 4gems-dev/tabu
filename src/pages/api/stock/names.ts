// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from "next";
import { cacheProvider, cacheProviderGet, cacheProviderHas } from '@/lib/cache/cacheProvider';
import { stockNames } from '@/lib/static/stockNames';
import { InterestsEnumArray, SuccessType } from '@/types';
import { ApiEndpointType } from "@/types/api";

interface StockData {
    symbol: string;
    name: string;
}

export type ApiStockNamesGET = ApiEndpointType<
    "GET", null,
    SuccessType<{
        data: StockData[]
    },
        { error: string }
    >
>;

export default async function handler(
    req: ApiStockNamesGET["request"],
    res: NextApiResponse<ApiStockNamesGET["response"]>
) {
    switch (req.method) {
        case "GET":
            return await GET(req, res);
        default:
            return res.status(400).json({ success: false, error: `You are not allowed to access this site!` });
    }
}

async function GET(
    req: ApiStockNamesGET["request"],
    res: NextApiResponse<ApiStockNamesGET["response"]>
) {
    const symbols = InterestsEnumArray.flatMap(interest => stockNames(interest));
    const token = 'co8l9qhr01qjn9a1tfbgco8l9qhr01qjn9a1tfc0';
    let dataArray: [string, any][] = [];
    const filteredSymbols = symbols.filter(symbol => !cacheProviderHas(symbol + "-NAMES"))
    for (let i = 0; i < filteredSymbols.length; i++) {
        try {
            const symbol = filteredSymbols[i];
            const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=${token}`;
            const fetchReq = await fetch(url);
            if (fetchReq.status < 200 || fetchReq.status >= 300) {
                console.log("Error fetching data", "status:", fetchReq.status, "statusText:", fetchReq.statusText)
                continue;
            }
            let data = await fetchReq.json();
            data.result = data.result.slice(0, 1);
            dataArray.push([symbol, data]);
            console.log("Fetched data for", symbol);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    }

    const cachedData = symbols.filter(symbol => cacheProviderHas(symbol + "-NAMES")).map(symbol => cacheProviderGet(symbol + "-NAMES"));

    dataArray = dataArray.concat(cachedData);

    const toReturn = dataArray.map((item: any, index: number) => {
        console.log(item);
        cacheProvider(item[0] + "-NAMES", item, Date.now() + 1000 * 60 * 60 * 24);
        return ({
            symbol: item[0],
            name: item[1].result[0].description,
        })
    });

    return res.status(200).json({ success: true, data: toReturn });
}