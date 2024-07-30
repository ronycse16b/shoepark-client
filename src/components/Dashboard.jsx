"use client";

import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import DashNavbar from "./dashboardNav/DashNavbar";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useGetAllOrdersQuery } from "@/redux/features/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Dashboard({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle toggle button click
  const handleToggleClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { data, isLoading, refetch } = useGetAllOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role !== "admin") {
    redirect("/");
  }

  const pathName = usePathname();

  if (pathName === "/") {
    refetch();
  }

  return (
    <div className="min-h-screen bg-gray-100 scrollbar-hide ">
      <section
        className={`bg-[#233242] fixed inset-0 z-50  h-screen  lg:h-[calc(100vh-2px)] w-72 glass  transition-transform duration-300 xl:translate-x-0 ${
          mobileMenuOpen ? "" : "-translate-x-80"
        }`}
      >
        <div className="relative ">
          <Link className="flex items-end gap-2 py-6 px-8" href="/dashboard">
            {/* <Image
              src="/brand_logo2.png"
              width={50}
              height={40}
              alt="brand logo"
            /> */}
            <h1 className="text-white text-xl font-bold"> <span className="text-[#f69224]">Shoe</span>
            <span className="text-[#6fd300] mx-1">Park</span>BD</h1>
            <h1 className="text-white text-xl font-bold">Dashboard</h1>
          </Link>
        </div>
        <div className="m-4  ">
          <SideBar
            handleToggleClick={handleToggleClick}
            setMobileMenuOpen={setMobileMenuOpen}
            data={data}
            isLoading={isLoading}
          />
        </div>
      </section>
      <div className=" xl:ml-[290px]">
        <DashNavbar
          handleToggleClick={handleToggleClick}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="scrollbar-hide px-5">
          <div>{children}</div>
        </div>
        {/* <div
          className="text-blue-gray-600 fixed bottom-0
        "
        >
          <footer className="">
            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                © 2024, made with{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="-mt-0.5 inline-block h-3.5 w-3.5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>{" "}
                by{" "}
                <Link
                  href="https://www.facebook.com/refayet.rony"
                  target="_blank"
                  className="transition-colors text-blue-500 underline"
                >
                  Rony
                </Link>{" "}
                for a better web.{" "}
              </p>
            </div>
          </footer>
        </div> */}
      </div>
    </div>
  );
}
