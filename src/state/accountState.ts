import { create } from "zustand";

export type AccountStateType = {
  portfolio: Record<
    string,
    {
      amount: number;
    }
  >;

  updateStocks: () => void;
};

export const useAccountState = create();
