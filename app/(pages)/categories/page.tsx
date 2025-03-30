"use client";

import CreateCategoryPopup from "@/app/components/categories/create-category-popup";
import { Category } from "@/app/data/dummyTypes";
import { DeleteOutlined } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  useEffect(() => {
    if (!auth.access) {
      redirect("/login");
    }
  }, [auth]);

  const [categories, setCategories] = useState<Category[]>();
  const [isShowingCreateCategoryPopup, setIsShowingCreateCategoryPopup] =
    useState(false);

  const handleDeleteCategory = (name: string, id: string) => {
    const deletingCategory = toast.loading(`Deleting category: ${name}`);

    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/admin-categories/${id}`,
        {
          headers: { Authorization: `Bearer ${auth.access}` },
        },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(deletingCategory);
        if (res.status === 200) {
          toast.success(res.data.Message);
          window.location.reload();
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occured!");
      })
      .finally(() => {
        toast.dismiss(deletingCategory);
      });
  };

  useEffect(() => {
    const loadingCategories = toast.loading("Loading categories...");

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/admin-categories`,
        { headers: { Authorization: `Bearer ${auth.access}` } },
      )
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingCategories);
        if (res.status === 200) {
          setCategories(res.data.Data);
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occured!");
      })
      .finally(() => {
        toast.dismiss(loadingCategories);
      });
  }, []);

  return (
    <>
      {isShowingCreateCategoryPopup && (
        <CreateCategoryPopup
          setIsShowingCreateCategoryPopup={setIsShowingCreateCategoryPopup}
          token={auth.access}
        />
      )}
      <h1 className="mb-4 hidden text-3xl font-bold text-gray-800 md:block">
        Categories
      </h1>

      <button
        onClick={() => setIsShowingCreateCategoryPopup(true)}
        className="button button-accent px-4 py-2"
      >
        Create new category +
      </button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.category_id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {new Date(category.created_at).toDateString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() =>
                    handleDeleteCategory(category.name, category.category_id)
                  }
                >
                  <DeleteOutlined color="error" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoriesPage;
