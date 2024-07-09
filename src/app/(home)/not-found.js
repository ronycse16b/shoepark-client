import Link from "next/link";


export default function NotFound() {
  return (
    <div className=" flex justify-center text-center h-[70vh] items-center ">
      <div>
        {" "}
        <div className="font-bold text-5xl flex justify-center">
          {" "}
          <p className=" text-red-600">4</p>
          <p className="animate-bounce transition after:animate-bounce delay-500">0</p>
          <p className="text-red-600">4</p>
        </div>
        <p className="text-amber-600 ">Sorry! page not found, don't worry </p>
        <Link href="/" className="">
          <button className="bg-primary text-white px-4 h-10 mt-5">
           
            Go Home
          </button>{" "}
        </Link>
      </div>
    </div>
  );
}
