import { getStocks } from "@/lib/static/stockNames";
import { create } from "zustand";

export type InvestmentStateType = {
  isSimulationRunning: boolean;
  resumeSimulation: () => void;
  pauseSimulation: () => void;

  /**
   * days from beginning of the investment
   */
  // days: number;

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

    set({
      fiatAmount: [...get().fiatAmount, newAvailableAmount],
      stocks: {
        ...stocks,
        [symbol]: [
          ...selectedStockAllData,
          {
            amount: selectedStockCurrent.amount + actionValue * amount,
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
    let newTotalStockAmount = 0;

    const stocks = get().stocks;
    const newStocks = { ...stocks };

    if (totalStockAmount.length === 0) {
      get().init({});
    }

    const drift = 0.001;
    const volatility = 0.01;

    for (const [symbol, _data] of Object.entries(stocks)) {
      const data = [..._data];

      const currData = data[data.length - 1];

      const change = Math.random() * volatility - volatility / 2;

      const newPrice = currData.price + currData.price * (change + drift);

      data.push({
        ...currData,
        price: newPrice,
      });

      newStocks[symbol] = data;
      newTotalStockAmount += newPrice * currData.amount;
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
      fiatAmount: [0],
      // days: 0,
    });
  },
}));
