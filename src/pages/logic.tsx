import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseAmount } from "@/lib";
import { useInvestmentState } from "@/state/investmentState";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function LogicStocks() {
  const getIcon = () => {
    return Math.random() < 0.5 ? (
      <ChevronDownIcon className="text-red-600" />
    ) : (
      <ChevronUpIcon className="text-green-600" />
    );
  };

  const { stocks } = useInvestmentState();

  return (
    <>
      <p className="mb-2 font-semibold">My stocks</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-max">Name</TableHead>
            <TableHead>StockPrice</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(stocks).map(([symbol, data]) => {
            const curr = data.at(-1);
            const amount = curr?.amount ?? 0;
            const price = curr?.price ?? 0;
            const name = curr?.name ?? "";
            return (
              <TableRow key={symbol}>
                <TableCell className="font-medium">
                  {name}{" "}
                  <span className="text-muted-foreground font-medium">
                    {symbol}
                  </span>
                </TableCell>
                <TableCell>{parseAmount(price)}</TableCell>
                <TableCell>{amount.toFixed(4).replace(".", ",")}</TableCell>
                <TableCell>{parseAmount(amount * price)}</TableCell>
                <TableCell>
                  <div className="ml-4">{getIcon()}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
