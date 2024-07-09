"use client";

import { useState, useRef, useEffect } from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import { useUserProfileQuery } from "@/redux/features/api/authApi";
import { setCredentials, toggleLoading } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from 'next/navigation'

export const NavBar = () => {
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();
const dispatch = useAppDispatch(); // Using useDispatch instead of useAppDispatch
  const { userInfo, loading, error } = useAppSelector((state) => state.auth);

  const pathname = usePathname();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!dropDownMenuRef?.current?.contains(e?.target)) {
        setDropDownState(false);
      }
    };

    document.addEventListener("mousedown", closeDropDown);

    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  const MenuItems = (
    <>
      <li className="group flex cursor-pointer flex-col">
        <Link href="/" scroll={false}>
          Home
        </Link>
        <span className={`mt-[2px] h-[3px] w-[0px] ${pathname === '/' ? 'w-full' : ''} rounded-full bg-primary transition-all duration-300 group-hover:w-full`}></span>
      </li>
      <li className="group flex cursor-pointer flex-col">
        <Link href="/products" scroll={false}>
          Products
        </Link>
        <span className={`mt-[2px] h-[3px] w-[0px] ${pathname === '/products' ? 'w-full' : ''} rounded-full bg-primary transition-all duration-300 group-hover:w-full`}></span>
      </li>
      <li className="group flex cursor-pointer flex-col">
        <Link href="/about" scroll={false}>
          About
        </Link>
        <span className={`mt-[2px] h-[3px] w-[0px] ${pathname === '/about' ? 'w-full' : ''} rounded-full bg-primary transition-all duration-300 group-hover:w-full`}></span>
      </li>
      <li className="group flex cursor-pointer flex-col">
        <Link href="/contact" scroll={false}>
          Contact
        </Link>
        <span className={`mt-[2px] h-[3px] w-[0px] ${pathname === '/contact' ? 'w-full' : ''} rounded-full bg-primary transition-all duration-300 group-hover:w-full`}></span>
      </li>
      <li className="group flex cursor-pointer flex-col">
        <Link href="/order-tracking" scroll={false}>
          Order Tracking
        </Link>
        <span className={`mt-[2px] h-[3px] w-[0px] ${pathname === '/order-tracking' ? 'w-full' : ''} rounded-full bg-primary transition-all duration-300 group-hover:w-full`}></span>
      </li>

      <li className="group flex cursor-pointer flex-col">
        <Link href="/products" scroll={false}>
          <span className="bg-black px-2 py-2 rounded text-white shadow-md hover:bg-primary transition delay-100">
            Shop Now
          </span>
        </Link>
      </li>
    </>
  );

  return (
    <section className="bg-white text-black mb-1 mt-[2px] shadow sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between  py-0.5">
          <Link
            href="/"
            className="scale-100 cursor-pointer rounded-2xl px-2 py-2 flex items-center italic text-xl font-semibold text-black transition-all duration-200 hover:scale-110"
          >
            <Image src="/logo.png" width={40} height={10} alt="brand-logo" />
            <span className="font-bold">
              <span className="text-primary">iconic</span> Leather BD
            </span>
          </Link>
          <ul className="hidden items-center justify-between gap-10 md:flex">
            {MenuItems}
          </ul>
          <section
            ref={dropDownMenuRef}
            onClick={() => setDropDownState(!dropDownState)}
            className="relative flex transition-transform md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            {dropDownState && (
              <ul className="z-10 gap-2 py-5 bg-white px-5 transition-all delay-300 absolute right-0 top-16 flex w-[300px] flex-col rounded-lg text-base">
                {MenuItems}
              </ul>
            )}
          </section>
        </nav>
      </Container>
    </section>
  );
};
