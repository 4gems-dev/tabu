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

export default function LogicStocks() {
  // const [data, setData] = useState<Record<string, any>>([]);

  // useEffect(() => {
  //   (async () => {
  //     const stocks = await getStocks(
  //       usePreferencesState.getState().interests,
  //       usePreferencesState.getState().budget ?? 0
  //     );
  //     console.log(stocks);

  //     setData(stocks);
  //   })();
  // }, []);

  // function roundToFourDecimalPlaces(num: number): number {
  //   return parseFloat(num.toFixed(4));
  // }

  // function handleInfinity(num: number): string | number {
  //   if (num === Infinity) {
  //     return "-";
  //   } else {
  //     return num;
  //   }
  // }

  function getRandomImage(): string {
    const randomNumber = Math.random();

    if (randomNumber < 0.5) {
      return "/icon-rate-down.png";
    } else {
      return "/icon-rate-up.png";
    }
  }

  const { stocks } = useInvestmentState();

  return (
    <>
      <p className="mb-2 font-semibold">My stocks</p>
      <Table>
        {/* <TableCaption>A list of your owned Stocks.</TableCaption> */}
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
                  {<img src={getRandomImage()} className="ml-4" />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
