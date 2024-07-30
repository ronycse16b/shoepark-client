"use client";

import axiosInstance from "@/utils/axiosInstance";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [singleCategory, setSingleCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'

  useEffect(() => {
    getSubCategories();
  }, []);

  useEffect(() => {
    getAllParentCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      getSingleCategory();
    }
  }, [selectedCategoryId, parentCategory]);

  const getSubCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-categories`
      );
      setSubcategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllParentCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories`
      );

      setCategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories-single-sub/${selectedCategoryId}`
      );
      setSingleCategory(response.data?.data);
      setParentCategory(response.data?.data.parentId);
    } catch (error) {
      console.error(error);
    }
  };

  const addSubCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = newCategory;
    setLoading(true);

    try {
      const api = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/add-sub-category`,
        { name, parentId: parentId.toString() }
      );

      if (api.status === 201) {
        toast.success("Sub Category has been created");
        getSubCategories();
        setNewCategory('');
        setParentId(null);
        setError(null);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = singleCategory;
    setLoading(true);
    try {
      const api = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-cat-update/${selectedCategoryId}`,
        { name, parentId }
      );

      if (api.status === 201) {
        toast.success("Category has been Updated");
        getSubCategories();
        setSingleCategory({ name: "", parentId: null });
        setSelectedCategoryId(null);
        setError(null);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    setDeleteIndex(index);
    try {
      await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-cat-delete/${id}`
      );
      toast.success("Category Status Successfully");
      getSubCategories(); // Refresh categories
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setDeleteIndex(null);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setSingleCategory((prev) => ({ ...prev, [name]: value }));
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);

  const filteredCategories = subcategories?.filter((category) =>
    category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="">
      <div className="p-4 bg-white mt-10 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700  text-2xl">Manage Sub Categories</h1>
          <button
            onClick={() => {
              setOpenModal(true);
              setModalType("addSubCategory");
            }}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Sub Category
          </button>
        </div>
        {loading && <span className="text-primary font-bold">Loading...</span>}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="entries" className="mr-2">
              Show
            </label>
            <select
              id="entries"
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          <div className="flex items-center px-1 text-white  bg-primary py-0.5  rounded">
            
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-2 py-1 text-gray-600 outline-none"
              placeholder="search here by name"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-primary text-white shadow mb-4">
              <tr>
                <th className="w-16 py-2 px-2 text-lef  border-r border-white">
                  SL
                </th>
               
                <th className="py-2 px-2 text-left border-r border-white">
                  Sub Category Name
                </th>
                <th className="py-2 px-2 text-left border-r border-white">
                  Category Name
                </th>
                <th className="py-2 px-2 text-left border-r border-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map((sub, index) => (
                <tr key={`${index}`} className="border-b">
                  <td className="py-1 px-4 border-r ">{index + 1}</td>
                  <td className="py-1 px-4 border-r">{sub?.name}</td>
                  <td className="py-1 px-4 border-r">{sub?.parentId?.name}</td>
                  <td className="py-1 px-4  flex">
                    <button
                      onClick={() => {
                        setSelectedCategoryId(sub?._id);
                        setOpenModal(true);
                        setModalType("edit");
                      }}
                      className="text-blue-500 border border-blue-600 font-bold px-2 py-0.5 rounded mr-2"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sub?._id, index)}
                      className="border  text-red-500  px-2 py-0.5 rounded"
                    >
                      {deleteIndex === index ? (
                        "Deleting..."
                      ) : (
                        <TrashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>
            Showing 1 to {Math.min(entriesToShow, filteredCategories?.length)}{" "}
            of {filteredCategories?.length} entries
          </span>
          <div className="flex items-center">
            <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">
              Previous
            </button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl">
        <div
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "visible opacity-100" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div
            className={`text- absolute min-w-[500px] rounded-lg bg-white drop-shadow-lg dark:bg-gray-800 dark:text-white ${
              openModal
                ? "scale-1 opacity-1 duration-300"
                : "scale-0 opacity-0 duration-150"
            }`}
          >
            {modalType === "addSubCategory" && (
              <div className="">
                <h1 className="mb-2 text-md p-4 text-white bg-primary font-semibold">
                  Create Sub Category
                </h1>
                <div className="">
                  <form
                    onSubmit={addSubCategoryHandler}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
                  >
                    <div className="mb-3">
                      <input
                        className="border appearance-none mb-2  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                        name="name"
                        type="text"
                        placeholder="Enter category name"
                        value={newCategory.name}
                        onChange={handleCategoryChange}
                        id="name"
                        required
                      />
                      <select
                        required
                        className="w-full py-2 border rounded px-2"
                        onChange={(e) => setParentId(e.target.value)}
                        name=""
                        id=""
                      >
                        <option value="" selected>
                          {" "}
                          Select Parent Category
                        </option>
                        {categories?.map((c) => (
                          <option className="" key={c._id} value={c?._id}>
                            {c?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="bg-secondary shadow hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : " Save Changes"}
                      </button>
                      <button
                        type="reset"
                        onClick={() => {
                          setOpenModal(false);
                          setNewCategory({
                            name: "",
                          });
                        }}
                        className="rounded-md border shadow border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs italic">{error}</p>
                    )}
                  </form>
                </div>
              </div>
            )}

            {modalType === "edit" && (
              <>
                <div className="">
                  <h1 className="mb-2 text-md p-4 text-gray-700 bg-slate-200 font-semibold">
                    Category Update
                  </h1>
                  <div className="">
                    <form
                      onSubmit={updateCategoryHandler}
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
                    >
                      <div className="mb-3">
                        <input
                          className="border appearance-none mb-2  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                          name="name"
                          type="text"
                          placeholder="Enter category name"
                          value={singleCategory?.name}
                          onChange={handleCategoryChange}
                          required
                        />
                        <select
                          required
                          className="w-full py-2 px-2 border rounded"
                          onChange={(e) => setParentId(e.target.value)}
                          name=""
                          id=""
                        >
                          <option disabled selected>
                            {" "}
                            Select Parent Category
                          </option>
                          {categories?.map((c) => (
                            <option
                              selected={c._id === parentCategory}
                              className=""
                              key={c._id}
                              value={c?._id}
                            >
                              {c?.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="bg-secondary shadow hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Updating..." : " Update"}
                        </button>
                        <button
                          type="reset"
                          onClick={() => {
                            setOpenModal(false);
                          }}
                          className="rounded-md border shadow border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      {error && (
                        <p className="text-red-500 text-xs italic">{error}</p>
                      )}
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSubCategory;
