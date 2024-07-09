import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["product", "User"],
  endpoints: (build) => ({

    userProfile: build.query({
      query: () => ({
        url: "api/auth/profile",
        method: "GET",
      }),
    }),
    getAllOrders: build.query({
      query: () => ({
        url: "api/data/orders",
        method: "GET",
      }),
    }),
   

   AddProductData: build.mutation({
  query: ({formData}) => ({
    url:`/api/data/add-product`,
    method: "POST",
    body:formData,
  }),
  invalidatesTags: ["product"], // Adjust if needed
}),

  }),
});

// Export react hook
export const {
  useUserProfileQuery,
  useAddProductDataMutation,
  useGetAllOrdersQuery
} = authApi;
