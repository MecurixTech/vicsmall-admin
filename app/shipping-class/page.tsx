"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type ShippingClass = {
  shipping_class_id?: string;
  name: string;
  slug: string;
  description: string;
  product_count: number;
  created_at?: string;
  updated_at?: string;
};

export default function Page() {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  if (!auth.access) {
    redirect("/login");
  }

  const [shippingClasses, setShippingClasses] = useState<ShippingClass[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newShippingClass, setNewShippingClass] = useState({
    name: "",
    description: "",
  });

  function createSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newShippingClass.name) {
      const newClass = {
        name: newShippingClass.name,
        slug: createSlug(newShippingClass.name),
        description: newShippingClass.description || "-",
        product_count: 0,
      };

      if (typeof window !== "undefined") {
        const addingNewClass = toast.loading("Adding new shipping class...");
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/shipping/admin-shipping-classes`,
            newClass,
            {
              headers: {
                Authorization: `Bearer ${auth.access}`,
              },
            },
          )
          .then((res) => {
            console.log(res);
            toast.dismiss(addingNewClass);
            if (res.status === 201) {
              toast.success(
                res.data.Message + ". Refresh the page to view changes",
              );
              setNewShippingClass({ name: "", description: "" });
              setIsDialogOpen(false);
            } else {
              toast.error(res.data.Message);
            }
          })
          .catch((error) => {
            toast.dismiss(addingNewClass);
            toast.error("An error occurred!");
            console.log(error);
          });
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadingShippingClasses = toast.loading(
        "Loading shipping classes...",
      );
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/shipping/admin-shipping-classes`,
          {
            headers: {
              Authorization: `Bearer ${auth.access}`,
            },
          },
        )
        .then((res) => {
          toast.dismiss(loadingShippingClasses);
          console.log(res);
          if (res.status === 200) {
            setShippingClasses(res.data.Data);
            toast.success(res.data.Message);
          } else {
            toast.error(res.data.Message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss(loadingShippingClasses);
          toast.error("An error occurred!");
        });
    }
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4 font-semibold">
        <Link href="/shipping-zone">Shipping zones</Link>
        <Link href="/shipping-class" className="text-accent-900">
          Shipping classes
        </Link>
      </div>

      <h1 className="text-2xl font-semibold">Shipping Classes</h1>

      <div className="rounded-lg border">
        {shippingClasses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipping Class</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Product Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingClasses.map((shippingClass) => (
                <TableRow key={shippingClass.slug}>
                  <TableCell>{shippingClass.name}</TableCell>
                  <TableCell>{shippingClass.slug}</TableCell>
                  <TableCell>{shippingClass.description}</TableCell>
                  <TableCell>{shippingClass.product_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No shipping classes found</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline">Save Shipping Class</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Shipping Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shipping Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Class Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter shipping class name"
                  value={newShippingClass.name}
                  onChange={(e) =>
                    setNewShippingClass({
                      ...newShippingClass,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="resize-none"
                  value={newShippingClass.description}
                  onChange={(e) =>
                    setNewShippingClass({
                      ...newShippingClass,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Add Shipping Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
