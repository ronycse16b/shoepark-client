import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <Link href='#' className="group relative flex items-center justify-center">
      <div className="relative w-full h-48 bg-white p-2 flex items-center justify-center border rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:translate-y-[-10px] group-hover:shadow-xl cursor-pointer overflow-hidden">
        {category?.image && (
          <div className="relative w-full h-full">
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-60">
              <h3 className="text-md font-semibold text-white text-center">
                {category.name?.length > 20
                  ? category.name.slice(0, 20) + "..."
                  : category.name}
              </h3>
            </div>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/30 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out"></div>
    </Link>
  );
};

export default CategoryCard;
