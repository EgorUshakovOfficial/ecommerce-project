import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";

// Initial state
const initialState = {
    accessToken: null,
    isLoading: false,
    error: null,
};

// Fetches Google credentials
export const fetchGoogleCredentials = api.authentication.endpoints.getGoogleCredentials;

// Fetches access token
export const fetchAccessToken = api.authentication.endpoints.getAccessToken;

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
        // Fetches Google credentials
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
                state.accessToken = payload.accessToken;
            }
        )
        .addMatcher(
            fetchGoogleCredentials.matchRejected,
            (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            }
        )
        // Fetches access token
        .addMatcher(
            fetchAccessToken.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        )
        .addMatcher(
            fetchAccessToken.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                state.accessToken = payload.accessToken;
            }
        )
        .addMatcher(
            fetchAccessToken.matchRejected,
            (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            }
        )
    }
});


export default authenticationSlice.reducer;