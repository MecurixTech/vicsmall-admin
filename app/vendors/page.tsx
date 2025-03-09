"use client";

import {
  FilterAltOutlined,
  MenuOutlined,
  SearchOutlined,
  WindowOutlined,
 
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Filters from "../components/products/filters";

type VendorStatus = "Active" | "Deactivated" | "Offline";
const vendors = [
  {
    id: 1,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Ash Luxy",
    storeName: "Ash Luxy",
    categories: [ "Lingerie"],
    status: "Active" as VendorStatus,
    date: "2024-03-10",
  },
  {
    id: 2,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Ash Luxy",
    storeName: "Ash Luxy",
    categories: ["Lingerie"],
    status: "Deactivated" as VendorStatus,
    date: "2024-03-11",
  },
  {
    id: 3,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Ash Luxy",
    storeName: "Ash Luxy",
    categories: ["Lingerie"],
    status: "Offline" as VendorStatus,
    date: "2024-03-12",
  },
  {
    id: 4,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Fashion Hub",
    storeName: "Trendy Styles",
    categories: ["Lingerie"],
    status: "Active" as VendorStatus,
    date: "2024-03-13",
  },
  {
    id: 5,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Ash Luxy",
    storeName: "Ash Luxy",
    categories: ["Lingerie"],
    status: "Active" as VendorStatus,
    date: "2024-03-14",
  },
  {
    id: 6,
    imgSrc: "https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP",
    name: "Ash Luxy",
    storeName: "Ash Luxy",
    categories: ["Lingerie"],
    status: "Active" as VendorStatus,
    date: "2024-03-15",
  },
];

const VendorsPage = () => {
  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
  const [checkedProducts, setCheckedProducts] = useState<{ [key: number]: boolean }>({});
  
  

  const statusStyles = {
    Active: "bg-green-100 text-green-800 border-green-800",
    Deactivated: "bg-red-100 text-red-800 border-red-800",
    Offline: "bg-gray-100 text-gray-800 border-gray-800",
  };

  const [filters, setFilters] = useState({
    allproduct: true,
    available: false,
    outofstock: false,
  });



  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

 

  const handleCheckboxToggle = (id: number) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

 

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
            <div className="flex flex-wrap items-center gap-2 mt-4">
             
              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm ${
                  filters.allproduct
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleFilterChange("allproduct")}
              >
                ALL PRODUCTS [100]
              </div>

          
              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm ${
                  filters.available
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleFilterChange("available")}
              >
                AVAILABLE [20]
              </div>

              <div
                className={`cursor-pointer rounded px-3 py-1 text-sm ${
                  filters.outofstock
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleFilterChange("outofstock")}
              >
                OUT OF STOCK [4]
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
                    <th>STORE NAME</th>
                    <th>VENDOR CATEGORIES</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
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
                          src={vendor.imgSrc}
                          alt={vendor.name}
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
                          {vendor.name}
                        </Link>
                      </td>
                      <td>{vendor.storeName}</td>
                      <td className="capitalize">{vendor.categories.join(", ")}</td>
                      <td>
                        <span
                          className={`${
                            statusStyles[vendor.status]
                          } rounded-lg p-2 text-xs`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td>{vendor.date}</td>
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
              {vendors.map((vendor) => (
                <Link
                  href={`products/${vendor.id}`}
                  key={vendor.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${
                      statusStyles[vendor.status]
                    } absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {vendor.status}
                  </span>
                  <Image
                    src={vendor.imgSrc}
                    height={48}
                    width={48}
                    alt={vendor.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{vendor.name}</p>
                    <p className="text-gray-400">
                      Category: {vendor.categories.join(", ")}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>{vendor.date}</span>
                      <span className="text-lg font-bold text-gray-800">
                        {vendor.storeName}
                      </span>
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