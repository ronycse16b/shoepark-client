"use client";

import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import DashNavbar from "./dashboardNav/DashNavbar";
import Link from "next/link";
import Image from "next/image";

import { useGetAllOrdersQuery } from "@/redux/features/api/authApi";
import toast from "react-hot-toast";


export default function Dashboard({children}) {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle toggle button click
  const handleToggleClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { data, isLoading, refetch } = useGetAllOrdersQuery();

  

  return (
    <div className="min-h-screen bg-gray-100 scrollbar-hide ">
            <section
              className={`bg-[#233242] fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 glass rounded-xl transition-transform duration-300 xl:translate-x-0 ${
                mobileMenuOpen ? "" : "-translate-x-80"
              }`}
            >
              <div className="relative border-b border-black/20">
                <a className="flex items-center gap-4 py-6 px-8" href="#/">
                  <h6 className=" flex items-center antialiased tracking-normal font-sans font-bold text-sm lg:text-xl gap-2 uppercase  leading-relaxed text-white">
                    
                    <span className="font-bold text-primary">iconic</span>
                    <span>Leather BD</span>
                  </h6>
                </a>
              </div>
              <div className="m-4  ">
                <SideBar 
                  handleToggleClick={handleToggleClick}
                  setMobileMenuOpen={setMobileMenuOpen} data={data} isLoading={isLoading}
                />
              </div>
            </section>
            <div className="p-4 xl:ml-80">
              <DashNavbar
                handleToggleClick={handleToggleClick}
                setMobileMenuOpen={setMobileMenuOpen}
              />

              <div className="scrollbar-hide">
                <div>
                
                

                    {children}
                  
                 
                </div>
              </div>
              <div
                className="text-blue-gray-600 fixed bottom-0
        "
              >
                <footer className="py-2">
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
              </div>
            </div>
          </div>
  );
}
