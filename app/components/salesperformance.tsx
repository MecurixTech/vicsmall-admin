"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Redarrow from "../../public/streamline_graph-arrow-decrease-solid.svg";
import Greenarrow from "../../public/Vector.svg";
import Image from "next/image";

const data = [
  { name: "1", sales: 0 },
  { name: "2", sales: 0 },
  { name: "3", sales: 0 },
  { name: "4", sales: 0 },
  { name: "5", sales: 0 },
  { name: "6", sales: 0 },
  { name: "7", sales: 0 },
];

const SalesPerformance: React.FC = () => {
  return (
    <div className="relative flex flex-col gap-[25px] rounded-[20px] bg-white/80 p-[15px] shadow-md">
      <div className="flex w-full items-center justify-center border-b border-gray-300 pb-[5px]">
        <h2 className="text-[26px] font-bold text-gray-700">
          Sales Performance
        </h2>
      </div>

      <div className="flex w-full">
        <div className="flex h-full w-1/2 flex-col gap-[10px] px-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[16px] text-gray-700">Daily Sales</span>
              <span className="text-[32px] font-bold text-gray-700">$0</span>
            </div>

            <div className="flex items-center gap-[5px]">
              <span className="text-[16px] text-red-500">
                {" "}
                <Image
                  src={Redarrow}
                  alt="Downward Arrow"
                  width={20}
                  height={20}
                />
              </span>
              <span className="text-[12px] text-red-500">0%</span>
            </div>
          </div>

          <div className="h-[90px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#ff0000"
                  fill="url(#redGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#ff0000" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ffaaaa" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex h-full w-1/2 flex-col gap-[10px] px-[10px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[3px]">
              <span className="text-[16px] text-gray-700">Total Product</span>
              <span className="text-[32px] font-bold text-gray-700">$0</span>
            </div>

            <div className="flex items-center gap-[5px]">
              <span className="text-[16px] text-green-600">
                {" "}
                <Image
                  src={Greenarrow}
                  alt="Upward Arrow"
                  width={20}
                  height={20}
                />
              </span>
              <span className="text-[12px] text-green-600">0%</span>
            </div>
          </div>

          <div className="h-[90px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#008000"
                  fill="url(#greenGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="40%" stopColor="#32CD32" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#98FB98" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformance;
