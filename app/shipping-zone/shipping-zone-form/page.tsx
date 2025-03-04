// "use client"

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Toast } from "@/components/ui/toast" // Import toast if available

// interface ShippingMethod {
//   id: string
//   title: string
//   enabled: boolean
//   description: string
// }

// export default function ShippingZonePage() {
//   const [zoneName, setZoneName] = useState("")
//   const [zoneRegions, setZoneRegions] = useState("")
//   const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([])
  
//   // Dialog state
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [newMethod, setNewMethod] = useState<ShippingMethod>({
//     id: "",
//     title: "",
//     enabled: true,
//     description: ""
//   })
//   // Add loading states
//   const [isSaving, setIsSaving] = useState(false)
//   const [isAdding, setIsAdding] = useState(false)

//   const openAddMethodDialog = () => {
//     setNewMethod({
//       id: Date.now().toString(), // Simple way to generate unique id
//       title: "",
//       enabled: true,
//       description: ""
//     })
//     setIsDialogOpen(true)
//   }

//   const addShippingMethod = () => {
//     if (newMethod.title.trim() === "") {
//       // Show error message if title is empty
//       alert("Please enter a title for the shipping method")
//       return
//     }
    
//     setIsAdding(true)
    
//     // Simulate API call with setTimeout
//     setTimeout(() => {
//       setShippingMethods([...shippingMethods, newMethod])
//       setIsDialogOpen(false)
//       setIsAdding(false)
      
//       // Show success message
//       if (typeof Toast !== 'undefined') {
//         Toast({
//           title: "Shipping method added",
//           description: `${newMethod.title} has been added to your shipping zone`,
//         })
//       } else {
//         alert(`Shipping method "${newMethod.title}" added successfully!`)
//       }
//     }, 500) // Simulate a short delay
//   }

//   const toggleMethodEnabled = (id: string) => {
//     setShippingMethods(methods => 
//       methods.map(method => 
//         method.id === id ? { ...method, enabled: !method.enabled } : method
//       )
//     )
//   }

//   const saveShippingZone = () => {
//     if (zoneName.trim() === "") {
//       alert("Please enter a zone name")
//       return
//     }
    
//     setIsSaving(true)
    
//     // Here you would typically send data to your backend
//     // Simulate an API call with setTimeout
//     setTimeout(() => {
//       console.log("Saving shipping zone with data:", {
//         zoneName,
//         zoneRegions,
//         shippingMethods
//       })
      
//       setIsSaving(false)
      
//       // Show success message
//       if (typeof Toast !== 'undefined') {
//         Toast({
//           title: "Shipping zone saved",
//           description: `"${zoneName}" has been saved successfully`,
//         })
//       } else {
//         alert(`Shipping zone "${zoneName}" saved successfully!`)
//       }
//     }, 1000) // Simulate a delay for the API call
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header navigation */}
//       <div className="flex items-center gap-2 text-xs uppercase font-medium text-gray-600 mb-4">
//         <span className="cursor-pointer hover:text-indigo-600">SHIPPING ZONE</span>
//         <span className="text-gray-400">|</span>
//         <span className="cursor-pointer hover:text-indigo-600">SHIPPING CLASSES</span>
//       </div>
      
//       {/* Title */}
//       <h1 className="text-2xl font-semibold mb-6">Shipping Zone &gt; Zone</h1>
      
//       {/* Form fields */}
//       <div className="space-y-4 mb-6">
//         <div className="grid grid-cols-4 items-center">
//           <label className="text-sm font-medium text-gray-700">Zone name</label>
//           <Input
//             value={zoneName}
//             onChange={(e) => setZoneName(e.target.value)}
//             className="col-span-3"
//             placeholder="Enter zone name"
//             required
//           />
//         </div>
        
//         <div className="grid grid-cols-4 items-center">
//           <label className="text-sm font-medium text-gray-700">Zone regions</label>
//           <Input
//             value={zoneRegions}
//             onChange={(e) => setZoneRegions(e.target.value)}
//             className="col-span-3"
//             placeholder="Select regions"
//           />
//         </div>
//       </div>
      
//       {/* Shipping methods section */}
//       <h2 className="text-base font-medium mb-4">Shipping methods</h2>
      
//       {/* Table */}
//       <div className="bg-white rounded-md border border-gray-200 mb-4 overflow-hidden">
//         <div className="grid grid-cols-3 p-4 border-b border-gray-200 text-sm font-medium bg-gray-50">
//           <div>Title</div>
//           <div>Enabled</div>
//           <div>Description</div>
//         </div>
        
//         {shippingMethods.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             No shipping methods added yet. Click &quot;Add Shipping Method&quot; to create one.
//           </div>
//         ) : (
//           shippingMethods.map(method => (
//             <div key={method.id} className="grid grid-cols-3 p-4 border-b border-gray-200 items-center">
//               <div className="font-medium">{method.title}</div>
//               <div>
//                 <Switch 
//                   checked={method.enabled} 
//                   onCheckedChange={() => toggleMethodEnabled(method.id)} 
//                 />
//               </div>
//               <div className="text-sm text-gray-600">{method.description}</div>
//             </div>
//           ))
//         )}
//       </div>
      
//       {/* Action buttons */}
//       <div className="flex justify-end mb-6">
//         <Button 
//           variant="outline"
//           onClick={openAddMethodDialog}
//         >
//           Add Shipping Method
//         </Button>
//       </div>
      
//       <div>
//         <Button 
//           variant="outline" 
//           className="text-gray-700"
//           onClick={saveShippingZone}
//           disabled={zoneName.trim() === "" || isSaving}
//         >
//           {isSaving ? "Saving..." : "Save Shipping Zone"}
//         </Button>
//       </div>

//       {/* Add Shipping Method Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add Shipping Method</DialogTitle>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="method-title" className="text-right">
//                 Title
//               </Label>
//               <Input
//                 id="method-title"
//                 value={newMethod.title}
//                 onChange={(e) => setNewMethod({ ...newMethod, title: e.target.value })}
//                 className="col-span-3"
//                 placeholder="e.g. Flat rate"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="method-description" className="text-right">
//                 Description
//               </Label>
//               <Input
//                 id="method-description"
//                 value={newMethod.description}
//                 onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
//                 className="col-span-3"
//                 placeholder="Short description"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="method-enabled" className="text-right">
//                 Enabled
//               </Label>
//               <div className="col-span-3">
//                 <Switch
//                   id="method-enabled"
//                   checked={newMethod.enabled}
//                   onCheckedChange={(checked) => setNewMethod({ ...newMethod, enabled: checked })}
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isAdding}>
//               Cancel
//             </Button>
//             <Button type="button" onClick={addShippingMethod} disabled={newMethod.title.trim() === "" || isAdding}>
//               {isAdding ? "Adding..." : "Add Method"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }