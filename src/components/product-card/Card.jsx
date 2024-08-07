"use client";

import Image from "next/image";
import Link from "next/link";

const Card = ({ product }) => {
  const calculateDiscountPercentage = (salePrice, discountPrice) => {
    if (salePrice && discountPrice) {
      const discount = ((salePrice - discountPrice) / salePrice) * 100;
      return discount.toFixed(0);
    }
    return null;
  };

  const discountPercentage = calculateDiscountPercentage(
    product?.sizes?.[0]?.price,
    product?.sizes?.[0]?.discount
  );

  // console.log(product)

  return (
    <section className="w-[175px] sm:w-[300px] md:w-[300px] bg-white mx-auto space-y-4 rounded-md text-black border border-white shadow-md dark:bg-[#18181B] transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative w-full h-[150px] lg:h-[200px]">
        <Link href={`/products/${product?.slug}`}>
          <Image
            src={product?.thumbnail || product?.images[0] || "/placeholder.png"}
            alt={product?.productName || "Product Image"}
            layout="fill"
            objectFit="center"
            className="rounded-t-md object-fill w-full h-full"
          />
        </Link>
        <div className="pt-2">
          {discountPercentage && (
            <span className="font-medium text-white px-2 py-1 lg:py-2 text-xs md:text-md lg:text-md relative w-10 h-10 bg-secondary z-20 dark:text-red-400">
              - {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>
      <div className="lg:p-2 px-1">
        <div className="space-y-1">
          <Link href={`/products/${product?.slug}`}>
            <h2 className="font-medium text-slate-800 text-xs sm:text-lg md:text-xl dark:text-white/90 truncate">
              {product?.productName}
            </h2>
          </Link>

          <h3 className="font-medium text-green-600 text-xs sm:text-sm md:text-sm dark:text-white/90">
            Size: Stock
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className="w-3 cursor-pointer"
              viewBox="0 0 24 24"
              fill={index < (product?.ratingCount || 0) ? "#f2b00a" : "#94a3b8"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
            </svg>
          ))}
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2">
            ({product?.ratingCount || 0} reviews)
          </span>
        </div>
        <div className="lg:mt-3 flex flex-col md:flex-row items-center justify-between">
          {product?.sizes?.[0]?.discount > 0 ? (
            <div className="space-x-2">
              {product?.sizes?.[0]?.price && (
                <span className="text-[#66cc00] line-through text-xs font-semibold lg:text-[14px] dark:text-white/60">
                  ৳ {product?.sizes?.[0]?.price}
                </span>
              )}
              <span className="text-primary text-xs font-semibold lg:text-[14px] dark:text-white/60">
                ৳ {product?.sizes?.[0]?.discount}
              </span>
            </div>
          ) : (
            <span className="text-[#66cc00]  text-xs font-semibold lg:text-[14px] dark:text-white/60">
              ৳ {product?.sizes?.[0]?.price}
            </span>
          )}

          <Link
            href={`/products/${product?.slug}`}
            className="rounded-lg bg-primary px-3 mb-3 shadow-md py-1 text-xs sm:text-sm md:text-base font-semibold text-white hover:bg-opacity-85"
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Card;
