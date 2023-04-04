import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/shopping";
import { checkoutSlice } from "../features/checkout";

export const store = configureStore({
    reducer: { cart:cartReducer, checkout:checkoutSlice}
});

