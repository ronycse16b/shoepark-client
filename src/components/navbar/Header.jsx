"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentialsStarted,
  setCredentialsCompleted,
  toggleLoading,
} from "@/redux/features/auth/authSlice";
import { useUserProfileQuery } from "@/redux/features/api/authApi";
import Container from "../Container";
import Image from "next/image";
import Top from "./Top";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
// Ensure you have this component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // profile
  const dropDownRef = useRef(null);
  const items = ["Profile", "Dashboard", "Settings", "Log Out"];

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  // user set creadtial

  const { userInfo, loading } = useAppSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const { data, isFetching } = useUserProfileQuery();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setToken(userToken);
    dispatch(setCredentialsStarted());

    if (data) {
      dispatch(setCredentialsCompleted(data));
    }
    if (!isFetching) {
      dispatch(toggleLoading());
    }
  }, [data, dispatch, isFetching]);

  const pathname = usePathname();

  return (
    <>
      <Top />

      <section className="bg-white shadow text-black flex flex-col sticky top-0 z-20 p-2 mb-1">
        <Container>
          <div className="flex justify- gap-3 items-center">
            <Image
              src="/brand_logo2.png"
              alt="Logo"
              width={40}
              height={20}
              className="mr-4  lg:hidden"
            />
            <div className="flex items-center  w-full lg:hidden  relative">
              <input
                type="text"
                placeholder="Search in Shoe Park"
                className="p-2 rounded w-full border h-8 text-black placeholder-gray-400 pr-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-2 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.287 4.286a1 1 0 01-1.414 1.415l-4.287-4.287zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

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
            <div className="md:flex flex-col md:flex-row md:items-center my-4">
              <nav className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="group flex cursor-pointer flex-col"
                >
                  <Link href="/login" scroll={false}>
                    Login
                  </Link>
                  <span
                    className={`mt-[2px] h-[3px] w-[0px] ${
                      pathname === "/login" ? "w-full" : ""
                    } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                  ></span>
                </li>
                <li
                  className="group flex cursor-pointer flex-col"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link href="/register" scroll={false}>
                    Sign up
                  </Link>
                  <span
                    className={`mt-[2px] h-[3px] w-[0px] ${
                      pathname === "/register" ? "w-full" : ""
                    } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                  ></span>
                </li>
                <li className="group flex cursor-pointer flex-col">
                  <Link href="/register" scroll={false}>
                    My Account
                  </Link>
                  <span
                    className={`mt-[2px] h-[3px] w-[0px] ${
                      pathname === "/products" ? "w-full" : ""
                    } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                  ></span>
                </li>
                <li className="group flex cursor-pointer flex-col">
                  <Link href="/register" scroll={false}>
                    Logout
                  </Link>
                  <span
                    className={`mt-[2px] h-[3px] w-[0px] ${
                      pathname === "/products" ? "w-full" : ""
                    } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                  ></span>
                </li>
              </nav>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
            <div className="w-full md:w-1/12">
              <Link href="/">
                <Image
                  src="/brand_logo2.png"
                  alt="Logo"
                  width={70}
                  height={40}
                  className="mr-4 hidden lg:block"
                />
              </Link>
            </div>
            <div className="lg:flex items-center hidden w-full md:w-6/12 relative">
              <input
                type="text"
                placeholder="Search in Shoe Park"
                className="p-2 rounded w-full border h-8 text-black placeholder-gray-400 pr-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-2 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.287 4.286a1 1 0 01-1.414 1.415l-4.287-4.287zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="w-full md:w-5/12 flex justify-end  items-center space-x-6">
              <li className="group flex cursor-pointer flex-col">
                <Link href="/" scroll={false}>
                  Home
                </Link>
                <span
                  className={`mt-[2px] h-[3px] w-[0px] ${
                    pathname === "/" ? "w-full" : ""
                  } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                ></span>
              </li>
              <li className="group flex cursor-pointer flex-col">
                <Link href="/products" scroll={false}>
                  Products
                </Link>
                <span
                  className={`mt-[2px] h-[3px] w-[0px] ${
                    pathname === "/products" ? "w-full" : ""
                  } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                ></span>
              </li>
              {loading ? (
                <span className="text-primary animate-pulse">...</span>
              ) : (
                <div className="lg:flex items-center hidden">
                  {userInfo && userInfo.email ? (
                    <div
                      ref={dropDownRef}
                      className="relative flex items-center mx-auto w-fit text-black"
                    >
                      <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          width={40}
                          height={40}
                          className="rounded-full bg-gray-300 object-cover border  duration-500 hover:scale-105 hover:opacity-80 cursor-pointer"
                          src={userInfo?.image}
                          alt="User Avatar"
                        />
                        <div className="text-left">
                          <span className="block text-sm font-medium">
                            Hello, {userInfo?.name}
                          </span>
                          <span className="block text-xs font-medium">
                            Orders & Account
                          </span>
                        </div>
                        <div className=" inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>
                      <ul
                        className={`${
                          open
                            ? "visible duration-300 opacity-100"
                            : "invisible opacity-0"
                        } absolute right-0 top-12 z-50 w-fit rounded-sm bg-gray-200 shadow-md`}
                      >
                        {items.map((item, idx) => (
                          <li
                            key={idx}
                            className={`rounded-sm px-6 py-2 ${
                              item === "Log Out"
                                ? "text-red-500 hover:bg-red-600 hover:text-white"
                                : "hover:bg-gray-300"
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-x-4 flex">
                      <li className="group flex cursor-pointer  flex-col">
                        <Link href="/login" scroll={false}>
                          Login
                        </Link>
                        <span
                          className={`mt-[2px] h-[3px] w-[0px] ${
                            pathname === "/login" ? "w-full" : ""
                          } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                        ></span>
                      </li>
                      <li className="group flex cursor-pointer flex-col">
                        <Link href="/register" scroll={false}>
                          Sign up
                        </Link>
                        <span
                          className={`mt-[2px] h-[3px] w-[0px] ${
                            pathname === "/products" ? "w-full" : ""
                          } rounded-full bg-primary transition-all duration-300 group-hover:w-full`}
                        ></span>
                      </li>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center relative mt-4 lg:mt-0">
                <a href="#" className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 3a1 1 0 000 2h2l3.6 7.59-1.35 2.44A1 1 0 008 17h7a1 1 0 100-2H8.42l1.1-2h5.25a1 1 0 00.97-.76l1.38-6A1 1 0 0016.1 4H5.21l-.94-2H3zM5 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
                <span className="absolute lg:-right-2 -top-2  inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  3
                </span>
              </div>
            </div>
          </div>
          <div className=" overflow-hidden bg-red-600 text-white font-bold py-2">
            <div className=" whitespace-nowrap animate-marquee">
              <span>
                আমাদের ওয়েবসাইটটি আপডেটের কাজ চলছে। সাময়িক অসুবিধার জন্য আমরা
                দুঃখিত। আপনারা আমাদের সাথে  ***01754493353 ***               <a
                  href="https://wa.me/01754493353"
                  className="text-yellow-300 underline ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp এ যোগাযোগ করতে পারেন ।
                </a>
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Header;
