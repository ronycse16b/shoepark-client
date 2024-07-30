
// import { useEffect } from 'react';
import SpeedDial from "@/components/SpeedDial/SpeedDial";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";
import StoreProvider from "../StoreProvider";
import Head from "next/head";

import "../globals.css";
import Loading from "./loading";
import Footer from "@/components/footer/Footer";
import Header from "@/components/navbar/Header";
import { AOSInit } from "@/utils/aos";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Home | Shoe Park",
    template: "%s-Shoe park BD",
  },
  description:
    "Shoe Park BD - Your trusted store for premium leather footwear. Discover our exclusive collection of handcrafted leather shoes for men and women. Shop now for high-quality, durable, and stylish leather footwear. Explore a variety of designs including formal shoes, casual loafers, and trendy boots. Perfect for any occasion. Enjoy free shipping, easy returns, and exceptional customer service. Experience the best in leather craftsmanship at Shoe Park BD",
  keywords:
    "Shoe Park BD - Your trusted store for premium leather footwear. Discover our exclusive collection of handcrafted leather shoes for men and women. Shop now for high-quality, durable, and stylish leather footwear. Explore a variety of designs including formal shoes, casual loafers, and trendy boots. Perfect for any occasion. Enjoy free shipping, easy returns, and exceptional customer service. Experience the best in leather craftsmanship at Shoe Park BD",
};

export default function RootLayout({ children }) {

 

  return (
    <html lang="en">
      <AOSInit/>
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KWDWTVVZ');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StoreProvider>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
          <Toaster />
        </StoreProvider>
        <section className="z-50 fixed bottom-[-60px] right-36">
          <SpeedDial />
        </section>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KWDWTVVZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  );
}
