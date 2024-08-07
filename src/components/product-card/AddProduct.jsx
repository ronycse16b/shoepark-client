"use client";
import {
  useAddProductDataMutation,
  useGetAllCategoriesQuery,
  useGetChildCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/redux/features/api/authApi";
import { redirect, useRouter } from "next/navigation";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";
import { useSelector } from "react-redux";
import ProcessingModal from "../ProcessingModal";
import Link from "next/link";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebaseConfig/firebase.config";

export default function AddProduct() {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }

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
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  // Fetch categories data
  const { data: fetchedCategories, error: categoriesError } =
    useGetAllCategoriesQuery();
  const { data: fetchedSubcategories, error: subcategoriesError } =
    useGetSubCategoriesQuery(parentId, { skip: !parentId });
  const { data: fetchedChildCategories, error: childCategoriesError } =
    useGetChildCategoriesQuery(subcategoryId, { skip: !subcategoryId });
  const [addProductData, { data, isLoading, isSuccess, isError, error }] =
    useAddProductDataMutation();

  useEffect(() => {
    if (fetchedCategories) setCategories(fetchedCategories?.data);
  }, [fetchedCategories]);

  useEffect(() => {
    if (parentId && fetchedSubcategories)
      setSubcategories(fetchedSubcategories?.data);
  }, [parentId, fetchedSubcategories]);

  useEffect(() => {
    if (subcategoryId && fetchedChildCategories)
      setChildCategories(fetchedChildCategories?.data);
  }, [subcategoryId, fetchedChildCategories]);

  // form validation

  const [errors, setErrors] = useState({
    productName: "",
    description: "",
    size: [],
    colors: [],
    images: [],
    thumbnail: null,
    categoryId: "",
    features: "",
    video: "",
  });

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!formData.productName) {
      isValid = false;
      errors.productName = "Product Name is required";
    }
    if (!formData.description) {
      isValid = false;
      errors.description = "Description is required";
    }

    if (!formData.colors) {
      isValid = false;
      errors.colors = "Colors is required";
    }
    if (!formData.images) {
      isValid = false;
      errors.images = "Images is required";
    }
    if (!formData.categoryId) {
      isValid = false;
      errors.categoryId = "Category is required";
    }

    if (!formData.features) {
      isValid = false;
      errors.features = "Features is required";
    }


    setErrors(errors);
    return isValid;
  };

  // handle category change

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setParentId(selectedCategoryId);
    setSubcategoryId(null);
    setChildCategoryId(null);
    setFormData((prev) => ({ ...prev, categoryId: selectedCategoryId }));
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = e.target.value;
    setSubcategoryId(selectedSubcategoryId);
    setChildCategoryId(null);
    setFormData((prev) => ({ ...prev, categoryId: selectedSubcategoryId }));
  };

  const handleChildCategoryChange = (e) => {
    const selectedChildCategoryId = e.target.value;
    setChildCategoryId(selectedChildCategoryId);
    setFormData((prev) => ({ ...prev, categoryId: selectedChildCategoryId }));
  };

  // handle size selected

  const handleSelectSize = (size) => {
    if (!selectedSizes.includes(size)) {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, size]);
      setSizeForm((prevSizeForm) => ({
        ...prevSizeForm,
        [size]: {
          size: size, // Ensure the size field is included when a new size is selected
          price: "",
          quantity: "",
          discount: "",
          sku: "",
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
        [field]: value,
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
            sku: `${skuAll}-${size}`,
          },
        ])
      )
    );
  };

  // define form data

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
    colorOptions: ["Black", "Coffee", "Master"], // Default colors
  });
  const { quill, quillRef } = useQuill({
    placeholder: "Write description here...",
  });

  const { quill: quillFeatures, quillRef: quillRefFeatures } = useQuill({
    placeholder: "Write features here...",
  });

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

  // handle colors

  const [newColor, setNewColor] = useState(""); // State for new color input

  const handleColorChange = (color) => {
    setFormData((prevFormData) => {
      const newColors = prevFormData.colors.includes(color)
        ? prevFormData.colors.filter((c) => c !== color)
        : [...prevFormData.colors, color];
      return { ...prevFormData, colors: newColors };
    });
  };

  const handleAddColor = () => {
    if (newColor && !formData.colorOptions.includes(newColor)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        colorOptions: [...prevFormData.colorOptions, newColor],
      }));
      setNewColor(""); // Clear input after adding
    }
  };

  // handle image processing here upload on firebase

  const compressImage = (file, quality) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas and set dimensions
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const width = img.width;
          const height = img.height;

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Get the compressed image as a Blob
          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: file.type }));
            },
            file.type,
            quality
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to delete an image from Firebase storage
  const deleteImage = async (fileName) => {
    try {
      const storageRef = ref(storage, fileName);
      await deleteObject(storageRef);
      console.log(`Successfully deleted ${fileName}`);
    } catch (error) {
      console.error(`Error deleting image ${fileName}:`, error);
    }
  };

  // Handler for deleting an image
  const handleDelete = async (url) => {
    try {
      // Extract the file name from the URL
      const fileName = url.split("/").pop().split("?")[0];
      console.log(`Deleting file: ${fileName}`);
      await deleteImage(fileName);
      document.getElementById("image-product").value = "";

      // Remove the image from the formData state or wherever it is stored
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: prevFormData.images.filter((imageUrl) => imageUrl !== url),
      }));
    } catch (error) {
      console.error("Error handling delete:", error);
    }
  };

  // Function to upload images
  const uploadImages = async (files) => {
    if (!Array.isArray(files)) {
      files = [files];
    }

    const compressedFilesPromises = files.map((file) =>
      compressImage(file, 0.2)
    ); // Adjust quality as needed

    try {
      const compressedFiles = await Promise.all(compressedFilesPromises);

      const uploadPromises = compressedFiles.map((file) => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
              setProgress(progress);
            },
            async (error) => {
              console.error("Upload failed:", error);
              // Delete already uploaded files on error
              try {
                await deleteImage(storageRef.name);
              } catch (deleteError) {
                console.error(
                  `Error deleting failed upload ${storageRef.name}:`,
                  deleteError
                );
              }
              reject(error);
            },
            () => {
              getDownloadURL(storageRef).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      });

      const urls = await Promise.all(uploadPromises);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...urls],
      }));
      setProgress(null);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };



  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    uploadImages(selectedFiles);
  };
  const handleInputChange = (e) => {
    setNewColor(e.target.value);
  };

  const handleThumbnailChange = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnail: formData.images[index], // Set the thumbnail field to the URL of the selected image
    }));
  };

  // add product handler

  const handlePublish = async (e) => {
    e.preventDefault();

    const form = {
      ...formData,
      size: Object.values(sizeForm), // Convert sizeForm object to array
    };

    if (validate()) {
      try {
        setOpenModal(true);
        const resData = await addProductData({ formData: form });

        if (resData?.data?.brand) {
          // toast.success("Product added Successfully");
          handleReset();
          router.refresh();
          setParentId(null);
          setSubcategoryId(null);
          setChildCategoryId(null);
          setSizeForm("");
          setPriceAll("");
          setStockAll("");
          setDiscountPriceAll("");
        }
      } catch (error) {
        console.error("Error sending data", error);
        // toast.error(error.message);
      }
    }
  };

  // form reset
  const handleReset = () => {
    setFormData({
      productName: "",
      brand: "",
      description: "",
      size: [],
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

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setOpenModal(false), 2000); // Close modal after 2 seconds on success
    }
  }, [isSuccess]);



  return (
    <div className=" sm:p-7 border border-gray-300 rounded-lg bg-gray-50 my-10">
      {/* <h1 className=" lg:text-xl  text-white px-5 bg-sky-700 py-3 ">
        Add New Product
      </h1> */}
      <h1 className=" lg:text-xl  ">
        Add New Product
      </h1>
      {/* {error && <h1 className="text-red-700 my-5 lg:text-xl">{error?.data?.error}</h1>} */}

      <form
        onSubmit={handlePublish}
        // encType="multipart/form-data"
        className="flex flex-col gap-5 p-3 rounded-sm"
      >
        <div className="w-full space-y-2">
          <div className="flex flex-col gap-5 ">
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
              />
              {errors.productName && (
                <span className="text-red-600">{errors.productName}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Category
              </label>
              <select
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

              {errors.categoryId && (
                <span className="text-red-600">{errors.categoryId}</span>
              )}
            </div>
            <div className="  ">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Product Images
              </label>
              <div className="border relative bg-white ">
                <input
                  type="file"
                  id="image-product"
                  multiple
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full border  rounded-md py-6 px-4 text-center bg-white"
                />
                {progress > 0 && (
                  <div className="mx-auto flex w-[500px] flex-col gap-2 absolute left-0 bottom-0">
                    <div className="flex h-3 w-full items-center justify-center overflow-hidden rounded-full bg-sky-300">
                      <div
                        style={{ width: `${progress?.toFixed(0)}%` }}
                        className="transition-width mr-auto flex h-full w-0 items-center justify-center rounded-full  bg-rose-600 duration-500"
                      >
                        <span className="text-center text-xs font-medium text-white">
                          {progress?.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {errors.images && (
                  <span className="text-red-600">{errors.images}</span>
                )}
              </div>

              {formData?.images?.length > 0 && (
                <div className="flex flex-wrap gap-5 mt-5">
                  {formData?.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt="Product"
                        className="w-24 h-24 object-cover rounded relative"
                      />
                      <button
                        className="bg-red-600 absolute top-0 right-0 text-white px-2 rounded-full"
                        onClick={() => handleDelete(image)}
                      >
                        x
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbnailChange(index)}
                        className={`absolute bottom-2 right-2 p-1 rounded-full ${
                          formData?.thumbnail === image
                            ? "bg-green-500"
                            : "bg-white"
                        }`}
                      >
                        {formData.thumbnail === image ? (
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
          </div>

          <div className="   rounded-md mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md "
              placeholder="https://www.youtube.com/embed/yQogyiYexG4"
            />
          </div>

          <div className=" flex flex-col gap-5 mt-5">
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span>
                Description
              </label>
              <div className="bg-white">
                <div ref={quillRef} />
              </div>

              {errors.description && (
                <span className="text-red-600">{errors.description}</span>
              )}
            </div>
            <div className=" ">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Features
              </label>
              <div className="bg-white">
                <div ref={quillRefFeatures} />
              </div>
              {errors.features && (
                <span className="text-red-600">{errors.features}</span>
              )}
            </div>
          </div>

          <div className="   rounded-md space-y-5">
            <div className="">
              <label className="block text-sm font-medium text-gray-700">
                <span className="text-red-600 font-bold">*</span> Colors
              </label>
              <div className="flex gap-2 flex-wrap">
                {formData?.colorOptions?.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`px-3 py-2 border rounded ${
                      formData.colors.includes(color)
                        ? "bg-gray-700 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </button>
                ))}
               
                <input
                  type="text"
                  value={newColor}
                  onChange={handleInputChange}
                  placeholder="Add new color"
                  className=" border rounded w-34 py-2 px-4"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="px-4 py-2 bg-sky-700 text-white rounded"
                >
                  Add Color
                </button>
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
                    className={`px-4 py-2 border rounded ${
                      selectedSizes.includes(size)
                        ? "bg-gray-700 text-white"
                        : "bg-white"
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
            <div className="py-2">
              <div className="flex flex-col lg:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Price for all"
                  value={priceAll}
                  onChange={(e) => setPriceAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
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
                  type="number"
                  placeholder="Stock Quantity for all"
                  value={stockAll}
                  onChange={(e) => setStockAll(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={handleApplyToAll}
                  className="px-4 py-2 bg-rose-600 text-white rounded"
                >
                  Apply to All
                </button>
              </div>
              <table className="w-full border-collapse mt-2 bg-white overflow-auto">
                <thead className="bg-gray-700 text-white">
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
                          type="number"
                          required
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
                          type="number"
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
                          required
                          value={sizeForm[size]?.sku || ""}
                          onChange={(e) =>
                            handleSizeChange(size, "sku", e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        />
                       
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          placeholder="Quantity"
                          required
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
            </div>
          )}
        </div>

        <div className="flex justify-end mt-5 sm:px-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-sky-700 text-white px-5 py-2 rounded"
          >
            {isLoading ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </form>
      <ProcessingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
