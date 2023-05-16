import { configureStore } from "@reduxjs/toolkit";
import { checkoutReducer } from "../features/checkout";
import { cartReducer } from "../features/shopping";
import orderReducer from './state/orderSlice';
import api from "../services";


export const store = configureStore({
    reducer: {
        cart:cartReducer,
        checkout:checkoutReducer,
        order: orderReducer,
        [api.products.reducerPath]:api.products.reducer,
        [api.orders.reducerPath]:api.orders.reducer
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(api.products.middleware)
    .concat(api.orders.middleware)
});

