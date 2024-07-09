const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProducts() {
  const res = await fetch(`${backendUrl}/api/data/products`, { cache: 'no-store' });
  const products = await res.json();
  return products;
}

export default async function sitemap() {
  const products = await fetchProducts();

  const productUrls = products?.products.map(product => ({
    url: `https://iconicleatherbd.com/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://iconicleatherbd.com/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://iconicleatherbd.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://iconicleatherbd.com/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...productUrls,
  ];
}
