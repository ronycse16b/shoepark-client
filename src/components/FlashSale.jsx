import React from 'react';

const FlashSale = () => {
  const products = [
    { name: 'Apex Men\'s Waterproof Sandal', price: 299, oldPrice: 350, discount: 14, imgSrc: '/path/to/image1.png' },
    { name: 'Slip-on loafer Shoe for man', price: 151, oldPrice: 399, discount: 62, imgSrc: '/path/to/image2.png' },
    { name: 'Winter Summer Cloths Storage Organizer Bags', price: 122, oldPrice: 350, discount: 65, imgSrc: '/path/to/image3.png' },
    { name: 'Premium Quality Fat Cutter Detox Powder', price: 170, oldPrice: 380, discount: 55, imgSrc: '/path/to/image4.png' },
    { name: 'Muuchstac Ocean Face Wash For Man', price: 555, oldPrice: 990, discount: 43, imgSrc: '/path/to/image5.png' },
    // { name: 'Vintage T9 trimmer Electric Professional Hair Clipper', price: 383, oldPrice: 550, discount: 30, imgSrc: '/path/to/image6.png' }
  ];

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Flash Sale</h2>
        <div className="flex space-x-2 ">
          <span>Ending in</span>
          <div className="flex space-x-1">
            <div className="bg-gray-200 p-1 rounded">05</div>
            <div className="bg-gray-200 p-1 rounded">54</div>
            <div className="bg-gray-200 p-1 rounded">16</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md">
            <img src={product.imgSrc} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold">{`৳${product.price}`}</span>
              <span className="line-through text-gray-500">{`৳${product.oldPrice}`}</span>
              <span className="text-green-500">{`${product.discount}% OFF`}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
