import React, { useEffect, useState } from "react";
import Container from "@/components/ui/container";
import Layout from "@/components/Layout/Layout";
import {Button} from "@/components/ui/button";

export default function LandingPage() {
  const [statistics, setStatistics] = useState({
    usersCount: 4,
    stocksCount: 49,
  });

  // annimations
  const [statistic1, setStatistic1] = useState(0);
  const [statistic2, setStatistic2] = useState(0);
  const usersCount = statistics.usersCount;
  const stocksCount = statistics.stocksCount;


  useEffect(() => {
    const interval1 = setInterval(() => {
      setStatistic1((prev) => (prev < usersCount ? prev + 1 : prev));
    }, 400);

    const interval2 = setInterval(() => {
      setStatistic2((prev) => (prev < stocksCount ? prev + 1 : prev));
    }, 100);


    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [usersCount, stocksCount]);

  return (
    <Layout title="Landing Page" className="grow">
      <Container>
        <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center">

          {/* Left side */}
          <div className="w-full mt-8 lg:w-1/2 pr-8">
            <h1 className="text-4xl font-bold mb-4"><span className="text-6xl">TABU</span> makes investments not a
              taboo. </h1>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-lg">
              Step into the finance and investing world without taking real risks.
              <br className="hidden sm:inline"/> Learn how to invest and make money with TABU.
            </p>

            <div className="flex justify-center mt-4 gap-2 flex-wrap">
              <Button>Enter</Button>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">

            <img
              src={`/landingImage.png`}
              alt="Landing page image"
              className="w-full h-full object-cover" // Set the width for desktop view
            />
          </div>
        </div>

        {/* Add spacing and line separator */}
        <div className="mt-12 lg:mt-14 border-t border-gray-300"></div>

        {/* New block with two columns */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold">Users</div>
            <div
              className={`text-4xl mb-2 ${statistic1 < usersCount ? "animate-pulse" : ""
              }`}
            >
              {statistic1}
            </div>
            <img
              src={`/peopleImg.png`}
              alt="Image 1"
              className="mt-4 w-full h-32 object-contain"
            />
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">Stocks</div>
            <div
              className={`text-4xl mb-2 ${statistic2 < stocksCount ? "animate-pulse" : ""
              }`}
            >
              {statistic2}
            </div>
            <img
              src={`/stockImg.png`}
              alt="Image 2"
              className="mt-4 w-full h-32 object-contain"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
