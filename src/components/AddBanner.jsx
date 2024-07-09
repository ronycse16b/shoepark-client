"use client";

import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { CloudUploadIcon, TrashIcon } from "@heroicons/react/solid";

export default function FileUpload5() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [images, setImages] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const fileInputRef = useRef();

  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo?.role !== "admin") {
    redirect("/dashboard");
  }

  async function getImages() {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`${backendUrl}/api/data/banner`, {
        cache: "no-store",
      });
      setBannerImages(res.data.data);
    } catch (error) {
      console.log("Error getting banner images", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.size <= 2048576) {
        selectedImages.push({
          file: file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        });
      } else {
        alert(`File "${file.name}" exceeds the maximum allowed size of 2MB.`);
      }
    }

    setImages((prevImages) => [...prevImages, ...selectedImages]);
    fileInputRef.current.value = "";
  };

  const handleClearImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCreateBanner = async () => {
    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image.file));

    try {
      const result = await axiosInstance.post(
        `${backendUrl}/api/data/add-banner`,
        formData
      );

      if (result.status === 201) {
        toast.success("Banner Successfully Added");
        getImages();
        setLoading(false);
        setImages([]);
      }
    } catch (error) {
      console.error("Error sending data", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    setIsDeleting(index);
    try {
      const res = await axiosInstance.delete(
        `${backendUrl}/api/data/banner-delete/${id}`
      );
      if (res.status === 200) {
        toast.success("Banner Successfully Deleted");
        getImages();
      }
    } catch (error) {
      toast.error("Error sending data", error?.message);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className=" mx-auto ">
      <h1 className="text-gray-700 my-5 text-2xl">Manage Banners</h1>
      <div className="my-5">
        {isLoading && "Loading..."}

        <label className="flex flex-col items-center justify-center max-w-3xl mx-auto p-6 bg-white border-2 border-dashed border-gray-400 rounded-lg cursor-pointer">
          <CloudUploadIcon className="h-10 w-10 text-gray-500" />
          <span className="mt-2 text-lg font-medium tracking-tight">
            Upload your file
          </span>
          <span className="text-sm text-gray-500">
            Files should be in PNG, JPEG, or JPG format
          </span>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg"
          />
        </label>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  height={100}
                  width={100}
                  className="w-full max-w-[400px] rounded-lg object-cover"
                  src={image.preview}
                  alt={image.name}
                />
                <div className="mt-2">
                  <h5 className="text-xl font-medium tracking-tight truncate">
                    {image.name}
                  </h5>
                  <p className="text-gray-500">
                    {(image.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => handleClearImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <button
            disabled={loading}
            onClick={handleCreateBanner}
            className="bg-blue-500 text-white py-2 mt-10 px-4 rounded-md"
          >
            {loading ? "Uploading..." : "Upload Your Banner"}
          </button>
        </div>
      </div>
      <div className="overflow-auto h-[400px] grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        {bannerImages?.map((b, index) => (
          <div key={index} className="relative ">
            <Image
              src={b?.image}
              width={400}
              height={200}
              className="w-full h-[300px] object-center rounded-lg border border-primary"
              alt="Banner"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              onClick={() => handleDelete(b?._id, index)}
            >
              {isDeleting === index ? "Deleting..." : <TrashIcon className="h-5 w-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
