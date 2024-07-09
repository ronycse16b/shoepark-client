'use client';

import React, { useState } from "react";

export const metadata = {
  title: 'Order Tracking || Iconic LeatherBD',
};

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrackOrder = () => {
    // Replace this with real order tracking logic
    const mockStatus = {
      orderNumber,
      status: "Shipped",
      steps: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
      ],
      currentStep: 2,
    };
    setOrderStatus(mockStatus);
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-[60vh]">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Track Your Order</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Order Number
          </label>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your order number IL-34-0173XXXXXXXX"
          />
        </div>
        <button
          onClick={handleTrackOrder}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Track Order
        </button>
      </div>
      {orderStatus && (
        <div className="mt-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
            Order Status: {orderStatus.status}
          </h2>
          <div>
            {orderStatus.steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center mb-4 ${
                  index <= orderStatus.currentStep ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border-2 ${index <= orderStatus.currentStep ? "border-blue-500 bg-blue-100" : "border-gray-500 bg-gray-100"}`}>
                  {index + 1}
                </div>
                <div className="flex-grow ml-4">
                  <p className="font-bold">{step}</p>
                  {index < orderStatus.steps.length - 1 && (
                    <div
                      className={`border-l-2 h-8 ml-5 ${
                        index < orderStatus.currentStep ? "border-blue-500" : "border-gray-500"
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
