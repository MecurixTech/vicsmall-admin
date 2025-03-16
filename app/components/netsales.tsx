"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { label: "Jan", sales: 0 },
  { label: "Feb", sales: 0 },
  { label: "Mar", sales: 0 },
  { label: "Apr", sales: 0 },
  { label: "May", sales: 0 },
  { label: "Jun", sales: 0 },
];

const weeklyData = [
  { label: "Week 1", sales: 0 },
  { label: "Week 2", sales: 0 },
  { label: "Week 3", sales: 0 },
  { label: "Week 4", sales: 0 },
];

const dailyData = [
  { label: "Mon", sales: 0 },
  { label: "Tue", sales: 0 },
  { label: "Wed", sales: 0 },
  { label: "Thu", sales: 0 },
  { label: "Fri", sales: 0 },
  { label: "Sat", sales: 0 },
  { label: "Sun", sales: 0 },
];

const NetSalesChart = () => {
  const [timeRange, setTimeRange] = useState<"monthly" | "weekly" | "daily">(
    "monthly",
  );

  const getData = () => {
    switch (timeRange) {
      case "weekly":
        return weeklyData;
      case "daily":
        return dailyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">NET SALES</h2>
        <select
          className="rounded-md border border-gray-300 p-2"
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "monthly" | "weekly" | "daily")
          }
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSalesChart;
