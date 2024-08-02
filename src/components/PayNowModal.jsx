'use client';
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

const PayNowModal = ({ openModal, setOpenModal, data }) => {
  const shippingFee = 80;
  const currency = "BDT";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const mobileNumber = e.target.mobileNumber.value;
      const address = e.target.address.value;
      const paymentMethod = "Cash on Delivery";

      const orderData = data.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        size: item.size,
        qty: item.qty,
        total: item.price * item.qty + shippingFee,
        email: item.userId.email,
        name: item.userId.name,
        deliveryCharge: shippingFee,
        image: item?.productImage,
        mobile: mobileNumber,
        address: address,
        paymentMethod: paymentMethod,
      }));

      const response = await axiosInstance.post(
        `${backendUrl}/api/data/order`,
        { data: orderData }
      );

      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return data.reduce((acc, item) => acc + item.price * item.qty, 0) + shippingFee;
  };

  return (
    <div className="w-72 mx-auto flex items-center justify-center">
      <div
        className={`fixed flex justify-center items-center z-[100] ${
          openModal ? "visible opacity-1" : "invisible opacity-0"
        } duration-300 inset-0 w-full h-full`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute flex justify-center items-center w-full h-full bg-white rounded-lg shadow-lg ${
            openModal
              ? "translate-y-0 opacity-1 duration-300"
              : "translate-y-32 opacity-0 duration-100"
          }`}
        >
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
            {orderDetails ? (
              <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    Order has been submitted!
                  </h3>
                  <p className="mb-4 text-gray-700">
                    Order Number: {orderDetails.data[0].orderNumber}
                  </p>
                  <p className="mb-4 text-gray-700">
                    Shipping Address: {orderDetails.data[0].address}
                  </p>
                  <p className="mb-4 text-gray-700">
                    Total: {currency} {calculateTotal()}
                  </p>
                  <button
                    onClick={() => {
                      setOrderDetails(null);
                      setOpenModal(false);
                    }}
                    className="bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-8 lg:mb-6">
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                      <h3 className="text-2xl font-semibold whitespace-nowrap">
                        Shipping Details
                      </h3>
                    </div>
                    <div className="lg:p-6 p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <input
                            className="bg-transparent flex h-10 w-full rounded-md border px-3"
                            value={data?.[0]?.userId?.name}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            className="bg-transparent flex h-10 w-full rounded-md border px-3"
                            value={data?.[0]?.userId?.email}
                            readOnly
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mobile Number</label>
                          <input
                            className="bg-transparent flex h-10 w-full rounded-md border px-3"
                            name="mobileNumber"
                            placeholder="Enter your mobile number"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Address</label>
                          <textarea
                            className="bg-transparent flex h-20 w-full rounded-md border px-3"
                            name="address"
                            placeholder="Enter your full address"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 border p-4">
                    <label className="text-sm font-medium">Payment Method</label>
                    <input
                      className="bg-transparent flex h-10 w-full border rounded-md px-3 text-center font-semibold text-green-600"
                      value="Cash on Delivery"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 lg:p-6 p-2 border lg:min-w-[500px] h-[400px]">
                  <h3 className="text-2xl font-semibold whitespace-nowrap">
                    Order Summary
                  </h3>
                  <div className="lg:p-6 p-2">
                    <div className="space-y-4">
                      {data.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>
                            {item.productName?.length > 14 ? item.productName.slice(0, 10) + "..." : item.productName} (Size: {item.size}, {currency} {item.price} x {item.qty})
                          </span>
                          <span>
                            {currency} {item.price * item.qty}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
                        <span>Shipping Fee</span>
                        <span>
                          {currency} {shippingFee}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          {currency} {calculateTotal()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            d="M0 0h24v24H0z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 4V2h-2v2H8v2h4V4h2v2h2V4h-2zm0 16v-2h-2v2H8v-2H6v2H4v-2H2v2h2v2h2v-2h2v2h4zm0-8v6h2v-6h2v-2h-6v2h2zm4-2h2V6h-2v2zm-2-4v2h2V4h-2zm0 6h-2v2h2v-2z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PayNowModal;
