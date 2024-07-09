import StoreManagements from "@/components/StoreManagements";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProducts(page, limit) {
  const res = await fetch(`${backendUrl}/api/data/products?page=${page}&limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
export default async function ProductsManagement({searchParams}) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 5;
  const productsData = await fetchProducts(page, limit);
  const totalPages = Math.ceil(productsData.total / limit);
  const total = productsData.total;

  return (
    <div><StoreManagements productsData={productsData} totalPages={totalPages} total={total} currentPage={page}  /></div>
  )
}
