'use client'
import React, { useState } from 'react';

const categories = [
  'Sarees', 'Unstitched Fabric', 'Shalwar Kameez', 'Kurtis', 'Party Wear', 'Petticoats', 'Dupattas & Stoles'
];

const filters = [
  { name: 'Free Delivery', className: 'text-blue-500' },
  { name: 'Mega Deals', className: 'text-purple-500' },
  { name: 'Hot Deals', className: 'text-red-500' },
  { name: 'Best Price Guaranteed', className: 'text-orange-500' },
  { name: 'Authentic Brands', className: 'text-indigo-500' },
  { name: 'Daraz Verified', className: 'text-orange-600' },
  { name: 'Cash On Delivery', className: 'text-green-500' },
  { name: 'Installment', className: 'text-orange-600' }
];

const products = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    name: 'মেয়েদের জন্য শাড়ির সাথ...',
    rating: 4.3,
    sold: '4K Sold',
    price: 158,
    originalPrice: 160,
    vouchers: 4,
    isHot: true,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    name: 'Black Half Silk Tangail Tat...',
    rating: 3.5,
    sold: '9K Sold',
    price: 167,
    originalPrice: 2099,
    vouchers: 4,
    isHot: false,
  },
  // Add more product objects as needed
];

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products to display per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Determine the products to display based on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="container mx-auto p-4 flex">
      <aside className="w-1/4 pr-4">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="text-gray-700 hover:text-gray-900 cursor-pointer">
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <ul className="space-y-2">
            {filters.map((filter, index) => (
              <li key={index} className={`cursor-pointer ${filter.className}`}>
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">57,737 items found for "Traditional Clothing"</h2>
          <div className="flex items-center">
            <button className="border rounded py-2 px-4 mr-2">Show 7.7 products only</button>
            <select className="border rounded py-2 px-4">
              <option>Best Match</option>
              <option>Best Match</option>
              <option>Best Match</option>
              <option>Best Match</option>
              <option>Best Match</option>
              <option>Best Match</option>
              {/* Add more sorting options as needed */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map(product => (
            <div key={product.id} className="border rounded-lg shadow-md overflow-hidden relative">
              {product.isHot && <div className="absolute top-2 left-2 bg-red-500 text-white p-1 text-sm">Hot</div>}
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-md font-semibold">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">{product.rating}</span>
                  <span className="ml-2 text-gray-500">{product.sold}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 font-bold">{`৳ ${product.price}`}</span>
                  <span className="ml-2 line-through text-gray-500">{`৳ ${product.originalPrice}`}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">{`${product.vouchers} Vouchers`}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              className={`px-4 py-2 mx-1 ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
