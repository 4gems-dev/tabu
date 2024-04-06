import { ApiStockPricesGET, StockData } from "@/pages/api/stock/prices";
import { InterestsEnum } from "@/types";

export function stockNames(interestType: InterestsEnum) {
  switch (interestType) {
    case InterestsEnum.TECH:
      return ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "CRM", "ADBE", "CSCO"];
    case InterestsEnum.HEALTH:
      return ["JNJ", "UNH", "PFE", "ABT", "MDT", "TMO", "PG", "LLY"];
    case InterestsEnum.SUSTAINABILITY:
      return ["NEE", "BEP", "AWK", "PLD", "EQIX", "DLR", "WM", "FSLR"];
    case InterestsEnum.TRAVEL:
      return ["BKNG", "EXPE", "MAR", "HLT", "DAL", "LUV", "CCL", "RCL"];
    case InterestsEnum.FASHION:
      return ["NKE", "TJX", "LULU", "VFC", "TPR", "RL", "PVH", "HBI"];
  }
}

/**
 *
 * @param interests
 * @returns
 */
export async function getStocks(interests: InterestsEnum[], budget: number) {
  const stocks: Record<
    string,
    {
      symbol: string;
      stockPrice: number;
      /**
       * amount of bought stocks
       * can be fractional
       */
      amount: number;
    }
  > = {};

  const counts = [[5], [3, 2], [2, 2, 1], [2, 1, 1, 1], [1, 1, 1, 1, 1]];
  const tactics = counts[interests.length - 1];
  const selectedStocks: string[] = [];

  for (let i = 0; i < interests.length; i++) {
    const stocks = stockNames(interests[i]);
    const count = tactics[i];

    selectedStocks.push(...shuffleAndSelect(stocks, count));
  }

  const prices = await loadStockPrices(selectedStocks);
  for (const stock of selectedStocks) {
    stocks[stock] = {
      symbol: stock,
      stockPrice: prices[stock],
      amount: budget / selectedStocks.length / prices[stock],
    };
  }

  return stocks;
}

/**
 *
 * @returns
 */
async function loadStockPrices(stocks: string[]) {
  const prices: Record<string, number> = {};

  const response = await fetch("/api/stock/prices");
  if (!response.ok) {
    console.log(`API request failed with status ${response.status}`);
    return prices;
  }
  const responseData: ApiStockPricesGET["response"] = await response.json();

  if (responseData.success) {
    for (const stock of stocks) {
      prices[stock] =
        responseData.data.find(({ symbol }) => stock === symbol)
          ?.currentPrice ?? 0;
    }
  }

  return prices;
}

/**
 *
 * @param array
 * @param n
 * @returns
 */
export function shuffleAndSelect<T>(array: T[], n: number): T[] {
  // Shuffle the array using the Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Return the first n elements from the shuffled array
  return array.slice(0, n);
}
