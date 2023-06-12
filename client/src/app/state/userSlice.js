import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";
import { extraErrorReducer, extraLoadingReducer } from "../extraReducers";

// Initial state
const initialState = {
    data: null,
    isLoading: false,
    error: null
};

// User API endpoints
export const {getUser:fetchUser, logoutUser} = api.users.endpoints;

// Users slice
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Retrieves user information
        builder
        .addMatcher(fetchUser.matchPending, extraLoadingReducer)
        .addMatcher(
            fetchUser.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                // Initialize user
                const {user} = payload;

                state.data = {
                    id: user.id,
                    firstName:user.first_name,
                    lastName: user.last_name,
                    email: user.email
                };
            }
        )
        .addMatcher(fetchUser.matchRejected, extraErrorReducer)

        // Logs out user
        builder
        .addMatcher(logoutUser.matchPending, extraLoadingReducer)
        .addMatcher(
            logoutUser.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                state.data = null;
            }
        )
        .addMatcher(logoutUser.matchRejected, extraErrorReducer)
    }
});

export default userSlice.reducer;