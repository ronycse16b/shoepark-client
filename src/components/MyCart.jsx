"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "./Container";
import toast from "react-hot-toast";
import PayNowModal from "./PayNowModal";
import { useGetAllOrdersByUserQuery } from "@/redux/features/api/authApi";

export default function MyCart() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { userInfo, loading } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [shippingEstimate, setShippingEstimate] = useState(80); // Example value
  const [taxEstimate, setTaxEstimate] = useState(5); // Example value
  const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!loading && userInfo?.role !== "user" && !userId) {
      router.push("/");
    }
  }, [loading, userInfo, userId, router]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getMyCart = async () => {
    try {
      const response = await axiosInstance.get(
        `${backendUrl}/api/data/cart?userId=${userId}`
      );
      setCartItems(response?.data?.items);
    } catch (error) {
      console.error(error);
    }
  };
 
  const {

    refetch,
  } = useGetAllOrdersByUserQuery(userInfo?._id || userInfo?.id);

  useEffect(() => {
    if (!loading && userInfo?.role === "user" && userId) {
      getMyCart();
    }
  }, [loading, userInfo, userId]);

  const removeItem = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${backendUrl}/api/data/cart/${id}`
      );
      toast.success(response?.data?.message);
      refetch();
      getMyCart();
    } catch (error) {
      console.error(error);
    }
  };

  const incrementQuantity = async (id) => {
    const type = "increment";
    try {
      await axiosInstance.put(`${backendUrl}/api/data/cart/${id}`, {
        type: type,
      });
      getMyCart();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const decrementQuantity = async (id) => {
    const type = "decrement";
    try {
      await axiosInstance.put(`${backendUrl}/api/data/cart/${id}`, {
        type: type,
      });
      getMyCart();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allItemIds = new Set(cartItems.map((item) => item._id));
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const selectedItemsArray = Array.from(selectedItems);
  const selectedItemsData = cartItems.filter((item) =>
    selectedItemsArray.includes(item._id)
  );

  const { totalItems, totalPrice } = selectedItemsData.reduce(
    (acc, item) => {
      acc.totalItems += item.qty;
      acc.totalPrice += item.qty * item.price; // Assuming item.price is the price per unit
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );

  const handleProceedWithSelected = () => {
    setOpenModal(true);
  };

  const isSelectAllChecked = () => {
    return cartItems.length > 0 && selectedItems.size === cartItems.length;
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [openModal]);

  if (loading) {
    return "Loading...";
  }

  return (
    <Container>
      <div className="px-6 my-10 ">
        <div className="mb-4">
          <input
            type="checkbox"
            id="selectAll"
            onChange={handleSelectAll}
            checked={isSelectAllChecked()}
          />
          <label htmlFor="selectAll" className="ml-2">
            Select All
          </label>
        </div>
        <div className="flex">
          <div className="w-2/3">
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 bg-white border-gray-300 p-5"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.has(item._id)}
                  onChange={() => toggleSelectItem(item._id)}
                  className="mr-4"
                />
                <img
                  src={item?.productImage}
                  alt={"product image"}
                  className="w-20 h-20 rounded"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold">{item?.productName}</h2>
                  <p className="text-gray-500">Size {item.size}</p>
                  <p className="text-gray-900">BDT {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="border border-gray-300 rounded-md px-2 py-1 "
                    onClick={() => decrementQuantity(item._id)}
                    disabled={item?.qty === 1}
                  >
                    -
                  </button>
                  <input
                    className="border border-gray-300 rounded-md px-2 py-1 mx-2 w-12 text-center"
                    type="text"
                    value={item.qty}
                    readOnly
                  />
                  <button
                    className="border border-gray-300 rounded-md px-2 py-1"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-white bg-red-600 w-8 h-8 rounded-full hover:bg-red-700"
                    onClick={() => removeItem(item._id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3 ml-6 p-6 h-[300px] border bg-white border-gray-300 rounded-lg overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Order summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">
                Subtotal(items {totalItems})
              </span>
              <span className="text-gray-900">BDT {totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Shipping Fee</span>
              <span className="text-gray-900">
                BDT {shippingEstimate * selectedItemsData?.length}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Tax estimate</span>
              <span className="text-gray-900">{0}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Order total</span>
              <span>
                {" "}
                BDT {totalPrice + shippingEstimate * selectedItemsData?.length}
              </span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg uppercase hover:bg-blue-700"
              onClick={() => {
                if (selectedItemsData?.length === 0) {
                  toast.error("Please select at least one item");
                } else {
                  handleProceedWithSelected();
                }
              }}
              
            >
              Proceed To Checkout ({totalItems})
            </button>
          </div>
        </div>
      </div>
      <PayNowModal
        setOpenModal={setOpenModal}
        data={selectedItemsData}
        openModal={openModal}
      />
    </Container>
  );
}
