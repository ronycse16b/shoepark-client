"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentialsStarted,
  setCredentialsCompleted,
  toggleLoading,
} from "@/redux/features/auth/authSlice";
import { useUserProfileQuery } from "@/redux/features/api/authApi";

export default function Protect({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo, loading } = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);

  const { data, isFetching } = useUserProfileQuery();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setToken(userToken);

    dispatch(setCredentialsStarted());

    if (data) {
      dispatch(setCredentialsCompleted(data));
    }

    if (!isFetching) {
      dispatch(toggleLoading());
    }
  }, [data, dispatch, isFetching]);

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-primary"></div>
      </section>
    );
  }

  // If user is not logged in, redirect to login page
  if (!userInfo && !token) {
    router.push("/login", { scroll: false });
    return null;  // Ensure no rendering happens until navigation completes
  }

  // If user is logged in, render the children components
  return children;
}
