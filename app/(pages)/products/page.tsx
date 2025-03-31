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
import { useEffect, useState } from "react";
import { products } from "../../data/dummyData";
import Image from "next/image";
import Filters from "../../components/products/filters";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Product = {
  product_id: string;
  product_name: string;
  product_description: string;
  category?: string;
  product_tags: string;
  product_sale_price: string;
  product_regular_price: string;
  product_visibility: boolean;
  product_status: boolean;
  created_at: Date;
  updated_at: Date;
};

const Products = () => {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  useEffect(() => {
    if (!auth.access) {
      redirect("/login");
    }
  }, [auth]);

  const [isInListView, setIsInListView] = useState<boolean>(true);
  const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [isShowingApprovedProducts, setIsShowingApprovedProducts] =
    useState(true);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);

  const handleCheckboxToggle = (id: string) => {
    setCheckedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAcceptProduct = (id: string) => {
    // Approval logic
    const accepting = toast.loading("Accepting product...");
    if (typeof window !== "undefined") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/approve-product/${id}`,
          {
            product_status: false,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
            },
          },
        )
        .then((res) => {
          toast.dismiss(accepting);
          console.log(res);
          if (res.status === 200) {
            toast.success(res.data.Message);
            window.location.reload();
          } else {
            toast.error(res.data.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(accepting);
          toast.error("An error occurred!");
        });
    }
  };

  const handleRejectProduct = (id: string) => {
    // Rejection logic
    const rejecting = toast.loading("Rejecting product");
    if (typeof window !== "undefined") {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/reject-product/${id}`,
          {
            product_status: false,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
            },
          },
        )
        .then((res) => {
          toast.dismiss(rejecting);
          console.log(res);
          if (res.status === 200) {
            toast.success(res.data.Message);
            window.location.reload();
          } else {
            toast.error(res.data.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(rejecting);
          toast.error("An error occurred!");
        });
    }
  };

  const fetchApprovedProducts = () => {
    const fetchingProducts = toast.loading("Fetching products...");
    if (typeof window !== "undefined") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/approved-products`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.dismiss(fetchingProducts);
            toast.success(res.data.Message);
            setApprovedProducts(res.data.Data);
          }
          console.log(res);
        })

        .catch((error) => {
          console.log(error);
          toast.dismiss(fetchingProducts);
          toast.error("An error occurred!");
        });
    }
  };

  const fetchPendingProducts = () => {
    const fetchingProducts = toast.loading("Fetching products...");
    if (typeof window !== "undefined") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/pending-products`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.dismiss(fetchingProducts);

            toast.success(res.data.Message);
            setPendingProducts(res.data.Data);
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(fetchingProducts);
          toast.error("An error occurred!");
        });
    }
  };

  useEffect(() => {
    fetchApprovedProducts();
    fetchPendingProducts();
  }, []);

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
            <button
              onClick={() => setIsShowingApprovedProducts(true)}
              className={`${isShowingApprovedProducts && "font-bold text-accent-900"}`}
            >
              APPROVED
            </button>
            <button
              onClick={() => setIsShowingApprovedProducts(false)}
              className={`${!isShowingApprovedProducts && "font-bold text-accent-900"}`}
            >
              PENDING REQUESTS
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
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th></th>
                  </tr>
                </thead>
                {isShowingApprovedProducts ? (
                  <tbody>
                    {approvedProducts.map((product: Product) => (
                      <tr key={product.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              checkedProducts[product.product_id] || false
                            }
                            onChange={() =>
                              handleCheckboxToggle(product.product_id)
                            }
                            className="h-5 w-5 cursor-pointer accent-orange-500"
                          />
                        </td>
                        <td>
                          <Image
                            src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                            alt={product.product_name}
                            height={48}
                            width={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </td>
                        <td>
                          <Link
                            href={{
                              pathname: `products/${product.product_id}`,
                              query: { product: JSON.stringify(product) },
                            }}
                            className="hover:underline"
                          >
                            {product.product_name}
                          </Link>
                        </td>
                        <td>{product.product_sale_price}</td>
                        <td>
                          <span
                            className={`${
                              product.product_status === true
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            } rounded-lg p-2 text-xs`}
                          >
                            {product.product_status
                              ? "Available"
                              : "Not available"}
                          </span>
                        </td>
                        <td>{new Date(product.created_at).toDateString()}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleRejectProduct(product.product_id)
                            }
                            className={
                              "flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700 transition duration-200"
                            }
                          >
                            <CloseOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    {pendingProducts.map((product: Product) => (
                      <tr key={product.product_id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              checkedProducts[product.product_id] || false
                            }
                            onChange={() =>
                              handleCheckboxToggle(product.product_id)
                            }
                            className="h-5 w-5 cursor-pointer accent-orange-500"
                          />
                        </td>
                        <td>
                          <Image
                            src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                            alt={product.product_name}
                            height={48}
                            width={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        </td>
                        <td>
                          <Link
                            href={`products/${product.product_id}`}
                            className="hover:underline"
                          >
                            {product.product_name}
                          </Link>
                        </td>
                        <td>{product.product_sale_price}</td>
                        <td>
                          <span
                            className={`${
                              product.product_status === true
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            } rounded-lg p-2 text-xs`}
                          >
                            {product.product_status
                              ? "Available"
                              : "Not available"}
                          </span>
                        </td>
                        <td>{new Date(product.created_at).toDateString()}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleAcceptProduct(product.product_id)
                            }
                            className={
                              "flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 transition duration-200"
                            }
                          >
                            <CheckCircleOutlineOutlined />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product: Product) => (
                <Link
                  href={`products/${product.product_id}`}
                  key={product.product_id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${
                      product.product_status
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    } absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {product.product_status}
                  </span>
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                    height={48}
                    width={48}
                    alt={product.product_name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-gray-400">
                      Category: {product.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <span>{new Date(product.created_at).toDateString()}</span>
                      <span className="text-lg font-bold text-gray-800">
                        {product.product_sale_price}
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
