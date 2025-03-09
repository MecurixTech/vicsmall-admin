"use client";

import { useState } from "react";

export default function OrdersPage() {
  const orders = [
    { id: "VICS768", customer: "VERA", amount: "$100", status: "Pending" },
    { id: "VICS550", customer: "SUSAN", amount: "$10", status: "Completed" },
    { id: "VICS549", customer: "DAVE", amount: "$100", status: "Canceled" },
    { id: "VICS767", customer: "FRED", amount: "$10", status: "Pending" },
    { id: "VICS548", customer: "CHIKE", amount: "$100", status: "Completed" },
    { id: "VICS547", customer: "DOM", amount: "$10", status: "Canceled" },
    { id: "VICS766", customer: "VIN", amount: "$100", status: "Pending" },
    { id: "VICS546", customer: "STAR", amount: "$10", status: "Completed" },
    { id: "VICS544", customer: "TREM", amount: "$100", status: "Canceled" },
    { id: "VICS765", customer: "STEPH", amount: "$10", status: "Pending" },
    { id: "VICS545", customer: "NKEM", amount: "$100", status: "Completed" },
    { id: "VICS543", customer: "ANDY", amount: "$10", status: "Canceled" },
  ];

  const statusStyles = {
    Pending: "bg-blue-100 text-blue-800 border-blue-800",
    Completed: "bg-green-100 text-green-800 border-green-800",
    Canceled: "bg-red-100 text-red-800 border-red-800",
  };

  const [filters, setFilters] = useState({
    allOrders: true,
    delivered: false,
    pickup: false,
    canceled: false,
  });

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleThreeDotsClick = (orderId: string) => {
    
    console.log("Three dots clicked:", orderId);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      
      <div className="mb-8 w-full max-w-6xl rounded-2xl bg-[#040458] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">ORDER STATUS</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
            <div className="p-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4.00195C18.175 4.01395 19.353 4.11095 20.121 4.87895C21 5.75795 21 7.17195 21 9.99995V16C21 18.829 21 20.243 20.121 21.122C19.243 22 17.828 22 15 22H9C6.172 22 4.757 22 3.879 21.122C3 20.242 3 18.829 3 16V9.99995C3 7.17195 3 5.75795 3.879 4.87895C4.647 4.11095 5.825 4.01395 8 4.00195" stroke="#040458" stroke-width="1.5"/>
                <path d="M10.5 14H17M7 14H7.5M7 10.5H7.5M7 17.5H7.5M10.5 10.5H17M10.5 17.5H17" stroke="#040458" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M8 3.5C8 3.10218 8.15804 2.72064 8.43934 2.43934C8.72064 2.15804 9.10218 2 9.5 2H14.5C14.8978 2 15.2794 2.15804 15.5607 2.43934C15.842 2.72064 16 3.10218 16 3.5V4.5C16 4.89782 15.842 5.27936 15.5607 5.56066C15.2794 5.84196 14.8978 6 14.5 6H9.5C9.10218 6 8.72064 5.84196 8.43934 5.56066C8.15804 5.27936 8 4.89782 8 4.5V3.5Z" stroke="#040458" stroke-width="1.5"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700">7k</p>
              <p className="text-sm text-gray-500">ALL ORDERS</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
            <div className="p-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#040458" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="#040458" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700">200</p>
              <p className="text-sm text-gray-500">PENDING</p>
            </div>
          </div>

         
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
            <div className="p-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_354_2062)">
                  <path d="M14.5986 8.0389L10.749 12.6561L9.40135 11.0403C9.27535 10.8891 9.1208 10.7642 8.94653 10.6728C8.77226 10.5813 8.58168 10.525 8.38567 10.5072C8.18966 10.4894 7.99205 10.5104 7.80415 10.5689C7.61624 10.6275 7.4417 10.7224 7.2905 10.8484C7.1393 10.9744 7.01439 11.129 6.92292 11.3033C6.83145 11.4775 6.7752 11.6681 6.75738 11.8641C6.73956 12.0601 6.76052 12.2577 6.81907 12.4457C6.87761 12.6336 6.9726 12.8081 7.0986 12.9593L9.59762 15.9593C9.73808 16.1283 9.91401 16.2644 10.1129 16.3578C10.3119 16.4512 10.5289 16.4997 10.7487 16.4998C10.9684 16.5 11.1855 16.4517 11.3846 16.3586C11.5836 16.2654 11.7597 16.1296 11.9004 15.9608L16.9013 9.96077C17.0285 9.80969 17.1245 9.63499 17.1839 9.44671C17.2433 9.25843 17.265 9.06026 17.2477 8.86358C17.2303 8.66691 17.1743 8.47559 17.0829 8.30061C16.9914 8.12563 16.8663 7.97043 16.7147 7.84392C16.5631 7.71741 16.388 7.62208 16.1995 7.56339C16.011 7.5047 15.8128 7.48382 15.6162 7.50193C15.4195 7.52005 15.2285 7.57681 15.0538 7.66895C14.8792 7.7611 14.7245 7.88682 14.5986 8.0389Z" fill="#040458"/>
                  <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C23.9966 8.81844 22.7312 5.76816 20.4815 3.51846C18.2318 1.26876 15.1816 0.00338824 12 0ZM12 21C10.22 21 8.47992 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17293C11.99 2.82567 13.7996 3.0039 15.4442 3.68508C17.0887 4.36627 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C20.9974 14.3862 20.0484 16.6738 18.3611 18.3611C16.6738 20.0484 14.3862 20.9974 12 21Z" fill="#040458"/>
                </g>
                <defs>
                  <clipPath id="clip0_354_2062">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700">1k</p>
              <p className="text-sm text-gray-500">COMPLETED</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
            <div className="p-2">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 20.7771C9.12989 20.5789 8.29407 20.2523 7.52002 19.8081M14 3.22314C15.9882 3.67722 17.7633 4.79284 19.0347 6.38735C20.3061 7.98187 20.9985 9.9608 20.9985 12.0001C20.9985 14.0395 20.3061 16.0184 19.0347 17.6129C17.7633 19.2075 15.9882 20.3231 14 20.7771M4.57902 17.0931C4.03412 16.3003 3.61986 15.4252 3.35202 14.5011M3.12402 10.5001C3.28402 9.55014 3.59202 8.65014 4.02402 7.82514L4.19302 7.52014M6.90702 4.57914C7.84322 3.93602 8.8927 3.47592 10 3.22314" stroke="#040458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12L11 14L15 10" stroke="#040458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700">250</p>
              <p className="text-sm text-gray-500">PROGRESS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 w-full max-w-6xl">
        <div className="flex flex-wrap items-center gap-2">
        
          <div
            className={`cursor-pointer rounded px-3 py-1 text-sm ${
              filters.allOrders
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleFilterChange("allOrders")}
          >
            ALL ORDERS [250]
          </div>

        
          <div
            className={`cursor-pointer rounded px-3 py-1 text-sm ${
              filters.delivered
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleFilterChange("delivered")}
          >
            DELIVERED [120]
          </div>

          <div
            className={`cursor-pointer rounded px-3 py-1 text-sm ${
              filters.pickup
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleFilterChange("pickup")}
          >
            PICKUP [80]
          </div>

          <div
            className={`cursor-pointer rounded px-3 py-1 text-sm ${
              filters.canceled
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleFilterChange("canceled")}
          >
            CANCELED [34]
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">ORDERS</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length}
                    onChange={() => {
                      if (selectedOrders.length === orders.length) {
                        setSelectedOrders([]);
                      } else {
                        setSelectedOrders(orders.map((order) => order.id));
                      }
                    }}
                    className="h-5 w-5 rounded border border-gray-300"
                  />
                </th>
                <th className="p-2 text-left text-sm text-gray-600">ORDER ID</th>
                <th className="p-2 text-left text-sm text-gray-600">
                  CUSTOMER NAME
                </th>
                <th className="p-2 text-left text-sm text-gray-600">AMOUNT</th>
                <th className="p-2 text-left text-sm text-gray-600">STATUS</th>
                <th className="p-2 text-left text-sm text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleOrderSelection(order.id)}
                      className="h-5 w-5 rounded border border-gray-300"
                    />
                  </td>
                  <td className="p-2 text-sm text-gray-800">{order.id}</td>
                  <td className="p-2 text-sm text-gray-800">{order.customer}</td>
                  <td className="p-2 text-sm text-gray-800">{order.amount}</td>
                  <td className="p-2">
                    <span
                      className={`rounded-full px-4 py-1 text-sm ${statusStyles[order.status as keyof typeof statusStyles]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleThreeDotsClick(order.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}