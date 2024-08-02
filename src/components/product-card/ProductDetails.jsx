"use client";

import { useEffect, useState } from "react";
import Container from "../Container";

import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import ReviewSection from "../ReviewSection";
import Card from "./Card";
import { useGetAllOrdersByUserQuery } from "@/redux/features/api/authApi";

export default function ProductDetails({ singleData }) {
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeData, setSizeData] = useState({
    size: "",
    discount: singleData?.sizes?.[0]?.discount,
    price: singleData?.sizes?.[0]?.price,
    quantity: "",
    _id: "",
    sku: "",
  });
  const [activeTab, setActiveTab] = useState("features");
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = singleData?.images || [];
  const [isMounted, setIsMounted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!singleData) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      7000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider]);

  const handleAddQuantity = () => {
    if (quantity < sizeData?.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size?.size);
    setSizeData(size);
  };

  const calculateDiscountPercentage = (salePrice, discountPrice) => {
    if (salePrice && discountPrice) {
      const discount = ((salePrice - discountPrice) / salePrice) * 100;
      return discount.toFixed(0); // returns percentage with two decimal points
    }
    return null;
  };

  const discountPercentage = calculateDiscountPercentage(
    sizeData?.price || singleData?.sizes?.[0]?.price,
    sizeData?.discount || singleData?.sizes?.[0]?.discount
  );

  const userId = userInfo?._id || userInfo?.id;
  const {
    data: cartItems = [],
    error,
    isLoading,
    refetch,
  } = useGetAllOrdersByUserQuery(userId);

  const handleAddToCart = async () => {
    if (!userInfo?.email) {
      toast.error("Please Login First");
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    // Ensure you have the item data correctly defined
    const item = {
      productId: singleData?._id,
      productName: singleData?.productName,
      size: sizeData?.size,
      price: sizeData?.discount,
      productImage: singleData?.thumbnail,
      userId: userInfo?._id || userInfo?.id,
      qty: quantity,
      sku: sizeData?.sku,
      totalPrice: sizeData?.discount * quantity,
    };

    if (item.size) {
      // Save updated cart to the database
      try {
        const res = await axiosInstance.post(`${backendUrl}/api/data/cart`, {
          item,
        });
        if (res?.data) {
          toast.success(res?.data?.message);
          refetch();
        }
      } catch (error) {
        toast.error("Failed to save cart");
      } finally {
      }
    } else {
      toast.error("Please select a size");
    }
  };

  return (
    <Container>
      <section className="my-10">
        <section className="flex flex-col lg:flex-row">
          <section className="flex-1">
            <section className="overflow-hidden">
              <section className="">
                <section className="w-full h-72 sm:h-96 md:h-[540px] flex flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-center before:absolute before:inset-0 transform duration-1000 ease-linear rounded-lg overflow-hidden">
                  <Image
                    src={sliders[currentSlider]}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover mb-4 duration-300"
                    alt={`Slide ${currentSlider + 1}`}
                  />
                </section>

                {/* Slider container */}
                <section className="flex  justify-center items-center gap-3 p-2">
                  {sliders.map((slide, inx) => (
                    <Image
                      width={100}
                      height={100}
                      onClick={() => setCurrentSlider(inx)}
                      key={inx}
                      src={slide}
                      className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 bg-black/20 ${
                        currentSlider === inx
                          ? "border-2 border-black p-px"
                          : ""
                      } rounded-md md:rounded-lg box-content cursor-pointer`}
                      alt={`Thumbnail ${inx + 1}`}
                    />
                  ))}
                </section>
              </section>
            </section>
          </section>
          <section id="select-size" className="flex-1 lg:ml-8 mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold mb-4">
              {singleData?.productName}
            </h1>
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              {Array.from({ length: singleData?.ratingCount || 5 }).map(
                (_, index) => (
                  <svg
                    key={index}
                    className="w-5"
                    viewBox="0 0 24 24"
                    fill="#94a3b8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                      fill="#f2b00a"
                    />
                  </svg>
                )
              )}
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2">
                ({singleData?.ratingCount || 0} reviews)
              </span>
            </div>
            <section className="flex items-center text-sm gap-5 mb-2">
              <section className="flex flex-col space-y-2 text-gray-700">
                <h3 className="text-gray-800 font-semibold">Brand:</h3>
                <h3 className="text-gray-800 font-semibold">SKU:</h3>
                <h3 className="text-gray-800 font-semibold">Availability:</h3>
              </section>
              <section className="text-gray-700 space-y-2 flex flex-col">
                <h3 className="ml-1 font-semibold">{singleData?.brand}</h3>
                <h3 className="ml-1 font-semibold uppercase">
                  {sizeData?.sku || singleData?.sizes?.[0]?.sku}
                </h3>
                <h3 className="ml-1 font-semibold text-green-700 ">In stock</h3>
              </section>
            </section>

            <section className="space-x-2 font-bold text-lg my-4">
              <span className="text-gray-700 line-through">
                ৳ {singleData?.sizes?.[0]?.price || sizeData?.price}.00
              </span>
              <span className="text-red-500">
                ৳ {singleData?.sizes?.[0]?.discount || sizeData?.discount}.00
              </span>
              <span className="text-white bg-red-500 px-2 py-1 rounded-md">
                -{discountPercentage && discountPercentage}% OFF
              </span>
            </section>

            <section
              className={`font-bold flex flex-wrap items-center  gap-5 `}
            >
              <h1>
                Select Size
                <span className="text-red-600"> *</span>{" "}
              </h1>
              <h1>
                <button
                  onClick={() => setOpenModal(true)}
                  className=" bg-primary text-white rounded-md text-xs lg:text-sm px-2 py-0.5"
                >
                  Size Chart
                </button>
              </h1>
            </section>

            <section className="flex space-x-2 mb-5">
              <section className="flex space-x-2 mt-4">
                {singleData?.sizes?.map((size) => (
                  <input
                    type="button"
                    disabled={size?.quantity === 0}
                    key={size?.size}
                    value={size?.size}
                    className={`w-10 h-10 border border-gray-300 text-center ${
                      size?.quantity === 0
                        ? "bg-gray-300 text-gray-500 line-through cursor-not-allowed" // Disabled state color
                        : `cursor-pointer hover:bg-primary hover:text-white ${
                            selectedSize === size?.size
                              ? "bg-primary text-white"
                              : "bg-white text-black"
                          }`
                    }`}
                    onClick={() => {
                      if (size?.quantity > 0) {
                        handleSizeSelect(size);
                      }
                    }}
                  />
                ))}
              </section>
            </section>

            <section className="my-5">
              <section className="flex items-center my-2">
                <button
                  className={`bg-white text-black border  px-3 h-8 rounded-l transition-colors ${
                    quantity > 0
                      ? " hover:bg-gray-200"
                      : "border-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleSubtractQuantity}
                  disabled={quantity <= 0}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center h-8 border  bg-white"
                />
                <button
                  className={`bg-white text-black border  px-3 h-8 rounded-r transition-colors ${
                    quantity >= 0
                      ? " hover:bg-gray-200"
                      : "border-gray-300 cursor-not-allowed"
                  }`}
                  onClick={handleAddQuantity}
                >
                  +
                </button>
              </section>

              <section className="relative my-7 flex gap-2">
                <button
                  className={`rounded-md px-6 py-3 text-white cursor-pointer font-semibold transition-colors duration-200 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-md"
                      `}
                >
                  Buy Now
                </button>
                <button
                  className={`rounded-md px-6 py-3 text-white font-semibold transition-colors duration-200 bg-primary hover:bg-primary-dark active:bg-primary-darker shadow-md"
                    `}
                  onClick={() => handleAddToCart()}
                >
                  Add to Cart
                </button>
              </section>
            </section>
          </section>
        </section>

        <section className="flex flex-col lg:flex-row gap-2">
          <div className="w-3/5 flex-1">
            <section className="mt-8 border-b border-black">
              <nav className="flex space-x-4 text-sm">
                <button
                  className={`pb-2 ${
                    activeTab === "features"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("features")}
                >
                  FEATURES
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "description"
                      ? "border-b-2 border-primary text-primary "
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  DESCRIPTION
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "terms"
                      ? "border-b-2 border-primary text-primary "
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("terms")}
                >
                  TERMS
                </button>
              </nav>
            </section>
            {activeTab === "description" && (
              <section
                className=" mb-5 bg-white p-4 mt-2 shadow rounded-md"
                dangerouslySetInnerHTML={{ __html: singleData.description }}
              ></section>
            )}
            {activeTab === "terms" && (
              <section className="mb-4 bg-white p-4 mt-2 shadow rounded-md">
                <h1>to do</h1>
              </section>
            )}
            {activeTab === "features" && (
              <section className="space-y-10 mb-10 bg-white p-4 mt-2 shadow rounded-md">
                <section
                  className="mt-4 "
                  dangerouslySetInnerHTML={{ __html: singleData.features }}
                ></section>

                {isMounted && (
                  <section className="player-wrapper max-w-2xl  h-[350px]   mb-5">
                    <ReactPlayer
                      className="react-player "
                      url={singleData?.video}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </section>
                )}
              </section>
            )}
            <ReviewSection />
          </div>
          <div className="mt-[38px]">
            <h2 className="border-b border-black">Related Products</h2>
            <div className="flex flex-col gap-2">
              <Card></Card>
              <Card></Card>
              <Card></Card>
              <Card></Card>
            </div>
          </div>
        </section>
      </section>
    </Container>
  );
}
