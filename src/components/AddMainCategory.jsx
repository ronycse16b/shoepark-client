"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddMainCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [singleCategory, setSingleCategory] = useState(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'




  useEffect(() => {
    getCategories();
  }, []);


  useEffect(() => {
    if (selectedCategoryId) {
      getSingleCategory();
    }
  }, [selectedCategoryId]);




  const getCategories = async () => {
    try {

      setLoading(true); 

      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories`
      );
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
      // setError(error?.message || "Failed to fetch categories.");
    }finally{
      setLoading(false);
    }

  };

  const getSingleCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories-single/${selectedCategoryId}`
      );
      setSingleCategory(response.data?.singleCategory);
    } catch (error) {
      console.error(error);
      
    }
  };

  const addCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = newCategory;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const api = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (api.status === 201) {
        toast.success("Category has been created");
        getCategories();
        // setNewCategory({ name: "", parentId: null });
        setSelectedCategoryId(null);
        setImage(null);
        setPreviewUrl(null);
        setError(null);
        setOpenModal(false);
        const imageValue =   document.getElementById("image").value;
        if (imageValue) {
          document.getElementById("image").value = '';
        }
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };


  const updateCategoryHandler = async (event) => {
    event.preventDefault();
    const { name } = singleCategory;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      // formData.append("parentId", parentId ? parentId.toString() : "");
      if (image) formData.append("image", image);

      const api = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories/${selectedCategoryId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (api.status === 201) {
        toast.success("Category has been Updated");
        getCategories();
        setNewCategory({ name: "", parentId: null });
        setSelectedCategoryId(null);
        setImage(null);
        setPreviewUrl(null);

      const imageValue =   document.getElementById("image").value;
      if (imageValue) {
        document.getElementById("image").value = '';
      }
        setError(null);
        setOpenModal(false);
      }
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };


  const handleChange = async (id) => {
    
      try {
        await axiosInstance.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories-isActive/${id}`
        );
        toast.success("Category Status Successfully");
        getCategories(); // Refresh categories
      } catch (error) {
        console.error(error);
        toast.error("Failed to status category");
      }
    
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setSingleCategory((prev) => ({ ...prev, [name]: value }));
    setNewCategory((prev) => ({ ...prev, [name]: value }));

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);

  const filteredCategories = categories.filter((category) =>
    category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="">
      <div className="p-4 bg-white mt-10 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-gray-700  text-2xl">Manage Main Categories</h1>
          <button
            onClick={() => {
              setOpenModal(true);
              setModalType("add");
            }}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Add Category
          </button>
        </div>
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
            <thead className="  bg-primary text-white shadow   mb-4">
              <tr>
                <th className="w-16 py-2 px-2 text-left border-r border-white">SL</th>
                <th className="py-2 px-2 text-left border-r border-white">Category Name</th>
                <th className="py-2 px-2 text-left border-r border-white">Action</th>
              </tr>
            </thead>
            {
              loading && 'Loading...'
            }
            <tbody>
              {filteredCategories
                .slice(0, entriesToShow)
                .map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-1 px-4 border-r  ">{index + 1}</td>
                    <td className={`py-1 px-4 border-r ${category?.isActive === false && 'text-red-600 font-bold'}`}>{category?.name}</td>
                    <td className="py-1 px-4    flex">
                      <button
                        onClick={() => {
                          setSelectedCategoryId(category?._id);
                          setOpenModal(true);
                          setModalType("edit");
                        }}
                        className="text-blue-500 border border-blue-600 font-bold px-2 py-0.5 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button onClick={()=>handleChange(category?._id)} className="border border-red-500 text-red-500  rounded">
                        
                        {category?.isActive ? <span className="bg-green-600 text-white px-2 py-0.5">Deactivate</span> : <span className="bg-red-600 text-white px-2 py-0.5">Active</span>   }
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>
            Showing 1 to {Math.min(entriesToShow, filteredCategories.length)} of{" "}
            {filteredCategories.length} entries
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
            {modalType === "add" && (
              <div className="">
                <h1 className="mb-2 text-md p-4 text-gray-700 bg-slate-200 font-semibold">
                  Create Category
                </h1>
                <div className="">
                  <form
                    onSubmit={addCategoryHandler}
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
                        required
                      />
                      <input
                        className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        accept="image"
                        required
                      />
                    </div>

                    {previewUrl && (
                      <div className="mt-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-20 w-20 object-cover"
                        />
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => {
                            setImage(null);
                            setPreviewUrl(null);
                            document.getElementById("image").value = "";
                            
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}

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
                          document.getElementById("image").value = "";
                          setNewCategory({
                            name: "",
                            
                          })
                          setPreviewUrl(null)
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
                        <input
                          className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                          type="file"
                          id="image"
                          onChange={handleImageChange}
                        />
                      </div>

                      {previewUrl ? (
                        <>
                          {previewUrl && (
                            <div className="mt-2">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-20 w-20 object-cover"
                              />
                              <button
                                type="button"
                                className="text-red-500"
                                onClick={() => {
                                  setImage(null);
                                  setPreviewUrl(null);
                                  document.getElementById("image").value = "";
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <img
                          src={singleCategory?.image}
                          className="w-10 h-10 object-cover "
                        />
                      )}

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
                            setImage(null);
                            setPreviewUrl(null);
                            document.getElementById("image").value = "";
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

export default AddMainCategory;
