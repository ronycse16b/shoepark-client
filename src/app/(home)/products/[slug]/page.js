
import React from 'react';
import ProductDetails from '@/components/product-card/ProductDetails';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProduct(slug) {
  const res = await fetch(`${backendUrl}/api/data/product/${slug}`, { cache: 'no-store' });
  const product = await res.json();
  
  return product?.data;
}



export async function generateMetadata({ params: { slug } }) {
  const product = await fetchProduct(slug);

  if (!product) {
    return {
      title: 'Product not found',
      description: 'The product you are looking for does not exist.'
    };
  }

  return {
    title: product.productName,
    description: product.description,
    openGraph: {
      title: product.productName,
      description: product.description,
      images: [
        {
          url: product.images[0],
          alt: product.productName,
        },
      ],
    },
  };
}

export default async function SingleProduct({ params: { slug } }) {
  const singleData = await fetchProduct(slug);
  
  if (!singleData) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductDetails singleData={singleData} />
    </>
  );
}
