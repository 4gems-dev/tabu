import Layout from "@/components/Layout/Layout";
import AreaGraph from "@/components/graf/areaGraph";
import { EventModal } from "@/components/modal/EventModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseAmount } from "@/lib";
import LogicStocks from "@/pages/logic";
import { useInvestmentState } from "@/state/investmentState";
import { usePreferencesState } from "@/state/preferencesState";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

type PropsType = {};

export default function DashboardPage({ }: PropsType) {
  const { budget, interests, name, riskTolerance, years } =
    usePreferencesState();

  const { totalStockAmount, stocks } = useInvestmentState();

  useEffect(() => {
    const id = setInterval(() => {
      useInvestmentState.getState().update();
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const chartRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const getElementDimensions = () => {
      if (chartRef.current) {
        setWidth(chartRef.current.offsetWidth);
        setHeight(chartRef.current.offsetHeight);
      }
    };

    getElementDimensions();

    // Add event listener for resize to update dimensions on window resize
    window.addEventListener("resize", getElementDimensions);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", getElementDimensions);
  }, []);

  return (
    <Layout title="Dashboard">
      <Container>
        <h1 className="text-2xl font-semibold">Welcome, {name || "John"}!</h1>

        <section className="grid-cols-3 grid gap-4 mt-10">
          <div
            className="col-span-2  rounded-lg border bg-foreground/5 min-h-[30rem]"
            ref={chartRef}
          >
            <p className="mb-2 p-4 text-lg font-semibold">
              My portfolio{" "}
              <span className="font-bold">
                {parseAmount(totalStockAmount[totalStockAmount.length - 1])}
              </span>
            </p>
            <AreaGraph
              data={totalStockAmount
                .map((value, i) => ({
                  x: dayjs().add(i, "days").format("DD.MM."),
                  y: value,
                }))
                .slice(-Math.min(totalStockAmount.length, 7))}
              width={width - 32}
              height={30 * 16 - 32}
            />
          </div>

          <div className={"row-span-2 p-4 rounded-lg border bg-foreground/5 overflow-y-auto h-[800px]"}>
            <ScrollArea className={"rounded-md border p-2 h-[99%]"}>
              <Card className=" w-full h-full my-4 bg-foreground/15 ">
                <CardHeader>
                  <CardTitle>Stock AAPL</CardTitle>
                  <CardDescription>Q2 earning are expected to rise at least 20%</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className=" text-gray-400">
                    22.06.2021
                  </div>
                  <EventModal />
                </CardFooter>
              </Card>
              <Card className=" w-full h-full my-4 bg-foreground/15 ">
                <CardHeader>
                  <CardTitle>Stock MSFT</CardTitle>
                  <CardDescription>Q2 earning are expected to fall at least 20%</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className=" text-gray-400">
                    22.06.2021
                  </div>
                  <EventModal />
                </CardFooter>
              </Card>
            </ScrollArea>
          </div>

          <div className="col-span-2 rounded-lg border bg-foreground/5 p-2">
            {/* stocks */}
            <p className="mb-2 p-2 pb-0 text-lg font-semibold">
              My stocks amounts
            </p>

            <div className="flex items-stretch gap-4 max-w-full overflow-x-auto pb-2">
              {Object.entries(stocks).map(([symbol, data]) => {
                let chartWidth = (width - 32) / 2;
                chartWidth -= chartWidth / 4;
                return (
                  <div
                    style={{ minWidth: chartWidth }}
                    key={symbol}
                    className="min-h-[10rem] py-4 border-b last:border-none bg-primary/5 rounded-lg"
                  >
                    <p className="px-4 mb-2 text-sm font-semibold">
                      {symbol} ({parseAmount(data.at(-1)?.price ?? 0)})
                    </p>
                    <AreaGraph
                      // maxAreaValue={
                      //   findMax(data.map(({ price }) => price)) * 10
                      // }
                      data={data
                        .map((value, i) => ({
                          x: dayjs().add(i, "days").format("DD.MM."),
                          y: value.price,
                        }))
                        .slice(-Math.min(data.length, 3))}
                      width={chartWidth - 16}
                      height={10 * 16}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-span-3 p-4 rounded-lg border bg-foreground/5">
            <LogicStocks />
          </div>
        </section>
      </Container>
    </Layout >
  );
}
