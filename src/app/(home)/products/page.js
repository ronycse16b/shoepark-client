import Container from "@/components/Container";
import Card from "@/components/product-card/Card";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const metadata = {
  title:"Products", 
};


export default async function Products() {
  const products = await fetch(`${backendUrl}/api/data/products`, { cache: 'no-store' });
  const productsData = await products.json();

  return (
    <>
      <div className="bg-body mb-10 relative">
        <div className="relative w-full hidden lg:block lg:h-[300px] bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/damo.jpg)' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
            <h1 className="text-xl font-bold text-primary bg-white bg-opacity-75 mb-6 p-2 rounded">Products</h1>
          </div>
        </div>
        <Container>
          {/* <h1 className="font-bold text-xl text-black my-4 py-10">Products</h1> */}
          <div className="border border-white shadow p-2 flex">
            <div className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 lg:gap-6">
                {productsData && productsData.products?.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
