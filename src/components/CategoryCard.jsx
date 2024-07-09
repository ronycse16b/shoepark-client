import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <Link href='#'>
      <div className="w-full bg-white p-2 flex flex-col items-center justify-center  border-r border-b hover:shadow-xl transition-shadow cursor-pointer">
        <Image
          src='/brand_logo2.png'
          alt={category.name}
          width={80}
          height={80}
          className="rounded-md"
        />
        <h3 className=" text-sm font-medium text-center">
          {category.name?.length > 10
            ? category.name?.slice(0, 10) + "..."
            : category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
