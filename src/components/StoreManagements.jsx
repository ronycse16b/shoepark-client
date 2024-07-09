"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from 'next/navigation';
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useSelector } from "react-redux";

const StoreManagements = ({ productsData, currentPage, totalPages, total }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }

  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleDelete = (itemId) => {
    setItemToDelete(itemId);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setLoading(true);
      const res = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/product-delete/${itemToDelete}`);
      if (res.status === 200) {
        setDeleteSuccess(true);
        setLoading(false);
        setTimeout(() => setDeleteSuccess(false), 5000);
        setOpenModal(false);
        setItemToDelete(null);
        router.refresh();
      }
    } catch (error) {
      toast.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setItemToDelete(null);
  };

  const filteredData = productsData?.products?.filter(item => item.sku.includes(searchTerm));

  return (
    <div className="mt-5">
      <h1 className="text-gray-700 my-5 lg:text-xl">Products Management</h1>
      <div className="flex lg:flex-row flex-col justify-start items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 w-1/4 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {deleteSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Item deleted successfully.
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th className="w-16 p-2 text-left">#</th>
              <th className="w-16 p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Brand</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2"><img src={item?.images[0]} className="w-20 h-12 rounded-full" alt="" /></td>
                <td className="p-2">{item?.productName}</td>
                <td className="p-2">{item?.sku}</td>
                <td className="p-2">{item?.brand}</td>
                <td className="p-2">{item?.qty}</td>
                <td className="p-2">{item?.discount}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <Link href={`/dashboard/product-update/${item._id}`} className="bg-gray-600 hover:bg-red-300 text-white px-2 py-1 rounded">Edit</Link>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-600 hover:bg-red-300 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span>Showing 1 to {filteredData?.length} of {total} entries</span>
        <div>
          <button className="border border-gray-300 px-3 py-1 rounded-md">Previous</button>
          <button className="ml-2 border border-gray-300 px-3 py-1 rounded-md">Next</button>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
          <div onClick={(e) => e.stopPropagation()} className={`text- absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
            <div className="bg-white p-2 rounded">
              <h1 className="mb-2 text-2xl font-semibold">Confirm Delete</h1>
              <p className="mb-5 text-sm text-gray-700">Are you sure you want to delete this item? This action is permanent and cannot be undone.</p>
              <div className="flex justify-between">
                <button disabled={loading} onClick={confirmDelete} className="me-2 rounded-md bg-red-600 hover:bg-red-700 text-white px-6 py-2">
                  {loading ? 'Deleting...' : 'Yes, delete'}
                </button>
                <button onClick={handleCloseModal} className="rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagements;
