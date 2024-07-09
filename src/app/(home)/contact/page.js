import React from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Contact Us || Iconic LeatherBD',
}

export default function Contact() {
  return (
    <Container>
      <div className="pb-10">
        <div className="relative mb-8">
          <Image
            width={100}
            height={100}
            src="/contact.jpg"
            alt="Iconic Leather BD"
            className="mx-auto w-full h-[200px] lg:h-[400px] rounded-lg  object-cover lg:object-center   "
          />
        
        </div>
        <div className="mx-auto rounded-lg lg:p-8 p-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Address</h2>
            <p>Shyamoli Square Shopping Mall, Level -4, Shop -457, Shyamoli, Dhaka</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Mobile</h2>
            <p>01746881387</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p>contact@iconicleatherbd.com</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Get in Touch</h2>
            <p>We value your feedback and inquiries. Feel free to reach out to us through our social media channels or visit us at our store. Our team is always here to assist you with any questions or concerns.</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Store Hours</h2>
            <p>Friday To Wednesday: 10:00 AM - 8:00 PM</p>
            
            <p>Thursday: Closed</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Our Social Media</h2>
            <ul className="flex gap-4 items-center">
              <li>
                <Link
                  href="https://wa.me/01746881387"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/whatsapp.png" alt="WhatsApp" className="w-10 object-cover" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/iconicleatherbd"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/facebook.png" alt="Facebook" className="w-10 object-cover" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/youtube.png" alt="YouTube" className="w-10 object-cover" />
                </Link>
              </li>
            </ul>
          </div>
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
        </div>
      </div>
    </Container>
  );
}
