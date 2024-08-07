"use client";

import axiosInstance from "@/utils/axiosInstance";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddChildCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [singleCategory, setSingleCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    getSubCategories(parentId, parentCategory);
  }, [parentId, parentCategory]);

  useEffect(() => {
    getAllParentCategories();
  }, []);

  useEffect(() => {
    getAllChildCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      getSingleCategory();
    }
  }, [selectedCategoryId]);

  const getSubCategories = async (parentId, parentCategory) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-by-parentId/${
          parentId || parentCategory
        }`
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

  const getAllChildCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/child-categories`
      );

      setChildCategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories-single-child/${selectedCategoryId}`
      );
      setSingleCategory(response.data?.data);
      setParentCategory(response.data?.data.parentId?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const addChildCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = newCategory;
    setLoading(true);

    try {
      const api = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/add-child-category`,
        { name, parentId: parentId.toString(), subId: subId.toString() }
      );

      if (api.status === 201) {
        toast.success("child Category has been created");
        getSubCategories();
        getAllChildCategories();
        setNewCategory({
          name: "",
        });
        setParentId(null);
        setError(null);
        setOpenModal(false);
        setSubId(null);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = singleCategory;
    setIsLoading(true);
    try {
      const api = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/child-cat-update/${selectedCategoryId}`,
        {
          name,
          parentId: parentId || parentCategory,
          subId: subId || singleCategory?.subId?._id,
        }
      );

      if (api.status === 201) {
        toast.success("Child Category has been Updated");
        getSubCategories();
        getAllChildCategories();
        setNewCategory({
          name: "",
        });
        setSelectedCategoryId(null);
        setError(null);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    setDeleteIndex(index);
    try {
      await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/child-cat-delete/${id}`
      );
      toast.success("Category Deleted Successfully");
      getSubCategories(); // Refresh categories
      getAllChildCategories()
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

  const filteredCategories = childCategories?.filter((category) =>
    category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="">
      <div className="sm:p-7 border border-gray-300 rounded-lg bg-gray-50 my-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700  text-2xl">Manage Child Categories</h1>
          <button
            onClick={() => {
              setOpenModal(true);
              setModalType("addSubCategory");
            }}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Child Category
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
          <div className="flex items-center px-1 text-white  bg-gray-600 py-0.5  rounded">
            <label htmlFor="search" className="mr-2 px-2">
              Search:
            </label>
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
            <thead className="bg-gray-600 text-white shadow mb-4">
              <tr>
                <th className="w-16 py-2 px-2 text-lef  border-r border-white">
                  SL
                </th>
                <th className="py-2 px-2 text-left border-r border-white">
                  Child Category Name
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
                  <td className="py-1 px-4 border-r">{sub?.subId?.name}</td>
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

      <div className="mx-auto max-w-md">
        <div
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "visible opacity-100" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div
            className={`text- absolute min-w-[400px] rounded-lg bg-white drop-shadow-lg dark:bg-gray-800 dark:text-white ${
              openModal
                ? "scale-1 opacity-1 duration-300"
                : "scale-0 opacity-0 duration-150"
            }`}
          >
            {modalType === "addSubCategory" && (
              <div className="">
                <h1 className="mb-2 text-md p-4 text-white bg-primary font-semibold">
                  Create Child Category
                </h1>
                <div className="">
                  <form
                    onSubmit={addChildCategoryHandler}
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
                      <select
                        required
                        className="w-full py-2 border rounded px-2 mt-2"
                        onChange={(e) => setSubId(e.target.value)}
                        name=""
                        id=""
                      >
                        <option value="" selected>
                          {" "}
                          Select Sub Category
                        </option>
                        {subcategories?.map((c) => (
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
                  <h1 className="mb-2 text-md p-4 text-gray-50 bg-primary font-semibold">
                    Child Category Update
                  </h1>

                  <div className="">
                    <form
                      onSubmit={updateCategoryHandler}
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 "
                    >
                      <div className="mb-3">
                        <label htmlFor="name" className="text-xs">
                          Child Name
                        </label>

                        <input
                          className="border appearance-none mb-2  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                          name="name"
                          type="text"
                          placeholder="Enter category name"
                          value={`${
                            loading ? "Loading..." : singleCategory?.name
                          }`}
                          onChange={handleCategoryChange}
                          required
                        />
                        <label htmlFor="name" className="text-xs">
                          Parent Category
                        </label>
                        <select
                          required
                          className="w-full py-2 px-2 border rounded mb-2"
                          onChange={(e) => setParentId(e.target.value)}
                          name=""
                          id=""
                        >
                          {loading ? (
                            <option value="">Loading...</option>
                          ) : (
                            <>
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
                            </>
                          )}
                        </select>

                        <label htmlFor="name" className="text-xs">
                          Sub Category
                        </label>
                        <select
                          required
                          className="w-full py-2 px-2 border rounded "
                          onChange={(e) => setSubId(e.target.value)}
                          name=""
                          id=""
                        >
                          {loading ? (
                            <option value="">Loading...</option>
                          ) : (
                            <>
                              <option value="" selected>
                                {" "}
                                Select Sub Category
                              </option>
                              {subcategories?.map((c) => (
                                <option
                                  selected={
                                    c._id === singleCategory?.subId?._id
                                  }
                                  className=""
                                  key={c._id}
                                  value={c?._id}
                                >
                                  {c?.name}
                                </option>
                              ))}

                              {subcategories?.length === 0 && (
                                <option disabled value="">
                                  Sub Categories not found
                                </option>
                              )}
                            </>
                          )}
                        </select>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="bg-secondary shadow hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                          disabled={loading}
                        >
                          {isLoading ? "Updating..." : " Update"}
                        </button>
                        <button
                          type="reset"
                          onClick={() => {
                            setOpenModal(false);
                            setError(null);
                            setSubId(null);
                            setParentId(null);
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

export default AddChildCategory;
