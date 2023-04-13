import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./state/loadingSlice";
import { cartReducer } from "../features/shopping";
import { checkoutApi, checkoutSlice } from "../features/checkout";


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        cart:cartReducer,
        checkout:checkoutSlice,
        purchaseProducts: checkoutApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(checkoutApi.middleware)
});

