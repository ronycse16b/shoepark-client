import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/api/authApi";
import cartSlice from "./features/cart/cartSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartSlice,
    
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

  
})
