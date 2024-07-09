import Container from "../Container";

export default function Top() {
  return (
    <div className=" bg-primary text-white py-1">
      <Container>
      <div className="hidden  md:flex flex-col lg:flex-row lg:items-center lg:space-x-6 text-xs">
        <a href="#" className="hover:underline flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 12 6 12s6-6.75 6-12c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
          <span>
            Shyamoli Square Shopping Mall, Level -4, Shop -455, Shyamoli, Dhaka
          </span>
        </a>
        <a
          href="tel:+880123456789"
          className="hover:underline flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 5.528a.729.729 0 00-.622.725v4.474c0 6.324 5.148 11.472 11.472 11.472H18.9a.729.729 0 00.725-.622 21.057 21.057 0 00-2.468-9.71 21.057 21.057 0 00-9.71-2.468.729.729 0 00-.622.725v1.943a.729.729 0 01-.694.729 13.38 13.38 0 01-5.034-1.43.729.729 0 00-.942.358L3 5.528z" />
          </svg>
          <span>+880123456789</span>
        </a>
        <a
          href="mailto:info@example.com"
          className="hover:underline flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4.5 5.5h15c.276 0 .5.224.5.5v12a.5.5 0 01-.5.5h-15a.5.5 0 01-.5-.5v-12c0-.276.224-.5.5-.5zm7.5 5l-7.5-5h15l-7.5 5z" />
          </svg>
          <span>info@example.com</span>
        </a>
      </div>
        </Container>  
      
    </div>
  );
}
