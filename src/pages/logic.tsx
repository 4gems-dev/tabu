import React, { useState, useEffect } from "react";
import { getStocks } from "@/lib/static/stockNames";
import { usePreferencesState } from "@/state/preferencesState";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LogicStocks() {
  const [data, setData] = useState<Record<string, any>>([]);

  useEffect(() => {
    (async () => {
      const stocks = await getStocks(
        usePreferencesState.getState().interests,
        usePreferencesState.getState().budget ?? 0
      );
      console.log(stocks);

      setData(stocks);
    })();
  }, []);

  function roundToFourDecimalPlaces(num: number): number {
    return parseFloat(num.toFixed(4));
  }

  function handleInfinity(num: number): string | number {
    if (num === Infinity) {
      return "-";
    } else {
      return num;
    }
  }

  function getRandomImage(): string {
    const randomNumber = Math.random();

    if (randomNumber < 0.5) {
      return "/icon-rate-down.png";
    } else {
      return "/icon-rate-up.png";
    }
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your owned Stocks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-max">Name</TableHead>
            <TableHead>StockPrice</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map((value: [string, any]) => (
            <TableRow key={value[0]}>
              <TableCell className="font-medium">{value[1].name}</TableCell>
              <TableCell>{value[1].stockPrice}</TableCell>
              <TableCell>
                {handleInfinity(roundToFourDecimalPlaces(value[1].amount))}
              </TableCell>
              <TableCell>
                {<img src={getRandomImage()} className="ml-4" />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
