import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <Link href="#" className="group block w-full max-w-xs bg-gray-50 overflow-hidden border transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:z-10">
      {category?.image && (
        <div className="relative  w-full h-32  flex justify-center items-center">
          <Image
            src={category.image}
            alt={category.name}
            width={128}
            height={128}
            className="object-contain rounded-full shadow-lg w-[110px] h-[110px]"
          />
        </div>
      )}
      <div className="p-2 bg-white text-center">
        <h3 className="text-md font-semibold text-gray-800 truncate">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
