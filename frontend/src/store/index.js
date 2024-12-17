import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import authReducer from '~/store/slices/authSlice';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'auth',
  storage, // Lưu state vào localStorage
  whitelist: ['accessToken', 'role'], // Chỉ lưu những state cần thiết
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  devTools: composeWithDevTools(),
});

export const persistor = persistStore(store);

