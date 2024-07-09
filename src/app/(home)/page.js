import Categories from "@/components/Categories";
import CategoriesMenu from "@/components/CategoriesMenu";
import CommonLoading from "@/components/CommonLoading";
import Container from "@/components/Container";
import FlashSale from "@/components/FlashSale";
import Pagination from "@/components/Pagination";
import ProductList from "@/components/ProductList";
import WhyShopUs from "@/components/WhyShopUs";
import { Carousel } from "@/components/carousel/Carousel";
import Card from "@/components/product-card/Card";
import Link from "next/link";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProducts(page, limit) {
  const res = await fetch(
    `${backendUrl}/api/data/products?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 12;
  const productsData = await fetchProducts(page, limit);
  const totalPages = Math.ceil(productsData.total / limit);
  const total = productsData.total;

  return (
    <>
      <Container>
        <main className="">
          <div className="flex h-[400px] gap-5 mt-2">
            <div className="bg-white w-3/12 flex- rounded-md ">
              <CategoriesMenu />
            </div>
            <div className="w-9/12 rounded-md">
              <Carousel />
            </div>
          </div>
          <WhyShopUs />
          <FlashSale />
          <Categories />
          <section className="mb-10">
            <h1 className="font-bold text-xl text-black my-4 py-2">
              Just For You
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 lg:gap-6">
              {productsData.products.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              total={total}
            />
          </section>
        </main>
      </Container>
      {/* <div
        className="relative w-full hidden lg:block lg:h-[500px] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/damo.jpg)" }}
      >
        <div className="absolute inset-0 flex flex-col  items-center justify-center bg-black bg-opacity-40">
          <Link href="/products">
            <h1 className="text-2xl font-bold text-white  mb-6 p-4 rounded bg-rose-600 hover:bg-rose-700 cursor-pointer transition delay-150">
              Shop Now 40% off
            </h1>
          </Link>
        </div>
      </div> */}

      <section className="bg-white">
        <div className="sm:flex items-center justify-center mx-auto max-w-screen-xl ">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center">
              <img src="https://i.imgur.com/WbQnbas.png" />
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="text">
              <Link
                href="/about"
                className="text-gray-500 border-b-2 border-indigo-600 uppercase"
              >
                About us
              </Link>
              <h2 className="my-4 font-bold text-2xl  sm:text-3xl ">
                About <span className="text-primary">Shoe <span className="text-secondary">Park</span> </span>
              </h2>
              <p className="text-gray-700">
                Welcome to Shoe park! We are a premier destination for
                high-quality leather products. Our mission is to deliver the
                finest leather goods that combine exceptional craftsmanship with
                timeless style. Our Mission Shoe Park, our mission is
                to provide our customers with premium leather products that
                stand the test of time. We are committed to sourcing the best
                materials and employing skilled artisans to create products that
                reflect our dedication to quality and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Find Us on the Map</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.234648047668!2d90.3628284758976!3d23.77465718784369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b00362c719%3A0x98ffa85ad21b509e!2sShyamoli%20Square%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1719813889365!5m2!1sen!2sbd"
            width="100%"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg h-[300px] lg:h-[400px]"
          ></iframe>
        </div>

        <ProductList/>
      </Container>
    </>
  );
}
