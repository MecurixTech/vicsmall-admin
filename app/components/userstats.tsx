"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserStats: React.FC = () => {
  const data = [
    { name: "Jan", visitors: 0, revenue: 0 },
    { name: "Feb", visitors: 0, revenue: 0 },
    { name: "Mar", visitors: 0, revenue: 0 },
    { name: "Apr", visitors: 0, revenue: 0 },
    { name: "May", visitors: 0, revenue: 0 },
    { name: "Jun", visitors: 0, revenue: 0 },
    { name: "Jul", visitors: 0, revenue: 0 },
    { name: "Aug", visitors: 0, revenue: 0 },
    { name: "Sep", visitors: 0, revenue: 0 },
    { name: "Oct", visitors: 0, revenue: 0 },
    { name: "Nov", visitors: 0, revenue: 0 },
    { name: "Dec", visitors: 0, revenue: 0 },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white bg-opacity-80 p-4 shadow-lg">
      <div className="flex items-center justify-center border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-gray-600">User Statistics</h2>
      </div>

      <div className="mt-4 flex">
        <div className="w-1/2 border-r border-gray-300 pr-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">No. of Visitors</p>
              <p className="text-3xl font-bold text-gray-800">0</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-sm">0%</span>
            </div>
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">Revenue Rate</p>
              <p className="text-3xl font-bold text-gray-800">$0</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-sm">0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="visitors" fill="#70E4AA" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" fill="#038444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStats;
