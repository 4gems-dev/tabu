// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  cacheProvider,
  cacheProviderGet,
  cacheProviderHas,
} from "@/lib/cache/cacheProvider";
import { stockNames } from "@/lib/static/stockNames";
import { InterestsEnumArray, SuccessType } from "@/types";
import { ApiEndpointType } from "@/types/api";
import prices from '../../../../data/prices.json';

export interface StockData {
  symbol: string;
  currentPrice: number;
}

export type ApiStockPricesGET = ApiEndpointType<
  "GET",
  null,
  SuccessType<
    {
      data: StockData[];
    },
    { error: string }
  >
>;

export default async function handler(
  req: ApiStockPricesGET["request"],
  res: NextApiResponse<ApiStockPricesGET["response"]>
) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    default:
      return res.status(400).json({
        success: false,
        error: `You are not allowed to access this site!`,
      });
  }
}

async function GET(
  req: ApiStockPricesGET["request"],
  res: NextApiResponse<ApiStockPricesGET["response"]>
) {
  return res.status(200).json({ success: true, data: prices.data });
  /*const symbols = InterestsEnumArray.flatMap((interest) =>
    stockNames(interest)
  );
  const token = "co8l9qhr01qjn9a1tfbgco8l9qhr01qjn9a1tfc0";

  const promises = symbols
    .filter((symbol) => !cacheProviderHas(symbol))
    .map(async (symbol) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;
      const data = await fetch(url).then((response) => response.json());
      return [symbol, data];
    });

  let data = await Promise.all(promises);

  const cachedData = symbols
    .filter((symbol) => cacheProviderHas(symbol))
    .map((symbol) => cacheProviderGet(symbol));

  data = data.concat(cachedData);

  const toReturn = data.map((item: any, index: number) => {
    if (!item || item[1].error) {
      return {
        symbol: "Error fetching data",
        currentPrice: "Error fetching data",
      };
    }
    cacheProvider(item[0], item, Date.now() + 1000 * 60 * 60 * 24);
    return {
      symbol: item[0],
      currentPrice: item[1].c,
    };
  });

  return res.status(200).json({ success: true, data: toReturn });*/
}
