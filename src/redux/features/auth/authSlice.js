import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './authActions';

let userToken = null;

// Check if window is defined (i.e., if we're in the browser)
if (typeof window !== 'undefined') {
  userToken = localStorage.getItem('userToken') ?? null;
}

const initialState = {
  loading: true, // Set initial loading to false
  userInfo: '',
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
      }
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentialsStarted: (state, action) => {
      state.loading = true;
    
    },
    setCredentialsCompleted: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    
    },
    setCredentialsRejected: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    
    },
    toggleLoading: (state, action) => {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.userToken;

        if (typeof window !== 'undefined') {
          localStorage.setItem('userToken', action.payload.userToken);
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { logout, setCredentialsStarted,setCredentialsCompleted,setCredentialsRejected, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
