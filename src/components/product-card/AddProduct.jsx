"use client";
import { useAddProductDataMutation } from "@/redux/features/api/authApi";
import axiosInstance from "@/utils/axiosInstance";
import { redirect, useRouter } from "next/navigation";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const { userInfo } = useSelector((state) => state.auth);

  const sizes = [39, 40, 41, 42, 43, 44];
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceAll, setPriceAll] = useState("");
  const [skuAll, setSkuAll] = useState("");
  const [stockAll, setStockAll] = useState("");
  const [discountPriceAll, setDiscountPriceAll] = useState("");
  const [sizeForm, setSizeForm] = useState({});


  const [parentId, setParentId] = useState(null);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllParentCategories();
  }, []);

  useEffect(() => {
    if (parentId) {
      getSubCategories(parentId);
      setChildCategories([]);
      setChildCategoryId(null);
    } else {
      setSubcategories([]);
      setSubcategoryId(null);
    }
  }, [parentId]);

  useEffect(() => {
    if (subcategoryId) {
      getChildCategories(subcategoryId);
    } else {
      setChildCategories([]);
      setChildCategoryId(null);
    }
  }, [subcategoryId]);

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

  const getSubCategories = async (parentId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/sub-by-parentId/${parentId}`
      );
      setSubcategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
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
      setChildCategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setParentId(selectedCategoryId);
    setSubcategoryId(null);
    setChildCategoryId(null);
    setFormData((prev) => ({ ...prev, categoryId: selectedCategoryId })); // Update formData with selected category
  };
  
  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = e.target.value;
    setSubcategoryId(selectedSubcategoryId);
    setChildCategoryId(null);
    setFormData((prev) => ({ ...prev, categoryId: selectedSubcategoryId })); // Update formData with selected subcategory
  };
  
  const handleChildCategoryChange = (e) => {
    const selectedChildCategoryId = e.target.value;
    setChildCategoryId(selectedChildCategoryId);
    setFormData((prev) => ({ ...prev, categoryId: selectedChildCategoryId })); // Update formData with selected child category
  };
  

  
  const handleSelectSize = (size) => {
    if (!selectedSizes.includes(size)) {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, size]);
      setSizeForm((prevSizeForm) => ({
        ...prevSizeForm,
        [size]: {
          size:size,  // Ensure the size field is included when a new size is selected
          price: "",
          quantity: "",
          discount: "",
          sku:"" ,
        },
      }));
    } else {
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((s) => s !== size)
      );
      setSizeForm((prevSizeForm) => {
        const { [size]: _, ...rest } = prevSizeForm;
        return rest;
      });
    }
  };
  

  const handleSizeChange = (size, field, value) => {
    setSizeForm((prevSizeForm) => ({
      ...prevSizeForm,
      [size]: {
        ...prevSizeForm[size],
        [field]: value
      },
    }));
  };
  
  const handleApplyToAll = () => {
    setSizeForm((prev) =>
      Object.fromEntries(
        selectedSizes.map((size) => [
          size,
          {
            size,
            price: priceAll,
            quantity: stockAll,
            discount: discountPriceAll,
            sku: `${skuAll}-${size}`
          }
        ])
      )
    );
  };

  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }

  const [formData, setFormData] = useState({
    productName: "",
    brand: "Shoe Park",
    description: "",
    size: [],
    colors: [],
    images: [],
    thumbnail: null,
    visibility: "published",
    categoryId: "",
    features: "",
    video: "",
  });

  const { quill, quillRef } = useQuill();
  const { quill: quillFeatures, quillRef: quillRefFeatures } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormData((prevData) => ({
          ...prevData,
          description: quill.root.innerHTML,
        }));
      });
    }

    if (quillFeatures) {
      quillFeatures.on("text-change", () => {
        setFormData((prevData) => ({
          ...prevData,
          features: quillFeatures.root.innerHTML,
        }));
      });
    }
  }, [quill, quillFeatures]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      colors: prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color],
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData({ ...formData, images: selectedFiles });
  };

  const [addProductData, { data, isLoading, isSuccess, error }] =
    useAddProductDataMutation();
  const router = useRouter();

  const handleThumbnailChange = (index) => {
    setFormData({ ...formData, thumbnail: index });
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    
    const form = new FormData();
    form.append("productName", formData.productName);
    form.append("brand", formData.brand);
    form.append("description", formData.description);
    form.append("visibility", formData.visibility);
    form.append("video", formData.video);
    form.append("categoryId", formData.categoryId); // Use formData.categoryId
    form.append("features", formData.features);

    formData.colors.forEach((color) => form.append("colors[]", color));
    formData.images.forEach((image, index) => {
      form.append("images", image);
      if (index === formData.thumbnail) {
        form.append("thumbnail", image);
      }
    });

    selectedSizes.forEach((size) => {
      const sizeData = sizeForm[size] || {};
      // console.log(`Appending size data for size: ${size}`);
      // console.log(`Price: ${sizeData.price || ""}, Quantity: ${sizeData.quantity || ""}, Discount: ${sizeData.discount || ""}, SKU: ${sizeData.sku || ""}`);
    
      form.append(`sizes[${size}][size]`, size);
      form.append(`sizes[${size}][price]`, sizeData.price || "");
      form.append(`sizes[${size}][quantity]`, sizeData.quantity || "");
      form.append(`sizes[${size}][discount]`, sizeData.discount || "");
      form.append(`sizes[${size}][sku]`, sizeData.sku || "");
    });
    
    

    try {
      const resData = await addProductData({ formData: form });

      if (resData?.data?.brand) {
        toast.success("Product added Successfully");
        handleReset();
        router.refresh("/");
      }
    } catch (error) {
      console.error("Error sending data", error);
      toast.error(error.message);
    }
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      brand: "",
      description: "",

      size: [],
      colors: [],

      images: [],
      visibility: "published",

      categoryId: "",
      qty: "",
      features: "",
      video: "",
    });
    setSizeForm({});
    setSelectedSizes([]);

    document.getElementById("image-product").value = "";

    if (quill) quill.root.innerHTML = "";
    if (quillFeatures) quillFeatures.root.innerHTML = "";
  };

  return (
    <div className="mx-auto rounded-md">
      <h1 className="text-gray-700 my-5 lg:text-xl">Add New Product</h1>
      {error && (
        <h1 className="text-red-700 my-5 lg:text-xl">{error?.data?.error}</h1>
      )}

      <form
        onSubmit={handlePublish}
        encType="multipart/form-data"
        className="flex flex-col gap-5 p-3 rounded-sm"
      >
        <div className="w-full space-y-2">
          <div className="flex flex-col gap-5 bg-white p-10 shadow-md rounded-md">
            <div className="flex-1 lg:1/2 w-full">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
                placeholder="Lightweight Air Mesh Men Shoes"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Category
              </label>
              <select
                required
                className="w-full py-2 border rounded px-2"
                onChange={handleCategoryChange}
                value={parentId || ""}
              >
                <option value="">Select One</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {subcategories.length > 0 && (
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="text-red-600 font-bold">*</span>{" "}
                    Subcategory
                  </label>
                  <select
                    required
                    className="w-full py-2 border rounded px-2"
                    onChange={handleSubcategoryChange}
                    value={subcategoryId || ""}
                  >
                    <option value="">Select One</option>
                    {subcategories.map((sc) => (
                      <option key={sc._id} value={sc._id}>
                        {sc.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {childCategories.length > 0 && (
                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="text-red-600 font-bold">*</span> Child
                    Category
                  </label>
                  <select
                    required
                    className="w-full py-2 border rounded px-2"
                    onChange={handleChildCategoryChange}
                    value={childCategoryId || ""}
                  >
                    <option value="">Select One</option>
                    {childCategories.map((cc) => (
                      <option key={cc._id} value={cc._id}>
                        {cc.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
             
            </div>
          </div>
          <div className="bg-white p-10 shadow-md rounded-md space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Product Images
              </label>
              <input
                type="file"
                id="image-product"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border rounded-md"
                required
              />
            </div>

            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-5 mt-5">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleThumbnailChange(index)}
                      className={`absolute bottom-2 right-2 p-1 rounded-full ${
                        formData.thumbnail === index
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                    >
                      {formData.thumbnail === index ? (
                        <span className="text-white">✓</span>
                      ) : (
                        <span className="text-gray-500">✓</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white p-10 shadow-md  rounded-md">
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="https://www.youtube.com/embed/yQogyiYexG4"
              required
            />
          </div>

          <div className=" flex flex-col gap-5 ">
            <div className="bg-white rounded-md p-10 min-h-[300px] ">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> 
                Description
              </label>
              <div className="h-[150px]">
                <div ref={quillRef} />
              </div>
            </div>
            <div className="bg-white rounded-md p-10 min-h-[300px] ">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Features
              </label>
              <div className="h-[150px]">
                <div ref={quillRefFeatures} />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 shadow-md rounded-md space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {["Black", "Coffee"].map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`px-3 py-1 border rounded ${
                      formData.colors.includes(color)
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`px-3 py-1 border rounded ${
                      selectedSizes.includes(size) ? "bg-gray-200" : "bg-white"
                    }`}
                    onClick={() => handleSelectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedSizes.length > 0 && (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Price for all"
                  value={priceAll}
                  onChange={(e) => setPriceAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Discount Price for all"
                  value={discountPriceAll}
                  onChange={(e) => setDiscountPriceAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="SKU for all"
                  value={skuAll}
                  onChange={(e) => setSkuAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Stock Quantity for all"
                  value={stockAll}
                  onChange={(e) => setStockAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={handleApplyToAll}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Apply to All
                </button>
              </div>
              <table className="w-full border-collapse mt-2 bg-white">
                <thead className="bg-sky-400">
                  <tr>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Discount Price</th>
                    <th className="border p-2">SKU</th>
                    <th className="border p-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSizes.map((size) => (
                    <tr key={size}>
                      <td className="border p-2 font-bold text-center">
                        {size}
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          placeholder="Price"
                          value={sizeForm[size]?.price || ""}
                          onChange={(e) =>
                            handleSizeChange(size, "price", e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          placeholder="Discount Price"
                          value={sizeForm[size]?.discount || ""}
                          onChange={(e) =>
                            handleSizeChange(size, "discount", e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          placeholder="SKU"
                          value={sizeForm[size]?.sku || ""}
                          onChange={(e) =>
                            handleSizeChange(
                              size,
                              "sku",
                              e.target.value
                            )
                          }
                          className="border p-2 rounded w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={sizeForm[size]?.quantity || ""}
                          onChange={(e) =>
                            handleSizeChange(size, "quantity", e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {isLoading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
