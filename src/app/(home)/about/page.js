import React from "react";

import Container from "@/components/Container";
import Image from "next/image";

export const metadata = {
  title:"About", 
};

export default function About() {
  return (
    <>
      
      <Container>
        <div className="relative  text-center mb-6">
          <div className="relative ">
            <Image
            width={100}
            height={100} 
              src="https://i.imgur.com/WbQnbas.png" 
              alt="About Us" 
              className="mx-auto w-full max-w-md rounded-lg  " 
            />
           
          </div>
          <div className="mx-auto text-left mt-8">
            <h1 className="text-xl font-bold mb-4">About</h1>
            <p className="text-md mb-8">
              Welcome to Iconic Leather BD! We are a premier destination for high-quality leather products. Our mission is to deliver the finest leather goods that combine exceptional craftsmanship with timeless style.
            </p>
            <h2 className="text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-md mb-6">
              At Iconic Leather BD, our mission is to provide our customers with premium leather products that stand the test of time. We are committed to sourcing the best materials and employing skilled artisans to create products that reflect our dedication to quality and excellence.
            </p>
            <h2 className="text-xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside mb-6 text-md">
              <li>Quality: We never compromise on the quality of our products.</li>
              <li>Craftsmanship: Each product is crafted with meticulous attention to detail.</li>
              <li>Customer Satisfaction: Our customers are at the heart of everything we do.</li>
              <li>Sustainability: We are committed to sustainable practices and ethical sourcing.</li>
            </ul>
            <h2 className="text-xl font-bold mb-4">Our History</h2>
            <p className="text-md mb-6">
              Founded in 2023, Iconic Leather BD has grown from a small workshop into a renowned brand known for its superior leather products. Over the years, we have built a reputation for excellence, innovation, and customer satisfaction.
            </p>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-md">
              If you have any questions or would like to learn more about our products, please feel free to contact us at <a href="mailto:info@iconicleatherbd.com" className="text-primary underline">info@iconicleatherbd.com</a>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
