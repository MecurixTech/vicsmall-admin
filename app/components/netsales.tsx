"use client"

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { label: 'Jan', sales: 4000 },
  { label: 'Feb', sales: 3000 },
  { label: 'Mar', sales: 5000 },
  { label: 'Apr', sales: 4500 },
  { label: 'May', sales: 6000 },
  { label: 'Jun', sales: 7000 },
];

const weeklyData = [
  { label: 'Week 1', sales: 1200 },
  { label: 'Week 2', sales: 2300 },
  { label: 'Week 3', sales: 3100 },
  { label: 'Week 4', sales: 2900 },
];

const dailyData = [
  { label: 'Mon', sales: 500 },
  { label: 'Tue', sales: 700 },
  { label: 'Wed', sales: 800 },
  { label: 'Thu', sales: 900 },
  { label: 'Fri', sales: 1200 },
  { label: 'Sat', sales: 1300 },
  { label: 'Sun', sales: 1100 },
];

const NetSalesChart = () => {
  const [timeRange, setTimeRange] = useState<'monthly' | 'weekly' | 'daily'>('monthly');

  const getData = () => {
    switch (timeRange) {
      case 'weekly':
        return weeklyData;
      case 'daily':
        return dailyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">NET SALES</h2>
        <select
          className="border border-gray-300 p-2 rounded-md"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as 'monthly' | 'weekly' | 'daily')}
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
          <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSalesChart;

