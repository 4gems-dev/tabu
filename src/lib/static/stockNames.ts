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

const stockData: { [symbol: string]: string } = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corporation",
  NVDA: "NVIDIA Corporation",
  GOOGL: "Alphabet Inc. (Class C)",
  AMZN: "Amazon.com, Inc.",
  CRM: "Salesforce.com, Inc.",
  ADBE: "Adobe Inc.",
  CSCO: "Cisco Systems, Inc.",
  JNJ: "Johnson & Johnson",
  UNH: "UnitedHealth Group Incorporated",
  PFE: "Pfizer Inc.",
  ABT: "Abbott Laboratories",
  MDT: "Medtronic plc",
  TMO: "Deutsche Telekom AG",
  PG: "Procter & Gamble Company",
  LLY: "Eli Lilly and Company",
  NEE: "NextEra Energy Inc.",
  BEP: "Bermuda Electric Holdings Limited",
  AWK: "American Water Works Company Inc.",
  PLD: "Pinnacle West Capital Corporation",
  EQIX: "Equinix Inc.",
  DLR: "Digital Realty Trust Inc.",
  WM: "Waste Management, Inc.",
  FSLR: "First Solar, Inc.",
  BKNG: "Booking Holdings Inc.",
  EXPE: "Expedia Group Inc.",
  MAR: "Marriott International Inc.",
  HLT: "Hilton Worldwide Holdings Inc.",
  DAL: "Delta Air Lines Inc.",
  LUV: "Southwest Airlines Company",
  CCL: "Carnival Corporation & plc",
  RCL: "Royal Caribbean Cruises Ltd.",
  NKE: "Nike Inc.",
  TJX: "The TJX Companies, Inc.",
  LULU: "lululemon athletica inc.",
  VFC: "V.F. Corporation",
  TPR: "Tapestry, Inc.",
  RL: "Ralph Lauren Corporation",
  PVH: "PVH Corp.",
  HBI: "Hanesbrands Inc.",
};

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
      name: string;
      stockPrice: number;
      /**
       * amount of bought stocks
       * can be fractional
       */
      amount: number;
      dolarAmount: number;
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
      name: stockData[stock],
      stockPrice: prices[stock],
      amount: budget / selectedStocks.length / prices[stock],
      dolarAmount:
        prices[stock] * (budget / selectedStocks.length / prices[stock]),
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
