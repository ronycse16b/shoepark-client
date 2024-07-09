import React from 'react';

export default function Container({children}) {
  return (
    <section className='w-full lg:max-w-7xl mx-auto px-4'>
    {children}
    </section>
  );
}
