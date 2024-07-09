import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center h-[80vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />
        <h1 className="text-2xl font-semibold text-center mt-4 mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-700 text-center 1">Your order has been confirmed.</p>
        <p className="text-gray-700 text-center 1">Order Number: 22422123fd</p>
        <a  className="text-blue-700 text-center 1 underline cursor-pointer">Tracking your order</a>
      </div>
    </div>
  );
};

export default ThankYouPage;
