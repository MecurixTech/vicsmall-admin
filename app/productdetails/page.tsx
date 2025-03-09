"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState<string>("S");
  const [selectedColor, setSelectedColor] = useState<string>("red");

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "red", hex: "#E90B0B" },
    { name: "green", hex: "#70E4AA" },
    { name: "blue", hex: "#17A1FA" },
  ];
  const information = [
    { label: "SHIPPING CLASS", value: "Standard" },
    { label: "SHIPPING DETAILS", value: "3-5 business days" },
    { label: "STATUS", value: "In Stock" },
    { label: "TAGS", value: "Bikini, Summer, Beachwear" },
    { label: "WEIGHT", value: "0.5 kg" },
    { label: "WIDTH", value: "30 cm" },
    { label: "LENGTH", value: "60 cm" },
    { label: "HEIGHT", value: "10 cm" },
  ];

  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-gray-100 p-4">
    
      <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
        <span>Products</span>
        <span>&gt;</span>
        <span className="font-bold">Product Details</span>
      </div>

    
      <div className="flex flex-col w-full gap-4 lg:flex-row">
       
        <div className="w-full lg:max-w-[20rem] rounded-2xl bg-white shadow-lg">
         
          <div className="p-4">
          
            <div className="mb-4 h-48 w-full rounded-2xl bg-gray-200 sm:h-72">
              <Image
                src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                alt="Main Product"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>

          
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="h-16 w-full cursor-pointer rounded-lg bg-gray-200"
                >
                  <Image
                    src="https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP"
                    alt="Thumbnail"
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === 1 ? "bg-blue-800" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-white md:bg-transparent p-4 shadow-lg md:shadow-none">
         
          <div className="flex flex-col sm:flex-row justify-between gap-4 ">
            <h1 className="text-2xl font-bold text-black sm:text-3xl">
              Fancy Bikini
            </h1>
          
            <div className="flex flex-col sm:flex-row gap-2 shadow-inner">
              <button className="w-full sm:w-auto rounded-lg bg-orange-100 px-4 py-2 text-orange-800 transition hover:bg-orange-200">
                Reject
              </button>
              <button className="w-full sm:w-auto rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600">
                Approve
              </button>
            </div>
          </div>

          <p className="mb-4 text-sm text-gray-600">PRODUCT ID: VIC2345</p>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-700">
              PRODUCT SHORT DESCRIPTION
            </h2>
            <p className="text-sm text-gray-500">
              Turn heads at the beach or poolside with this stunning Fancy
              Bikini, designed to combine elegance with comfort. Sophisticated
              Design: Featuring a chic cut and vibrant colors that flatter every
              body type, this bikini offers a blend of boldness and grace.
              Premium Fabric: Made from high-quality, quick-drying materials, it
              provides a silky-smooth feel while ensuring durability and
              breathability.
            </p>
          </div>

          <div className="mb-6 w-full rounded-lg bg-white p-4 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-full">
                  <span className="h-12 w-12 text-xl text-orange-500">
                    <svg
                      width="42"
                      height="36"
                      viewBox="0 0 42 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.0001 4.50018C20.432 4.50005 19.8755 4.66126 19.3954 4.96504C18.9153 5.26883 18.5313 5.7027 18.2881 6.21618C18.0267 6.74597 17.5674 7.1517 17.0094 7.34575C16.4514 7.53981 15.8395 7.50661 15.3058 7.25333C14.772 7.00006 14.3593 6.54702 14.1568 5.99205C13.9542 5.43709 13.978 4.82472 14.2231 4.28718C14.725 3.2295 15.4675 2.304 16.3913 1.58476C17.315 0.865515 18.3942 0.372503 19.5427 0.145184C20.6911 -0.082135 21.8768 -0.0374489 23.0049 0.275665C24.1329 0.58878 25.172 1.16163 26.039 1.94836C26.906 2.73508 27.5767 3.71384 27.9976 4.8063C28.4184 5.89875 28.5777 7.07456 28.4626 8.2396C28.3476 9.40465 27.9614 10.5266 27.3349 11.5156C26.7085 12.5046 25.8592 13.3332 24.8551 13.9352C24.3749 14.2101 23.9399 14.5571 23.5651 14.9642C23.2831 15.2942 23.2501 15.4922 23.2501 15.5822C23.2501 15.7922 23.3641 15.9902 23.5501 16.0922L38.8741 24.6062C40.0527 25.2594 40.9808 26.2859 41.5125 27.5241C42.0441 28.7623 42.1493 30.1421 41.8113 31.4466C41.4733 32.751 40.7114 33.9062 39.6454 34.7305C38.5794 35.5547 37.2697 36.0014 35.9221 36.0002H6.06612C4.72031 35.9997 3.41273 35.5525 2.34844 34.7288C1.28415 33.9051 0.523338 32.7514 0.185317 31.4488C-0.152704 30.1461 -0.0488168 28.7681 0.480687 27.5308C1.01019 26.2935 1.93536 25.267 3.11112 24.6122L14.6581 18.1922C14.9168 18.0403 15.2033 17.9416 15.5007 17.9021C15.7981 17.8626 16.1004 17.8829 16.3899 17.9619C16.6793 18.0409 16.95 18.177 17.186 18.3622C17.4221 18.5474 17.6187 18.7779 17.7644 19.0402C17.91 19.3024 18.0018 19.5912 18.0342 19.8895C18.0666 20.1877 18.039 20.4895 17.953 20.7769C17.8671 21.0644 17.7246 21.3317 17.5338 21.5633C17.343 21.7948 17.1078 21.9859 16.8421 22.1252L5.29812 28.5452C4.99121 28.714 4.74933 28.9803 4.61072 29.302C4.47212 29.6237 4.4447 29.9824 4.53281 30.3214C4.62092 30.6604 4.81952 30.9604 5.09722 31.1738C5.37491 31.3873 5.71585 31.5022 6.06612 31.5002H35.9221C36.2721 31.5008 36.6123 31.385 36.8892 31.1712C37.1662 30.9573 37.3642 30.6574 37.4522 30.3187C37.5401 29.98 37.513 29.6217 37.375 29.3001C37.2371 28.9785 36.9961 28.7119 36.6901 28.5422L21.3601 20.0252C20.5697 19.5837 19.911 18.9397 19.4518 18.1594C18.9926 17.3791 18.7493 16.4906 18.7471 15.5852C18.7471 14.1122 19.3921 12.9212 20.1271 12.0542C20.8471 11.1992 21.7471 10.5482 22.5361 10.0742C23.0989 9.73727 23.5357 9.2252 23.7798 8.61638C24.0238 8.00756 24.0616 7.33553 23.8874 6.70318C23.7131 6.07084 23.3364 5.51303 22.815 5.11515C22.2935 4.71727 21.656 4.50126 21.0001 4.50018Z"
                        fill="#FF8C48"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-700">100</p>
                  <p className="text-sm text-gray-500">Price</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-xl text-white">
                    <svg
                      width="42"
                      height="38"
                      viewBox="0 0 42 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 0H38V4H4V0ZM2.36 6H39.64L42 17.802V22H39V38H35V22H25V38H3V22H0V17.802L2.36 6ZM7 22V34H21V22H7ZM37.96 18L36.36 10H5.64L4.04 18H37.96Z"
                        fill="#FF8C48"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-700">275</p>
                  <p className="text-sm text-gray-500">Stock Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col w-full gap-4 mt-8 lg:flex-row">
       
        <div className="w-full lg:max-w-[20rem] rounded-2xl bg-white p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            PRODUCT FULL DESCRIPTION
          </h2>
          <p className="text-sm text-gray-500">
            Turn heads at the beach or poolside with this stunning Fancy Bikini,
            designed to combine elegance with comfort. Sophisticated Design:
            Featuring a chic cut and vibrant colors that flatter every body type,
            this bikini offers a blend of boldness and grace. Premium Fabric:
            Made from high-quality, quick-drying materials, it provides a
            silky-smooth feel while ensuring durability and breathability.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-white md:bg-transparent p-4 ">
          <div className="flex flex-col sm:flex-row gap-6">
            
            <div className="w-full sm:w-1/2">
              <h2 className="mb-2 text-sm text-gray-700">SIZE</h2>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`flex h-10 w-16 items-center justify-center rounded-lg ${
                      selectedSize === size
                        ? "bg-orange-500 text-white"
                        : "border border-gray-200 bg-white text-gray-700"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <h2 className="mb-2 text-sm text-gray-700">COLORS</h2>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`h-12 w-12 rounded-lg border ${
                      selectedColor === color.name
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

       
      </section>
      
       <div className="w-full rounded-2xl bg-white p-4 shadow-lg mt-7">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Additional Information
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {information.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index !== information.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
              
                <div className="w-1/3 p-2 border-r border-gray-200">
                  <p className="text-xs text-gray-600">{item.label}</p>
                </div>

                <div className="w-2/3 p-2">
                  <p className="text-xs text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}