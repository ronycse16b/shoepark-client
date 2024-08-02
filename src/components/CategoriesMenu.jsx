"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

export default function CategoriesMenu() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childCategories, setChildCategories] = useState({});
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllParentCategories();
  }, []);

  const getAllParentCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories`
      );
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
    }
  };

  const getSubCategories = async (parentId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-by-parentId/${parentId}`
      );
      setSubcategories(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChildCategories = async (subcategoryId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/child-by-subcategoryId/${subcategoryId}`
      );
      setChildCategories((prev) => ({
        ...prev,
        [subcategoryId]: response.data?.data || [],
      }));
    } catch (error) {
      console.error("Error fetching child categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = async (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setSubcategories([]);
      setChildCategories({});
    } else {
      setActiveCategory(categoryId);
      await getSubCategories(categoryId);
    }
  };

  const toggleSubcategory = async (subcategoryId) => {
    if (activeSubcategory === subcategoryId) {
      setActiveSubcategory(null);
      setChildCategories((prev) => ({
        ...prev,
        [subcategoryId]: [],
      }));
    } else {
      setActiveSubcategory(subcategoryId);
      await getChildCategories(subcategoryId);
    }
  };

  return (
    <>
      <div className="bg-secondary shadow px-4 py-2 rounded-t-lg">
        <h2 className="text-md font-semibold text-white ">All Categories</h2>
      </div>
      <div className="w-full max-w-md rounded-b-lg bg-white p-4">
        {categories.map((cat) => (
          <div key={cat._id} className="border-b border-gray-300">
            <button
              onClick={() => toggleCategory(cat._id)}
              className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md"
            >
              <span>{cat.name}</span>
              <span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-300 ${
                    activeCategory === cat._id ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 10l5 5 5-5H5z" />
                </svg>
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeCategory === cat._id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <ul className="pl-4">
                {subcategories.map((subcat) => (
                  <li key={subcat?._id} className="border-b border-gray-300">
                    {subcat?.hasChildCategories ? (
                      <>
                        <button
                          onClick={() => toggleSubcategory(subcat?._id)}
                          className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          <span>{subcat?.name}</span>
                          <span>
                            <svg
                              className={`h-4 w-4 transform transition-transform duration-300 ${
                                activeSubcategory === subcat?._id
                                  ? "rotate-90"
                                  : ""
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5 10l5 5 5-5H5z" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            activeSubcategory === subcat?._id
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="pl-4">
                            {childCategories[subcat._id]?.map((childCat) => (
                              <li
                                key={childCat?._id}
                                className="py-1 text-sm text-gray-600"
                              >
                                {childCat?.hasChildCategories ? (
                                  <button
                                    onClick={() =>
                                      toggleSubcategory(childCat?._id)
                                    }
                                    className="w-full text-left"
                                  >
                                    {childCat?.name}
                                  </button>
                                ) : (
                                  <Link
                                    href={`/categories/slug?slug=${childCat?.slug}&&_id=${childCat?._id}`}
                                    className="hover:text-blue-500"
                                  >
                                    {childCat?.name}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                      href={`/categories/slug?slug=${subcat?.slug}&_id=${subcat?._id}`}
                        className="block w-full p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {subcat?.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
