// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
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
            return res
                .status(400)
                .json({ success: false, error: `You are not allowed to access this site!` });
    }
}

async function GET(
    req: ApiStockNamesGET["request"],
    res: NextApiResponse<ApiStockNamesGET["response"]>
) {
    const symbols = InterestsEnumArray.flatMap(interest => stockNames(interest));
    const token = 'co8l9qhr01qjn9a1tfbgco8l9qhr01qjn9a1tfc0';
    const promises = symbols.filter(symbol => !cacheProviderHas(symbol + "-NAMES")).map(symbol => {
        const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=${token}`;
        return fetch(url).then(response => response.json()).catch(error => console.error('Error:', error));
    });

    let data = await Promise.all(promises);

    const cachedData = symbols.filter(symbol => cacheProviderHas(symbol + "-NAMES")).map(symbol => cacheProviderGet(symbol + "-NAMES"));

    data = data.concat(cachedData);

    const toReturn = data.map((item: any, index: number) => {
        if (!item || item.error || item.result[0].error) {
            return ({
                symbol: "Error fetching data",
                name: 'Error fetching data',
            })
        }
        cacheProvider(item.result[0].symbol + "-NAMES", item, Date.now() + 1000 * 60 * 60 * 24);
        return ({
            symbol: item.result[0].symbol,
            name: item.result[0].description,
        })
    });

    return res.status(200).json({ success: true, data: toReturn });
}