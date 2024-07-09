"use client";

import { useEffect, useState } from "react";
import Container from "../Container";
import { CheckCircleIcon } from "@heroicons/react/outline";

import ReactPlayer from "react-player";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ReviewSection from "../ReviewSection";

export default function ProductDetails({ singleData }) {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(10);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [orderData, setOrderData] = useState("");

  if (!singleData) {
    return <p>Loading...</p>;
  }

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    note: "",
    image: singleData?.images[0],
    qty: quantity,
    deliveryCharge: deliveryCharge,
    size: "",
    price: singleData?.discount,
    total: "",
    productName: singleData?.productName,
    sku: singleData?.sku,
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

  useEffect(() => {
    const subtotal = formData.price * quantity;
    const total = subtotal + deliveryCharge;
    setFormData((prevFormData) => ({
      ...prevFormData,
      qty: quantity,
      deliveryCharge: deliveryCharge,
      total: total,
    }));
  }, [quantity, deliveryCharge, formData.price]);

  const handleAddQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "mobile") {
      setIsValid(value.length === 11);
    }
  };

  const handleDeliveryChange = (e) => {
    const value = e.target.value;
    setDeliveryOption(value);

    let baseCharge;
    if (value === "Outside of Dhaka") {
      baseCharge = 140;
    } else if (value === "Inside Dhaka") {
      baseCharge = 80;
    } else if (value === "Near Dhaka") {
      baseCharge = 100;
    }

    if (quantity > 1) {
      setDeliveryCharge(baseCharge + 30 * (quantity - 1));
    } else {
      setDeliveryCharge(baseCharge);
    }
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const orderData = {
      ...formData,
      size: selectedSize,
      paymentMethod,
    };

    try {
      const res = await axios.post(`${backendUrl}/api/data/order`, orderData);
      if (res?.data) {
        setIsLoading(false);
        setOrderModal(false);
        await setOrderData(res?.data?.data);
        setConfirmModal(true);
        setFormData({
          name: "",
          mobile: "",
          address: "",
        });
        setDeliveryOption("");
        setSelectedSize(null);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }
  };

  const handleToggleToOrderForm = () => {
    setOrderModal(true);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const productPrice = singleData?.discount;
  const subtotal = productPrice * quantity;
  const total = subtotal + deliveryCharge;

  const calculateDiscountPercentage = (salePrice, discountPrice) => {
    if (salePrice && discountPrice) {
      const discount = ((salePrice - discountPrice) / salePrice) * 100;
      return discount.toFixed(0); // returns percentage with two decimal points
    }
    return null;
  };

  const discountPercentage = calculateDiscountPercentage(
    singleData?.salePrice,
    singleData?.discount
  );

  return (
    <Container>
      <section className="mt-10">
        <section
          className={`fixed z-[100] flex items-center justify-center ${
            confirmModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <section
            className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
              confirmModal
                ? "scale-1 opacity-1 duration-300"
                : "scale-0 opacity-0 duration-150"
            } `}
          >
            <svg
              onClick={() => {
                setConfirmModal(false);
                setOrderData("");
              }}
              className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
              </g>
            </svg>
            <section className="bg-white px-8 rounded-lg mb-4 ">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />
              <h1 className="text-2xl font-semibold text-center mt-4 mb-2">
                Thank You for Your Order!
              </h1>
              <p className="text-gray-700 text-center 1">
                Your order has been confirmed.
              </p>
              <p className="text-primary font-bold text-center 1">
                Invoice No: {orderData?.orderNumber}
              </p>
              <Link
                href="#"
                className="text-blue-700 text-center 1 underline cursor-pointer"
              >
                Tracking your order
              </Link>
            </section>
            <Link
              href="/"
              onClick={() => {
                setConfirmModal(false);
                setOrderData("");
              }}
              className="rounded-md bg-secondary mt-5 hover:bg-opacity-85 px-6 py-1.5 text-white"
            >
              Ok
            </Link>
          </section>
        </section>
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
                    <img
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
                <h3 className="ml-1">{singleData?.brand}</h3>
                <h3 className="ml-1">{singleData?.sku}</h3>
                <h3 className="ml-1 text-green-700 font-bold">In stock</h3>
              </section>
            </section>

            <section className="space-x-2 font-bold text-lg my-4">
              <span className="text-gray-700 line-through">
                ৳ {singleData?.salePrice}.00
              </span>
              <span className="text-red-500">৳ {singleData?.discount}.00</span>
              <span className="text-white bg-red-500 px-2 py-1 rounded-md">
                -{discountPercentage && discountPercentage}%
              </span>
            </section>

            <section className={`font-bold flex items-center justify-between `}>
              <h1>
                অর্ডার করার আগে সাইজ সিলেক্ট করুন{" "}
                <span className="text-red-600"> *</span>{" "}
              </h1>
              <h1>
                <button
                  onClick={() => setOpenModal(true)}
                  className=" bg-primary text-white rounded-md text-sm px-2 py-0.5"
                >
                  Size Chart
                </button>
              </h1>
            </section>

            <section className="flex space-x-2 mb-5">
              <section
                className={`flex space-x-2 mt-4 ${
                  !selectedSize
                    ? "border-dashed border-2 border-red-600 animate-pulse p-2 "
                    : ""
                }`}
              >
                {singleData?.size.map((size) => (
                  <input
                    type="button"
                    key={size}
                    value={size}
                    className={`w-10 h-10 border cursor-pointer  border-gray-300 rounded-full ${
                      selectedSize === size
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white"
                    } text-center`}
                    onClick={() => handleSizeSelect(size)}
                  />
                ))}
              </section>
            </section>

            <section className="my-5">
              <section className="flex items-center my-2">
                <button
                  className="bg-white h-8 text-black border border-primary px-3 rounded-l"
                  onClick={handleSubtractQuantity}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center h-8 border border-primary"
                />
                <button
                  className="bg-white h-8 text-black border border-primary px-3 rounded-r"
                  onClick={handleAddQuantity}
                >
                  +
                </button>
              </section>
              <section className="group relative gap-2 my-7 flex h-10 w-max cursor-pointer justify-center">
                <button
                  onClick={handleToggleToOrderForm}
                  disabled={!selectedSize}
                  className={`rounded-md border border-primary   
                    px-3 py-2   ${
                      selectedSize
                        ? "bg-black text-white hover:bg-opacity-55"
                        : "bg-rose-600 text-white cursor-pointer hover:bg-opacity-70 "
                    }`}
                >
                  Buy Now
                </button>
                <button
                  onClick={handleToggleToOrderForm}
                  disabled={!selectedSize}
                  className={`rounded-md border border-primary   
                    px-3 py-2   ${
                      selectedSize
                        ? "bg-black text-white hover:bg-opacity-55"
                        : "bg-primary text-white cursor-pointer hover:bg-opacity-70 "
                    }`}
                >
                  Add to Cart
                </button>
                {!selectedSize && (
                  <section className="absolute -right-[200px] top-0 flex cursor-pointer whitespace-nowrap opacity-0 duration-500 hover:hidden group-hover:-right-[220px] group-hover:opacity-100">
                    <p className="h-fit rounded-md bg-[#0EA5E9] px-3 py-2 text-white shadow-[0px_0px_10px_0px_#0EA5E9]">
                      আগে সাইজ সিলেক্ট করুন
                    </p>
                    <span className="absolute -left-2 top-[50%] h-0 w-0 -translate-y-1/2 -rotate-[135deg] border-b-[20px] border-r-[20px] border-b-transparent border-r-[#0EA5E9] shadow-[0px_0px_10px_0px_#0EA5E9]"></span>
                  </section>
                )}
              </section>
            </section>
          </section>
        </section>

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
            <section className=" ">
              <section className="   ">
                <h1 className="text-xl font-bold mb-6">Iconic Leather BD -</h1>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">২. পণ্যের তথ্য</h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>নির্ভুলতা</strong>: আমরা সঠিক পণ্য বিবরণ এবং চিত্র
                      সরবরাহ করি।।
                    </li>
                    <li>
                      <strong>উপলব্ধতা</strong>: পণ্যের উপলব্ধতা পূর্ব নোটিশ
                      ছাড়াই পরিবর্তিত হতে পারে। আমরা যে কোনও সময় যে কোনও পণ্য
                      বন্ধ করার অধিকার রাখি।
                    </li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">৩. অর্ডার</h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>অর্ডার গ্রহণ</strong>: আপনার অর্ডার আমাদের কাছ
                      থেকে পণ্য কেনার একটি প্রস্তাব। আমরা আপনার অর্ডার গ্রহণ বা
                      প্রত্যাখ্যান করার অধিকার রাখি।
                    </li>
                    <li>
                      <strong>মূল্য নির্ধারণ</strong>: সমস্ত দাম বাংলাদেশী টাকা
                      (BDT) তে এবং প্রযোজ্য করসহ প্রদর্শিত হয় যদি না অন্যথায়
                      বলা হয়। আমরা যে কোনও সময় দাম পরিবর্তন করার অধিকার রাখি।
                    </li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">
                    ৪. শিপিং এবং ডেলিভারি
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>শিপিং নীতি</strong>: আমরা বিভিন্ন অবস্থানে শিপিং
                      অফার করি। শিপিং চার্জ এবং ডেলিভারি সময় আপনার অবস্থান এবং
                      নির্বাচিত শিপিং পদ্ধতির উপর নির্ভর করে।
                    </li>
                    <li>
                      <strong>ডেলিভারি সময়</strong>: আমাদের ওয়েবসাইটে প্রদত্ত
                      আনুমানিক ডেলিভারি সময়। অপ্রত্যাশিত পরিস্থিতির কারণে
                      বিলম্ব হতে পারে।
                    </li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">
                    ৫. রিটার্ন এবং এক্সচেঞ্জ
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>রিটার্ন নীতি</strong>: যদি আপনি আপনার ক্রয়ে
                      সন্তুষ্ট না হন, আপনি ডেলিভারির ৭ দিনের মধ্যে এটি ফেরত দিতে
                      পারেন। পণ্যটি এর আসল অবস্থায় এবং প্যাকেজিংয়ে থাকতে হবে।
                    </li>
                    <li>
                      <strong>রিটার্ন প্রক্রিয়া</strong>: রিটার্ন শুরু করতে,
                      আমাদের গ্রাহক পরিষেবা দলের সাথে যোগাযোগ করুন। রিটার্ন
                      শিপিং খরচ আপনার দায়িত্ব।
                    </li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">
                    ৬. শর্তাবলী পরিবর্তন
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>পরিবর্তনসমূহ</strong>: আমরা যে কোনও সময় এই
                      শর্তাবলী পরিবর্তন করার অধিকার রাখি। আমাদের ওয়েবসাইটে
                      পোস্ট করার সাথে সাথে যে কোনও পরিবর্তন কার্যকর হবে।
                    </li>
                    <li>
                      <strong>বিজ্ঞপ্তি</strong>: আমরা ইমেইল বা আমাদের
                      ওয়েবসাইটে একটি বিজ্ঞপ্তির মাধ্যমে এই শর্তাবলীর
                      উল্লেখযোগ্য পরিবর্তন সম্পর্কে আপনাকে জানাব।
                    </li>
                  </ul>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">৭. যোগাযোগ</h2>
                  <p>
                    এই শর্তাবলী সম্পর্কে আপনার কোনও প্রশ্ন বা উদ্বেগ থাকলে,
                    আমাদের সাথে যোগাযোগ করুন:
                  </p>
                  <address className="not-italic">
                    <strong>আইকনিক লেদার বিডি</strong>
                  </address>
                </section>

                <section className="mb-4">
                  <h2 className="text-sm font-semibold mb-2">
                    ৮. ডেলিভারি চার্জ
                  </h2>
                  <ul className="list-disc ml-5">
                    <li>
                      <strong>ঢাকার ভিতরে</strong>: ক্যাশ অন ডেলিভারি (COD)
                      পরিষেবার জন্য ডেলিভারি চার্জ ৮০ টাকা।
                      <ul className="list-disc ml-5">
                        <li>
                          যদি কন্টিটির সংখ্যা ১ হয়, তবে ৮০ টাকা প্রযোজ্য হবে।
                        </li>
                        <li>
                          কন্টিটির সংখ্যা ১ এর বেশি হলে, প্রতি অতিরিক্ত কন্টির
                          জন্য ৩০ টাকা যোগ হবে।
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>ঢাকার কাছাকাছি শহরে</strong>: ক্যাশ অন ডেলিভারি
                      (COD) পরিষেবার জন্য ডেলিভারি চার্জ ১০০ টাকা।
                    </li>
                    <li>
                      <strong>ঢাকার বাহিরে</strong>: ক্যাশ অন ডেলিভারি (COD)
                      পরিষেবার জন্য ডেলিভারি চার্জ ১৪০ টাকা।
                    </li>
                  </ul>
                </section>
              </section>
            </section>
          </section>
        )}
        {activeTab === "features" && (
          <section className="space-y-10 mb-10 bg-white p-4 mt-2 shadow rounded-md">
            <section
              className="mt-4 "
              dangerouslySetInnerHTML={{ __html: singleData.features }}
            ></section>

            {/* {isMounted && (
              <section className="player-wrapper max-w-2xl  h-[350px]   mb-5">
                <ReactPlayer
                  className="react-player "
                  url={singleData?.video}
                  width="100%"
                  height="100%"
                  controls
                />
              </section>
            )} */}
          </section>
        )}
      </section>
      {/* <section>
        
        <section
          className={`fixed z-[100] flex items-center justify-center ${
            openModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
        >
          <section
            className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
              openModal
                ? "scale-1 opacity-1 duration-300"
                : "scale-0 opacity-0 duration-150"
            } `}
          >
            <svg
              onClick={() => setOpenModal(false)}
              className="mx-auto mr-0 w-8 cursor-pointer fill-black dark:fill-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeWidth="0"></g>
              <g strokeLinecap="round" strokeLinejoin="round"></g>
              <g>
                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
              </g>
            </svg>
           

            <img
              src="/size.png"
              alt="size"
              className="w-[700px] h-[350px] object-fill"
            />
            
          </section>
        </section>
        <section>
          <section
            className={`fixed z-[100] w-full flex items-center justify-center ${
              orderModal
                ? "opacity-1 visible overflow-auto  z-50 "
                : "invisible opacity-0"
            } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          >
            <section
              className={`absolute  max-w-md md:min-w-[70rem]  rounded-lg bg-white sm:border  border-primary px-4  drop-shadow-2xl  ${
                orderModal
                  ? "scale-1 opacity-1 duration-300"
                  : "scale-0 opacity-0 duration-150"
              } `}
            >
              <svg
                onClick={() => setOrderModal(false)}
                className="mx-auto mr-0 w-8 cursor-pointer fill-white bg-red-600  "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                </g>
              </svg>
              <section
                className={` grid lg:grid-cols-2 grid-cols-1 gap-4 h-[600px] sm:h-auto overflow-auto   sm:p-2 rounded-md  `}
              >
                <section className=" ">
                  <h2 className="text-sm font-bold mb-4">Order Summary</h2>
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-black text-white text-sm">
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Qty</th>
                        <th className="py-2 px-4 border-b ">Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="">
                        <td className="py-2 px-4 border-b ">
                          Premium Sweat Leather Blue Loafer For Men ( s-{" "}
                          {selectedSize})
                        </td>
                        <td className="py-2  px-2 border-b">
                          <p className="flex items-center">৳ {productPrice}</p>
                        </td>
                        <td className="py-2  px-2 border-b">{quantity}</td>
                        <td className="py-2  px-2 border-b ">৳ {subtotal}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 border-b" colSpan="3">
                          Delivery Charge
                        </td>
                        <td className="py-2 px-2 border-b">
                          ৳ {deliveryCharge}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 border-b font-bold" colSpan="3">
                          Total
                        </td>
                        <td className="py-2 px-2 border-b font-bold">৳ {total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <section className="bg-white lg:p-4 p-0 text-xs text-justify rounded-md">
                    <h2 className=" font-bold mb-2">শর্তাবলী</h2>
                    <ul className="list-disc ml-5">
                      <li>
                        <strong>ঢাকার ভিতরে</strong>: ক্যাশ অন ডেলিভারি (COD)
                        পরিষেবার জন্য ডেলিভারি চার্জ ৮০ টাকা।
                      </li>
                      <li>
                        <strong>ঢাকার কাছাকাছি শহরে</strong>: ক্যাশ অন ডেলিভারি
                        (COD) পরিষেবার জন্য ডেলিভারি চার্জ ১০০ টাকা।
                      </li>
                      <li>
                        <strong>ঢাকার বাহিরে</strong>: ক্যাশ অন ডেলিভারি (COD)
                        পরিষেবার জন্য ডেলিভারি চার্জ ১৪০ টাকা।
                      </li>

                      <li className="text-rose-600 font-bold mt-5">
                        বিঃদ্রঃ কন্টিটির সংখ্যা ১ এর বেশি হলে, প্রতি অতিরিক্ত
                        কন্টির জন্য ৩০ টাকা যোগ হবে।
                      </li>
                    </ul>
                  </section>
                </section>
                <form
                  onSubmit={handleConfirmOrder}
                  id="billing-address"
                  className=" w-full text-sm"
                >
                  <h2 className="text-sm font-bold mb-3">Billing Address</h2>

                  <section className="mb-2">
                    <label className="block mb-2 font-bold" htmlFor="name">
                      আপনার নাম লিখুন *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                      placeholder="আব্দুল সালাম"
                    />
                  </section>

                  <section className="mb-2">
                    <label className="block mb-2 font-bold" htmlFor="mobile">
                      আপনার ফোন নাম্বার লিখুন *
                    </label>
                    <input
                      type="text" 
                     
                      id="mobile"
                      name="mobile"
                      value={formData.mobile.mobile}
                      placeholder="01900256239"
                      onChange={handleChange}
                      className={`w-full border border-gray-300 rounded-md p-2 ${!isValid ? 'outline outline-red-600 animate-pulse' : ''}`}
                      required
                    />
                    {!isValid && (
                      <p className="text-red-500 text-sm mt-1">
                        ফোন নাম্বারটি সঠিক নয়। অনুগ্রহ করে কমপক্ষে ১১টি সংখ্যা
                        লিখুন।
                      </p>
                    )}
                  </section>

                 <section className="flex gap-3 lg:flex-row  flex-col">
                 <section className="flex-1">
                    <label className="block mb-2 font-bold" htmlFor="address">
                      আপনার ঠিকানা লিখুন *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="# আরশিনগর,গ্যাস লাইন রোড,ঢাকা কেরানীগঞ্জ "
                      required
                    />
                  </section>
                  <section className="flex-1">
                    <label className="block mb-2 font-bold" htmlFor="note">
                    Order notes (optional)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="# আপনার যদি কিছু জানার থাকে "
                      
                    />
                  </section>
                 </section>

                  <section className="">
                    <label
                      className="block mb-2 font-bold"
                      htmlFor="deliveryOption"
                    >
                      Delivery Option
                    </label>
                    <select
                      id="deliveryOption"
                      name="deliveryOption"
                      value={formData.deliveryOption}
                      onChange={handleDeliveryChange}
                      className="w-full border border-gray-300 rounded-md p-2 mb-2"
                      required
                    >
                      <option value="" disabled selected>
                        Select a delivery option
                      </option>
                      <option value="Inside Dhaka">Only Dhaka City ৳ 80</option>
                      <option value="Near Dhaka">Near Dhaka City ৳ 100</option>
                      <option value="Outside of Dhaka">
                        Outside of Dhaka ৳140
                      </option>
                    </select>
                  </section>

                  <section className="mb-2">
                    <label
                      className="block mb-2 font-bold"
                      htmlFor="paymentMethod"
                    >
                      Payment Method
                    </label>
                    <input
                      id="paymentMethod"
                      name="paymentMethod"
                      disabled
                      value={formData.paymentMethod = 'Cash on Delivery'}
                      onChange={handleChange}
                      className="w-full border bg-gray-500 text-white rounded-md p-2 mb-4"
                      
                    />
                      
                    
                  </section>

                  <button
                    type="submit"
                    disabled={isLoading || !isValid}
                    className="bg-primary text-white px-4 py-2 w-full uppercase rounded-md mt-4 mb-5"
                  >
                    {isLoading ? "order submitting..." : "Confirm Order"}
                  </button>
                </form>
              </section>
            </section>
          </section>
        </section>
      </section> */}

      <ReviewSection />
    </Container>
  );
}
