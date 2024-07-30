"use client";
import { registerUser } from "@/redux/features/auth/authActions";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// Adjust the path as per your project structure

export default function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { error } = useAppSelector((state) => state.auth);
  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .then((unwrapResult) => {
        // Handle success, e.g., redirect to dashboard
        // console.log('User registration successful:', unwrapResult);

        const user = unwrapResult.requestStatus === "fulfilled";
        if (user) {
          toast.success("Registration successful");
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        // Handle error, e.g., display error message
        console.error(
          "User registration failed:",
          rejectedValueOrSerializedError
        );
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="max-w-[800px] mx-auto lg:my-10  p-6 bg-white shadow-md sm:px-8 sm:py-10 lg:px-12 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-12">
          <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
            {/* Left side form */}
            <h2 className="text-xl font-bold mb-6">
              Hi!<span className="text-[#f69224] ml-2">Shoe</span>
              <span className="text-[#6fd300]">Park</span> Register.
            </h2>
            {error && <span>{error}</span>}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                  placeholder="Email/phone number"
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-primary text-white"
              >
                REGISTER
              </button>
            </form>
            <p className="text-sm mt-6 flex gap-2"></p>
          </div>
          {/* Right side content */}
          <div className="w-full sm:w-1/2">
            <p className="text-sm mb-6">
              If you have an account click the button below to Login your
              account.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full mb-2 bg-black text-white"
            >
              LOGIN ACCOUNT
            </Link>
            <p className="text-center my-4">OR</p>

            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium gap-2 h-10 px-4 py-2 mt-3 w-full text-black border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              SIGN IN WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
