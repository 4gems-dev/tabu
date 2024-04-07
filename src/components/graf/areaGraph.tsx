import { useEffect, useState } from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

type PropsType = {
  data: { x: string; y: number }[];
  width: number;
  height: number;
};

export default function AreaGraph(props: PropsType) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <AreaChart {...props}>
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="x" />
          <YAxis />
          {/* <Tooltip /> */}
          <Area
            animationDuration={500}
            type="monotone"
            dataKey="y"
            stroke="#0070f3"
            fill="rgba(0, 112, 243, 0.1)"
          />
        </AreaChart>
      )}
    </>
  );
}
