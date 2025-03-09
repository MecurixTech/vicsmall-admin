"use client"

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Redarrow from "../../public/streamline_graph-arrow-decrease-solid.svg"
import Greenarrow from "../../public/Vector.svg"
import Image from "next/image";

const data = [
  { name: "1", sales: 4000 },
  { name: "2", sales: 3000 },
  { name: "3", sales: 2000 },
  { name: "4", sales: 2780 },
  { name: "5", sales: 1890 },
  { name: "6", sales: 2390 },
  { name: "7", sales: 3490 },
];

const SalesPerformance: React.FC = () => {
  return (
    <div className="relative bg-white/80 rounded-[20px] p-[15px] flex flex-col gap-[25px] shadow-md">
    
      <div className="w-full flex justify-center items-center pb-[5px] border-b border-gray-300">
        <h2 className="text-[26px] font-bold text-gray-700">Sales Performance</h2>
      </div>

      <div className="flex w-full ">
      
        <div className="flex flex-col w-1/2 h-full px-[10px] gap-[10px]">
          <div className="flex justify-between items-center">
          
            <div className="flex flex-col gap-[3px]">
              <span className="text-[16px] text-gray-700">Daily Sales</span>
              <span className="text-[32px] font-bold text-gray-700">$910</span>
            </div>
           
            <div className="flex items-center gap-[5px]">
              <span className="text-[16px] text-red-500"> <Image src={Redarrow} alt="Downward Arrow" width={20} height={20} /></span>
              <span className="text-[12px] text-red-500">-15%</span>
            </div>
          </div>
          
          <div className="w-full h-[90px]">
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

      
        <div className="flex flex-col w-1/2 h-full px-[10px] gap-[10px]">
          <div className="flex justify-between items-center">
       
            <div className="flex flex-col gap-[3px]">
              <span className="text-[16px] text-gray-700">Total Product</span>
              <span className="text-[32px] font-bold text-gray-700">$2621</span>
            </div>
        
            <div className="flex items-center gap-[5px]">
              <span className="text-[16px] text-green-600"> <Image src={Greenarrow} alt="Upward Arrow" width={20} height={20} /></span>
              <span className="text-[12px] text-green-600">+8%</span>
            </div>
          </div>
       
          <div className="w-full h-[90px]">
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
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
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
