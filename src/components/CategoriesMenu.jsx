'use client';

import { useState, useRef } from "react";

export default function CategoriesMenu() {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeChildMenu, setActiveChildMenu] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveSubMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubMenu(null);
      setActiveChildMenu(null);
    }, 300); // Adjust delay time as needed
  };

  const handleChildMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveChildMenu(menu);
  };

  return (
    <div className="h-[400px] px-5 pt-4 relative">
      <ul>
        {[
          { name: 'Loafer Shoes', submenu: ['Premium Loafer', 'Regular Loafer', 'Half Loafer'] },
          { name: 'Party Shoes', submenu: ['Tassel Shoes', 'Half Tassel Shoes'] },
          { name: 'Formal Shoes', submenu: ['Oxford Shoes', 'Derby Shoes'] },
          { name: 'Boots', submenu: ['Biker Boots', 'Chelsea Boots', 'Casual Boots'] },
          { name: 'Casual Shoes', submenu: ['Premium Casuals', 'Regular Casuals'] },
          { name: 'Sandals', submenu: ['Sandals', 'Slides'] },
          { name: 'Bags', submenu: ['Wallet', 'Bags'] },
          { name: 'Accessories', submenu: ['Shoes Care', 'Socks', 'Key Ring', 'Insoles'], childSubmenu: ['Shoes Shiner', 'Shoes Color', 'Shoes Brush', 'Shoes Horn'] }
        ].map((category, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className=" text-gray-800 py-2 px-4 border-b hover:bg-primary hover:text-white w-full text-left flex justify-between items-center group">
              {category.name}
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2L8.59 3.41 14.17 9H2v2h12.17l-5.58 5.59L10 18l8-8-8-8z" />
                </svg>
              </span>
            </button>
            {activeSubMenu === category.name && (
              <div className="absolute top-0 left-full w-48 bg-white border rounded-lg py-2 z-20">
                <ul>
                  {category.submenu.map((item, subIndex) => (
                    <li key={subIndex} onMouseEnter={() => category.name === 'Accessories' && handleChildMouseEnter(item)}>
                      <button className=" text-gray-800 py-2 px-4 border-b hover:bg-primary hover:text-white w-full text-left flex justify-between items-center">
                        {item}
                        {category.name === 'Accessories' && subIndex === 0 && (
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              className="w-4 h-4 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 2L8.59 3.41 14.17 9H2v2h12.17l-5.58 5.59L10 18l8-8-8-8z" />
                            </svg>
                          </span>
                        )}
                      </button>
                      {activeChildMenu === item && category.name === 'Accessories' && (
                        <div className="absolute top-0 left-full w-48 bg-white border rounded-lg shadow-lg py-2 z-20">
                          <ul>
                            {category.childSubmenu.map((childItem, childIndex) => (
                              <li key={childIndex}>
                                <button className="block text-gray-800 py-2 px-4 border-b hover:bg-primary hover:text-white w-full text-left">
                                  {childItem}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
