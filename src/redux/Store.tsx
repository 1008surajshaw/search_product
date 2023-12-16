import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { WishlistSlice } from "./Slices/CartSlice";

const rootReducer = combineReducers({
  wishlist: WishlistSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
