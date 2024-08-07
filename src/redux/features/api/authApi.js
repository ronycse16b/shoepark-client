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
  tagTypes: ["Category", "SubCategory", "ChildCategory", "Product", "User"],
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
    getAllOrdersByUser: build.query({
      query: (userId) => ({
        url: `api/data/cart?userId=${userId}`,
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
      query: ({ formData }) => ({
        url: `/api/data/add-product`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // Adjust if needed
    }),


    // New endpoints
    getAllCategories: build.query({
      query: () => "api/data/categories",
      providesTags: ["Category"],
    }),
    getSubCategories: build.query({
      query: (parentId) => `api/data/sub-by-parentId/${parentId}`,
      providesTags: ["SubCategory"],
    }),
    getChildCategories: build.query({
      query: (subcategoryId) => `api/data/child-by-subcategoryId/${subcategoryId}`,
      providesTags: ["ChildCategory"],
    }),
   
  
  }),
});

// Export react hook
export const {
  useUserProfileQuery,
  useAddProductDataMutation,
  useGetAllOrdersQuery,
  useGetAllOrdersByUserQuery,
  useGetAllCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetChildCategoriesQuery,
} = authApi;
