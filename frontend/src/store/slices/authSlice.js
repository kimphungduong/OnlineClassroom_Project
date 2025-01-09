import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '~/api/authApi';


let isRefreshing = false;

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await authApi.login(credentials);
    return response.data; // Trả về dữ liệu từ API (accessToken và role)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Async thunk for refreshing the token
export const refreshToken = createAsyncThunk('auth/refresh-token', async (_, thunkAPI) => {
  if (isRefreshing) return;
  isRefreshing = true;
  try {
    const response = await authApi.refreshToken();
    isRefreshing = false;
    return response.data; // Trả về accessToken mới
  } catch (error) {
    isRefreshing = false;
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
  try {
    const response = await authApi.register(userInfo);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Async thunk for logout
export const logoutAccount = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authApi.logout();
  } catch (error) {
    console.error('Error logging out:', error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null,
    role: localStorage.getItem('role') || null,
    avatar: localStorage.getItem('avatar') || null,
    name: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: async (state) => {
      state.accessToken = null;
      state.role = null;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
    getSate: (state) => {
      return state;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      })
      .addCase(refreshToken.rejected, async(state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.accessToken = null;
        state.role = null;
        // try {
        //   await authApi.logout();
        // } catch (error) {
        //   console.error('Error logging out:', error);
        // }
            // Reset Redux Persist
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.accessToken = null;
        state.role = null;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
        state.avatar = action.payload.avatar;
        state.name = action.payload.name;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setTokens, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
