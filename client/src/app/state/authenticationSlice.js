import { createSlice } from "@reduxjs/toolkit";

import api from "../../services";

// Initial state
const initialState = {
    data: null,
    isLoading: false,
    error: null,
};

// Authentication API
const fetchGoogleCredentials = api.authentication.endpoints.getGoogleCredentials;

// Authentication slice
const authenticationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state, action) => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
        .addMatcher(
            fetchGoogleCredentials.matchPending,
            (state, action) => {
                state.isLoading = false;
            }
        )
        .addMatcher(
            fetchGoogleCredentials.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                state.data = payload;
            }
        )
        .addMatcher(
            fetchGoogleCredentials.matchRejected,
            (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            }
        )
    }
});


export default authenticationSlice.reducer;