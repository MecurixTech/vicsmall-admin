"use client";

import React, { useState, useEffect } from "react";
import { trendingProducts } from "../data/dummyData"; 

const TrendingCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingProducts.length);
        setFade(false);
      }, 500); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const currentData = trendingProducts[currentIndex];

  return (
    <div className="relative w-full max-w-[478px] h-[150px] sm:h-[180px] rounded-2xl overflow-hidden shadow-lg">
     
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
          fade ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        style={{ backgroundImage: `url(${currentData.image})` }}
      ></div>

     
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
        <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide">Trending now</h3>
        <div className="mt-auto">
          <p className="text-white font-medium text-md sm:text-lg">{currentData.title}</p>
          <p className="text-white text-sm sm:text-base opacity-90">{currentData.price}</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
