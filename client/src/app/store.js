import { configureStore } from "@reduxjs/toolkit";
import {
    authenticationReducer,
    cartReducer,
    checkoutReducer,
    orderReducer,
} from './state';

import api from "../services";


export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        order: orderReducer,
        [api.authentication.reducerPath]: api.authentication.reducer,
        [api.products.reducerPath]:api.products.reducer,
        [api.orders.reducerPath]:api.orders.reducer
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(api.products.middleware)
    .concat(api.orders.middleware)
    .concat(api.authentication.middleware)
});

