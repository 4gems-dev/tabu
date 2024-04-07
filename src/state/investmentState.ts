import { getStocks } from "@/lib/static/stockNames";
import scenFashion from "@/scenarious/scenFashion.json";
import scenHealth from "@/scenarious/scenHealth.json";
import scenSus from "@/scenarious/scenSus.json";
import scenTech from "@/scenarious/scenTech.json";
import scenTravel from "@/scenarious/scenTravel.json";
import { InterestsEnum } from "@/types";
import { create } from "zustand";
import { usePreferencesState } from "./preferencesState";
// import scenFashion from "@/scenarious/scenFashion.json"
// import scenHealth from "@/scenarious/scenHealth.json"
// import scenSus from "@/scenarious/scenSus.json"
// import scenTech from "@/scenarious/scenTech.json"
// import scenTravel from "@/scenarious/scenTravel.json"

const scenarios: Record<InterestsEnum, typeof scenTravel> = {
  FASHION: scenFashion,
  HEALTH: scenHealth,
  SUSTAINABILITY: scenSus,
  TECH: scenTech,
  TRAVEL: scenTravel,
} as const;

export type InvestmentStateType = {
  isSimulationRunning: boolean;
  resumeSimulation: () => void;
  pauseSimulation: () => void;

  /**
   * days from beginning of the investment
   */
  // days: number;

  events: {
    message: string;
    change: number;
    stock: { symbol: string; name: string };
    day: number;
  }[];

  /**
   * amount of euros on account with history
   */
  fiatAmount: number[];

  /**
   * current & history data
   */
  totalStockAmount: number[];
  /**
   * current & history data
   */
  stocks: Record<string, { amount: number; price: number; name: string }[]>;

  // buy: (symbol: string, amount: number) => void;
  // sell: (symbol: string, amount: number) => void;

  /**
   * Buy or sell stock
   *
   * @param symbol
   * @param amount
   * @param action
   * @returns
   */
  action: (symbol: string, amount: number, action: "buy" | "sell") => void;

  update: () => void;

  init: (stocks: Awaited<ReturnType<typeof getStocks>>) => void;
};

export const useInvestmentState = create<InvestmentStateType>((set, get) => ({
  isSimulationRunning: true,
  // days: 0,
  fiatAmount: [],
  totalStockAmount: [],
  stocks: {},
  events: [],

  pauseSimulation: () => {
    set({ isSimulationRunning: false });
  },

  resumeSimulation: () => {
    set({ isSimulationRunning: true });
  },

  action: (symbol, amount, action) => {
    let newAvailableAmount = get().fiatAmount[get().fiatAmount.length];

    const actionValue = action === "buy" ? 1 : -1;

    const stocks = get().stocks;
    const selectedStockAllData = stocks[symbol];
    const selectedStockCurrent =
      selectedStockAllData[selectedStockAllData.length - 1];

    newAvailableAmount += actionValue * selectedStockCurrent.price * amount;

    get().resumeSimulation();

    set({
      fiatAmount: [...get().fiatAmount, Math.max(0, newAvailableAmount)],
      stocks: {
        ...stocks,
        [symbol]: [
          ...selectedStockAllData,
          {
            amount: Math.max(
              0,
              selectedStockCurrent.amount + actionValue * amount
            ),
            price: selectedStockCurrent.price,
            name: selectedStockCurrent.name,
          },
        ],
      },
    });
  },

  update: async () => {
    if (!get().isSimulationRunning) {
      return;
    }

    const totalStockAmount = [...get().totalStockAmount];

    const stocks = get().stocks;
    const newStocks = { ...stocks };

    if (totalStockAmount.length === 0) {
      get().init({});
    }

    // const drift = 0.001;
    const volatilityUp = 0.001;
    const volatilityDown = volatilityUp / 2;

    for (const [symbol, _data] of Object.entries(stocks)) {
      const data = [..._data];

      const currData = data[data.length - 1];

      const direction = data.length % 2 === 0 ? 1 : -1;
      const volatility = direction < 0 ? volatilityDown : volatilityUp;
      const change = direction * Math.random() * volatility;

      const newPrice = currData.price + currData.price * change;

      data.push({
        ...currData,
        price: newPrice,
      });

      newStocks[symbol] = data;
      // newTotalStockAmount += newPrice * currData.amount;
    }

    // const todaysScenarios = [];

    let shouldStop = false;

    for (const interest of usePreferencesState.getState().interests) {
      const intScenarios = scenarios[interest];

      for (const {
        Day,
        Impact,
        Message,
        Percentage,
        stockId,
        stockName,
      } of intScenarios) {
        if (totalStockAmount.length !== Day || !(stockId in newStocks)) {
          continue;
        }

        shouldStop = true;

        const current = newStocks[stockId][newStocks[stockId].length - 1];
        newStocks[stockId].push({
          ...current,
          price: current.price + current.price * (Percentage / 100),
        });

        set({
          events: [
            ...get().events,
            {
              change: Percentage,
              message: Message,
              day: totalStockAmount.length,
              stock: {
                name: stockName,
                symbol: stockId,
              },
            },
          ],
        });
      }
    }

    if (shouldStop) {
      get().pauseSimulation();
    }

    let newTotalStockAmount = 0;

    for (const data of Object.values(newStocks)) {
      const current = data[data.length - 1];

      newTotalStockAmount += current.amount * current.price;
    }

    set({
      // days: get().days + 1,
      totalStockAmount: [...totalStockAmount, newTotalStockAmount],
      stocks: newStocks,
    });
  },

  init: (newStocks) => {
    let totalStockAmount = 0;
    const stocksAmount: InvestmentStateType["stocks"] = {};
    for (const { stockPrice, symbol, amount, name } of Object.values(
      newStocks
    )) {
      const stockAmount = amount * stockPrice;
      totalStockAmount += stockAmount;

      stocksAmount[symbol] = [];
      stocksAmount[symbol].push({ amount, price: stockPrice, name });
    }

    set({
      totalStockAmount: [totalStockAmount],
      stocks: stocksAmount,
      fiatAmount: [100000000],
      // days: 0,
    });
  },
}));
