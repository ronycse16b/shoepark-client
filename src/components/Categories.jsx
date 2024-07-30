'use client'

import CategoryCard from "./CategoryCard";
import {useState,useEffect} from 'react'
import axiosInstance from "@/utils/axiosInstance";


const Categories = () => {

  const [categories,setCategories] = useState([])

  

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/categories`
      );
      setCategories(response.data?.data || []);
    } catch (error) {
      console.error(error);
      // setError("Failed to load categories.");
    }
  }




  return (
    <div className=" py-6" data-aos="zoom-in-up">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols- gap-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
