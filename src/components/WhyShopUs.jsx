'use client'
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  RefreshIcon,
  TagIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import Container from "./Container";
import { useEffect, useState } from "react";

export default function WhyShopUs() {




  const [iconSlider, setIconSlider] = useState(0);
  const iconNextSlider = () => setIconSlider((iconSlider) => (iconSlider === 5 - 1 ? 0 : iconSlider + 1));

  useEffect(() => {
    const intervalId = setInterval(() => {
      iconNextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [iconSlider]);

  return (
    <>
     
      <div className="mt-8 lg:hidden overflow-hidden relative text-sm">
        <div
          className="ease-linear duration-300 flex transform-gpu"
          style={{ transform: `translateX(-${iconSlider * 100}%)` }}
        >
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <ShieldCheckIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">Cash on Delivery</p>
          </div>
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <TruckIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">All Bangladesh Delivery</p>
          </div>
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <RefreshIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">Easy Return &amp; Replace</p>
          </div>
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <TagIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">Best Price Guaranteed</p>
          </div>
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <CheckCircleIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">100% Genuine Product</p>
          </div>
          <div className="flex items-center bg-white shadow p-4 border border-white rounded min-w-full">
            <BadgeCheckIcon className="h-6 w-6 text-primary mr-2" />
            <p className="text-gray-700">Iconic Verified</p>
          </div>
        </div>
      </div>

      <div className="mt-8 hidden lg:flex lg:flex-row md:gap-2 lg:gap-5 md:text-xs lg:text-[14px]">
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <ShieldCheckIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">Cash on Delivery</p>
        </div>
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <TruckIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">All Bangladesh Delivery</p>
        </div>
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <RefreshIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">Easy Return &amp; Replace</p>
        </div>
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <TagIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">Best Price Guaranteed</p>
        </div>
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <CheckCircleIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">100% Genuine Product</p>
        </div>
        <div className="flex items-center bg-white shadow py-4 lg:px-3 md:px-1 border border-white rounded">
          <BadgeCheckIcon className="h-6 w-6 text-primary mr-1" />
          <p className="text-gray-700">Iconic Verified</p>
        </div>
      </div>
    </>
  );
}
