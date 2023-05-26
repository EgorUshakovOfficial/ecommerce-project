import { configureStore } from "@reduxjs/toolkit";
import {
    authenticationReducer,
    cartReducer,
    checkoutReducer,
    orderReducer,
    userReducer
} from './state';

import api from "../services";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        cart:cartReducer,
        checkout:checkoutReducer,
        order: orderReducer,
        user: userReducer,
        [api.authentication.reducerPath]: api.authentication.reducer,
        [api.products.reducerPath]:api.products.reducer,
        [api.orders.reducerPath]:api.orders.reducer,
        [api.users.reducerPath]: api.users.reducer
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(api.authentication.middleware)
    .concat(api.products.middleware)
    .concat(api.orders.middleware)
    .concat(api.users.middleware)
});

