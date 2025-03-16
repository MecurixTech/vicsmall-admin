"use client";

import React, { useEffect, useState } from "react";
import UserStats from "../components/userstats";
import NetSalesChart from "../components/netsales";
import SalesPerformance from "../components/salesperformance";
import SalesChart from "../components/salescategory";
import TopProducts from "../components/topproducts";
import BrandsChart from "../components/brandscategory";
import TrendingCard from "../components/trendingproducts";
import axios from "axios";
import { redirect } from "next/navigation";

const Home = () => {
  const [auth, setAuth] = useState(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("auth") || "{}"),
  );

  if (!auth.access) {
    redirect("/login");
  }

  // Refresh the access token whenever user opens website
  // A tacky solution, but it works as long as the user does
  // not stay too long without visiting the website
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh`, {
        refresh: auth.refresh,
      })
      .then((res) => {
        console.log(res);
        setAuth({ ...auth, access: res.data.access });
      })
      .catch((error) => console.log("An error occurred: " + error));
  }, [auth]);
  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Dashboard
      </h1>

      <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UserStats />
          <NetSalesChart />

          <SalesPerformance />
          <SalesChart />

          <TopProducts />
          <div className="flex flex-col">
            <BrandsChart />
            <TrendingCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
