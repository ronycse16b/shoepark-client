"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PaginationForAdminProducts = ({ currentPage, totalPages,total }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const router = useRouter();
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      router.push(`/dashboard/products-management/?page=${page}`);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 flex-wrap">
      <span className="mb-2 sm:mb-0">
        Showing {currentPage} to {totalPages} of {total} entries
      </span>
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <div className="flex items-center">
            <Link key={index} href={`/dashboard/products-management/?page=${index + 1}`}>
              <span
                className={`px-3 py-[6px] rounded ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </span>
            </Link>
          </div>
        ))}
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationForAdminProducts;
