"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./sidebar.css"; // Import the CSS for transitions

// Define SVG icons as separate components
const Icon = ({ children }) => (
  <svg
    className="h-5 w-5 mr-2 inline-block"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

const HomeIcon = (
  <Icon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7m-9 9v-4a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6"
    />
  </Icon>
);

const DownArrowIcon = (
  <Icon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </Icon>
);

const RightArrowIcon = (
  <Icon>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </Icon>
);

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
  const [showCategorySubmenu, setShowCategorySubmenu] = useState(false);
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);

  const menuItems = [{ href: "/dashboard", icon: HomeIcon, label: "Home" }];

  return (
    <ul className="max-w-xs w-full space-y-3 relative">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          onClick={() => setMobileMenuOpen(false)}
          href={item.href}
          className="w-full"
        >
          <li
            className={`h-fit rounded-md px-3 py-2 mb-2 ${
              pathname === item.href
                ? "bg-primary text-white"
                : "hover:bg-primary text-white"
            } transition delay-200`}
          >
            {item.icon}
            {item.label}
          </li>
        </Link>
      ))}
      {userInfo?.role === "admin" && (
        <>
          <li
            onClick={() => setShowProductSubmenu(!showProductSubmenu)}
            className={`h-fit rounded-md px-3 py-2 mb-5 cursor-pointer  transition delay-200 text-white flex justify-between items-center`}
          >
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              Products
            </p>
            {showProductSubmenu ? DownArrowIcon : RightArrowIcon}
          </li>
          <CSSTransition
            in={showProductSubmenu}
            timeout={300}
            classNames="submenu"
            unmountOnExit
          >
            <ul className="pl-6 text-sm">
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/add-product"
                className="w-full"
              >
                <li
                  className={`h-fit rounded-md px-3 py-2 mb-2 ${
                    pathname === "/dashboard/add-product"
                      ? "bg-primary"
                      : "hover:bg-primary"
                  } transition delay-200 text-white`}
                >
                  {/* {ProductIcon} */}
                  Add Products
                </li>
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/products-management"
                className="w-full"
              >
                <li
                  className={`h-fit rounded-md px-3 py-2 mb-2 ${
                    pathname === "/dashboard/products-management"
                      ? "bg-primary"
                      : "hover:bg-primary"
                  } transition delay-200 text-white`}
                >
                  {/* {OrderIcon} */}
                  All Products
                </li>
              </Link>
            </ul>
          </CSSTransition>

          <li
            onClick={() => setShowCategorySubmenu(!showCategorySubmenu)}
            className={`h-fit rounded-md px-3 py-2 mb-5 cursor-pointer  transition delay-200 text-white flex justify-between items-center`}
          >
            {/* {CategoryIcon} */}
            <p className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              Manage Categories
            </p>

            {showCategorySubmenu ? DownArrowIcon : RightArrowIcon}
          </li>
          <CSSTransition
            in={showCategorySubmenu}
            timeout={300}
            classNames="submenu"
            unmountOnExit
          >
            <ul className="pl-6 text-sm">
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/categories-add-category"
                className="w-full"
              >
                <li
                  className={`h-fit rounded-md px-3 py-2 mb-2 ${
                    pathname === "/dashboard/categories-add-category"
                      ? "bg-primary"
                      : "hover:bg-primary"
                  } transition delay-200 text-white`}
                >
                  {/* {CategoryIcon} */}
                  Category
                </li>
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/categories-sub-category"
                className="w-full"
              >
                <li
                  className={`h-fit rounded-md px-3 py-2 mb-2 ${
                    pathname === "/dashboard/categories-sub-category"
                      ? "bg-primary"
                      : "hover:bg-primary"
                  } transition delay-200 text-white`}
                >
                  {/* {SubCategoryIcon} */}
                  Sub Category
                </li>
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/categories-child-category"
                className="w-full"
              >
                <li
                  className={`h-fit rounded-md px-3 py-2 mb-2 ${
                    pathname === "/dashboard/categories-child-category"
                      ? "bg-primary"
                      : "hover:bg-primary"
                  } transition delay-200 text-white`}
                >
                  {/* {ChildCategoryIcon} */}
                  Child Category
                </li>
              </Link>
            </ul>
          </CSSTransition>

          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/dashboard/orders-management"
            className="w-full "
          >
            <li
              className={`h-fit rounded-md flex items-center gap-2 px-3 py-2 my-3 ${
                pathname === "/dashboard/orders-management"
                  ? "bg-primary"
                  : "hover:bg-primary"
              } transition delay-200 text-white `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
              </svg>
              Manage Orders
            </li>
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/dashboard/add-banner"
            className="w-full"
          >
            <li
              className={`h-fit rounded-md flex gap-2 items-center px-3 py-2 mb-2 ${
                pathname === "/dashboard/add-banner"
                  ? "bg-primary"
                  : "hover:bg-primary"
              } transition delay-200 text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Manage Banners
            </li>
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/dashboard/flash-sale"
            className="w-full"
          >
            <li
              className={`h-fit rounded-md flex gap-2 items-center px-3 py-2 mb-2 ${
                pathname === "/dashboard/flash-sale"
                  ? "bg-primary"
                  : "hover:bg-primary"
              } transition delay-200 text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
              Flash Sale Option
            </li>
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/dashboard/reviews-management"
            className="w-full"
          >
            <li
              className={`h-fit rounded-md flex items-center gap-2 px-3 py-2 mb-2 ${
                pathname === "/dashboard/reviews-management"
                  ? "bg-primary"
                  : "hover:bg-primary"
              } transition delay-200 text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              Review Manage Option 
            </li>
          </Link>
        </>
      )}
    </ul>
  );
}
