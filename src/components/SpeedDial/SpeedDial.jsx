import React from 'react';
import Link from 'next/link';

const SpeedDial = () => {
  const svgs = [
    {
      href: "https://wa.me/01746881387",
      imgSrc: "/whatsapp.png",
      alt: "WhatsApp",
    },
    {
      href: "https://www.facebook.com/iconicleatherbd",
      imgSrc: "/facebook.png",
      alt: "Facebook",
    },
    {
      href: "#",
      imgSrc: "/youtube.png",
      alt: "YouTube",
    },
  ];

  return (
    <section className="h-[300px] lg:w-12 w-10 mx-auto relative rotate-90 ">
      <section className="group flex flex-col items-center justify-center w-max mx-auto absolute top-0 left-[50%] -translate-x-1/2">
        {/* + icon  */}
        <section className="flex justify-center w-10 h-10 lg:h-12 lg:w-12 bg-[#0095FF] rounded-full items-center group-hover:rotate-[135deg] hover:bg-[#0095FF]/80 duration-500">
          <svg width={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 12H20M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </section>
        {/* icon container  */}
        <section className="space-y-4 duration-500 h-0 my-4 group-hover:h-full">
          {/* Icon Map */}
          {svgs.map((svg, idx) => (
            <section
              key={idx}
              className={`w-10 h-10 -rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 ${
                idx === 0
                  ? ' relative top-5 delay-300 group-hover:delay-200'
                  : idx === 1
                  ? 'delay-200 group-hover:delay-300 relative -left-16 -top-[64px]'
                  : idx === 2
                  ? ' delay-[400ms] group-hover:delay-100 relative -right-16 -top-[125px]'
                  : 'delay-100 group-hover:delay-[400ms] relative -left-[85px] -top-[245px] my-'
              }`}
            >
              <Link
                href={svg.href}
                className="hover:underline w-10 object-cover"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={svg.imgSrc} alt={svg.alt} />
              </Link>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
};

export default SpeedDial;
