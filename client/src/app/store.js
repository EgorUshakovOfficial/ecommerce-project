import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/shopping";

export const store = configureStore({
    reducer: {
        cart:cartReducer
    }
});

