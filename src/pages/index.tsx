import Layout from "@/components/Layout/Layout";
import Container from "@/components/ui/container";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [statistics, setStatistics] = useState({
    usersCount: 4,
    stocksCount: 49,
  });

  // annimations
  const [statistic1, setStatistic1] = useState(0);
  const [statistic2, setStatistic2] = useState(0);

  // timeouts for text
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  // counters for column data
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

  useEffect(() => {
    const timeoutFirst = setTimeout(() => {
      setShowFirst(true);
    }, 0);

    const timeoutSecond = setTimeout(() => {
      setShowSecond(true);
    }, 1000);

    const timeoutThird = setTimeout(() => {
      setShowThird(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutFirst);
      clearTimeout(timeoutSecond);
      clearTimeout(timeoutThird);
    };
  }, []);

  return (
    <Layout title="Home" className="grow">
      <Container>
        <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center">
          {/* Left side */}
          <div className="w-full lg:w-1/2 pr-8">
            <div className="sm:h-52 md:h-64">
              {showFirst && (
                <TextGenerateEffect
                  words={"TABU makes investments not a taboo."}
                  className={"text-5xl font-bold mb-4"}
                />
              )}
              {showSecond && (
                <TextGenerateEffect
                  words={
                    "Step into the finance and investing world without taking real risks."
                  }
                  className={"text-3xl xl:text-xl lg:text-3xl"}
                />
              )}
              {showThird && (
                <TextGenerateEffect
                  words={"Learn how to invest and make money with TABU."}
                />
              )}
            </div>

            <div className="mt-10">
              <Link
                href="/form"
                className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] mt-12 px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
              >
                Enter now
              </Link>
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
              className={`text-4xl mb-2 ${
                statistic1 < usersCount ? "animate-pulse" : ""
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
              className={`text-4xl mb-2 ${
                statistic2 < stocksCount ? "animate-pulse" : ""
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
