"use client";

import {
  FilterAltOutlined,
  MenuOutlined,
  SearchOutlined,
  WindowOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Filters from "../../components/products/filters";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type VendorStatus = "Active" | "Deactivated" | "Offline";

type Vendor = {
  id: string;
  email: string;
  full_name: string;
  country_code: string;
  phone_number: string;
  is_vendor: boolean;
  is_active: boolean;
  is_deleted: boolean;
  shop?: string;
  status: VendorStatus;
  date: Date;
};

const VendorsPage = () => {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  useEffect(() => {
    if (!auth.access) {
      redirect("/login");
    }
  }, [auth]);

  const [vendors, setVendors] = useState([]);
  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-800",
    deactivated: "bg-red-100 text-red-800 border-red-800",
    offline: "bg-gray-100 text-gray-800 border-gray-800",
  };

  const [filters, setFilters] = useState({
    allproduct: true,
    available: false,
    outofstock: false,
  });

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleCheckboxToggle = (id: string) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadingVendors = toast.loading("Loading vendors...");
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin-vendors`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast.dismiss(loadingVendors);
          if (res.status === 200) {
            setVendors(res.data.Data);
            toast.success(res.data.Message);
          } else {
            toast.error(res.data.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(loadingVendors);
          toast.error("An error occurred!");
        });
    }
  }, [auth.access]);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
        Vendors
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {isShowingFilters && <Filters />}

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search vendors"
                  className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
                />
                <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
              </div>
              <button
                onClick={() => setIsShowingFilters((prev) => !prev)}
                title="Filters"
                aria-label="Filters"
                className={`${
                  isShowingFilters && "bg-gray-200 text-accent-900"
                } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
              >
                <FilterAltOutlined />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsInListView(true)}
                  className={`${
                    isInListView && "bg-gray-200 text-accent-900"
                  } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <MenuOutlined />
                </button>
                <button
                  onClick={() => setIsInListView(false)}
                  className={`${
                    !isInListView && "bg-gray-200 text-accent-900"
                  } grid h-12 w-12 place-content-center rounded-full hover:bg-gray-200`}
                >
                  <WindowOutlined />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 w-full max-w-6xl">
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm ${
                  filters.allproduct
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleFilterChange("allproduct")}
              >
                ALL PRODUCTS [{vendors.length}]
              </div>
            </div>
          </div>

          {isInListView ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] rounded-xl bg-white text-sm shadow-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>PROFILE ID</th>
                    <th>VENDOR NAME</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor: Vendor) => (
                    <tr key={vendor.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedProducts[vendor.id] || false}
                          onChange={() => handleCheckboxToggle(vendor.id)}
                          className="h-5 w-5 cursor-pointer accent-orange-500"
                        />
                      </td>
                      <td>
                        <Image
                          src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                          alt={vendor.full_name}
                          height={48}
                          width={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td>
                        <Link
                          href={`products/${vendor.id}`}
                          className="hover:underline"
                        >
                          {vendor.full_name}
                        </Link>
                      </td>
                      <td>
                        <span
                          className={`${
                            statusStyles[
                              vendor.status.toLowerCase() as keyof typeof statusStyles
                            ]
                          } rounded-lg p-2 text-xs`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td>{new Date(vendor.date).toDateString()}</td>
                      {/* <td>
                        <button
                          onClick={() => handleApprovalToggle(vendor.id)}
                          className={`${
                            approvedProducts[vendor.id]
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          } flex h-8 w-8 items-center justify-center rounded-full transition duration-200`}
                        >
                          {approvedProducts[vendor.id] ? (
                            <CheckCircleOutlineOutlined />
                          ) : (
                            <CloseOutlined />
                          )}
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {vendors.map((vendor: Vendor) => (
                <Link
                  href={`products/${vendor.id}`}
                  key={vendor.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${
                      statusStyles[
                        vendor.status.toLowerCase() as keyof typeof statusStyles
                      ]
                    } absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {vendor.status}
                  </span>
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                    height={48}
                    width={48}
                    alt={vendor.full_name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{vendor.full_name}</p>
                    <div className="flex items-center justify-between">
                      <span>{new Date(vendor.date).toDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorsPage;
