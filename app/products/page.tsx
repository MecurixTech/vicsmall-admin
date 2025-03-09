"use client";

import {
  FilterAltOutlined,
  MenuOutlined,
  SearchOutlined,
  WindowOutlined,
  CloseOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { products } from "../data/dummyData";
import Image from "next/image";
import Filters from "../components/products/filters";

const Products = () => {
  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
  const [checkedProducts, setCheckedProducts] = useState<{ [key: number]: boolean }>({});
  const [approvedProducts, setApprovedProducts] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxToggle = (id: number) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApprovalToggle = (id: number) => {
    setApprovedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
        Product Details
      </h1>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {isShowingFilters && <Filters />}

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search pending requests"
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

          <div className="my-4 flex items-center gap-4 text-sm">
            <button className="font-medium">
              PENDING REQUESTS &gt; <span className="text-gray-400">APPROVED</span>
            </button>
          </div>

          {isInListView ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] rounded-xl bg-white text-sm shadow-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>IMAGE</th>
                    <th>PRODUCT NAME</th>
                    <th>PRICE</th>
                    <th>PRODUCT CATEGORIES</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedProducts[product.id] || false}
                          onChange={() => handleCheckboxToggle(product.id)}
                          className="h-5 w-5 cursor-pointer accent-orange-500"
                        />
                      </td>
                      <td>
                        <Image
                          src={product.imgSrc}
                          alt={product.name}
                          height={48}
                          width={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td>
                        <Link
                          href={`products/${product.id}`}
                          className="hover:underline"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td>{product.price}</td>
                      <td className="capitalize">{product.category}</td>
                      <td>
                        <span
                          className={`${
                            product.status === "Available"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                          } rounded-lg p-2 text-xs`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td>{product.date}</td>
                      <td>
                        <button
                          onClick={() => handleApprovalToggle(product.id)}
                          className={`${
                            approvedProducts[product.id]
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          } flex h-8 w-8 items-center justify-center rounded-full transition duration-200`}
                        >
                          {approvedProducts[product.id] ? (
                            <CheckCircleOutlineOutlined />
                          ) : (
                            <CloseOutlined />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <Link
                  href={`products/${product.id}`}
                  key={product.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${
                      product.status === "Available"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    } absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {product.status}
                  </span>
                  <Image
                    src={product.imgSrc}
                    height={48}
                    width={48}
                    alt={product.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-gray-400">
                      Category: {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>{product.date}</span>
                      <span className="text-lg font-bold text-gray-800">
                        {product.price}
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

export default Products;