"use client";
import React, { useState } from "react";
import Container from "../Container";
import Image from "next/image";
import Top from "./Top";
import Link from "next/link";
// Ensure you have this component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Top />
      <section className=" bg-white shadow  text-black flex flex-col sticky top-0 z-20 p-2 mb-1">
        <Container>
          <div className="flex justify-between items-center  ">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 lg:hidden" />
            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="md:flex flex-col md:flex-row md:items-center mb-4 ">
              <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 ">
                <a href="#" className="hover:underline">
                  Become a Seller
                </a>
                <a href="#" className="hover:underline">
                  Daraz Donates
                </a>
              </nav>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between  lg:gap-10 items-center">
            <div className="w-full md:w-1/12">
              <Link href="/">
                <Image
                  src="/brand_logo2.png"
                  alt="Logo"
                  width={70}
                  height={4}
                  className="mr-4 hidden lg:block"
                />
              </Link>
            </div>
            <div className="flex items-center w-full md:w-6/12 ">
              <input
                type="text"
                placeholder="Search in Shoe Park"
                className="p-2 rounded w-full border h-8 border-primary  text-black placeholder-gray-400"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="flex justify-end items-center space-x-6">
                <a href="#" className="hover:underline">
                  Login
                </a>
                <a href="#" className="hover:underline">
                  Sign Up
                </a>
                <a href="#" className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 3a1 1 0 000 2h2l3.6 7.59-1.35 2.44A1 1 0 008 17h7a1 1 0 100-2H8.42l1.1-2h5.25a1 1 0 00.97-.76l1.38-6A1 1 0 0016.1 4H5.21l-.94-2H3zM5 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Header;
