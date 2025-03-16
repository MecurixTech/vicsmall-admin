"use client";

import { MoreVertOutlined, SearchOutlined } from "@mui/icons-material";
import Image from "next/image";
import StarRating from "../../components/star-rating";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Review = {
  id: number;
  product_name: string;
  customer_email: string;
  rating: number;
  review: string;
  created_at: Date;
};

const Reviews = () => {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  if (!auth.access) {
    redirect("/login");
  }

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadingReviews = toast.loading("Loading reviews...");
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review/admin-reviews`, {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast.dismiss(loadingReviews);
          if (res.status === 200) {
            setReviews(res.data.Data);
            toast.success(res.data.Message);
          } else {
            toast.error(res.data.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(loadingReviews);
          toast.error("An error occurred!");
        });
    }
  }, [auth.access]);

  return (
    <>
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Reviews
      </h1>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews"
              className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 focus:border-black focus:outline-none focus:ring"
            />
            <SearchOutlined className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl border bg-gray-200 p-2 pr-3">
          <MoreVertOutlined fontSize="inherit" />
          <span>Bulk action</span>
        </button>
      </div>

      <div className="mb-4 flex items-center gap-4 text-sm">
        <button className="font-semibold text-accent-900">
          ALL REVIEWS [{reviews.length}]
        </button>
      </div>

      <div className="max-w-[100vw] overflow-x-auto">
        <table className="w-full min-w-[600px] rounded-xl bg-white text-sm shadow-sm">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="select_all_items"
                  id="select_all_items"
                  aria-label="Select all items"
                />
              </th>
              <th>Product</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Customer</th>
              <th>Submitted on</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review: Review) => (
              <tr key={review.id}>
                <td>
                  <input
                    type="checkbox"
                    name="select_all_items"
                    id="select_all_items"
                    aria-label="Select all items"
                  />
                </td>
                <td className="flex min-w-32 items-center gap-2">
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                    alt={review.product_name}
                    height={48}
                    width={48}
                    className="rounded-xl"
                  />
                  <div>
                    <p>{review.product_name}</p>
                  </div>
                </td>
                <td>
                  <div className="flex w-fit items-center">
                    <StarRating rating={review.rating} size="inherit" />
                  </div>
                </td>
                <td className="max-w-[40ch] truncate">{review.review}</td>
                <td>{review.customer_email}</td>
                <td>{new Date(review.created_at).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reviews;
