"use client"

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Dior", value: 51, color: "#F5842F" },
  { name: "Louis vuitton", value: 126, color: "#038444" },
  { name: "Dolche&Gabanna", value: 148, color: "#040458" },
  { name: "Gucci", value: 305, color: "#E90B0B" },
];

const BrandsChart = () => {
  return (
    <section className="mb-6">
     <h2 className="text-xl font-bold text-left p-4">BRAND CATEGORY</h2>
    <div className="bg-white overflow-hidden p-6 rounded-xl shadow-md w-full  mx-auto flex flex-col md:flex-row space-y-6 md:space-y-0">
   
      <div className="flex flex-col items-center justify-center w-full relative">
        <PieChart width={200} height={200} className="mx-auto">
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={70}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div className="absolute inset-0 flex items-center justify-center font-semibold text-lg">
          {data.reduce((acc, curr) => acc + curr.value, 0)}
        </div>
      </div>

    
      <div className="w-full md:w-2/3 space-y-4">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-gray-800"
          >
            <div className="flex items-center space-x-2">
            
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>

             
              <div className="flex flex-col">
                <span className="text-sm font-medium">{entry.name}</span>
                <span className="text-[10px] font-normal text-gray-500">
                  {entry.value} PRODUCTS
                </span>
              </div>
            </div>

          
            <span className="text-sm font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
    </section>
    
  );
};

export default BrandsChart;
