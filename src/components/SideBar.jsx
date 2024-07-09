"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";

export default function SideBar({
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoading,
  data,
}) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const signOutHandler = async () => {
    dispatch(logout());
    toast.success("Logout Successfully");

    // Redirect to login page after logout
    router.push("/login");       
  };

  const homeIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7m-9 9v-4a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6"
      />
    </svg>
  );

  const bannerIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const productIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  const manageIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  const ordersIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m-9 5a9 9 0 1118 0 9 9 0 01-18 0z"
      />
    </svg>
  );

  const logoutIcon = (
    <svg
      className="h-5 w-5 mr-2 inline-block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v8"
      />
    </svg>
  );

  return (

    <>
    {
      userInfo?.role === 'admin' ? <ul className="max-w-xs w-full space-y-3 relative">
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard"
        className="w-full"
      >
        <li
          className={`h-fit rounded-md px-3 py-2 mb-3 ${
            pathname === "/dashboard" ? "bg-primary" : "bg-[#1f2d3b]"
          } text-white `}
        >
          {homeIcon}
          Home
        </li>
      </Link>
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard/add-banner"
        className="w-full"
      >
        <li
          className={`h-fit rounded-md px-3 py-2 mb-3 ${
            pathname === "/dashboard/add-banner"
              ? "bg-primary"
              : "hover:bg-primary"
          } transition delay-200 text-white `}
        >
          {bannerIcon}
          Manage Banners
        </li>
      </Link>
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard/add-product"
        className="w-full"
      >
        <li
          className={`h-fit rounded-md px-3 py-2 mb-3 ${
            pathname === "/dashboard/add-product"
              ? "bg-primary"
              : "hover:bg-primary"
          } transition delay-200 text-white `}
        >
          {productIcon}
          Add Product
        </li>
      </Link>
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard/products-management"
        className="w-full"
      >
        <li
          className={`h-fit rounded-md px-3 py-2 mb-3 ${
            pathname === "/dashboard/products-management"
              ? "bg-primary  text-white"
              : "hover:bg-primary text-white"
          } `}
        >
          {manageIcon}
          Products Management
        </li>
      </Link>
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard/orders-management"
        className="w-full "
      >
        <li
          className={`h-fit border mb-5 border-primary rounded-md px-3 py-2 relative  ${
            pathname === "/dashboard/orders-management"
              ? "bg-primary text-white"
              : "hover:bg-primary text-white"
          } `}
        >
          {ordersIcon}
          Orders Management
          <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">
            {
              data?.orders.filter((item) => item.status === "Processing")
                ?.length
            }
          </span>
        </li>
      </Link>

      <li className="h-fit rounded-md px-3 py-4 mb-3 border mt-5 flex justify-between items-center text-white ">
        <Link
          onClick={() => setMobileMenuOpen(false)}
          href="/dashboard/profile"
        >
          <h1>
            <p className="underline cursor-pointer">{userInfo?.name}</p>
            <span className="text-xs">({userInfo?.role})</span>
          </h1>
        </Link>
        <img src={userInfo?.image} className="w-12 h-12 rounded-full border" />
      </li>

      <li
        onClick={signOutHandler}
        className="w-full h-fit rounded-md cursor-pointer px-3 py-2 mb-3 bg-rose-600 text-white "
      >
        {logoutIcon}
        Logout
      </li>
    </ul> : 
    
    <ul className="max-w-xs w-full space-y-3 relative">
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard"
        className="w-full"
      >
        <li
          className={`h-fit rounded-md px-3 py-2 mb-3 ${
            pathname === "/dashboard" ? "bg-primary" : "bg-[#1f2d3b]"
          } text-white `}
        >
          {homeIcon}
          Home
        </li>
      </Link>
     
      <Link
        onClick={() => setMobileMenuOpen(false)}
        href="/dashboard/orders-management"
        className="w-full "
      >
        <li
          className={`h-fit border mb-5 border-primary rounded-md px-3 py-2 relative  ${
            pathname === "/dashboard/orders-management"
              ? "bg-primary text-white"
              : "hover:bg-primary text-white"
          } `}
        >
          {ordersIcon}
          Orders Management
          <span className="absolute -right-2 -top-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-red-500 text-center text-[12px] text-white ">
            {
              data?.orders.filter((item) => item.status === "Processing")
                ?.length
            }
          </span>
        </li>
      </Link>

      <li className="h-fit rounded-md px-3 py-4 mb-3 border mt-5 flex justify-between items-center text-white ">
        <Link
          onClick={() => setMobileMenuOpen(false)}
          href="/dashboard/profile"
        >
          <h1>
            <p className="underline cursor-pointer">{userInfo?.name}</p>
            <span className="text-xs">({userInfo?.role})</span>
          </h1>
        </Link>
        <img src={userInfo?.image} className="w-12 h-12 rounded-full border" />
      </li>

      <li
        onClick={signOutHandler}
        className="w-full h-fit rounded-md cursor-pointer px-3 py-2 mb-3 bg-rose-600 text-white "
      >
        {logoutIcon}
        Logout
      </li>
    </ul>
    }
    </>
   
  );
}
