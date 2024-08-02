'use client'; // Mark this as a client component

import Container from "@/components/Container";
import ProductList from "@/components/ProductList";
import { useSearchParams } from "next/navigation";

export default function PageSlug() {
  const searchParams = useSearchParams();
  
  // Get the query parameters
  const slug = searchParams.get('slug'); // This gets the value of the 'slug' parameter
  const id = searchParams.get('_id'); // This gets the value of the '_id' parameter

  const searchData = {
    slug,
    id,
    // Add any additional search parameters here if needed
  }
 

  return (
    <Container>
      <ProductList searchData={searchData} />
    </Container>
  );
}
