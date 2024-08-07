"use client";

import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const StoreManagements = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function fetchProducts(page, limit, tab, search) {
    const res = await fetch(
      `${backendUrl}/api/data/products?page=${page}&limit=${limit}&status=${tab}&search=${search}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  }

  const [productsData, setProductsData] = useState({ products: [], total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [showRow, setShowRow] = useState(5); // Set the number of products per page
  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts(
          currentPage,
          showRow,
          activeTab,
          searchTerm
        );
        setProductsData(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, showRow, activeTab, searchTerm]);

  const handleDelete = (itemId) => {
    setItemToDelete(itemId);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setLoading(true);
      const res = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/product-delete/${itemToDelete}`
      );
      if (res.status === 200) {
        setDeleteSuccess(true);
        setLoading(false);
        setTimeout(() => setDeleteSuccess(false), 5000);
        setOpenModal(false);
        setItemToDelete(null);
        const data = await fetchProducts(
          currentPage,
          showRow,
          activeTab,
          searchTerm
        );
        setProductsData(data);
      }
    } catch (error) {
      toast.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  const handleChange = async (id) => {
    try {
      await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/product-isActive/${id}`
      );
      toast.success("Products Status Successfully");
      const data = await fetchProducts(
        currentPage,
        showRow,
        activeTab,
        searchTerm
      );
      setProductsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFlash = async (id) => {
    try {
      await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/product-add-flash/${id}`
      );
      toast.success("Product Flash Successfully");
      const data = await fetchProducts(
        currentPage,
        showRow,
        activeTab,
        searchTerm
      );
      setProductsData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNewArrival = async (id) => {
    try {
      await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/product-add-new-arrival/${id}`
      );
      toast.success("Product has New Arrival Successfully");
      const data = await fetchProducts(
        currentPage,
        showRow,
        activeTab,
        searchTerm
      );
      setProductsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setItemToDelete(null);
  };

  const totalPages = Math.ceil(productsData.total / showRow);

  const handlePageClick = (pageNumber) => {
    // Implement your logic to handle page click
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <div className="sm:p-7 border border-gray-300 rounded-lg bg-gray-50 my-10">
      <h1 className=" lg:text-xl  text-white px-5 bg-sky-700 py-3 mb-4 ">
        Manage Products
      </h1>
      <div className="flex lg:flex-row flex-col justify-end items-center mb-4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </Link>
        </div>
      </div>
      {deleteSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Item deleted successfully.
        </div>
      )}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="flex overflow-x-auto">
          {[
            "all",
            "active",
            "inactive",
            "outofstock",
            "flashsale",
            "newarrival",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 relative border-r ${
                activeTab === tab
                  ? "bg-gray-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() +
                tab.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
              {/* <span className="absolute text-sm top-0 right-0 bg-rose-600 rounded-full w-5  text-gray-100">{tab === 'inactive'  && `${productsData?.products?.length || 0}`}</span> */}
              <span className="absolute text-sm top-0 right-0 bg-rose-600 rounded-full w-5  text-gray-100">
                {tab === "all" && `${productsData?.total || 0}`}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-gray-600 flex items-center p-[1px] w-full lg:w-1/5 ">
          <label className="text-white px-2" htmlFor="">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products"
            className="border border-gray-300 w-full outline-none  p-1 mb-2 lg:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading && <span className="text-red-600 font-bold">Loading...</span>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="w-16 p-2 text-left border-r border-gray-400">#</th>
              <th className="w-16 p-2 text-left border-r border-gray-400">
                Image
              </th>
              <th className="p-2 text-left border-r border-gray-400">Name</th>
              <th className="p-2 text-left border-r border-gray-400">Brand</th>
              <th className="p-2 text-left border-r border-gray-400">
                Description
              </th>
              <th className="p-2 text-left border-r border-gray-400">
                Features
              </th>
              <th className="p-2 text-left border-r border-gray-400">Colors</th>
              <th className="p-2 text-left border-r border-gray-400">Video</th>
              <th className="p-2 text-left border-r border-gray-400">
                Stock Status
              </th>
              <th className="p-2 text-center border-r border-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {productsData?.products?.map((item, index) => {
              // Determine the stock status color
              const stockQuantity = item?.sizes.reduce(
                (acc, variant) => acc + variant.quantity,
                0
              );
              const stockColor =
                stockQuantity > 10
                  ? "bg-green-500 text-white"
                  : stockQuantity > 0
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500 text-white";

              return (
                <React.Fragment key={item._id}>
                  <tr className="border border-gray-300 hover:bg-gray-100">
                    <td className="p-2 border-r border-gray-400">
                      {index + 1}
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      <img
                        src={item?.images[0]}
                        className="w-16 h-8 object-cover"
                        alt={item?.productName}
                      />
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      {item?.productName?.length > 20
                        ? `${item?.productName.slice(0, 20)}...`
                        : item?.productName}
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      {item?.brand}
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.description?.length > 20
                              ? `${item?.description.slice(0, 20)}...`
                              : item?.description,
                        }}
                      />
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.features?.length > 20
                              ? `${item?.features.slice(0, 20)}...`
                              : item?.features,
                        }}
                      />
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      {item?.colors.join(", ")}
                    </td>
                    <td className="p-2 border-r border-gray-400">
                      <a
                        href={item?.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Watch Video
                      </a>
                    </td>
                    <td
                      className={`p-2 border-r border-gray-400 ${stockColor}`}
                    >
                      {stockQuantity > 10
                        ? "In Stock"
                        : stockQuantity > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </td>
                    <td className="p-2 border-r border-gray-400 text-center flex  justify-center">
                      <Link
                        href={`/dashboard/product-update/${item?._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 "
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleChange(item?._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 "
                      >
                        {item?.isActive ? "Inactive" : "Active"}
                      </button>
                      <button
                        onClick={() => handleAddFlash(item?._id)}
                        className="bg-primary hover:bg-primary text-white px-2 py-1 "
                      >
                        {item?.flashSale ? (
                          <span className="animate-pulse">Flashed</span>
                        ) : (
                          "Add Flash"
                        )}
                      </button>

                      <button
                        onClick={() => handleNewArrival(item?._id)}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 "
                      >
                        {item?.newArrival ? (
                          <span className="animate-pulse">Arrived</span>
                        ) : (
                          " New Arrival"
                        )}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="12">
                      <div className="overflow-x-auto text-center">
                        <table className="w-full border border-gray-300">
                          <thead className="bg-gray-100 text-sm">
                            <tr>
                              <th className="px-2 border border-gray-400">
                                Size
                              </th>
                              <th className="px-2 border border-gray-400">
                                Price
                              </th>
                              <th className="px-2 border border-gray-400">
                                Discount
                              </th>
                              <th className="px-2 border border-gray-400">
                                Stock
                              </th>
                              <th className="px-2 border border-gray-400">
                                SKU
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item?.sizes?.length ? (
                              <>
                                {item?.sizes.map((variant) => (
                                  <tr key={variant?._id}>
                                    <td className="p-2 border border-gray-400">
                                      {variant?.size}
                                    </td>
                                    <td className="p-2 border border-gray-400">
                                      {variant?.price}
                                    </td>
                                    <td className="p-2 border border-gray-400">
                                      {variant?.discount}
                                    </td>
                                    <td className="p-2 border border-gray-400">
                                      {variant?.quantity}
                                    </td>
                                    <td className="p-2 border border-gray-400">
                                      {variant?.sku}
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <tr>
                                <td colSpan="5" className="p-2">
                                  No data found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {productsData?.products?.length === 0 && (
          <span className="text-red-600 font-bold">No Data Found</span>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="">
            Showing{" "}
            {productsData?.products?.length
              ? `1 to ${productsData?.products?.length}`
              : "0"}{" "}
            of {productsData?.total} Entries
          </span>
          <div className="flex items-center ">
            <label className="mr-2 text-gray-700">Row:</label>
            <select
              value={showRow}
              onChange={(e) => setShowRow(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
            className="border border-gray-300 bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-gray-800 text-white"
                    : "border border-gray-300 bg-gray-700 text-white"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
            className="border border-gray-300 bg-gray-700 text-white px-3 py-1 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
      <div
      
        className={`fixed z-[100] w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          
          className={`absolute max-w-md rounded-lg bg-white text-center p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
            openModal
              ? "opacity-1 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          <h1 className="mb-2 text-2xl font-semibold">
            Are You Sure You Want to Delete?
          </h1>
          <p className="mb-5 text-sm text-gray-600">
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagements;
