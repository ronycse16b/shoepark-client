import Categories from "@/components/Categories";
import CategoriesMenu from "@/components/CategoriesMenu";
import Container from "@/components/Container";
import FlashSale from "@/components/FlashSale";
import Pagination from "@/components/Pagination";
import WhyShopUs from "@/components/WhyShopUs";
import { Carousel } from "@/components/carousel/Carousel";
import Card from "@/components/product-card/Card";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProducts(page, limit) {
  const res = await fetch(
    `${backendUrl}/api/data/products?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return <h1>Fail to fetch</h1>;
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
          <div className="flex lg:h-[400px] gap-5 mt-2">
            <div className="bg-white w-full lg:w-3/12 lg:block hidden rounded-md ">
              <CategoriesMenu />
            </div>
            <div className="lg:w-9/12 w-full rounded-md" data-aos="fade-up">
              <Carousel />
            </div>
          </div>
          <WhyShopUs />
          <FlashSale />
          <Categories />
          <section
            className="mb-10"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <h1 className="font-bold text-xl text-black my-4 py-2">
              Just For You
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-2 lg:gap-6">
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

      {/* <Container>
      <div
        className="mb-8 p-2"
        data-aos="fade-up"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        <h2 className="text-xl font-bold mb-2">Find Us on the Map</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.234648047668!2d90.3628284758976!3d23.77465718784369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b00362c719%3A0x98ffa85ad21b509e!2sShyamoli%20Square%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1719813889365!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg h-[300px] lg:h-[400px]"
        ></iframe>
      </div>
    </Container> */}
    </>
  );
}
