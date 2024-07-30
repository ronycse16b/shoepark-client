"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function DashNavbar({ handleToggleClick, setMobileMenuOpen }) {
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dropDownRef = useRef(null);

  return (
    <div className="navbar bg-white items-center  sticky top-0 px-4 py-4 flex justify-between  z-40  ">
      <div className="">
        <button
          onClick={() => handleToggleClick(() => setMobileMenuOpen(true))}
          className="p-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-current dark:text-gray-100"
          >
            <rect width="352" height="32" x="80" y="96"></rect>
            <rect width="352" height="32" x="80" y="240"></rect>
            <rect width="352" height="32" x="80" y="384"></rect>
          </svg>
        </button>
      </div>

      <div className="">
        <div className="lg:flex items-center ">
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
                className="rounded-full bg-gray-300 object-cover border duration-500 hover:scale-105 hover:opacity-80 cursor-pointer"
                src={userInfo?.image}
                alt="User Avatar"
              />
              <div className="text-left">
                <span className="block text-sm font-medium text-gray-800">
                  {userInfo?.name}
                </span>
                <span className="block text-xs font-medium text-gray-500">
                  {userInfo?.email}
                </span>
              </div>
              <div className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
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
              } absolute right-0 top-14 z-50 min-w-60 rounded-sm bg-white shadow-lg border border-gray-200`}
            >
              <li className="border-b border-gray-200 p-4 bg-primary text-white">
                <div className="flex items-center space-x-2">
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full bg-gray-300 object-cover"
                    src={userInfo?.image}
                    alt="User Avatar"
                  />
                  <div>
                    <span className="block text-sm font-medium">
                      {userInfo?.name}
                    </span>
                    <span className="block text-xs font-medium">
                      {userInfo?.email}
                    </span>
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <Link
                  href="/dashboard/my-details"
                  className="flex items-center space-x-2 text-gray-800"
                >
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
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  <span>My Details</span>
                </Link>
              </li>

              <li className="p-4 hover:bg-gray-100">
                <Link
                  href="/dashboard/emails"
                  className="flex items-center space-x-2 text-gray-800"
                >
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
                      d="M16 11V7a1 1 0 00-1-1H9a1 1 0 00-1 1v4m4 5v-5m0 5V7m0 0L7.5 9m5-2 4.5 2"
                    />
                  </svg>
                  <span>My Emails</span>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <Link
                  href="/dashboard/change-password"
                  className="flex items-center space-x-2 text-gray-800"
                >
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
                      d="M12 15v-3m0-4h0m-2 4h4"
                    />
                  </svg>
                  <span>Change Password</span>
                </Link>
              </li>

              <li className="p-4 border-t border-gray-200 hover:bg-gray-100">
                <Link
                  href="/logout"
                  className="flex items-center space-x-2 text-gray-800"
                >
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
                      d="M15 12H3m6-6-6 6 6 6"
                    />
                  </svg>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
