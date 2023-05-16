import { createSlice } from "@reduxjs/toolkit";
import api from '../../../services';

// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null
};

// Products slice
const productsSlice = createSlice({
    name:"products",
    initialState,
    extraReducers: builder => {
        builder
        .addMatcher(
            api.products.endpoints.getProducts.matchPending,
            (state, action) => {
                state.loading = true
            }
        )
        .addMatcher(
            api.products.endpoints.getProducts.matchFulfilled,
            (state, {payload}) => {
                state.loading = false
                state.data = payload
            }
        )
        .addMatcher(
            api.products.endpoints.getProducts.matchRejected,
            (state, {payload}) => {
                state.loading = false
                state.error = payload
            }
        )
    }
});

export default productsSlice.reducer;