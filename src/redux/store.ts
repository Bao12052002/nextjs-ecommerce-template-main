// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
// 👇 1. Import thêm các hàm này từ react-redux
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./features/cart-slice";
import quickViewReducer from "./features/quickView-slice";
import productDetailsReducer from "./features/product-details";
import wishlistReducer from "./features/wishlist-slice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer({ key: "wishlist", storage }, wishlistReducer);

export const store = configureStore({
  reducer: {
    cartReducer: persistedCartReducer,
    wishlistReducer: persistedWishlistReducer,
    quickViewReducer,
    productDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 👇 2. ĐỊNH NGHĨA VÀ EXPORT HOOK (Phần còn thiếu)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;