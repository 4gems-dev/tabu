import Layout from "@/components/Layout/Layout";
import { Progress } from "@/components/ui/progress";
import { getStocks } from "@/lib/static/stockNames";
import { useInvestmentState } from "@/state/investmentState";
import { usePreferencesState } from "@/state/preferencesState";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PropsType = {};

const DURATION = 3000;

export default function LoadingPage({}: PropsType) {
  const { replace } = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id1 = setTimeout(() => {
      replace("/dashboard");
    }, DURATION + 100);

    const id2 = setInterval(() => {
      setValue((prevNumber) => prevNumber + Math.random() * (600 - 200) + 200);
    }, 400);

    const initPortfolio = async () => {
      const selectedStocks = await getStocks(
        usePreferencesState.getState().interests,
        usePreferencesState.getState().budget ?? 100
      );

      useInvestmentState.getState().init(selectedStocks);

      console.log(useInvestmentState.getState());
    };

    initPortfolio();

    return () => {
      clearInterval(id1);
      clearInterval(id2);
    };
  }, []);

  return (
    <Layout title="Loading" className="grid place-items-center grow">
      <div className="max-w-2xl ">
        <h1 className="text-6xl font-semibold text-center leading-normal mb-20">
          Please wait, we are creating{" "}
          <strong className="text-accent">personalized</strong> portfolio for
          you.
        </h1>

        <Progress
          value={Math.min((value * 100) / DURATION, 100)}
          classNames={{ indicator: "duration-300" }}
        />
      </div>
    </Layout>
  );
}
