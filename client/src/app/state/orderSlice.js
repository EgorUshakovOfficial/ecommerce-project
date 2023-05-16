import { createSlice } from "@reduxjs/toolkit";
import api from '../../services';

// Initial state
const initialState = {
    data: null,
    isLoading: false,
    error: null
};

// Order API
const ordersApi = api.orders;

// Order slice
const ordersSlice = createSlice({
    name:'orders',
    initialState,
    extraReducers: builder => {
        builder
        .addMatcher(
            ordersApi.endpoints.addNewOrder.matchPending,
            (state, action) => {
                state.isLoading = true
            }
        )
        .addMatcher(
            ordersApi.endpoints.addNewOrder.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false
                state.data = payload
            }
        )
        .addMatcher(
            ordersApi.endpoints.addNewOrder.matchRejected,
            (state, {payload}) => {
                state.isLoading = false
                state.error = payload
            }
        )
    }
})

export default ordersSlice.reducer;