import Link from "next/link";
import Image from "next/image";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="mx-auto bg-gray-800 text-gray-300 py-8">
      <Container>
        <div>
          <div className="flex justify-between items-center mb-8">
            {/* Site Logo */}
            <div className="flex items-center">
             
              {/* <span className="text-xl font-bold">Iconic Leather BD</span> */}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul>
                <li>
                  <Link href="/about">
                    <span className="hover:underline">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:underline">
                      Award &amp; Certification
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:underline">
                      Mission &amp; Vision
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information Section */}
            <div>
              <h4 className="font-bold mb-4">Information</h4>
              <ul>
                <li>
                  <Link href="/terms">
                    <span className="hover:underline">Terms</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="">
                    <p className=" text-sm text-gray-400 mb-4">
                      Payment Accept
                    </p>
                    <Image src='/payment.png' width={300} height={60} alt="" />
                   
                  </Link>
                </li>
                <li>
                  <Link href="#">
                  <p className="text-sm text-gray-400 mt-4">
                      Coverage: All over Bangladesh
                    </p>
                   
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service Section */}
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul>
                <li>
                  <Link href="/track-order">
                    <span className="hover:underline">Track Order</span>
                  </Link>
                </li>
                <li>
                  <Link href="/complain">
                    <span className="hover:underline">Complain or Advice</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info Section */}
            <div>
              <h4 className="font-bold  mb-4">Info with Social</h4>
              <ul>
                <li className="flex gap-2 mb-3 items-center ">
                  
                  <Link
                    href="https://wa.me/01746881387"
                    className="hover:underline w-10 object-cover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    
                    <img src="/whatsapp.png" alt="" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/iconicleatherbd"
                    className="hover:underline w-10 object-cover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    
                    <img src="/facebook.png" alt="" />
                  </Link>
                  <Link
                    href="#"
                    className="hover:underline w-10 object-cover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    
                    <img src="/youtube.png" alt="" />
                  </Link>
                  
                </li>
              
                <li>
                  Office Address: <br /> <span className="text-sm">Shyamoli Square Shopping Mall, Level -4, Shop -455,
                  Shyamoli, Dhaka</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Shoe Park. All rights
              reserved. Developed by <Link href='https://github.com/ronycse16b'><span className="text-blue-600 underline">Rony</span></Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
