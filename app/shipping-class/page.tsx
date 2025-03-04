"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ShippingClass {
  name: string
  slug: string
  description: string
  productCount: number
}

const initialShippingClasses: ShippingClass[] = [
  {
    name: "Abroad Clothing",
    slug: "abroad-clothing",
    description: "-",
    productCount: 100,
  },
  {
    name: "Express",
    slug: "express",
    description: "-",
    productCount: 35,
  },
  {
    name: "Flash Sales",
    slug: "flash-sales",
    description: "-",
    productCount: 10,
  },
]

export default function Page() {
  const [shippingClasses, setShippingClasses] = useState<ShippingClass[]>(initialShippingClasses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newShippingClass, setNewShippingClass] = useState({
    name: "",
    description: "",
  })

  function createSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setNewShippingClass((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newShippingClass.name) {
      const newClass: ShippingClass = {
        name: newShippingClass.name,
        slug: createSlug(newShippingClass.name),
        description: newShippingClass.description || "-",
        productCount: 0,
      }

      setShippingClasses([...shippingClasses, newClass])
      setNewShippingClass({ name: "", description: "" })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>SHIPPING ZONE</span>
        <span>|</span>
        <span className="font-bold">SHIPPING CLASSES</span>
      </div>

      <h1 className="text-2xl font-semibold">Shipping Class</h1>

      <div className="border rounded-lg">
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
                <TableCell>{shippingClass.productCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Shipping Class Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter shipping class name"
                  value={newShippingClass.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description (Optional)
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="resize-none"
                  value={newShippingClass.description}
                  onChange={handleInputChange}
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
  )
}

