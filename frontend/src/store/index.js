import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice'; // Đảm bảo bạn đã import đúng đường dẫn
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'auth',
  storage, // Lưu state vào localStorage
  whitelist: ['accessToken', 'role', 'name', 'avatar'], // Chỉ lưu những state cần thiết
};

const initialState = {
  accessToken: null,
  role: null,
  name: null,
  avatar: null,
  // các state khác nếu có
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    return {
      ...state,
      auth: initialState,
    };
  }
  return authReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  devTools: composeWithDevTools(),
});

export const persistor = persistStore(store);