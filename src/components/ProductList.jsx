"use client";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Card from "./product-card/Card";

const categories = [
  "Sarees",
  "Unstitched Fabric",
  "Shalwar Kameez",
  "Kurtis",
  "Party Wear",
  "Petticoats",
  "Dupattas & Stoles",
];

const filters = [
  { name: "Free Delivery", className: "text-blue-500" },
  { name: "Mega Deals", className: "text-purple-500" },
  { name: "Hot Deals", className: "text-red-500" },
  { name: "Best Price Guaranteed", className: "text-orange-500" },
  { name: "Authentic Brands", className: "text-indigo-500" },
  { name: "Daraz Verified", className: "text-orange-600" },
  { name: "Cash On Delivery", className: "text-green-500" },
  { name: "Installment", className: "text-orange-600" },
];

const ProductList = ({ searchData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const productsPerPage = 6; // Number of products to display per page

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/products-by-category/${searchData?.id}`
        );
        setProducts(data.products); // Assuming the API returns products in a 'products' field
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    if (searchData?.id) {
      getProducts();
    }
  }, [searchData?.id]);

  

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Determine the products to display based on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="container mx-auto flex flex-col md:flex-row my-10">
      <aside className="w-full md:w-1/4 pr-4 mb-4 md:mb-0">
        {/* Categories */}
        <div className="mb-6 md:hidden">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="flex flex-wrap items-start gap-3 overflow-x-auto">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-white shadow px-2 py-1 bg-secondary hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block">
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/* Filters */}
        <div className="md:hidden">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          <select className="border rounded py-2 px-4 w-full">
            {filters.map((filter, index) => (
              <option key={index} className={filter.className}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden md:block">
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
      <div className="w-full md:w-3/4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="flex justify-between items-center">
            <button className="border rounded py-2 px-4 mr-2">
              Show 7.7 only
            </button>
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
          {products?.map((product) => (
             <Card key={product?._id} product={product}></Card>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-1 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={`px-4 py-2 mx-1 ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 mx-1 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
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
