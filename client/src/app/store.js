import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/shopping";
import { checkoutApi, checkoutSlice } from "../features/checkout";
import loadingReducer from "./state/loadingSlice";
import {productsApi} from "../services/productsApi";


export const store = configureStore({
    reducer: {
        cart:cartReducer,
        checkout:checkoutSlice,
        loading: loadingReducer,
        [productsApi.reducerPath]:productsApi.reducer,
        purchaseProducts: checkoutApi.reducer
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        productsApi.middleware,
        checkoutApi.middleware
    )
});

