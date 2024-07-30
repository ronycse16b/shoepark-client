const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchProducts() {
  const res = await fetch(`${backendUrl}/api/data/products`, { cache: 'no-store' });
  const products = await res.json();
  return products;
}

export default async function sitemap() {
  const products = await fetchProducts();

  const productUrls = products?.products.map(product => ({
    url: `https://shoeparkbd.com/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    {
      url: 'https://shoeparkbd.com/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://shoeparkbd.com/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://shoeparkbd.com/about',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://shoeparkbd.com/contact',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://shoeparkbd.com/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
