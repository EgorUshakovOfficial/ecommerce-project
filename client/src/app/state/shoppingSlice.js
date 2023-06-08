import { createSlice } from "@reduxjs/toolkit";
import {extraErrorReducer, extraLoadingReducer} from '../extraReducers';
import api from "../../services";

// Initial state
const initialState = {
    data: null,
    loading: false,
    error: null
};

// Create shopping cart
export const {createShoppingSession} = api.shopping.endpoints;

// Shopping slice
const shoppingSlice = createSlice({
    name:'shopping',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
        .addMatcher(createShoppingSession.matchPending, extraLoadingReducer)
        .addMatcher(createShoppingSession.matchFulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.data = payload.user;
        })
        .addMatcher(createShoppingSession.matchRejected, extraErrorReducer)
    }
});

export default shoppingSlice.reducer;
