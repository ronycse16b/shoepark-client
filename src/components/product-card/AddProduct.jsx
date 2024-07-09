"use client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useAddProductDataMutation } from "@/redux/features/api/authApi";
import { useSelector } from "react-redux";

export default function AddProduct() {

  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }





  const [formData, setFormData] = useState({
    productName: "",
    brand: "Iconic Leather",
    description: "",
    sku: "",
    salePrice: "",
    discount: "",
    size: [],
    colors: [],
    tag: "",
    images: [],
    thumbnail: null,
    visibility: "published",
    scheduleDate: "",
    category: "",
    qty: "",
    features: "",
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

  const handleSizeChange = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      size: prevData.size.includes(size)
        ? prevData.size.filter((s) => s !== size)
        : [...prevData.size, size],
    }));
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
    form.append("salePrice", formData.salePrice);
    form.append("discount", formData.discount);
    form.append("visibility", formData.visibility);
    form.append("scheduleDate", formData.scheduleDate);
    form.append("category", formData.category);
    form.append("tag", formData.tag);
    form.append("video", formData.video);
    form.append("sku", formData.sku);
    form.append("qty", formData.qty);
    form.append("features", formData.features);

    formData.colors.forEach((color) => form.append("colors[]", color));
    formData.size.forEach((size) => form.append("size[]", size));
    formData.images.forEach((image, index) => {
      form.append("images", image);
      if (index === formData.thumbnail) {
        form.append("thumbnail", image); // Append the thumbnail image separately
      }
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
      salePrice: "",
      discount: "",
      size: [],
      colors: [],
      tag: "",
      images: [],
      visibility: "published",
      scheduleDate: "",
      category: "",
      qty: "",
      features: "",
    });

    document.getElementById("image-product").value = "";

    if (quill) quill.root.innerHTML = "";
    if (quillFeatures) quillFeatures.root.innerHTML = "";
  };

  return (
    <div className="mx-auto  rounded-md ">
      <h1 className="text-gray-700 my-5 lg:text-xl">Add New Product</h1>
      {error && (
        <h1 className="text-red-700 my-5 lg:text-xl">{error?.data?.error}</h1>
      )}

      <form
        onSubmit={handlePublish}
        encType="multipart/form-data"
        className="flex flex-col lg:flex-row gap-5  p-3  rounded-sm"
      >
        <div className="w-full md:w-8/12 space-y-2">
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex-1 lg:1/2 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
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
            <div className="flex-1 lg:1/2 w-full">
              <label className="block text-sm font-medium text-gray-700">
                Product SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md"
                placeholder="il-1348"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
            >
              <option selected value="iconic Leather">
                iconic Leather
              </option>
              <option value="Other">Other</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row   ">
            <div className="col-span-2 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div
                ref={quillRef}
                className="mt-1 p-2 block w-full border rounded-md bg-white lg:h-[200px]  overflow-scroll "
              />
            </div>
            <div className="col-span-2 w-full lg:w-1/2 ">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <div
                ref={quillRefFeatures}
                className="mt-1 p-2 block w-full border rounded-md bg-white lg:h-[200px] overflow-scroll "
              />
            </div>
          </div>
          <div className="lg:pt-24">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="1100.00"
              required
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Sale Price
            </label>
            <input
              type="number"
              required
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="920"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Your Size
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["39", "40", "41", "42", "43", "44"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`border border-primary rounded-full w-10 h-10 ${
                    formData.size.includes(size) ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-5/12">
          <div className="col-span-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter qty"
            />
          </div>
          <div className="col-span-2 mb-2 ">
            <label className="block text-sm font-medium text-gray-700">
              Publish Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
            >
              <option selected value="Shoes">
                Shoes
              </option>
              <option value="Other">Other</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="col-span- ">
            <label className="block text-sm font-medium text-gray-700">
              Select Colors
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["black", "red-950"].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-10 h-10  border border-black ${
                    formData.colors.includes(color)
                      ? color === "black"
                        ? "bg-black"
                        : "bg-red-900"
                      : color === "black"
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }`}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          </div>
          <div className="col-span-2 my-2">
            <label className="block text-sm font-medium text-gray-700">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Trending tags"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Video
            </label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="https://youtu.be/5QP0mvrJkiY?si=b_l35LeE9t-qI_1W"
            />
          </div>
          <div className="col-span-2 mt-5 border border-red-600 p-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              id="image-product"
              type="file"
              multiple
              required
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            <div className="flex mt-2 space-x-2">
              {formData.images.length > 0 &&
                formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Product Preview ${index + 1}`}
                      className={`w-40 h-40 object-cover  ${
                        formData.thumbnail === index
                          ? "border-2 border-red-500"
                          : ""
                      }`}
                    />
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">
                      {index + 1}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0">
                      <label className=" flex justify-center bg-rose-600 items-center">
                        <input
                          type="radio"
                          name="thumbnail"
                          checked={formData.thumbnail === index}
                          onChange={() => handleThumbnailChange(index)}
                          className="form-radio "
                        />
                        <h2 className="text-xs ml-2 text-white ">Set as Thumbnail</h2>
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-span-2 mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Visibility
            </label>
            <div className="my-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="published"
                  checked={formData.visibility === "published"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Published</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="visibility"
                  value="hidden"
                  checked={formData.visibility === "hidden"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Hidden</span>
              </label>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="px-4 w-full sm:mt-10 py-2 bg-primary text-white flex justify-center items-center rounded-md"
          >
            {isLoading ? (
              <div className="flex items-center justify-end">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Add Product"
            )}

           
          </button>
        </div>
      </form>
    </div>
  );
}
