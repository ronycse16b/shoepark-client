// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to save cart to the database
export const saveCartToDatabase = createAsyncThunk(
  'cart/saveCartToDatabase',
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data/cart`, {
        method: 'POST',
        body: JSON.stringify(cartData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to save cart');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle', // Add status for async actions
    error: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          size: newItem.size,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity += 1; // Increment quantity
      }
      
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCartToDatabase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCartToDatabase.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(saveCartToDatabase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
