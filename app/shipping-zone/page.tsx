"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type ShippingZone = {
  shipping_zone_id: string;
  zone_name: string;
  zone_regions: string;
  shipping_methods: [
    {
      shipping_method_id: string;
      title: string;
      is_enabled: boolean;
      description: string;
    },
  ];
  created_at: string;
  updated_at: Date;
};

export default function Page() {
  const [shippingZones, setShippingZones] = useState([]);

  useEffect(() => {
    const loadingShippingZones = toast.loading("Loading shipping zones...");
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shipping/admin-shipping-zones`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth") || "{}").access}`,
          },
        },
      )
      .then((res) => {
        toast.dismiss(loadingShippingZones);
        console.log(res);
        if (res.status === 200) {
          setShippingZones(res.data.Data);
          toast.success(res.data.Message);
        } else {
          toast.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred!");
      });
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 font-semibold">
        <Link href="/shipping-zone" className="text-accent-900">
          Shipping zones
        </Link>
        <Link href="/shipping-class">Shipping classes</Link>
      </div>

      <div className="flex justify-end px-4 py-2">
        <Link href="/shipping-zone/shipping-zone-form">
          <Button className="rounded-md bg-[#FF7A45] px-4 py-2 font-medium text-white hover:bg-[#FF7A45]/90">
            Add shipping zone
          </Button>
        </Link>
      </div>
      <div className="w-full bg-gray-50 p-6">
        {shippingZones.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-xs font-medium text-gray-500">
                  ZONE NAME
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500">
                  REGION (S)
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500">
                  SHIPPING METHOD (S)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingZones.map((zone: ShippingZone) => (
                <TableRow
                  key={zone.shipping_zone_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <TableCell className="py-4">{zone.zone_name}</TableCell>
                  <TableCell className="py-4">{zone.zone_regions}</TableCell>
                  <TableCell className="py-4">
                    {zone.shipping_methods.map((method) => (
                      <p key={method.shipping_method_id}>{method.title}</p>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No shipping zones found</p>
        )}
      </div>
    </>
  );
}
