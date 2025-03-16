"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Dior", value: 0, color: "#F5842F" },
  { name: "Louis vuitton", value: 0, color: "#038444" },
  { name: "Dolche&Gabanna", value: 0, color: "#040458" },
  { name: "Gucci", value: 0, color: "#E90B0B" },
];

const BrandsChart = () => {
  return (
    <section className="mb-6">
      <h2 className="p-4 text-left text-xl font-bold">BRAND CATEGORY</h2>
      <div className="mx-auto flex w-full flex-col space-y-6 overflow-hidden rounded-xl bg-white p-6 shadow-md md:flex-row md:space-y-0">
        <div className="relative flex w-full flex-col items-center justify-center">
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

          <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
            {data.reduce((acc, curr) => acc + curr.value, 0)}
          </div>
        </div>

        <div className="w-full space-y-4 md:w-2/3">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-gray-800"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="h-3 w-3 rounded-full"
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
