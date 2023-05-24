import { createSlice } from "@reduxjs/toolkit";
import api from "../../services";

// Initial state
const initialState = {
    data: null,
    isLoading: false,
    error: null
};

// Users API
export const fetchUser = api.users.endpoints.getUser;

// Users slice
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addMatcher(
            fetchUser.matchPending,
            (state, action) => {
                state.isLoading = true;
            }
        )
        .addMatcher(
            fetchUser.matchFulfilled,
            (state, {payload}) => {
                state.isLoading = false;
                state.data = payload;
            }
        )
        .addMatcher(
            fetchUser.matchRejected,
            (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            }
        )
    }
});

export default userSlice.reducer;