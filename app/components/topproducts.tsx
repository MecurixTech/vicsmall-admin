"use client";


import Link from "next/link";
import { useState } from "react";
import { products } from "../data/dummyData";
import Image from "next/image";
import Filters from "../components/products/filters";

const TopProducts = () => {
  const [isInListView] = useState<boolean>(true);
  const [isShowingFilters] = useState<boolean>(false);

  return (
    <section className="flex flex-col">
      
      <h1 className="mb-4 p-4 text-3xl font-bold text-gray-800 ">
       Top Products
      </h1>
      <div className="flex items-start gap-4">
        
        {isShowingFilters && <Filters />}
        

        <div className="flex-[5]">
          

          

          {isInListView ? (
            <table className="w-full rounded-xl bg-white text-sm shadow-sm">
              <thead>
                <tr>
                  
                  <th>PRODUCT NAME</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>SOLD</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    
                    <td>
                      <Link
                        href={`products/${product.id}`}
                        className="hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td>{product.price}</td>
                    
                    <td>
                      <span
                        className={`${product.status === "Available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} rounded-lg p-2 text-xs`}
                      >
                        {product.status}
                      </span>
                    </td>
                    
                    <td>
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <Link
                  href={`products/${product.id}`}
                  key={product.id}
                  className="relative overflow-hidden rounded-xl bg-white"
                >
                  <span
                    className={`${product.status === "Available" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} absolute right-4 top-4 rounded-lg p-2 text-xs`}
                  >
                    {product.status}
                  </span>
                  <Image
                    src={product.imgSrc}
                    height={48}
                    width={48}
                    alt={product.name}
                    className="h-32 w-full"
                  />
                  <div className="p-2 text-sm">
                    <p className="font-medium">{product.name}</p>
                    
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
    </section>
  );
};

export default TopProducts;
