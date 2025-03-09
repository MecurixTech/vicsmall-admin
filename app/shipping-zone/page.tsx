import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link"

interface ShippingZone {
  zoneName: string
  regions: string
  shippingMethods: string
}

const shippingZones: ShippingZone[] = [
  {
    zoneName: "Lagos State",
    regions: "Lagos",
    shippingMethods: "Home Delivery, Local Pickup",
  },
  {
    zoneName: "FCT",
    regions: "FCT",
    shippingMethods: "Local Pickup, Home Delivery",
  },
  {
    zoneName: "Rivers State",
    regions: "Rivers",
    shippingMethods: "Home Delivery, Local Pickup",
  },
]
export default function page() {
  return (
    <>
    <div>
      <p><span className='font-bold'>Shipping zone</span> | Shipping classes</p>
    </div>

    <div className="flex justify-end px-4 py-2">
            <Link href="/shipping-zone/shipping-zone-form">
          <Button className="rounded-md bg-[#FF7A45] px-4 py-2 font-medium text-white hover:bg-[#FF7A45]/90">
            Add shipping zone
          </Button>
          </Link>
        </div>
    <div className="w-full bg-gray-50 p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-xs font-medium text-gray-500">ZONE NAME</TableHead>
            <TableHead className="text-xs font-medium text-gray-500">REGION (S)</TableHead>
            <TableHead className="text-xs font-medium text-gray-500">SHIPPING METHOD (S)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shippingZones.map((zone, index) => (
            <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <TableCell className="py-4">{zone.zoneName}</TableCell>
              <TableCell className="py-4">{zone.regions}</TableCell>
              <TableCell className="py-4">{zone.shippingMethods}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>
  )
}
