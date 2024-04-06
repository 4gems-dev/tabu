import React, { useState, useEffect } from "react";
import { ApiStockPricesGET, StockData } from "./api/stock/prices";
import {
  stockNames,
  shuffleAndSelect,
  getStocks,
} from "@/lib/static/stockNames";
import { InterestsEnum } from "@/types";

export default function MyComponent() {
  const [data, setData] = useState<StockData[] | null>(null);

  useEffect(() => {
    (async () => {
      console.log(await getStocks(["TECH"], 900));
    })();
  }, []);

  return <div></div>;
}
