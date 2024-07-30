export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: '/private/',
        },
      ],
      sitemap: 'https://shoeparkbd.com/sitemap.xml',
    };
  }
  