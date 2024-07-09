import CategoryCard from "./CategoryCard";


const categories = [
  { name: 'Trimmers, Groomers &', image: '/path/to/image1.jpg', link: '/category/trimmers' },
  { name: 'Wardrobe Organisers', image: '/path/to/image2.jpg', link: '/category/wardrobe' },
  { name: 'Chino', image: '/path/to/image3.jpg', link: '/category/chino' },
  { name: 'Sports Sandals', image: '/path/to/image4.jpg', link: '/category/sports-sandals' },
  { name: 'Modelling & Sculpting', image: '/path/to/image5.jpg', link: '/category/modelling' },
  { name: 'Electric Insect Killers', image: '/path/to/image6.jpg', link: '/category/electric-insect-killers' },
  { name: 'Cloths & Towels', image: '/path/to/image7.jpg', link: '/category/cloths-towels' },
  { name: 'Fairy Lights', image: '/path/to/image8.jpg', link: '/category/fairy-lights' },
  { name: 'Hats & Caps', image: '/path/to/image9.jpg', link: '/category/hats-caps' },
  { name: 'Humidifiers', image: '/path/to/image10.jpg', link: '/category/humidifiers' },
  { name: 'In-Ear Headphones', image: '/path/to/image11.jpg', link: '/category/in-ear-headphones' },
  { name: 'Rings', image: '/path/to/image12.jpg', link: '/category/rings' },
  { name: 'Face', image: '/path/to/image13.jpg', link: '/category/face' },
  { name: 'Fashion', image: '/path/to/image14.jpg', link: '/category/fashion' },
  
];

const Categories = () => {
  return (
    <div className=" py-6">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
