import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import { extraErrorReducer, extraLoadingReducer} from "../extraReducers";

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
        .addMatcher(fetchGoogleCredentials.matchPending, extraLoadingReducer)
        .addMatcher(
            fetchGoogleCredentials.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                state.accessToken = payload.accessToken;
            }
        )
        .addMatcher(fetchGoogleCredentials.matchRejected, extraErrorReducer)

        // Fetches access token
        .addMatcher( fetchAccessToken.matchPending, extraLoadingReducer)
        .addMatcher(
            fetchAccessToken.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                state.accessToken = payload.accessToken;
            }
        )
        .addMatcher(fetchAccessToken.matchRejected, extraErrorReducer)

    }
});


export default authenticationSlice.reducer;