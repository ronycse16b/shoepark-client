'use client'
import { useEffect, useState } from 'react';
import Card from './product-card/Card';

const FlashSale = () => {
  const products = [
    { name: "Apex Men's Waterproof Sandal", price: 299, oldPrice: 350, discount: 14, thumbnail: '/path/to/image1.png', slug: 'apex-sandal', salePrice: 350, discount: 299, ratingCount: 4 },
    { name: 'Slip-on loafer Shoe for man', price: 151, oldPrice: 399, discount: 62, thumbnail: '/path/to/image2.png', slug: 'loafer-shoe', salePrice: 399, discount: 151, ratingCount: 3 },
    { name: 'Winter Summer Cloths Storage Organizer Bags', price: 122, oldPrice: 350, discount: 65, thumbnail: '/path/to/image3.png', slug: 'storage-bags', salePrice: 350, discount: 122, ratingCount: 5 },
    { name: 'Premium Quality Fat Cutter Detox Powder', price: 170, oldPrice: 380, discount: 55, thumbnail: '/path/to/image4.png', slug: 'detox-powder', salePrice: 380, discount: 170, ratingCount: 2 },
  ];

  const [showMore, setShowMore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('00:00:00');
  const [saleStarted, setSaleStarted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const flashSaleStartTime = new Date('2024-07-27T19:42:41'); // Set your flash sale start time here
  const flashSaleEndTime = new Date('2024-07-28T01:05:00'); // Set your flash sale end time here

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeRemaining = () => {
      const now = new Date();
      let timeDiff, hours, minutes, seconds;

      if (now < flashSaleStartTime) {
        timeDiff = flashSaleStartTime - now;
        setSaleStarted(false);
      } else if (now < flashSaleEndTime) {
        timeDiff = flashSaleEndTime - now;
        setSaleStarted(true);
      } else {
        timeDiff = 0;
      }

      if (timeDiff > 0) {
        hours = Math.floor(timeDiff / (1000 * 60 * 60));
        minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      } else {
        setTimeRemaining('00:00:00');
      }
    };

    const timerId = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayedProducts = showMore ? products : products.slice(0, 4);

  if (!isMounted) {
    return (
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="lg:text-xl font-bold">Flash Sale</h2>
            <p className="text-sm">Loading...</p>
          </div>
          <div className="flex space-x-2">
            <span>Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10" > 
      <div className="lg:flex justify-between items-center mb-4">
        <div>
          <h2 className="lg:text-xl font-bold">Flash Sale</h2>
          <p className="text-sm">Starts at: {flashSaleStartTime.toLocaleTimeString()}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <span className="text-lg font-bold text-red-600">{saleStarted ? 'Ending in:' : 'Starts in:'}</span>
          <div className="flex space-x-1 text-white font-mono text-lg">
            <div className="bg-red-600 px-2 rounded">{timeRemaining.split(':')[0]}</div>
            <span className="text-red-600">:</span>
            <div className="bg-red-600 px-2 rounded">{timeRemaining.split(':')[1]}</div>
            <span className="text-red-600">:</span>
            <div className="bg-red-600 px-2 rounded">{timeRemaining.split(':')[2]}</div>
          </div>
        </div>
      </div>
      {saleStarted ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedProducts.map((product, index) => (
              <Card key={index} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-opacity-85"
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">The Flash Sale has not started yet. Please check back later!</p>
      )}
    </section>
  );
};

export default FlashSale;
