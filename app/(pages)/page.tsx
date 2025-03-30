"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Inventory2Outlined,
  ListAltOutlined,
  LocalAtmOutlined,
  LoopOutlined,
  PeopleOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Dashboard as DashboardType } from "../data/dummyTypes";

export default function Dashboard() {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  useEffect(() => {
    if (!auth.access) {
      redirect("/login");
    }
  }, [auth]);

  const [dashboard, setDashboard] = useState<DashboardType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingDashboard = toast.loading("Loading dashboard details...");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/admin-dashboard/`,
        { headers: { Authorization: `Bearer ${auth.access}` } },
      )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setDashboard(res.data.Data);
        toast.dismiss(loadingDashboard);
        if (res.status === 200) {
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      })
      .finally(() => {
        setIsLoading(false);
        toast.dismiss(loadingDashboard);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="grid h-[50vh] place-content-center">
        <LoopOutlined fontSize="large" className="animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="mb-4 text-3xl">Dashboard</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">${dashboard?.total_revenue}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <LocalAtmOutlined />
              <span>Total revenue</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">{dashboard?.total_products}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <Inventory2Outlined />
              <span>Total products</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">{dashboard?.total_orders}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <ListAltOutlined />
              <span>Total orders</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">{dashboard?.total_shops}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <StorefrontOutlined />
              <span>Total shops</span>
            </h2>
          </Card>
          <Card className="min-w-48 flex-grow p-4">
            <p className="text-3xl font-bold">{dashboard?.visitor_count}</p>
            <hr className="my-2" />
            <h2 className="flex items-center gap-2 text-base font-normal">
              <PeopleOutlined />
              <span>Visitor count</span>
            </h2>
          </Card>
        </div>

        <Card className="mb-4 p-4">
          <h2 className="mb-2 text-2xl">Daily sales</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboard?.daily_sales.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.total_sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Card className="mb-4 p-4">
          <h2 className="mb-2 text-2xl">Sales by category</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboard?.sales_by_category.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.category_name}</TableCell>
                    <TableCell>{item.total_sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Card className="p-4">
          <h2 className="mb-2 text-2xl">Top products</h2>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Product name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboard?.top_products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.total_sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
    );
  }
}
